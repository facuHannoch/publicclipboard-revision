"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

interface TextObject {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  content: string;
}

export default function BoardPage() {
  const params = useParams();
  const boardNumber = params.board_number as string;

  // Demo text objects
  const [objects] = useState<TextObject[]>([
    {
      id: "demo-1",
      x: 200,
      y: 150,
      width: 300,
      height: 200,
      content: "Welcome to Board " + boardNumber + "!\n\nDouble-click anywhere to create a new text object.",
    },
    {
      id: "demo-2",
      x: 600,
      y: 400,
      width: 280,
      height: 150,
      content: "This is a demo text object.\n\nYou can position these anywhere on the canvas!",
    },
  ]);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-zinc-100 dark:bg-zinc-900">
      {/* Board Header */}
      <header className="absolute left-0 right-0 top-0 z-10 border-b border-zinc-300 bg-white/80 px-6 py-4 backdrop-blur dark:border-zinc-700 dark:bg-zinc-950/80">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Public Clipboard
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Board #{boardNumber}
            </p>
          </div>
          <a
            href="/"
            className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            ← Home
          </a>
        </div>
      </header>

      {/* Canvas */}
      <div className="absolute inset-0 pt-[73px]">
        <div className="relative h-full w-full overflow-auto">
          {/* Canvas container with fixed dimensions */}
          <div
            className="relative bg-white dark:bg-zinc-950"
            style={{
              width: "1920px",
              height: "1080px",
              minWidth: "1920px",
              minHeight: "1080px",
            }}
          >
            {/* Grid background */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgb(229 231 235 / 0.3) 1px, transparent 1px),
                  linear-gradient(to bottom, rgb(229 231 235 / 0.3) 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
              }}
            />

            {/* Text Objects */}
            {objects.map((obj) => (
              <div
                key={obj.id}
                className="absolute cursor-move rounded-lg border-2 border-zinc-300 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900"
                style={{
                  left: `${obj.x}px`,
                  top: `${obj.y}px`,
                  width: `${obj.width}px`,
                  height: `${obj.height}px`,
                }}
              >
                <div className="h-full overflow-auto whitespace-pre-wrap text-sm text-zinc-900 dark:text-zinc-50">
                  {obj.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        className="fixed bottom-8 left-8 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 text-2xl text-white shadow-lg transition-all hover:scale-110 hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        title="Create new text object"
      >
        +
      </button>
    </div>
  );
}
