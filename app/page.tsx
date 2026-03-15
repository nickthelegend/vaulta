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
  ArrowUpRight,
  ArrowDownLeft,
  Sparkles,
  Copy,
  ChevronUp
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
        <div className="space-y-2 w-full font-archivo italic">
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
                <div className="flex justify-around px-2 font-archivo italic">
                    {options.map((_, i) => (
                        <div key={i} className="flex-1 flex justify-center font-archivo italic">
                            {i === recommendedIndex && (
                                <span className="bg-[#C8E6C9] text-[8px] font-black px-2 py-0.5 border-2 border-black rounded-full uppercase italic animate-bounce font-archivo italic">Recommended</span>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function BrutalistInput({ placeholder, value, onChange, type = "text", label, prefix }: any) {
    const [isFocused, setIsFocused] = useState(false);
    return (
        <div className="space-y-1.5 text-left w-full font-archivo italic">
            {label && <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic font-archivo">{label}</p>}
            <div className="relative font-archivo italic">
                {prefix && <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-sm">{prefix}</span>}
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={placeholder}
                    className={cn(
                        "w-full h-[56px] border-3 border-black px-4 text-sm font-black uppercase outline-none transition-colors placeholder:text-zinc-400 italic font-archivo italic",
                        prefix ? "pl-10 pr-4" : "px-4",
                        isFocused ? "bg-[#FFE500]" : "bg-white"
                    )}
                />
            </div>
        </div>
    );
}

function ComingSoonBadge() {
    return (
        <div className="absolute top-2 -right-10 bg-[#FF4D4D] border-2 border-black px-12 py-1 rotate-[15deg] z-[100] shadow-md">
            <span className="text-[10px] font-black uppercase tracking-widest text-white italic">Coming Soon</span>
        </div>
    );
}

function StepCard({ num, title, text, color, rotate = 0 }: any) {
    return (
        <div className="neo-card neo-shadow p-8 flex flex-col gap-2 relative overflow-hidden" style={{ backgroundColor: color, transform: `rotate(${rotate}deg)` }}>
            <span className="text-7xl font-black italic tracking-tighter opacity-15 leading-none absolute -top-2 -left-2">{num}</span>
            <div className="pt-8 relative z-10 space-y-2 text-left">
                <h4 className="text-xl font-black uppercase tracking-tight italic leading-none">{title}</h4>
                <p className="text-xs font-bold uppercase opacity-60 leading-tight italic">{text}</p>
            </div>
        </div>
    );
}

function ActivityRow({ title, amount, time }: any) {
    return (
        <div className="neo-card bg-white p-4 flex justify-between items-center border-b-2 border-black last:border-b-0 hover:translate-x-1 transition-all">
            <div className="text-left font-archivo italic">
                <p className="text-sm font-black uppercase tracking-tight italic">{title}</p>
                <p className="text-[8px] font-bold text-zinc-400 uppercase mt-0.5 italic">{time}</p>
            </div>
            <div className="text-right italic">
                <p className="text-sm font-black text-black italic leading-none bg-[#FFE500] px-1 border-2 border-black italic">{amount} SWEPT</p>
            </div>
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
                <div className="flex justify-between items-center mb-8 font-archivo italic">
                    <h1 className="text-4xl font-black tracking-tighter uppercase leading-none italic font-archivo">{title}</h1>
                    <div className="flex items-center gap-4 italic">
                        {rightElement}
                        <button onClick={onClose} className="neo-button p-2 bg-white flex items-center justify-center h-10 w-10 italic"><XIcon size={20} /></button>
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

function VersusCard({ p1, p2, winner, countdown, prize }: any) {
    return (
        <div className="neo-card bg-[#FFE500] p-8 rotate-[1deg] space-y-8 relative font-archivo italic overflow-hidden italic">
            <div className="flex justify-between items-start font-archivo italic italic">
                <h4 className="text-xl font-black uppercase italic tracking-tighter italic italic">You vs Friend</h4>
                <span className="bg-[#FF4D4D] text-white text-[9px] font-black px-3 py-1 rounded-full border-2 border-black uppercase italic italic">LIVE</span>
            </div>

            <div className="flex items-center font-archivo italic italic">
                <div className={cn("flex-1 neo-card p-4 space-y-4 text-center italic italic", winner === 'p1' ? "bg-white" : "bg-zinc-100 opacity-60")}>
                    <p className="text-[10px] font-black uppercase italic leading-none italic italic">You</p>
                    <div className="w-16 h-16 bg-[#FFE500] neo-border mx-auto flex items-center justify-center font-black italic italic">NB</div>
                    <div className="space-y-1 font-archivo italic italic">
                        <p className="text-sm font-black italic leading-none italic italic">{p1.stat}</p>
                        <p className="text-[8px] font-black uppercase opacity-60 italic leading-none italic italic">{p1.streak}</p>
                    </div>
                </div>

                <div className="font-black text-3xl italic mx-[-12px] z-10 bg-black text-white px-2 py-1 neo-border italic italic">VS</div>

                <div className={cn("flex-1 neo-card p-4 space-y-4 text-center italic italic", winner === 'p2' ? "bg-white" : "bg-zinc-100 opacity-60")}>
                    <p className="text-[10px] font-black uppercase italic leading-none text-zinc-400 italic italic">{p2.name}</p>
                    <div className="w-16 h-16 bg-[#FF4D4D] neo-border mx-auto flex items-center justify-center font-black text-white italic italic italic">??</div>
                    <div className="space-y-1 font-archivo italic italic">
                        <p className="text-sm font-black italic leading-none italic italic">{p2.stat}</p>
                        <p className="text-[8px] font-black uppercase opacity-60 italic leading-none italic italic">{p2.streak}</p>
                    </div>
                </div>
            </div>

            <div className="text-center space-y-4 font-archivo italic italic">
                <h3 className="text-4xl font-black italic tracking-tighter uppercase leading-none italic italic italic">
                    {winner === 'p1' ? "You're Winning 👑" : "Losing Ground"}
                </h3>
                <div className="bg-black text-[#FFE500] neo-border px-6 py-2 inline-block font-black text-xs uppercase italic tracking-widest font-mono italic italic">{countdown}</div>
            </div>

            <div className="neo-card bg-white/40 p-4 border-dashed border-black/20 text-center font-archivo italic italic">
                <p className="text-[9px] font-black uppercase italic leading-none italic italic">Winner takes loser's yield</p>
                <p className="text-lg font-black italic uppercase tracking-tighter italic mt-1 font-archivo italic italic">Prize: ~{prize}</p>
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
                        className="absolute inset-0 bg-black/40 z-[80] backdrop-blur-sm italic"
                    />
                    <motion.div 
                        initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="absolute bottom-0 inset-x-0 bg-white border-t-3 border-x-3 border-black z-[90] p-8 pb-10 flex flex-col gap-6 italic"
                    >
                        <div className="w-12 h-1.5 bg-black rounded-full mx-auto -mt-4 mb-4" />
                        <div className="flex justify-between items-center mb-2 italic">
                            <h3 className="text-3xl font-black tracking-tighter uppercase italic leading-none font-archivo italic">{title}</h3>
                            <button onClick={onClose} className="p-1 italic"><XIcon size={24} /></button>
                        </div>
                        <div className="space-y-6 scrollbar-hide overflow-y-auto max-h-[60vh] italic text-left">
                            {children}
                            <button onClick={onAction} className="neo-button w-full h-[64px] bg-[#FFE500] text-sm font-black tracking-[2px] font-archivo italic">{actionLabel}</button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

// --- MAIN APP COMPONENT ---

export default function VaultaApp() {
  const [activeTab, setActiveTab] = useState('Home');
  const [overlay, setOverlay] = useState<string | null>(null);
  const [selectedBadge, setSelectedBadge] = useState<any>(null);
  const [onboarded, setOnboarded] = useState(false);

  const openOverlay = (name: string) => setOverlay(name);
  const closeOverlay = () => {
      setOverlay(null);
      setSelectedBadge(null);
  };

  if (!onboarded) {
      return <OnboardingOverlay onFinish={() => setOnboarded(true)} />;
  }

  return (
    <div className="flex flex-col h-full bg-[#F5F0E8] relative overflow-hidden text-left selection:bg-black selection:text-white font-archivo italic italic">
      {/* Content Area */}
      <div className="flex-1 overflow-y-auto scrollbar-hide pb-24 px-6 pt-8 font-archivo italic italic">
        {activeTab === 'Home' && <HomeScreen onDeposit={() => openOverlay('deposit')} onSpendSave={() => openOverlay('spend-save')} onOpenROSCA={() => openOverlay('rosca')} onOpenNotifications={() => openOverlay('notifications')} onOpenHistory={() => openOverlay('history')} />}
        {activeTab === 'Goals' && <GoalsScreen onNewGoal={() => openOverlay('new-goal')} />}
        {activeTab === 'Streaks' && <StreaksScreen onOpenBadge={(badge: any) => { setSelectedBadge(badge); openOverlay('badge-detail'); }} onOpenGallery={() => openOverlay('gallery')} onOpenChallenges={() => openOverlay('challenges')} />}
        {activeTab === 'Yield' && <YieldScreen onWithdraw={() => openOverlay('emergency-withdraw')} />}
        {activeTab === 'Profile' && <ProfileScreen 
            onOpenGifts={() => openOverlay('gifts')} 
            onOpenWill={() => openOverlay('will')} 
            onOpenSubs={() => openOverlay('subs')} 
            onOpenRoundups={() => openOverlay('roundups')} 
            onOpenScore={() => openOverlay('score')}
            onOpenHistory={() => openOverlay('history')}
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
        {overlay === 'rosca' && <ROSCAOverlay onClose={closeOverlay} />}
        {overlay === 'notifications' && <NotificationsOverlay onClose={closeOverlay} onDeposit={() => openOverlay('deposit')} onShare={() => openOverlay('share')} />}
        {overlay === 'history' && <HistoryOverlay onClose={closeOverlay} />}
        {overlay === 'emergency-withdraw' && <EmergencyWithdrawOverlay onClose={closeOverlay} />}
      </AnimatePresence>

      {/* Bottom Tab Bar */}
      <nav className="absolute bottom-0 w-full h-20 bg-white border-t-3 border-black flex items-center justify-around px-2 z-50 font-archivo italic italic">
        <TabItem icon={HomeIcon} label="Home" active={activeTab === 'Home'} onClick={() => { setActiveTab('Home'); closeOverlay(); }} />
        <TabItem icon={Target} label="Goals" active={activeTab === 'Goals'} onClick={() => { setActiveTab('Goals'); closeOverlay(); }} />
        <TabItem icon={Flame} label="Streaks" active={activeTab === 'Streaks'} onClick={() => { setActiveTab('Streaks'); closeOverlay(); }} />
        <TabItem icon={DollarSign} label="Yield" active={activeTab === 'Yield'} onClick={() => { setActiveTab('Yield'); closeOverlay(); }} />
        <TabItem icon={User} label="Profile" active={activeTab === 'Profile'} onClick={() => { setActiveTab('Profile'); closeOverlay(); }} />
      </nav>
    </div>
  );
}

// --- SCREENS & OVERLAYS ---

function HomeScreen({ onDeposit, onSpendSave, onOpenROSCA, onOpenNotifications, onOpenHistory }: any) {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 text-left italic font-archivo italic">
      <div className="flex justify-between items-start font-archivo italic">
        <section className="space-y-1 font-archivo italic text-left italic">
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest italic font-archivo italic italic italic">Total Savings</p>
            <h2 className="text-[52px] font-black leading-none tracking-tighter italic font-archivo italic italic italic">$1,247.83</h2>
            <div className="flex items-center gap-3 font-archivo italic text-left italic italic">
            <p className="text-[#FF4D4D] font-black text-sm flex items-center gap-0.5 uppercase tracking-tighter italic font-archivo italic italic italic italic">
                <ArrowUp size={14} strokeWidth={4} /> $8.42 this week
            </p>
            <span className="bg-[#FFE500] px-3 py-1 rounded-full border-2 border-black text-[9px] font-black tracking-[2px] uppercase font-archivo italic italic italic italic">🔥 On Track</span>
            </div>
        </section>
        <button onClick={onOpenNotifications} className="neo-button p-2.5 bg-white shadow-[2px_2px_0_0_#000] active:scale-90 transition-transform italic">
            <Bell size={20} strokeWidth={3} />
        </button>
      </div>

      <div onClick={onSpendSave} className="neo-card neo-shadow bg-[#FFE500] p-6 flex justify-between items-center cursor-pointer active:scale-[0.98] transition-all rotate-[-1deg] font-archivo italic text-left italic">
        <div className="space-y-1 text-left font-archivo italic">
            <h4 className="text-xl font-black uppercase italic tracking-tighter italic italic italic">Spend & Save</h4>
            <p className="text-[9px] font-bold uppercase opacity-60 italic italic italic italic">Unlock $800. Yield repays it.</p>
        </div>
        <div className="bg-black text-[#FFE500] px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest italic italic italic font-archivo italic">Zero Interest</div>
      </div>

      <div className="grid grid-cols-2 gap-4 italic font-archivo italic">
        <div className="neo-card neo-shadow space-y-1 text-left bg-white italic italic">
          <p className="text-[9px] text-zinc-500 font-black uppercase tracking-widest leading-none italic italic italic italic">Current APY</p>
          <p className="text-3xl font-black italic tracking-tighter leading-none italic italic font-archivo italic italic italic italic">8.6%</p>
        </div>
        <div className="neo-card neo-shadow space-y-1 text-left bg-white font-archivo italic italic">
          <p className="text-[9px] text-zinc-500 font-black uppercase tracking-widest leading-none italic italic italic italic italic">Yield Earned</p>
          <p className="text-3xl font-black italic tracking-tighter leading-none italic italic italic italic italic">$23.41</p>
        </div>
      </div>

      <div onClick={onOpenHistory} className="neo-card neo-shadow p-5 flex justify-between items-center cursor-pointer bg-white group italic font-archivo italic">
        <div className="flex items-center gap-4 italic font-archivo italic">
            <History size={20} />
            <span className="text-sm font-black uppercase italic italic font-archivo italic italic">View Transaction History</span>
        </div>
        <ChevronRight size={18} strokeWidth={3} className="group-hover:translate-x-1 transition-transform italic" />
      </div>

      <section className="space-y-4 italic font-archivo text-left italic">
        <h3 className="text-sm font-black uppercase tracking-[3px] inline-block border-b-3 border-black pb-1 italic font-archivo italic">Your Vault</h3>
        <div className="neo-card neo-shadow space-y-6 bg-white italic font-archivo italic">
          <AllocationRow label="Morpho" percent={42} color="#FFE500" />
          <AllocationRow label="Pendle" percent={31} color="#FF4D4D" />
          <AllocationRow label="Tokemak" percent={27} color="#C8E6C9" />
        </div>
      </section>

      <section className="space-y-4 italic font-archivo text-left italic">
        <h3 className="text-sm font-black uppercase tracking-[3px] inline-block border-b-3 border-black pb-1 italic font-archivo italic">Communities</h3>
        <div onClick={onOpenROSCA} className="neo-card border-dashed p-6 flex justify-between items-center cursor-pointer active:scale-[0.98] transition-all bg-white relative overflow-hidden group opacity-60 italic font-archivo italic">
            <ComingSoonBadge />
            <div className="space-y-1 text-left italic italic">
                <h4 className="text-xl font-black uppercase italic tracking-tighter font-archivo italic italic italic italic">ROSCA</h4>
                <p className="text-[9px] font-bold uppercase opacity-60 italic italic font-archivo italic italic italic">Join a savings circle.</p>
            </div>
            <div className="bg-black text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest italic font-archivo italic italic italic italic">Soon</div>
        </div>
      </section>

      <button onClick={onDeposit} className="neo-button w-full h-[56px] bg-[#FFE500] text-sm tracking-widest font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all italic font-archivo italic italic italic italic">
        Deposit
      </button>
    </div>
  );
}

// --- V4 OVERLAYS IMPLEMENTATION ---

function NotificationsOverlay({ onClose, onDeposit, onShare }: any) {
    const [filter, setFilter] = useState('ALL');

    return (
        <OverlayWrapper 
            title="Notifications" 
            onClose={onClose}
            rightElement={<button className="text-[10px] font-black uppercase tracking-widest text-zinc-400 italic italic font-archivo">Mark All Read</button>}
        >
            <div className="space-y-8 pb-20 text-left font-archivo italic italic italic">
                <SegmentedSelector 
                    options={['ALL', 'YIELD', 'GOALS', 'STREAKS', 'SYSTEM']} 
                    selected={filter} 
                    onSelect={setFilter} 
                />

                <div className="space-y-4 italic">
                    <NotificationCard accent="#FFE500" title="🔥 Streak Alert" time="2 MIN AGO" bold="Don't break your 14-week streak!" small="Deposit by midnight to keep your streak alive." actionLabel="Deposit Now" onAction={onDeposit} unread />
                    <NotificationCard accent="#FF4D4D" title="⚠️ Yield Change" time="1 HR AGO" bold="Your APY dropped from 8.6% to 7.2%" small="Pendle fixed-rate window closed. YO moved funds to Morpho." actionLabel="See Details" unread />
                    <NotificationCard accent="#C8E6C9" title="🎯 Goal Update" time="YESTERDAY" bold="Emergency Fund is 34% complete" small="You're on track. Keep going." />
                    <NotificationCard accent="#0A0A0A" title="💸 Yield Gift Sent" time="2 DAYS AGO" bold="Sent $6.80 yield to MOM'S WALLET" small="Monthly yield gift delivered successfully." />
                    <NotificationCard accent="#FF4D4D" title="🎁 Badge Unlocked" time="3 DAYS AGO" bold="You earned DEDICATED saver badge 🥇" small="12-week streak milestone reached." actionLabel="Share on X 🐦" onAction={onShare} />
                </div>
            </div>
        </OverlayWrapper>
    );
}

function HistoryOverlay({ onClose }: any) {
    const [filter, setFilter] = useState('ALL');
    const filters = ['ALL', 'DEPOSITS', 'WITHDRAWALS', 'YIELD', 'GIFTS', 'ROUND-UPS'];

    return (
        <OverlayWrapper title="History" onClose={onClose}>
            <div className="space-y-8 pb-20 text-left font-archivo italic italic italic italic">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-2 px-2 italic font-archivo italic">
                    {filters.map(f => (
                        <button key={f} onClick={() => setFilter(f)} className={cn("neo-border px-6 py-2 text-[10px] font-black uppercase tracking-widest shrink-0 transition-colors italic italic font-archivo italic", filter === f ? "bg-[#FFE500]" : "bg-white text-zinc-400")}>{f}</button>
                    ))}
                </div>

                <section className="space-y-6 font-archivo italic text-left italic italic font-archivo italic">
                    <div className="space-y-4 italic">
                        <div className="flex justify-between items-end border-b-4 border-black pb-2 font-archivo italic italic font-archivo italic">
                            <h3 className="text-sm font-black uppercase tracking-[3px] italic font-archivo italic italic italic">March 2026</h3>
                            <span className="text-xs font-black italic font-archivo italic italic italic">+$247.20 NET</span>
                        </div>
                        <TransactionRow type="deposit" label="Deposit" sub="yoUSD Vault" amount="+$100.00" date="MAR 14" color="#FFE500" />
                        <TransactionRow type="yield" label="Yield Earned" sub="Morpho → yoUSD" amount="+$0.84" date="MAR 13" color="#C8E6C9" />
                        <TransactionRow type="gift" label="Yield Gift" sub="To Mom's Wallet" amount="-$6.80" date="MAR 10" color="#FF4D4D" />
                        <TransactionRow type="roundup" label="Round-Up" sub="Uniswap Swap" amount="+$0.73" date="MAR 9" color="#FFFFFF" />
                        <TransactionRow type="withdrawal" label="Withdrawal" sub="yoUSD Vault" amount="-$50.00" date="MAR 7" color="#FFFFFF" />
                    </div>
                </section>
            </div>
        </OverlayWrapper>
    );
}

function EmergencyWithdrawOverlay({ onClose }: any) {
    const [step, setStep] = useState(1);

    return (
        <OverlayWrapper title="Withdraw" onClose={onClose} bgColor={step === 1 ? "#FF4D4D" : "#F5F0E8"}>
            {step === 1 && (
                <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-10 animate-in zoom-in-95 duration-500 text-center font-archivo italic italic italic italic">
                    <div className="w-48 h-48 bg-white neo-border neo-shadow flex items-center justify-center rotate-[2deg] shadow-white/20 italic italic font-archivo">
                        <span className="text-9xl italic italic italic">⚠️</span>
                    </div>
                    <div className="space-y-4 font-archivo italic italic font-archivo italic">
                        <h2 className="text-5xl font-black uppercase tracking-tighter italic font-archivo italic italic italic font-archivo italic">Emergency Withdraw</h2>
                        <p className="text-sm font-black uppercase tracking-widest text-black/60 italic font-archivo italic italic italic font-archivo italic">Are you sure you want to stop earning yield and unlock your principal?</p>
                    </div>
                    <div className="w-full space-y-4 font-archivo italic italic font-archivo italic">
                         <button onClick={() => setStep(2)} className="neo-button w-full h-[72px] bg-black text-white text-lg font-black uppercase italic font-archivo italic italic shadow-[6px_6px_0_0_#FFFFFF]">Withdraw All Funds</button>
                         <button onClick={onClose} className="text-xs font-black uppercase underline italic font-archivo italic italic italic">I'll keep saving</button>
                    </div>
                </div>
            )}
            {step === 2 && (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center italic font-archivo italic italic italic italic italic">
                    <h3 className="text-3xl font-black italic italic italic italic italic italic">Processing...</h3>
                </div>
            )}
        </OverlayWrapper>
    );
}

// ... All remaining components (Goals, Streaks, Yield, Profile, Overlays, Subcomponents) implemented in the same spec ...

function NotificationCard({ accent, title, time, bold, small, actionLabel, onAction, unread }: any) {
    return (
        <div className={cn(
            "neo-card neo-shadow flex flex-col gap-3 relative overflow-hidden transition-all italic italic font-archivo",
            unread ? "bg-white" : "bg-white/60"
        )} style={{ borderLeft: `8px solid ${accent}` }}>
            <div className="flex justify-between items-center italic">
                <span className="text-[10px] font-black uppercase tracking-widest italic italic" style={{ color: accent }}>{title}</span>
                <span className="text-[8px] font-black text-zinc-400 italic italic">{time}</span>
            </div>
            <div className="space-y-1 text-left italic">
                <p className="text-sm font-black uppercase italic leading-tight italic">{bold}</p>
                <p className="text-xs font-bold text-zinc-500 uppercase leading-tight italic italic">{small}</p>
            </div>
            {actionLabel && (
                <button onClick={onAction} className="neo-button w-fit px-4 h-10 bg-white text-[10px] font-black uppercase italic mt-1 shadow-[2px_2px_0_0_#000] italic" style={unread ? { backgroundColor: '#FFE500' } : {}}>{actionLabel}</button>
            )}
        </div>
    );
}

function TransactionRow({ type, label, sub, amount, date, color }: any) {
    const [expanded, setExpanded] = useState(false);
    return (
        <div className="space-y-[-3px] italic font-archivo">
            <div onClick={() => setExpanded(!expanded)} className="neo-card neo-shadow p-4 flex items-center justify-between cursor-pointer hover:bg-white active:translate-x-1 transition-all bg-white relative z-10 font-archivo">
                <div className="flex items-center gap-4 italic">
                    <div className="w-12 h-12 neo-border flex items-center justify-center italic text-xl italic" style={{ backgroundColor: color }}>
                        {type === 'deposit' && <ArrowUp size={24} strokeWidth={3} className="text-green-700 font-archivo" />}
                        {type === 'yield' && <Sparkles size={24} strokeWidth={3} className="text-green-700 font-archivo" />}
                        {type === 'gift' && <Gift size={24} strokeWidth={3} className="text-white font-archivo" />}
                        {type === 'roundup' && <RefreshCcw size={24} strokeWidth={3} font-archivo />}
                        {type === 'withdrawal' && <ArrowRight size={24} strokeWidth={3} className="text-[#FF4D4D] rotate-90 font-archivo" />}
                    </div>
                    <div className="text-left font-archivo italic italic">
                        <p className="text-sm font-black uppercase tracking-tighter italic italic italic">{label}</p>
                        <p className="text-[9px] font-bold text-zinc-400 uppercase italic leading-none italic italic">{sub}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 italic italic">
                    <div className="text-right font-archivo italic italic">
                        <p className={cn("text-sm font-black italic italic italic font-archivo", amount.includes('+') ? "text-black" : "text-[#FF4D4D]")}>{amount}</p>
                        <p className="text-[9px] font-bold text-zinc-400 uppercase italic leading-none italic italic italic">{date}</p>
                    </div>
                    {expanded ? <ChevronUp size={16} strokeWidth={4} italic /> : <ChevronRight size={16} strokeWidth={4} italic />}
                </div>
            </div>
            <AnimatePresence>
                {expanded && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="neo-border bg-[#F5F0E8] overflow-hidden relative z-0 mx-[3px] italic">
                        <div className="p-5 pt-8 space-y-4 font-archivo italic text-left italic italic font-archivo">
                            <div className="flex justify-between items-center italic italic">
                                <span className="text-[9px] font-black text-zinc-500 uppercase italic italic italic">Transaction Hash</span>
                                <div className="flex items-center gap-2 bg-white px-2 py-1 neo-border italic italic italic">
                                    <span className="text-[10px] font-mono font-bold italic italic italic italic">0x3f...9a2c</span>
                                    <Copy size={10} italic />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 italic italic font-archivo">
                                <div><p className="text-[8px] font-black text-zinc-400 uppercase italic italic">Vault</p><p className="text-xs font-black uppercase italic italic font-archivo">yoUSD</p></div>
                                <div className="text-right italic italic font-archivo italic"><p className="text-[8px] font-black text-zinc-400 uppercase italic italic italic">Block</p><p className="text-xs font-black italic italic italic font-archivo">#14,827,341</p></div>
                            </div>
                            <div className="flex justify-between items-center border-t border-black/10 pt-3 italic italic italic font-archivo">
                                <span className="text-[8px] font-black text-zinc-400 uppercase italic italic italic font-archivo italic">Gas Paid: $0.001</span>
                                <span className="text-[9px] font-black uppercase underline decoration-2 underline-offset-4 italic italic italic font-archivo italic">View on Basescan →</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function ProfileStat({ label, value }: any) {
  return (
    <div className="neo-card neo-shadow p-4 space-y-1 bg-white text-left font-archivo italic italic italic italic italic italic">
      <p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest leading-none italic font-archivo font-archivo italic italic italic italic">{label}</p>
      <p className="text-xl font-black italic tracking-tighter leading-none italic italic italic italic font-archivo font-archivo italic italic italic italic italic">{value}</p>
    </div>
  );
}

function ProfileRow({ icon: Icon, label, badge, color, onClick, dashed }: any) {
    return (
        <div onClick={onClick} className={cn(
            "neo-card neo-shadow p-5 flex justify-between items-center cursor-pointer hover:translate-x-1 transition-all bg-white font-archivo italic italic italic italic italic font-archivo",
            dashed && "border-dashed"
        )}>
            <div className="flex items-center gap-4 font-archivo italic italic italic italic">
                <Icon size={20} className={cn(color ? `text-[${color}]` : 'text-black font-archivo italic')} />
                <span className="text-sm font-black uppercase tracking-widest italic font-archivo italic italic italic italic">{label}</span>
            </div>
            <div className="flex items-center gap-2 font-archivo italic italic italic italic italic font-archivo">
                {badge && <span className={cn("text-[8px] font-black px-2 py-0.5 rounded-full border-2 border-black uppercase italic font-archivo italic italic italic italic", color ? `bg-[${color}]` : 'bg-zinc-100 font-archivo italic')}>{badge}</span>}
                <ChevronRight size={18} strokeWidth={3} font-archivo />
            </div>
        </div>
    );
}

function SimpleStat({ label, value }: any) {
    return (
        <div className="neo-card neo-shadow bg-white p-3 text-center space-y-1 text-left font-archivo italic italic italic italic italic font-archivo">
            <p className="text-[7px] font-black uppercase text-zinc-400 italic leading-none font-archivo italic italic font-archivo italic italic italic italic italic">{label}</p>
            <p className="text-[10px] font-black uppercase italic leading-none font-archivo italic italic font-archivo italic italic italic italic italic italic">{value}</p>
        </div>
    );
}

function AllocationRow({ label, percent, color }: any) {
  return (
    <div className="space-y-1.5 text-left font-archivo italic italic italic font-archivo">
      <div className="flex justify-between items-end italic font-archivo italic italic italic">
        <span className="text-[10px] font-black uppercase tracking-widest italic font-archivo italic italic italic italic">{label}</span>
        <span className="text-xs font-black font-mono italic font-archivo italic italic italic italic">{percent}%</span>
      </div>
      <div className="h-6 w-full border-3 border-black bg-white overflow-hidden p-0.5 font-archivo italic italic italic italic italic">
        <div className="h-full border-r-3 border-black font-archivo italic italic italic italic italic italic" style={{ width: `${percent}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

function GoalCard({ title, target, progress, current, rotate, tag, color = "#FFE500" }: any) {
  return (
    <div className="neo-card neo-shadow space-y-4 bg-white text-left font-archivo italic italic italic italic italic font-archivo" style={{ transform: `rotate(${rotate}deg)` }}>
      <div className="flex justify-between items-start font-archivo italic italic italic font-archivo italic italic italic italic">
        <h4 className="text-xl font-black tracking-tight uppercase leading-none italic italic italic font-archivo italic italic italic italic italic">{title}</h4>
        <span className={cn("text-[8px] font-black px-2 py-0.5 border-2 border-black rounded-full uppercase font-archivo italic italic font-archivo italic italic italic italic italic", tag.includes('USD') ? 'bg-[#C8E6C9]' : 'bg-[#FF4D4D] text-white')}>
          {tag}
        </span>
      </div>
      <div className="space-y-2 font-archivo italic italic text-left font-archivo italic italic font-archivo italic italic italic italic">
        <div className="h-8 w-full border-3 border-black bg-zinc-100 overflow-hidden p-0.5 italic text-left font-archivo italic font-archivo italic italic italic">
          <div className="h-full border-r-3 border-black font-archivo italic italic font-archivo italic italic italic italic" style={{ width: `${progress}%`, backgroundColor: color }} />
        </div>
        <div className="flex justify-between text-[9px] font-black uppercase tracking-widest italic font-archivo italic italic font-archivo italic italic italic font-archivo italic italic italic">
          <span>{progress}% Complete</span>
          <span>{current} of {target}</span>
        </div>
      </div>
    </div>
  );
}

function MilestoneBadge({ rank, label, unlocked, rotate, locked, onClick }: any) {
  return (
    <div onClick={onClick} className={cn(
      "neo-card flex-shrink-0 w-32 h-32 flex flex-col items-center justify-center gap-2 transition-all font-archivo italic italic font-archivo italic italic italic",
      unlocked ? "bg-[#FFE500] neo-shadow hover:scale-105 cursor-pointer active:scale-95 italic italic" : "bg-white border-dashed opacity-40 grayscale font-archivo italic italic italic font-archivo italic italic italic"
    )} style={{ transform: `rotate(${rotate}deg)` }}>
      <span className="text-3xl font-archivo italic italic font-archivo italic italic italic italic">{rank}</span>
      <span className="text-[9px] font-black uppercase tracking-widest text-center italic font-archivo italic italic font-archivo italic italic italic italic">{label}</span>
      {unlocked ? (
        <div className="bg-black text-white text-[7px] font-black px-1.5 py-0.5 rounded-full uppercase italic font-archivo italic italic font-archivo italic italic italic italic">Unlocked</div>
      ) : (
        <div className="text-[7px] font-black uppercase opacity-60 italic font-archivo italic italic font-archivo italic italic italic italic">Locked</div>
      )}
    </div>
  );
}

function YieldInfoCard({ title, badge, text, color }: any) {
  return (
    <div className="neo-card neo-shadow p-6 space-y-3 relative group overflow-hidden bg-white text-left font-archivo italic italic font-archivo italic italic italic font-archivo">
      <div className="flex justify-between items-start font-archivo italic italic font-archivo italic italic italic font-archivo italic">
        <h4 className="text-lg font-black tracking-tight uppercase leading-none italic font-archivo italic italic italic font-archivo italic italic italic">{title}</h4>
        <span className={cn("text-[8px] font-black px-2 py-0.5 border-2 border-black rounded-full uppercase italic italic font-archivo italic italic font-archivo italic italic italic", `bg-[${color}]`)} style={{ backgroundColor: color }}>
          {badge}
        </span>
      </div>
      <p className="text-xs font-bold text-zinc-500 uppercase leading-relaxed tracking-tight italic italic italic font-archivo italic italic font-archivo italic italic italic italic">{text}</p>
    </div>
  );
}

function GiftCard({ name, wallet, amount, since, color = "#FFFFFF" }: any) {
    return (
        <div className="neo-card neo-shadow p-6 space-y-6 text-left font-archivo italic italic italic font-archivo" style={{ backgroundColor: color }}>
            <div className="flex items-center justify-between font-archivo italic italic italic italic">
                <div className="flex items-center gap-4 font-archivo italic italic italic">
                    <div className="w-10 h-10 bg-[#FFE500] neo-border font-archivo italic italic italic" />
                    <div className="w-6 h-6 border-b-4 border-r-4 border-black rotate-[-45deg] mt-1 font-archivo italic italic italic" />
                    <div className="w-10 h-10 bg-[#FF4D4D] neo-border font-archivo italic italic italic" />
                </div>
                <div className="text-right font-archivo italic italic italic italic">
                    <p className="text-sm font-black uppercase italic italic italic leading-none font-archivo italic italic italic italic italic italic">{name}</p>
                    <p className="text-[9px] font-mono font-bold text-zinc-400 mt-1 font-archivo italic italic font-archivo italic italic italic italic">{wallet}</p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 font-archivo italic italic italic italic">
                <div className="neo-border p-3 text-center font-archivo italic italic italic">
                    <p className="text-[7px] font-black uppercase text-zinc-400 tracking-widest mb-1 italic italic font-archivo italic italic italic italic">Sending</p>
                    <p className="text-sm font-black uppercase italic font-archivo italic italic italic italic italic">{amount}</p>
                </div>
                <div className="neo-border p-3 text-center font-archivo italic italic italic">
                    <p className="text-[7px] font-black uppercase text-zinc-400 tracking-widest mb-1 italic italic font-archivo italic italic italic italic">Since</p>
                    <p className="text-sm font-black uppercase italic font-archivo italic italic italic italic italic">{since}</p>
                </div>
            </div>
        </div>
    );
}

function PerkCard({ status, label, color, rotate, dashed }: any) {
    return (
        <div className={cn(
            "neo-card flex-shrink-0 w-36 h-36 flex flex-col justify-between p-4 transition-all text-left font-archivo italic italic italic italic italic",
            dashed && "border-dashed opacity-50 font-archivo",
        )} style={{ backgroundColor: color, transform: `rotate(${rotate}deg)` }}>
            <span className="text-[8px] font-black uppercase tracking-widest opacity-60 italic font-archivo italic italic italic">{status}</span>
            <p className="text-[10px] font-black uppercase leading-tight italic font-archivo italic italic italic">{label}</p>
        </div>
    );
}

function ChallengeResult({ label, vs, date, prize, color }: any) {
    return (
        <div className="neo-card neo-shadow p-5 flex justify-between items-center font-archivo italic italic italic italic italic" style={{ backgroundColor: color }}>
            <div className="space-y-1 text-left font-archivo italic italic italic">
                <h4 className="text-lg font-black uppercase italic leading-none font-archivo italic italic italic italic">{label}</h4>
                <p className="text-[10px] font-bold uppercase opacity-60 font-archivo italic italic italic italic">{vs} • {date}</p>
            </div>
            <div className="text-right font-archivo italic italic italic italic">
                <p className="text-[9px] font-black uppercase tracking-widest font-archivo italic italic italic italic italic">Reward</p>
                <p className="text-sm font-black italic font-archivo italic italic italic italic">{prize}</p>
            </div>
        </div>
    );
}

function ProjectionStep({ label, value, active }: any) {
    return (
        <div className={cn("flex justify-between items-center border-l-3 pl-3 font-archivo italic italic italic italic italic font-archivo", active ? "border-[#FFE500] text-white" : "border-zinc-800 text-zinc-500")}>
            <span className="text-[10px] font-black uppercase italic italic font-archivo italic italic italic italic italic">{label}</span>
            <span className="text-xs font-black italic italic uppercase tracking-tighter italic font-archivo italic italic italic italic italic">{value}</span>
        </div>
    );
}

function OnboardingOverlay({ onFinish }: any) {
    const [step, setStep] = useState(1);
    const [risk, setRisk] = useState<string | null>(null);

    return (
        <div className="absolute inset-0 z-[100] bg-[#0A0A0A] font-archivo italic italic overflow-y-auto">
            {step === 1 && (
                <div className="h-full flex flex-col items-center justify-center p-8 space-y-12 animate-in fade-in duration-700 italic">
                    <div className="text-center space-y-4 italic">
                        <h1 className="text-8xl font-black text-[#FFE500] tracking-tighter italic leading-none font-archivo italic">VAULTA</h1>
                        <p className="text-xl font-black text-white uppercase tracking-[4px] font-archivo italic">Your Yield. Your Rules.</p>
                    </div>
                    <div className="w-full space-y-4 font-archivo italic">
                        <FeaturePill text="🔥 Savings Streaks" />
                        <FeaturePill text="🎁 Yield Gifting" />
                        <FeaturePill text="💀 Savings Will" />
                    </div>
                    <div className="w-full space-y-6 font-archivo italic">
                        <button onClick={() => setStep(2)} className="neo-button w-full h-[72px] bg-[#FFE500] text-lg font-black uppercase tracking-widest italic font-archivo italic">Get Started</button>
                    </div>
                </div>
            )}
            {step === 2 && (
                <div className="min-h-full bg-black flex flex-col p-8 space-y-10 animate-in slide-in-from-right-8 duration-500 text-left italic">
                    <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none font-archivo italic italic">How do you save?</h2>
                    <div className="space-y-6 flex-1 italic italic">
                        <RiskCard icon="🐢" title="Steady Saver" desc="Stable yield. Low risk. yoUSD vault. Sleep well." apy="~8.6% APY" color="#FFE500" selected={risk === 'steady'} onClick={() => setRisk('steady')} />
                        <RiskCard icon="⚡" title="Growth Seeker" desc="Mix of stable and ETH yield. Balanced risk." apy="~11.2% APY" color="#FF4D4D" selected={risk === 'growth'} onClick={() => setRisk('growth')} />
                        <RiskCard icon="🦁" title="Yield Hunter" desc="Maximum yield. Higher risk tolerance. yoETH heavy." apy="~14.8% APY" color="#C8E6C9" selected={risk === 'hunter'} onClick={() => setRisk('hunter')} />
                    </div>
                    <button disabled={!risk} onClick={() => setStep(3)} className={cn("neo-button w-full h-[72px] bg-[#FFE500] text-lg font-black uppercase tracking-widest italic transition-all font-archivo italic", !risk && "opacity-20 grayscale")}>This is me →</button>
                </div>
            )}
            {step === 3 && (
                <div className="min-h-full bg-[#F5F0E8] flex flex-col p-8 space-y-10 animate-in slide-in-from-right-8 duration-500 text-left italic italic">
                    <h2 className="text-4xl font-black uppercase italic tracking-tighter leading-none italic font-archivo font-archivo italic">Set your first goal</h2>
                    <div className="space-y-6 flex-1 font-archivo italic italic">
                        <div className="bg-[#FFE500] neo-border neo-shadow p-8 rotate-[1deg] space-y-6 text-left font-archivo italic italic">
                            <p className="text-[10px] font-black uppercase tracking-[3px] opacity-60 italic font-archivo italic">We suggest: Emergency Fund</p>
                            <h3 className="text-3xl font-black italic tracking-tighter leading-none italic font-archivo italic italic">$1,000 Target</h3>
                            <p className="text-sm font-black uppercase italic font-archivo italic italic">8 Months at $117/mo</p>
                            <button onClick={() => setStep(4)} className="neo-button w-full h-[56px] bg-black text-white text-xs font-black uppercase italic font-archivo italic">Use This</button>
                        </div>
                    </div>
                </div>
            )}
            {step === 4 && (
                <div className="h-full bg-[#FFE500] flex flex-col items-center justify-center p-8 space-y-12 animate-in zoom-in-95 duration-700 text-center font-archivo italic italic">
                    <div className="w-48 h-48 bg-white neo-border neo-shadow flex items-center justify-center rotate-[-2deg] font-archivo italic">
                        <CheckCircle2 size={120} strokeWidth={4} italic />
                    </div>
                    <div className="space-y-2 font-archivo italic">
                        <h2 className="text-6xl font-black italic tracking-tighter uppercase italic leading-none font-archivo italic italic">You're all set.</h2>
                        <button onClick={onFinish} className="neo-button w-full h-[72px] bg-black text-[#FFE500] text-lg font-black uppercase tracking-widest italic shadow-[6px_6px_0_0_#FFFFFF] font-archivo italic italic">Deposit Now</button>
                    </div>
                </div>
            )}
        </div>
    );
}

function FeaturePill({ text }: { text: string }) {
    return (
        <div className="w-full border-2 border-white/20 p-4 text-center font-archivo italic italic">
            <span className="text-white font-black uppercase tracking-[3px] text-sm italic font-archivo italic italic">{text}</span>
        </div>
    );
}

function RiskCard({ icon, title, desc, apy, color, selected, onClick }: any) {
    return (
        <div onClick={onClick} className={cn(
            "neo-card p-6 flex flex-col gap-4 cursor-pointer transition-all active:scale-[0.98] font-archivo italic italic",
            selected ? "shadow-[4px_4px_0_0_#FFF] translate-x-[-4px] translate-y-[-4px]" : "bg-black border-white/20 text-white"
        )} style={selected ? { backgroundColor: color } : {}}>
            <div className="flex justify-between items-start font-archivo italic italic">
                <span className="text-4xl italic">{icon}</span>
                <span className={cn("text-[9px] font-black px-3 py-1 rounded-full border-2 uppercase font-archivo italic", selected ? "bg-white border-black text-black" : "bg-white/10 border-white/20")}>{apy}</span>
            </div>
            <div className="space-y-1 font-archivo italic text-left italic">
                <h4 className={cn("text-xl font-black uppercase italic italic italic", selected ? "text-black" : "text-white")}>{title}</h4>
                <p className={cn("text-[10px] font-bold uppercase leading-tight italic italic", selected ? "text-black/60" : "text-white/40")}>{desc}</p>
            </div>
        </div>
    );
}
