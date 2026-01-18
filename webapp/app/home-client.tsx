"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomeClient() {
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
    <div className="relative min-h-screen overflow-hidden bg-white dark:bg-zinc-950">
      {/* Navbar */}
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-zinc-100 bg-white/90 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
              Public Clipboard
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="#how-it-works"
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              How it works
            </a>
            <button
              onClick={handleRandomBoard}
              className="rounded-full bg-zinc-800 px-6 py-2 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Try Now
            </button>
          </div>
        </div>
      </nav>

      {/* Decorative Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-gradient-to-br from-zinc-100/60 to-transparent blur-3xl dark:from-zinc-800/40" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-tr from-zinc-100/60 to-transparent blur-3xl dark:from-zinc-800/40" />
      </div>

      {/* Section 1: Hero */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center">
        {/* Background Grid Pattern */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30 dark:opacity-20">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgb(113 113 122 / 0.15) 1px, transparent 1px),
                linear-gradient(to bottom, rgb(113 113 122 / 0.15) 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        {/* Desktop Board - Left Side */}
        <div className="pointer-events-none absolute left-[5%] top-[20%] hidden lg:block">
          <div className="relative">
            {/* Desktop Board Frame */}
            <div className="h-48 w-80 rotate-6 rounded-lg border-2 border-zinc-200 bg-zinc-50/90 p-3 shadow-xl backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-900/90">
              {/* Board Grid Background */}
              <div
                className="absolute inset-0 rounded-lg opacity-20"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgb(113 113 122 / 0.3) 1px, transparent 1px),
                    linear-gradient(to bottom, rgb(113 113 122 / 0.3) 1px, transparent 1px)
                  `,
                  backgroundSize: "20px 20px",
                }}
              />
              {/* Text Objects on Board */}
              <div className="relative space-y-2">
                <div className="w-fit rounded-lg border-2 border-zinc-300 bg-white p-2 shadow-sm dark:border-zinc-600 dark:bg-zinc-800">
                  <div className="h-1.5 w-24 rounded bg-zinc-400 dark:bg-zinc-500" />
                  <div className="mt-1 h-1.5 w-32 rounded bg-zinc-400 dark:bg-zinc-500" />
                </div>
                <div className="ml-8 w-fit rounded-lg border-2 border-zinc-300 bg-white p-2 shadow-sm dark:border-zinc-600 dark:bg-zinc-800">
                  <div className="h-1.5 w-28 rounded bg-zinc-400 dark:bg-zinc-500" />
                  <div className="mt-1 h-1.5 w-20 rounded bg-zinc-400 dark:bg-zinc-500" />
                </div>
              </div>
              {/* Label */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-zinc-500 dark:text-zinc-400">
                💻 Desktop
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Board - Right Side */}
        <div className="pointer-events-none absolute bottom-[15%] right-[8%] hidden lg:block">
          <div className="relative">
            {/* Mobile Board Frame */}
            <div className="h-64 w-32 -rotate-3 rounded-2xl border-2 border-zinc-200 bg-zinc-50/90 p-2 shadow-xl backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-900/90">
              {/* Board Grid Background */}
              <div
                className="absolute inset-0 rounded-2xl opacity-20"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgb(113 113 122 / 0.3) 1px, transparent 1px),
                    linear-gradient(to bottom, rgb(113 113 122 / 0.3) 1px, transparent 1px)
                  `,
                  backgroundSize: "16px 16px",
                }}
              />
              {/* Text Objects on Board */}
              <div className="relative space-y-2 p-1">
                <div className="w-fit rounded-lg border-2 border-zinc-300 bg-white p-1.5 shadow-sm dark:border-zinc-600 dark:bg-zinc-800">
                  <div className="h-1 w-16 rounded bg-zinc-400 dark:bg-zinc-500" />
                  <div className="mt-1 h-1 w-20 rounded bg-zinc-400 dark:bg-zinc-500" />
                </div>
                <div className="ml-4 w-fit rounded-lg border-2 border-zinc-300 bg-white p-1.5 shadow-sm dark:border-zinc-600 dark:bg-zinc-800">
                  <div className="h-1 w-14 rounded bg-zinc-400 dark:bg-zinc-500" />
                </div>
              </div>
              {/* Label */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-zinc-500 dark:text-zinc-400">
                📱 Mobile
              </div>
            </div>

            {/* "Copied!" Bubble */}
            <div className="absolute -right-16 top-12">
              <div className="relative rounded-2xl bg-zinc-700 px-4 py-2 text-xs font-semibold text-white shadow-lg dark:bg-zinc-300 dark:text-zinc-900">
                Copied! ✓
                {/* Speech bubble arrow */}
                <div className="absolute left-0 top-1/2 h-0 w-0 -translate-x-1 -translate-y-1/2 border-b-[6px] border-r-[8px] border-t-[6px] border-b-transparent border-r-zinc-700 border-t-transparent dark:border-r-zinc-300" />
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-4xl">
          {/* Small badge above title */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-100 bg-white px-4 py-2 text-sm font-medium text-zinc-500 shadow-sm backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-zinc-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-zinc-500"></span>
            </span>
            200 boards available
          </div>

          <h1 className="mb-6 text-5xl font-bold tracking-tight text-zinc-800 dark:text-zinc-50 sm:text-6xl md:text-7xl">
            Public Clipboard
          </h1>
          <p className="mb-12 text-xl leading-relaxed text-zinc-500 dark:text-zinc-400 sm:text-2xl">
            Share text across your devices instantly,{" "}
            <span className="text-zinc-800 dark:text-zinc-200">no login required</span>
          </p>

          {/* CTAs */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            {/* Primary CTA */}
            <button
              onClick={handleRandomBoard}
              className="group relative rounded-full bg-zinc-800 px-8 py-4 text-lg font-semibold text-white shadow-md shadow-zinc-800/10 transition-all hover:scale-105 hover:bg-zinc-700 hover:shadow-lg hover:shadow-zinc-800/20 dark:bg-zinc-100 dark:text-zinc-900 dark:shadow-zinc-100/10 dark:hover:bg-zinc-200 dark:hover:shadow-zinc-100/20"
            >
              <span className="relative z-10">Start Sharing Now</span>
              <div className="absolute inset-0 -z-0 rounded-full bg-gradient-to-r from-zinc-700 to-zinc-900 opacity-0 transition-opacity group-hover:opacity-100 dark:from-zinc-200 dark:to-zinc-100" />
            </button>

            {/* Board Number Input */}
            <div className="flex items-center shadow-lg shadow-zinc-900/5">
              <input
                type="number"
                min="0"
                max="199"
                value={boardNumber}
                onChange={(e) => setBoardNumber(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleBoardNavigate()}
                placeholder="Board #"
                className="h-14 w-32 rounded-l-full border-2 border-r-0 border-zinc-100 bg-white px-4 py-4 text-center text-lg font-medium text-zinc-800 placeholder-zinc-400 transition-colors focus:border-zinc-300 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder-zinc-500 dark:focus:border-zinc-500 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <button
                onClick={handleBoardNavigate}
                className="flex h-14 w-14 items-center justify-center rounded-r-full border-2 border-zinc-100 bg-white text-2xl text-zinc-500 transition-all hover:bg-zinc-700 hover:text-white dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-100 dark:hover:text-zinc-900"
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
      <section className="relative border-y border-zinc-100 bg-white px-6 py-20 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="group relative overflow-hidden rounded-2xl border border-zinc-100 bg-gradient-to-br from-white to-zinc-50 p-8 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-800">
              <div className="absolute right-4 top-4 text-6xl opacity-5 transition-opacity group-hover:opacity-10">⚡</div>
              <div className="relative mb-4 text-4xl">⚡</div>
              <h3 className="mb-2 text-xl font-semibold text-zinc-800 dark:text-zinc-50">
                Instant
              </h3>
              <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                Real-time synchronization across all your devices
              </p>
            </div>
            <div className="group relative overflow-hidden rounded-2xl border border-zinc-100 bg-gradient-to-br from-white to-zinc-50 p-8 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-800">
              <div className="absolute right-4 top-4 text-6xl opacity-5 transition-opacity group-hover:opacity-10">🔓</div>
              <div className="relative mb-4 text-4xl">🔓</div>
              <h3 className="mb-2 text-xl font-semibold text-zinc-800 dark:text-zinc-50">
                No Login
              </h3>
              <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                No accounts, no sign-ups, no hassle
              </p>
            </div>
            <div className="group relative overflow-hidden rounded-2xl border border-zinc-100 bg-gradient-to-br from-white to-zinc-50 p-8 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-800">
              <div className="absolute right-4 top-4 text-6xl opacity-5 transition-opacity group-hover:opacity-10">🌐</div>
              <div className="relative mb-4 text-4xl">🌐</div>
              <h3 className="mb-2 text-xl font-semibold text-zinc-800 dark:text-zinc-50">
                Universal
              </h3>
              <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                Works on any device with a browser
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: How It Works */}
      <section id="how-it-works" className="relative px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-center text-3xl font-bold text-zinc-800 dark:text-zinc-50 sm:text-4xl">
            How It Works
          </h2>
          <p className="mb-12 text-center text-zinc-500 dark:text-zinc-400">
            Three simple steps to start sharing
          </p>
          <div className="space-y-4">
            <div className="group flex gap-6 rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm transition-all hover:border-zinc-200 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-zinc-800 text-xl font-bold text-white shadow-md transition-transform group-hover:scale-110 dark:bg-zinc-100 dark:text-zinc-900">
                1
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-xl font-semibold text-zinc-800 dark:text-zinc-50">
                  Choose a Board Number
                </h3>
                <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  Pick any number from 0 to 199. This is your shared space.
                </p>
              </div>
            </div>
            <div className="group flex gap-6 rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm transition-all hover:border-zinc-200 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-zinc-700 text-xl font-bold text-white shadow-md transition-transform group-hover:scale-110 dark:bg-zinc-200 dark:text-zinc-900">
                2
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-xl font-semibold text-zinc-800 dark:text-zinc-50">
                  Create Text Objects
                </h3>
                <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  Double-click anywhere on the canvas to create a text note. Position it wherever you like.
                </p>
              </div>
            </div>
            <div className="group flex gap-6 rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm transition-all hover:border-zinc-200 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-zinc-600 text-xl font-bold text-white shadow-md transition-transform group-hover:scale-110 dark:bg-zinc-300 dark:text-zinc-900">
                3
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-xl font-semibold text-zinc-800 dark:text-zinc-50">
                  Access from Any Device
                </h3>
                <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  Open the same board number on your other device and see your text instantly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Final CTA */}
      <section className="relative border-t border-zinc-200 bg-zinc-900 px-6 py-20 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl">
            Ready to start sharing?
          </h2>
          <p className="mb-8 text-xl text-zinc-300">
            Jump into a board and start collaborating
          </p>
          <button
            onClick={handleRandomBoard}
            className="group relative inline-flex items-center gap-2 rounded-full bg-white px-10 py-5 text-lg font-semibold text-zinc-900 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            Get Started Now
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>
      </section>

      <footer className="border-t border-zinc-100 bg-white px-6 py-10 text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <span>© {new Date().getFullYear()} Appneft</span>
          <div className="flex items-center gap-6">
            <a
              href="/privacy"
              className="font-medium text-zinc-500 transition-colors hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="font-medium text-zinc-500 transition-colors hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
