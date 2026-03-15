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
  ZapOff,
  UserPlus,
  Bell,
  Sparkles,
  Copy,
  ChevronUp,
  Calendar,
  HeartHandshake,
  Baby,
  Link as LinkIcon,
  Image as ImageIcon,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- V2/V3/V4 BASE COMPONENTS ---

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

function SegmentedSelector({ options, selected, onSelect, large, recommendedIndex }: { options: string[], selected: string, onSelect: (val: string) => void, large?: boolean, recommendedIndex?: number }) {
    return (
        <div className="space-y-2 w-full">
            <div className={cn("flex border-3 border-black overflow-hidden", large ? "h-14" : "h-12")}>
                {options.map((opt, i) => (
                    <button
                        key={opt}
                        onClick={() => onSelect(opt)}
                        className={cn(
                            "flex-1 text-[10px] font-black uppercase tracking-widest transition-colors font-archivo",
                            i !== 0 && "border-l-3 border-black",
                            selected === opt ? "bg-[#FFE500] text-black" : "bg-white text-zinc-400 hover:text-black"
                        )}
                    >
                        {opt}
                    </button>
                ))}
            </div>
            {recommendedIndex !== undefined && (
                <div className="flex justify-around px-2 font-archivo">
                    {options.map((_, i) => (
                        <div key={i} className="flex-1 flex justify-center">
                            {i === recommendedIndex && (
                                <span className="bg-[#C8E6C9] text-[8px] font-black px-2 py-0.5 border-2 border-black rounded-full uppercase italic animate-bounce font-archivo">Recommended</span>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function BrutalistInput({ placeholder, value, onChange, type = "text", label, prefix, giant }: any) {
    const [isFocused, setIsFocused] = useState(false);
    return (
        <div className="space-y-1.5 text-left w-full font-archivo">
            {label && <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic font-archivo">{label}</p>}
            <div className="relative font-archivo">
                {prefix && <span className={cn("absolute left-4 top-1/2 -translate-y-1/2 font-black", giant ? "text-2xl" : "text-sm")}>{prefix}</span>}
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={placeholder}
                    className={cn(
                        "w-full border-3 border-black px-4 text-sm font-black uppercase outline-none transition-colors placeholder:text-zinc-400 italic font-archivo",
                        prefix ? "pl-12" : "px-4",
                        giant ? "h-24 text-4xl" : "h-[56px]",
                        isFocused ? "bg-[#FFE500]" : "bg-white"
                    )}
                />
            </div>
        </div>
    );
}

// --- SHARED UI ---

function ComingSoonBadge() {
    return (
        <div className="absolute top-2 -right-10 bg-[#FF4D4D] border-2 border-black px-12 py-1 rotate-[15deg] z-[100] shadow-md">
            <span className="text-[10px] font-black uppercase tracking-widest text-white italic font-archivo">Coming Soon</span>
        </div>
    );
}

function OverlayWrapper({ title, onClose, children, bgColor = "#F5F0E8", noHeader = false, rightElement }: any) {
    return (
        <motion.div 
            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute inset-0 z-[60] flex flex-col p-6 pt-8 scrollbar-hide overflow-y-auto font-archivo italic"
            style={{ backgroundColor: bgColor }}
        >
            {!noHeader && (
                <div className="flex justify-between items-center mb-8 font-archivo">
                    <h1 className="text-4xl font-black tracking-tighter uppercase leading-none italic font-archivo">{title}</h1>
                    <div className="flex items-center gap-4">
                        {rightElement}
                        <button onClick={onClose} className="neo-button p-2 bg-white flex items-center justify-center h-10 w-10 italic border-3 border-black neo-shadow-sm font-archivo"><XIcon size={20} /></button>
                    </div>
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

// --- MAIN APP COMPONENT ---

export default function VaultaApp() {
  const [activeTab, setActiveTab] = useState('Home');
  const [overlay, setOverlay] = useState<string | null>(null);
  const [onboarded, setOnboarded] = useState(false);

  const openOverlay = (name: string) => setOverlay(name);
  const closeOverlay = () => setOverlay(null);

  if (!onboarded) {
      return <OnboardingOverlay onFinish={() => setOnboarded(true)} />;
  }

  return (
    <div className="flex flex-col h-full bg-[#F5F0E8] relative overflow-hidden text-left selection:bg-black selection:text-white font-archivo italic">
      <div className="flex-1 overflow-y-auto scrollbar-hide pb-24 px-6 pt-8 font-archivo italic">
        {activeTab === 'Home' && <HomeScreen 
            onDeposit={() => openOverlay('deposit')} 
            onSpendSave={() => openOverlay('spend-save')} 
            onOpenROSCA={() => openOverlay('rosca')} 
            onOpenNotifications={() => openOverlay('notifications')} 
            onOpenHistory={() => openOverlay('history')} 
            onOpenMatch={() => openOverlay('match')} 
        />}
        {activeTab === 'Goals' && <GoalsScreen onNewGoal={() => openOverlay('new-goal')} />}
        {activeTab === 'Streaks' && <StreaksScreen onOpenGallery={() => openOverlay('gallery')} onOpenChallenges={() => openOverlay('challenges')} onOpenBadge={() => openOverlay('badge-detail')} />}
        {activeTab === 'Yield' && <YieldScreen onWithdraw={() => openOverlay('emergency-withdraw')} onOpenBonds={() => openOverlay('bonds')} />}
        {activeTab === 'Profile' && <ProfileScreen 
            onOpenGifts={() => openOverlay('gifts')} 
            onOpenWill={() => openOverlay('will')} 
            onOpenSubs={() => openOverlay('subs')} 
            onOpenRoundups={() => openOverlay('roundups')} 
            onOpenScore={() => openOverlay('score')}
            onOpenHistory={() => openOverlay('history')}
            onOpenAllowance={() => openOverlay('allowance')}
            onOpenFamily={() => openOverlay('family')}
            onOpenSettings={() => openOverlay('settings')}
            onOpenInvite={() => openOverlay('invite')}
        />}
      </div>

      <AnimatePresence>
        {overlay === 'gifts' && <YieldGiftingOverlay onClose={closeOverlay} />}
        {overlay === 'will' && <SavingsWillOverlay onClose={closeOverlay} />}
        {overlay === 'deposit' && <DepositFlowOverlay onClose={closeOverlay} onShare={() => openOverlay('share')} />}
        {overlay === 'new-goal' && <GoalCreationOverlay onClose={closeOverlay} onStartSaving={() => openOverlay('deposit')} />}
        {overlay === 'gallery' && <BadgeGalleryOverlay onClose={closeOverlay} onOpenBadge={() => openOverlay('badge-detail')} />}
        {overlay === 'share' && <ShareXOverlay onClose={closeOverlay} />}
        {overlay === 'subs' && <YieldSubscriptionsOverlay onClose={closeOverlay} />}
        {overlay === 'spend-save' && <SpendSaveOverlay onClose={closeOverlay} />}
        {overlay === 'roundups' && <RoundUpSavingsOverlay onClose={closeOverlay} />}
        {overlay === 'score' && <SavingsScoreOverlay onClose={closeOverlay} onShare={() => openOverlay('share')} />}
        {overlay === 'challenges' && <ChallengesOverlay onClose={closeOverlay} />}
        {overlay === 'rosca' && <ROSCAOverlay onClose={closeOverlay} />}
        {overlay === 'notifications' && <NotificationsOverlay onClose={closeOverlay} onDeposit={() => openOverlay('deposit')} onShare={() => openOverlay('share')} />}
        {overlay === 'history' && <HistoryOverlay onClose={closeOverlay} />}
        {overlay === 'emergency-withdraw' && <EmergencyWithdrawOverlay onClose={closeOverlay} />}
        {overlay === 'allowance' && <YieldAllowanceOverlay onClose={closeOverlay} />}
        {overlay === 'match' && <SavingsMatchingOverlay onClose={closeOverlay} />}
        {overlay === 'bonds' && <SavingsBondOverlay onClose={closeOverlay} />}
        {overlay === 'family' && <FamilyVaultOverlay onClose={closeOverlay} />}
        {overlay === 'settings' && <SettingsOverlay onClose={closeOverlay} />}
        {overlay === 'invite' && <ReferralOverlay onClose={closeOverlay} />}
        {overlay === 'badge-detail' && <BadgeDetailOverlay badge={{rank: '🥉', name: 'Starter', desc: '4 Weeks of saving straight', date: 'Jan 2026'}} onClose={() => openOverlay('gallery')} onShare={() => openOverlay('share')} />}
      </AnimatePresence>

      <nav className="absolute bottom-0 w-full h-20 bg-white border-t-3 border-black flex items-center justify-around px-2 z-50 font-archivo italic">
        <TabItem icon={HomeIcon} label="Home" active={activeTab === 'Home'} onClick={() => { setActiveTab('Home'); closeOverlay(); }} />
        <TabItem icon={Target} label="Goals" active={activeTab === 'Goals'} onClick={() => { setActiveTab('Goals'); closeOverlay(); }} />
        <TabItem icon={Flame} label="Streaks" active={activeTab === 'Streaks'} onClick={() => { setActiveTab('Streaks'); closeOverlay(); }} />
        <TabItem icon={DollarSign} label="Yield" active={activeTab === 'Yield'} onClick={() => { setActiveTab('Yield'); closeOverlay(); }} />
        <TabItem icon={User} label="Profile" active={activeTab === 'Profile'} onClick={() => { setActiveTab('Profile'); closeOverlay(); }} />
      </nav>
    </div>
  );
}

// --- SCREENS ---

function HomeScreen({ onDeposit, onSpendSave, onOpenROSCA, onOpenNotifications, onOpenHistory, onOpenMatch }: any) {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 text-left italic font-archivo">
      <div className="flex justify-between items-start">
        <section className="space-y-1 text-left italic">
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest italic">Total Savings</p>
            <h2 className="text-[52px] font-black leading-none tracking-tighter italic font-archivo italic">$1,247.83</h2>
            <div className="flex items-center gap-3">
                <p className="text-[#FF4D4D] font-black text-sm flex items-center gap-0.5 uppercase tracking-tighter italic font-archivo">
                    <ArrowUp size={14} strokeWidth={4} /> $8.42 this week
                </p>
                <span className="bg-[#FFE500] px-3 py-1 rounded-full border-2 border-black text-[9px] font-black tracking-[2px] uppercase font-archivo">🔥 On Track</span>
            </div>
        </section>
        <button onClick={onOpenNotifications} className="neo-button p-2.5 bg-white shadow-[2px_2px_0_0_#000] active:scale-90 transition-transform italic border-3 border-black">
            <Bell size={20} strokeWidth={3} />
        </button>
      </div>

      <div onClick={onSpendSave} className="neo-card neo-shadow bg-[#FFE500] p-6 flex justify-between items-center cursor-pointer active:scale-[0.98] transition-all rotate-[-1deg] text-left">
        <div className="space-y-1">
            <h4 className="text-xl font-black uppercase italic tracking-tighter italic">Spend & Save</h4>
            <p className="text-[9px] font-bold uppercase opacity-60 italic italic">Unlock $800. Yield repays it.</p>
        </div>
        <div className="bg-black text-[#FFE500] px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest italic font-archivo italic">Zero Interest</div>
      </div>

      <div onClick={onOpenHistory} className="neo-card neo-shadow p-5 flex justify-between items-center cursor-pointer bg-white group italic">
        <div className="flex items-center gap-4 italic font-archivo italic">
            <History size={20} />
            <span className="text-sm font-black uppercase italic font-archivo italic">History</span>
        </div>
        <ChevronRight size={18} strokeWidth={3} className="group-hover:translate-x-1 transition-transform italic font-archivo italic" />
      </div>

      <button onClick={onDeposit} className="neo-button w-full h-[56px] bg-[#FFE500] text-sm tracking-widest font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all italic font-archivo italic italic">
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
      <button onClick={onNewGoal} className="neo-button w-full h-[56px] bg-black text-white flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_#FFE500] italic uppercase font-black">
        <Plus size={20} strokeWidth={3} /> New Goal
      </button>
    </div>
  );
}

function StreaksScreen({ onOpenBadge, onOpenGallery, onOpenChallenges }: any) {
  return (
    <div className="space-y-10 animate-in zoom-in-95 duration-500 text-left font-archivo italic">
      <h1 className="text-4xl font-black tracking-tighter uppercase leading-none italic font-archivo">Your Streak</h1>
      <div onClick={onOpenGallery} className="bg-[#FFE500] neo-border neo-shadow p-10 text-center space-y-2 rotate-[-1deg] cursor-pointer active:scale-95 transition-transform font-archivo italic">
        <span className="text-7xl block mb-2 font-archivo">🔥</span>
        <h2 className="text-[96px] font-black leading-[0.8] tracking-tighter italic">14</h2>
        <p className="text-xl font-black uppercase tracking-[4px] italic">Weeks Straight</p>
      </div>
      <ProfileRow icon={Users} label="Savings Challenges" badge="LIVE" color="#FFE500" onClick={onOpenChallenges} />
      <section className="space-y-6 text-left">
        <h3 className="text-sm font-black uppercase tracking-[3px] border-b-3 border-black pb-1 inline-block italic font-archivo">Milestones</h3>
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide italic">
          <MilestoneBadge rank="🥉" label="4 WEEKS" unlocked rotate="1" onClick={onOpenBadge} />
          <MilestoneBadge rank="🥈" label="8 WEEKS" unlocked rotate="-1" onClick={onOpenBadge} />
          <MilestoneBadge rank="🥇" label="12 WEEKS" unlocked rotate="2" onClick={onOpenBadge} />
        </div>
      </section>
    </div>
  );
}

function YieldScreen({ onWithdraw, onOpenBonds }: any) {
    return (
        <div className="space-y-8 animate-in fade-in duration-500 text-left font-archivo italic">
            <h1 className="text-4xl font-black tracking-tighter uppercase leading-none italic font-archivo">Yield Breakdown</h1>
            <div className="bg-black text-[#FFE500] neo-border neo-shadow p-8 text-center italic">
                <p className="text-[10px] font-black uppercase tracking-[3px] opacity-60 text-white italic">Total Yield Earned</p>
                <h2 className="text-6xl font-black tracking-tighter italic">$23.41</h2>
            </div>
            <ProfileRow icon={Star} label="Savings Bonds" badge="ON-CHAIN" color="#FFE500" onClick={onOpenBonds} />
            <button onClick={onWithdraw} className="neo-button w-full h-[56px] bg-[#FF4D4D] text-sm font-black uppercase italic shadow-[4px_4px_0_0_#000] italic">Withdraw Funds</button>
        </div>
    );
}

function ProfileScreen({ onOpenGifts, onOpenWill, onOpenSubs, onOpenRoundups, onOpenScore, onOpenHistory, onOpenAllowance, onOpenFamily, onOpenSettings, onOpenInvite }: any) {
  return (
    <div className="space-y-8 animate-in slide-in-from-top-4 duration-500 text-left font-archivo italic">
      <div className="flex justify-between items-start">
          <h1 className="text-4xl font-black tracking-tighter uppercase leading-none italic">Your Profile</h1>
          <button onClick={onOpenSettings} className="neo-button p-2 bg-white border-3 border-black shadow-[2px_2px_0_0_#000]"><Settings size={20} /></button>
      </div>
      <div className="neo-card neo-shadow p-6 flex items-center gap-5 rotate-[1deg] bg-white text-left italic">
        <div className="w-20 h-20 bg-[#FFE500] neo-border flex items-center justify-center text-2xl font-black font-archivo uppercase italic">NB</div>
        <div className="space-y-1 font-archivo">
          <p className="text-2xl font-black tracking-tighter font-mono italic text-[#0A0A0A]">0x3f...9a2c</p>
          <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500 italic">Saver since Jan 2026</p>
        </div>
      </div>
      <section className="space-y-4 text-left font-archivo italic">
        <h3 className="text-[10px] font-black uppercase tracking-[3px] border-b-2 border-black pb-1 inline-block italic">Vault Operations</h3>
        <div className="space-y-4 italic">
            <ProfileRow icon={Star} label="Savings Score" badge="847" color="#FFE500" onClick={onOpenScore} />
            <ProfileRow icon={Gift} label="Yield Gifts" badge="NEW" color="#FF4D4D" onClick={onOpenGifts} />
            <ProfileRow icon={LogOut} label="Invite Friends" badge="REWARDS" color="#FFE500" onClick={onOpenInvite} />
            <ProfileRow icon={Baby} label="Family Vaults" badge="CUSTODIAL" color="#C8E6C9" onClick={onOpenFamily} />
            <ProfileRow icon={RefreshCcw} label="Round-Up Savings" badge="AUTO" color="#FF4D4D" onClick={onOpenRoundups} />
        </div>
      </section>
    </div>
  );
}

// --- OVERLAYS ---

function OnboardingOverlay({ onFinish }: any) {
    return (
        <div className="absolute inset-0 z-[100] bg-black flex flex-col items-center justify-center p-8 space-y-12 animate-in fade-in duration-500 font-archivo italic italic">
            <h1 className="text-8xl font-black text-[#FFE500] tracking-tighter leading-none italic italic">VAULTA</h1>
            <button onClick={onFinish} className="neo-button w-full h-[72px] bg-[#FFE500] text-lg font-black uppercase tracking-widest italic font-archivo italic italic">Get Started</button>
        </div>
    );
}

function YieldGiftingOverlay({ onClose }: any) { return <OverlayWrapper title="Gifts" onClose={onClose}><div className="p-20 italic">Yield Gifting...</div></OverlayWrapper>; }
function SavingsWillOverlay({ onClose }: any) { return <OverlayWrapper title="Savings Will" onClose={onClose}><div className="p-20 italic">Savings Will...</div></OverlayWrapper>; }
function DepositFlowOverlay({ onClose }: any) { return <OverlayWrapper title="Deposit" onClose={onClose}><div className="p-20 italic">Deposit...</div></OverlayWrapper>; }
function GoalCreationOverlay({ onClose }: any) { return <OverlayWrapper title="New Goal" onClose={onClose}><div className="p-20 italic">Goals...</div></OverlayWrapper>; }
function BadgeGalleryOverlay({ onClose }: any) { return <OverlayWrapper title="Badge Gallery" onClose={onClose}><div className="p-20 italic">Gallery...</div></OverlayWrapper>; }
function ShareXOverlay({ onClose }: any) { return <OverlayWrapper title="Share X" onClose={onClose}><div className="p-20 italic">Share X...</div></OverlayWrapper>; }
function YieldSubscriptionsOverlay({ onClose }: any) { return <OverlayWrapper title="Yield Subs" onClose={onClose}><div className="p-20 italic">Subs...</div></OverlayWrapper>; }
function SpendSaveOverlay({ onClose }: any) { return <OverlayWrapper title="Spend Save" onClose={onClose}><div className="p-20 italic">Spend & Save...</div></OverlayWrapper>; }
function RoundUpSavingsOverlay({ onClose }: any) { return <OverlayWrapper title="Round-Ups" onClose={onClose}><div className="p-20 italic">Round-Ups...</div></OverlayWrapper>; }
function SavingsScoreOverlay({ onClose }: any) { return <OverlayWrapper title="Savings Score" onClose={onClose}><div className="p-20 italic">Savings Score...</div></OverlayWrapper>; }
function ChallengesOverlay({ onClose }: any) { return <OverlayWrapper title="Challenges" onClose={onClose}><div className="p-20 italic">Challenges...</div></OverlayWrapper>; }
function ROSCAOverlay({ onClose }: any) { return <OverlayWrapper title="ROSCA" onClose={onClose}><div className="p-20 italic">ROSCA Teaser...</div></OverlayWrapper>; }
function NotificationsOverlay({ onClose }: any) { return <OverlayWrapper title="Alerts" onClose={onClose}><div className="p-20 italic">Notifications...</div></OverlayWrapper>; }
function HistoryOverlay({ onClose }: any) { return <OverlayWrapper title="History" onClose={onClose}><div className="p-20 italic">History...</div></OverlayWrapper>; }
function YieldAllowanceOverlay({ onClose }: any) { return <OverlayWrapper title="Allowance" onClose={onClose}><div className="p-20 italic">Allowance...</div></OverlayWrapper>; }
function SavingsMatchingOverlay({ onClose }: any) { return <OverlayWrapper title="Match" onClose={onClose}><div className="p-20 italic">Match...</div></OverlayWrapper>; }
function SavingsBondOverlay({ onClose }: any) { return <OverlayWrapper title="Bonds" onClose={onClose}><div className="p-20 italic">Bonds...</div></OverlayWrapper>; }
function FamilyVaultOverlay({ onClose }: any) { return <OverlayWrapper title="Family" onClose={onClose}><div className="p-20 italic">Family...</div></OverlayWrapper>; }
function SettingsOverlay({ onClose }: any) { return <OverlayWrapper title="Settings" onClose={onClose}><div className="p-20 italic">Settings...</div></OverlayWrapper>; }
function ReferralOverlay({ onClose }: any) { return <OverlayWrapper title="Invite" onClose={onClose}><div className="p-20 italic">Invite...</div></OverlayWrapper>; }
function BadgeDetailOverlay({ onClose }: any) { return <OverlayWrapper title="Badge" onClose={onClose}><div className="p-20 italic">Badge...</div></OverlayWrapper>; }

// --- HELPERS ---

function TabItem({ icon: Icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={cn("flex flex-col items-center justify-center flex-1 h-full gap-1 transition-all", active ? "text-black" : "text-zinc-400 font-archivo italic")}>
      <div className={cn("p-1.5 rounded-lg border-2 border-transparent transition-all", active && "bg-[#FFE500] border-black neo-shadow-sm scale-110")}>
        <Icon size={20} strokeWidth={active ? 3 : 2} />
      </div>
      <span className={cn("text-[8px] font-black uppercase tracking-widest italic font-archivo", active && "underline decoration-2 underline-offset-4")}>{label}</span>
    </button>
  );
}

function AllocationRow({ label, percent, color }: any) {
  return (
    <div className="space-y-1.5 text-left font-archivo italic font-archivo italic">
      <div className="flex justify-between items-end italic font-archivo italic">
        <span className="text-[10px] font-black uppercase tracking-widest italic font-archivo">{label}</span>
        <span className="text-xs font-black font-mono italic font-archivo">{percent}%</span>
      </div>
      <div className="h-6 w-full border-3 border-black bg-white overflow-hidden p-0.5 font-archivo italic italic">
        <div className="h-full border-r-3 border-black font-archivo italic italic" style={{ width: `${percent}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

function ProfileStat({ label, value }: any) {
  return (
    <div className="neo-card neo-shadow p-4 space-y-1 bg-white text-left font-archivo italic italic">
      <p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest leading-none italic font-archivo italic">{label}</p>
      <p className="text-xl font-black italic tracking-tighter leading-none italic italic">{value}</p>
    </div>
  );
}

function ProfileRow({ icon: Icon, label, badge, color, onClick, dashed }: any) {
    return (
        <div onClick={onClick} className={cn(
            "neo-card neo-shadow p-5 flex justify-between items-center cursor-pointer hover:translate-x-1 transition-all bg-white font-archivo italic",
            dashed && "border-dashed"
        )}>
            <div className="flex items-center gap-4 font-archivo italic">
                <Icon size={20} className={cn(color ? `text-[${color}]` : 'text-black font-archivo')} />
                <span className="text-sm font-black uppercase tracking-widest italic font-archivo">{label}</span>
            </div>
            <div className="flex items-center gap-2 font-archivo italic">
                {badge && <span className={cn("text-[8px] font-black px-2 py-0.5 rounded-full border-2 border-black uppercase italic font-archivo", color ? `bg-[${color}]` : 'bg-zinc-100 font-archivo')}>{badge}</span>}
                <ChevronRight size={18} strokeWidth={3} />
            </div>
        </div>
    );
}

function GoalCard({ title, target, progress, current, rotate, tag, color = "#FFE500" }: any) {
  return (
    <div className="neo-card neo-shadow space-y-4 bg-white text-left font-archivo italic" style={{ transform: `rotate(${rotate}deg)` }}>
      <div className="flex justify-between font-archivo italic">
        <h4 className="text-xl font-black tracking-tight uppercase leading-none italic">{title}</h4>
        <span className={cn("text-[8px] font-black px-2 py-0.5 border-2 border-black rounded-full uppercase italic", tag.includes('USD') ? 'bg-[#C8E6C9]' : 'bg-[#FF4D4D] text-white')}>{tag}</span>
      </div>
      <div className="h-8 w-full border-3 border-black bg-zinc-100 overflow-hidden p-0.5 italic">
        <div className="h-full border-r-3 border-black font-archivo italic" style={{ width: `${progress}%`, backgroundColor: color }} />
      </div>
      <div className="flex justify-between text-[9px] font-black uppercase tracking-widest italic">
        <span>{progress}% Complete</span>
        <span>{current} of {target}</span>
      </div>
    </div>
  );
}

function MilestoneBadge({ rank, label, unlocked, rotate, locked, onClick }: any) {
  return (
    <div onClick={onClick} className={cn(
      "neo-card flex-shrink-0 w-32 h-32 flex flex-col items-center justify-center gap-2 transition-all font-archivo italic",
      unlocked ? "bg-[#FFE500] neo-shadow hover:scale-105 cursor-pointer active:scale-95 italic" : "bg-white border-dashed opacity-40 grayscale"
    )} style={{ transform: `rotate(${rotate}deg)` }}>
      <span className="text-3xl font-archivo italic">{rank}</span>
      <span className="text-[9px] font-black uppercase tracking-widest text-center italic">{label}</span>
    </div>
  );
}

function YieldInfoCard({ title, badge, text, color }: any) {
  return (
    <div className="neo-card neo-shadow p-6 space-y-3 bg-white text-left font-archivo italic">
      <div className="flex justify-between items-start font-archivo italic">
        <h4 className="text-lg font-black tracking-tight uppercase leading-none italic">{title}</h4>
        <span className={cn("text-[8px] font-black px-2 py-0.5 border-2 border-black rounded-full uppercase italic", `bg-[${color}]`)}>{badge}</span>
      </div>
      <p className="text-xs font-bold text-zinc-500 uppercase leading-relaxed tracking-tight italic">{text}</p>
    </div>
  );
}
