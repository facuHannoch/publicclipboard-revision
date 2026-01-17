"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [boardNumber, setBoardNumber] = useState("");

  const handleBoardNavigate = () => {
    const num = parseInt(boardNumber);
    if (num >= 0 && num <= 199) {
      router.push(`/boards/${num}`);
    }
  };

  const handleRandomBoard = () => {
    const random = Math.floor(Math.random() * 200);
    router.push(`/boards/${random}`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Section 1: Hero */}
      <section className="flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center">
        <div className="max-w-4xl">
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl md:text-7xl">
            Public Clipboard
          </h1>
          <p className="mb-12 text-xl text-zinc-600 dark:text-zinc-400 sm:text-2xl">
            Share text across your devices instantly, no login required
          </p>

          {/* CTAs */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            {/* Primary CTA */}
            <button
              onClick={handleRandomBoard}
              className="rounded-full bg-zinc-900 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Use This Free
            </button>

            {/* Board Number Input */}
            <div className="flex items-center">
              <input
                type="number"
                min="0"
                max="199"
                value={boardNumber}
                onChange={(e) => setBoardNumber(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleBoardNavigate()}
                placeholder="Board #"
                className="w-32 h-14 rounded-l-full border border-r-0 border-zinc-300 px-4 py-4 text-center text-lg dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <button
                onClick={handleBoardNavigate}
                className="flex h-14 w-14 items-center justify-center rounded-r-full border border-zinc-300 text-2xl transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
              >
                →
              </button>
            </div>
          </div>

          {/* Public Warning */}
          <div className="mt-8 rounded-lg bg-amber-50 px-6 py-4 dark:bg-amber-950/20">
            <p className="text-sm text-amber-900 dark:text-amber-200">
              ⚠️ All boards are PUBLIC. Anyone with the board number can view and edit.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Features */}
      <section className="border-t border-zinc-200 bg-zinc-50 px-6 py-20 dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 text-4xl">⚡</div>
              <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                Instant
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Real-time synchronization across all your devices
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 text-4xl">🔓</div>
              <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                No Login
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                No accounts, no sign-ups, no hassle
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 text-4xl">🌐</div>
              <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                Universal
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Works on any device with a browser
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: How It Works */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            How It Works
          </h2>
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-zinc-900 text-xl font-bold text-white dark:bg-zinc-50 dark:text-zinc-900">
                1
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                  Choose a Board Number
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Pick any number from 0 to 199. This is your shared space.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-zinc-900 text-xl font-bold text-white dark:bg-zinc-50 dark:text-zinc-900">
                2
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                  Create Text Objects
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Double-click anywhere on the canvas to create a text note. Position it wherever you like.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-zinc-900 text-xl font-bold text-white dark:bg-zinc-50 dark:text-zinc-900">
                3
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                  Access from Any Device
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Open the same board number on your other device and see your text instantly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Final CTA */}
      <section className="border-t border-zinc-200 bg-zinc-50 px-6 py-20 dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Ready to start sharing?
          </h2>
          <p className="mb-8 text-xl text-zinc-600 dark:text-zinc-400">
            Jump into a board and start collaborating
          </p>
          <button
            onClick={handleRandomBoard}
            className="rounded-full bg-zinc-900 px-10 py-5 text-lg font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Get Started Now
          </button>
        </div>
      </section>
    </div>
  );
}
