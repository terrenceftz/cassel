/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QUESTIONS, YAN_LINGS } from './constants.ts';
import { YanLing, BloodlineRank } from './types.ts';
import CasselLogo from './components/CasselLogo.tsx';
import AdmissionLetter from './components/AdmissionLetter.tsx';
import { ChevronRight, Sparkles, Wand2, RefreshCw } from 'lucide-react';

type Step = 'intro' | 'name' | 'quiz' | 'processing' | 'result';

export default function App() {
  const [step, setStep] = useState<Step>('intro');
  const [nickname, setNickname] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [yanLing, setYanLing] = useState<YanLing | null>(null);

  const handleStart = () => setStep('name');

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nickname.trim()) setStep('quiz');
  };

  const handleAnswer = (weights: Record<string, number>) => {
    const newAnswers = { ...answers };
    Object.entries(weights).forEach(([key, val]) => {
      newAnswers[key] = (newAnswers[key] || 0) + val;
    });
    setAnswers(newAnswers);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: Record<string, number>) => {
    setStep('processing');
    
    // Add a small random "chaos factor" to make close results varied
    const scores = { ...finalAnswers };
    Object.keys(scores).forEach(key => {
      scores[key] = scores[key] * (0.9 + Math.random() * 0.2); 
    });

    let bestId = 'wind_kings_breath';
    let maxWeight = -1;

    Object.entries(scores).forEach(([id, weight]) => {
      if (weight > maxWeight) {
        maxWeight = weight;
        bestId = id;
      }
    });

    const result = YAN_LINGS.find(y => y.id === bestId) || YAN_DELETE_PLACEHOLDER;
    
    setTimeout(() => {
      setYanLing(result);
      setStep('result');
    }, 2800);
  };

  const restart = () => {
    setStep('intro');
    setNickname('');
    setCurrentQuestionIndex(0);
    setAnswers({});
    setYanLing(null);
  };

  return (
    <div className="min-h-screen bg-cassel-dark flex items-center justify-center p-4 selection:bg-cassel-gold selection:text-black overflow-hidden relative">
      {/* Background Atmosphere */}
      <div className="glow-red" />
      <div className="glow-amber" />

      {/* Screen HUD Brackets */}
      <div className="fixed top-10 left-10 w-24 h-px bg-cassel-gold/20" />
      <div className="fixed top-10 left-10 h-24 w-px bg-cassel-gold/20" />
      <div className="fixed bottom-10 right-10 w-24 h-px bg-cassel-gold/20" />
      <div className="fixed bottom-10 right-10 h-24 w-px bg-cassel-gold/20" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-[900px] h-[680px] bg-cassel-panel border border-cassel-border shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Frame Corners */}
        <div className="corner-top-left" />
        <div className="corner-top-right" />
        <div className="corner-bottom-left" />
        <div className="corner-bottom-right" />

        {/* Header Branding */}
        <header className="h-20 border-b border-cassel-border flex items-center justify-between px-8 bg-black/40">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 border border-cassel-gold rotate-45 flex items-center justify-center overflow-hidden bg-zinc-900">
              <div className="-rotate-45 text-cassel-gold font-bold text-lg">C</div>
            </div>
            <div>
              <h1 className="text-[10px] tracking-[0.4em] text-cassel-gold uppercase font-serif">Cassell College</h1>
              <p className="text-sm tracking-widest font-chinese opacity-80 decoration-cassel-gold uppercase">卡塞尔学院 · 龙族基因档案</p>
            </div>
          </div>
          <div className="text-right font-mono">
            <p className="text-[9px] opacity-40 uppercase">档案级别: 绝密 (TOP SECRET)</p>
            <p className="text-cassel-red text-xs font-bold uppercase tracking-tighter">
              {step === 'result' ? `血统代码: ${yanLing?.rank}-LEVEL` : '血统代码: 扫描中...'}
            </p>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            {step === 'intro' && (
              <motion.div
                key="intro"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center p-8 space-y-8"
              >
                <div className="space-y-4 text-center">
                  <h2 className="text-6xl md:text-8xl font-display text-gold-gradient tracking-widest font-bold">
                    CASSEL
                  </h2>
                  <p className="text-xl font-serif italic text-cassel-gold/60 tracking-tighter uppercase">
                    Enrollment & Bloodline Assessment
                  </p>
                </div>
                <div className="max-w-md text-center space-y-6">
                  <p className="text-cassel-gray/50 leading-relaxed font-chinese text-sm">
                    欢迎来到卡塞尔学院。龙的权能沉睡于你的血液中，屠龙的誓言刻印在星空的倒影里。请准备好面对真实的自己。
                  </p>
                  <button
                    id="btn-start-exam"
                    onClick={handleStart}
                    className="group px-10 py-4 bg-cassel-gold text-black font-bold tracking-widest text-xs uppercase hover:bg-white transition-colors duration-300 shadow-[0_0_20px_rgba(212,175,55,0.2)] cursor-pointer"
                  >
                    开始血统鉴定 / Start Assessment
                  </button>
                </div>
              </motion.div>
            )}

            {step === 'name' && (
              <motion.div
                key="name"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center p-8 space-y-12"
              >
                <div className="text-center space-y-4">
                  <p className="text-xs uppercase tracking-[0.5em] text-cassel-gold">身份录入 / Identity Input</p>
                  <h2 className="text-4xl font-display uppercase">Candidate Profile</h2>
                </div>
                <form onSubmit={handleNameSubmit} className="w-full max-w-sm space-y-8">
                  <div className="relative">
                    <input
                      autoFocus
                      type="text"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      placeholder="输入你的代号..."
                      className="w-full bg-black/20 border border-cassel-border p-5 text-xl font-serif text-center focus:outline-none focus:border-cassel-gold transition-all placeholder:opacity-20 text-cassel-gold"
                    />
                    <div className="absolute inset-0 border border-cassel-gold/10 pointer-events-none -m-1" />
                  </div>
                  <button
                    id="btn-submit-name"
                    type="submit"
                    disabled={!nickname.trim()}
                    className="w-full py-4 bg-transparent border border-cassel-gold/40 text-cassel-gold font-bold tracking-[0.3em] text-xs uppercase hover:bg-cassel-gold hover:text-black disabled:opacity-20 transition-all cursor-pointer"
                  >
                    接入节点 / Access Neural Net
                  </button>
                </form>
              </motion.div>
            )}

            {step === 'quiz' && (
              <motion.div
                key={`quiz-${currentQuestionIndex}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full p-12 flex flex-col justify-center max-w-3xl mx-auto"
              >
                <div className="flex justify-between items-center mb-12 border-b border-cassel-border pb-4">
                   <div className="flex items-center gap-4">
                     <span className="text-xs font-mono text-cassel-gold/40">进度评估: [{currentQuestionIndex + 1}/{QUESTIONS.length}]</span>
                     <div className="w-48 h-1 bg-cassel-border relative">
                       <motion.div 
                         className="absolute inset-0 bg-cassel-gold origin-left"
                         initial={{ scaleX: 0 }}
                         animate={{ scaleX: (currentQuestionIndex + 1) / QUESTIONS.length }}
                       />
                     </div>
                   </div>
                   <span className="text-xs font-mono text-cassel-gold tracking-widest uppercase">Question_{currentQuestionIndex + 1}</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold mb-12 leading-relaxed">
                  {QUESTIONS[currentQuestionIndex].text}
                </h3>

                <div className="grid gap-4">
                  {QUESTIONS[currentQuestionIndex].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(option.weights)}
                      className="text-left p-6 border border-cassel-border bg-black/20 hover:border-cassel-gold/60 hover:bg-cassel-gold/5 transition-all group flex items-center justify-between cursor-pointer"
                    >
                      <span className="text-base text-cassel-gray/70 group-hover:text-cassel-gold transition-colors">{option.label}</span>
                      <ChevronRight size={16} className="text-cassel-gold opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 'processing' && (
              <motion.div
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center space-y-12"
              >
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                    className="w-40 h-40 border border-cassel-gold/10 border-t-cassel-gold rounded-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Wand2 size={40} className="text-cassel-gold animate-pulse" />
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <p className="text-xs tracking-[0.6em] text-cassel-gold uppercase animate-pulse">正在分析基因序列 / Analyzing Gene Sequence</p>
                  <p className="font-mono text-[10px] text-white/20 uppercase tracking-widest">与“世界树”主机同步中... Syncing with Mainframe</p>
                </div>
              </motion.div>
            )}

            {step === 'result' && yanLing && (
              <motion.div
                key="result"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex overflow-hidden"
              >
                <div className="flex-1">
                  <AdmissionLetter 
                    nickname={nickname} 
                    yanLing={yanLing} 
                    onRestart={restart} 
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Footer Navigation */}
        <footer className="h-10 px-8 flex items-center justify-between text-[9px] tracking-widest uppercase opacity-30 border-t border-cassel-border font-mono">
          <span>终端状态: 已连接 (Active)</span>
          <span>加密线路: CASSELL-NET-ALPHA-V</span>
          <span>日期: {new Date().toLocaleDateString()}</span>
        </footer>
      </motion.div>
    </div>
  );
}

const YAN_DELETE_PLACEHOLDER: YanLing = {
  id: "unknown",
  name: "未知",
  rank: BloodlineRank.C,
  description: "尚未觉醒的言灵。",
  effect: "等待时机。",
  personality: "迷茫。"
};

