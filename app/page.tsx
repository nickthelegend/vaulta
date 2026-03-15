'use client';

import { useState } from 'react';
import { 
  Home as HomeIcon, 
  Target, 
  Flame, 
  DollarSign, 
  User, 
  ArrowUp, 
  CheckCircle2, 
  Plus, 
  Share2, 
  Skull,
  TrendingUp,
  Award,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function VaultaApp() {
  const [activeTab, setActiveTab] = useState('Home');

  return (
    <div className="flex flex-col h-full bg-[#F5F0E8] relative overflow-hidden">
      {/* Content Area */}
      <div className="flex-1 overflow-y-auto scrollbar-hide pb-24 px-6 pt-8 font-archivo">
        {activeTab === 'Home' && <HomeScreen />}
        {activeTab === 'Goals' && <GoalsScreen />}
        {activeTab === 'Streaks' && <StreaksScreen />}
        {activeTab === 'Yield' && <YieldScreen />}
        {activeTab === 'Profile' && <ProfileScreen />}
      </div>

      {/* Bottom Tab Bar */}
      <nav className="absolute bottom-0 w-full h-20 bg-white border-t-3 border-black flex items-center justify-around px-2 z-50">
        <TabItem icon={HomeIcon} label="Home" active={activeTab === 'Home'} onClick={() => setActiveTab('Home')} />
        <TabItem icon={Target} label="Goals" active={activeTab === 'Goals'} onClick={() => setActiveTab('Goals')} />
        <TabItem icon={Flame} label="Streaks" active={activeTab === 'Streaks'} onClick={() => setActiveTab('Streaks')} />
        <TabItem icon={DollarSign} label="Yield" active={activeTab === 'Yield'} onClick={() => setActiveTab('Yield')} />
        <TabItem icon={User} label="Profile" active={activeTab === 'Profile'} onClick={() => setActiveTab('Profile')} />
      </nav>
    </div>
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

// --- SCREENS ---

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

      <button className="neo-button w-full h-[56px] bg-[#FFE500] text-sm tracking-widest">
        Deposit
      </button>
    </div>
  );
}

function GoalsScreen() {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-4xl font-black tracking-tighter uppercase leading-none italic">My Goals</h1>
      
      <div className="space-y-6 text-left">
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

      <button className="neo-button w-full h-[56px] bg-black text-white flex items-center justify-center gap-2">
        <Plus size={20} strokeWidth={3} />
        New Goal
      </button>
    </div>
  );
}

function StreaksScreen() {
  return (
    <div className="space-y-10 animate-in zoom-in-95 duration-500 text-left">
      <h1 className="text-4xl font-black tracking-tighter uppercase leading-none italic">Your Streak</h1>

      <div className="bg-[#FFE500] neo-border neo-shadow p-10 text-center space-y-2 rotate-[-1deg]">
        <span className="text-7xl block mb-2">🔥</span>
        <h2 className="text-[96px] font-black leading-[0.8] tracking-tighter">14</h2>
        <p className="text-xl font-black uppercase tracking-[4px]">Weeks Straight</p>
      </div>

      <section className="space-y-6">
        <h3 className="text-sm font-black uppercase tracking-[3px] border-b-3 border-black pb-1 inline-block">Milestones</h3>
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide">
          <MilestoneBadge rank="🥉" label="4 WEEKS" unlocked rotate="1" />
          <MilestoneBadge rank="🥈" label="8 WEEKS" unlocked rotate="-1" />
          <MilestoneBadge rank="🥇" label="12 WEEKS" unlocked rotate="2" />
          <MilestoneBadge rank="💎" label="26 WEEKS" rotate="-2" locked />
          <MilestoneBadge rank="👑" label="52 WEEKS" rotate="1" locked />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-sm font-black uppercase tracking-[3px] border-b-3 border-black pb-1 inline-block">Streak History</h3>
        <div className="grid grid-cols-6 gap-2">
          {[...Array(12)].map((_, i) => (
            <div key={i} className={cn(
                "aspect-square neo-border",
                i < 10 ? "bg-[#FFE500]" : i === 10 ? "bg-[#FF4D4D]" : "bg-white"
            )} />
          ))}
        </div>
      </section>

      <div className="neo-card neo-shadow space-y-4 bg-white">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mb-1">Next Milestone</p>
                <h4 className="text-2xl font-black tracking-tight uppercase leading-none">💎 26 WEEKS</h4>
            </div>
            <span className="text-[8px] font-black px-2 py-1 bg-zinc-100 neo-border rounded-full uppercase">12 More to go</span>
        </div>
        <div className="h-4 w-full neo-border bg-zinc-100">
            <div className="h-full bg-black border-r-2 border-black" style={{ width: '45%' }} />
        </div>
      </div>
    </div>
  );
}

function YieldScreen() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 text-left">
      <h1 className="text-4xl font-black tracking-tighter uppercase leading-none italic">Yield Breakdown</h1>

      <div className="bg-black text-[#FFE500] neo-border neo-shadow p-8 text-center space-y-1">
        <p className="text-[10px] font-black uppercase tracking-[3px] opacity-60 text-white">Total Yield Earned</p>
        <h2 className="text-6xl font-black tracking-tighter italic">$23.41</h2>
        <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Since you started saving</p>
      </div>

      <section className="space-y-6">
        <h3 className="text-sm font-black uppercase tracking-[3px] border-b-3 border-black pb-1 inline-block">Why is my money here?</h3>
        <div className="space-y-6">
          <YieldInfoCard 
            title="MORPHO — 42%" 
            badge="Highest risk-adjusted yield" 
            text="Lending market. A- risk rating. Earning 14.2% APY. Your biggest allocation because reward outweighs risk this week."
            color="#FF4D4D"
          />
          <YieldInfoCard 
            title="PENDLE — 31%" 
            badge="Fixed-rate arbitrage window" 
            text="Fixed yield locked in at 18.5%. Unusual spike this week — may compress in 10-14 days."
            color="#FFE500"
          />
          <YieldInfoCard 
            title="TOKEMAK — 27%" 
            badge="Stable base layer" 
            text="Lower yield but highest security score. Balances your overall risk exposure."
            color="#C8E6C9"
          />
        </div>
      </section>

      <button className="neo-button w-full h-[56px] bg-black text-[#FFE500] text-sm tracking-widest">
        Simulate Returns
      </button>
    </div>
  );
}

function ProfileScreen() {
  const [willActive, setWillActive] = useState(false);

  return (
    <div className="space-y-8 animate-in slide-in-from-top-4 duration-500 text-left">
      <h1 className="text-4xl font-black tracking-tighter uppercase leading-none italic">Your Profile</h1>

      <div className="neo-card neo-shadow p-6 flex items-center gap-5 rotate-[1deg]">
        <div className="w-20 h-20 bg-[#FFE500] neo-border flex items-center justify-center text-2xl font-black">
          NB
        </div>
        <div className="space-y-1">
          <p className="text-2xl font-black tracking-tighter font-mono italic">0x3f...9a2c</p>
          <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Vaulta Saver since Jan 2026</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <ProfileStat label="Total Deposited" value="$1,224.42" />
        <ProfileStat label="Total Yield" value="$23.41" />
        <ProfileStat label="Longest Streak" value="14 WKS 🔥" />
        <ProfileStat label="Goals Done" value="1 ✓" />
      </div>

      <div className="neo-border border-dashed p-6 space-y-6 bg-white/50">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
             <h4 className="text-sm font-black tracking-widest uppercase flex items-center gap-2">
                <Skull size={16} /> Savings Will
             </h4>
             <p className="text-[10px] text-zinc-500 font-bold uppercase leading-tight max-w-[180px]">Transfer savings to beneficiary if inactive for 12 months</p>
          </div>
          <button 
            onClick={() => setWillActive(!willActive)}
            className="w-14 h-8 neo-border bg-[#F5F0E8] relative transition-colors"
          >
            <motion.div 
              animate={{ x: willActive ? 24 : 4 }}
              className="absolute top-1 w-5 h-5 bg-black" 
            />
          </button>
        </div>
        <div className="flex justify-between items-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Status</span>
            <span className={cn(
                "text-[9px] font-black px-2 py-1 rounded-full border-2 border-black uppercase",
                willActive ? "bg-[#FFE500]" : "bg-zinc-200 text-zinc-500 border-zinc-300"
            )}>
                {willActive ? 'Active' : 'Inactive'}
            </span>
        </div>
      </div>

      <button className="neo-button w-full h-[56px] bg-[#FFE500] flex items-center justify-center gap-3 text-sm tracking-widest">
        <Share2 size={18} strokeWidth={3} />
        Share Your Stats
      </button>
    </div>
  );
}

// --- SUBCOMPONENTS ---

function AllocationRow({ label, percent, color }: any) {
  return (
    <div className="space-y-1.5 text-left">
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

function MilestoneBadge({ rank, label, unlocked, rotate, locked }: any) {
  return (
    <div className={cn(
      "neo-card flex-shrink-0 w-32 h-32 flex flex-col items-center justify-center gap-2 transition-all",
      unlocked ? "bg-[#FFE500] neo-shadow" : "bg-white border-dashed opacity-40 grayscale",
    )} style={{ transform: `rotate(${rotate}deg)` }}>
      <span className="text-3xl">{rank}</span>
      <span className="text-[9px] font-black uppercase tracking-widest text-center">{label}</span>
      {unlocked ? (
        <div className="bg-black text-white text-[7px] font-black px-1.5 py-0.5 rounded-full uppercase">Unlocked</div>
      ) : (
        <div className="text-[7px] font-black uppercase opacity-60">Locked</div>
      )}
    </div>
  );
}

function YieldInfoCard({ title, badge, text, color }: any) {
  return (
    <div className="neo-card neo-shadow p-6 space-y-3 relative group overflow-hidden">
      <div className="flex justify-between items-start">
        <h4 className="text-lg font-black tracking-tight uppercase leading-none">{title}</h4>
        <span className="text-[8px] font-black px-2 py-0.5 border-2 border-black rounded-full uppercase" style={{ backgroundColor: color }}>
          {badge}
        </span>
      </div>
      <p className="text-xs font-bold text-zinc-500 uppercase leading-relaxed tracking-tight">{text}</p>
      <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-10 transition-opacity">
        <TrendingUp size={48} strokeWidth={3} />
      </div>
    </div>
  );
}

function ProfileStat({ label, value }: any) {
  return (
    <div className="neo-card neo-shadow p-4 space-y-1">
      <p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest leading-none">{label}</p>
      <p className="text-xl font-black italic tracking-tighter leading-none">{value}</p>
    </div>
  );
}
