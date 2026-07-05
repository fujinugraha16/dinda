const EVER_CONFIRMED_KEY = "dinda-puzzle-ever-confirmed";
const SESSION_CONFIRMED_KEY = "dinda-puzzle-session-confirmed";

const listeners = new Set<() => void>();

function emitReadyChange() {
  listeners.forEach((listener) => listener());
}

export function subscribeReadyConfirmation(onStoreChange: () => void): () => void {
  listeners.add(onStoreChange);
  return () => listeners.delete(onStoreChange);
}

/** Persistent — drives home button label: Ready vs Puzzle */
export function hasEverConfirmedReady(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(EVER_CONFIRMED_KEY) === "true";
}

/** Per session — drives confirmation modal on /puzzle */
export function hasSessionConfirmedReady(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(SESSION_CONFIRMED_KEY) === "true";
}

export type ReadyConfirmationState = {
  everConfirmed: boolean;
  sessionConfirmed: boolean;
};

let cachedSnapshot: ReadyConfirmationState = {
  everConfirmed: false,
  sessionConfirmed: false,
};

const SERVER_SNAPSHOT: ReadyConfirmationState = {
  everConfirmed: false,
  sessionConfirmed: false,
};

function readSnapshot(): ReadyConfirmationState {
  return {
    everConfirmed: hasEverConfirmedReady(),
    sessionConfirmed: hasSessionConfirmedReady(),
  };
}

export function getReadyConfirmationSnapshot(): ReadyConfirmationState {
  const next = readSnapshot();

  if (
    cachedSnapshot.everConfirmed === next.everConfirmed &&
    cachedSnapshot.sessionConfirmed === next.sessionConfirmed
  ) {
    return cachedSnapshot;
  }

  cachedSnapshot = next;
  return cachedSnapshot;
}

export function getReadyConfirmationServerSnapshot(): ReadyConfirmationState {
  return SERVER_SNAPSHOT;
}

export function confirmReady(): void {
  localStorage.setItem(EVER_CONFIRMED_KEY, "true");
  sessionStorage.setItem(SESSION_CONFIRMED_KEY, "true");
  cachedSnapshot = readSnapshot();
  emitReadyChange();
}

export function clearSessionConfirmation(): void {
  sessionStorage.removeItem(SESSION_CONFIRMED_KEY);
  cachedSnapshot = readSnapshot();
  emitReadyChange();
}

export function clearAllReadyConfirmation(): void {
  localStorage.removeItem(EVER_CONFIRMED_KEY);
  sessionStorage.removeItem(SESSION_CONFIRMED_KEY);
  cachedSnapshot = SERVER_SNAPSHOT;
  emitReadyChange();
}
