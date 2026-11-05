import { noteNameToMidi } from '../config/harmonyRules';
import { syncHardUnlock } from './unlockAudio';

export class AudioEngine {
    private context: AudioContext | null = null;
    private masterGain: GainNode | null = null;
    private samples: Map<string, AudioBuffer> = new Map();
    private activeSources: Set<AudioBufferSourceNode> = new Set();
    private unlocked = false;

    /**
     * Ensures ONE AudioContext exists and is initialized.
     */
    async init() {
        if (!this.context || this.context.state === 'closed') {
            console.log('AudioEngine: Creating new context...');
            this.context = new (window.AudioContext || (window as any).webkitAudioContext)();
            this.masterGain = this.context.createGain();
            this.masterGain.gain.value = 0.5;
            this.masterGain.connect(this.context.destination);
            console.log('AudioEngine: Context created. State:', this.context.state);
        }
        return this.context;
    }

    /**
     * Synchronously triggers unlock inside user gesture.
     */
    ensureUnlockedSync(): void {
        if (!this.context) {
            console.warn('AudioEngine: No context to unlock. Creating one...');
            this.context = new (window.AudioContext || (window as any).webkitAudioContext)();
            this.masterGain = this.context.createGain();
            this.masterGain.gain.value = 0.5;
            this.masterGain.connect(this.context.destination);
        }

        console.log('AudioEngine: ensureUnlockedSync. State:', this.context.state);
        syncHardUnlock(this.context);
        this.unlocked = true;
    }

    /**
     * Async ensureUnlocked for internal use
     */
    async ensureUnlocked(): Promise<void> {
        const ctx = await this.init();
        if (this.unlocked && ctx.state === 'running') return;

        console.log('AudioEngine: ensureUnlocked (async fallback). State:', ctx.state);
        syncHardUnlock(ctx);
        this.unlocked = true;
    }

    getContext() { return this.context; }

    async play(
        id: string,
        pitchShiftCents: number = 0,
        timeOffset: number = 0,
        gain: number = 1.0,
        durationSeconds?: number
    ) {
        if (!this.context) await this.init();
        const ctx = this.context!;

        console.log(`AudioEngine: play(${id}). State:`, ctx.state);

        if (ctx.state !== 'running') {
            console.warn('AudioEngine: context not running during play. Attempting sync unlock.');
            syncHardUnlock(ctx);
        }

        if (!this.samples.has(id)) {
            console.error(`AudioEngine: sample not loaded: ${id}`);
            return;
        }

        const sample = this.samples.get(id)!;
        const source = ctx.createBufferSource();
        source.buffer = sample;

        if (pitchShiftCents !== 0) {
            source.playbackRate.value = Math.pow(2, pitchShiftCents / 1200);
        }

        const sourceGain = ctx.createGain();
        sourceGain.gain.value = gain;
        source.connect(sourceGain);
        sourceGain.connect(this.masterGain!);

        this.activeSources.add(source);
        source.onended = () => {
            this.activeSources.delete(source);
            source.disconnect();
        };

        const startTime = Math.max(ctx.currentTime, ctx.currentTime + timeOffset);
        source.start(startTime);
        if (durationSeconds && durationSeconds > 0) {
            // Add fade-out to prevent clicking/clipping when cutting bass notes
            const fadeOutDuration = 0.05; // 50ms fade-out
            const fadeStartTime = startTime + Math.max(0, durationSeconds - fadeOutDuration);
            sourceGain.gain.setValueAtTime(gain, fadeStartTime);
            sourceGain.gain.exponentialRampToValueAtTime(0.001, startTime + durationSeconds);
            source.stop(startTime + durationSeconds);
        }
    }

    async playNote(
        rootSampleId: string,
        midiNote: number,
        rootMidi: number = 60,
        timeOffset: number = 0,
        gain: number = 1.0,
        durationSeconds?: number
    ) {
        const semitoneDiff = midiNote - rootMidi;
        await this.play(rootSampleId, semitoneDiff * 100, timeOffset, gain, durationSeconds);
    }

    async playChordSequence(
        chords: number[][],
        tempoMs: number = 900,
        rootSampleId: string = 'piano_C4',
        rootMidi: number = 60,
        gainOverrides?: number[][],
        sustainFactor: number = 1.0  // 0.0-1.0, reduces note duration for tighter response
    ) {
        await this.ensureUnlocked();
        if (!this.context) return;

        const tempoSeconds = tempoMs / 1000;
        // TODO: Consider sourcing dry samples with less reverb for even tighter response
        const noteDuration = sustainFactor < 1.0 ? tempoSeconds * sustainFactor : undefined;

        chords.forEach((chord, chordIndex) => {
            const chordDelay = 0.05 + (chordIndex * tempoSeconds);
            const gainPerNote = Math.min(1.0, 1.0 / chord.length);
            const chordGains = gainOverrides?.[chordIndex];
            chord.forEach((midiNote, noteIndex) => {
                const noteDelay = chordDelay + (noteIndex * 0.05);
                const gain = chordGains?.[noteIndex] ?? gainPerNote;
                this.playNote(rootSampleId, midiNote, rootMidi, noteDelay, gain, noteDuration);
            });
        });
    }

    async playScale(
        notes: string[],
        tempoMs: number = 400,
        rootSampleId: string = 'piano_C4',
        rootMidi: number = 60,
        octave: number = 4,
        noteDurationMs?: number
    ) {
        await this.ensureUnlocked();
        const tempoSeconds = tempoMs / 1000;
        const durationSeconds = noteDurationMs ? noteDurationMs / 1000 : undefined;

        // Track octave adjustments to prevent register jumps
        let currentOctave = octave;
        let previousMidiNote: number | null = null;

        notes.forEach((note, index) => {
            const baseMidiNote = noteNameToMidi(note, currentOctave);

            // If this note is lower than the previous note, we've wrapped around the octave
            // Increment octave to keep ascending
            if (previousMidiNote !== null && baseMidiNote < previousMidiNote) {
                currentOctave++;
            }

            const midiNote = noteNameToMidi(note, currentOctave);
            this.playNote(
                rootSampleId,
                midiNote,
                rootMidi,
                0.05 + (index * tempoSeconds),
                1.0,
                durationSeconds
            );

            previousMidiNote = midiNote;
        });
    }

    async playMelody(
        notes: string[],
        tempoMs: number = 400,
        rootSampleId: string = 'piano_C4',
        rootMidi: number = 60,
        octave: number = 4,
        noteDurationMs?: number
    ) {
        await this.playScale(notes, tempoMs, rootSampleId, rootMidi, octave, noteDurationMs);
    }

    async playNoteSequence(
        notes: string[],
        tempoMs: number = 400,
        rootSampleId: string = 'piano_C4',
        rootMidi: number = 60,
        octave: number = 4,
        noteDurationMs?: number
    ) {
        await this.playScale(notes, tempoMs, rootSampleId, rootMidi, octave, noteDurationMs);
    }

    async playChord(notes: string[], rootSampleId: string = 'piano_C4', rootMidi: number = 60) {
        await this.ensureUnlocked();
        const gainPerNote = Math.min(1.0, 1.0 / notes.length);
        notes.forEach((note, index) => {
            const match = note.match(/^([A-G])([#b]?)(\d+)$/);
            if (!match) return;
            const midiNote = noteNameToMidi(match[1] + match[2], parseInt(match[3]));
            this.playNote(rootSampleId, midiNote, rootMidi, 0.05 + (index * 0.02), gainPerNote);
        });
    }

    async playInterval(root: string, semitones: number, direction: 'asc' | 'desc' = 'asc', tempoMs: number = 800, rootSampleId: string = 'piano_C4', rootMidi: number = 60) {
        await this.ensureUnlocked();
        const match = root.match(/^([A-G])([#b]?)(\d+)$/);
        if (!match) return;
        const rootMidiNote = noteNameToMidi(match[1] + match[2], parseInt(match[3]));
        const targetMidiNote = rootMidiNote + (direction === 'asc' ? semitones : -semitones);
        this.playNote(rootSampleId, rootMidiNote, rootMidi, 0.05);
        this.playNote(rootSampleId, targetMidiNote, rootMidi, 0.05 + tempoMs / 1000);
    }

    private noiseBuffer: AudioBuffer | null = null;

    /** 4 s of pink noise (Paul Kellet filter), cached and looped. */
    private getNoiseBuffer(ctx: AudioContext): AudioBuffer {
        if (this.noiseBuffer && this.noiseBuffer.sampleRate === ctx.sampleRate) return this.noiseBuffer;
        const length = ctx.sampleRate * 4;
        const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < length; i++) {
            const white = Math.random() * 2 - 1;
            b0 = 0.99886 * b0 + white * 0.0555179;
            b1 = 0.99332 * b1 + white * 0.0750759;
            b2 = 0.969 * b2 + white * 0.153852;
            b3 = 0.8665 * b3 + white * 0.3104856;
            b4 = 0.55 * b4 + white * 0.5329522;
            b5 = -0.7616 * b5 - white * 0.016898;
            data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
            b6 = white * 0.115926;
        }
        this.noiseBuffer = buffer;
        return buffer;
    }

    /**
     * Play pink noise through a band-pass filter centred on `frequency`.
     * Pass frequency = null for the unfiltered (flat) reference.
     * Returns the duration in ms.
     */
    playFilteredNoise(frequency: number | null, q = 2, durationSec = 2.2): number {
        const ctx = this.context;
        if (!ctx || !this.masterGain) return 0;
        const src = ctx.createBufferSource();
        src.buffer = this.getNoiseBuffer(ctx);
        src.loop = true;

        const env = ctx.createGain();
        const now = ctx.currentTime + 0.02;
        // Narrower bands carry less energy, so compensate (capped to stay safe).
        const level = frequency === null ? 0.35 : Math.min(2.6, 0.9 + q * 0.32);
        env.gain.setValueAtTime(0, now);
        env.gain.linearRampToValueAtTime(level, now + 0.08);
        env.gain.setValueAtTime(level, now + durationSec - 0.15);
        env.gain.linearRampToValueAtTime(0, now + durationSec);

        if (frequency === null) {
            src.connect(env);
        } else {
            const bp = ctx.createBiquadFilter();
            bp.type = 'bandpass';
            bp.frequency.value = frequency;
            bp.Q.value = q;
            // Second stage steepens the skirts so the band reads clearly.
            const bp2 = ctx.createBiquadFilter();
            bp2.type = 'bandpass';
            bp2.frequency.value = frequency;
            bp2.Q.value = q;
            src.connect(bp);
            bp.connect(bp2);
            bp2.connect(env);
        }
        env.connect(this.masterGain);

        src.start(now);
        src.stop(now + durationSec + 0.05);
        this.activeSources.add(src);
        src.onended = () => {
            this.activeSources.delete(src);
            try { env.disconnect(); } catch { }
        };
        return durationSec * 1000;
    }

    stopAll() {
        this.activeSources.forEach(s => {
            try { s.stop(); s.disconnect(); } catch { }
        });
        this.activeSources.clear();
        if (this.context && this.context.state === 'running') {
            this.context.suspend().then(() => {
                if (this.context) this.context.resume();
            });
        }
    }

    async loadSample(url: string, id: string): Promise<void> {
        const ctx = await this.init();
        if (this.samples.has(id)) return;
        const res = await fetch(url);
        const arrayBuffer = await res.arrayBuffer();
        this.samples.set(id, await ctx.decodeAudioData(arrayBuffer));
    }

    hasSample(id: string) { return this.samples.has(id); }
}

export const audioEngine = new AudioEngine();
