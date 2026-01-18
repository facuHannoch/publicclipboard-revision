import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Public Clipboard.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
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
        <h1 className="mt-4 text-4xl font-bold">Terms of Service</h1>
        <p className="mt-6 text-lg text-zinc-500 dark:text-zinc-400">
          These Terms of Service ("Terms") govern your use of Public Clipboard,
          operated by Appneft. By accessing or using the service, you agree to
          these Terms.
        </p>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Eligibility</h2>
          <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            The service is not directed to children under 13. If you are under
            13, you may not use the service.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Public nature of boards</h2>
          <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            Boards are public and can be accessed by anyone with the board
            number. Do not post confidential, personal, or sensitive
            information.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Your responsibilities</h2>
          <ul className="space-y-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            <li>Use the service in compliance with applicable laws.</li>
            <li>Respect other users and avoid abusive or harmful content.</li>
            <li>Do not attempt to disrupt or overload the service.</li>
          </ul>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Prohibited content</h2>
          <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            You may not use the service to post illegal content, malware,
            phishing, or material that infringes intellectual property rights.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Moderation</h2>
          <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            We may remove content or restrict access to boards to address abuse
            or protect the service. IP addresses are stored as hashes for
            moderation and abuse prevention.
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
          <h2 className="text-2xl font-semibold">Service availability</h2>
          <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            The service is provided on an "as is" and "as available" basis. We
            do not guarantee that the service will be uninterrupted or error
            free.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Limitation of liability</h2>
          <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            To the fullest extent permitted by law, Appneft will not be liable
            for any indirect, incidental, special, consequential, or punitive
            damages arising from your use of the service.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Termination</h2>
          <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            We may suspend or terminate access to the service at any time to
            address abuse or protect the service.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Governing law</h2>
          <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            These Terms are governed by the laws of the jurisdiction where
            Appneft is established, without regard to conflict of laws rules.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Changes to these Terms</h2>
          <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            We may update these Terms from time to time. Updates will be posted
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
