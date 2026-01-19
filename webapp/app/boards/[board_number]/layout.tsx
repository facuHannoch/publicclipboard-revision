import type { Metadata } from "next";

export const runtime = 'edge';

export function generateMetadata({
  params,
}: {
  params: { board_number: string };
}): Metadata {
  return {
    title: `Board #${params.board_number}`,
    robots: {
      index: false,
      follow: false,
      nocache: true,
      noarchive: true,
    },
  };
}

export default function BoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
