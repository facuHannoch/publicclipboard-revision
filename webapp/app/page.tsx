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
    <div className="relative min-h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Decorative Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-gradient-to-br from-slate-200/40 to-transparent blur-3xl dark:from-slate-800/40" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-tr from-slate-200/40 to-transparent blur-3xl dark:from-slate-800/40" />
      </div>

      {/* Section 1: Hero */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center">
        <div className="max-w-4xl">
          {/* Small badge above title */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-slate-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-slate-500"></span>
            </span>
            200 boards available
          </div>

          <h1 className="mb-6 text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-6xl md:text-7xl">
            Public Clipboard
          </h1>
          <p className="mb-12 text-xl leading-relaxed text-slate-600 dark:text-slate-400 sm:text-2xl">
            Share text across your devices instantly,{" "}
            <span className="text-slate-900 dark:text-slate-200">no login required</span>
          </p>

          {/* CTAs */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            {/* Primary CTA */}
            <button
              onClick={handleRandomBoard}
              className="group relative rounded-full bg-slate-900 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-slate-900/20 transition-all hover:scale-105 hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/30 dark:bg-slate-100 dark:text-slate-900 dark:shadow-slate-100/10 dark:hover:bg-slate-200 dark:hover:shadow-slate-100/20"
            >
              <span className="relative z-10">Use This Free</span>
              <div className="absolute inset-0 -z-0 rounded-full bg-gradient-to-r from-slate-700 to-slate-900 opacity-0 transition-opacity group-hover:opacity-100 dark:from-slate-200 dark:to-slate-100" />
            </button>

            {/* Board Number Input */}
            <div className="flex items-center shadow-lg shadow-slate-900/5">
              <input
                type="number"
                min="0"
                max="199"
                value={boardNumber}
                onChange={(e) => setBoardNumber(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleBoardNavigate()}
                placeholder="Board #"
                className="h-14 w-32 rounded-l-full border-2 border-r-0 border-slate-300 bg-white px-4 py-4 text-center text-lg font-medium text-slate-900 placeholder-slate-400 transition-colors focus:border-slate-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:placeholder-slate-500 dark:focus:border-slate-500 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <button
                onClick={handleBoardNavigate}
                className="flex h-14 w-14 items-center justify-center rounded-r-full border-2 border-slate-300 bg-white text-2xl text-slate-700 transition-all hover:bg-slate-900 hover:text-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-100 dark:hover:text-slate-900"
              >
                →
              </button>
            </div>
          </div>

          {/* Public Warning */}
          <div className="mt-8 inline-flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50/80 px-6 py-4 shadow-sm backdrop-blur-sm dark:border-amber-900/50 dark:bg-amber-950/30">
            <span className="text-lg">⚠️</span>
            <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
              All boards are PUBLIC. Anyone with the board number can view and edit.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Features */}
      <section className="relative border-y border-slate-200 bg-white px-6 py-20 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:from-slate-900 dark:to-slate-800">
              <div className="absolute right-4 top-4 text-6xl opacity-5 transition-opacity group-hover:opacity-10">⚡</div>
              <div className="relative mb-4 text-4xl">⚡</div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-slate-50">
                Instant
              </h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Real-time synchronization across all your devices
              </p>
            </div>
            <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:from-slate-900 dark:to-slate-800">
              <div className="absolute right-4 top-4 text-6xl opacity-5 transition-opacity group-hover:opacity-10">🔓</div>
              <div className="relative mb-4 text-4xl">🔓</div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-slate-50">
                No Login
              </h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                No accounts, no sign-ups, no hassle
              </p>
            </div>
            <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:from-slate-900 dark:to-slate-800">
              <div className="absolute right-4 top-4 text-6xl opacity-5 transition-opacity group-hover:opacity-10">🌐</div>
              <div className="relative mb-4 text-4xl">🌐</div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-slate-50">
                Universal
              </h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Works on any device with a browser
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: How It Works */}
      <section className="relative px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-center text-3xl font-bold text-slate-900 dark:text-slate-50 sm:text-4xl">
            How It Works
          </h2>
          <p className="mb-12 text-center text-slate-600 dark:text-slate-400">
            Three simple steps to start sharing
          </p>
          <div className="space-y-4">
            <div className="group flex gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-slate-900 text-xl font-bold text-white shadow-md transition-transform group-hover:scale-110 dark:bg-slate-100 dark:text-slate-900">
                1
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-slate-50">
                  Choose a Board Number
                </h3>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  Pick any number from 0 to 199. This is your shared space.
                </p>
              </div>
            </div>
            <div className="group flex gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-slate-800 text-xl font-bold text-white shadow-md transition-transform group-hover:scale-110 dark:bg-slate-200 dark:text-slate-900">
                2
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-slate-50">
                  Create Text Objects
                </h3>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  Double-click anywhere on the canvas to create a text note. Position it wherever you like.
                </p>
              </div>
            </div>
            <div className="group flex gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-slate-700 text-xl font-bold text-white shadow-md transition-transform group-hover:scale-110 dark:bg-slate-300 dark:text-slate-900">
                3
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-slate-50">
                  Access from Any Device
                </h3>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  Open the same board number on your other device and see your text instantly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Final CTA */}
      <section className="relative border-t border-slate-200 bg-slate-900 px-6 py-20 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl">
            Ready to start sharing?
          </h2>
          <p className="mb-8 text-xl text-slate-300">
            Jump into a board and start collaborating
          </p>
          <button
            onClick={handleRandomBoard}
            className="group relative inline-flex items-center gap-2 rounded-full bg-white px-10 py-5 text-lg font-semibold text-slate-900 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            Get Started Now
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>
      </section>
    </div>
  );
}
