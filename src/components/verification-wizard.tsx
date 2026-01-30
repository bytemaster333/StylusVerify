"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, CheckCircle2, XCircle, RefreshCw, Loader2, ArrowRight } from "lucide-react";

// SCENERIO 1: DEMO DATA
const DEMO_DATA = {
  repo: "https://github.com/arbitrum-dev/stylus-hello-world",
  address: "0x1234567890123456789012345678901234567890",
  commit: "a1b2c3d",
};

// MOCK TERMINAL LOGS
const SUCCESS_LOGS = [
  "> git clone https://github.com/arbitrum-dev/stylus-hello-world",
  "> checking out commit a1b2c3d...",
  "> cargo stylus check",
  "> preparing docker environment (stylus-sdk:0.4.1)...",
  "> compiling target/wasm32-unknown-unknown/release/hello_world.wasm...",
  "> applying optimizations (wasm-opt -Oz)...",
  "> extracting on-chain bytecode from 0x1234...90",
  "> comparing hashes...",
  "> MATCH FOUND: 0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069"
];

export default function VerificationWizard() {
  const [formData, setFormData] = useState({ repo: "", address: "", commit: "" });
  const [status, setStatus] = useState<"idle" | "verifying" | "success" | "error">("idle");
  const [logs, setLogs] = useState<string[]>([]);

  // Write demo data
  const loadDemoData = () => {
    setFormData(DEMO_DATA);
    setStatus("idle");
    setLogs([]);
  };

  const handleVerify = async () => {
    if (!formData.repo || !formData.address) return;

    setStatus("verifying");
    setLogs([]);
    
    // SCENERIO CHECK
    const isSuccessScenario = 
      formData.repo === DEMO_DATA.repo && 
      formData.address === DEMO_DATA.address;

    if (isSuccessScenario) {
      // --- SCENERIO 1: SUCCESS SIMULATION ---
      
      // Logs in the Terminal
      for (let i = 0; i < SUCCESS_LOGS.length; i++) {
        await new Promise(r => setTimeout(r, 400)); // Wait 400 ms
        setLogs(prev => [...prev, SUCCESS_LOGS[i]]);
      }

      await new Promise(r => setTimeout(r, 600)); // Last wait
      setStatus("success");
    } else {
      // --- SCENERIO 2: ERROR SIMULATION ---
      
      setLogs(["> connecting to Arbitrum One node...", "> fetching contract bytecode..."]);
      await new Promise(r => setTimeout(r, 1500));
      setLogs(prev => [...prev, "> ERROR: Bytecode mismatch!"]);
      setStatus("error");
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* SOL: FORM ALANI */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 shadow-xl backdrop-blur-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Verification Params</h2>
          <button 
            onClick={loadDemoData}
            className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-1.5 rounded transition-colors border border-zinc-700 font-mono"
          >
            Load Demo Data
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-zinc-500 mb-1.5 ml-1">SMART CONTRACT ADDRESS</label>
            <input
              type="text"
              placeholder="0x..."
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm font-mono text-zinc-300 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all placeholder:text-zinc-700"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-500 mb-1.5 ml-1">GITHUB REPO URL</label>
            <input
              type="text"
              placeholder="https://github.com/..."
              value={formData.repo}
              onChange={(e) => setFormData({...formData, repo: e.target.value})}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm font-mono text-zinc-300 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all placeholder:text-zinc-700"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-500 mb-1.5 ml-1">COMMIT HASH (OPTIONAL)</label>
            <input
              type="text"
              placeholder="Latest"
              value={formData.commit}
              onChange={(e) => setFormData({...formData, commit: e.target.value})}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm font-mono text-zinc-300 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all placeholder:text-zinc-700"
            />
          </div>

          <button
            onClick={handleVerify}
            disabled={status === "verifying" || !formData.address || !formData.repo}
            className="w-full mt-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-800 disabled:text-zinc-600 disabled:cursor-not-allowed text-white font-medium py-3.5 rounded-lg transition-all flex items-center justify-center gap-2 group"
          >
            {status === "verifying" ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Running Simulation...
              </>
            ) : (
              <>
                Verify Integrity
                <Play size={16} className="group-hover:translate-x-1 transition-transform" fill="currentColor" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* RIGHT: CONCLUSION AND TERMINAL */}
      <div className="relative">
        <AnimatePresence mode="wait">
          {status === "idle" && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="h-full flex flex-col items-center justify-center border border-dashed border-zinc-800 rounded-xl p-8 text-zinc-600 bg-zinc-900/20"
            >
              <RefreshCw size={48} className="mb-4 opacity-20" />
              <p className="text-sm font-mono">Ready to verify contract source.</p>
            </motion.div>
          )}

          {status === "verifying" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="bg-black border border-zinc-800 rounded-xl p-4 h-full font-mono text-xs overflow-hidden shadow-2xl relative"
            >
              <div className="flex items-center gap-1.5 mb-3 border-b border-zinc-900 pb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                <span className="ml-2 text-zinc-600">simulation-runner — bash — 80x24</span>
              </div>
              <div className="space-y-1">
                {logs.map((log, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-emerald-500/90 break-all"
                  >
                    {log}
                  </motion.div>
                ))}
                <motion.div 
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="w-2 h-4 bg-emerald-500 inline-block align-middle ml-1"
                />
              </div>
            </motion.div>
          )}

          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full bg-gradient-to-b from-emerald-950/30 to-zinc-900 border border-emerald-500/30 rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-[0_0_50px_-12px_rgba(16,185,129,0.3)]"
            >
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 ring-1 ring-emerald-500/50">
                <CheckCircle2 size={48} className="text-emerald-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Verified Match</h2>
              <p className="text-zinc-400 mb-6 max-w-xs">
                The GitHub source code produces the exact same WASM bytecode found on-chain.
              </p>
              
              <div className="bg-black/40 rounded-lg p-3 w-full border border-emerald-500/20 text-left">
                <p className="text-[10px] text-zinc-500 font-mono uppercase mb-1">Generated WASM Hash</p>
                <p className="text-xs text-emerald-400 font-mono break-all">0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069</p>
              </div>

              <button 
                onClick={() => setStatus("idle")}
                className="mt-6 text-sm text-zinc-400 hover:text-white flex items-center gap-2 transition-colors"
              >
                Verify Another <ArrowRight size={14} />
              </button>
            </motion.div>
          )}

          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full bg-gradient-to-b from-red-950/30 to-zinc-900 border border-red-500/30 rounded-xl p-8 flex flex-col items-center justify-center text-center"
            >
              <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-6 ring-1 ring-red-500/50">
                <XCircle size={48} className="text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Verification Failed</h2>
              <p className="text-zinc-400 mb-6">
                The compiled source code does not match the on-chain bytecode.
              </p>
              
              <div className="bg-red-950/30 rounded px-4 py-2 border border-red-500/20">
                <p className="text-xs text-red-400 font-mono">Error: Hash Mismatch (Diff: 14.2%)</p>
              </div>

              <button 
                onClick={() => setStatus("idle")}
                className="mt-6 text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Try Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}