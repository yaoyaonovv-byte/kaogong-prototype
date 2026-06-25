import { CandidateProfile } from "./types";

export const storageKeys = {
  profile: "kg-profile",
  favorites: "kg-favorites",
  compare: "kg-compare",
  reportUnlocked: "kg-report-unlocked",
};

export function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJson<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function saveProfile(profile: CandidateProfile) {
  writeJson(storageKeys.profile, profile);
}
