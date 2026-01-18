import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for Public Clipboard, a public text sharing board.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-20 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-50">
      <div className="mx-auto max-w-3xl">
        <a
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-800 transition-all hover:scale-105 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800"
        >
          ← Back to home
        </a>
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          Effective date: January 18, 2026
        </p>
        <h1 className="mt-4 text-4xl font-bold">Privacy Policy</h1>
        <p className="mt-6 text-lg text-zinc-500 dark:text-zinc-400">
          Public Clipboard is operated by Appneft. This policy explains what
          information we collect, how we use it, and your choices.
        </p>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Information we collect</h2>
          <ul className="space-y-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            <li>
              Board content and edits you create on any board, including text and
              positioning metadata.
            </li>
            <li>
              Technical data such as your IP address (stored as a hash), browser
              type, device information, timestamps, and board numbers.
            </li>
          </ul>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">How we use information</h2>
          <ul className="space-y-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            <li>Provide real-time board synchronization and persistence.</li>
            <li>Maintain board history, moderation, and abuse prevention.</li>
            <li>Monitor performance and reliability.</li>
          </ul>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Public content</h2>
          <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            Boards are public. Anyone with a board number can view and edit its
            contents. Do not share sensitive or personal information on a board.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Analytics</h2>
          <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            We use Umami analytics to understand usage trends. Our configuration
            does not use cookies.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Data retention</h2>
          <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            Board content and related metadata are retained indefinitely unless
            removed or overwritten.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Sharing and disclosures</h2>
          <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            We do not sell personal information. We may share data with service
            providers that help us operate the service, or when required by law.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">International access</h2>
          <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            Public Clipboard is hosted in the United States. By using the
            service, you understand that your data may be processed there.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Children’s privacy</h2>
          <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            The service is not directed to children under 13. Do not use the
            service if you are under 13.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Changes to this policy</h2>
          <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            We may update this policy from time to time. Updates will be posted
            on this page with a new effective date.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Contact</h2>
          <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            We do not currently provide a dedicated support email. Any updates or
            notices will be posted on this website.
          </p>
        </section>
      </div>
    </main>
  );
}
