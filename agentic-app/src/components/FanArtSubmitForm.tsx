"use client";

import { useState } from "react";

type Props = {
  onSubmit: (payload: { imageUrl: string; artist: string; caption: string }) => void;
  accent: string;
  characterName: string;
};

const placeholders = [
  "https://images.unsplash.com/photo-1549887534-1541e9326642?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1501973801540-537f08ccae7b?auto=format&fit=crop&w=800&q=80",
];

export const FanArtSubmitForm = ({ onSubmit, accent, characterName }: Props) => {
  const [imageUrl, setImageUrl] = useState("");
  const [artist, setArtist] = useState("");
  const [caption, setCaption] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [exampleUrl] = useState(
    () => placeholders[Math.floor(Math.random() * placeholders.length)],
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!imageUrl.trim() || !artist.trim()) {
      setError("Image URL and artist name are both required.");
      return;
    }
    setError(null);
    onSubmit({
      imageUrl: imageUrl.trim(),
      artist: artist.trim(),
      caption: caption.trim() || `Fan art tribute to ${characterName}`,
    });
    setImageUrl("");
    setArtist("");
    setCaption("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-3xl border border-white/10 bg-black/50 p-6 shadow-lg shadow-black/30 backdrop-blur"
    >
      <header>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-white/70">
          Submit Fan Art
        </h3>
        <p className="mt-1 text-sm text-white/50">
          Share a link to your illustration or upload hosted artwork celebrating {characterName}.
        </p>
      </header>
      <div className="space-y-1">
        <label className="text-xs font-semibold uppercase tracking-wider text-white/60">
          Artwork URL
        </label>
        <input
          value={imageUrl}
          onChange={(event) => setImageUrl(event.target.value)}
          placeholder={exampleUrl}
          className="w-full rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 text-sm text-white outline-none transition focus:border-white/60"
          type="url"
          required
        />
      </div>
      <div className="space-y-1">
        <label className="text-xs font-semibold uppercase tracking-wider text-white/60">
          Artist / Handle
        </label>
        <input
          value={artist}
          onChange={(event) => setArtist(event.target.value)}
          placeholder="@your-handle"
          className="w-full rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 text-sm text-white outline-none transition focus:border-white/60"
          type="text"
          required
        />
      </div>
      <div className="space-y-1">
        <label className="text-xs font-semibold uppercase tracking-wider text-white/60">
          Caption
        </label>
        <textarea
          value={caption}
          onChange={(event) => setCaption(event.target.value)}
          rows={3}
          placeholder={`Why do you love ${characterName}?`}
          className="w-full rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 text-sm text-white outline-none transition focus:border-white/60"
        />
      </div>

      {error && (
        <p className="rounded-2xl bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="w-full rounded-2xl px-5 py-3 text-sm font-semibold uppercase tracking-widest text-white transition hover:shadow-lg hover:shadow-black/40"
        style={{ backgroundColor: accent }}
      >
        Share Fan Art
      </button>
    </form>
  );
};
