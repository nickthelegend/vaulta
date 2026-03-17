'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Zap,
  Shield,
  TrendingUp,
  Flame,
  ChevronRight,
  Lock,
  ArrowRight,
  Target,
  Gift,
  Skull,
  Globe,
  Award
} from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#F5F0E8] text-black font-archivo selection:bg-black selection:text-[#FFE500]">
      {/* Header */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b-4 border-black px-6 md:px-12 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Zap className="fill-[#FFE500] text-black" size={32} strokeWidth={2.5} />
          <span className="font-black text-2xl md:text-3xl tracking-tighter italic">VAULTA</span>
        </div>
        <div className="hidden md:flex items-center gap-8 font-black uppercase text-sm italic tracking-widest">
          <a href="#features" className="hover:text-[#FFE500] transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-[#FFE500] transition-colors">How it works</a>
          <a href="#security" className="hover:text-[#FFE500] transition-colors">Security</a>
        </div>
        <Link
          href="/app"
          className="neo-button px-6 py-2 md:px-8 md:py-3 bg-[#FFE500] font-black uppercase italic text-sm border-3 border-black shadow-[4px_4px_0_0_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
        >
          Enter App
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 md:px-12 overflow-hidden relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-8 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block bg-black text-[#FFE500] px-4 py-1 text-xs font-black uppercase tracking-widest italic rounded-full"
            >
              The Future of Savings is Here
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-black italic tracking-tighter leading-[0.9] uppercase"
            >
              Save Hard.<br />
              <span className="text-stroke-3 text-transparent">Live Easy.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl font-bold uppercase opacity-60 max-w-xl mx-auto md:mx-0"
            >
              Next-gen DeFi savings platform powered by YO Protocol. High yields, social gifting, and automated security on Base.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4"
            >
              <Link
                href="/app"
                className="neo-button w-full sm:w-auto px-10 py-5 bg-black text-[#FFE500] text-xl font-black uppercase italic shadow-[8px_8px_0_0_#FFE500] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all flex items-center justify-center gap-3"
              >
                Launch app <ArrowRight size={24} strokeWidth={3} />
              </Link>
              <div className="flex items-center gap-4 py-2 opacity-60">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-10 h-10 bg-white border-2 border-black rounded-full flex items-center justify-center font-black italic select-none">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <span className="font-black text-xs uppercase tracking-widest">+2.4k Savers</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
            animate={{ opacity: 1, scale: 1, rotate: -2 }}
            transition={{ type: 'spring', delay: 0.4 }}
            className="flex-1 w-full max-w-md hidden lg:block"
          >
            <div className="neo-card bg-white p-2 rounded-[2rem] border-4 border-black shadow-[20px_20px_0_0_#FFE500]">
              <img src="https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=800" alt="App Preview" className="rounded-[1.5rem] border-4 border-black w-full" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-black text-white py-12 border-y-4 border-black overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee items-center gap-20">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 font-black text-3xl italic uppercase tracking-tighter">
              <span>$42.8M SAVED</span>
              <Zap className="fill-[#FFE500] text-[#FFE500]" size={32} />
              <span>18.4% AVG APY</span>
              <Globe className="text-white" size={32} />
              <span>8.2k USERS</span>
              <Flame className="fill-white text-white" size={32} />
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 md:px-12 bg-white border-b-4 border-black">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter underline decoration-[#FFE500] decoration-8 underline-offset-8">The Engine of Wealth</h2>
            <p className="font-bold uppercase opacity-60 max-w-2xl mx-auto">Vaulta leverages the best-in-class DeFi strategies to automate your financial freedom.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Flame}
              title="Savings Streaks"
              desc="Gamify your financial future. Maintain daily streaks and unlock exclusive multipliers and reward badges."
              color="#FFE500"
              rotate="-1deg"
            />
            <FeatureCard
              icon={Gift}
              title="Yield Gifting"
              desc="Share the wealth effortlessly. Programmatically gift percentages of your yield to friends, family, or charities."
              color="#C8E6C9"
              rotate="1deg"
            />
            <FeatureCard
              icon={Skull}
              title="Savings Will"
              desc="Secure your legacy. Automatic fund distribution to beneficiaries if account inactivity is detected."
              color="#FF4D4D"
              rotate="-0.5deg"
            />
          </div>
        </div>
      </section>

      {/* How it Works / Why Base */}
      <section id="how-it-works" className="py-24 px-6 md:px-12 bg-[#0A0A0A] text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-7xl font-black uppercase italic leading-[0.9] text-[#FFE500]">Built on Base. <br /><span className="text-white">Optimized by YO.</span></h2>
              <p className="font-bold uppercase opacity-60">We utilize Morpho, Pendle, and Tokemak strategies to squeeze every drop of yield safely.</p>
            </div>

            <div className="space-y-6">
              <Step icon={Shield} title="Connect Wallet" desc="Sign in with Farcaster and connect your Base wallet to access the vault." />
              <Step icon={TrendingUp} title="Deposit Assets" desc="Convert USDC to yield-bearing yoUSD instantly with zero slippage." />
              <Step icon={Award} title="Earn and Win" desc="Watch your balance grow while earning CRED points and unlocking badges." />
            </div>
          </div>

          <div className="relative">
            <div className="neo-card bg-white p-8 rounded-[2rem] border-4 border-[#FFE500] rotate-3 text-black space-y-6">
              <div className="flex justify-between items-center border-b-2 border-black pb-4">
                <span className="font-black italic uppercase">Live Transaction Feed</span>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400 border border-black" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400 border border-black" />
                  <div className="w-3 h-3 rounded-full bg-green-400 border border-black" />
                </div>
              </div>
              {[
                { user: '0x...a4', action: 'Deposited $1,200', time: 'Recently' },
                { user: '@queen.eth', action: 'Claimed Week 4 Badge', time: '2m ago' },
                { user: '0x...71', action: 'Achieved 30D Streak', time: '5m ago' },
              ].map((tx, i) => (
                <div key={i} className="flex justify-between items-center text-sm font-black italic border-b border-black/5 pb-2">
                  <div className="flex gap-3 items-center">
                    <div className="w-8 h-8 bg-[#FFE500] border-2 border-black rounded-full" />
                    <span>{tx.user}</span>
                  </div>
                  <span className="opacity-60">{tx.action}</span>
                </div>
              ))}
              <div className="bg-black text-[#FFE500] p-4 font-black italic text-center uppercase text-xs">
                Syncing with Base Mainnet (8453)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 text-center bg-[#FFE500] border-y-4 border-black">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-5xl md:text-8xl font-black uppercase italic leading-none tracking-tight">Stop Dreaming.<br />Start Saving.</h2>
          <p className="text-xl font-bold uppercase max-w-xl mx-auto">Join thousands of savers who have automated their financial future on-chain.</p>
          <Link
            href="/app"
            className="neo-button inline-flex px-12 py-6 bg-black text-[#FFE500] text-3xl font-black uppercase italic shadow-[10px_10px_0_0_#FFF] hover:shadow-none hover:translate-x-3 hover:translate-y-3 transition-all items-center gap-4"
          >
            Enter the Vault <Zap size={32} strokeWidth={3} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-20 px-6 border-t-4 border-black">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Zap className="fill-[#FFE500] text-black" size={32} />
              <span className="font-black text-2xl tracking-tighter italic">VAULTA</span>
            </div>
            <p className="font-bold uppercase text-xs opacity-60 leading-relaxed">
              Automated savings & yield management protocol built for the next generation of financial users.
            </p>
          </div>
          <div>
            <h4 className="font-black uppercase italic mb-8 underline decoration-4 decoration-[#FFE500]">Platform</h4>
            <ul className="space-y-4 font-bold uppercase text-xs opacity-60">
              <li><Link href="/app">Launch App</Link></li>
              <li><a href="#">Security</a></li>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">Bug Bounty</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black uppercase italic mb-8 underline decoration-4 decoration-[#FFE500]">Community</h4>
            <ul className="space-y-4 font-bold uppercase text-xs opacity-60">
              <li><a href="#">Twitter/X</a></li>
              <li><a href="#">Farcaster</a></li>
              <li><a href="#">Discord</a></li>
              <li><a href="#">Governance</a></li>
            </ul>
          </div>
          <div className="space-y-6">
            <div className="bg-[#FFE500] p-4 border-3 border-black neo-shadow-sm rotate-1">
              <p className="font-black text-[10px] uppercase tracking-tighter">Current Base Gas: <span className="underline">0.02 Gwei</span></p>
            </div>
            <p className="font-bold uppercase text-[10px] opacity-40">© 2026 VAULTA PROTOCOL. ALL RIGHTS RESERVED. NOT FINANCIAL ADVICE.</p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .text-stroke-3 {
          -webkit-text-stroke: 2px black;
        }
        .neo-button:active {
          transform: translate(2px, 2px);
          box-shadow: 0 0 0 0 #000;
        }
        .neo-card {
           border-width: 3px;
           border-style: solid;
           border-color: black;
        }
        .neo-shadow {
           box-shadow: 4px 4px 0 0 #000000;
        }
        .neo-shadow-sm {
           box-shadow: 2px 2px 0 0 #000000;
        }
      `}</style>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, desc, color, rotate }: any) => (
  <motion.div
    whileHover={{ y: -5, rotate: 0 }}
    style={{ transform: `rotate(${rotate})` }}
    className="neo-card bg-white p-8 space-y-6 hover:shadow-[12px_12px_0_0_#000] transition-all cursor-default"
  >
    <div className="w-16 h-16 border-4 border-black flex items-center justify-center neo-shadow-sm" style={{ backgroundColor: color }}>
      <Icon size={32} strokeWidth={3} />
    </div>
    <h3 className="text-3xl font-black uppercase italic leading-none">{title}</h3>
    <p className="font-bold uppercase text-sm opacity-60 leading-relaxed">{desc}</p>
    <div className="flex items-center gap-2 font-black text-xs uppercase italic text-[#FFE500] bg-black px-4 py-2 w-fit">
      Learn More <ChevronRight size={16} strokeWidth={3} />
    </div>
  </motion.div>
);

const Step = ({ icon: Icon, title, desc }: any) => (
  <div className="flex gap-6 items-start">
    <div className="w-12 h-12 bg-[#FFE500] border-3 border-white/20 flex items-center justify-center shrink-0">
      <Icon size={24} className="text-black" strokeWidth={3} />
    </div>
    <div className="space-y-1">
      <h4 className="text-xl font-black uppercase italic tracking-tight">{title}</h4>
      <p className="font-bold uppercase text-xs opacity-60 max-w-md">{desc}</p>
    </div>
  </div>
);

export default LandingPage;
