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
  ExternalLink,
  Gift,
  ArrowRight,
  Download,
  ShieldAlert,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function VaultaApp() {
  const [activeTab, setActiveTab] = useState('Home');
  const [overlay, setOverlay] = useState<string | null>(null);

  const openOverlay = (name: string) => setOverlay(name);
  const closeOverlay = () => setOverlay(null);

  return (
    <div className="flex flex-col h-full bg-[#F5F0E8] relative overflow-hidden">
      {/* Content Area */}
      <div className="flex-1 overflow-y-auto scrollbar-hide pb-24 px-6 pt-8 font-archivo">
        {activeTab === 'Home' && <HomeScreen onDeposit={() => openOverlay('deposit')} />}
        {activeTab === 'Goals' && <GoalsScreen />}
        {activeTab === 'Streaks' && <StreaksScreen />}
        {activeTab === 'Yield' && <YieldScreen />}
        {activeTab === 'Profile' && <ProfileScreen onOpenGifts={() => openOverlay('gifts')} onOpenWill={() => openOverlay('will')} />}
      </div>

      {/* Overlays */}
      <AnimatePresence>
        {overlay === 'gifts' && <YieldGiftingOverlay onClose={closeOverlay} />}
        {overlay === 'will' && <SavingsWillOverlay onClose={closeOverlay} />}
        {overlay === 'deposit' && <DepositFlowOverlay onClose={closeOverlay} />}
      </AnimatePresence>

      {/* Bottom Tab Bar */}
      <nav className="absolute bottom-0 w-full h-20 bg-white border-t-3 border-black flex items-center justify-around px-2 z-50">
        <TabItem icon={HomeIcon} label="Home" active={activeTab === 'Home'} onClick={() => { setActiveTab('Home'); closeOverlay(); }} />
        <TabItem icon={Target} label="Goals" active={activeTab === 'Goals'} onClick={() => { setActiveTab('Goals'); closeOverlay(); }} />
        <TabItem icon={Flame} label="Streaks" active={activeTab === 'Streaks'} onClick={() => { setActiveTab('Streaks'); closeOverlay(); }} />
        <TabItem icon={DollarSign} label="Yield" active={activeTab === 'Yield'} onClick={() => { setActiveTab('Yield'); closeOverlay(); }} />
        <TabItem icon={User} label="Profile" active={activeTab === 'Profile'} onClick={() => { setActiveTab('Profile'); closeOverlay(); }} />
      </nav>
    </div>
  );
}

// --- SHARED COMPONENTS ---

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

function OverlayWrapper({ title, onClose, children, bgColor = "#F5F0E8" }: any) {
    return (
        <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute inset-0 z-[60] flex flex-col p-6 pt-8 scrollbar-hide overflow-y-auto"
            style={{ backgroundColor: bgColor }}
        >
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-black tracking-tighter uppercase leading-none italic">{title}</h1>
                <button onClick={onClose} className="neo-button p-2 bg-white"><XIcon size={20} /></button>
            </div>
            {children}
        </motion.div>
    );
}

const XIcon = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="square" strokeLinejoin="miter">
        <path d="M18 6L6 18M6 6l12 12" />
    </svg>
);

// --- MAIN SCREENS ---

function HomeScreen({ onDeposit }: any) {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 text-left">
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

      <button onClick={onDeposit} className="neo-button w-full h-[56px] bg-[#FFE500] text-sm tracking-widest">
        Deposit
      </button>
    </div>
  );
}

function GoalsScreen() {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 text-left">
      <h1 className="text-4xl font-black tracking-tighter uppercase leading-none italic">My Goals</h1>
      
      <div className="space-y-6">
        <GoalCard title="Emergency Fund" target="$5,000" progress={34} current="$1,700" rotate="-1" tag="yoUSD VAULT" />
        <GoalCard title="ETH Stack" target="2 ETH" progress={12} current="0.24 ETH" rotate="1" tag="yoETH VAULT" color="#FF4D4D" />
      </div>

      <button className="neo-button w-full h-[56px] bg-black text-white flex items-center justify-center gap-2">
        <Plus size={20} strokeWidth={3} /> New Goal
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
            <div key={i} className={cn("aspect-square neo-border", i < 10 ? "bg-[#FFE500]" : i === 10 ? "bg-[#FF4D4D]" : "bg-white")} />
          ))}
        </div>
      </section>
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
          <YieldInfoCard title="MORPHO — 42%" badge="Highest risk-adjusted yield" text="Lending market. A- risk rating. Earning 14.2% APY. Your biggest allocation." color="#FF4D4D" />
          <YieldInfoCard title="PENDLE — 31%" badge="Fixed-rate arbitrage window" text="Fixed yield locked in at 18.5%. Unusual spike this week — may compress." color="#FFE500" />
          <YieldInfoCard title="TOKEMAK — 27%" badge="Stable base layer" text="Lower yield but highest security score. Balances your overall risk exposure." color="#C8E6C9" />
        </div>
      </section>
      <button className="neo-button w-full h-[56px] bg-black text-[#FFE500] text-sm tracking-widest">Simulate Returns</button>
    </div>
  );
}

function ProfileScreen({ onOpenGifts, onOpenWill }: any) {
  return (
    <div className="space-y-8 animate-in slide-in-from-top-4 duration-500 text-left">
      <h1 className="text-4xl font-black tracking-tighter uppercase leading-none italic">Your Profile</h1>
      <div className="neo-card neo-shadow p-6 flex items-center gap-5 rotate-[1deg]">
        <div className="w-20 h-20 bg-[#FFE500] neo-border flex items-center justify-center text-2xl font-black">NB</div>
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
      <section className="space-y-4">
        <h3 className="text-[10px] font-black uppercase tracking-[3px] border-b-2 border-black pb-1 inline-block">Vault Operations</h3>
        <div className="space-y-4">
            <div onClick={onOpenGifts} className="neo-card neo-shadow p-5 flex justify-between items-center cursor-pointer hover:bg-white hover:translate-x-1 transition-all">
                <div className="flex items-center gap-4">
                    <Gift size={20} className="text-[#FF4D4D]" />
                    <span className="text-sm font-black uppercase tracking-widest">Yield Gifts</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="bg-[#FF4D4D] text-white text-[8px] font-black px-2 py-0.5 rounded-full">NEW</span>
                    <ChevronRight size={18} strokeWidth={3} />
                </div>
            </div>
            <div onClick={onOpenWill} className="neo-card neo-shadow p-5 flex justify-between items-center cursor-pointer hover:bg-white hover:translate-x-1 transition-all border-dashed">
                <div className="flex items-center gap-4">
                    <Skull size={20} />
                    <span className="text-sm font-black uppercase tracking-widest">Dead Man's Switch</span>
                </div>
                <ChevronRight size={18} strokeWidth={3} />
            </div>
        </div>
      </section>
      <button className="neo-button w-full h-[56px] bg-[#FFE500] flex items-center justify-center gap-3 text-sm tracking-widest">
        <Share2 size={18} strokeWidth={3} /> Share Your Stats
      </button>
    </div>
  );
}

// --- OVERLAY SCREENS ---

function YieldGiftingOverlay({ onClose }: any) {
  const [showSheet, setShowSheet] = useState(false);

  return (
    <OverlayWrapper title="Yield Gifts" onClose={onClose}>
      <div className="space-y-8 pb-20">
        <div className="bg-[#FFE500] neo-border neo-shadow p-6 rotate-[2deg] space-y-2">
            <p className="text-lg font-black uppercase tracking-tighter leading-tight">Send your yield. Keep your money.</p>
            <p className="text-xs font-bold uppercase text-black/60">Your $1,000 stays yours. Your yield goes to whoever you choose. Forever.</p>
        </div>

        <section className="space-y-6">
            <GiftCard name="Mom's Wallet" wallet="0x7a...3f2c" amount="$6.80/mo" since="JAN 2026" />
            <GiftCard name="Save The Ocean 🌊" wallet="0x8b...1e2d" amount="$1.20/mo" since="FEB 2026" color="#C8E6C9" />
        </section>

        <button onClick={() => setShowSheet(true)} className="neo-button w-full h-[56px] bg-[#FFE500] text-sm tracking-widest">+ New Yield Gift</button>
      </div>

      <AnimatePresence>
        {showSheet && (
            <motion.div 
                initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                className="absolute inset-x-0 bottom-0 z-[70] bg-white neo-border border-b-0 p-8 pt-10 space-y-8 neo-shadow-[0_-8px_0_0_rgba(0,0,0,1)]"
            >
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-3xl font-black tracking-tighter uppercase italic">Create Yield Gift</h3>
                    <button onClick={() => setShowSheet(false)} className="p-1"><XIcon size={24} /></button>
                </div>
                <div className="space-y-6">
                    <input className="w-full neo-border p-5 text-sm font-black uppercase placeholder-zinc-300 outline-none focus:bg-[#F5F0E8]" placeholder="Recipient Wallet or ENS" />
                    <div className="space-y-3">
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Gift Amount</p>
                        <div className="grid grid-cols-4 gap-2">
                            {['10%', '25%', '50%', 'All'].map(val => (
                                <button key={val} className={cn("neo-border py-3 text-[10px] font-black uppercase", val === '25%' && "bg-[#FFE500]")}>{val}</button>
                            ))}
                        </div>
                    </div>
                    <div className="neo-card bg-[#F5F0E8] p-4 text-center">
                        <p className="text-sm font-black uppercase tracking-tighter italic">You send ~$3.40/mo <span className="text-zinc-400">at current APY</span></p>
                    </div>
                    <button className="neo-button w-full h-[64px] bg-[#FFE500] text-sm tracking-widest font-black">Confirm Gift</button>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </OverlayWrapper>
  );
}

function SavingsWillOverlay({ onClose }: any) {
  const [active, setActive] = useState(false);

  return (
    <OverlayWrapper title="Savings Will" onClose={onClose} bgColor={active ? "#C8E6C9" : "#F5F0E8"}>
        <div className="space-y-10 pb-20">
            <div className="bg-black text-white neo-border neo-shadow p-6 rotate-[-1deg] space-y-2">
                <div className="flex items-center gap-3 mb-2">
                    <Skull size={24} className="text-[#FF4D4D]" />
                    <p className="text-xl font-black uppercase tracking-tighter">If you disappear</p>
                </div>
                <p className="text-xs font-bold uppercase text-white/60 leading-relaxed">If you don't interact with Vaulta for your chosen period, your entire savings vault transfers automatically to your beneficiary.</p>
            </div>

            <div className={cn("neo-card neo-shadow p-8 text-center space-y-6 transition-colors duration-500", active ? "bg-[#C8E6C9]" : "bg-[#FF4D4D]")}>
                <h2 className="text-7xl font-black tracking-tighter italic leading-none">{active ? 'ACTIVE' : 'INACTIVE'}</h2>
                <div className="flex justify-center">
                    <button onClick={() => setActive(!active)} className="w-20 h-10 neo-border bg-white relative">
                        <motion.div animate={{ x: active ? 44 : 4 }} className="absolute top-1 w-6 h-6 bg-black" />
                    </button>
                </div>
            </div>

            <section className="space-y-6 text-left">
                <h3 className="text-sm font-black uppercase tracking-[3px] border-b-3 border-black pb-1 inline-block">Set up your Will</h3>
                <div className="space-y-4">
                    <div className="neo-card neo-shadow space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Beneficiary Wallet</p>
                        <input className="w-full bg-[#F5F0E8] neo-border p-4 text-xs font-black uppercase outline-none" placeholder="0x... or ENS name" />
                        <p className="text-[8px] font-bold text-zinc-400 uppercase">This wallet receives everything if triggered</p>
                    </div>
                    <div className="neo-card neo-shadow space-y-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Inactivity Period</p>
                        <div className="grid grid-cols-3 gap-2">
                            {['6 Mo', '12 Mo', '24 Mo'].map(v => (
                                <button key={v} className={cn("neo-border py-3 text-[10px] font-black uppercase", v === '12 Mo' && "bg-[#FFE500]")}>{v}</button>
                            ))}
                        </div>
                        <p className="text-[8px] font-bold text-zinc-400 uppercase">Last activity: 3 days ago</p>
                    </div>
                </div>
            </section>

            <div className="neo-border border-dashed p-5 rotate-[1deg] space-y-2">
                <p className="text-sm font-black uppercase tracking-tight text-[#FF4D4D] flex items-center gap-2">
                    <ShieldAlert size={16} /> This is irreversible once triggered
                </p>
                <p className="text-[10px] font-bold uppercase text-zinc-500">Test your setup with a small amount first.</p>
            </div>

            <button className="neo-button w-full h-[64px] bg-black text-[#FFE500] text-sm tracking-widest">Activate Will</button>
        </div>
    </OverlayWrapper>
  );
}

function DepositFlowOverlay({ onClose }: any) {
  const [amount, setAmount] = useState('0.00');

  return (
    <OverlayWrapper title="Deposit" onClose={onClose}>
        <div className="space-y-8 pb-20">
            <div className="bg-[#FFE500] neo-border neo-shadow p-10 text-center space-y-4">
                <div className="relative inline-block">
                    <span className="text-7xl font-black italic tracking-tighter leading-none block">${amount}</span>
                    <div className="absolute top-0 -right-4 w-1.5 h-full bg-black animate-pulse" />
                </div>
                <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-black/40">USDC on Base</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-black/60 italic">Wallet Balance: $847.20 USDC</p>
                </div>
            </div>

            <div className="grid grid-cols-5 gap-2">
                {['$10', '$50', '$100', '$500', 'MAX'].map(val => (
                    <button onClick={() => setAmount(val.replace('$',''))} key={val} className={cn("neo-border py-4 text-[10px] font-black uppercase transition-colors hover:bg-[#FFE500]", val === '$100' ? "bg-[#FFE500]" : "bg-white")}>{val}</button>
                ))}
            </div>

            <div className="space-y-3 text-left">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Depositing Into</p>
                <div className="neo-card neo-shadow p-5 flex justify-between items-center cursor-pointer group hover:border-[#FFE500] transition-all">
                    <div className="flex flex-col">
                        <span className="text-lg font-black uppercase tracking-tight italic">yoUSD Vault</span>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="bg-[#FFE500] text-[8px] font-black px-2 py-0.5 rounded-full uppercase border-2 border-black">8.6% APY</span>
                        </div>
                    </div>
                    <ChevronDown size={24} strokeWidth={3} className="text-zinc-300 group-hover:text-black transition-colors" />
                </div>
            </div>

            <div className="neo-card neo-shadow p-6 bg-[#C8E6C9] rotate-[1deg] space-y-4 text-left">
                <div className="flex justify-between items-center border-b-2 border-black/10 pb-2">
                    <span className="text-[9px] font-black uppercase tracking-[2px] text-black/40">At Current APY</span>
                    <TrendingUp size={14} className="text-black/40" />
                </div>
                <div className="space-y-1">
                    <p className="text-sm font-black uppercase tracking-widest">In 12 Months: <span className="text-xl">$1,086.00</span></p>
                    <p className="text-[10px] font-bold uppercase text-black/60">Yield Earned: $86.00</p>
                </div>
            </div>

            <button className="neo-button w-full h-[64px] bg-[#FFE500] text-sm tracking-[2px] font-black uppercase leading-none">Confirm Deposit ${amount}</button>
        </div>
    </OverlayWrapper>
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
        <span className="text-[8px] text-zinc-400 font-bold uppercase italic">Est. Sep 2026</span>
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
    <div className="neo-card neo-shadow p-6 space-y-3 relative group overflow-hidden bg-white">
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

function GiftCard({ name, wallet, amount, since, color = "#FFFFFF" }: any) {
    return (
        <div className="neo-card neo-shadow p-6 space-y-6" style={{ backgroundColor: color }}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#FFE500] neo-border" />
                    <div className="w-6 h-6 border-b-4 border-r-4 border-black rotate-[-45deg] mt-1" />
                    <div className="w-10 h-10 bg-[#FF4D4D] neo-border" />
                </div>
                <div className="text-right">
                    <p className="text-sm font-black uppercase italic leading-none">{name}</p>
                    <p className="text-[9px] font-mono font-bold text-zinc-400 mt-1">{wallet}</p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="neo-border p-3 text-center">
                    <p className="text-[7px] font-black uppercase text-zinc-400 tracking-widest mb-1">Sending</p>
                    <p className="text-sm font-black uppercase italic">{amount}</p>
                </div>
                <div className="neo-border p-3 text-center">
                    <p className="text-[7px] font-black uppercase text-zinc-400 tracking-widest mb-1">Since</p>
                    <p className="text-sm font-black uppercase italic">{since}</p>
                </div>
            </div>
            <div className="flex justify-between items-center pt-2">
                <span className={cn("text-[9px] font-black px-3 py-1 rounded-full border-2 border-black uppercase tracking-widest", color === "#FFFFFF" ? "bg-[#FF4D4D] text-white" : "bg-black text-white")}>Active</span>
                <button className="text-[9px] font-black uppercase tracking-widest text-zinc-400 underline underline-offset-4">Cancel</button>
            </div>
        </div>
    );
}

function ProfileStat({ label, value }: any) {
  return (
    <div className="neo-card neo-shadow p-4 space-y-1 bg-white">
      <p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest leading-none">{label}</p>
      <p className="text-xl font-black italic tracking-tighter leading-none">{value}</p>
    </div>
  );
}
