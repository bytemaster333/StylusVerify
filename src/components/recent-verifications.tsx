import { Check, Copy, ExternalLink } from "lucide-react";

const RECENT_ITEMS = [
  { id: 1, name: "Uniswap V4 Hook", hash: "0x8a...4b2", time: "2 mins ago", status: "Verified" },
  { id: 2, name: "Stylus Game Engine", hash: "0x12...c91", time: "14 mins ago", status: "Verified" },
  { id: 3, name: "DeFi Aggregator", hash: "0x99...a12", time: "1 hour ago", status: "Failed" },
  { id: 4, name: "Hello World Stylus", hash: "0xab...def", time: "3 hours ago", status: "Verified" },
];

export default function RecentVerifications() {
  return (
    <div className="bg-zinc-900/30 border border-zinc-800 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-zinc-500 uppercase bg-zinc-900/50 border-b border-zinc-800">
            <tr>
              <th className="px-6 py-3 font-medium">Contract Name</th>
              <th className="px-6 py-3 font-medium">Bytecode Hash</th>
              <th className="px-6 py-3 font-medium">Time</th>
              <th className="px-6 py-3 font-medium text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {RECENT_ITEMS.map((item) => (
              <tr key={item.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/20 transition-colors">
                <td className="px-6 py-4 font-medium text-zinc-300 flex items-center gap-2">
                   {item.name}
                   <ExternalLink size={12} className="text-zinc-600 cursor-pointer hover:text-zinc-400"/>
                </td>
                <td className="px-6 py-4 font-mono text-zinc-500">
                  <span className="bg-zinc-950 px-2 py-1 rounded border border-zinc-800 flex items-center gap-2 w-fit">
                    {item.hash}
                    <Copy size={10} className="hover:text-zinc-300 cursor-pointer" />
                  </span>
                </td>
                <td className="px-6 py-4 text-zinc-500">{item.time}</td>
                <td className="px-6 py-4 text-right">
                  <span className={`
                    inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border
                    ${item.status === "Verified" 
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                      : "bg-red-500/10 text-red-400 border-red-500/20"}
                  `}>
                    {item.status === "Verified" ? <Check size={12} /> : null}
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}