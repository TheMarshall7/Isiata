import { SYSTEMS_TIERS, SystemsTier } from '@/lib/systems/tiers'

export const AREOCLIENT_LOGO_WHITE = '/systems/areoclient-logo-white.png?v=2'

export type FunnelAccent = {
  name: string
  glow: string
  border: string
  badge: string
  text: string
}

export type FunnelPainPoint = {
  icon: string
  title: string
  description: string
}

export type FunnelProcessStep = {
  title: string
  description: string
}

export type FunnelFaq = {
  question: string
  answer: string
}

export type FunnelBenefit = {
  title: string
  description: string
  icon: string
}

export type FunnelHeroTestimonial = {
  name: string
  role: string
  quote: string
  avatar: string
}

export type FunnelComparisonRow = {
  label: string
  diy: string
  account: string
}

export type FunnelAccountHighlight = {
  title: string
  description: string
  icon: string
}

export type FunnelContent = {
  heroHeadline: string
  heroSubheadline: string
  heroBenefits: string[]
  heroTestimonial: FunnelHeroTestimonial
  ctaLabel: string
  accountHeadline: string
  accountSubheadline: string
  creatorAccountHighlights: FunnelAccountHighlight[]
  benefits: FunnelBenefit[]
  comparisonRows: FunnelComparisonRow[]
  closerHeadline: string
  closerBenefits: string[]
  painPoints: FunnelPainPoint[]
  processSteps: FunnelProcessStep[]
  faqs: FunnelFaq[]
  accent: FunnelAccent
  heroImage: string
  vslPoster: string
  videoSrc?: string
  vslEmbedUrl?: string
}

export const FUNNEL_SHARED = {
  ctaMicrocopy: 'Free strategy call · No credit card · 24h confirmation',
  comparisonColumns: {
    diy: 'DIY / Link-in-bio',
    account: 'AreoClient Creator Account',
  },
  trustMetrics: [
    { value: '50+', label: 'Projects delivered' },
    { value: '100%', label: 'Response rate' },
    { value: '24h', label: 'Avg. confirmation' },
    { value: '7 days', label: 'Fastest launch' },
  ],
  accountBaseFeatures: [
    {
      title: 'Owned contact list',
      description: 'Every follower who opts in becomes a contact you own, not locked inside Instagram or TikTok.',
      icon: 'solar:users-group-rounded-linear',
    },
    {
      title: 'Booking calendar',
      description: 'Clients book sessions, beats, or consultations without back-and-forth DMs.',
      icon: 'solar:calendar-mark-linear',
    },
    {
      title: 'SMS + email automations',
      description: 'Follow-up runs while you create. No more chasing people who went cold.',
      icon: 'solar:letter-linear',
    },
    {
      title: 'CRM dashboard',
      description: 'See every lead, every stage, in one place. Nothing slips through the cracks.',
      icon: 'solar:chart-square-linear',
    },
  ],
  contactsTrustLine: 'Your contacts stay yours, exportable, portable, and independent of any platform.',
}

const ACCOUNT_FAQS: FunnelFaq[] = [
  {
    question: 'Do I own my contacts and data?',
    answer:
      'Yes. Your AreoClient Creator Account gives you an owned contact list, not followers trapped on social platforms. You can export your data and your audience stays with you.',
  },
  {
    question: 'What platform is this built on?',
    answer:
      'Your system runs on AreoClient, a premium CRM and automation platform built for creators. ISIATA configures, launches, and maintains everything inside your account.',
  },
  {
    question: 'What happens after the build is done?',
    answer:
      'Your account keeps running. The monthly retainer covers hosting, automation maintenance, and keeping your sequences active. You create, your account handles the backend.',
  },
]

const FUNNEL_CONTENT: Record<string, FunnelContent> = {
  'booking-foundation': {
    heroHeadline: 'Your audience starts paying you in 7 days',
    heroSubheadline:
      'For artists and producers with real engagement who are tired of losing inquiries in DMs. Book a free strategy call. We map your offers and launch your AreoClient Creator Account.',
    heroBenefits: [
      'You own your audience, followers become contacts that survive algorithm changes',
      'Your calendar fills without you chasing people in DMs',
      'Follow-up runs automatically at 1hr, 24hr, and 72hr',
    ],
    heroTestimonial: {
      name: 'Moqemae',
      role: 'Artist',
      quote: 'Finally have a system that actually books people while I focus on music.',
      avatar:
        'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67dcfc124bc20a014e0890b9.png',
    },
    ctaLabel: 'Book your free strategy call',
    accountHeadline: 'Your backend runs from one creator account',
    accountSubheadline:
      'The Booking Foundation gives you a live AreoClient Creator Account that captures, follows up, and books from the audience you already have, in 7 days.',
    creatorAccountHighlights: [
      {
        title: 'Lead capture that you own',
        description: 'Every opt-in lands in your account, not scattered across DMs and comment sections.',
        icon: 'solar:magnet-wave-linear',
      },
      {
        title: 'Instant reply + missed message recovery',
        description: 'Inquiries get answered immediately. Cold threads get pulled back before they die.',
        icon: 'solar:chat-round-dots-linear',
      },
      {
        title: 'No-show recovery',
        description: 'Reminders and rebooking flows keep your calendar full, even when clients ghost.',
        icon: 'solar:calendar-add-linear',
      },
    ],
    benefits: [
      {
        title: 'You own your audience',
        description:
          'Followers become contacts you control. Algorithm changes cannot wipe out what you have built.',
        icon: 'solar:users-group-rounded-linear',
      },
      {
        title: 'Your calendar fills itself',
        description:
          'Clients book sessions, beats, or consultations without back-and-forth. You stop being the scheduling bottleneck.',
        icon: 'solar:calendar-mark-linear',
      },
      {
        title: 'You never lose a lead to slow replies',
        description:
          'Automated follow-up at 1hr, 24hr, and 72hr catches people before they go cold, while you are in the studio.',
        icon: 'solar:letter-linear',
      },
      {
        title: 'You see who is ready to buy',
        description:
          'Basic tracking shows which contacts are moving toward a booking. You know where to focus your energy.',
        icon: 'solar:chart-square-linear',
      },
      {
        title: 'You recover missed opportunities',
        description:
          'Instant replies and missed-message recovery pull inquiries back before they disappear forever.',
        icon: 'solar:refresh-circle-linear',
      },
      {
        title: 'You stop losing money to no-shows',
        description:
          'Automated reminders and rebooking flows keep your calendar full even when clients flake.',
        icon: 'solar:bell-linear',
      },
    ],
    comparisonRows: [
      { label: 'Owned contact list', diy: 'Followers only, platform owns them', account: 'Contacts you own and can export' },
      { label: 'Booking', diy: 'DM back-and-forth', account: 'Self-serve calendar' },
      { label: 'Follow-up', diy: 'Manual, when you remember', account: 'Automated SMS + email sequences' },
      { label: 'Missed inquiries', diy: 'Gone forever', account: 'Instant reply + recovery system' },
      { label: 'No-shows', diy: 'Empty calendar slot', account: 'Reminders + auto-rebooking' },
      { label: 'Time to launch', diy: 'Months of DIY trial and error', account: 'Live in 7 days' },
    ],
    closerHeadline: 'Stop leaving money in your DMs',
    closerBenefits: [
      'Your AreoClient Creator Account goes live in 7 days',
      'You own every contact, not the algorithm',
      'Follow-up runs while you create',
      'Your calendar books without you chasing people',
      'Free strategy call, no credit card required',
    ],
    painPoints: [
      {
        icon: 'solar:chat-round-dots-linear',
        title: 'Your DMs go cold',
        description:
          'You reply when you can, but leads disappear before you get back. Every missed message is money you already earned with your content.',
      },
      {
        icon: 'solar:calendar-minimalistic-linear',
        title: 'You are your own scheduler',
        description:
          'Back-and-forth booking eats your creative time. There is friction between someone interested and someone paying.',
      },
      {
        icon: 'solar:users-group-rounded-linear',
        title: 'You have an audience, not a pipeline',
        description:
          'Followers are not contacts. When the algorithm shifts, your reach vanishes and you have nothing to show for it.',
      },
      {
        icon: 'solar:ghost-linear',
        title: 'No-shows kill your momentum',
        description:
          'Clients book then vanish. Without reminders and rebooking, your calendar stays half-empty.',
      },
    ],
    processSteps: [
      {
        title: 'Free strategy call',
        description:
          'You tell us your offers, audience, and gaps. We map exactly what goes into your creator account in week one.',
      },
      {
        title: 'Capture + calendar go live',
        description:
          'Your lead capture page and booking calendar launch. Followers start becoming contacts you own.',
      },
      {
        title: 'Automations activate',
        description:
          'SMS and email follow-up at 1hr, 24hr, and 72hr. Instant replies and missed-message recovery turn on.',
      },
      {
        title: 'You create. Your account books',
        description:
          'System live in 7 days. Tracking shows who is moving toward buying. You get back to the work.',
      },
    ],
    faqs: [
      ...ACCOUNT_FAQS,
      {
        question: 'Do I need a big audience to start?',
        answer:
          'No. If you have real engagement, even a few hundred followers who actually interact, this tier converts that attention into bookings.',
      },
      {
        question: 'What if I sell beats, sessions, and coaching?',
        answer:
          'Your account supports multiple offer types. We configure capture pages and your calendar around what you actually sell.',
      },
      {
        question: 'How fast does my account go live?',
        answer:
          'The Booking Foundation is a 7-day build. Most creators have a working capture page and calendar within the first week.',
      },
      {
        question: 'Can I upgrade later?',
        answer:
          'Yes. Every tier builds on the last. Start here and add revenue, automation, or full growth infrastructure when you are ready.',
      },
    ],
    accent: {
      name: 'amber',
      glow: 'bg-amber-500/10',
      border: 'border-amber-500/30',
      badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      text: 'text-amber-400',
    },
    heroImage: '/systems/areoclient-hero.png',
    vslPoster: '/systems/areoclient-hero.png',
  },
  'revenue-system': {
    heroHeadline: 'Turn your existing audience into consistent income',
    heroSubheadline:
      'For creators with traffic but no conversion system. Book a free strategy call, we build your AreoClient Creator Account to monetize new leads and revive the ones you already lost.',
    heroBenefits: [
      'You recover revenue from old DMs and inquiries you already paid for',
      'Your site converts visitors instead of sending them to a dead link-in-bio',
      'You see every lead in one dashboard, income becomes predictable',
    ],
    heroTestimonial: {
      name: 'Jozy',
      role: 'Artist',
      quote: 'Having everything in one place changed how I run my business.',
      avatar:
        'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67dcfc120a7728534876c64b.png',
    },
    ctaLabel: 'Book your free strategy call',
    accountHeadline: 'Your account converts traffic and revives dead leads',
    accountSubheadline:
      'The Revenue System upgrades your AreoClient Creator Account with a conversion website, sales pages, and Cold Lead Revival, so income stops depending on your next post.',
    creatorAccountHighlights: [
      {
        title: 'Cold Lead Revival',
        description: 'Past DMs, emails, and old inquiries get re-engaged automatically. Revenue you thought was gone comes back.',
        icon: 'solar:archive-linear',
      },
      {
        title: 'Conversion website + sales page',
        description: 'A home base built around what you sell, not a scattered link tree that loses people.',
        icon: 'solar:global-linear',
      },
      {
        title: 'Full CRM pipeline',
        description: 'Every lead tracked from first touch to close. You always know what is coming in.',
        icon: 'solar:graph-up-linear',
      },
    ],
    benefits: [
      {
        title: 'You stop losing visitors at your link-in-bio',
        description:
          'A conversion website built around your core offer turns attention into action, not bounce rates.',
        icon: 'solar:global-linear',
      },
      {
        title: 'You recover money from dead leads',
        description:
          'Cold Lead Revival re-engages past DMs, emails, and inquiries. Revenue you already paid for in content comes back.',
        icon: 'solar:archive-linear',
      },
      {
        title: 'You close sales on a dedicated page',
        description:
          'A sales page built for your primary offer removes confusion. Prospects know exactly what to buy and why.',
        icon: 'solar:document-text-linear',
      },
      {
        title: 'You see your entire pipeline',
        description:
          'Full CRM setup means no lead goes untracked. You know who is hot, who went cold, and what is coming in.',
        icon: 'solar:chart-square-linear',
      },
      {
        title: 'You get stronger follow-up that converts',
        description:
          'Email and SMS sequences keep working after the first touch. Income becomes consistent, not random.',
        icon: 'solar:letter-linear',
      },
      {
        title: 'You capture more from every visitor',
        description:
          'Higher-converting lead capture pages turn the traffic you already have into contacts you own.',
        icon: 'solar:magnet-wave-linear',
      },
    ],
    comparisonRows: [
      { label: 'Website', diy: 'Link tree or pretty site that does not convert', account: 'Conversion site built around your offer' },
      { label: 'Dead leads', diy: 'Buried in DMs forever', account: 'Cold Lead Revival brings them back' },
      { label: 'Sales page', diy: 'None or generic', account: 'Dedicated page for your core offer' },
      { label: 'Pipeline visibility', diy: 'Guesswork', account: 'Full CRM, every lead tracked' },
      { label: 'Income predictability', diy: 'Feast or famine', account: 'Sequences + CRM = consistent flow' },
      { label: 'Time to launch', diy: 'Months piecing tools together', account: 'Live in 3 weeks' },
    ],
    closerHeadline: 'Stop letting leads die in your archive',
    closerBenefits: [
      'Your account revives leads you already paid for',
      'A conversion site replaces your dead link-in-bio',
      'Full CRM, you see every lead, every stage',
      'Income becomes consistent, not random',
      'Free strategy call, no credit card required',
    ],
    painPoints: [
      {
        icon: 'solar:wallet-money-linear',
        title: 'You have traffic, no conversion',
        description:
          'People visit your links and bounce. You have attention but no pages built to close the sale.',
      },
      {
        icon: 'solar:archive-linear',
        title: 'Your dead leads are sitting money',
        description:
          'Hundreds of old DMs and inquiries sit untouched. That is revenue you already paid for with your content.',
      },
      {
        icon: 'solar:chart-2-linear',
        title: 'Your income is unpredictable',
        description:
          'Good month, bad month. Without a CRM and follow-up, you never know what is coming in.',
      },
      {
        icon: 'solar:global-linear',
        title: 'You have no real home base',
        description:
          'Scattered links, no cohesive site. Prospects cannot find what you sell or understand why they should buy.',
      },
    ],
    processSteps: [
      {
        title: 'Free strategy call',
        description:
          'We define your core offer, pricing, and ideal client. Everything routes toward one clear conversion path.',
      },
      {
        title: 'Conversion website launches',
        description:
          'Your site and dedicated sales page go live, built around what you sell, not a generic template.',
      },
      {
        title: 'Cold Lead Revival activates',
        description:
          'Past DMs, emails, and inquiries get re-engaged. Leads you thought were gone start coming back.',
      },
      {
        title: 'CRM + sequences go live',
        description:
          'Full pipeline tracking and stronger follow-up. You see every lead and income becomes predictable.',
      },
    ],
    faqs: [
      ...ACCOUNT_FAQS,
      {
        question: 'What is Cold Lead Revival?',
        answer:
          'An automation inside your account that re-engages people who already showed interest (past DMs, old emails, previous inquiries) and brings them back toward buying.',
      },
      {
        question: 'Do I keep everything from Booking Foundation?',
        answer:
          'Yes. Capture pages, calendar, follow-up, and no-show automation are all included. The Revenue System adds conversion and revival on top.',
      },
      {
        question: 'Is this right if I already have a website?',
        answer:
          'Often yes. Most artist sites look good but do not convert. We rebuild around revenue, not aesthetics alone.',
      },
    ],
    accent: {
      name: 'emerald',
      glow: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      text: 'text-emerald-400',
    },
    heroImage: '/systems/areoclient-hero.png',
    vslPoster: '/systems/areoclient-hero.png',
  },
  'client-machine': {
    heroHeadline: 'Your business runs from inquiry to paid, without you in the middle',
    heroSubheadline:
      'For artists selling services, coaching, or premium packages who are drowning in admin. Book a free strategy call. Your AreoClient Creator Account handles the full client journey.',
    heroBenefits: [
      'You only talk to buyers who are serious, applications filter the rest',
      'Payment and onboarding happen automatically after they say yes',
      'You create. Your account closes, collects, and delivers.',
    ],
    heroTestimonial: {
      name: 'Moqemae',
      role: 'Artist',
      quote: 'Finally have a system that actually books people while I focus on music.',
      avatar:
        'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67dcfc124bc20a014e0890b9.png',
    },
    ctaLabel: 'Book your free strategy call',
    accountHeadline: 'Your account runs the full client journey on autopilot',
    accountSubheadline:
      'The Client Machine turns your AreoClient Creator Account into an end-to-end system, inquiry, qualification, payment, onboarding, and retention without you managing every step.',
    creatorAccountHighlights: [
      {
        title: 'Application filtering',
        description: 'Serious buyers self-select. You stop wasting hours on people who were never going to pay.',
        icon: 'solar:filter-linear',
      },
      {
        title: 'Payment + onboarding automation',
        description: 'Money collects and clients get welcomed, onboarded, and guided, without you sending manual emails.',
        icon: 'solar:card-transfer-linear',
      },
      {
        title: 'Upsell + retention flows',
        description: 'Existing clients get re-engaged and offered more. Revenue compounds instead of resetting every month.',
        icon: 'solar:refresh-circle-linear',
      },
    ],
    benefits: [
      {
        title: 'You stop being the bottleneck',
        description:
          'Inquiry to follow-up to booking to payment to onboarding runs without you manually moving people through each step.',
        icon: 'solar:cpu-bolt-linear',
      },
      {
        title: 'You only talk to serious buyers',
        description:
          'An application system filters tire-kickers before they reach your calendar. Your time goes to people ready to invest.',
        icon: 'solar:filter-linear',
      },
      {
        title: 'You get paid without awkward follow-up',
        description:
          'Automated payment collection closes the gap between "yes" and money in your account.',
        icon: 'solar:card-transfer-linear',
      },
      {
        title: 'Your clients know exactly what happens next',
        description:
          'Welcome sequences, delivery steps, and next-action prompts onboard clients without you writing manual emails.',
        icon: 'solar:mailbox-linear',
      },
      {
        title: 'You re-engage clients who went quiet',
        description:
          'Behavior-based follow-up pulls cold leads back and keeps existing clients moving toward their next purchase.',
        icon: 'solar:refresh-circle-linear',
      },
      {
        title: 'You grow revenue from clients you already have',
        description:
          'Upsell and retention messaging turns one-time buyers into repeat clients. You stop hunting from zero every month.',
        icon: 'solar:graph-up-linear',
      },
    ],
    comparisonRows: [
      { label: 'Lead qualification', diy: 'Anyone can book your time', account: 'Application filters serious buyers' },
      { label: 'Payment', diy: 'Manual invoices and chasing', account: 'Automated collection on yes' },
      { label: 'Onboarding', diy: 'You write every email', account: 'Automated welcome + delivery flow' },
      { label: 'Client journey', diy: 'You move every person manually', account: 'Full automation end-to-end' },
      { label: 'Retention', diy: 'Clients buy once and leave', account: 'Upsell + re-engagement built in' },
      { label: 'Time to launch', diy: 'Never fully connected', account: 'Live in 8–10 weeks' },
    ],
    closerHeadline: 'Get your time back. Let your account close.',
    closerBenefits: [
      'Full client journey automated inside your account',
      'You only talk to qualified, serious buyers',
      'Payment and onboarding without manual work',
      'Upsell and retention grow revenue you already earned',
      'Free strategy call, no credit card required',
    ],
    painPoints: [
      {
        icon: 'solar:hand-stars-linear',
        title: 'You are the bottleneck',
        description:
          'Every inquiry lands on you. Follow-up, invoicing, onboarding, it all waits until you have time.',
      },
      {
        icon: 'solar:filter-linear',
        title: 'Unqualified leads waste your hours',
        description:
          'Tire-kickers book calls and ghost. Without an application step, you spend time on people who were never going to pay.',
      },
      {
        icon: 'solar:card-transfer-linear',
        title: 'Payment friction kills deals',
        description:
          'Manual invoices and delayed payments. Revenue leaks between "yes" and money in the bank.',
      },
      {
        icon: 'solar:refresh-circle-linear',
        title: 'Clients buy once and leave',
        description:
          'No upsell or retention flows. You constantly hunt for new clients instead of growing existing relationships.',
      },
    ],
    processSteps: [
      {
        title: 'Free strategy call',
        description:
          'We map every touchpoint from first inquiry to delivery. You see exactly what gets automated.',
      },
      {
        title: 'Application + qualification',
        description:
          'Serious buyers self-select. Only people who meet your criteria reach your calendar.',
      },
      {
        title: 'Payment + onboarding go live',
        description:
          'Money collects automatically. Clients get welcomed, onboarded, and guided without manual emails.',
      },
      {
        title: 'Retention + upsell activate',
        description:
          'Behavior-based follow-up and upsell messaging turn one-time buyers into repeat revenue.',
      },
    ],
    faqs: [
      ...ACCOUNT_FAQS,
      {
        question: 'What does "fully automated" actually mean?',
        answer:
          'Inquiry → follow-up → booking → payment → onboarding runs without you manually moving people through each step. You step in for the creative work, not admin.',
      },
      {
        question: 'Can this handle high-ticket offers?',
        answer:
          'Yes. Built for artists selling services, coaching, and premium packages where qualification and onboarding matter.',
      },
      {
        question: 'What is included from lower tiers?',
        answer:
          'Everything in Booking Foundation and Revenue System: website, CRM, Cold Lead Revival, capture pages, and all automation layers.',
      },
    ],
    accent: {
      name: 'violet',
      glow: 'bg-violet-500/10',
      border: 'border-violet-500/30',
      badge: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
      text: 'text-violet-400',
    },
    heroImage: '/systems/areoclient-hero.png',
    vslPoster: '/systems/areoclient-hero.png',
  },
  'growth-infrastructure': {
    heroHeadline: 'Your music business earns while you create',
    heroSubheadline:
      'For established artists and labels ready to treat their career as a real business. Book a free strategy call, your AreoClient Creator Account connects every income stream into one system.',
    heroBenefits: [
      'You connect beats, services, coaching, and email into one ecosystem',
      'Your content captures leads automatically, not just likes',
      'You see leads, bookings, and revenue in one dashboard',
    ],
    heroTestimonial: {
      name: 'Jozy',
      role: 'Artist',
      quote: 'Having everything in one place changed how I run my business.',
      avatar:
        'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67dcfc120a7728534876c64b.png',
    },
    ctaLabel: 'Book your free strategy call',
    accountHeadline: 'Your account connects every income stream you have',
    accountSubheadline:
      'Growth Infrastructure turns your AreoClient Creator Account into a full business operating system, multiple funnels, content capture, launch campaigns, and a performance dashboard in one place.',
    creatorAccountHighlights: [
      {
        title: 'Content-to-lead engine',
        description: 'Posts and releases capture leads automatically. Your content builds an owned audience, not just vanity metrics.',
        icon: 'solar:hashtag-linear',
      },
      {
        title: 'Launch + release campaigns',
        description: 'Every drop has a capture and conversion path. Momentum does not die after release day.',
        icon: 'solar:rocket-2-linear',
      },
      {
        title: 'Performance dashboard',
        description: 'Leads, bookings, and revenue in one view. You make decisions from data, not guesses.',
        icon: 'solar:chart-square-linear',
      },
    ],
    benefits: [
      {
        title: 'You connect every income stream',
        description:
          'Beats, services, coaching, email, and funnels feed one ecosystem. Revenue compounds instead of capping at one offer.',
        icon: 'solar:album-linear',
      },
      {
        title: 'Your content captures leads automatically',
        description:
          'Posts and releases stop being vanity metrics. Every piece of content builds your owned audience.',
        icon: 'solar:hashtag-linear',
      },
      {
        title: 'You own your audience, not the algorithm',
        description:
          'Email list growth built into your account. Platform changes cannot erase what you have built.',
        icon: 'solar:users-group-rounded-linear',
      },
      {
        title: 'Your launches actually convert',
        description:
          'Release campaigns with capture and follow-up built in. Momentum from a drop does not die on day two.',
        icon: 'solar:rocket-2-linear',
      },
      {
        title: 'Your pages keep getting better',
        description:
          'Ongoing optimization of pages, messages, and conversion paths. The system improves while you create.',
        icon: 'solar:settings-linear',
      },
      {
        title: 'You see everything in one dashboard',
        description:
          'Leads, bookings, and revenue in one view. You know what is working and what to fix next.',
        icon: 'solar:chart-square-linear',
      },
    ],
    comparisonRows: [
      { label: 'Income streams', diy: 'Siloed, beats OR services OR coaching', account: 'All connected in one ecosystem' },
      { label: 'Content ROI', diy: 'Likes and views only', account: 'Every post captures leads' },
      { label: 'Audience ownership', diy: 'Algorithm-dependent followers', account: 'Owned email list + contacts' },
      { label: 'Launches', diy: 'Chaotic, no capture system', account: 'Campaign system for every release' },
      { label: 'Visibility', diy: 'Scattered analytics', account: 'One performance dashboard' },
      { label: 'Support', diy: 'You figure it out alone', account: 'Weekly strategy support included' },
    ],
    closerHeadline: 'Build a business that runs like a catalog',
    closerBenefits: [
      'Every income stream connected in your account',
      'Content that captures leads, not just attention',
      'Launch campaigns that convert release momentum',
      'One dashboard, leads, bookings, revenue',
      'Free strategy call, no credit card required',
    ],
    painPoints: [
      {
        icon: 'solar:album-linear',
        title: 'You are stuck on one income stream',
        description:
          'Beats OR sessions OR coaching, never all connected. Revenue caps because streams do not feed each other.',
      },
      {
        icon: 'solar:hashtag-linear',
        title: 'You are algorithm-dependent',
        description:
          'Every post is a gamble. No owned list means platform changes can erase your reach overnight.',
      },
      {
        icon: 'solar:rocket-2-linear',
        title: 'Your launches are chaotic',
        description:
          'Releases happen without a campaign system. Momentum dies because nothing captures the spike.',
      },
      {
        icon: 'solar:chart-square-linear',
        title: 'You are flying blind',
        description:
          'You cannot see leads, bookings, and revenue in one place. Decisions are guesses, not data.',
      },
    ],
    processSteps: [
      {
        title: 'Free strategy call',
        description:
          'We map every income stream and connect them into one architecture inside your account.',
      },
      {
        title: 'Content-to-lead engine',
        description:
          'Posts and releases start capturing leads automatically. Your content builds an owned audience.',
      },
      {
        title: 'Launch + campaign systems',
        description:
          'Release campaigns, email growth, and funnel sequences work together for every drop.',
      },
      {
        title: 'Optimize + scale',
        description:
          'Performance dashboard goes live. Ongoing optimization and weekly strategy support keep improving results.',
      },
    ],
    faqs: [
      ...ACCOUNT_FAQS,
      {
        question: 'Who is Growth Infrastructure for?',
        answer:
          'Established artists and labels with multiple offers, consistent content, and a desire for income that does not depend on daily posting.',
      },
      {
        question: 'What does weekly strategy support include?',
        answer:
          'Regular check-ins on performance data, conversion opportunities, and what to optimize next. A partner, not just a build-and-leave setup.',
      },
      {
        question: 'How is this different from the Client Machine?',
        answer:
          'Client Machine automates one client journey. Growth Infrastructure connects your entire business with multiple offers, content capture, launches, and ongoing optimization.',
      },
    ],
    accent: {
      name: 'sky',
      glow: 'bg-sky-500/10',
      border: 'border-sky-500/30',
      badge: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
      text: 'text-sky-400',
    },
    heroImage: '/systems/areoclient-hero.png',
    vslPoster: '/systems/areoclient-hero.png',
  },
}

export const FUNNEL_TESTIMONIALS = [
  {
    name: 'Moqemae',
    avatar:
      'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67dcfc124bc20a014e0890b9.png',
    screenshot:
      'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67dcfc124bc20a323c0890ba.png',
  },
  {
    name: 'Jozy',
    avatar:
      'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67dcfc120a7728534876c64b.png',
    screenshot:
      'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67dcfc1276f60c1083fd0333.png',
  },
]

export function getAllTierSlugs(): string[] {
  return SYSTEMS_TIERS.map((tier) => tier.id)
}

export function getTierBySlug(slug: string): SystemsTier | undefined {
  return SYSTEMS_TIERS.find((tier) => tier.id === slug)
}

export function getFunnelContent(slug: string): FunnelContent | undefined {
  return FUNNEL_CONTENT[slug]
}

export function getTierWithFunnel(slug: string): { tier: SystemsTier; funnel: FunnelContent } | undefined {
  const tier = getTierBySlug(slug)
  const funnel = getFunnelContent(slug)
  if (!tier || !funnel) return undefined
  return { tier, funnel }
}
