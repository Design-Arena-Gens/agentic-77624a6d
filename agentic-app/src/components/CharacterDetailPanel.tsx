"use client";

import type { Character } from "@/data/characters";

type Props = {
  character: Character;
  fanArtTotal: number;
};

export const CharacterDetailPanel = ({ character, fanArtTotal }: Props) => {
  return (
    <section
      className="relative overflow-hidden rounded-4xl border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black p-8 shadow-2xl shadow-black/40"
      style={{ boxShadow: `${character.theme.glow}, inset 0 30px 120px rgba(255,255,255,0.04)` }}
    >
      <div className="absolute inset-0 opacity-40 blur-3xl" />
      <div className="flex flex-col gap-6">
        <header className="flex flex-col gap-3">
          <span className="inline-flex w-fit items-center gap-3 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white/70">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: character.theme.accent }} />
            {character.role} • {character.difficulty}
          </span>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            {character.name}
          </h1>
          <p className="text-lg text-white/70">{character.title}</p>
          <blockquote className="border-l-4 border-white/20 pl-4 text-sm italic text-white/60">
            “{character.signatureQuote}”
          </blockquote>
        </header>

        <p className="max-w-3xl text-base leading-relaxed text-white/80">
          {character.background}
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3 rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white/60">
              Combat Profile
            </h2>
            <p className="text-sm text-white/75">{character.description}</p>
            <ul className="grid gap-2 text-sm text-white/75">
              {character.strengths.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-[6px] h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ backgroundColor: character.theme.accent }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="rounded-2xl bg-black/40 px-4 py-3 text-xs uppercase tracking-widest text-white/50">
              {fanArtTotal} fan art submissions
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white/60">
              Ability Kit
            </h2>
            <ul className="grid gap-4">
              {character.abilities.map((ability) => (
                <li
                  key={ability.name}
                  className="rounded-3xl border border-white/10 bg-black/40 p-4 shadow-inner shadow-black/30"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-base font-semibold text-white">{ability.name}</span>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-widest text-white/60">
                      {ability.cooldown}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-white/70">{ability.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white/60">
            Guide Highlights
          </h2>
          <p className="mt-3 text-sm text-white/75">{character.guide.overview}</p>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white/60">Essential Tips</h3>
              <ul className="space-y-2 text-sm text-white/75">
                {character.guide.tips.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <span className="mt-[6px] inline-flex h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ backgroundColor: character.theme.accent }} />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white/60">Combos</h3>
              <ul className="space-y-2 text-sm text-white/75">
                {character.guide.combos.map((combo) => (
                  <li key={combo} className="rounded-2xl bg-black/40 px-4 py-2">
                    {combo}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
