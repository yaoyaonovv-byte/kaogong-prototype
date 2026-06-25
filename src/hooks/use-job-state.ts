"use client";

import { useEffect, useMemo, useState } from "react";
import { defaultProfile } from "@/lib/data";
import { getRecommendations } from "@/lib/recommendations";
import { readJson, storageKeys, writeJson } from "@/lib/storage";
import { CandidateProfile, Preference } from "@/lib/types";

export function useJobState() {
  const [profile, setProfile] = useState<CandidateProfile>(defaultProfile);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);
  const [reportUnlocked, setReportUnlocked] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setProfile(readJson(storageKeys.profile, defaultProfile));
    setFavorites(readJson(storageKeys.favorites, []));
    setCompare(readJson(storageKeys.compare, []));
    setReportUnlocked(readJson(storageKeys.reportUnlocked, false));
    setReady(true);
  }, []);

  const recommendations = useMemo(() => getRecommendations(profile, profile.preference), [profile]);

  function updateProfile(nextProfile: CandidateProfile) {
    setProfile(nextProfile);
    writeJson(storageKeys.profile, nextProfile);
  }

  function setPreference(preference: Preference) {
    updateProfile({ ...profile, preference });
  }

  function toggleFavorite(id: string) {
    const next = favorites.includes(id) ? favorites.filter((item) => item !== id) : [...favorites, id];
    setFavorites(next);
    writeJson(storageKeys.favorites, next);
  }

  function toggleCompare(id: string) {
    const next = compare.includes(id)
      ? compare.filter((item) => item !== id)
      : [...compare, id].slice(-5);
    setCompare(next);
    writeJson(storageKeys.compare, next);
  }

  function unlockReport() {
    setReportUnlocked(true);
    writeJson(storageKeys.reportUnlocked, true);
  }

  return {
    ready,
    profile,
    recommendations,
    favorites,
    compare,
    reportUnlocked,
    updateProfile,
    setPreference,
    toggleFavorite,
    toggleCompare,
    unlockReport,
  };
}
