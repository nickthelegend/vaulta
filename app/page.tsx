'use client';

import { useState, useEffect } from 'react';
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
  Settings
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

function BrutalistInput({ placeholder, value, onChange, type = "text", label }: any) {
    const [isFocused, setIsFocused] = useState(false);
    return (
        <div className="space-y-1.5 text-left w-full">
            {label && <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic">{label}</p>}
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={placeholder}
                className={cn(
                    "w-full h-[56px] border-2 border-black px-4 text-sm font-black uppercase outline-none transition-colors placeholder:text-zinc-400",
                    isFocused ? "bg-[#FFE500]" : "bg-white"
                )}
            />
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
                        <div className="space-y-6">
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
        {activeTab === 'Home' && <HomeScreen onDeposit={() => openOverlay('deposit')} />}
        {activeTab === 'Goals' && <GoalsScreen onNewGoal={() => openOverlay('new-goal')} />}
        {activeTab === 'Streaks' && <StreaksScreen onOpenBadge={(badge: any) => { setSelectedBadge(badge); openOverlay('badge-detail'); }} onOpenGallery={() => openOverlay('gallery')} />}
        {activeTab === 'Yield' && <YieldScreen />}
        {activeTab === 'Profile' && <ProfileScreen onOpenGifts={() => openOverlay('gifts')} onOpenWill={() => openOverlay('will')} />}
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
                    <button onClick={onClose} className="neo-button p-2 bg-white"><XIcon size={20} /></button>
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

function HomeScreen({ onDeposit }: any) {
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
        <h3 className="text-sm font-black uppercase tracking-[3px] inline-block border-b-3 border-black pb-1 italic">Your Vault</h3>
        <div className="neo-card neo-shadow space-y-6">
          <AllocationRow label="Morpho" percent={42} color="#FFE500" />
          <AllocationRow label="Pendle" percent={31} color="#FF4D4D" />
          <AllocationRow label="Tokemak" percent={27} color="#C8E6C9" />
        </div>
      </section>

      <button onClick={onDeposit} className="neo-button w-full h-[56px] bg-[#FFE500] text-sm tracking-widest font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
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

      <button onClick={onNewGoal} className="neo-button w-full h-[56px] bg-black text-white flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_#FFE500]">
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
        <p className="text-xl font-black uppercase tracking-[4px]">Weeks Straight</p>
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
      <section className="space-y-4">
        <h3 className="text-sm font-black uppercase tracking-[3px] border-b-3 border-black pb-1 inline-block italic">Streak History</h3>
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
        <h3 className="text-sm font-black uppercase tracking-[3px] border-b-3 border-black pb-1 inline-block italic">Why is my money here?</h3>
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
      <div className="neo-card neo-shadow p-6 flex items-center gap-5 rotate-[1deg] bg-white">
        <div className="w-20 h-20 bg-[#FFE500] neo-border flex items-center justify-center text-2xl font-black">NB</div>
        <div className="space-y-1">
          <p className="text-2xl font-black tracking-tighter font-mono italic text-[#0A0A0A]">0x3f...9a2c</p>
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
        <h3 className="text-[10px] font-black uppercase tracking-[3px] border-b-2 border-black pb-1 inline-block italic">Vault Operations</h3>
        <div className="space-y-4">
            <div onClick={onOpenGifts} className="neo-card neo-shadow p-5 flex justify-between items-center cursor-pointer hover:bg-white hover:translate-x-1 transition-all bg-white">
                <div className="flex items-center gap-4">
                    <Gift size={20} className="text-[#FF4D4D]" />
                    <span className="text-sm font-black uppercase tracking-widest italic">Yield Gifts</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="bg-[#FF4D4D] text-white text-[8px] font-black px-2 py-0.5 rounded-full">NEW</span>
                    <ChevronRight size={18} strokeWidth={3} />
                </div>
            </div>
            <div onClick={onOpenWill} className="neo-card neo-shadow p-5 flex justify-between items-center cursor-pointer hover:bg-white hover:translate-x-1 transition-all border-dashed bg-white">
                <div className="flex items-center gap-4">
                    <Skull size={20} />
                    <span className="text-sm font-black uppercase tracking-widest italic">Dead Man's Switch</span>
                </div>
                <ChevronRight size={18} strokeWidth={3} />
            </div>
        </div>
      </section>
      <button className="neo-button w-full h-[56px] bg-[#FFE500] flex items-center justify-center gap-3 text-sm tracking-widest font-black uppercase">
        <Share2 size={18} strokeWidth={3} /> Share Your Stats
      </button>
    </div>
  );
}

// --- OVERLAY FLOWS ---

function YieldGiftingOverlay({ onClose }: any) {
  const [showSheet, setShowSheet] = useState(false);

  return (
    <OverlayWrapper title="Yield Gifts" onClose={onClose}>
      <div className="space-y-8 pb-20 text-left">
        <div className="bg-[#FFE500] neo-border neo-shadow p-6 rotate-[2deg] space-y-2">
            <p className="text-lg font-black uppercase tracking-tighter leading-tight italic">Send your yield. Keep your money.</p>
            <p className="text-xs font-bold uppercase text-black/60 italic">Your $1,000 stays yours. Your yield goes to whoever you choose. Forever.</p>
        </div>

        <section className="space-y-6">
            <GiftCard name="Mom's Wallet" wallet="0x7a...3f2c" amount="$6.80/mo" since="JAN 2026" />
            <GiftCard name="Save The Ocean 🌊" wallet="0x8b...1e2d" amount="$1.20/mo" since="FEB 2026" color="#C8E6C9" />
        </section>

        <button onClick={() => setShowSheet(true)} className="neo-button w-full h-[56px] bg-[#FFE500] text-sm tracking-widest font-black uppercase">+ New Yield Gift</button>
      </div>

      <BottomSheet 
        isOpen={showSheet} 
        onClose={() => setShowSheet(false)} 
        title="Create Yield Gift"
        actionLabel="Confirm Gift"
        onAction={() => setShowSheet(false)}
      >
        <div className="space-y-6">
            <BrutalistInput placeholder="Recipient Wallet or ENS" label="Recipient" />
            <div className="space-y-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic leading-none">Gift Amount</p>
                <SegmentedSelector 
                    options={['10%', '25%', '50%', 'All']} 
                    selected="25%" 
                    onSelect={() => {}} 
                />
            </div>
            <div className="neo-card bg-[#F5F0E8] p-4 text-center">
                <p className="text-sm font-black uppercase tracking-tighter italic italic">You send ~$3.40/mo <span className="text-zinc-400">at current APY</span></p>
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
        <div className="space-y-10 pb-20 text-left">
            <div className="bg-black text-white neo-border neo-shadow p-6 rotate-[-1deg] space-y-2 text-left">
                <div className="flex items-center gap-3 mb-2">
                    <Skull size={24} className="text-[#FF4D4D]" />
                    <p className="text-xl font-black uppercase tracking-tighter italic italic">If you disappear</p>
                </div>
                <p className="text-xs font-bold uppercase text-white/60 leading-relaxed italic">If you don't interact with Vaulta for your chosen period, your entire savings vault transfers automatically to your beneficiary.</p>
            </div>

            <div className={cn("neo-card neo-shadow p-8 text-center space-y-6 transition-colors duration-500 bg-white", active ? "bg-[#C8E6C9]" : "bg-[#FF4D4D]")}>
                <h2 className="text-7xl font-black tracking-tighter italic italic leading-none">{active ? 'ACTIVE' : 'INACTIVE'}</h2>
                <div className="flex justify-center">
                    <BrutalistToggle active={active} onClick={() => setActive(!active)} />
                </div>
            </div>

            <section className="space-y-6">
                <h3 className="text-sm font-black uppercase tracking-[3px] border-b-3 border-black pb-1 inline-block italic italic">Set up your Will</h3>
                <div className="space-y-4">
                    <BrutalistInput label="Beneficiary Wallet" placeholder="0x... or ENS name" />
                    <div className="space-y-3">
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic">Inactivity Period</p>
                        <SegmentedSelector options={['6 MO', '12 MO', '24 MO']} selected="12 MO" onSelect={() => {}} />
                        <p className="text-[8px] font-bold text-zinc-400 uppercase italic">Last activity: 3 days ago</p>
                    </div>
                    <div className="neo-card neo-shadow p-5 space-y-4 bg-white">
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic leading-none">Trigger Conditions</p>
                        <div className="space-y-4">
                             <div className="flex justify-between items-center"><span className="text-[11px] font-black uppercase italic">No Deposits</span><BrutalistToggle active onClick={()=>{}} /></div>
                             <div className="flex justify-between items-center"><span className="text-[11px] font-black uppercase italic">No Logins</span><BrutalistToggle active onClick={()=>{}} /></div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="neo-border border-dashed p-5 rotate-[1deg] space-y-2 bg-white/50">
                <p className="text-sm font-black uppercase tracking-tight text-[#FF4D4D] flex items-center gap-2 italic italic">
                    <ShieldAlert size={16} /> This is irreversible once triggered
                </p>
                <p className="text-[10px] font-bold uppercase text-zinc-500 italic">Test your setup with a small amount first.</p>
            </div>

            <button className="neo-button w-full h-[64px] bg-black text-[#FFE500] text-sm tracking-widest font-black uppercase italic">Activate Will</button>
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
            <div className="space-y-8 pb-20 animate-in fade-in duration-300 text-left">
                <div className="bg-[#FFE500] neo-border neo-shadow p-10 text-center space-y-4">
                    <div className="relative inline-block">
                        <span className="text-7xl font-black italic tracking-tighter leading-none block italic">${amount}</span>
                        <div className="absolute top-0 -right-4 w-1.5 h-full bg-black animate-pulse" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-black/40 italic italic">USDC on Base</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-black/60 italic italic">Wallet Balance: $847.20 USDC</p>
                    </div>
                </div>

                <div className="grid grid-cols-5 gap-2">
                    {['$10', '$50', '$100', '$500', 'MAX'].map(val => (
                        <button onClick={() => setAmount(val.replace('$',''))} key={val} className={cn("neo-border py-4 text-[10px] font-black uppercase transition-colors hover:bg-[#FFE500]", amount === val.replace('$','') || (val === 'MAX' && amount === '847.20') ? "bg-[#FFE500]" : "bg-white")}>{val}</button>
                    ))}
                </div>

                <div className="space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic italic">Depositing Into</p>
                    <div className="neo-card neo-shadow p-5 flex justify-between items-center cursor-pointer group hover:border-[#FFE500] transition-all bg-white">
                        <div className="flex flex-col">
                            <span className="text-lg font-black uppercase tracking-tight italic italic">yoUSD Vault</span>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="bg-[#FFE500] text-[8px] font-black px-2 py-0.5 rounded-full uppercase border-2 border-black font-archivo">8.6% APY</span>
                            </div>
                        </div>
                        <ChevronDown size={24} strokeWidth={3} className="text-zinc-300 group-hover:text-black transition-colors" />
                    </div>
                </div>

                <div className="neo-card neo-shadow p-6 bg-[#C8E6C9] rotate-[1deg] space-y-4 text-left">
                    <div className="flex justify-between items-center border-b-2 border-black/10 pb-2">
                        <span className="text-[9px] font-black uppercase tracking-[2px] text-black/40 italic italic">At Current APY</span>
                        <TrendingUp size={14} className="text-black/40" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-black uppercase tracking-widest italic italic">In 12 Months: <span className="text-xl">$1,086.00</span></p>
                        <p className="text-[10px] font-bold uppercase text-black/60 italic italic">Yield Earned: $86.00</p>
                    </div>
                </div>

                <button onClick={() => setStep(2)} className="neo-button w-full h-[64px] bg-[#FFE500] text-sm tracking-[2px] font-black uppercase leading-none italic italic">Confirm Deposit ${amount}</button>
            </div>
        )}

        {step === 2 && (
            <div className="flex-1 flex flex-col items-center justify-center space-y-10 animate-in zoom-in-95 duration-500 text-center">
                <div className="w-40 h-40 bg-[#FFE500] neo-border neo-shadow flex items-center justify-center">
                    <CheckCircle2 size={80} strokeWidth={4} />
                </div>
                <div className="space-y-2">
                    <h3 className="text-4xl font-black uppercase tracking-tighter italic italic">Depositing ${amount}</h3>
                    <p className="text-sm font-black uppercase tracking-widest text-zinc-500 italic">Into yoUSD Vault</p>
                </div>
                <div className="w-full max-w-xs space-y-3 px-6">
                    <div className="h-6 w-full bg-black neo-border overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }} 
                            animate={{ width: '60%' }} 
                            className="h-full bg-[#FFE500] border-r-3 border-black font-archivo" 
                        />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest animate-pulse italic italic">Approving USDC...</p>
                </div>
            </div>
        )}

        {step === 3 && (
            <div className="flex-1 flex flex-col items-center justify-center space-y-12 animate-in slide-in-from-bottom-12 duration-500 text-center">
                <div className="space-y-4">
                    <h2 className="text-7xl font-black uppercase tracking-tighter italic italic leading-none">Deposited! 🎉</h2>
                    <div className="bg-[#C8E6C9] neo-border neo-shadow px-6 py-2 rotate-[-1deg] inline-block font-black text-xl italic uppercase tracking-tighter italic">
                        ${amount}.00 → yoUSD
                    </div>
                </div>

                <div className="neo-card neo-shadow p-8 bg-white w-full space-y-4 text-left">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 text-center italic italic">Stats Update</p>
                    <div className="flex justify-between items-end border-b-2 border-black pb-4">
                        <span className="text-sm font-black uppercase italic italic">New Total</span>
                        <span className="text-3xl font-black italic italic">$1,347.83</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-black uppercase italic italic text-green-600">
                        <span>Weekly Streak</span>
                        <span>14 Weeks 🔥</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full">
                    <button onClick={onClose} className="neo-button h-[64px] bg-white text-xs tracking-widest italic font-black uppercase italic">View Vault</button>
                    <button onClick={onShare} className="neo-button h-[64px] bg-[#FFE500] text-xs tracking-widest italic font-black uppercase flex items-center justify-center gap-2 italic">
                        Share on X <Share2 size={18} />
                    </button>
                </div>
            </div>
        )}
    </OverlayWrapper>
  );
}

function GoalCreationOverlay({ onClose }: any) {
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');

    return (
        <OverlayWrapper title="New Goal" onClose={onClose}>
            {step === 1 && (
                <div className="space-y-6 pb-20 animate-in fade-in duration-300 text-left">
                    <div className="bg-[#FFE500] neo-border neo-shadow p-6 space-y-4">
                        <div className="flex justify-between items-start">
                            <p className="text-[10px] font-black uppercase tracking-widest leading-none italic italic">What are you saving for?</p>
                            <span className="text-[9px] font-black text-black/30 font-mono italic italic">{name.length}/30</span>
                        </div>
                        <input 
                            value={name}
                            onChange={(e) => setName(e.target.value.toUpperCase())}
                            className="w-full bg-white neo-border p-5 h-[56px] text-sm font-black uppercase italic outline-none placeholder-zinc-300 focus:bg-[#F5F0E8] transition-colors" 
                            placeholder="EMERGENCY FUND, NEW LAPTOP..." 
                        />
                    </div>

                    <div className="neo-card neo-shadow space-y-4 bg-white">
                        <p className="text-[10px] font-black uppercase tracking-widest leading-none italic italic text-zinc-500">Target Amount</p>
                        <input className="text-6xl font-black italic italic tracking-tighter w-full bg-transparent border-none outline-none leading-none" placeholder="$0" />
                        <SegmentedSelector options={['USDC', 'ETH', 'BTC']} selected="USDC" onSelect={() => {}} />
                    </div>

                    <div className="neo-card neo-shadow space-y-4 bg-white">
                        <p className="text-[10px] font-black uppercase tracking-widest leading-none italic italic text-zinc-500">Target Date</p>
                        <div className="grid grid-cols-2 gap-3 h-[56px]">
                            <div className="neo-border px-4 flex justify-between items-center cursor-pointer bg-[#F5F0E8] shadow-inner">
                                <span className="text-xs font-black italic italic">SEP</span>
                                <ChevronDown size={16} strokeWidth={3} />
                            </div>
                            <div className="neo-border px-4 flex justify-between items-center cursor-pointer bg-[#F5F0E8] shadow-inner">
                                <span className="text-xs font-black italic italic">2026</span>
                                <ChevronDown size={16} strokeWidth={3} />
                            </div>
                        </div>
                    </div>

                    <div className="neo-card neo-shadow bg-[#C8E6C9] p-6 rotate-[2deg] flex items-center gap-6">
                        <div className="flex-1 space-y-1">
                            <p className="text-[8px] font-black uppercase tracking-[2px] text-black/40 italic italic leading-none">Recommended Vault</p>
                            <h4 className="text-2xl font-black italic italic tracking-tighter italic">yoUSD <span className="bg-[#FFE500] text-[8px] px-2 py-0.5 rounded-full border-2 border-black inline-block ml-2 align-middle font-archivo">8.6% APY</span></h4>
                            <p className="text-[9px] font-bold uppercase text-black/60 italic italic tracking-tight">Best for stable savings goals under 24 months</p>
                        </div>
                    </div>

                    <button onClick={() => setStep(2)} className="neo-button w-full h-[64px] bg-[#FFE500] text-sm tracking-widest italic font-black uppercase italic mt-4">Generate Plan</button>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-8 pb-20 animate-in slide-in-from-bottom-8 duration-500 text-left">
                    <div className="bg-black text-white neo-border neo-shadow p-10 space-y-4 text-center">
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/40 italic italic">To hit $5,000 by Sep 2026</p>
                        <h2 className="text-7xl font-black italic italic tracking-tighter text-[#FFE500] italic leading-none">$387/mo</h2>
                        <p className="text-[9px] font-bold uppercase text-white/60 italic italic tracking-widest">Or deposit $3,200 today as lump sum</p>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        <SimpleStat label="APY Risk" value="Low 🟢" />
                        <SimpleStat label="Time" value="8 MO" />
                        <SimpleStat label="Gap" value="$3,300" />
                    </div>

                    <div className="neo-border border-dashed p-6 bg-[#FF4D4D]/10 rotate-[-1deg] space-y-2">
                        <div className="flex items-center gap-2 text-[#FF4D4D] font-black uppercase text-sm tracking-tighter italic italic">
                            <ShieldAlert size={18} /> Tight Timeline
                        </div>
                        <p className="text-xs font-bold uppercase text-zinc-500 leading-tight italic italic">Increase monthly deposit or extend deadline to reduce stress on your portfolio.</p>
                    </div>

                    <button onClick={() => setStep(3)} className="neo-button w-full h-[64px] bg-[#FFE500] text-sm tracking-widest italic font-black uppercase italic">Create Goal</button>
                </div>
            )}

            {step === 3 && (
                <div className="flex-1 flex flex-col items-center justify-center space-y-12 animate-in zoom-in-95 duration-500 text-center">
                    <h2 className="text-5xl font-black uppercase tracking-tighter italic italic leading-none italic">Goal Created! 🎯</h2>
                    <div className="w-full px-6">
                        <GoalCard title={name || "SAVINGS GOAL"} target="$5,000" progress={0} current="$0" rotate="1" tag="yoUSD VAULT" />
                    </div>
                    <button onClick={onClose} className="neo-button w-full h-[64px] bg-[#FFE500] text-sm tracking-widest italic font-black uppercase italic">Start Saving Now</button>
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
            <div className="space-y-8 pb-20 text-left">
                <div className="bg-[#FFE500] neo-border neo-shadow p-10 space-y-4">
                    <div className="flex items-center gap-4">
                        <Flame size={48} strokeWidth={3} />
                        <h3 className="text-3xl font-black uppercase tracking-tighter italic italic italic">14 Week Streak</h3>
                    </div>
                    <div className="space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-widest italic italic leading-none opacity-60 italic">Keep going — 12 weeks to next badge</p>
                        <div className="h-4 w-full bg-black/10 neo-border overflow-hidden">
                            <div className="h-full bg-black border-r-2 border-black font-archivo" style={{ width: '55%' }} />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {badges.map((b, i) => (
                        <div 
                            key={i} 
                            onClick={() => b.unlocked && onOpenBadge(b)}
                            className={cn(
                                "neo-card neo-shadow flex flex-col items-center justify-center p-6 text-center gap-3 transition-all",
                                b.unlocked ? "bg-white cursor-pointer hover:translate-y-[-2px]" : "bg-zinc-100 opacity-40 border-dashed grayscale"
                            )}
                        >
                            <span className={cn("text-4xl")}>{b.rank}</span>
                            <div className="space-y-1">
                                <p className="text-[9px] font-black uppercase tracking-widest leading-none italic">{b.name}</p>
                                <p className="text-[7px] font-black uppercase tracking-widest text-zinc-400 leading-none italic">{b.status}</p>
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
            <div className="flex-1 flex flex-col items-center justify-center space-y-10 py-10 animate-in zoom-in-95 duration-500 text-center">
                <div className="w-64 h-64 bg-[#FFE500] neo-border neo-shadow flex items-center justify-center rotate-[-2deg]">
                    <span className="text-[120px]">{badge.rank}</span>
                </div>
                <div className="space-y-2">
                    <h3 className="text-5xl font-black uppercase tracking-tighter italic italic italic leading-none italic">{badge.name}</h3>
                    <p className="text-sm font-black uppercase tracking-[3px] text-zinc-500 italic">{badge.desc}</p>
                    <div className="bg-black text-white px-4 py-1.5 rounded-full inline-block mt-4 text-[10px] font-black uppercase tracking-widest italic italic">
                        Unlocked {badge.date}
                    </div>
                </div>
                <button onClick={onShare} className="neo-button w-full h-[64px] bg-[#FFE500] flex items-center justify-center gap-3 text-sm tracking-widest italic font-black uppercase italic italic italic">
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
            <div className="space-y-10 pb-20 animate-in fade-in duration-500 text-left">
                <div className={cn(
                    "neo-card neo-shadow aspect-square w-full flex flex-col justify-between p-8 relative overflow-hidden transition-colors duration-500",
                    style === 'YELLOW' && "bg-[#FFE500]",
                    style === 'BLACK' && "bg-black text-white border-white neo-shadow-white",
                    style === 'WHITE' && "bg-white"
                )}>
                    <div className="flex justify-between items-start">
                         <span className="text-2xl font-black uppercase tracking-tighter italic italic italic leading-none">VAULTA</span>
                         <Globe size={24} strokeWidth={3} />
                    </div>
                    
                    <div className="space-y-2 text-center">
                        <h2 className="text-6xl font-black uppercase tracking-tighter italic italic italic leading-none italic">🔥 14 WEEK STREAK</h2>
                        <p className="text-sm font-black uppercase tracking-[2px] opacity-60 italic italic">Earning 8.6% APY on Base</p>
                        {showBalance && <p className="text-2xl font-black italic">$1,247.83 Saved</p>}
                    </div>

                    <div className="flex justify-between items-end">
                        <span className="text-[10px] font-black uppercase tracking-widest italic italic font-mono">
                            {showWallet ? '0x3f...9a2c' : 'vaulta.xyz'}
                        </span>
                        <div className="flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                             <span className="text-[8px] font-black uppercase tracking-widest italic italic font-archivo italic">Base Network</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="space-y-3">
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic italic leading-none italic">Card Style</p>
                        <div className="grid grid-cols-3 gap-2">
                            {['YELLOW', 'BLACK', 'WHITE'].map(s => (
                                <button key={s} onClick={() => setStyle(s)} className={cn("neo-border py-4 text-[10px] font-black uppercase italic italic", style === s && "bg-[#FFE500] text-black")}>{s}</button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between text-[10px] font-black uppercase italic italic text-zinc-500">
                            <span>Customise</span>
                        </div>
                        <div className="space-y-3">
                             <div className="flex items-center justify-between"><span className="text-[10px] font-black uppercase tracking-widest italic text-zinc-500 italic">Show Balance</span><BrutalistToggle active={showBalance} onClick={()=>setShowBalance(!showBalance)} /></div>
                             <div className="flex items-center justify-between"><span className="text-[10px] font-black uppercase tracking-widest italic text-zinc-500 italic">Show Wallet</span><BrutalistToggle active={showWallet} onClick={()=>setShowWallet(!showWallet)} /></div>
                        </div>
                    </div>

                    <div className="neo-card bg-white/20 p-5 space-y-2 border-dashed border-zinc-400 bg-white">
                        <p className="text-[8px] font-black uppercase text-zinc-400 italic italic">Preview Copy</p>
                        <textarea className="w-full bg-transparent border-none outline-none text-xs font-bold uppercase leading-tight italic italic h-24 resize-none" defaultValue="Just hit a 14-week savings streak on @VAULTAxyz 🔥 Earning 8.6% APY on Base while building my emergency fund. Consistency > everything. #Base #DeFi #VAULTA" />
                        <p className="text-[8px] font-black text-right opacity-30 italic">187/280</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full">
                    <button className="neo-button h-[64px] bg-white text-xs tracking-widest italic font-black uppercase italic italic">Copy Image</button>
                    <button className="neo-button h-[64px] bg-black text-white text-xs tracking-widest italic font-black uppercase flex items-center justify-center gap-3 italic italic">
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
    <div className="space-y-1.5 text-left">
      <div className="flex justify-between items-end">
        <span className="text-[10px] font-black uppercase tracking-widest italic italic">{label}</span>
        <span className="text-xs font-black font-mono italic">{percent}%</span>
      </div>
      <div className="h-6 w-full border-3 border-black bg-white overflow-hidden p-0.5">
        <div 
          className="h-full border-r-3 border-black font-archivo" 
          style={{ width: `${percent}%`, backgroundColor: color }} 
        />
      </div>
    </div>
  );
}

function GoalCard({ title, target, progress, current, rotate, tag, color = "#FFE500" }: any) {
  return (
    <div className="neo-card neo-shadow space-y-4 bg-white" style={{ transform: `rotate(${rotate}deg)` }}>
      <div className="flex justify-between items-start">
        <h4 className="text-xl font-black tracking-tight uppercase leading-none italic italic italic">{title}</h4>
        <span className={cn("text-[8px] font-black px-2 py-0.5 border-2 border-black rounded-full uppercase italic", tag.includes('USD') ? 'bg-[#C8E6C9]' : 'bg-[#FF4D4D] text-white')}>
          {tag}
        </span>
      </div>
      
      <div className="space-y-2">
        <div className="h-8 w-full border-3 border-black bg-zinc-100 overflow-hidden p-0.5">
          <div className="h-full border-r-3 border-black font-archivo" style={{ width: `${progress}%`, backgroundColor: color }} />
        </div>
        <div className="flex justify-between text-[9px] font-black uppercase tracking-widest italic italic">
          <span>{progress}% Complete</span>
          <span>{current} of {target}</span>
        </div>
      </div>

      <div className="pt-2 border-t-2 border-black flex items-center justify-between">
        <span className="text-[10px] font-black uppercase flex items-center gap-1 italic italic">
          <CheckCircle2 size={12} strokeWidth={3} className="text-green-600 font-archivo" /> On Track
        </span>
        <span className="text-[8px] text-zinc-400 font-bold uppercase italic italic italic italic">Est. Sep 2026</span>
      </div>
    </div>
  );
}

function MilestoneBadge({ rank, label, unlocked, rotate, locked, onClick }: any) {
  return (
    <div onClick={onClick} className={cn(
      "neo-card flex-shrink-0 w-32 h-32 flex flex-col items-center justify-center gap-2 transition-all",
      unlocked ? "bg-[#FFE500] neo-shadow hover:scale-105 cursor-pointer active:scale-95" : "bg-white border-dashed opacity-40 grayscale"
    )} style={{ transform: `rotate(${rotate}deg)` }}>
      <span className="text-3xl">{rank}</span>
      <span className="text-[9px] font-black uppercase tracking-widest text-center italic italic italic">{label}</span>
      {unlocked ? (
        <div className="bg-black text-white text-[7px] font-black px-1.5 py-0.5 rounded-full uppercase italic italic italic">Unlocked</div>
      ) : (
        <div className="text-[7px] font-black uppercase opacity-60 italic italic italic">Locked</div>
      )}
    </div>
  );
}

function YieldInfoCard({ title, badge, text, color }: any) {
  return (
    <div className="neo-card neo-shadow p-6 space-y-3 relative group overflow-hidden bg-white">
      <div className="flex justify-between items-start font-archivo">
        <h4 className="text-lg font-black tracking-tight uppercase leading-none italic italic">{title}</h4>
        <span className="text-[8px] font-black px-2 py-0.5 border-2 border-black rounded-full uppercase italic italic" style={{ backgroundColor: color }}>
          {badge}
        </span>
      </div>
      <p className="text-xs font-bold text-zinc-500 uppercase leading-relaxed tracking-tight italic italic">{text}</p>
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
                    <p className="text-sm font-black uppercase italic italic italic leading-none">{name}</p>
                    <p className="text-[9px] font-mono font-bold text-zinc-400 mt-1 italic font-archivo italic">{wallet}</p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="neo-border p-3 text-center">
                    <p className="text-[7px] font-black uppercase text-zinc-400 tracking-widest mb-1 italic italic">Sending</p>
                    <p className="text-sm font-black uppercase italic italic italic">{amount}</p>
                </div>
                <div className="neo-border p-3 text-center">
                    <p className="text-[7px] font-black uppercase text-zinc-400 tracking-widest mb-1 italic italic">Since</p>
                    <p className="text-sm font-black uppercase italic italic italic">{since}</p>
                </div>
            </div>
            <div className="flex justify-between items-center pt-2">
                <span className={cn("text-[9px] font-black px-3 py-1 rounded-full border-2 border-black uppercase tracking-widest italic italic", color === "#FFFFFF" ? "bg-[#FF4D4D] text-white" : "bg-black text-white")}>Active</span>
                <button className="text-[9px] font-black uppercase tracking-widest text-zinc-400 underline underline-offset-4 italic italic">Cancel</button>
            </div>
        </div>
    );
}

function ProfileStat({ label, value }: any) {
  return (
    <div className="neo-card neo-shadow p-4 space-y-1 bg-white">
      <p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest leading-none italic italic">{label}</p>
      <p className="text-xl font-black italic tracking-tighter leading-none italic italic italic italic">{value}</p>
    </div>
  );
}

function SimpleStat({ label, value }: any) {
    return (
        <div className="neo-card neo-shadow bg-white p-3 text-center space-y-1">
            <p className="text-[7px] font-black uppercase text-zinc-400 italic italic leading-none">{label}</p>
            <p className="text-[10px] font-black uppercase italic italic italic leading-none italic">{value}</p>
        </div>
    );
}
