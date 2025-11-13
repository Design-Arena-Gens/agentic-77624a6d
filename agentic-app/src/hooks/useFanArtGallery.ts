'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { FanArtEntry } from "@/data/characters";

const STORAGE_KEY = "agentic-playbook-fanart-v1";

type CreateFanArtPayload = {
  characterId: string;
  imageUrl: string;
  artist: string;
  caption: string;
};

const safeParse = (raw: string | null): FanArtEntry[] | null => {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return null;
    return parsed.filter((item) => typeof item === "object" && item !== null) as FanArtEntry[];
  } catch (error) {
    console.warn("[fanart] Failed to parse stored entries", error);
    return null;
  }
};

const makeId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `fanart-${Math.random().toString(36).slice(2, 11)}`;
};

export const useFanArtGallery = (initialEntries: FanArtEntry[]) => {
  const [entries, setEntries] = useState<FanArtEntry[]>(() => {
    if (typeof window !== "undefined") {
      const parsed = safeParse(window.localStorage.getItem(STORAGE_KEY));
      if (parsed && parsed.length) {
        return parsed;
      }
    }
    return initialEntries;
  });
  const hasMounted = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const addEntry = useCallback((payload: CreateFanArtPayload) => {
    setEntries((prev) => [
      {
        id: makeId(),
        createdAt: new Date().toISOString(),
        ...payload,
      },
      ...prev,
    ]);
  }, []);

  const getEntriesFor = useCallback(
    (characterId: string) => entries.filter((entry) => entry.characterId === characterId),
    [entries],
  );

  const stats = useMemo(() => {
    const map = new Map<string, number>();
    for (const entry of entries) {
      map.set(entry.characterId, (map.get(entry.characterId) ?? 0) + 1);
    }
    return map;
  }, [entries]);

  return {
    entries,
    addEntry,
    getEntriesFor,
    stats,
  };
};
