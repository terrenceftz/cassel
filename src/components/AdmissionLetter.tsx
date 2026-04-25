import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { YanLing, BloodlineRank } from "../types";
import { Award, RefreshCw, Sparkles } from "lucide-react";
import OfficialCertificate from "./OfficialCertificate.tsx";

interface AdmissionLetterProps {
  nickname: string;
  yanLing: YanLing;
  onRestart: () => void;
}

export default function AdmissionLetter({ nickname, yanLing, onRestart }: AdmissionLetterProps) {
  const [showCertificate, setShowCertificate] = useState(false);

  return (
    <div className="flex flex-col md:flex-row h-full overflow-hidden">
      <AnimatePresence>
        {showCertificate && (
          <OfficialCertificate 
            nickname={nickname} 
            yanLing={yanLing} 
            onClose={() => setShowCertificate(false)} 
          />
        )}
      </AnimatePresence>

      {/* Left: Identity & Bloodline */}
      <div className="w-full md:w-1/3 flex flex-col gap-6 p-6 border-r border-cassel-border bg-black/20 overflow-y-auto">
        <div className="bg-black/40 p-4 border border-zinc-800/50">
          <p className="text-[10px] text-cassel-gold uppercase mb-4 tracking-tighter">Bloodline Profile / 血统画像</p>
          <div className="aspect-square w-full bg-zinc-900/50 border border-cassel-border relative flex items-center justify-center">
            <div className={`absolute inset-4 border border-dashed rounded-full animate-pulse ${
              yanLing.rank === BloodlineRank.S ? "border-cassel-red/30" : "border-cassel-gold/20"
            }`}></div>
            <div className="text-center z-10">
               <p className={`text-6xl font-bold ${
                 yanLing.rank === BloodlineRank.S ? "text-cassel-red" : "text-cassel-gold"
               }`}>{yanLing.rank}</p>
               <p className="text-[10px] tracking-[0.3em] mt-1 opacity-50 uppercase font-mono">Rank</p>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            <div className="flex justify-between text-xs border-b border-cassel-border/30 pb-2">
              <span className="opacity-40 uppercase">Candidate:</span>
              <span className="text-cassel-gray font-bold">{nickname}</span>
            </div>
            <div className="flex justify-between text-xs border-b border-cassel-border/30 pb-2">
              <span className="opacity-40 uppercase">Blood Stability:</span>
              <span className="text-green-500 italic">94.2% (Stable)</span>
            </div>
            <div className="flex justify-between text-xs border-b border-cassel-border/30 pb-2">
              <span className="opacity-40 uppercase">Assigned Dept:</span>
              <span className="text-cassel-gray">Execution Bureau</span>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-black/40 p-4 border border-zinc-800/50 relative min-h-[160px]">
          <p className="text-[10px] text-cassel-gold uppercase mb-3 tracking-tighter">Analysis Result / 分析结论</p>
          <div className="text-[11px] leading-relaxed opacity-70 font-chinese">
            {yanLing.personality}
            <br /><br />
            <span className="text-cassel-gold font-bold">导师评价：</span>
            {yanLing.rank === BloodlineRank.S 
              ? "\"这颗星辰虽然沉寂，但在它燃烧的那一刻，整个宇宙都会为其加冕。\""
              : "\"在屠龙的战场上，你的血脉将是你最忠诚的武装。\""}
          </div>
          
          {/* Red Seal */}
          <div className="absolute bottom-4 right-4 w-16 h-16 border-2 border-cassel-red/40 rounded-full flex items-center justify-center rotate-12 opacity-40">
             <div className="text-[8px] font-bold text-cassel-red text-center leading-none uppercase">Anjou<br />Approved</div>
          </div>
        </div>
      </div>

      {/* Right: The Words of Power Result */}
      <div className="flex-1 flex flex-col bg-zinc-900/30">
        <div className="flex-1 relative flex flex-col items-center justify-center p-12 text-center shadow-inner overflow-y-auto">
          <div className={`absolute inset-0 ${
            yanLing.rank === BloodlineRank.S 
              ? "bg-[radial-gradient(circle_at_center,_rgba(139,0,0,0.1)_0%,_transparent_70%)]" 
              : "bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.05)_0%,_transparent_70%)]"
          }`}></div>
          
          {/* Yan Ling (Words of Power) Reveal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="z-10 w-full flex flex-col items-center"
          >
            <p className="text-[10px] tracking-[0.5em] text-cassel-gold uppercase mb-2">Awakened Word of Power</p>
            <h2 className="text-5xl md:text-7xl font-bold text-cassel-gray mb-4 tracking-widest drop-shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              言灵 · {yanLing.name}
            </h2>
            <p className="text-sm italic text-cassel-gold/60 mb-10 font-serif">Yan Ling: {yanLing.id.replace(/_/g, ' ').toUpperCase()}</p>
            
            <div className="max-w-md w-full bg-black/60 p-6 border-l-2 border-cassel-gold text-left relative">
              <p className="text-xs text-cassel-gold uppercase tracking-widest mb-2 font-mono">Capabilities / 效能分析</p>
              <p className="text-sm leading-relaxed text-cassel-gray/80">
                {yanLing.description}
                <br /><br />
                <span className="text-cassel-gold font-bold">领域效果：</span> 
                {yanLing.effect}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-12 flex flex-wrap gap-4 justify-center">
               <button 
                 onClick={onRestart}
                 className="flex items-center gap-2 px-8 py-3 bg-transparent border border-cassel-border text-cassel-gray/50 hover:text-cassel-gold hover:border-cassel-gold transition-all text-[10px] font-bold uppercase tracking-widest"
               >
                 <RefreshCw size={14} /> Re-Evaluate
               </button>
               <button 
                 onClick={() => setShowCertificate(true)}
                 className="flex items-center gap-2 px-10 py-3 bg-cassel-gold text-black font-bold tracking-widest text-[10px] uppercase hover:bg-white transition-colors duration-300 shadow-lg shadow-cassel-gold/10 cursor-pointer"
               >
                 <Sparkles size={14} /> Accept Enrollment / 接受入学
               </button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Stats Grid */}
        <div className="grid grid-cols-4 gap-px bg-cassel-border h-24 shrink-0">
          <div className="bg-cassel-panel p-3 flex flex-col items-center justify-center border-t border-cassel-border">
            <p className="text-[9px] opacity-40 uppercase tracking-tighter mb-1">Intelligence</p>
            <p className="text-lg font-mono font-bold text-cassel-gold">94%</p>
          </div>
          <div className="bg-cassel-panel p-3 flex flex-col items-center justify-center border-t border-cassel-border">
            <p className="text-[9px] opacity-40 uppercase tracking-tighter mb-1">Strength</p>
            <p className="text-lg font-mono font-bold text-cassel-gold">88%</p>
          </div>
          <div className="bg-cassel-panel p-3 flex flex-col items-center justify-center border-t border-cassel-border">
            <p className="text-[9px] opacity-40 uppercase tracking-tighter mb-1">Dragon Synch</p>
            <p className="text-lg font-mono font-bold text-cassel-gold">99.9%</p>
          </div>
          <div className="bg-cassel-panel p-3 flex flex-col items-center justify-center border-t border-cassel-border">
            <p className="text-[9px] opacity-40 uppercase tracking-tighter mb-1">Risk Level</p>
            <p className={`text-lg font-mono font-bold ${
              yanLing.rank === BloodlineRank.S ? "text-cassel-red animate-pulse" : "text-cassel-gold"
            }`}>
              {yanLing.rank === BloodlineRank.S ? "CRITICAL" : "HIGH"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
