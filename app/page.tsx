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
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- V2 BASE COMPONENTS ---

function BrutalistToggle({ active, onClick }: { active: boolean; onClick: () => void }) {
    return (
        <button 
            onClick={onClick}
            className={cn(
                "w-[48px] h-[26px] border-2 border-black flex items-center p-[2px] transition-colors duration-200",
                active ? "bg-[#FFE500]" : "bg-white"
            )}
        >
            <motion.div 
                animate={{ x: active ? 22 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="w-[18px] h-[18px] bg-black"
            />
        </button>
    );
}

function SegmentedSelector({ options, selected, onSelect }: { options: string[], selected: string, onSelect: (val: string) => void }) {
    return (
        <div className="flex border-2 border-black overflow-hidden h-12">
            {options.map((opt, i) => (
                <button
                    key={opt}
                    onClick={() => onSelect(opt)}
                    className={cn(
                        "flex-1 text-[10px] font-black uppercase tracking-widest transition-colors",
                        i !== 0 && "border-l-2 border-black",
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
            {label && <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic">{label}</p>}
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
                        "w-full h-[56px] border-2 border-black text-sm font-black uppercase outline-none transition-colors placeholder:text-zinc-400",
                        prefix ? "pl-8 pr-4" : "px-4",
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
                            <h3 className="text-3xl font-black tracking-tighter uppercase italic leading-none">{title}</h3>
                            <button onClick={onClose} className="p-1"><XIcon size={24} /></button>
                        </div>
                        <div className="space-y-6 scrollbar-hide overflow-y-auto max-h-[60vh]">
                            {children}
                            <button onClick={onAction} className="neo-button w-full h-[64px] bg-[#FFE500] text-sm font-black tracking-[2px]">{actionLabel}</button>
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
      <div className="flex-1 overflow-y-auto scrollbar-hide pb-24 px-6 pt-8 font-archivo">
        {activeTab === 'Home' && <HomeScreen onDeposit={() => openOverlay('deposit')} onSpendSave={() => openOverlay('spend-save')} />}
        {activeTab === 'Goals' && <GoalsScreen onNewGoal={() => openOverlay('new-goal')} />}
        {activeTab === 'Streaks' && <StreaksScreen onOpenBadge={(badge: any) => { setSelectedBadge(badge); openOverlay('badge-detail'); }} onOpenGallery={() => openOverlay('gallery')} />}
        {activeTab === 'Yield' && <YieldScreen />}
        {activeTab === 'Profile' && <ProfileScreen onOpenGifts={() => openOverlay('gifts')} onOpenWill={() => openOverlay('will')} onOpenSubs={() => openOverlay('subs')} onOpenRoundups={() => openOverlay('roundups')} />}
      </div>

      {/* Overlays */}
      <AnimatePresence>
        {overlay === 'gifts' && <YieldGiftingOverlay onClose={closeOverlay} />}
        {overlay === 'will' && <SavingsWillOverlay onClose={closeOverlay} />}
        {overlay === 'deposit' && <DepositFlowOverlay onClose={closeOverlay} onShare={() => openOverlay('share')} />}
        {overlay === 'new-goal' && <GoalCreationOverlay onClose={closeOverlay} />}
        {overlay === 'gallery' && <BadgeGalleryOverlay onClose={closeOverlay} onOpenBadge={(badge: any) => { setSelectedBadge(badge); openOverlay('badge-detail'); }} />}
        {overlay === 'badge-detail' && <BadgeDetailOverlay badge={selectedBadge} onClose={() => openOverlay('gallery')} onShare={() => openOverlay('share')} />}
        {overlay === 'share' && <ShareXOverlay onClose={closeOverlay} />}
        {overlay === 'subs' && <YieldSubscriptionsOverlay onClose={closeOverlay} />}
        {overlay === 'spend-save' && <SpendSaveOverlay onClose={closeOverlay} />}
        {overlay === 'roundups' && <RoundUpSavingsOverlay onClose={closeOverlay} />}
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
                    <h1 className="text-4xl font-black tracking-tighter uppercase leading-none italic">{title}</h1>
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
        <p className="text-zinc-500 text-[10px] font-black tracking-widest uppercase">Total Savings</p>
        <h2 className="text-[52px] font-black leading-none tracking-tighter italic">$1,247.83</h2>
        <div className="flex items-center gap-3">
          <p className="text-[#FF4D4D] font-black text-sm flex items-center gap-0.5 uppercase tracking-tighter italic">
            <ArrowUp size={14} strokeWidth={4} /> $8.42 this week
          </p>
          <span className="bg-[#FFE500] px-3 py-1 rounded-full border-2 border-black text-[9px] font-black tracking-[2px] uppercase">🔥 On Track</span>
        </div>
      </section>

      <div onClick={onSpendSave} className="neo-card neo-shadow bg-[#FFE500] p-6 flex justify-between items-center cursor-pointer active:scale-[0.98] transition-all rotate-[-1deg]">
        <div className="space-y-1">
            <h4 className="text-xl font-black uppercase italic tracking-tighter">Spend & Save</h4>
            <p className="text-[9px] font-bold uppercase opacity-60">Unlock $800. Yield repays it.</p>
        </div>
        <div className="bg-black text-[#FFE500] px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest italic">Zero Interest</div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="neo-card neo-shadow space-y-1">
          <p className="text-[9px] text-zinc-500 font-black uppercase tracking-widest leading-none italic">Current APY</p>
          <p className="text-3xl font-black italic tracking-tighter leading-none">8.6%</p>
        </div>
        <div className="neo-card neo-shadow space-y-1">
          <p className="text-[9px] text-zinc-500 font-black uppercase tracking-widest leading-none italic">Yield Earned</p>
          <p className="text-3xl font-black italic tracking-tighter leading-none">$23.41</p>
        </div>
      </div>

      <section className="space-y-4">
        <h3 className="text-sm font-black uppercase tracking-[3px] inline-block border-b-3 border-black pb-1 italic">Your Vault</h3>
        <div className="neo-card neo-shadow space-y-6 bg-white">
          <AllocationRow label="Morpho" percent={42} color="#FFE500" />
          <AllocationRow label="Pendle" percent={31} color="#FF4D4D" />
          <AllocationRow label="Tokemak" percent={27} color="#C8E6C9" />
        </div>
      </section>

      <button onClick={onDeposit} className="neo-button w-full h-[56px] bg-[#FFE500] text-sm tracking-widest font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all italic">
        Deposit
      </button>
    </div>
  );
}

function GoalsScreen({ onNewGoal }: any) {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 text-left">
      <h1 className="text-4xl font-black tracking-tighter uppercase leading-none italic">My Goals</h1>
      
      <div className="space-y-6">
        <GoalCard title="Emergency Fund" target="$5,000" progress={34} current="$1,700" rotate="-1" tag="yoUSD VAULT" />
        <GoalCard title="ETH Stack" target="2 ETH" progress={12} current="0.24 ETH" rotate="1" tag="yoETH VAULT" color="#FF4D4D" />
      </div>

      <button onClick={onNewGoal} className="neo-button w-full h-[56px] bg-black text-white flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_#FFE500] italic">
        <Plus size={20} strokeWidth={3} /> New Goal
      </button>
    </div>
  );
}

function StreaksScreen({ onOpenBadge, onOpenGallery }: any) {
  return (
    <div className="space-y-10 animate-in zoom-in-95 duration-500 text-left">
      <h1 className="text-4xl font-black tracking-tighter uppercase leading-none italic">Your Streak</h1>
      <div onClick={onOpenGallery} className="bg-[#FFE500] neo-border neo-shadow p-10 text-center space-y-2 rotate-[-1deg] cursor-pointer active:scale-95 transition-transform">
        <span className="text-7xl block mb-2">🔥</span>
        <h2 className="text-[96px] font-black leading-[0.8] tracking-tighter italic">14</h2>
        <p className="text-xl font-black uppercase tracking-[4px] italic">Weeks Straight</p>
      </div>
      <section className="space-y-6">
        <h3 className="text-sm font-black uppercase tracking-[3px] border-b-3 border-black pb-1 inline-block italic">Milestones</h3>
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide">
          <MilestoneBadge rank="🥉" label="4 WEEKS" unlocked rotate="1" onClick={() => onOpenBadge({rank: '🥉', name: 'Starter', desc: '4 Weeks of saving straight', date: 'Jan 2026'})} />
          <MilestoneBadge rank="🥈" label="8 WEEKS" unlocked rotate="-1" onClick={() => onOpenBadge({rank: '🥈', name: 'Consistent', desc: '8 Weeks of saving straight', date: 'Feb 2026'})} />
          <MilestoneBadge rank="🥇" label="12 WEEKS" unlocked rotate="2" onClick={() => onOpenBadge({rank: '🥇', name: 'Dedicated', desc: '12 Weeks of saving straight', date: 'Mar 2026'})} />
          <MilestoneBadge rank="💎" label="26 WEEKS" rotate="-2" locked />
          <MilestoneBadge rank="👑" label="52 WEEKS" rotate="1" locked />
        </div>
      </section>
      <section className="space-y-4 text-left">
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
    <div className="space-y-8 animate-in fade-in duration-500 text-left">
      <h1 className="text-4xl font-black tracking-tighter uppercase leading-none italic">Yield Breakdown</h1>
      <div className="bg-black text-[#FFE500] neo-border neo-shadow p-8 text-center space-y-1 italic">
        <p className="text-[10px] font-black uppercase tracking-[3px] opacity-60 text-white italic">Total Yield Earned</p>
        <h2 className="text-6xl font-black tracking-tighter italic italic">$23.41</h2>
        <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500 italic">Since you started saving</p>
      </div>
      <section className="space-y-6">
        <h3 className="text-sm font-black uppercase tracking-[3px] border-b-3 border-black pb-1 inline-block italic">Why is my money here?</h3>
        <div className="space-y-6">
          <YieldInfoCard title="MORPHO — 42%" badge="Highest risk-adjusted yield" text="Lending market. A- risk rating. Earning 14.2% APY. Your biggest allocation." color="#FF4D4D" />
          <YieldInfoCard title="PENDLE — 31%" badge="Fixed-rate arbitrage window" text="Fixed yield locked in at 18.5%. Unusual spike this week — may compress." color="#FFE500" />
          <YieldInfoCard title="TOKEMAK — 27%" badge="Stable base layer" text="Lower yield but highest security score. Balances your overall risk exposure." color="#C8E6C9" />
        </div>
      </section>
      <button className="neo-button w-full h-[56px] bg-black text-[#FFE500] text-sm tracking-widest font-black uppercase italic italic">Simulate Returns</button>
    </div>
  );
}

function ProfileScreen({ onOpenGifts, onOpenWill, onOpenSubs, onOpenRoundups }: any) {
  return (
    <div className="space-y-8 animate-in slide-in-from-top-4 duration-500 text-left">
      <h1 className="text-4xl font-black tracking-tighter uppercase leading-none italic italic">Your Profile</h1>
      <div className="neo-card neo-shadow p-6 flex items-center gap-5 rotate-[1deg] bg-white text-left">
        <div className="w-20 h-20 bg-[#FFE500] neo-border flex items-center justify-center text-2xl font-black">NB</div>
        <div className="space-y-1">
          <p className="text-2xl font-black tracking-tighter font-mono italic text-[#0A0A0A] italic">0x3f...9a2c</p>
          <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500 italic">Vaulta Saver since Jan 2026</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <ProfileStat label="Total Deposited" value="$1,224.42" />
        <ProfileStat label="Total Yield" value="$23.41" />
        <ProfileStat label="Longest Streak" value="14 WKS 🔥" />
        <ProfileStat label="Goals Done" value="1 ✓" />
      </div>
      <section className="space-y-4 text-left">
        <h3 className="text-[10px] font-black uppercase tracking-[3px] border-b-2 border-black pb-1 inline-block italic">Vault Operations</h3>
        <div className="space-y-4">
            <ProfileRow icon={Gift} label="Yield Gifts" badge="NEW" color="#FF4D4D" onClick={onOpenGifts} />
            <ProfileRow icon={CreditCard} label="Yield Subscriptions" badge="AUTOPAY" color="#FFE500" onClick={onOpenSubs} />
            <ProfileRow icon={Skull} label="Dead Man's Switch" onClick={onOpenWill} dashed />
            <ProfileRow icon={RefreshCcw} label="Round-Up Savings" badge="AUTO" color="#FF4D4D" onClick={onOpenRoundups} />
        </div>
      </section>
      <button className="neo-button w-full h-[56px] bg-[#FFE500] flex items-center justify-center gap-3 text-sm tracking-widest font-black uppercase italic">
        <Share2 size={18} strokeWidth={3} /> Share Your Stats
      </button>
    </div>
  );
}

// --- OVERLAY FLOWS ---

function YieldSubscriptionsOverlay({ onClose }: any) {
  const [showSheet, setShowSheet] = useState(false);

  return (
    <OverlayWrapper title="Yield Subs" onClose={onClose}>
        <div className="space-y-8 pb-20 text-left">
            <div className="bg-black text-white neo-border neo-shadow p-6 rotate-[2deg] space-y-2">
                <p className="text-lg font-black uppercase tracking-tighter leading-tight italic">Pay your bills with yield.</p>
                <p className="text-xs font-bold uppercase text-white/60 italic">Lock your principal. Your yield pays recurring transfers automatically. Your savings never shrink.</p>
            </div>

            <section className="space-y-6">
                <SubscriptionCard name="Netflix" amount="$15.99/mo" next="APR 1, 2026" wallet="0x4f...2a1c" progress={75} status="ACTIVE" color="#FF4D4D" />
                <SubscriptionCard name="Gym Membership" amount="$29.00/mo" next="APR 5, 2026" wallet="0x5a...3k2e" progress={40} status="ACTIVE" color="#C8E6C9" />
                <SubscriptionCard name="Spotify" amount="$9.99/mo" status="AT RISK ⚠️" atRisk />
            </section>

            <div className="bg-[#FFE500] neo-border neo-shadow p-6 space-y-4 italic">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-[8px] font-black uppercase opacity-60 italic">Total Autopay</p>
                        <p className="text-lg font-black italic">$54.98/mo</p>
                    </div>
                    <div>
                        <p className="text-[8px] font-black uppercase opacity-60 italic">Yield Generating</p>
                        <p className="text-lg font-black italic">$68.40/mo</p>
                    </div>
                </div>
                <div className="pt-3 border-t-2 border-black/10 flex justify-between items-center">
                    <span className="text-[9px] font-black uppercase italic">Surplus</span>
                    <span className="text-sm font-black text-green-700 italic">+$13.42/mo</span>
                </div>
            </div>

            <button onClick={() => setShowSheet(true)} className="neo-button w-full h-[64px] bg-[#FFE500] text-sm font-black uppercase italic">+ Add Subscription</button>
        </div>

        <BottomSheet isOpen={showSheet} onClose={() => setShowSheet(false)} title="New Yield Sub" actionLabel="Activate Subscription" onAction={() => setShowSheet(false)}>
            <div className="space-y-6 text-left font-archivo">
                <BrutalistInput label="Subscription Name" placeholder="Netflix, Gym, etc." />
                <BrutalistInput label="Amount Per Month" placeholder="0.00" prefix="$" />
                <BrutalistInput label="Recipient Wallet" placeholder="0x... or ENS" />
                <div className="space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic italic">Schedule</p>
                    <SegmentedSelector options={['Weekly', 'Monthly', 'Custom']} selected="Monthly" onSelect={() => {}} />
                </div>
                <div className="neo-card bg-[#C8E6C9] p-5 flex items-center justify-center gap-3">
                    <CheckCircle2 size={18} className="text-green-700" />
                    <span className="text-xs font-black uppercase tracking-tighter italic italic">Your yield can cover this ✓</span>
                </div>
            </div>
        </BottomSheet>
    </OverlayWrapper>
  );
}

function SpendSaveOverlay({ onClose }: any) {
  const [isSetup, setIsSetup] = useState(false);
  const [spendAmount, setSpendAmount] = useState(800);

  return (
    <OverlayWrapper title="Spend & Save" onClose={onClose}>
        {!isSetup ? (
            <div className="space-y-8 pb-20 text-left animate-in fade-in duration-300">
                <div className="bg-[#FFE500] neo-border neo-shadow p-8 rotate-[1deg] space-y-4">
                    <div className="space-y-1">
                        <h2 className="text-4xl font-black italic tracking-tighter uppercase leading-none italic">Spend Now.</h2>
                        <h2 className="text-4xl font-black italic tracking-tighter uppercase leading-none italic">Yield Repays.</h2>
                    </div>
                    <p className="text-xs font-bold uppercase text-black/60 italic leading-relaxed">Deposit $1,000. Spend $800 today. Your remaining $200 earns yield and slowly repays what you spent. No interest. No deadlines. Just time.</p>
                </div>

                <div className="neo-card neo-shadow p-8 bg-white space-y-8">
                    <div className="border-l-4 border-black pl-4">
                        <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400 italic italic">Deposited</p>
                        <p className="text-xl font-black italic italic">$1,000.00</p>
                    </div>
                    <div className="border-l-4 border-[#FFE500] pl-4">
                        <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400 italic italic">Available to Spend</p>
                        <p className="text-xl font-black italic italic text-[#0A0A0A]">$800.00</p>
                    </div>
                    <div className="border-l-4 border-[#C8E6C9] pl-4">
                        <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400 italic italic">Repaid so far</p>
                        <p className="text-xl font-black italic italic text-green-600 font-mono">$43.20</p>
                    </div>
                    
                    <div className="space-y-3">
                        <div className="h-6 w-full bg-zinc-100 neo-border overflow-hidden p-0.5">
                            <div className="h-full bg-black border-r-2 border-black" style={{ width: '4.3%' }} />
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-black uppercase italic italic">
                            <span>4.3% Repaid</span>
                            <span className="text-zinc-400 italic">Fully repaid in ~23 months</span>
                        </div>
                    </div>
                </div>

                <div className="bg-black text-white neo-border neo-shadow p-6 space-y-4 text-left font-mono">
                    <p className="text-[10px] font-black uppercase tracking-[3px] text-zinc-500 italic italic font-archivo">Repayment Projection</p>
                    <div className="space-y-3">
                        <ProjectionStep label="6 Months" value="$215 repaid" />
                        <ProjectionStep label="12 Months" value="$430 repaid" />
                        <ProjectionStep label="23 Months" value="FULLY REPAID ✓" active />
                    </div>
                </div>

                <button className="neo-button w-full h-[64px] bg-black text-[#FFE500] text-sm font-black uppercase italic shadow-[4px_4px_0_0_#FFE500]">Spend $800 Now</button>

                <div className="border-2 border-black border-dashed p-6 space-y-4 italic">
                    <p className="text-xs font-black uppercase italic italic">Want to repay faster?</p>
                    <p className="text-[10px] font-bold uppercase text-zinc-400 italic italic">Add manual deposits to accelerate repayment and unlock your collateral sooner.</p>
                    <button className="neo-button w-full h-[48px] bg-white text-[10px] font-black uppercase italic">Add Deposit</button>
                </div>
            </div>
        ) : (
            <div className="space-y-8 pb-20 animate-in slide-in-from-bottom-8 duration-500 text-left font-archivo">
                <div className="neo-card neo-shadow bg-white space-y-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic">How much to deposit?</p>
                    <input className="text-6xl font-black italic tracking-tighter w-full bg-transparent border-none outline-none leading-none" placeholder="$0" />
                    <div className="grid grid-cols-4 gap-2">
                        {['$500', '$1k', '$2.5k', '$5k'].map(v => (
                            <button key={v} className={cn("neo-border py-2 text-[10px] font-black uppercase italic", v === '$1k' && "bg-[#FFE500]")}>{v}</button>
                        ))}
                    </div>
                </div>

                <div className="neo-card neo-shadow bg-white space-y-6 text-left font-archivo">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic">How much to spend?</p>
                    <div className="space-y-6">
                        <div className="h-4 w-full bg-zinc-200 neo-border relative">
                            <motion.div className="absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-black neo-border cursor-pointer flex items-center justify-center shadow-lg" style={{ left: '80%' }}>
                                <div className="w-1 h-3 bg-[#FFE500]" />
                            </motion.div>
                        </div>
                        <div className="flex justify-between items-center text-xs font-black italic italic">
                            <span className="uppercase tracking-tighter text-lg font-black italic">Spend ${spendAmount}</span>
                            <span className="text-zinc-400 uppercase text-[10px]">Max 80%</span>
                        </div>
                    </div>
                </div>

                <div className="bg-[#C8E6C9] neo-border neo-shadow p-6 space-y-3 italic italic italic text-left">
                    <p className="text-[10px] font-black uppercase italic">Your $200 earns yield</p>
                    <p className="text-sm font-bold uppercase leading-tight italic">Repays $800 in ~23 months at 8.6% APY. Principal always yours.</p>
                </div>

                <button onClick={() => setIsSetup(false)} className="neo-button w-full h-[64px] bg-[#FFE500] text-sm font-black uppercase italic">Activate Spend & Save</button>
            </div>
        )}
    </OverlayWrapper>
  );
}

function RoundUpSavingsOverlay({ onClose }: any) {
  return (
    <OverlayWrapper title="Round-Ups" onClose={onClose}>
        <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-6 opacity-30 grayscale italic text-left">
            <RefreshCcw size={64} strokeWidth={3} />
            <h3 className="text-2xl font-black uppercase tracking-widest text-center italic italic">Round-ups Coming Soon</h3>
        </div>
    </OverlayWrapper>
  );
}

// --- SUBCOMPONENTS ---

function ProfileRow({ icon: Icon, label, badge, color, onClick, dashed }: any) {
    return (
        <div onClick={onClick} className={cn(
            "neo-card neo-shadow p-5 flex justify-between items-center cursor-pointer hover:translate-x-1 transition-all bg-white",
            dashed && "border-dashed"
        )}>
            <div className="flex items-center gap-4">
                <Icon size={20} className={cn(color ? `text-[${color}]` : 'text-black')} />
                <span className="text-sm font-black uppercase tracking-widest italic">{label}</span>
            </div>
            <div className="flex items-center gap-2">
                {badge && <span className={cn("text-[8px] font-black px-2 py-0.5 rounded-full border-2 border-black uppercase italic", color ? `bg-[${color}]` : 'bg-zinc-100')}>{badge}</span>}
                <ChevronRight size={18} strokeWidth={3} />
            </div>
        </div>
    );
}

function SubscriptionCard({ name, amount, next, wallet, progress, status, color, atRisk }: any) {
    return (
        <div className="neo-card neo-shadow p-5 space-y-4 bg-white text-left font-archivo">
            <div className="flex justify-between items-start">
                <h4 className="text-lg font-black italic tracking-tighter italic italic uppercase italic">{name}</h4>
                <span className={cn(
                    "text-[8px] font-black px-2 py-1 border-2 border-black rounded-full uppercase italic",
                    atRisk ? "border-dashed bg-[#FF4D4D]/10 text-[#FF4D4D]" : `bg-[${color}]`
                )}>{status}</span>
            </div>
            {!atRisk ? (
                <>
                    <div className="flex justify-between items-end italic">
                        <p className="text-2xl font-black italic italic tracking-tighter">{amount}</p>
                        <div className="text-right">
                            <p className="text-[7px] font-black text-zinc-400 uppercase italic italic">From Yield</p>
                            <p className="text-[8px] font-black uppercase italic italic">yoUSD Vault</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <p className="text-[8px] font-black text-zinc-400 uppercase italic">Next: {next}</p>
                        <div className="h-2 w-full bg-zinc-100 neo-border p-0.5">
                            <div className="h-full bg-[#FFE500]" style={{ width: `${progress}%` }} />
                        </div>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-black/5 italic">
                        <span className="text-[8px] font-mono font-bold text-zinc-400 italic">RECIPIENT: {wallet}</span>
                        <button className="text-[8px] font-black uppercase underline italic">Edit</button>
                    </div>
                </>
            ) : (
                <div className="bg-[#FF4D4D]/10 p-3 neo-border border-[#FF4D4D] text-center">
                    <p className="text-[9px] font-black text-[#FF4D4D] uppercase italic italic">Yield running low — top up or reduce subscriptions</p>
                </div>
            )}
        </div>
    );
}

function ProjectionStep({ label, value, active }: any) {
    return (
        <div className={cn("flex justify-between items-center border-l-3 pl-3", active ? "border-[#FFE500] text-white" : "border-zinc-800 text-zinc-500")}>
            <span className="text-[10px] font-black uppercase italic italic">{label}</span>
            <span className="text-xs font-black italic italic uppercase tracking-tighter italic">{value}</span>
        </div>
    );
}

function AllocationRow({ label, percent, color }: any) {
  return (
    <div className="space-y-1.5 text-left">
      <div className="flex justify-between items-end italic">
        <span className="text-[10px] font-black uppercase tracking-widest italic">{label}</span>
        <span className="text-xs font-black font-mono italic">{percent}%</span>
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
        <h4 className="text-xl font-black tracking-tight uppercase leading-none italic italic">{title}</h4>
        <span className={cn("text-[8px] font-black px-2 py-0.5 border-2 border-black rounded-full uppercase font-archivo italic", tag.includes('USD') ? 'bg-[#C8E6C9]' : 'bg-[#FF4D4D] text-white')}>
          {tag}
        </span>
      </div>
      
      <div className="space-y-2 font-archivo italic text-left">
        <div className="h-8 w-full border-3 border-black bg-zinc-100 overflow-hidden p-0.5 italic text-left">
          <div className="h-full border-r-3 border-black font-archivo italic italic" style={{ width: `${progress}%`, backgroundColor: color }} />
        </div>
        <div className="flex justify-between text-[9px] font-black uppercase tracking-widest italic font-archivo italic italic">
          <span>{progress}% Complete</span>
          <span>{current} of {target}</span>
        </div>
      </div>

      <div className="pt-2 border-t-2 border-black flex items-center justify-between font-archivo italic text-left">
        <span className="text-[10px] font-black uppercase flex items-center gap-1 italic italic italic">
          <CheckCircle2 size={12} strokeWidth={3} className="text-green-600 font-archivo italic italic" /> On Track
        </span>
        <span className="text-[8px] text-zinc-400 font-bold uppercase italic italic font-archivo italic italic">Est. Sep 2026</span>
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
      <span className="text-3xl font-archivo italic">{rank}</span>
      <span className="text-[9px] font-black uppercase tracking-widest text-center italic font-archivo italic">{label}</span>
      {unlocked ? (
        <div className="bg-black text-white text-[7px] font-black px-1.5 py-0.5 rounded-full uppercase italic font-archivo italic">Unlocked</div>
      ) : (
        <div className="text-[7px] font-black uppercase opacity-60 italic font-archivo italic">Locked</div>
      )}
    </div>
  );
}

function YieldInfoCard({ title, badge, text, color }: any) {
  return (
    <div className="neo-card neo-shadow p-6 space-y-3 relative group overflow-hidden bg-white text-left font-archivo italic">
      <div className="flex justify-between items-start font-archivo italic">
        <h4 className="text-lg font-black tracking-tight uppercase leading-none italic font-archivo italic">{title}</h4>
        <span className="text-[8px] font-black px-2 py-0.5 border-2 border-black rounded-full uppercase italic italic font-archivo italic" style={{ backgroundColor: color }}>
          {badge}
        </span>
      </div>
      <p className="text-xs font-bold text-zinc-500 uppercase leading-relaxed tracking-tight italic italic italic font-archivo italic">{text}</p>
      <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-10 transition-opacity font-archivo italic">
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
                    <p className="text-sm font-black uppercase italic italic italic leading-none font-archivo italic italic">{name}</p>
                    <p className="text-[9px] font-mono font-bold text-zinc-400 mt-1 font-archivo italic italic">{wallet}</p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 font-archivo italic">
                <div className="neo-border p-3 text-center font-archivo italic">
                    <p className="text-[7px] font-black uppercase text-zinc-400 tracking-widest mb-1 italic italic font-archivo italic">Sending</p>
                    <p className="text-sm font-black uppercase italic italic italic font-archivo italic">{amount}</p>
                </div>
                <div className="neo-border p-3 text-center font-archivo italic">
                    <p className="text-[7px] font-black uppercase text-zinc-400 tracking-widest mb-1 italic italic font-archivo italic">Since</p>
                    <p className="text-sm font-black uppercase italic italic italic font-archivo italic">{since}</p>
                </div>
            </div>
            <div className="flex justify-between items-center pt-2 font-archivo italic">
                <span className={cn("text-[9px] font-black px-3 py-1 rounded-full border-2 border-black uppercase tracking-widest italic italic font-archivo italic", color === "#FFFFFF" ? "bg-[#FF4D4D] text-white" : "bg-black text-white")}>Active</span>
                <button className="text-[9px] font-black uppercase tracking-widest text-zinc-400 underline underline-offset-4 italic italic font-archivo italic">Cancel</button>
            </div>
        </div>
    );
}

function ProfileStat({ label, value }: any) {
  return (
    <div className="neo-card neo-shadow p-4 space-y-1 bg-white text-left font-archivo italic">
      <p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest leading-none italic italic font-archivo italic">{label}</p>
      <p className="text-xl font-black italic tracking-tighter leading-none italic italic italic italic font-archivo italic">{value}</p>
    </div>
  );
}

function ToggleRow({ label, active }: any) {
    const [isOn, setIsOn] = useState(active);
    return (
        <div className="flex items-center justify-between font-archivo italic">
            <span className="text-[10px] font-black uppercase tracking-widest italic text-zinc-500 italic font-archivo italic">{label}</span>
            <BrutalistToggle active={isOn} onClick={() => setIsOn(!isOn)} />
        </div>
    );
}

function SimpleStat({ label, value }: any) {
    return (
        <div className="neo-card neo-shadow bg-white p-3 text-center space-y-1 font-archivo italic">
            <p className="text-[7px] font-black uppercase text-zinc-400 italic italic leading-none font-archivo italic">{label}</p>
            <p className="text-[10px] font-black uppercase italic italic italic leading-none italic font-archivo italic">{value}</p>
        </div>
    );
}
