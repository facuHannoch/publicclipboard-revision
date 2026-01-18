import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.publicclipboard.com"),
  title: {
    default: "Public Clipboard",
    template: "%s | Public Clipboard",
  },
  description:
    "Share text across devices instantly with public boards. No login required.",
  openGraph: {
    type: "website",
    url: "https://www.publicclipboard.com",
    siteName: "Public Clipboard",
    title: "Public Clipboard",
    description:
      "Share text across devices instantly with public boards. No login required.",
  },
  twitter: {
    card: "summary",
    title: "Public Clipboard",
    description:
      "Share text across devices instantly with public boards. No login required.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
