import type { Metadata } from "next";
import HomeClient from "./home-client";

const description =
  "Share text across devices instantly with public boards. No login required.";

export const metadata: Metadata = {
  title: "Public Clipboard",
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Public Clipboard",
    description,
    url: "https://www.publicclipboard.com",
  },
  twitter: {
    title: "Public Clipboard",
    description,
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Public Clipboard",
    url: "https://www.publicclipboard.com",
    description,
    publisher: {
      "@type": "Organization",
      name: "Appneft",
      url: "https://www.publicclipboard.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient />
    </>
  );
}
