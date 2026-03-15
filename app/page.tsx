'use client';

import { useState, useEffect, useMemo } from 'react';
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
  ChevronDown,
  Trash2,
  Lock,
  Zap,
  Globe,
  Star,
  Moon,
  Clock,
  Settings,
  CreditCard,
  History,
  AlertCircle,
  Trophy,
  Users,
  RefreshCcw,
  ZapOff
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- V2 BASE COMPONENTS ---

function BrutalistToggle({ active, onClick, large }: { active: boolean; onClick: () => void; large?: boolean }) {
    return (
        <button 
            onClick={onClick}
            className={cn(
                "border-3 border-black flex items-center p-[2px] transition-colors duration-200",
                large ? "w-[80px] h-[44px]" : "w-[48px] h-[26px]",
                active ? "bg-[#FFE500]" : "bg-white"
            )}
        >
            <motion.div 
                animate={{ x: active ? (large ? 34 : 22) : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className={cn("bg-black", large ? "w-[34px] h-[34px]" : "w-[18px] h-[18px]")}
            />
        </button>
    );
}

function SegmentedSelector({ options, selected, onSelect, large }: { options: string[], selected: string, onSelect: (val: string) => void, large?: boolean }) {
    return (
        <div className={cn("flex border-3 border-black overflow-hidden", large ? "h-14" : "h-12")}>
            {options.map((opt, i) => (
                <button
                    key={opt}
                    onClick={() => onSelect(opt)}
                    className={cn(
                        "flex-1 text-[10px] font-black uppercase tracking-widest transition-colors",
                        i !== 0 && "border-l-3 border-black",
                        selected === opt ? "bg-[#FFE500] text-black" : "bg-white text-zinc-400 hover:text-black"
                    )}
                >
                    {opt}
                </button>
            ))}
        </div>
    );
}

function BrutalistInput({ placeholder, value, onChange, type = "text", label, prefix }: any) {
    const [isFocused, setIsFocused] = useState(false);
    return (
        <div className="space-y-1.5 text-left w-full">
            {label && <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic font-archivo">{label}</p>}
            <div className="relative">
                {prefix && <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-sm">{prefix}</span>}
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={placeholder}
                    className={cn(
                        "w-full h-[56px] border-3 border-black px-4 text-sm font-black uppercase outline-none transition-colors placeholder:text-zinc-400 font-archivo",
                        prefix ? "pl-10 pr-4" : "px-4",
                        isFocused ? "bg-[#FFE500]" : "bg-white"
                    )}
                />
            </div>
        </div>
    );
}

function BottomSheet({ isOpen, onClose, title, children, actionLabel, onAction }: any) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/40 z-[80] backdrop-blur-sm"
                    />
                    <motion.div 
                        initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="absolute bottom-0 inset-x-0 bg-white border-t-3 border-x-3 border-black z-[90] p-8 pb-10 flex flex-col gap-6"
                    >
                        <div className="w-12 h-1.5 bg-black rounded-full mx-auto -mt-4 mb-4" />
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-3xl font-black tracking-tighter uppercase italic leading-none font-archivo">{title}</h3>
                            <button onClick={onClose} className="p-1"><XIcon size={24} /></button>
                        </div>
                        <div className="space-y-6 scrollbar-hide overflow-y-auto max-h-[60vh]">
                            {children}
                            <button onClick={onAction} className="neo-button w-full h-[64px] bg-[#FFE500] text-sm font-black tracking-[2px] font-archivo">{actionLabel}</button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

// --- MAIN APP ---

export default function VaultaApp() {
  const [activeTab, setActiveTab] = useState('Home');
  const [overlay, setOverlay] = useState<string | null>(null);
  const [selectedBadge, setSelectedBadge] = useState<any>(null);

  const openOverlay = (name: string) => setOverlay(name);
  const closeOverlay = () => {
      setOverlay(null);
      setSelectedBadge(null);
  };

  return (
    <div className="flex flex-col h-full bg-[#F5F0E8] relative overflow-hidden text-left selection:bg-black selection:text-white">
      {/* Content Area */}
      <div className="flex-1 overflow-y-auto scrollbar-hide pb-24 px-6 pt-8 font-archivo italic">
        {activeTab === 'Home' && <HomeScreen onDeposit={() => openOverlay('deposit')} onSpendSave={() => openOverlay('spend-save')} />}
        {activeTab === 'Goals' && <GoalsScreen onNewGoal={() => openOverlay('new-goal')} />}
        {activeTab === 'Streaks' && <StreaksScreen onOpenBadge={(badge: any) => { setSelectedBadge(badge); openOverlay('badge-detail'); }} onOpenGallery={() => openOverlay('gallery')} onOpenChallenges={() => openOverlay('challenges')} />}
        {activeTab === 'Yield' && <YieldScreen />}
        {activeTab === 'Profile' && <ProfileScreen 
            onOpenGifts={() => openOverlay('gifts')} 
            onOpenWill={() => openOverlay('will')} 
            onOpenSubs={() => openOverlay('subs')} 
            onOpenRoundups={() => openOverlay('roundups')} 
            onOpenScore={() => openOverlay('score')}
        />}
      </div>

      {/* Overlays */}
      <AnimatePresence>
        {overlay === 'gifts' && <YieldGiftingOverlay onClose={closeOverlay} />}
        {overlay === 'will' && <SavingsWillOverlay onClose={closeOverlay} />}
        {overlay === 'deposit' && <DepositFlowOverlay onClose={closeOverlay} onShare={() => openOverlay('share')} />}
        {overlay === 'new-goal' && <GoalCreationOverlay onClose={closeOverlay} onStartSaving={() => openOverlay('deposit')} />}
        {overlay === 'gallery' && <BadgeGalleryOverlay onClose={closeOverlay} onOpenBadge={(badge: any) => { setSelectedBadge(badge); openOverlay('badge-detail'); }} />}
        {overlay === 'badge-detail' && <BadgeDetailOverlay badge={selectedBadge} onClose={() => openOverlay('gallery')} onShare={() => openOverlay('share')} />}
        {overlay === 'share' && <ShareXOverlay onClose={closeOverlay} />}
        {overlay === 'subs' && <YieldSubscriptionsOverlay onClose={closeOverlay} />}
        {overlay === 'spend-save' && <SpendSaveOverlay onClose={closeOverlay} />}
        {overlay === 'roundups' && <RoundUpSavingsOverlay onClose={closeOverlay} />}
        {overlay === 'score' && <SavingsScoreOverlay onClose={closeOverlay} onShare={() => openOverlay('share')} />}
        {overlay === 'challenges' && <ChallengesOverlay onClose={closeOverlay} />}
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

function OverlayWrapper({ title, onClose, children, bgColor = "#F5F0E8", noHeader = false }: any) {
    return (
        <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute inset-0 z-[60] flex flex-col p-6 pt-8 scrollbar-hide overflow-y-auto"
            style={{ backgroundColor: bgColor }}
        >
            {!noHeader && (
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-black tracking-tighter uppercase leading-none italic font-archivo">{title}</h1>
                    <button onClick={onClose} className="neo-button p-2 bg-white flex items-center justify-center h-10 w-10"><XIcon size={20} /></button>
                </div>
            )}
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

function HomeScreen({ onDeposit, onSpendSave }: any) {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 text-left">
      <section className="space-y-1">
        <p className="text-zinc-500 text-[10px] font-black tracking-widest uppercase italic">Total Savings</p>
        <h2 className="text-[52px] font-black leading-none tracking-tighter italic font-archivo">$1,247.83</h2>
        <div className="flex items-center gap-3 font-archivo">
          <p className="text-[#FF4D4D] font-black text-sm flex items-center gap-0.5 uppercase tracking-tighter italic">
            <ArrowUp size={14} strokeWidth={4} /> $8.42 this week
          </p>
          <span className="bg-[#FFE500] px-3 py-1 rounded-full border-2 border-black text-[9px] font-black tracking-[2px] uppercase font-archivo">🔥 On Track</span>
        </div>
      </section>

      <div onClick={onSpendSave} className="neo-card neo-shadow bg-[#FFE500] p-6 flex justify-between items-center cursor-pointer active:scale-[0.98] transition-all rotate-[-1deg]">
        <div className="space-y-1 text-left font-archivo">
            <h4 className="text-xl font-black uppercase italic tracking-tighter">Spend & Save</h4>
            <p className="text-[9px] font-bold uppercase opacity-60">Unlock $800. Yield repays it.</p>
        </div>
        <div className="bg-black text-[#FFE500] px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest italic font-archivo">Zero Interest</div>
      </div>

      <div className="grid grid-cols-2 gap-4 font-archivo">
        <div className="neo-card neo-shadow space-y-1 text-left bg-white">
          <p className="text-[9px] text-zinc-500 font-black uppercase tracking-widest leading-none italic">Current APY</p>
          <p className="text-3xl font-black italic tracking-tighter leading-none">8.6%</p>
        </div>
        <div className="neo-card neo-shadow space-y-1 text-left bg-white">
          <p className="text-[9px] text-zinc-500 font-black uppercase tracking-widest leading-none italic">Yield Earned</p>
          <p className="text-3xl font-black italic tracking-tighter leading-none">$23.41</p>
        </div>
      </div>

      <section className="space-y-4 text-left font-archivo">
        <h3 className="text-sm font-black uppercase tracking-[3px] inline-block border-b-3 border-black pb-1 italic">Your Vault</h3>
        <div className="neo-card neo-shadow space-y-6 bg-white">
          <AllocationRow label="Morpho" percent={42} color="#FFE500" />
          <AllocationRow label="Pendle" percent={31} color="#FF4D4D" />
          <AllocationRow label="Tokemak" percent={27} color="#C8E6C9" />
        </div>
      </section>

      <button onClick={onDeposit} className="neo-button w-full h-[56px] bg-[#FFE500] text-sm tracking-widest font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all italic font-archivo">
        Deposit
      </button>
    </div>
  );
}

function GoalsScreen({ onNewGoal }: any) {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 text-left font-archivo italic">
      <h1 className="text-4xl font-black tracking-tighter uppercase leading-none italic">My Goals</h1>
      
      <div className="space-y-6">
        <GoalCard title="Emergency Fund" target="$5,000" progress={34} current="$1,700" rotate="-1" tag="yoUSD VAULT" />
        <GoalCard title="ETH Stack" target="2 ETH" progress={12} current="0.24 ETH" rotate="1" tag="yoETH VAULT" color="#FF4D4D" />
      </div>

      <button onClick={onNewGoal} className="neo-button w-full h-[56px] bg-black text-white flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_#FFE500] italic font-archivo uppercase font-black tracking-widest">
        <Plus size={20} strokeWidth={3} /> New Goal
      </button>
    </div>
  );
}

function StreaksScreen({ onOpenBadge, onOpenGallery, onOpenChallenges }: any) {
  return (
    <div className="space-y-10 animate-in zoom-in-95 duration-500 text-left font-archivo italic">
      <h1 className="text-4xl font-black tracking-tighter uppercase leading-none italic">Your Streak</h1>
      <div onClick={onOpenGallery} className="bg-[#FFE500] neo-border neo-shadow p-10 text-center space-y-2 rotate-[-1deg] cursor-pointer active:scale-95 transition-transform">
        <span className="text-7xl block mb-2">🔥</span>
        <h2 className="text-[96px] font-black leading-[0.8] tracking-tighter italic font-archivo">14</h2>
        <p className="text-xl font-black uppercase tracking-[4px] italic">Weeks Straight</p>
      </div>

      <ProfileRow icon={Users} label="Savings Challenges" badge="LIVE" color="#FFE500" onClick={onOpenChallenges} />

      <section className="space-y-6">
        <h3 className="text-sm font-black uppercase tracking-[3px] border-b-3 border-black pb-1 inline-block italic font-archivo">Milestones</h3>
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide">
          <MilestoneBadge rank="🥉" label="4 WEEKS" unlocked rotate="1" onClick={() => onOpenBadge({rank: '🥉', name: 'Starter', desc: '4 Weeks of saving straight', date: 'Jan 2026'})} />
          <MilestoneBadge rank="🥈" label="8 WEEKS" unlocked rotate="-1" onClick={() => onOpenBadge({rank: '🥈', name: 'Consistent', desc: '8 Weeks of saving straight', date: 'Feb 2026'})} />
          <MilestoneBadge rank="🥇" label="12 WEEKS" unlocked rotate="2" onClick={() => onOpenBadge({rank: '🥇', name: 'Dedicated', desc: '12 Weeks of saving straight', date: 'Mar 2026'})} />
          <MilestoneBadge rank="💎" label="26 WEEKS" rotate="-2" locked />
          <MilestoneBadge rank="👑" label="52 WEEKS" rotate="1" locked />
        </div>
      </section>
      <section className="space-y-4 text-left font-archivo">
        <h3 className="text-sm font-black uppercase tracking-[3px] border-b-3 border-black pb-1 inline-block italic">Streak History</h3>
        <div className="grid grid-cols-6 gap-2 italic">
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
    <div className="space-y-8 animate-in fade-in duration-500 text-left font-archivo italic">
      <h1 className="text-4xl font-black tracking-tighter uppercase leading-none italic">Yield Breakdown</h1>
      <div className="bg-black text-[#FFE500] neo-border neo-shadow p-8 text-center space-y-1 italic font-archivo">
        <p className="text-[10px] font-black uppercase tracking-[3px] opacity-60 text-white italic">Total Yield Earned</p>
        <h2 className="text-6xl font-black tracking-tighter italic font-archivo">$23.41</h2>
        <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500 italic font-archivo">Since you started saving</p>
      </div>
      <section className="space-y-6">
        <h3 className="text-sm font-black uppercase tracking-[3px] border-b-3 border-black pb-1 inline-block italic font-archivo">Why is my money here?</h3>
        <div className="space-y-6">
          <YieldInfoCard title="MORPHO — 42%" badge="Highest risk-adjusted yield" text="Lending market. A- risk rating. Earning 14.2% APY. Your biggest allocation." color="#FF4D4D" />
          <YieldInfoCard title="PENDLE — 31%" badge="Fixed-rate arbitrage window" text="Fixed yield locked in at 18.5%. Unusual spike this week — may compress." color="#FFE500" />
          <YieldInfoCard title="TOKEMAK — 27%" badge="Stable base layer" text="Lower yield but highest security score. Balances your overall risk exposure." color="#C8E6C9" />
        </div>
      </section>
      <button className="neo-button w-full h-[56px] bg-black text-[#FFE500] text-sm tracking-widest font-black uppercase italic font-archivo">Simulate Returns</button>
    </div>
  );
}

function ProfileScreen({ onOpenGifts, onOpenWill, onOpenSubs, onOpenRoundups, onOpenScore }: any) {
  return (
    <div className="space-y-8 animate-in slide-in-from-top-4 duration-500 text-left font-archivo italic">
      <h1 className="text-4xl font-black tracking-tighter uppercase leading-none italic font-archivo">Your Profile</h1>
      <div className="neo-card neo-shadow p-6 flex items-center gap-5 rotate-[1deg] bg-white text-left font-archivo">
        <div className="w-20 h-20 bg-[#FFE500] neo-border flex items-center justify-center text-2xl font-black font-archivo uppercase">NB</div>
        <div className="space-y-1 font-archivo">
          <p className="text-2xl font-black tracking-tighter font-mono italic text-[#0A0A0A] font-archivo italic">0x3f...9a2c</p>
          <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500 italic font-archivo">Vaulta Saver since Jan 2026</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 font-archivo">
        <ProfileStat label="Total Deposited" value="$1,224.42" />
        <ProfileStat label="Total Yield" value="$23.41" />
        <ProfileStat label="Longest Streak" value="14 WKS 🔥" />
        <ProfileStat label="Goals Done" value="1 ✓" />
      </div>
      <section className="space-y-4 text-left font-archivo">
        <h3 className="text-[10px] font-black uppercase tracking-[3px] border-b-2 border-black pb-1 inline-block italic font-archivo">Vault Operations</h3>
        <div className="space-y-4">
            <ProfileRow icon={Star} label="Savings Score" badge="847" color="#FFE500" onClick={onOpenScore} />
            <ProfileRow icon={Gift} label="Yield Gifts" badge="NEW" color="#FF4D4D" onClick={onOpenGifts} />
            <ProfileRow icon={CreditCard} label="Yield Subscriptions" badge="AUTOPAY" color="#FFE500" onClick={onOpenSubs} />
            <ProfileRow icon={Skull} label="Dead Man's Switch" onClick={onOpenWill} dashed />
            <ProfileRow icon={RefreshCcw} label="Round-Up Savings" badge="AUTO" color="#FF4D4D" onClick={onOpenRoundups} />
        </div>
      </section>
      <button className="neo-button w-full h-[56px] bg-[#FFE500] flex items-center justify-center gap-3 text-sm tracking-widest font-black uppercase italic font-archivo">
        <Share2 size={18} strokeWidth={3} /> Share Your Stats
      </button>
    </div>
  );
}

// --- OVERLAY FLOWS ---

function RoundUpSavingsOverlay({ onClose }: any) {
    const [roundupsOn, setRoundupsOn] = useState(true);

    return (
        <OverlayWrapper title="Round-Ups" onClose={onClose} bgColor={roundupsOn ? "#FFE500" : "#F5F0E8"}>
            <div className="space-y-8 pb-20 text-left font-archivo">
                <div className="bg-black text-white neo-border neo-shadow p-6 rotate-[-1deg] space-y-2 font-archivo">
                    <p className="text-lg font-black uppercase tracking-tighter leading-tight italic">Every Swap. Every Transfer.</p>
                    <p className="text-xs font-bold uppercase text-white/60 italic leading-relaxed">We round up every on-chain transaction to the nearest dollar and sweep the difference into your yoUSD vault automatically.</p>
                </div>

                <div className={cn("neo-card neo-shadow p-10 text-center space-y-6 transition-colors duration-500 bg-white", roundupsOn && "bg-white")}>
                    <h2 className={cn("text-4xl font-black tracking-tighter italic italic italic leading-none", roundupsOn ? "text-black" : "text-zinc-400")}>
                        ROUND-UPS {roundupsOn ? 'ON' : 'OFF'}
                    </h2>
                    <div className="flex justify-center">
                        <BrutalistToggle large active={roundupsOn} onClick={() => setRoundupsOn(!roundupsOn)} />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 italic italic">Rounding to nearest $1.00</p>
                </div>

                <div className="neo-card neo-shadow p-6 bg-white space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic">Round-Up Multiplier</p>
                    <SegmentedSelector options={['1x', '2x', '5x', '10x']} selected="2x" onSelect={() => {}} />
                    <p className="text-[8px] font-bold uppercase text-zinc-400 italic tracking-tight">2x means we double your round-up amount</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <SimpleStat label="Transactions" value="23" />
                    <SimpleStat label="Swept to Vault" value="$14.37" />
                </div>

                <section className="space-y-6">
                    <h3 className="text-sm font-black uppercase tracking-[3px] border-b-3 border-black pb-1 inline-block italic">Recent Round-Ups</h3>
                    <div className="space-y-4">
                        <RoundUpRow title="Uniswap Swap" amount="$0.73" time="2 hrs ago" />
                        <RoundUpRow title="Transfer to 0x..." amount="$0.41" time="5 hrs ago" />
                        <RoundUpRow title="Aave Deposit" amount="$1.20" time="Yesterday" />
                        <RoundUpRow title="Uniswap Swap" amount="$0.87" time="Yesterday" />
                    </div>
                </section>

                <div className="bg-[#FFE500] neo-border neo-shadow p-6 space-y-2 italic text-left">
                    <p className="text-[10px] font-black uppercase opacity-60 italic">This Month</p>
                    <p className="text-sm font-black uppercase italic leading-tight">47 transactions → $31.42 swept to savings</p>
                    <p className="text-[9px] font-black text-green-700 italic tracking-tight uppercase border-t border-black/10 pt-2">At 8.6% APY — That's $2.70 extra yield/yr</p>
                </div>
            </div>
        </OverlayWrapper>
    );
}

function SavingsScoreOverlay({ onClose, onShare }: any) {
    return (
        <OverlayWrapper title="Savings Score" onClose={onClose}>
            <div className="space-y-10 pb-20 text-left font-archivo">
                <div className="bg-black text-[#FFE500] neo-border neo-shadow p-12 text-center space-y-4 font-archivo">
                    <p className="text-[10px] font-black uppercase tracking-[5px] text-[#FFE500]/60 italic font-archivo">Your Score</p>
                    <h2 className="text-[120px] font-black italic tracking-tighter leading-[0.7] font-archivo">847</h2>
                    <p className="text-sm font-black uppercase tracking-[4px] text-white italic">Out of 1000</p>
                    <div className="bg-[#FF4D4D] text-white px-6 py-2 border-2 border-black inline-block text-[10px] font-black uppercase tracking-widest mt-4">Top 12% of Savers</div>
                </div>

                <section className="space-y-6 text-left font-archivo">
                    <h3 className="text-sm font-black uppercase tracking-[3px] border-b-3 border-black pb-1 inline-block italic">What makes your score</h3>
                    <div className="space-y-4">
                        <ScoreRow label="Consistency" score="210 / 250" progress={84} color="#FF4D4D" desc="14-week streak active" />
                        <ScoreRow label="Total Saved" score="180 / 250" progress={72} color="#FFE500" desc="You've saved $1,247 total" />
                        <ScoreRow label="Goal Completion" score="150 / 200" progress={75} color="#C8E6C9" desc="1 of 2 goals completed" />
                        <ScoreRow label="Yield Earned" score="187 / 200" progress={93} color="#0A0A0A" desc="$23.41 total yield earned" />
                        <ScoreRow label="Account Age" score="120 / 100" progress={100} color="#FF4D4D" desc="Saving since Jan 2026 — BONUS ✓" />
                    </div>
                </section>

                <section className="space-y-6 text-left font-archivo">
                    <h3 className="text-sm font-black uppercase tracking-[3px] border-b-3 border-black pb-1 inline-block italic">Score Perks</h3>
                    <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide">
                        <PerkCard status="Unlocked ✓" label="Early access to new features" color="#C8E6C9" rotate="1" />
                        <PerkCard status="Unlocked ✓" label="Priority withdrawal queue" color="#FFE500" rotate="-1" />
                        <PerkCard status="Locked 🔒" label="Score 900+ for undercollateralized loans" color="#FFFFFF" dashed rotate="2" />
                    </div>
                </section>

                <button onClick={onShare} className="neo-button w-full h-[64px] bg-[#FFE500] text-sm font-black uppercase tracking-[2px] italic">Share My Score</button>
            </div>
        </OverlayWrapper>
    );
}

function ChallengesOverlay({ onClose }: any) {
    return (
        <OverlayWrapper title="Challenges" onClose={onClose}>
            <div className="space-y-10 pb-20 text-left font-archivo">
                <div className="bg-[#FFE500] neo-border neo-shadow p-10 rotate-[1deg] space-y-8 relative font-archivo">
                    <div className="flex justify-between items-start">
                        <h4 className="text-xl font-black uppercase italic tracking-tighter italic">You vs Friend</h4>
                        <span className="bg-[#FF4D4D] text-white text-[9px] font-black px-3 py-1 rounded-full border-2 border-black uppercase">LIVE</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="flex-1 neo-card bg-white p-4 space-y-4 text-center">
                            <p className="text-[10px] font-black uppercase italic italic leading-none">You</p>
                            <div className="w-16 h-16 bg-[#FFE500] neo-border mx-auto flex items-center justify-center font-black">NB</div>
                            <div className="space-y-1">
                                <p className="text-sm font-black italic italic leading-none">$187.20</p>
                                <p className="text-[8px] font-black uppercase opacity-60 italic leading-none">🔥 14 streak</p>
                            </div>
                        </div>

                        <div className="font-black text-3xl italic mx-[-8px] z-10 italic">VS</div>

                        <div className="flex-1 neo-card bg-white p-4 space-y-4 text-center">
                            <p className="text-[10px] font-black uppercase italic italic leading-none text-zinc-400">0x9f...3a</p>
                            <div className="w-16 h-16 bg-[#FF4D4D] neo-border mx-auto flex items-center justify-center font-black text-white">??</div>
                            <div className="space-y-1">
                                <p className="text-sm font-black italic italic leading-none">$143.80</p>
                                <p className="text-[8px] font-black uppercase opacity-60 italic leading-none">🔥 9 streak</p>
                            </div>
                        </div>
                    </div>

                    <div className="text-center space-y-4">
                        <h3 className="text-4xl font-black italic tracking-tighter uppercase leading-none italic italic">You're Winning 👑</h3>
                        <div className="bg-black text-[#FFE500] neo-border px-6 py-2 inline-block font-black text-xs uppercase italic tracking-widest italic font-mono">Ends in 16 Days</div>
                    </div>

                    <div className="neo-card bg-white/40 p-4 border-dashed border-black/20 text-center">
                        <p className="text-[9px] font-black uppercase italic italic leading-none">Winner takes loser's yield</p>
                        <p className="text-lg font-black italic italic uppercase tracking-tighter italic mt-1">Prize: ~$4.20</p>
                    </div>
                </div>

                <section className="space-y-6 text-left font-archivo">
                    <h3 className="text-sm font-black uppercase tracking-[3px] border-b-3 border-black pb-1 inline-block italic">Past Challenges</h3>
                    <div className="space-y-4">
                        <ChallengeResult label="Won ✓" vs="vs 0x4f...2c" date="Feb 2026" prize="Won $3.80 yield" color="#C8E6C9" />
                        <ChallengeResult label="Lost ✗" vs="vs 0x8a...1f" date="Jan 2026" prize="Lost $1.20 yield" color="#FF4D4D" />
                    </div>
                </section>
            </div>
        </OverlayWrapper>
    );
}

// --- CORE UTILS & COMPONENTS ---

function YieldGiftingOverlay({ onClose }: any) {
  const [showSheet, setShowSheet] = useState(false);

  return (
    <OverlayWrapper title="Yield Gifts" onClose={onClose}>
      <div className="space-y-8 pb-20 text-left font-archivo">
        <div className="bg-[#FFE500] neo-border neo-shadow p-6 rotate-[2deg] space-y-2 font-archivo">
            <p className="text-lg font-black uppercase tracking-tighter leading-tight italic">Send your yield. Keep your money.</p>
            <p className="text-xs font-bold uppercase text-black/60 italic leading-relaxed">Your $1,000 stays yours. Your yield goes to whoever you choose. Forever.</p>
        </div>

        <section className="space-y-6">
            <GiftCard name="Mom's Wallet" wallet="0x7a...3f2c" amount="$6.80/mo" since="JAN 2026" />
            <GiftCard name="Save The Ocean 🌊" wallet="0x8b...1e2d" amount="$1.20/mo" since="FEB 2026" color="#C8E6C9" />
        </section>

        <button onClick={() => setShowSheet(true)} className="neo-button w-full h-[64px] bg-[#FFE500] text-sm tracking-widest font-black uppercase italic font-archivo shadow-[4px_4px_0_0_#000]">+ New Yield Gift</button>
      </div>

      <BottomSheet 
        isOpen={showSheet} 
        onClose={() => setShowSheet(false)} 
        title="Create Yield Gift"
        actionLabel="Confirm Gift"
        onAction={() => setShowSheet(false)}
      >
        <div className="space-y-6 text-left font-archivo">
            <BrutalistInput placeholder="Recipient Wallet or ENS" label="Recipient" />
            <div className="space-y-3 font-archivo">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic leading-none font-archivo">Gift Amount</p>
                <SegmentedSelector 
                    options={['10%', '25%', '50%', 'All']} 
                    selected="25%" 
                    onSelect={() => {}} 
                />
            </div>
            <div className="neo-card bg-[#F5F0E8] p-4 text-center font-archivo">
                <p className="text-sm font-black uppercase tracking-tighter italic italic font-archivo">You send ~$3.40/mo <span className="text-zinc-400 font-archivo">at current APY</span></p>
            </div>
        </div>
      </BottomSheet>
    </OverlayWrapper>
  );
}

function SavingsWillOverlay({ onClose }: any) {
  const [active, setActive] = useState(false);

  return (
    <OverlayWrapper title="Savings Will" onClose={onClose} bgColor={active ? "#C8E6C9" : "#F5F0E8"}>
        <div className="space-y-10 pb-20 text-left font-archivo">
            <div className="bg-black text-white neo-border neo-shadow p-6 rotate-[-1deg] space-y-2 text-left font-archivo">
                <div className="flex items-center gap-3 mb-2 font-archivo">
                    <Skull size={24} className="text-[#FF4D4D]" />
                    <p className="text-xl font-black uppercase tracking-tighter italic italic font-archivo">If you disappear</p>
                </div>
                <p className="text-xs font-bold uppercase text-white/60 leading-relaxed italic font-archivo">If you don't interact with Vaulta for your chosen period, your entire savings vault transfers automatically to your beneficiary.</p>
            </div>

            <div className={cn("neo-card neo-shadow p-8 text-center space-y-6 transition-colors duration-500 bg-white font-archivo", active ? "bg-[#C8E6C9]" : "bg-[#FF4D4D]")}>
                <h2 className="text-7xl font-black tracking-tighter italic italic leading-none font-archivo">{active ? 'ACTIVE' : 'INACTIVE'}</h2>
                <div className="flex justify-center font-archivo">
                    <BrutalistToggle active={active} onClick={() => setActive(!active)} />
                </div>
            </div>

            <section className="space-y-6 text-left font-archivo">
                <h3 className="text-sm font-black uppercase tracking-[3px] border-b-3 border-black pb-1 inline-block italic italic font-archivo">Set up your Will</h3>
                <div className="space-y-4 font-archivo">
                    <BrutalistInput label="Beneficiary Wallet" placeholder="0x... or ENS name" />
                    <div className="space-y-3 font-archivo">
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic font-archivo">Inactivity Period</p>
                        <SegmentedSelector options={['6 MO', '12 MO', '24 MO']} selected="12 MO" onSelect={() => {}} />
                        <p className="text-[8px] font-bold text-zinc-400 uppercase italic font-archivo">Last activity: 3 days ago</p>
                    </div>
                    <div className="neo-card neo-shadow p-5 space-y-4 bg-white text-left font-archivo">
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic leading-none font-archivo">Trigger Conditions</p>
                        <div className="space-y-4 font-archivo">
                             <div className="flex justify-between items-center font-archivo"><span className="text-[11px] font-black uppercase italic font-archivo">No Deposits</span><BrutalistToggle active onClick={()=>{}} /></div>
                             <div className="flex justify-between items-center font-archivo"><span className="text-[11px] font-black uppercase italic font-archivo">No Logins</span><BrutalistToggle active onClick={()=>{}} /></div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="neo-border border-dashed p-5 rotate-[1deg] space-y-2 bg-white/50 text-left font-archivo">
                <p className="text-sm font-black uppercase tracking-tight text-[#FF4D4D] flex items-center gap-2 italic italic font-archivo">
                    <ShieldAlert size={16} /> This is irreversible once triggered
                </p>
                <p className="text-[10px] font-bold uppercase text-zinc-500 italic font-archivo">Test your setup with a small amount first.</p>
            </div>

            <button className="neo-button w-full h-[64px] bg-black text-[#FFE500] text-sm tracking-widest font-black uppercase italic font-archivo shadow-[4px_4px_0_0_#FFE500]">Activate Will</button>
        </div>
    </OverlayWrapper>
  );
}

function DepositFlowOverlay({ onClose, onShare }: any) {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState('100');

  useEffect(() => {
    if (step === 2) {
      const timer = setTimeout(() => setStep(3), 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <OverlayWrapper title="Deposit" onClose={onClose}>
        {step === 1 && (
            <div className="space-y-8 pb-20 animate-in fade-in duration-300 text-left font-archivo">
                <div className="bg-[#FFE500] neo-border neo-shadow p-10 text-center space-y-4 font-archivo">
                    <div className="relative inline-block font-archivo">
                        <span className="text-7xl font-black italic tracking-tighter leading-none block italic font-archivo">${amount}</span>
                        <div className="absolute top-0 -right-4 w-1.5 h-full bg-black animate-pulse" />
                    </div>
                    <div className="space-y-1 font-archivo">
                        <p className="text-[10px] font-black uppercase tracking-widest text-black/40 italic italic font-archivo">USDC on Base</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-black/60 italic italic font-archivo">Wallet Balance: $847.20 USDC</p>
                    </div>
                </div>

                <div className="grid grid-cols-5 gap-2 font-archivo">
                    {['$10', '$50', '$100', '$500', 'MAX'].map(val => (
                        <button onClick={() => setAmount(val.replace('$',''))} key={val} className={cn("neo-border py-4 text-[10px] font-black uppercase transition-colors hover:bg-[#FFE500] font-archivo", amount === val.replace('$','') || (val === 'MAX' && amount === '847.20') ? "bg-[#FFE500]" : "bg-white")}>{val}</button>
                    ))}
                </div>

                <div className="space-y-3 text-left font-archivo">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic italic font-archivo">Depositing Into</p>
                    <div className="neo-card neo-shadow p-5 flex justify-between items-center cursor-pointer group hover:border-[#FFE500] transition-all bg-white font-archivo">
                        <div className="flex flex-col font-archivo text-left">
                            <span className="text-lg font-black uppercase tracking-tight italic italic font-archivo">yoUSD Vault</span>
                            <div className="flex items-center gap-2 mt-1 font-archivo">
                                <span className="bg-[#FFE500] text-[8px] font-black px-2 py-0.5 rounded-full uppercase border-2 border-black font-archivo">8.6% APY</span>
                            </div>
                        </div>
                        <ChevronDown size={24} strokeWidth={3} className="text-zinc-300 group-hover:text-black transition-colors" />
                    </div>
                </div>

                <div className="neo-card neo-shadow p-6 bg-[#C8E6C9] rotate-[1deg] space-y-4 text-left font-archivo">
                    <div className="flex justify-between items-center border-b-2 border-black/10 pb-2 font-archivo">
                        <span className="text-[9px] font-black uppercase tracking-[2px] text-black/40 italic italic font-archivo">At Current APY</span>
                        <TrendingUp size={14} className="text-black/40" />
                    </div>
                    <div className="space-y-1 font-archivo text-left">
                        <p className="text-sm font-black uppercase tracking-widest italic italic font-archivo">In 12 Months: <span className="text-xl italic">$1,086.00</span></p>
                        <p className="text-[10px] font-bold uppercase text-black/60 italic italic font-archivo">Yield Earned: $86.00</p>
                    </div>
                </div>

                <button onClick={() => setStep(2)} className="neo-button w-full h-[64px] bg-[#FFE500] text-sm tracking-[2px] font-black uppercase leading-none italic italic font-archivo shadow-[4px_4px_0_0_#000]">Confirm Deposit ${amount}</button>
            </div>
        )}

        {step === 2 && (
            <div className="flex-1 flex flex-col items-center justify-center space-y-10 animate-in zoom-in-95 duration-500 text-center font-archivo italic">
                <div className="w-40 h-40 bg-[#FFE500] neo-border neo-shadow flex items-center justify-center font-archivo">
                    <CheckCircle2 size={80} strokeWidth={4} />
                </div>
                <div className="space-y-2 font-archivo">
                    <h3 className="text-4xl font-black uppercase tracking-tighter italic italic font-archivo">Depositing ${amount}</h3>
                    <p className="text-sm font-black uppercase tracking-widest text-zinc-500 italic font-archivo">Into yoUSD Vault</p>
                </div>
                <div className="w-full max-w-xs space-y-3 px-6 font-archivo">
                    <div className="h-6 w-full bg-black neo-border overflow-hidden font-archivo">
                        <motion.div 
                            initial={{ width: 0 }} 
                            animate={{ width: '60%' }} 
                            className="h-full bg-[#FFE500] border-r-3 border-black font-archivo" 
                        />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest animate-pulse italic italic font-archivo">Approving USDC...</p>
                </div>
            </div>
        )}

        {step === 3 && (
            <div className="flex-1 flex flex-col items-center justify-center space-y-12 animate-in slide-in-from-bottom-12 duration-500 text-center font-archivo italic">
                <div className="space-y-4 font-archivo italic">
                    <h2 className="text-7xl font-black uppercase tracking-tighter italic italic leading-none font-archivo">Deposited! 🎉</h2>
                    <div className="bg-[#C8E6C9] neo-border neo-shadow px-6 py-2 rotate-[-1deg] inline-block font-black text-xl italic uppercase tracking-tighter italic font-archivo">
                        ${amount}.00 → yoUSD
                    </div>
                </div>

                <div className="neo-card neo-shadow p-8 bg-white w-full space-y-4 text-left font-archivo italic">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 text-center italic italic font-archivo">Stats Update</p>
                    <div className="flex justify-between items-end border-b-2 border-black pb-4 font-archivo italic">
                        <span className="text-sm font-black uppercase italic italic font-archivo">New Total</span>
                        <span className="text-3xl font-black italic italic font-archivo">$1,347.83</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-black uppercase italic italic text-green-600 font-archivo italic">
                        <span>Weekly Streak</span>
                        <span>14 Weeks 🔥</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full font-archivo italic">
                    <button onClick={onClose} className="neo-button h-[64px] bg-white text-xs tracking-widest italic font-black uppercase italic font-archivo shadow-[4px_4px_0_0_#000]">View Vault</button>
                    <button onClick={onShare} className="neo-button h-[64px] bg-[#00ACEE] text-white text-xs tracking-widest italic font-black uppercase flex items-center justify-center gap-2 italic font-archivo shadow-[4px_4px_0_0_#000]">
                        Share on X <Share2 size={18} />
                    </button>
                </div>
            </div>
        )}
    </OverlayWrapper>
  );
}

function GoalCreationOverlay({ onClose, onStartSaving }: any) {
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');

    return (
        <OverlayWrapper title="New Goal" onClose={onClose}>
            {step === 1 && (
                <div className="space-y-6 pb-20 animate-in fade-in duration-300 text-left font-archivo italic">
                    <div className="bg-[#FFE500] neo-border neo-shadow p-6 space-y-4 font-archivo italic text-left">
                        <div className="flex justify-between items-start font-archivo italic">
                            <p className="text-[10px] font-black uppercase tracking-widest leading-none italic italic font-archivo">What are you saving for?</p>
                            <span className="text-[9px] font-black text-black/30 font-mono italic italic font-archivo">{name.length}/30</span>
                        </div>
                        <input 
                            value={name}
                            onChange={(e) => setName(e.target.value.toUpperCase())}
                            className="w-full bg-white neo-border p-5 h-[56px] text-sm font-black uppercase italic outline-none placeholder-zinc-300 focus:bg-[#F5F0E8] transition-colors font-archivo" 
                            placeholder="EMERGENCY FUND, NEW LAPTOP..." 
                        />
                    </div>

                    <div className="neo-card neo-shadow space-y-4 bg-white text-left font-archivo italic">
                        <p className="text-[10px] font-black uppercase tracking-widest leading-none italic italic text-zinc-500 font-archivo">Target Amount</p>
                        <input className="text-6xl font-black italic italic tracking-tighter w-full bg-transparent border-none outline-none leading-none font-archivo italic" placeholder="$0" />
                        <SegmentedSelector options={['USDC', 'ETH', 'BTC']} selected="USDC" onSelect={() => {}} />
                    </div>

                    <div className="neo-card neo-shadow space-y-4 bg-white text-left font-archivo italic">
                        <p className="text-[10px] font-black uppercase tracking-widest leading-none italic italic text-zinc-500 font-archivo">Target Date</p>
                        <div className="grid grid-cols-2 gap-3 h-[56px] font-archivo">
                            <div className="neo-border px-4 flex justify-between items-center cursor-pointer bg-[#F5F0E8] shadow-inner font-archivo italic">
                                <span className="text-xs font-black italic italic font-archivo">SEP</span>
                                <ChevronDown size={16} strokeWidth={3} />
                            </div>
                            <div className="neo-border px-4 flex justify-between items-center cursor-pointer bg-[#F5F0E8] shadow-inner font-archivo italic">
                                <span className="text-xs font-black italic italic font-archivo">2026</span>
                                <ChevronDown size={16} strokeWidth={3} />
                            </div>
                        </div>
                    </div>

                    <div className="neo-card neo-shadow bg-[#C8E6C9] p-6 rotate-[2deg] flex items-center gap-6 text-left font-archivo">
                        <div className="flex-1 space-y-1 font-archivo text-left">
                            <p className="text-[8px] font-black uppercase tracking-[2px] text-black/40 italic italic leading-none font-archivo italic">Recommended Vault</p>
                            <h4 className="text-2xl font-black italic italic tracking-tighter italic font-archivo italic">yoUSD <span className="bg-[#FFE500] text-[8px] px-2 py-0.5 rounded-full border-2 border-black inline-block ml-2 align-middle font-archivo italic">8.6% APY</span></h4>
                            <p className="text-[9px] font-bold uppercase text-black/60 italic italic tracking-tight font-archivo italic">Best for stable savings goals under 24 months</p>
                        </div>
                    </div>

                    <button onClick={() => setStep(2)} className="neo-button w-full h-[64px] bg-[#FFE500] text-sm tracking-widest italic font-black uppercase italic mt-4 font-archivo shadow-[4px_4px_0_0_#000]">Generate Plan</button>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-8 pb-20 animate-in slide-in-from-bottom-8 duration-500 text-left font-archivo italic">
                    <div className="bg-black text-white neo-border neo-shadow p-10 space-y-4 text-center font-archivo italic">
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/40 italic italic font-archivo italic">To hit $5,000 by Sep 2026</p>
                        <h2 className="text-7xl font-black italic italic tracking-tighter text-[#FFE500] italic leading-none font-archivo italic">$387/mo</h2>
                        <p className="text-[9px] font-bold uppercase text-white/60 italic italic tracking-widest font-archivo">Or deposit $3,200 today as lump sum</p>
                    </div>

                    <div className="grid grid-cols-3 gap-3 font-archivo">
                        <SimpleStat label="APY Risk" value="Low 🟢" />
                        <SimpleStat label="Time" value="8 MO" />
                        <SimpleStat label="Gap" value="$3,300" />
                    </div>

                    <div className="neo-border border-dashed p-6 bg-[#FF4D4D]/10 rotate-[-1deg] space-y-2 font-archivo italic text-left">
                        <div className="flex items-center gap-2 text-[#FF4D4D] font-black uppercase text-sm tracking-tighter italic italic font-archivo italic">
                            <ShieldAlert size={18} /> Tight Timeline
                        </div>
                        <p className="text-xs font-bold uppercase text-zinc-500 leading-tight italic italic font-archivo italic">Increase monthly deposit or extend deadline to reduce stress on your portfolio.</p>
                    </div>

                    <button onClick={() => setStep(3)} className="neo-button w-full h-[64px] bg-[#FFE500] text-sm tracking-widest italic font-black uppercase italic font-archivo shadow-[4px_4px_0_0_#000]">Create Goal</button>
                </div>
            )}

            {step === 3 && (
                <div className="flex-1 flex flex-col items-center justify-center space-y-12 animate-in zoom-in-95 duration-500 text-center font-archivo italic">
                    <h2 className="text-5xl font-black uppercase tracking-tighter italic italic leading-none italic font-archivo italic">Goal Created! 🎯</h2>
                    <div className="w-full px-6 font-archivo italic">
                        <GoalCard title={name || "SAVINGS GOAL"} target="$5,000" progress={0} current="$0" rotate="1" tag="yoUSD VAULT" />
                    </div>
                    <button onClick={onStartSaving} className="neo-button w-full h-[64px] bg-[#FFE500] text-sm tracking-widest italic font-black uppercase italic font-archivo shadow-[4px_4px_0_0_#000]">Start Saving Now</button>
                </div>
            )}
        </OverlayWrapper>
    );
}

function BadgeGalleryOverlay({ onClose, onOpenBadge }: any) {
    const badges = [
        { rank: '🥉', name: 'Starter', status: '4 WEEKS', date: 'Unlocked Jan 2026', unlocked: true },
        { rank: '🥈', name: 'Consistent', status: '8 WEEKS', date: 'Unlocked Feb 2026', unlocked: true },
        { rank: '🥇', name: 'Dedicated', status: '12 WEEKS', date: 'Unlocked Mar 2026', unlocked: true },
        { rank: '💎', name: 'Diamond Saver', status: '26 WEEKS', date: 'Locked', unlocked: false },
        { rank: '👑', name: 'Legend', status: '52 WEEKS', date: 'Locked', unlocked: false },
        { rank: '🌙', name: 'Night Owl', status: 'Midnight 3x', date: 'Locked', unlocked: false },
        { rank: '⚡', name: 'Speed Saver', status: 'Hit Goal Fast', date: 'Locked', unlocked: false },
        { rank: '🐳', name: 'Whale', status: 'Save $10,000', date: 'Locked', unlocked: false },
    ];

    return (
        <OverlayWrapper title="Badge Gallery" onClose={onClose}>
            <div className="space-y-8 pb-20 text-left font-archivo italic">
                <div className="bg-[#FFE500] neo-border neo-shadow p-10 space-y-4 font-archivo italic text-left">
                    <div className="flex items-center gap-4 font-archivo italic">
                        <Flame size={48} strokeWidth={3} />
                        <h3 className="text-3xl font-black uppercase tracking-tighter italic italic italic font-archivo italic">14 Week Streak</h3>
                    </div>
                    <div className="space-y-2 font-archivo">
                        <p className="text-[10px] font-black uppercase tracking-widest italic italic leading-none opacity-60 italic font-archivo">Keep going — 12 weeks to next badge</p>
                        <div className="h-4 w-full bg-black/10 neo-border overflow-hidden font-archivo italic">
                            <div className="h-full bg-black border-r-2 border-black font-archivo italic italic" style={{ width: '55%' }} />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 font-archivo italic">
                    {badges.map((b, i) => (
                        <div 
                            key={i} 
                            onClick={() => b.unlocked && onOpenBadge(b)}
                            className={cn(
                                "neo-card neo-shadow flex flex-col items-center justify-center p-6 text-center gap-3 transition-all font-archivo italic",
                                b.unlocked ? "bg-white cursor-pointer hover:translate-y-[-2px]" : "bg-zinc-100 opacity-40 border-dashed grayscale font-archivo italic"
                            )}
                        >
                            <span className={cn("text-4xl")}>{b.rank}</span>
                            <div className="space-y-1 font-archivo italic">
                                <p className="text-[9px] font-black uppercase tracking-widest leading-none italic font-archivo italic">{b.name}</p>
                                <p className="text-[7px] font-black uppercase tracking-widest text-zinc-400 leading-none italic font-archivo italic">{b.status}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </OverlayWrapper>
    );
}

function BadgeDetailOverlay({ badge, onClose, onShare }: any) {
    return (
        <OverlayWrapper title="Badge Detail" onClose={onClose}>
            <div className="flex-1 flex flex-col items-center justify-center space-y-10 py-10 animate-in zoom-in-95 duration-500 text-center font-archivo italic">
                <div className="w-64 h-64 bg-[#FFE500] neo-border neo-shadow flex items-center justify-center rotate-[-2deg] font-archivo italic">
                    <span className="text-[120px] font-archivo italic">{badge.rank}</span>
                </div>
                <div className="space-y-2 font-archivo italic">
                    <h3 className="text-5xl font-black uppercase tracking-tighter italic italic italic leading-none italic font-archivo italic">{badge.name}</h3>
                    <p className="text-sm font-black uppercase tracking-[3px] text-zinc-500 italic font-archivo italic">{badge.desc}</p>
                    <div className="bg-black text-white px-4 py-1.5 rounded-full inline-block mt-4 text-[10px] font-black uppercase tracking-widest italic italic font-archivo italic">
                        Unlocked {badge.date}
                    </div>
                </div>
                <button onClick={onShare} className="neo-button w-full h-[64px] bg-[#FFE500] flex items-center justify-center gap-3 text-sm tracking-widest italic font-black uppercase italic italic italic font-archivo italic shadow-[4px_4px_0_0_#000]">
                    Share on X <Share2 size={18} />
                </button>
            </div>
        </OverlayWrapper>
    );
}

function ShareXOverlay({ onClose }: any) {
    const [style, setStyle] = useState('YELLOW');
    const [showBalance, setShowBalance] = useState(true);
    const [showWallet, setShowWallet] = useState(false);

    return (
        <OverlayWrapper title="Share to X" onClose={onClose} bgColor={style === 'BLACK' ? '#121212' : '#F5F0E8'}>
            <div className="space-y-10 pb-20 animate-in fade-in duration-500 text-left font-archivo italic">
                <div className={cn(
                    "neo-card neo-shadow aspect-square w-full flex flex-col justify-between p-8 relative overflow-hidden transition-colors duration-500 font-archivo italic",
                    style === 'YELLOW' && "bg-[#FFE500]",
                    style === 'BLACK' && "bg-black text-white border-white neo-shadow-white",
                    style === 'WHITE' && "bg-white"
                )}>
                    <div className="flex justify-between items-start font-archivo italic">
                         <span className="text-2xl font-black uppercase tracking-tighter italic italic italic leading-none font-archivo italic">VAULTA</span>
                         <Globe size={24} strokeWidth={3} />
                    </div>
                    
                    <div className="space-y-2 text-center font-archivo italic">
                        <h2 className="text-6xl font-black uppercase tracking-tighter italic italic italic leading-none italic font-archivo italic">🔥 14 WEEK STREAK</h2>
                        <p className="text-sm font-black uppercase tracking-[2px] opacity-60 italic italic font-archivo italic">Earning 8.6% APY on Base</p>
                        {showBalance && <p className="text-2xl font-black italic font-archivo italic">$1,247.83 Saved</p>}
                    </div>

                    <div className="flex justify-between items-end font-archivo italic">
                        <span className="text-[10px] font-black uppercase tracking-widest italic italic font-mono font-archivo italic">
                            {showWallet ? '0x3f...9a2c' : 'vaulta.xyz'}
                        </span>
                        <div className="flex items-center gap-2 font-archivo italic">
                             <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                             <span className="text-[8px] font-black uppercase tracking-widest italic italic font-archivo italic">Base Network</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-6 font-archivo italic">
                    <div className="space-y-3 font-archivo italic">
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic italic leading-none italic font-archivo italic">Card Style</p>
                        <div className="grid grid-cols-3 gap-2 font-archivo italic">
                            {['YELLOW', 'BLACK', 'WHITE'].map(s => (
                                <button key={s} onClick={() => setStyle(s)} className={cn("neo-border py-4 text-[10px] font-black uppercase italic italic font-archivo italic", style === s && "bg-[#FFE500] text-black")}>{s}</button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4 font-archivo italic">
                        <div className="flex items-center justify-between text-[10px] font-black uppercase italic italic text-zinc-500 font-archivo italic">
                            <span>Customise</span>
                        </div>
                        <div className="space-y-3 font-archivo italic">
                             <div className="flex items-center justify-between font-archivo italic"><span className="text-[10px] font-black uppercase tracking-widest italic text-zinc-500 italic font-archivo italic">Show Balance</span><BrutalistToggle active={showBalance} onClick={()=>setShowBalance(!showBalance)} /></div>
                             <div className="flex items-center justify-between font-archivo italic"><span className="text-[10px] font-black uppercase tracking-widest italic text-zinc-500 italic font-archivo italic">Show Wallet</span><BrutalistToggle active={showWallet} onClick={()=>setShowWallet(!showWallet)} /></div>
                        </div>
                    </div>

                    <div className="neo-card bg-white/20 p-5 space-y-2 border-dashed border-zinc-400 bg-white font-archivo italic">
                        <p className="text-[8px] font-black uppercase text-zinc-400 italic italic font-archivo italic">Preview Copy</p>
                        <textarea className="w-full bg-transparent border-none outline-none text-xs font-bold uppercase leading-tight italic italic h-24 resize-none font-archivo italic" defaultValue="Just hit a 14-week savings streak on @VAULTAxyz 🔥 Earning 8.6% APY on Base while building my emergency fund. Consistency > everything. #Base #DeFi #VAULTA" />
                        <p className="text-[8px] font-black text-right opacity-30 italic font-archivo italic">187/280</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full font-archivo italic">
                    <button className="neo-button h-[64px] bg-white text-xs tracking-widest italic font-black uppercase italic italic font-archivo italic shadow-[4px_4px_0_0_#000]">Copy Image</button>
                    <button className="neo-button h-[64px] bg-black text-white text-xs tracking-widest italic font-black uppercase flex items-center justify-center gap-3 italic italic font-archivo italic shadow-[4px_4px_0_0_#FFE500]">
                        Post to X <Share2 size={18} />
                    </button>
                </div>
            </div>
        </OverlayWrapper>
    );
}

// --- SUBCOMPONENTS ---

function AllocationRow({ label, percent, color }: any) {
  return (
    <div className="space-y-1.5 text-left font-archivo italic">
      <div className="flex justify-between items-end italic font-archivo">
        <span className="text-[10px] font-black uppercase tracking-widest italic font-archivo italic">{label}</span>
        <span className="text-xs font-black font-mono italic font-archivo italic">{percent}%</span>
      </div>
      <div className="h-6 w-full border-3 border-black bg-white overflow-hidden p-0.5 font-archivo italic">
        <div 
          className="h-full border-r-3 border-black font-archivo italic" 
          style={{ width: `${percent}%`, backgroundColor: color }} 
        />
      </div>
    </div>
  );
}

function GoalCard({ title, target, progress, current, rotate, tag, color = "#FFE500" }: any) {
  return (
    <div className="neo-card neo-shadow space-y-4 bg-white text-left font-archivo italic" style={{ transform: `rotate(${rotate}deg)` }}>
      <div className="flex justify-between items-start font-archivo italic">
        <h4 className="text-xl font-black tracking-tight uppercase leading-none italic italic italic font-archivo italic">{title}</h4>
        <span className={cn("text-[8px] font-black px-2 py-0.5 border-2 border-black rounded-full uppercase font-archivo italic font-archivo italic", tag.includes('USD') ? 'bg-[#C8E6C9]' : 'bg-[#FF4D4D] text-white')}>
          {tag}
        </span>
      </div>
      
      <div className="space-y-2 font-archivo italic text-left">
        <div className="h-8 w-full border-3 border-black bg-zinc-100 overflow-hidden p-0.5 italic text-left font-archivo">
          <div className="h-full border-r-3 border-black font-archivo italic italic font-archivo italic" style={{ width: `${progress}%`, backgroundColor: color }} />
        </div>
        <div className="flex justify-between text-[9px] font-black uppercase tracking-widest italic font-archivo italic italic font-archivo italic">
          <span>{progress}% Complete</span>
          <span>{current} of {target}</span>
        </div>
      </div>

      <div className="pt-2 border-t-2 border-black flex items-center justify-between font-archivo italic text-left font-archivo">
        <span className="text-[10px] font-black uppercase flex items-center gap-1 italic italic italic font-archivo italic">
          <CheckCircle2 size={12} strokeWidth={3} className="text-green-600 font-archivo italic italic font-archivo italic" /> On Track
        </span>
        <span className="text-[8px] text-zinc-400 font-bold uppercase italic italic font-archivo italic italic font-archivo italic">Est. Sep 2026</span>
      </div>
    </div>
  );
}

function MilestoneBadge({ rank, label, unlocked, rotate, locked, onClick }: any) {
  return (
    <div onClick={onClick} className={cn(
      "neo-card flex-shrink-0 w-32 h-32 flex flex-col items-center justify-center gap-2 transition-all font-archivo italic",
      unlocked ? "bg-[#FFE500] neo-shadow hover:scale-105 cursor-pointer active:scale-95" : "bg-white border-dashed opacity-40 grayscale font-archivo italic"
    )} style={{ transform: `rotate(${rotate}deg)` }}>
      <span className="text-3xl font-archivo italic font-archivo italic">{rank}</span>
      <span className="text-[9px] font-black uppercase tracking-widest text-center italic font-archivo italic font-archivo italic">{label}</span>
      {unlocked ? (
        <div className="bg-black text-white text-[7px] font-black px-1.5 py-0.5 rounded-full uppercase italic font-archivo italic font-archivo italic">Unlocked</div>
      ) : (
        <div className="text-[7px] font-black uppercase opacity-60 italic font-archivo italic font-archivo italic">Locked</div>
      )}
    </div>
  );
}

function YieldInfoCard({ title, badge, text, color }: any) {
  return (
    <div className="neo-card neo-shadow p-6 space-y-3 relative group overflow-hidden bg-white text-left font-archivo italic">
      <div className="flex justify-between items-start font-archivo italic">
        <h4 className="text-lg font-black tracking-tight uppercase leading-none italic font-archivo italic italic">{title}</h4>
        <span className="text-[8px] font-black px-2 py-0.5 border-2 border-black rounded-full uppercase italic italic font-archivo italic font-archivo italic" style={{ backgroundColor: color }}>
          {badge}
        </span>
      </div>
      <p className="text-xs font-bold text-zinc-500 uppercase leading-relaxed tracking-tight italic italic italic font-archivo italic font-archivo italic">{text}</p>
      <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-10 transition-opacity font-archivo italic font-archivo italic">
        <TrendingUp size={48} strokeWidth={3} />
      </div>
    </div>
  );
}

function GiftCard({ name, wallet, amount, since, color = "#FFFFFF" }: any) {
    return (
        <div className="neo-card neo-shadow p-6 space-y-6 text-left font-archivo italic" style={{ backgroundColor: color }}>
            <div className="flex items-center justify-between font-archivo italic">
                <div className="flex items-center gap-4 font-archivo italic">
                    <div className="w-10 h-10 bg-[#FFE500] neo-border font-archivo italic" />
                    <div className="w-6 h-6 border-b-4 border-r-4 border-black rotate-[-45deg] mt-1 font-archivo italic" />
                    <div className="w-10 h-10 bg-[#FF4D4D] neo-border font-archivo italic" />
                </div>
                <div className="text-right font-archivo italic">
                    <p className="text-sm font-black uppercase italic italic italic leading-none font-archivo italic italic italic">{name}</p>
                    <p className="text-[9px] font-mono font-bold text-zinc-400 mt-1 font-archivo italic italic font-archivo italic">{wallet}</p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 font-archivo italic">
                <div className="neo-border p-3 text-center font-archivo italic">
                    <p className="text-[7px] font-black uppercase text-zinc-400 tracking-widest mb-1 italic italic font-archivo italic font-archivo italic">Sending</p>
                    <p className="text-sm font-black uppercase italic italic italic font-archivo italic font-archivo italic">{amount}</p>
                </div>
                <div className="neo-border p-3 text-center font-archivo italic">
                    <p className="text-[7px] font-black uppercase text-zinc-400 tracking-widest mb-1 italic italic font-archivo italic font-archivo italic">Since</p>
                    <p className="text-sm font-black uppercase italic italic italic font-archivo italic font-archivo italic">{since}</p>
                </div>
            </div>
            <div className="flex justify-between items-center pt-2 font-archivo italic">
                <span className={cn("text-[9px] font-black px-3 py-1 rounded-full border-2 border-black uppercase tracking-widest italic italic font-archivo italic font-archivo italic", color === "#FFFFFF" ? "bg-[#FF4D4D] text-white" : "bg-black text-white")}>Active</span>
                <button className="text-[9px] font-black uppercase tracking-widest text-zinc-400 underline underline-offset-4 italic italic font-archivo italic font-archivo italic">Cancel</button>
            </div>
        </div>
    );
}

function SubscriptionCard({ name, amount, next, wallet, progress, status, color, atRisk }: any) {
    return (
        <div className="neo-card neo-shadow p-5 space-y-4 bg-white text-left font-archivo italic">
            <div className="flex justify-between items-start font-archivo italic">
                <h4 className="text-lg font-black italic tracking-tighter italic italic uppercase italic font-archivo italic">{name}</h4>
                <span className={cn(
                    "text-[8px] font-black px-2 py-1 border-2 border-black rounded-full uppercase italic font-archivo italic",
                    atRisk ? "border-dashed bg-[#FF4D4D]/10 text-[#FF4D4D]" : `bg-[${color}]`
                )}>{status}</span>
            </div>
            {!atRisk ? (
                <>
                    <div className="flex justify-between items-end italic font-archivo italic">
                        <p className="text-2xl font-black italic italic tracking-tighter font-archivo italic">{amount}</p>
                        <div className="text-right font-archivo italic">
                            <p className="text-[7px] font-black text-zinc-400 uppercase italic italic font-archivo italic">From Yield</p>
                            <p className="text-[8px] font-black uppercase italic italic font-archivo italic">yoUSD Vault</p>
                        </div>
                    </div>
                    <div className="space-y-2 font-archivo italic">
                        <p className="text-[8px] font-black text-zinc-400 uppercase italic font-archivo italic">Next: {next}</p>
                        <div className="h-2 w-full bg-zinc-100 neo-border p-0.5 font-archivo italic">
                            <div className="h-full bg-[#FFE500] font-archivo italic" style={{ width: `${progress}%` }} />
                        </div>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-black/5 italic font-archivo italic">
                        <span className="text-[8px] font-mono font-bold text-zinc-400 italic font-archivo italic">RECIPIENT: {wallet}</span>
                        <button className="text-[8px] font-black uppercase underline italic font-archivo italic">Edit</button>
                    </div>
                </>
            ) : (
                <div className="bg-[#FF4D4D]/10 p-3 neo-border border-[#FF4D4D] text-center font-archivo italic">
                    <p className="text-[9px] font-black text-[#FF4D4D] uppercase italic italic font-archivo italic">Yield running low — top up or reduce subscriptions</p>
                </div>
            )}
        </div>
    );
}

function RoundUpRow({ title, amount, time }: any) {
    return (
        <div className="neo-card bg-white p-4 flex justify-between items-center hover:translate-x-1 transition-all">
            <span className="text-xs font-black uppercase italic">{title}</span>
            <div className="text-right">
                <p className="text-sm font-black text-[#FFE500] italic leading-none shadow-[2px_2px_0_0_#000] px-1 bg-black inline-block">{amount}</p>
                <p className="text-[8px] font-bold text-zinc-400 uppercase mt-1 italic">{time}</p>
            </div>
        </div>
    );
}

function ScoreRow({ label, score, progress, color, desc }: any) {
    return (
        <div className="neo-card bg-white p-5 space-y-3 relative overflow-hidden" style={{ borderLeftWidth: '8px', borderLeftColor: color }}>
            <div className="flex justify-between items-end">
                <span className="text-xs font-black uppercase italic">{label}</span>
                <span className="text-sm font-black font-mono">{score}</span>
            </div>
            <div className="h-3 w-full bg-zinc-100 neo-border p-0.5">
                <div className="h-full" style={{ width: `${progress}%`, backgroundColor: color }} />
            </div>
            <p className="text-[8px] font-bold uppercase text-zinc-400 italic">{desc}</p>
        </div>
    );
}

function PerkCard({ status, label, color, rotate, dashed }: any) {
    return (
        <div className={cn(
            "neo-card flex-shrink-0 w-36 h-36 flex flex-col justify-between p-4 transition-all",
            dashed && "border-dashed opacity-50",
        )} style={{ backgroundColor: color, transform: `rotate(${rotate}deg)` }}>
            <span className="text-[8px] font-black uppercase tracking-widest opacity-60 italic">{status}</span>
            <p className="text-[10px] font-black uppercase leading-tight italic">{label}</p>
        </div>
    );
}

function ChallengeResult({ label, vs, date, prize, color }: any) {
    return (
        <div className="neo-card neo-shadow p-5 flex justify-between items-center" style={{ backgroundColor: color }}>
            <div className="space-y-1">
                <h4 className="text-lg font-black uppercase italic leading-none">{label}</h4>
                <p className="text-[10px] font-bold uppercase opacity-60">{vs} • {date}</p>
            </div>
            <div className="text-right">
                <p className="text-[9px] font-black uppercase tracking-widest opacity-40">Reward</p>
                <p className="text-sm font-black italic">{prize}</p>
            </div>
        </div>
    );
}

function ProfileStat({ label, value }: any) {
  return (
    <div className="neo-card neo-shadow p-4 space-y-1 bg-white text-left font-archivo italic">
      <p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest leading-none italic font-archivo italic font-archivo italic">{label}</p>
      <p className="text-xl font-black italic tracking-tighter leading-none italic italic italic italic font-archivo italic font-archivo italic">{value}</p>
    </div>
  );
}

function ToggleRow({ label, active }: any) {
    const [isOn, setIsOn] = useState(active);
    return (
        <div className="flex items-center justify-between font-archivo italic">
            <span className="text-[10px] font-black uppercase tracking-widest italic text-zinc-500 italic font-archivo italic font-archivo italic">{label}</span>
            <BrutalistToggle active={isOn} onClick={() => setIsOn(!isOn)} />
        </div>
    );
}

function SimpleStat({ label, value }: any) {
    return (
        <div className="neo-card neo-shadow bg-white p-3 text-center space-y-1 font-archivo italic text-left">
            <p className="text-[7px] font-black uppercase text-zinc-400 italic italic leading-none font-archivo italic font-archivo italic">{label}</p>
            <p className="text-[10px] font-black uppercase italic italic italic leading-none italic font-archivo italic font-archivo italic">{value}</p>
        </div>
    );
}
