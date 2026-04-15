export type PlaygroundRole = "browse" | "studio" | "formal";

export const PLAYGROUND_ROLES: readonly PlaygroundRole[] = [
  "browse",
  "studio",
  "formal",
];

export function isPlaygroundRole(v: string): v is PlaygroundRole {
  return (PLAYGROUND_ROLES as readonly string[]).includes(v);
}

export type PlaygroundSession = {
  displayName: string;
  role: PlaygroundRole;
  loggedInAt: number;
};

const STORAGE_KEY = "whuai-playground-session";

export function readSession(): PlaygroundSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as Partial<PlaygroundSession>;
    if (
      typeof data.displayName !== "string" ||
      typeof data.role !== "string" ||
      typeof data.loggedInAt !== "number" ||
      !isPlaygroundRole(data.role)
    ) {
      return null;
    }
    return {
      displayName: data.displayName,
      role: data.role,
      loggedInAt: data.loggedInAt,
    };
  } catch {
    return null;
  }
}

export function writeSession(session: PlaygroundSession): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}
