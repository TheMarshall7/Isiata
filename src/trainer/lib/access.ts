const EMAIL_KEY = 'ear_trainer_access_email';

export function getEarTrainerEmail(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(EMAIL_KEY);
}

export function setEarTrainerEmail(email: string) {
  localStorage.setItem(EMAIL_KEY, email);
}

export function hasEarTrainerAccess(): boolean {
  const email = getEarTrainerEmail();
  return Boolean(email && email.includes('@'));
}
