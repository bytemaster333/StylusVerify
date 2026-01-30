import VerificationWizard from "@/components/verification-wizard";
import RecentVerifications from "@/components/recent-verifications";
import { ShieldCheck, Terminal } from "lucide-react";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Header */}
      <header className="mb-12 text-center space-y-4">
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl mb-4">
          <ShieldCheck className="w-10 h-10 text-emerald-500 mr-3" />
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            StylusVerify
          </h1>
        </div>
        <p className="text-zinc-400 max-w-lg mx-auto text-lg">
          Deterministic source code verification for Arbitrum Stylus contracts.
          <br />
          <span className="text-xs font-mono text-emerald-500/80 bg-emerald-950/30 px-2 py-1 rounded mt-2 inline-block border border-emerald-900">
            Powered by WASM Integrity Proofs
          </span>
        </p>
      </header>

      {/* Main Interaction Area */}
      <section className="mb-16">
        <VerificationWizard />
      </section>

      {/* Social Proof / Footer */}
      <section className="border-t border-zinc-900 pt-12">
        <div className="flex items-center gap-2 mb-6 text-zinc-500">
          <Terminal size={18} />
          <h3 className="font-mono text-sm uppercase tracking-wider">Recently Verified Contracts</h3>
        </div>
        <RecentVerifications />
      </section>
    </main>
  );
}