'use client';

import { useMemo, useState } from "react";
import clsx from "clsx";
import {
  characters,
  type Character,
  type FanArtEntry,
} from "@/data/characters";
import { CharacterCard } from "@/components/CharacterCard";
import { CharacterDetailPanel } from "@/components/CharacterDetailPanel";
import { FanArtSubmitForm } from "@/components/FanArtSubmitForm";
import { FanArtGallery } from "@/components/FanArtGallery";
import { useFanArtGallery } from "@/hooks/useFanArtGallery";

const seededFanArt: FanArtEntry[] = characters.flatMap((character, charIndex) =>
  character.fanArtSeeds.map((seed, seedIndex) => ({
    id: `${character.id}-seed-${seedIndex}`,
    characterId: character.id,
    imageUrl: seed.imageUrl,
    artist: seed.artist,
    caption: seed.caption,
    createdAt: new Date(
      Date.now() - (charIndex * 3 + seedIndex + 1) * 86_400_000,
    ).toISOString(),
  })),
);

const allRoles = ["All Roles", ...new Set(characters.map((item) => item.role))];
const allDifficulties = [
  "All Difficulties",
  ...new Set(characters.map((item) => item.difficulty)),
];

const matchesSearch = (character: Character, searchTerm: string) => {
  if (!searchTerm) return true;
  const target = searchTerm.toLowerCase();
  return (
    character.name.toLowerCase().includes(target) ||
    character.title.toLowerCase().includes(target) ||
    character.description.toLowerCase().includes(target) ||
    character.background.toLowerCase().includes(target) ||
    character.guide.overview.toLowerCase().includes(target)
  );
};

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [difficultyFilter, setDifficultyFilter] = useState("All Difficulties");
  const [selectedId, setSelectedId] = useState(characters[0]?.id ?? "");

  const { entries, addEntry, getEntriesFor, stats } = useFanArtGallery(seededFanArt);

  const filteredCharacters = useMemo(() => {
    return characters.filter((character) => {
      const matchesRole = roleFilter === "All Roles" || character.role === roleFilter;
      const matchesDifficulty =
        difficultyFilter === "All Difficulties" || character.difficulty === difficultyFilter;
      return matchesRole && matchesDifficulty && matchesSearch(character, searchTerm);
    });
  }, [difficultyFilter, roleFilter, searchTerm]);

  const highlightedId = useMemo(() => {
    if (!filteredCharacters.length) {
      return selectedId;
    }
    return filteredCharacters.some((item) => item.id === selectedId)
      ? selectedId
      : filteredCharacters[0].id;
  }, [filteredCharacters, selectedId]);

  const activeCharacter = useMemo(() => {
    return (
      characters.find((character) => character.id === highlightedId) ??
      filteredCharacters[0] ??
      characters[0]
    );
  }, [filteredCharacters, highlightedId]);

  const activeFanArt = activeCharacter ? getEntriesFor(activeCharacter.id) : [];

  return (
    <div className="relative min-h-screen overflow-hidden pb-24">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-70 blur-[160px]">
        <div className="absolute -top-64 left-[20%] h-[480px] w-[480px] rounded-full bg-purple-500/40" />
        <div className="absolute bottom-[-320px] right-[15%] h-[540px] w-[540px] rounded-full bg-sky-500/30" />
      </div>

      <main className="relative z-10 mx-auto flex max-w-6xl flex-col gap-12 px-5 pt-16 sm:px-8 lg:px-10">
        <header className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <span className="inline-flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
              Prismfall Archives
            </span>
            <h1 className="text-3xl font-semibold text-white md:text-5xl">
              Agentic Codex
            </h1>
            <p className="max-w-2xl text-base text-white/70 md:text-lg">
              Explore animated dossiers for the realm&apos;s legendary heroes. Study
              strategic guides, review their ability kits, and celebrate them with community fan art.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-[2fr,1fr,1fr]">
            <div className="glow-ring flex items-center gap-3 overflow-hidden rounded-3xl border border-white/10 bg-black/60 px-4 py-3 shadow-inner shadow-black/40 backdrop-blur">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-white/40"
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="16.65" y1="16.65" x2="21" y2="21" />
              </svg>
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search heroes, abilities, tactics..."
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40"
              />
            </div>
            <select
              value={roleFilter}
              onChange={(event) => setRoleFilter(event.target.value)}
              className="rounded-3xl border border-white/10 bg-black/60 px-4 py-3 text-sm text-white/80 outline-none transition focus:border-white/50"
            >
              {allRoles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <select
              value={difficultyFilter}
              onChange={(event) => setDifficultyFilter(event.target.value)}
              className="rounded-3xl border border-white/10 bg-black/60 px-4 py-3 text-sm text-white/80 outline-none transition focus:border-white/50"
            >
              {allDifficulties.map((difficulty) => (
                <option key={difficulty} value={difficulty}>
                  {difficulty}
                </option>
              ))}
            </select>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[2fr,3fr]">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-white/50">
                Hero Lineup
              </h2>
              <span className="text-xs uppercase tracking-widest text-white/40">
                {filteredCharacters.length} Result{filteredCharacters.length === 1 ? "" : "s"}
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {filteredCharacters.map((character) => (
                <CharacterCard
                  key={character.id}
                  character={character}
                  isActive={highlightedId === character.id}
                  onSelect={setSelectedId}
                />
              ))}
              {!filteredCharacters.length && (
                <div className="rounded-3xl border border-white/10 bg-black/50 p-6 text-sm text-white/60">
                  No heroes match that query. Try resetting your filters.
                </div>
              )}
            </div>
          </div>

          {activeCharacter ? (
            <CharacterDetailPanel
              character={activeCharacter}
              fanArtTotal={stats.get(activeCharacter.id) ?? 0}
            />
          ) : (
            <div className="rounded-3xl border border-white/10 bg-black/50 p-10 text-center text-white/60">
              Select a hero to view their dossier.
            </div>
          )}
        </section>

        {activeCharacter && (
          <section className="grid gap-6 lg:grid-cols-[1.3fr,1fr]">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-widest text-white/50">
                  Fan Art Gallery
                </h2>
                <span
                  className={clsx(
                    "rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-white/60",
                  )}
                >
                  {activeFanArt.length} submissions
                </span>
              </div>
              <FanArtGallery
                entries={activeFanArt}
                characterName={activeCharacter.name}
                accent={activeCharacter.theme.accent}
              />
            </div>
            <FanArtSubmitForm
              characterName={activeCharacter.name}
              accent={activeCharacter.theme.accent}
              onSubmit={(payload) =>
                addEntry({
                  characterId: activeCharacter.id,
                  ...payload,
                })
              }
            />
          </section>
        )}

        <footer className="mt-6 flex flex-col gap-2 rounded-3xl border border-white/10 bg-black/60 px-6 py-5 text-xs uppercase tracking-[0.3em] text-white/30">
          <span>
            Built for the Prismfall community • {entries.length} pieces of fan art archived
          </span>
          <span>Deploy ready · Responsive · Crafted with Next.js & Tailwind CSS</span>
        </footer>
      </main>
    </div>
  );
}
