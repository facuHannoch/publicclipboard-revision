import type { Metadata } from "next";

export const runtime = 'edge';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ board_number: string }>;
}): Promise<Metadata> {
  const { board_number } = await params;
  return {
    title: `Board #${board_number}`,
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
