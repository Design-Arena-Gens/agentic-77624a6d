'use client';

import type { Character } from "@/data/characters";
import clsx from "clsx";

type Props = {
  character: Character;
  isActive: boolean;
  onSelect: (id: string) => void;
};

export const CharacterCard = ({ character, isActive, onSelect }: Props) => {
  return (
    <button
      type="button"
      onClick={() => onSelect(character.id)}
      className={clsx(
        "group relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/40 p-[1px] text-left transition-all duration-500 ease-out focus:outline-none focus-visible:ring-4 focus-visible:ring-white/40",
        isActive && "border-white/60 shadow-lg shadow-black/30",
      )}
      style={{ boxShadow: isActive ? character.theme.glow : "0 0 0 rgba(0,0,0,0)" }}
    >
      <div
        className={clsx(
          "relative h-full w-full rounded-[inherit] bg-gradient-to-br p-5 transition-transform duration-500 ease-out",
          `from-zinc-950 via-zinc-900 to-zinc-950`,
        )}
      >
        <div
          className={clsx(
            "pointer-events-none absolute inset-0 opacity-80 transition-opacity duration-500",
            `bg-gradient-to-br ${character.theme.gradient}`,
            "mix-blend-screen blur-3xl",
            isActive ? "opacity-90" : "opacity-40 group-hover:opacity-70",
          )}
        />

        <div className="relative flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold uppercase tracking-wider text-white/70">
              {character.role}
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
              {character.difficulty}
            </span>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white">{character.name}</h3>
            <p className="text-sm text-white/70">{character.title}</p>
          </div>

          <p className="line-clamp-3 text-sm text-white/80">{character.description}</p>

          <div className="mt-auto flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest text-white/60">
              Tap to explore
            </span>
            <span
              className={clsx(
                "inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-all",
                "group-hover:translate-x-1 group-hover:bg-white/10 group-hover:text-white",
                isActive && "translate-x-1 bg-white/20 text-white",
              )}
            >
              →
            </span>
          </div>
        </div>
      </div>
    </button>
  );
};
