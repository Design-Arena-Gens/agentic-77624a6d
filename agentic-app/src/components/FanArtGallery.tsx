"use client";

import Image from "next/image";
import type { FanArtEntry } from "@/data/characters";
import clsx from "clsx";

type Props = {
  entries: FanArtEntry[];
  accent: string;
  characterName: string;
};

export const FanArtGallery = ({ entries, accent, characterName }: Props) => {
  if (!entries.length) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-white/10 bg-black/40 p-10 text-center text-white/60">
        <p className="text-sm">
          Nothing here yet. Be the first to share art for {characterName}!
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {entries.map((entry) => (
        <article
          key={entry.id}
          className={clsx(
            "group relative overflow-hidden rounded-3xl border border-white/10 bg-black/60 shadow-lg shadow-black/40 transition-transform duration-500 hover:-translate-y-1",
          )}
        >
          <div className="relative h-52 w-full">
            <Image
              src={entry.imageUrl}
              alt={entry.caption || `${characterName} fan art`}
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />
          </div>
          <div className="relative space-y-3 p-5">
            <div className="flex items-center justify-between text-xs uppercase tracking-widest text-white/50">
              <span>{entry.artist}</span>
              <span>{new Date(entry.createdAt).toLocaleDateString()}</span>
            </div>
            <p className="text-sm text-white/80">{entry.caption}</p>
            <span
              className="inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-[11px] uppercase tracking-widest text-white/70"
              style={{ backgroundColor: accent }}
            >
              Fan Art
            </span>
          </div>
        </article>
      ))}
    </div>
  );
};
