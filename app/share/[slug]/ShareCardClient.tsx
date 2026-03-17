'use client';

import { 
  Zap, 
  Flame, 
  Target, 
  Award, 
  TrendingUp, 
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ShareCardClient({ card, slug }: { card: any, slug: string }) {
  if (!card) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-[#F5F0E8] p-8 text-center font-archivo italic">
        <h1 className="text-8xl font-black text-black opacity-10 mb-4">404</h1>
        <h2 className="text-2xl font-black uppercase italic">Card Not Found</h2>
        <p className="text-sm font-bold opacity-40 uppercase mt-2 mb-8">This share link has expired or never existed.</p>
        <Link href="/" className="neo-button px-8 py-4 bg-[#FFE500] text-sm font-black uppercase italic shadow-[4px_4px_0_0_#000]">
          Back to VAULTA
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#F5F0E8] font-archivo italic relative overflow-hidden">
      {/* Header */}
      <header className="px-6 py-6 border-b-3 border-black bg-white flex justify-between items-center z-10 shrink-0">
          <div className="flex items-center gap-2">
              <Zap className="text-black fill-[#FFE500]" size={24} />
              <span className="font-black text-xl tracking-tighter">VAULTA</span>
          </div>
          <div className="bg-black text-white px-2 py-1 text-[8px] font-black uppercase italic border-2 border-black">
              VERIFIED ON BASE
          </div>
      </header>

      {/* Card Content */}
      <div className="flex-1 flex flex-col p-6 justify-center items-center gap-8 relative">
        {/* Background Gradients/Vibe */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute top-0 -left-20 w-64 h-64 bg-[#FFE500] rounded-full blur-3xl" />
            <div className="absolute bottom-0 -right-20 w-64 h-64 bg-[#FF4D4D] rounded-full blur-3xl" />
        </div>

        {card.type === 'streak' && (
            <motion.div 
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className="w-full space-y-6 text-center z-10"
            >
                <div className="w-32 h-32 bg-[#FFE500] border-4 border-black neo-shadow mx-auto flex items-center justify-center rotate-[-5deg]">
                    <Flame size={64} strokeWidth={3} fill="currentColor" />
                </div>
                <div className="space-y-1">
                    <h2 className="text-[64px] font-black leading-none tracking-tighter italic uppercase underline decoration-[#FF4D4D] decoration-8">
                        {card.data.streak} WEEK<br/>STREAK
                    </h2>
                    <p className="text-lg font-black opacity-40 uppercase tracking-widest mt-4">
                        Earning {card.data.apy || '8.6'}% APY on Base
                    </p>
                </div>
            </motion.div>
        )}

        {card.type === 'goal' && (
            <motion.div 
                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                className="w-full space-y-8 z-10"
            >
                <div className="flex items-center justify-center gap-4">
                    <span className="text-6xl">{card.data.emoji || '🎯'}</span>
                    <h2 className="text-4xl font-black italic uppercase leading-tight tracking-tight text-left">
                        {card.data.name}<br/>PROGRESS
                    </h2>
                </div>
                
                <div className="neo-card neo-shadow border-3 border-black p-6 space-y-4 bg-white rotate-[-1deg]">
                    <div className="flex justify-between items-end italic">
                        <p className="text-3xl font-black">${card.data.current.toLocaleString()}</p>
                        <p className="text-[10px] font-black opacity-40">TARGET: ${card.data.target.toLocaleString()}</p>
                    </div>
                    <div className="h-6 bg-zinc-100 border-3 border-black relative overflow-hidden">
                        <div 
                            className="absolute inset-y-0 left-0 bg-[#FFE500] border-r-3 border-black transition-all duration-1000"
                            style={{ width: `${Math.min(100, (card.data.current / card.data.target) * 100)}%` }}
                        />
                    </div>
                    <p className="text-center text-[10px] font-black uppercase opacity-60">
                        {Math.floor((card.data.current / card.data.target) * 100)}% OF SAVINGS GOAL REACHED
                    </p>
                </div>
            </motion.div>
        )}

        {card.type === 'badge' && (
            <motion.div 
                initial={{ rotate: -10, scale: 0.8, opacity: 0 }} animate={{ rotate: 0, scale: 1, opacity: 1 }}
                className="w-full space-y-6 text-center z-10"
            >
                <div className="w-40 h-40 bg-[#C8E6C9] border-4 border-black neo-shadow rounded-full mx-auto flex items-center justify-center relative">
                    <Award size={80} strokeWidth={3} />
                    <div className="absolute -top-2 -right-2 bg-black text-[#FFE500] p-2 border-2 border-black rotate-[15deg]">
                        <Zap size={20} fill="currentColor" />
                    </div>
                </div>
                <div className="space-y-2">
                    <h2 className="text-5xl font-black italic uppercase tracking-tighter leading-none">
                        {card.data.badgeName || 'ACHIEVEMENT UNLOCKED'}
                    </h2>
                    <p className="text-sm font-bold opacity-40 uppercase tracking-[4px]">EARNED ON VAULTA</p>
                </div>
            </motion.div>
        )}
      </div>

      {/* Footer CTA */}
      <footer className="p-6 border-t-3 border-black bg-white space-y-4 z-10 shrink-0">
        <Link href="/" className="neo-button w-full h-16 bg-[#FFE500] flex items-center justify-center gap-3 text-lg font-black uppercase italic shadow-[6px_6px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all">
            Join the journey on VAULTA <ExternalLink size={20} />
        </Link>
        <div className="flex justify-center items-center gap-4 opacity-40">
            <div className="flex items-center gap-1">
                <ShieldCheck size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">Self-Custodial</span>
            </div>
            <div className="w-1.5 h-1.5 bg-black rounded-full" />
            <div className="flex items-center gap-1">
                <TrendingUp size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">Yield Optimized</span>
            </div>
        </div>
      </footer>
    </div>
  );
}
