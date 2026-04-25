import React, { useRef, useState } from 'react';
import { motion } from "motion/react";
import html2canvas from 'html2canvas';
import { YanLing, BloodlineRank } from "../types.ts";
import { Download, TreePine, X, Loader2 } from "lucide-react";

interface OfficialCertificateProps {
  nickname: string;
  yanLing: YanLing;
  onClose: () => void;
}

export default function OfficialCertificate({ nickname, yanLing, onClose }: OfficialCertificateProps) {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const downloadImage = async () => {
    if (!certificateRef.current || isGenerating) return;
    
    setIsGenerating(true);
    try {
      // Wait for fonts to be ready
      await document.fonts.ready;
      
      const canvas = await html2canvas(certificateRef.current, {
        backgroundColor: '#f5f2ed',
        scale: 2,
        useCORS: true,
        logging: false,
        allowTaint: false,
      });
      
      const link = document.createElement('a');
      link.download = `Cassel_Admission_${nickname}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Error generating image:', err);
      alert('生成图片失败，请尝试截图保存。');
    } finally {
      setIsGenerating(false);
    }
  };

  const currentDate = new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 overflow-y-auto"
    >
      <div className="relative max-w-4xl w-full flex flex-col items-center">
        {/* Actions */}
        <div className="absolute -top-12 right-0 flex gap-4">
          <button
            onClick={downloadImage}
            disabled={isGenerating}
            className="flex items-center gap-2 px-4 py-2 bg-cassel-gold text-black font-bold text-xs uppercase rounded cursor-pointer hover:bg-white transition-colors disabled:opacity-50"
          >
            {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
            {isGenerating ? '生成中...' : '保存为图片 / Save Image'}
          </button>
          <button
            onClick={onClose}
            className="p-2 bg-zinc-800 text-white rounded cursor-pointer hover:bg-zinc-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Certificate Area */}
        <div 
          ref={certificateRef}
          className="bg-[#f5f2ed] text-amber-950 p-12 md:p-20 shadow-2xl relative overflow-hidden border-[16px] border-double border-amber-900/20 w-full max-w-[800px] aspect-[1/1.414]"
          style={{ 
            fontFamily: '"Noto Serif SC", serif',
            background: 'radial-gradient(circle at center, #fdfbf7 0%, #f5f2ed 100%)',
          }}
        >
          {/* Internal Texture Overlay (Inlined CSS Pattern) */}
          <div className="absolute inset-0 opacity-40 pointer-events-none" 
               style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\' opacity=\'0.1\'/%3E%3C/svg%3E")' }} 
          />
          {/* Subtle logo background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
            <TreePine size={400} />
          </div>

          <div className="relative z-10 h-full flex flex-col justify-between">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 border-2 border-amber-900 rounded-full flex items-center justify-center">
                  <TreePine size={32} className="text-amber-900" />
                </div>
              </div>
              <h1 className="text-3xl md:text-5xl font-serif tracking-[0.2em] font-bold uppercase">
                Cassel Academy
              </h1>
              <div className="h-px bg-amber-900/30 w-full" />
              <p className="text-sm tracking-[0.4em] uppercase opacity-60">
                Admission Certificate · 卡塞尔学院录取通知书
              </p>
            </div>

            {/* Body */}
            <div className="space-y-10 py-12">
              <p className="text-xl font-bold border-b border-amber-900/20 pb-2 inline-block">
                致 {nickname} 同学：
              </p>
              
              <div className="space-y-6 text-lg leading-relaxed indent-8 text-justify">
                <p>
                  在这个古老而又充满变革的时代，你的脉搏中跳动着被诅咒也同样被神眷顾的力量。通过诺玛（Norma）神经网络的深度扫描与血统评定，你体内的非凡基因已正式苏醒。
                </p>
                <p>
                  现正式确认你的血统评级为 <span className="font-bold text-red-800 underline decoration-double">{yanLing.rank} 级</span>，已觉醒言灵为 <span className="font-bold text-amber-900">“{yanLing.name}”</span>。
                </p>
                <p>
                  这不只是一张录取通知书，更是一份沉重的契约。当你踏入学院大门的那一刻，平庸的生活将永远离你而去，你将背负起人类文明最后的防线，在龙影幢幢的黑夜中寻找屠龙的黎明。
                </p>
                <p>
                  欢迎加入卡塞尔学院，祝你在这场孤独的战争中，依然能握紧手中的剑。
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-end">
              <div className="space-y-2 text-xs opacity-60 font-mono">
                <p>Ref No: CASSEL-{yanLing.id.toUpperCase()}-{Math.floor(Math.random()*10000)}</p>
                <p>Location: Secret Base, Chicago</p>
                <p>Date: {currentDate}</p>
              </div>
              
              <div className="text-right flex flex-col items-end">
                {/* Wax Seal */}
                <div className="mb-4 mr-4 w-24 h-24 bg-red-800 rounded-full flex items-center justify-center shadow-lg transform rotate-[-15deg] border-4 border-red-950/20 relative">
                  <div className="absolute inset-0 bg-red-900 blur-sm opacity-50" />
                  <TreePine className="text-red-200/50" size={40} />
                  <span className="absolute text-[8px] font-bold text-red-200 uppercase tracking-widest bottom-4">Secretum</span>
                </div>
                <div className="space-y-1">
                  <p className="font-serif italic text-lg text-amber-900 opacity-60">Principal</p>
                  <p className="font-serif text-3xl font-bold italic tracking-tighter text-black">Anjou</p>
                  <div className="h-0.5 w-32 bg-amber-950 mt-1" />
                  <p className="text-[10px] uppercase tracking-widest opacity-40 mt-1">希尔伯特 · 让 · 昂热</p>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Borders */}
          <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-amber-900/20" />
          <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-amber-900/20" />
          <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-amber-900/20" />
          <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-amber-900/20" />
        </div>
      </div>
    </motion.div>
  );
}
