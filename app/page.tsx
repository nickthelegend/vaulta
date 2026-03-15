'use client';

import { useState } from 'react';
import { Home as HomeIcon, Target, Flame, DollarSign, User, ArrowUp, CheckCircle2, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function VaultaApp() {
  const [activeTab, setActiveTab] = useState('Home');

  return (
    <>
      {/* Content Area */}
      <div className="flex-1 overflow-y-auto scrollbar-hide pb-24 px-6 pt-8 font-archivo">
        {activeTab === 'Home' && <HomeScreen />}
        {activeTab === 'Goals' && <GoalsScreen />}
        {activeTab === 'Streaks' && <StreaksScreen />}
        {activeTab === 'Yield' && <div className="flex items-center justify-center h-full font-black text-2xl uppercase">Yield Page</div>}
        {activeTab === 'Profile' && <div className="flex items-center justify-center h-full font-black text-2xl uppercase">Profile Page</div>}
      </div>

      {/* Bottom Tab Bar */}
      <nav className="absolute bottom-0 w-full h-20 bg-white border-t-3 border-black flex items-center justify-around px-2 z-50">
        <TabItem icon={HomeIcon} label="Home" active={activeTab === 'Home'} onClick={() => setActiveTab('Home')} />
        <TabItem icon={Target} label="Goals" active={activeTab === 'Goals'} onClick={() => setActiveTab('Goals')} />
        <TabItem icon={Flame} label="Streaks" active={activeTab === 'Streaks'} onClick={() => setActiveTab('Streaks')} />
        <TabItem icon={DollarSign} label="Yield" active={activeTab === 'Yield'} onClick={() => setActiveTab('Yield')} />
        <TabItem icon={User} label="Profile" active={activeTab === 'Profile'} onClick={() => setActiveTab('Profile')} />
      </nav>
    </>
  );
}

function TabItem({ icon: Icon, label, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center flex-1 h-full gap-1 transition-all",
        active ? "text-black" : "text-zinc-400"
      )}
    >
      <div className={cn(
        "p-1.5 rounded-lg border-2 border-transparent transition-all",
        active && "bg-[#FFE500] border-black neo-shadow-sm scale-110"
      )}>
        <Icon size={20} strokeWidth={active ? 3 : 2} />
      </div>
      <span className={cn("text-[8px] font-black uppercase tracking-widest", active && "underline decoration-2 underline-offset-4")}>{label}</span>
    </button>
  );
}

function HomeScreen() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <section className="space-y-1">
        <p className="text-zinc-500 text-[10px] font-black tracking-widest uppercase">Total Savings</p>
        <h2 className="text-[52px] font-black leading-none tracking-tighter">$1,247.83</h2>
        <div className="flex items-center gap-3">
          <p className="text-[#FF4D4D] font-black text-sm flex items-center gap-0.5 uppercase tracking-tighter">
            <ArrowUp size={14} strokeWidth={4} /> $8.42 this week
          </p>
          <span className="bg-[#FFE500] px-3 py-1 rounded-full border-2 border-black text-[9px] font-black tracking-[2px] uppercase">🔥 On Track</span>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-4">
        <div className="neo-card neo-shadow space-y-1">
          <p className="text-[9px] text-zinc-500 font-black uppercase tracking-widest leading-none">Current APY</p>
          <p className="text-3xl font-black italic tracking-tighter leading-none">8.6%</p>
        </div>
        <div className="neo-card neo-shadow space-y-1">
          <p className="text-[9px] text-zinc-500 font-black uppercase tracking-widest leading-none">Yield Earned</p>
          <p className="text-3xl font-black italic tracking-tighter leading-none">$23.41</p>
        </div>
      </div>

      <section className="space-y-4">
        <h3 className="text-sm font-black uppercase tracking-[3px] inline-block border-b-3 border-black pb-1">Your Vault</h3>
        <div className="neo-card neo-shadow space-y-6">
          <AllocationRow label="Morpho" percent={42} color="#FFE500" />
          <AllocationRow label="Pendle" percent={31} color="#FF4D4D" />
          <AllocationRow label="Tokemak" percent={27} color="#C8E6C9" />
        </div>
      </section>

      <button className="neo-button w-full py-5 bg-[#FFE500] text-lg hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        Deposit
      </button>
    </div>
  );
}

function AllocationRow({ label, percent, color }: any) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-end">
        <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
        <span className="text-xs font-black font-mono">{percent}%</span>
      </div>
      <div className="h-6 w-full border-3 border-black bg-white overflow-hidden">
        <div 
          className="h-full border-r-3 border-black" 
          style={{ width: `${percent}%`, backgroundColor: color }} 
        />
      </div>
    </div>
  );
}

function GoalsScreen() {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-4xl font-black tracking-tighter uppercase leading-none">My Goals</h1>
      
      <div className="space-y-6">
        <GoalCard 
          title="Emergency Fund" 
          target="$5,000" 
          progress={34} 
          current="$1,700" 
          rotate="-1"
          tag="yoUSD VAULT"
        />
        <GoalCard 
          title="ETH Stack" 
          target="2 ETH" 
          progress={12} 
          current="0.24 ETH" 
          rotate="1"
          tag="yoETH VAULT"
          color="#FF4D4D"
        />
      </div>

      <button className="neo-button w-full py-5 bg-black text-white flex items-center justify-center gap-2 hover:bg-zinc-800 hover:shadow-[#FFE500]">
        <Plus size={20} strokeWidth={3} />
        New Goal
      </button>
    </div>
  );
}

function GoalCard({ title, target, progress, current, rotate, tag, color = "#FFE500" }: any) {
  return (
    <div className="neo-card neo-shadow space-y-4" style={{ transform: `rotate(${rotate}deg)` }}>
      <div className="flex justify-between items-start">
        <h4 className="text-xl font-black tracking-tight uppercase leading-none">{title}</h4>
        <span className={cn("text-[8px] font-black px-2 py-0.5 border-2 border-black rounded-full uppercase", tag.includes('USD') ? 'bg-[#C8E6C9]' : 'bg-[#FF4D4D] text-white')}>
          {tag}
        </span>
      </div>
      
      <div className="space-y-2">
        <div className="h-8 w-full border-3 border-black bg-zinc-100 overflow-hidden">
          <div className="h-full border-r-3 border-black" style={{ width: `${progress}%`, backgroundColor: color }} />
        </div>
        <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
          <span>{progress}% Complete</span>
          <span>{current} of {target}</span>
        </div>
      </div>

      <div className="pt-2 border-t-2 border-black flex items-center justify-between">
        <span className="text-[10px] font-black uppercase flex items-center gap-1">
          <CheckCircle2 size={12} strokeWidth={3} className="text-green-600" /> On Track
        </span>
        <span className="text-[8px] text-zinc-400 font-bold uppercase">Est. Sep 2026</span>
      </div>
    </div>
  );
}

function StreaksScreen() {
  return (
    <div className="space-y-12 animate-in zoom-in-95 duration-500">
      <h1 className="text-4xl font-black tracking-tighter uppercase leading-none">Your Streak</h1>

      <div className="bg-[#FFE500] neo-border neo-shadow p-12 text-center space-y-2 rotate-[-1deg]">
        <span className="text-7xl block mb-4">🔥</span>
        <h2 className="text-[120px] font-black leading-[0.8] tracking-tighter">14</h2>
        <p className="text-xl font-black uppercase tracking-[4px]">Weeks Straight</p>
      </div>

      <div className="space-y-6">
        <h3 className="text-sm font-black uppercase tracking-[3px] border-b-3 border-black pb-1 inline-block">Milestones</h3>
        <div className="flex gap-4 overflow-x-auto pb-6 -mx-2 px-2 scrollbar-hide">
          <MilestoneBadge rank="🥉" label="4 WEEKS" unlocked rotate="1" />
          <MilestoneBadge rank="🥈" label="8 WEEKS" unlocked rotate="-1" />
          <MilestoneBadge rank="🥇" label="12 WEEKS" unlocked rotate="2" />
          <MilestoneBadge rank="🏆" label="24 WEEKS" rotate="-2" />
        </div>
      </div>
    </div>
  );
}

function MilestoneBadge({ rank, label, unlocked, rotate }: any) {
  return (
    <div className={cn(
      "neo-card flex-shrink-0 w-32 h-32 flex flex-col items-center justify-center gap-2 transition-all",
      unlocked ? "bg-[#FFE500] neo-shadow" : "bg-zinc-100 opacity-40 grayscale",
      rotate && `rotate-[${rotate}deg]`
    )}>
      <span className="text-3xl">{rank}</span>
      <span className="text-[9px] font-black uppercase tracking-widest text-center">{label}</span>
      {unlocked && <div className="bg-black text-white text-[7px] font-black px-1.5 rounded-full">UNLOCKED</div>}
    </div>
  );
}
