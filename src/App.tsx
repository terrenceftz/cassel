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

type Step = 'intro' | 'name' | 'quiz' | 'processing' | 'result' | 'muggle_warning';

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
      if (result.id === 'muggle') {
        setStep('muggle_warning');
      } else {
        setStep('result');
      }
    }, 2800);
  };

  const restart = () => {
    setStep('intro');
    setNickname('');
    setCurrentQuestionIndex(0);
    setAnswers({});
    setYanLing(null);
    setMuggleCountdown(5);
  };

  const [muggleCountdown, setMuggleCountdown] = useState(5);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 'muggle_warning' && muggleCountdown > 0) {
      timer = setTimeout(() => setMuggleCountdown(prev => prev - 1), 1000);
    } else if (step === 'muggle_warning' && muggleCountdown === 0) {
      restart();
    }
    return () => clearTimeout(timer);
  }, [step, muggleCountdown]);

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
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-[1100px] md:h-[780px] min-h-[85vh] h-auto bg-cassel-panel border border-cassel-border shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden"
      >
        <div className="scan-line" />
        {/* Frame Corners */}
        <div className="corner-top-left" />
        <div className="corner-top-right" />
        <div className="corner-bottom-left" />
        <div className="corner-bottom-right" />

        {/* Header Branding */}
        <header className="h-20 md:h-24 border-b border-cassel-border flex items-center justify-between px-6 md:px-10 bg-black/60 backdrop-blur-xl shrink-0">
          <div className="flex items-center gap-4 md:gap-6">
            <div className="w-10 h-10 md:w-14 md:h-14 border border-cassel-gold/60 rotate-45 flex items-center justify-center overflow-hidden bg-zinc-900/80 shadow-[0_0_20px_rgba(212,175,55,0.1)]">
              <div className="-rotate-45 text-cassel-gold font-display font-bold text-lg md:text-2xl">C</div>
            </div>
            <div>
              <h1 className="text-[10px] md:text-[12px] tracking-[0.4em] md:tracking-[0.6em] text-cassel-gold uppercase font-display">Cassell Academy</h1>
              <p className="text-sm md:text-lg tracking-widest font-chinese opacity-90 font-bold">卡塞尔学院 · 龙族基因档案</p>
            </div>
          </div>
          <div className="text-right font-mono hidden sm:block">
            <p className="text-[10px] opacity-40 uppercase tracking-widest">Classification: TOP SECRET // V-VI</p>
            <p className={`text-sm font-bold uppercase tracking-widest ${step === 'result' ? 'text-cassel-gold' : 'text-cassel-red animate-pulse'}`}>
              {step === 'result' ? `血统级别: ${yanLing?.rank}-LEVEL` : '血统代码: 解析中...'}
            </p>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_100%)]">
          <AnimatePresence mode="wait">
            {step === 'intro' && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, filter: "blur(20px)" }}
                className="h-full flex flex-col items-center justify-center p-6 md:p-12 space-y-8 md:space-y-12 text-center"
              >
                <div className="space-y-4 text-center">
                  <motion.h2 
                    initial={{ letterSpacing: "1em", opacity: 0 }}
                    animate={{ letterSpacing: "0.2em", opacity: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="text-5xl sm:text-7xl md:text-9xl font-display text-gold-gradient font-bold"
                  >
                    CASSEL
                  </motion.h2>
                  <p className="text-sm sm:text-xl md:text-2xl font-serif italic text-cassel-gold/40 tracking-[0.4em] uppercase">
                    World Tree Enrollment Agent
                  </p>
                </div>
                <div className="max-w-2xl text-center space-y-6 md:space-y-10">
                  <p className="text-cassel-gray/60 leading-relaxed font-chinese text-sm sm:text-base md:text-lg italic px-4 md:px-8">
                    “我们是屠龙者，在这个注定要倾覆的世界里，握紧最后的余晖。”
                  </p>
                  <button
                    id="btn-start-exam"
                    onClick={handleStart}
                    className="group relative px-8 md:px-12 py-4 md:py-5 bg-transparent overflow-hidden border border-cassel-gold/40 transition-all duration-500 hover:border-cassel-gold cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-cassel-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    <span className="relative z-10 text-cassel-gold group-hover:text-black font-bold tracking-[0.4em] text-xs sm:text-sm uppercase transition-colors">
                      评估血统阶级 / Assess Rank
                    </span>
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
                className="h-full p-6 md:p-12 flex flex-col justify-center max-w-4xl mx-auto"
              >
                <div className="flex justify-between items-center mb-8 md:mb-16 border-b border-cassel-gold/10 pb-4 md:pb-6">
                   <div className="flex items-center gap-4 md:gap-6">
                     <span className="text-[10px] md:text-xs font-mono text-cassel-gold/40 tracking-widest uppercase">Progress: [{currentQuestionIndex + 1}/{QUESTIONS.length}]</span>
                     <div className="w-32 md:w-64 h-[1px] md:h-[2px] bg-cassel-border relative">
                       <motion.div 
                         className="absolute inset-0 bg-cassel-gold origin-left shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                         initial={{ scaleX: 0 }}
                         animate={{ scaleX: (currentQuestionIndex + 1) / QUESTIONS.length }}
                       />
                     </div>
                   </div>
                   <span className="text-sm md:text-lg font-display text-cassel-gold tracking-[0.3em] md:tracking-[0.5em] uppercase">Ph_{currentQuestionIndex + 1}</span>
                </div>

                <h3 className="text-xl sm:text-2xl md:text-4xl font-bold mb-8 md:mb-16 leading-tight tracking-tight">
                  {QUESTIONS[currentQuestionIndex].text}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 pb-8 md:pb-0">
                  {QUESTIONS[currentQuestionIndex].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(option.weights)}
                      className="text-left p-5 md:p-8 border border-white/5 bg-white/[0.02] hover:border-cassel-gold/40 hover:bg-cassel-gold/[0.03] transition-all duration-300 group relative overflow-hidden cursor-pointer"
                    >
                      <div className="absolute left-0 top-0 w-[2px] h-0 bg-cassel-gold group-hover:h-full transition-all duration-500" />
                      <span className="text-sm sm:text-base md:text-lg text-cassel-gray/60 group-hover:text-cassel-gray transition-colors leading-relaxed">{option.label}</span>
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

            {step === 'muggle_warning' && (
              <motion.div
                key="muggle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center space-y-8 p-12 text-center"
              >
                <div className="w-24 h-24 border-4 border-cassel-red rounded-full flex items-center justify-center animate-pulse">
                  <span className="text-4xl text-cassel-red font-bold">!</span>
                </div>
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-cassel-red uppercase tracking-widest">警告：非混血种目标</h2>
                  <p className="text-xl text-white/80">
                    检测到你的血统比例为 <span className="text-cassel-red font-bold">0%</span>。
                  </p>
                  <p className="text-lg text-cassel-gray">
                    你是个麻瓜，不属于卡塞尔学院。为了保密协议，诺玛将在五秒后消除你的记忆。
                  </p>
                </div>
                <div className="text-6xl font-mono text-cassel-red">
                  {muggleCountdown}
                </div>
                <div className="text-[10px] text-white/20 font-mono tracking-widest">
                  MEMORY WIPE IN PROGRESS... NORMA EXECUTING PROTOCOL 7-B
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
        <footer className="h-10 px-8 flex items-center justify-between text-[8px] sm:text-[9px] tracking-widest uppercase opacity-30 border-t border-cassel-border font-mono shrink-0">
          <span className="hidden sm:inline">终端状态: 已连接 (Active)</span>
          <span className="sm:hidden">Status: Active</span>
          <span className="hidden md:inline">加密线路: CASSELL-NET-ALPHA-V</span>
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

