'use client';
import { useState, useEffect, useMemo } from 'react';
import {
  Home as HomeIcon, Target, Flame, DollarSign, User, ArrowUp, CheckCircle2, Plus, Share2, Skull,
  TrendingUp, Award, ChevronRight, ExternalLink, Gift, ArrowRight, Download, ShieldAlert,
  ChevronDown, Trash2, Lock, Zap, Globe, Star, Moon, Clock, Settings, CreditCard, History,
  AlertCircle, Trophy, Users, RefreshCcw, ZapOff, UserPlus, Bell, Loader2, Network, Wallet
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ConnectButton } from '../src/components/ConnectButton';
import { useVaultaAuth } from '../src/hooks/useVaultaAuth';
import { useChainGuard } from '../src/hooks/useChainGuard';
import { useVaultData } from '../src/hooks/yo/useVaultData';
import { useUserPosition } from '../src/hooks/yo/useUserPosition';
import { useDeposit } from '../src/hooks/yo/useDeposit';
import { useWithdraw } from '../src/hooks/yo/useWithdraw';
import { useLeaderboard } from '../src/hooks/useLeaderboard';
import { useNotifications } from '../src/hooks/useNotifications';
import { useStreaks } from '../src/hooks/useStreaks';
import { useGoals } from '../src/hooks/useGoals';
import { useConvexUser } from '../src/hooks/useConvexUser';
import { useBadges } from '../src/hooks/useBadges';
import { useYoBalance } from '../src/hooks/yo/useYoBalance';
import { useShareCards } from '../src/hooks/useShareCards';
import { YO_CONTRACTS } from '../src/lib/yo/constants';
import { yoApi } from '../src/lib/yo/api';
import { useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';

const IS_LOCAL = process.env.NEXT_PUBLIC_ENV === 'local';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function ConfettiCelebration({ title, desc, onDismiss, type, data }: any) {
  const { createShareCard } = useShareCards();
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    setIsSharing(true);
    try {
      const slug = await createShareCard(type, data);
      if (slug) {
        const url = `https://vaulta.xyz/share/${slug}`;
        const text = `I just hit a massive milestone on VAULTA! Check it out: ${url} @vaultaxyz #Base #DeFi`;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
      className="absolute inset-0 z-[200] bg-black/80 flex flex-col items-center justify-center p-8 text-center gap-6 font-archivo italic"
    >
      <div className="text-7xl">🎉</div>
      <h2 className="text-5xl font-black text-[#FFE500] italic leading-none">{title}</h2>
      <p className="text-white font-bold uppercase opacity-80">{desc}</p>
      <div className="flex flex-col w-full gap-3 mt-4 font-archivo">
        <button
          onClick={handleShare}
          disabled={isSharing}
          className="neo-button h-16 bg-[#1DA1F2] text-white flex items-center justify-center gap-2 italic disabled:opacity-50"
        >
          {isSharing ? <Loader2 className="animate-spin" size={20} /> : <Share2 size={20} />}
          SHARE ON X
        </button>
        <button onClick={onDismiss} className="neo-button h-14 bg-white italic">CONTINUE</button>
      </div>
    </motion.div>
  );
}

// --- BASE COMPONENTS ---

function FeaturePill({ text }: { text: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, rotate: 1 }}
      className="w-full border-3 border-white/20 p-5 text-center font-archivo italic bg-white/5 backdrop-blur-sm"
    >
      <span className="text-white font-black uppercase tracking-[4px] text-sm italic">{text}</span>
    </motion.div>
  );
}

function OnboardingOverlay({ onFinish }: any) {
  return (
    <div className="absolute inset-0 z-[100] bg-black flex flex-col items-center justify-center p-8 space-y-16 animate-in fade-in duration-700 font-archivo italic">
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="text-9xl font-black text-[#FFE500] tracking-tighter leading-none italic font-archivo drop-shadow-[10px_10px_0_rgba(255,255,255,0.1)]"
      >
        VAULTA
      </motion.h1>
      <div className="w-full space-y-4 max-w-xs">
        <FeaturePill text="🔥 Savings Streaks" />
        <FeaturePill text="🎁 Yield Gifting" />
        <FeaturePill text="💀 Savings Will" />
      </div>
      <button
        onClick={onFinish}
        className="neo-button w-full h-[80px] bg-[#FFE500] text-xl font-black uppercase tracking-widest italic font-archivo shadow-[8px_8px_0_0_#FFF] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all active:scale-95"
      >
        Enter the Vault
      </button>
    </div>
  );
}

function OverlayWrapper({ title, onClose, children, bgColor = "#F5F0E8", noHeader = false, rightElement }: any) {
  return (
    <motion.div
      initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute inset-0 z-[60] flex flex-col p-6 pt-8 scrollbar-hide overflow-y-auto font-archivo italic text-left"
      style={{ backgroundColor: bgColor }}
    >
      {!noHeader && (
        <div className="flex justify-between items-center mb-8 font-archivo text-left">
          <h1 className="text-4xl font-black tracking-tighter uppercase leading-none italic text-left">{title}</h1>
          <div className="flex items-center gap-4 italic font-archivo">
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

function TabItem({ icon: Icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={cn("flex flex-col items-center justify-center flex-1 h-full gap-1 transition-all italic", active ? "text-black" : "text-zinc-400 font-archivo italic")}>
      <div className={cn("p-1.5 rounded-lg border-2 border-transparent transition-all font-archivo italic", active && "bg-[#FFE500] border-black neo-shadow-sm scale-110 italic")}>
        <Icon size={20} strokeWidth={active ? 3 : 2} />
      </div>
      <span className={cn("text-[8px] font-black uppercase tracking-widest italic font-archivo", active && "underline decoration-2 underline-offset-4 font-archivo")}>{label}</span>
    </button>
  );
}

// --- MAIN APP ---

export default function VaultaApp() {
  const [activeTab, setActiveTab] = useState('Home');
  const [overlay, setOverlay] = useState<string | null>(null);
  const [onboarded, setOnboarded] = useState(false);
  const [celebration, setCelebration] = useState<{ title: string; desc: string; type: string; data: any } | null>(null);

  const { isFullyConnected, isFarcasterConnected, isConnected: isWalletConnected, address, disconnect } = useVaultaAuth();
  const { convexUser, isOffline } = useConvexUser();
  const { needsSwitch, switchToBase } = useChainGuard();

  const { totalValueUSD, isLoading, refetch } = useUserPosition();
  const { currentStreak, isAtRisk, badgesEarned, isStale: streakStale } = useStreaks();
  const { unreadCount, isStale: notifyStale } = useNotifications();
  const { goals, isLoading: goalsLoading } = useGoals();

  const [lastBadgeCount, setLastBadgeCount] = useState(0);
  const [lastCompletedGoalCount, setLastCompletedGoalCount] = useState(0);

  // Step 2: Refresh data after chain confirmation
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const lastActive = localStorage.getItem('vaulta_last_tx');
      if (lastActive) {
        const timer = setTimeout(() => {
          refetch();
          localStorage.removeItem('vaulta_last_tx');
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [refetch]);

  // Step 3: Check for new badges
  useEffect(() => {
    if (badgesEarned.length > lastBadgeCount && lastBadgeCount > 0) {
      const newBadge = badgesEarned[badgesEarned.length - 1];
      setCelebration({
        title: 'NEW BADGE!',
        desc: `YOU UNLOCKED THE ${newBadge.badgeType.toUpperCase()} BADGE!`,
        type: 'badge',
        data: { badgeName: newBadge.badgeType.toUpperCase() }
      });
    }
    setLastBadgeCount(badgesEarned.length);
  }, [badgesEarned, lastBadgeCount]);

  // Step 4: Check for completed goals
  useEffect(() => {
    const completedCount = goals.filter((g: any) => g.status === 'completed').length;
    if (completedCount > lastCompletedGoalCount && lastCompletedGoalCount > 0) {
      const lastGoal = goals.filter((g: any) => g.status === 'completed').sort((a: any, b: any) => b.completedAt! - a.completedAt!)[0];
      setCelebration({
        title: 'GOAL REACHED!',
        desc: `YOU SAVED $${lastGoal.targetAmount} FOR ${lastGoal.name.toUpperCase()}!`,
        type: 'goal',
        data: { name: lastGoal.name, target: lastGoal.targetAmount, current: lastGoal.currentAmount, emoji: lastGoal.emoji }
      });
    }
    setLastCompletedGoalCount(completedCount);
  }, [goals, lastCompletedGoalCount]);

  const openOverlay = (name: string) => setOverlay(name);
  const closeOverlay = () => setOverlay(null);

  if (!onboarded) {
    return <OnboardingOverlay onFinish={() => setOnboarded(true)} />;
  }

  // Edge Case 2: FC Login but no wallet
  const needsWalletToo = isFarcasterConnected && !isWalletConnected;

  return (
    <div className={cn(
      "flex flex-col h-full bg-[#F5F0E8] relative overflow-hidden text-left selection:bg-black selection:text-white font-archivo italic",
      needsSwitch && "blur-[2px]"
    )}>

      {/* Chain Guard Overlay */}
      {needsSwitch && (
        <div className="absolute inset-0 z-[100] bg-black/40 flex items-center justify-center p-8 font-archivo italic">
          <div className="neo-card bg-[#FF4D4D] p-8 space-y-6 text-center rotate-[-1deg] neo-shadow border-3 border-black">
            <Network size={48} className="mx-auto text-white" />
            <h2 className="text-3xl font-black text-white italic leading-none">WRONG NETWORK</h2>
            <p className="text-white font-bold uppercase text-xs italic">VAULTA only runs on Base. Please switch your wallet to continue.</p>
            <button
              onClick={switchToBase}
              className="bg-black text-[#FFE500] w-full h-16 text-lg font-black uppercase italic border-3 border-black shadow-[4px_4px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none"
            >
              Switch to Base
            </button>
          </div>
        </div>
      )}

      <header className="px-6 py-4 flex justify-between items-center bg-white border-b-3 border-black z-40 relative font-archivo italic shrink-0">
        <div className="flex items-center gap-2 font-archivo italic text-left">
          <Zap className="text-black fill-[#FFE500]" size={24} />
          <span className="font-black text-xl tracking-tighter italic">VAULTA</span>
        </div>
        <div className="flex items-center gap-3 italic">
          {(isOffline || streakStale || notifyStale) && (
            <div className="bg-[#FFE500] text-black px-2 py-1 text-[8px] font-black uppercase italic flex items-center gap-1 border-2 border-black neo-shadow-sm">
              <Loader2 size={10} className="animate-spin" /> SYNC
            </div>
          )}
          <ConnectButton />
        </div>
      </header>

      {/* Content Area */}
      <div className={cn(
        "flex-1 overflow-y-auto scrollbar-hide pb-24 px-6 pt-8 font-archivo italic",
        (!isFullyConnected || needsWalletToo) && "pointer-events-none grayscale opacity-40 blur-[2px] transition-all"
      )}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -10, opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="h-full"
          >
            {activeTab === 'Home' && <HomeScreen onDeposit={() => openOverlay('deposit')} onSpendSave={() => openOverlay('spend-save')} onOpenROSCA={() => openOverlay('rosca')} onOpenNotifications={() => openOverlay('notifications')} />}
            {activeTab === 'Goals' && <GoalsScreen onNewGoal={() => openOverlay('new-goal')} />}
            {activeTab === 'Streaks' && <StreaksScreen onOpenGallery={() => openOverlay('gallery')} onOpenChallenges={() => openOverlay('challenges')} onDeposit={() => openOverlay('deposit')} />}
            {activeTab === 'Yield' && <YieldScreen onWithdraw={() => openOverlay('emergency-withdraw')} onDeposit={() => openOverlay('deposit')} />}
            {activeTab === 'Profile' && <ProfileScreen
              onOpenGifts={() => openOverlay('gifts')}
              onOpenWill={() => openOverlay('will')}
              onOpenSubs={() => openOverlay('subs')}
              onOpenRoundups={() => openOverlay('roundups')}
              onOpenScore={() => openOverlay('score')}
              onOpenHistory={() => openOverlay('history')}
            />}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {celebration && (
          <ConfettiCelebration
            title={celebration.title}
            desc={celebration.desc}
            type={celebration.type}
            data={celebration.data}
            onDismiss={() => setCelebration(null)}
          />
        )}
      </AnimatePresence>

      {/* Connection Masks */}
      {!isFullyConnected && (
        <div className="absolute inset-0 z-30 flex items-center justify-center p-8 bg-black/5 pointer-events-none font-archivo italic">
          <div className="neo-card bg-[#FFE500] p-6 rotate-[-1deg] neo-shadow pointer-events-auto flex flex-col items-center gap-4 text-center border-3 border-black shadow-[4px_4px_0_0_#000] font-archivo italic">
            <Lock size={32} strokeWidth={3} />
            <p className="text-sm font-black uppercase tracking-tight italic text-center">Vault access locked</p>
            <p className="text-[10px] font-bold uppercase opacity-60 italic leading-relaxed text-center">Please connect your wallet or sign in with Farcaster to view your savings.</p>
          </div>
        </div>
      )}

      {needsWalletToo && (
        <div className="absolute inset-0 z-30 flex items-center justify-center p-8 bg-black/5 pointer-events-none font-archivo italic">
          <div className="neo-card bg-[#FF4D4D] p-6 rotate-[1deg] neo-shadow pointer-events-auto flex flex-col items-center gap-4 text-center border-3 border-black shadow-[4px_4px_0_0_#000] text-white font-archivo italic">
            <Wallet size={32} strokeWidth={3} />
            <p className="text-sm font-black uppercase tracking-tight italic text-center text-white">CONNECT WALLET TOO</p>
            <p className="text-[10px] font-bold uppercase opacity-80 italic leading-relaxed text-center text-white">Farcaster is for social, but your vault needs a wallet to sign transactions.</p>
            <ConnectButton />
          </div>
        </div>
      )}

      {/* Overlays */}
      <AnimatePresence>
        {overlay && (
          <OverlayWrapper title={overlay.replace('-', ' ')} onClose={closeOverlay}>
            <div className="flex-1 flex flex-col py-10 italic text-left font-archivo italic">
              {overlay === 'deposit' && <DepositFlowOverlay onClose={closeOverlay} onCelebration={setCelebration} />}
              {overlay === 'spend-save' && <SpendSaveOverlay onClose={closeOverlay} />}
              {overlay === 'rosca' && <ROSCAOverlay onClose={closeOverlay} />}
              {overlay === 'notifications' && <NotificationsOverlay onClose={closeOverlay} />}
              {overlay === 'new-goal' && <GoalCreationOverlay onClose={closeOverlay} onCelebration={setCelebration} />}
              {overlay === 'gallery' && <BadgeGalleryOverlay onClose={closeOverlay} />}
              {overlay === 'challenges' && <ChallengesOverlay onClose={closeOverlay} />}
              {overlay === 'emergency-withdraw' && <EmergencyWithdrawOverlay onClose={closeOverlay} />}
              {overlay === 'gifts' && <YieldGiftingOverlay onClose={closeOverlay} />}
              {overlay === 'will' && <SavingsWillOverlay onClose={closeOverlay} />}
              {overlay === 'subs' && <YieldSubscriptionsOverlay onClose={closeOverlay} />}
              {overlay === 'roundups' && <RoundUpSavingsOverlay onClose={closeOverlay} />}
              {overlay === 'score' && <SavingsScoreOverlay onClose={closeOverlay} />}
              {overlay === 'history' && <HistoryOverlay onClose={closeOverlay} />}
              {!['deposit', 'spend-save', 'rosca', 'notifications', 'new-goal', 'gallery', 'challenges', 'emergency-withdraw', 'gifts', 'will', 'subs', 'roundups', 'score', 'history'].includes(overlay) && (
                <div className="p-20 text-center space-y-6 italic font-archivo italic">
                  <h2 className="text-3xl font-black uppercase italic text-center">{overlay.replace('-', ' ')}</h2>
                  <p className="text-sm font-bold uppercase opacity-40 italic text-center">Interactive Module Development in Progress...</p>
                  <button onClick={closeOverlay} className="neo-button px-8 py-3 bg-[#FFE500] text-[10px] font-black uppercase italic">Back to Terminal</button>
                </div>
              )}
            </div>
          </OverlayWrapper>
        )}
      </AnimatePresence>

      <nav className="absolute bottom-0 w-full h-24 bg-white border-t-4 border-black flex items-center justify-around px-2 z-50 font-archivo italic text-left pb-4 shadow-[0_-10px_20px_rgba(0,0,0,0.1)]">
        <TabItem icon={HomeIcon} label="Home" active={activeTab === 'Home'} onClick={() => { setActiveTab('Home'); setOverlay(null); }} />
        <TabItem icon={Target} label="Goals" active={activeTab === 'Goals'} onClick={() => { setActiveTab('Goals'); setOverlay(null); }} />
        <TabItem icon={Flame} label="Streaks" active={activeTab === 'Streaks'} onClick={() => { setActiveTab('Streaks'); setOverlay(null); }} />
        <TabItem icon={DollarSign} label="Yield" active={activeTab === 'Yield'} onClick={() => { setActiveTab('Yield'); setOverlay(null); }} />
        <TabItem icon={User} label="Profile" active={activeTab === 'Profile'} onClick={() => { setActiveTab('Profile'); setOverlay(null); }} />
      </nav>
    </div>
  );
}

function HomeScreen({ onDeposit, onSpendSave, onOpenROSCA, onOpenNotifications }: any) {
  const { totalValueUSD, isLoading } = useUserPosition();
  const { currentStreak, isAtRisk } = useStreaks();
  const { unreadCount } = useNotifications();

  return (
    <div className="space-y-8 animate-in fade-in duration-500 text-left italic font-archivo">
      <section className="space-y-1 font-archivo italic text-left italic">
        <div className="flex justify-between items-start italic text-left">
          <div className="italic text-left">
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest italic font-archivo text-left italic">Total Savings</p>
            <h2 className="text-[52px] font-black leading-none tracking-tighter italic font-archivo text-left italic">
              {isLoading ? "$----.--" : `$${totalValueUSD.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
            </h2>
          </div>
          <div className="flex flex-col items-end gap-2 italic">
            <div onClick={onOpenNotifications} className="relative cursor-pointer hover:scale-105 active:scale-95 transition-all italic">
              <Bell size={20} strokeWidth={3} />
              {unreadCount > 0 && <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF4D4D] border-2 border-black rounded-full flex items-center justify-center text-[8px] font-black italic">{unreadCount}</div>}
            </div>
            <div className={cn("flex items-center gap-1 px-2 py-1 border-2 border-black text-[8px] font-black italic", isAtRisk ? "bg-[#FF4D4D] text-white animate-pulse" : "bg-[#FFE500]")}>
              <Flame size={10} fill="currentColor" /> {currentStreak}D STREAK
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 font-archivo italic text-left italic">
          <p className="text-[#FF4D4D] font-black text-sm flex items-center gap-0.5 uppercase tracking-tighter italic font-archivo text-left italic">
            <ArrowUp size={14} strokeWidth={4} /> $8.42 this week
          </p>
          <span className="bg-[#C8E6C9] px-3 py-1 rounded-full border-2 border-black text-[9px] font-black tracking-[2px] uppercase font-archivo italic text-left italic">🔥 On Track</span>
        </div>
      </section>

      <div onClick={onSpendSave} className="neo-card neo-shadow bg-[#FFE500] p-6 flex justify-between items-center cursor-pointer active:scale-[0.98] transition-all rotate-[-1deg] border-3 border-black shadow-[4px_4px_0_0_#000] italic text-left group">
        <div className="space-y-1 text-left font-archivo italic text-left">
          <h4 className="text-xl font-black uppercase italic tracking-tighter font-archivo text-left group-hover:underline decoration-2">Spend & Save</h4>
          <p className="text-[9px] font-bold uppercase opacity-60 italic text-left">Unlock liquid capital. Yield repays the loan.</p>
        </div>
        <div className="bg-black text-[#FFE500] px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest italic font-archivo text-left group-hover:scale-110 transition-transform">Zero Interest</div>
      </div>

      <button onClick={onDeposit} className="neo-button w-full h-[64px] bg-black text-[#FFE500] text-lg tracking-[4px] font-black uppercase shadow-[6px_6px_0px_0px_#FFE500] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all italic font-archivo border-3 border-black text-center flex items-center justify-center gap-3">
        <Plus size={24} strokeWidth={4} /> Deposit
      </button>
    </div>
  );
}

function GoalsScreen({ onNewGoal }: any) {
  const { goals, isLoading: goalsLoading } = useGoals();

  return (
    <div className="space-y-8 animate-in fade-in duration-500 font-archivo italic text-left italic">
      <div className="flex justify-between items-end italic text-left italic">
        <h2 className="text-4xl font-black tracking-tighter italic leading-none text-left italic italic">SAVINGS<br />GOALS</h2>
        <button onClick={onNewGoal} className="neo-button p-2 bg-[#FFE500] italic text-left italic"><Plus size={24} strokeWidth={3} /></button>
      </div>

      <div className="space-y-6 italic italic">
        {goals.length === 0 && !goalsLoading ? (
          <div className="neo-card p-12 border-dashed border-zinc-300 text-center space-y-6 italic italic">
            <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto border-2 border-black border-dashed italic italic">
              <Target size={32} className="opacity-20 italic" />
            </div>
            <div className="space-y-1 italic text-center italic">
              <h3 className="text-xl font-black uppercase italic italic text-center">NO GOALS YET</h3>
              <p className="text-[10px] font-bold uppercase opacity-40 italic italic text-center">Set a target to start earning bonus CRED.</p>
            </div>
            <button onClick={onNewGoal} className="neo-button px-8 py-3 bg-[#FFE500] text-[10px] shadow-[4px_4px_0_0_#000] italic italic">CREATE FIRST GOAL</button>
          </div>
        ) : (
          goals.map((g: any, i: number) => (
            <GoalCard
              key={g._id}
              title={g.name}
              target={g.targetAmount}
              current={g.currentAmount}
              color={i % 2 === 0 ? "#FFE500" : "#FF4D4D"}
              icon={Globe}
              tag={g.status === 'active' ? 'Grinder Vibe' : 'Completed'}
              rotate={i % 2 === 0 ? "-1deg" : "1deg"}
            />
          ))
        )}
      </div>

      <div className="neo-card bg-black text-white p-6 space-y-4 italic text-left italic">
        <div className="flex justify-between items-center italic text-left italic">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#FFE500] italic text-left italic">AI Optimizer</p>
          <TrendingUp size={16} className="text-[#FFE500] italic" />
        </div>
        <p className="text-xs font-bold leading-relaxed italic opacity-80 text-left italic">Based on your yield, you'll hit your goals faster by maintaining a streak. Keep saving!</p>
      </div>
    </div>
  );
}

function GoalCard({ title, target, current, color, icon: Icon, tag, rotate = "-1deg" }: any) {
  const progress = (current / target) * 100;

  return (
    <div className="neo-card neo-shadow border-3 border-black p-5 space-y-4 transition-all active:scale-[0.98] italic text-left italic" style={{ transform: `rotate(${rotate})` }}>
      <div className="flex justify-between items-start italic text-left italic">
        <div className="space-y-1 italic text-left italic">
          <p className="text-[8px] font-black uppercase tracking-widest opacity-40 italic text-left italic italic">{tag}</p>
          <h4 className="text-xl font-black italic uppercase tracking-tight text-left italic italic">{title}</h4>
        </div>
        <div className="p-2 border-2 border-black italic italic" style={{ backgroundColor: color }}>
          <Icon size={18} />
        </div>
      </div>

      <div className="space-y-2 italic text-left italic">
        <div className="flex justify-between items-end italic text-left italic">
          <p className="text-2xl font-black italic text-left italic italic">${current.toLocaleString()}</p>
          <p className="text-[10px] font-black opacity-40 italic text-left italic italic">OF ${target.toLocaleString()}</p>
        </div>
        <div className="h-4 bg-zinc-100 border-2 border-black relative overflow-hidden italic italic">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="absolute inset-y-0 left-0 border-r-2 border-black italic italic"
            style={{ backgroundColor: color }}
          />
        </div>
      </div>
    </div>
  );
}

function StreaksScreen({ onOpenGallery, onOpenChallenges, onDeposit }: any) {
  const { currentStreak, longestStreak, totalDeposits } = useStreaks();

  return (
    <div className="space-y-8 animate-in fade-in duration-500 font-archivo italic text-left italic">
      <div className="flex justify-between items-start italic text-left italic">
        <div className="space-y-1 italic text-left italic">
          <p className="text-[10px] font-black uppercase tracking-widest opacity-40 italic text-left italic italic">Active Streak</p>
          <h2 className="text-6xl font-black tracking-tighter italic leading-none text-left italic italic">{currentStreak} DAYS</h2>
        </div>
        <div className={cn("p-4 border-3 border-black neo-shadow rotate-[5deg] italic italic", currentStreak > 0 ? "bg-[#FFE500]" : "bg-zinc-100 opacity-20")}>
          <Flame size={32} strokeWidth={3} />
        </div>
      </div>

      {totalDeposits === 0 ? (
        <div className="neo-card p-12 text-center space-y-6 italic italic">
          <h3 className="text-2xl font-black uppercase italic leading-none text-center italic italic">START YOUR STREAK</h3>
          <p className="text-[10px] font-bold uppercase opacity-40 leading-relaxed italic text-center italic italic">Deposit daily to build your savings momentum and unlock legendary badges.</p>
          <button onClick={onDeposit} className="neo-button w-full h-14 bg-[#FFE500] text-sm shadow-[4px_4px_0_0_#000] italic italic">MAKE FIRST DEPOSIT</button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 italic text-center italic">
          <button onClick={onOpenGallery} className="neo-card flex flex-col items-center justify-center p-6 gap-3 active:bg-[#FFE500] transition-colors italic italic">
            <Award size={32} />
            <span className="text-[10px] font-black uppercase italic italic">Badge Gallery</span>
          </button>
          <button onClick={onOpenChallenges} className="neo-card flex flex-col items-center justify-center p-6 gap-3 active:bg-[#FFE500] transition-colors italic italic">
            <Trophy size={32} />
            <span className="text-[10px] font-black uppercase italic italic">Challenges</span>
          </button>
        </div>
      )}

      <div className="space-y-4 italic text-left italic">
        <div className="flex justify-between items-center italic text-left italic">
          <label className="text-[10px] font-black uppercase tracking-widest opacity-60 italic text-left italic italic">Stats</label>
        </div>
        <div className="grid grid-cols-2 gap-4 italic italic">
          <div className="neo-card p-4 italic text-left italic">
            <p className="text-[8px] font-black uppercase opacity-40 text-left italic italic">Longest</p>
            <p className="text-xl font-black italic text-left italic italic">{longestStreak} DAYS</p>
          </div>
          <div className="neo-card p-4 italic text-left italic">
            <p className="text-[8px] font-black uppercase opacity-40 text-left italic italic">Total Saves</p>
            <p className="text-xl font-black italic text-left italic italic">{totalDeposits}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function YieldScreen({ onWithdraw, onDeposit }: any) {
  const { totalValueUSD, vaults, isLoading } = useUserPosition();

  if (totalValueUSD === 0 && !isLoading) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500 font-archivo italic text-left italic">
        <section className="space-y-1 italic text-left italic">
          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest italic text-left italic italic">Projected Yield</p>
          <h2 className="text-[52px] font-black leading-none tracking-tighter italic text-left text-zinc-300 italic italic">$0.00</h2>
        </section>

        <div className="neo-card bg-[#FFE500] p-8 space-y-6 rotate-[-1deg] neo-shadow border-3 border-black italic text-left italic">
          <TrendingUp size={48} strokeWidth={3} className="italic" />
          <div className="space-y-2 italic text-left italic">
            <h3 className="text-2xl font-black uppercase italic leading-none text-left italic italic">DEPOSIT TO SEE YOUR YIELD</h3>
            <p className="text-xs font-bold uppercase opacity-80 leading-relaxed text-left italic italic">Current engine average: <span className="underline italic italic">14.2% APY</span> across Morpho & Pendle strategies.</p>
          </div>
          <button onClick={onDeposit} className="neo-button w-full h-14 bg-black text-[#FFE500] text-sm shadow-[4px_4px_0_0_#FFE500] italic italic">START EARNING</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 font-archivo italic text-left italic">
      <section className="space-y-1 italic text-left italic">
        <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest italic text-left italic italic">Live Yielding</p>
        <h2 className="text-[52px] font-black leading-none tracking-tighter italic text-left italic italic">${totalValueUSD.toFixed(2)}</h2>
        <div className="flex items-center gap-2 italic text-left italic">
          <div className="w-2 h-2 rounded-full bg-[#00FF00] animate-pulse italic italic" />
          <span className="text-[9px] font-black uppercase tracking-widest italic text-left italic italic">Allocated across 14 strategies</span>
        </div>
      </section>

      <div className="space-y-4 italic text-left italic">
        <label className="text-[10px] font-black uppercase tracking-widest opacity-60 italic text-left italic italic">Engine Status</label>
        <div className="space-y-2 italic text-left italic">
          {isLoading ? (
            [1, 2, 3].map(i => <div key={i} className="neo-card h-20 bg-zinc-100 animate-pulse italic text-left italic" />)
          ) : (
            vaults.map((v) => (
              <div key={v.vault} className="neo-card flex items-center justify-between p-4 italic text-left italic">
                <div className="flex items-center gap-4 italic text-left italic italic">
                  <div className="w-10 h-10 bg-black text-[#FFE500] flex items-center justify-center font-black italic text-xs border-2 border-black italic text-center italic">
                    {v.vault.slice(2)}
                  </div>
                  <div className="italic text-left italic">
                    <p className="text-xs font-black uppercase italic text-left italic italic">{v.vault}</p>
                    <p className="text-[9px] font-bold uppercase opacity-40 text-left italic italic">Morpho • Pendle • Tokemak</p>
                  </div>
                </div>
                <div className="text-right italic text-right italic">
                  <p className="text-sm font-black italic text-right italic italic">${v.assetValue.toFixed(2)}</p>
                  <p className="text-[9px] font-black text-[#FF4D4D] uppercase italic text-right italic italic">14.2% APY</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="neo-card bg-[#FFE500] rotate-[-1deg] neo-shadow border-3 border-black p-6 space-y-4 italic text-left italic">
        <div className="flex justify-between items-start italic text-left italic">
          <ShieldAlert size={24} className="italic" />
          <p className="text-[10px] font-black uppercase italic text-left italic italic">Liquidity Notice</p>
        </div>
        <p className="text-[10px] font-bold uppercase leading-relaxed italic text-left italic italic">YO optimizes for yield, meaning some funds are in 7-day withdrawal queues. Use Emergency Withdraw for instant access (1% fee).</p>
        <button onClick={onWithdraw} className="w-full h-10 bg-black text-[#FFE500] text-[10px] font-black uppercase italic border-2 border-black text-left italic italic">Emergency Withdraw</button>
      </div>
    </div>
  );
}

function ProfileScreen({ onOpenGifts, onOpenWill, onOpenSubs, onOpenRoundups, onOpenScore, onOpenHistory }: any) {
  const { displayName, avatar, disconnect } = useVaultaAuth();
  const { totalValueUSD, isLoading } = useUserPosition();
  const { userRank } = useLeaderboard();

  return (
    <div className="space-y-8 animate-in fade-in duration-500 font-archivo italic text-left italic">
      <div className="flex items-center gap-6 italic text-left italic">
        <div className="w-20 h-20 bg-[#FFE500] border-3 border-black neo-shadow flex items-center justify-center overflow-hidden italic italic">
          {avatar ? (
            <img src={avatar} alt="PFP" className="w-full h-full object-cover italic italic" />
          ) : (
            <User size={40} className="italic" />
          )}
        </div>
        <div className="italic text-left italic">
          <h3 className="text-2xl font-black italic text-left italic italic">{displayName}</h3>
          <p className="text-[10px] font-black uppercase opacity-40 italic text-left italic italic">Elite Saver • Rank #{userRank || '?'}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 italic text-left italic">
        <div onClick={onOpenScore} className="neo-card bg-black text-[#FFE500] p-4 space-y-1 cursor-pointer italic text-left italic">
          <p className="text-[8px] font-black uppercase opacity-60 italic text-left italic italic text-left">Savings Score</p>
          <p className="text-2xl font-black italic text-left italic italic">842</p>
        </div>
        <div onClick={onOpenHistory} className="neo-card p-4 space-y-1 cursor-pointer italic text-left italic">
          <p className="text-[8px] font-black uppercase opacity-40 italic text-left italic italic">Total Balance</p>
          <p className="text-2xl font-black italic text-left italic italic">
            {isLoading ? "$----.--" : `$${totalValueUSD.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
          </p>
        </div>
      </div>

      <div className="space-y-3 italic text-left italic">
        <label className="text-[10px] font-black uppercase tracking-widest opacity-60 italic text-left italic italic">Intelligence Layer</label>
        <div className="space-y-2 italic text-left italic">
          <ProfileMenuItem icon={Gift} label="Yield Gifting" desc="Queen, Family, Charities" onClick={onOpenGifts} />
          <ProfileMenuItem icon={Skull} label="Savings Will" desc="Automatic Inheritance" onClick={onOpenWill} />
          <ProfileMenuItem icon={RefreshCcw} label="Round-ups" desc="Save while you spend" onClick={onOpenRoundups} />
          <ProfileMenuItem icon={History} label="History" desc="All transactions" onClick={onOpenHistory} />
        </div>
      </div>

      <button onClick={disconnect} className="w-full text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-all py-4 italic text-center italic italic">
        Disconnect Session
      </button>
    </div>
  );
}

function ProfileMenuItem({ icon: Icon, label, desc, onClick }: any) {
  return (
    <div onClick={onClick} className="neo-card flex items-center justify-between cursor-pointer active:scale-[0.99] transition-all italic text-left italic">
      <div className="flex items-center gap-4 italic text-left italic italic">
        <div className="p-2 bg-[#F5F0E8] border-2 border-black italic text-center italic">
          <Icon size={18} className="italic" />
        </div>
        <div className="italic text-left italic">
          <p className="text-xs font-black uppercase italic text-left italic italic">{label}</p>
          <p className="text-[9px] font-bold uppercase opacity-40 italic text-left italic italic">{desc}</p>
        </div>
      </div>
      <ChevronRight size={16} opacity={0.4} className="italic" />
    </div>
  );
}

function DepositFlowOverlay({ onClose, onCelebration }: { onClose: () => void, onCelebration: any }) {
  const [amount, setAmount] = useState('');
  const [selectedVault, setSelectedVault] = useState<any>('yoUSD');
  const { deposit, depositState, txHash, error: depositError } = useDeposit();
  const { totalValueUSD } = useUserPosition();
  const { goals, completeGoal } = useGoals();
  const [success, setSuccess] = useState(false);

  const handleDeposit = async () => {
    if (!amount || parseFloat(amount) <= 0) return;
    const amountBigInt = BigInt(Math.floor(parseFloat(amount) * 1e6));

    try {
      const result = await deposit(selectedVault, amountBigInt, goals, totalValueUSD);
      setSuccess(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('vaulta_last_tx', Date.now().toString());
      }

      if (result?.newBadges && result.newBadges.length > 0) {
        const badge = result.newBadges[0];
        onCelebration({
          title: 'NEW BADGE!',
          desc: `YOU UNLOCKED THE ${badge.badgeType.toUpperCase()} BADGE!`,
          type: 'badge',
          data: { badgeName: badge.badgeType.toUpperCase() }
        });
      }

      const amountNum = parseFloat(amount);
      const newTotal = totalValueUSD + amountNum;
      const activeGoal = goals.find((g: any) => g.status === 'active');
      if (activeGoal && newTotal >= activeGoal.targetAmount) {
        await completeGoal(activeGoal._id);
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (success && txHash) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-6 text-center font-archivo italic italic">
        <div className="w-20 h-20 bg-[#C8E6C9] border-3 border-black neo-shadow flex items-center justify-center rotate-[5deg] italic text-center italic">
          <CheckCircle2 size={40} className="italic" />
        </div>
        <h2 className="text-4xl font-black italic text-center italic text-center italic italic">DEPOSIT<br />SUCCESSFUL</h2>
        <p className="text-sm font-bold uppercase opacity-60 italic text-center italic text-center italic italic">You just grew your vault by ${amount}.</p>
        <div className="neo-card w-full text-[10px] font-mono break-all p-4 bg-white italic text-left italic italic">
          TX: {txHash}
        </div>
        <button onClick={onClose} className="neo-button w-full h-16 bg-[#FFE500] text-lg font-black uppercase italic italic">Awesome</button>
      </div>
    );
  }

  const isPending = depositState === 'approving' || depositState === 'depositing';
  const buttonText = depositState === 'approving' ? 'APPROVING...' :
    depositState === 'depositing' ? 'DEPOSITING...' :
      `Confirm Deposit $${amount || '0'}`;

  return (
    <div className="flex flex-col gap-6 font-archivo italic text-left italic">
      <div className="space-y-4 italic text-left italic italic">
        <label className="text-[10px] font-black uppercase tracking-widest opacity-60 text-left italic italic italic">Select Vault</label>
        <div className="grid grid-cols-3 gap-2 italic italic">
          {['yoUSD', 'yoETH', 'yoBTC'].map(v => (
            <button
              key={v}
              onClick={() => setSelectedVault(v)}
              className={cn(
                "neo-button h-12 text-[10px] flex items-center justify-center italic transition-all italic",
                selectedVault === v ? "bg-[#FFE500]" : "bg-white"
              )}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 italic text-left italic italic">
        <label className="text-[10px] font-black uppercase tracking-widest opacity-60 text-left italic italic italic">Amount (USDC)</label>
        <div className="relative italic italic text-left italic">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full h-20 bg-white border-3 border-black text-4xl font-black px-4 italic focus:outline-none neo-shadow-sm text-left italic italic italic"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-black opacity-40 italic italic italic">USDC</span>
        </div>
      </div>

      <div className="neo-card bg-[#FFE500]/20 border-black/10 p-4 rotate-[0.5deg] italic text-left italic italic">
        <div className="flex justify-between items-center italic text-left italic italic">
          <span className="text-[10px] font-black uppercase opacity-60 italic text-left italic italic">Est. Daily Yield</span>
          <span className="text-sm font-black text-[#FF4D4D] italic text-right italic italic">+$0.12</span>
        </div>
      </div>

      <div className="mt-auto space-y-4 italic text-center italic italic">
        {depositError && <p className="text-[10px] font-black text-[#FF4D4D] uppercase text-center italic italic italic italic">{depositError}</p>}
        <button
          onClick={handleDeposit}
          disabled={isPending}
          className="neo-button w-full h-16 bg-[#FFE500] text-lg font-black uppercase italic shadow-[6px_6px_0_0_#000] flex items-center justify-center gap-2 italic italic"
        >
          {isPending && <Loader2 className="animate-spin" size={20} />}
          {buttonText}
        </button>
      </div>
    </div>
  );
}

function SpendSaveOverlay({ onClose }: { onClose: () => void }) {
  const { totalValueUSD } = useUserPosition();
  const maxAdvance = totalValueUSD * 0.8;

  return (
    <div className="flex flex-col gap-8 font-archivo italic text-left italic">
      <div className="space-y-2 italic text-left italic italic">
        <p className="text-[10px] font-black uppercase tracking-widest opacity-60 italic text-left italic italic">The "Self-Repaying" Loan</p>
        <h2 className="text-4xl font-black tracking-tighter italic text-left italic italic">SPEND NOW.<br />SAVE LATER.</h2>
      </div>

      <div className="space-y-4 italic text-left italic italic">
        <div className="neo-card flex flex-col gap-4 italic text-left italic italic">
          <div className="flex justify-between items-start italic text-left italic italic">
            <div className="italic text-left italic italic">
              <p className="text-[10px] font-black uppercase opacity-40 italic text-left italic italic italic">Max Advance</p>
              <p className="text-3xl font-black italic text-left italic italic italic">${maxAdvance.toFixed(2)}</p>
            </div>
            <Zap className="fill-[#FFE500] italic" />
          </div>
          <div className="h-2 bg-zinc-100 border-2 border-black relative italic text-left italic italic">
            <div className="absolute inset-y-0 left-0 bg-[#FFE500] w-2/3 border-r-2 border-black italic text-left italic italic" />
          </div>
          <p className="text-[9px] font-bold uppercase opacity-60 italic text-left italic italic">Repayment powered by your daily yield from Morpho & Pendle.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 italic text-center italic italic">
        <div className="neo-card rotate-[-1deg] text-center italic italic">
          <p className="text-[10px] font-black uppercase opacity-40 italic text-center italic italic italic">Repayment Time</p>
          <p className="text-xl font-black italic text-center italic italic italic">~124 Days</p>
        </div>
        <div className="neo-card rotate-[1deg] text-center italic italic">
          <p className="text-[10px] font-black uppercase opacity-40 italic text-center italic italic italic">APR</p>
          <p className="text-xl font-black italic text-center italic italic italic">0%</p>
        </div>
      </div>

      <button className="neo-button w-full h-16 bg-[#FFE500] text-lg font-black uppercase italic shadow-[6px_6px_0_0_#000] mt-auto italic italic">
        Unlock ${maxAdvance.toFixed(0)}
      </button>
    </div>
  );
}

function ROSCAOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col gap-6 font-archivo italic text-left italic">
      <div className="space-y-2 italic text-left italic italic text-left">
        <p className="text-[10px] font-black uppercase tracking-widest opacity-60 italic text-left italic italic italic text-left">Decentralized Savings Circles</p>
        <h2 className="text-4xl font-black tracking-tighter italic text-left italic italic text-left">SAVINGS<br />ROUNDS</h2>
      </div>

      <div className="space-y-4 italic text-left italic italic">
        <div className="neo-card p-0 overflow-hidden italic text-left italic italic">
          <div className="bg-black text-white p-3 flex justify-between items-center italic text-left italic italic italic">
            <span className="text-[10px] font-black uppercase tracking-widest italic text-left italic italic italic">Live Circle: Base Builders</span>
            <Users size={16} className="italic" />
          </div>
          <div className="p-4 space-y-4 italic text-left italic italic">
            <div className="flex justify-between items-end italic text-left italic italic">
              <div className="italic text-left italic italic">
                <p className="text-[10px] font-black uppercase opacity-40 italic text-left italic italic italic">Pool Amount</p>
                <p className="text-2xl font-black italic text-left italic italic italic">$5,000</p>
              </div>
              <div className="text-right italic text-right italic italic">
                <p className="text-[10px] font-black uppercase opacity-40 italic text-right italic italic italic">Next Winner In</p>
                <p className="text-sm font-black italic text-right italic italic italic">3d 12h</p>
              </div>
            </div>
            <div className="flex -space-x-2 italic text-left italic italic">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-[#FFE500] flex items-center justify-center text-[10px] font-black italic italic">
                  {i}
                </div>
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-black bg-white flex items-center justify-center text-[10px] font-black italic italic">
                +8
              </div>
            </div>
          </div>
        </div>
      </div>

      <button className="neo-button w-full h-14 bg-white text-sm font-black uppercase italic italic italic">
        Join Circle
      </button>
      <button className="neo-button w-full h-14 bg-[#FFE500] text-sm font-black uppercase italic shadow-[4px_4px_0_0_#000] italic italic">
        Start New Round
      </button>
    </div>
  );
}

function GoalCreationOverlay({ onClose, onCelebration }: { onClose: () => void, onCelebration: any }) {
  const [name, setName] = useState('');
  const [target, setTarget] = useState('');
  const { createGoal, syncProgress } = useGoals();
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = async () => {
    if (!name || !target) return;
    setIsCreating(true);
    try {
      await createGoal(name, '🎯', parseFloat(target), Date.now() + 30 * 24 * 60 * 60 * 1000, 'yoUSD');
      await syncProgress();
      onClose();
    } catch (e) {
      console.error(e);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 font-archivo italic text-left italic">
      <div className="space-y-4 italic text-left italic italic text-left">
        <label className="text-[10px] font-black uppercase tracking-widest opacity-60 text-left italic italic italic text-left">Goal Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. New Macbook Pro"
          className="w-full h-16 bg-white border-3 border-black text-xl font-black px-4 italic focus:outline-none neo-shadow-sm text-left italic italic text-left italic"
        />
      </div>

      <div className="space-y-4 italic text-left italic italic text-left">
        <label className="text-[10px] font-black uppercase tracking-widest opacity-60 text-left italic italic italic text-left">Target Amount</label>
        <input
          type="number"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder="$ 2,500"
          className="w-full h-16 bg-white border-3 border-black text-xl font-black px-4 italic focus:outline-none neo-shadow-sm text-left italic italic text-left italic"
        />
      </div>

      <div className="space-y-4 italic text-left italic italic text-left">
        <label className="text-[10px] font-black uppercase tracking-widest opacity-60 text-left italic italic italic text-left">Vibe Selection</label>
        <div className="grid grid-cols-2 gap-4 italic italic text-left">
          <button className="neo-card border-2 border-black bg-[#FFE500] p-4 text-left space-y-2 italic text-left italic italic">
            <Flame size={20} className="italic" />
            <p className="text-xs font-black uppercase italic text-left italic italic text-left">The Grinder</p>
            <p className="text-[8px] font-bold uppercase opacity-60 italic text-left italic italic text-left">High-intensity streaks & challenges.</p>
          </button>
          <button className="neo-card border-2 border-black p-4 text-left space-y-2 opacity-40 hover:opacity-100 transition-all italic text-left italic italic">
            <Moon size={20} className="italic" />
            <p className="text-xs font-black uppercase italic text-left italic italic text-left">Zen Saver</p>
            <p className="text-[8px] font-bold uppercase opacity-60 italic text-left italic italic text-left">Set and forget. Auto-allocations.</p>
          </button>
        </div>
      </div>

      <button
        onClick={handleCreate}
        disabled={isCreating}
        className="neo-button w-full h-16 bg-[#FFE500] text-lg font-black uppercase italic shadow-[6px_6px_0_0_#000] mt-auto flex items-center justify-center gap-2 italic italic"
      >
        {isCreating && <Loader2 className="animate-spin" size={20} />}
        Create Goal
      </button>
    </div>
  );
}

function YieldGiftingOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col gap-6 font-archivo italic text-left italic">
      <div className="space-y-2 italic text-left italic italic text-left">
        <p className="text-[10px] font-black uppercase tracking-widest opacity-60 italic text-left italic italic italic text-left">Share the wealth</p>
        <h2 className="text-4xl font-black tracking-tighter italic text-left italic italic text-left">YIELD<br />GIFTING</h2>
      </div>

      <div className="neo-card space-y-4 bg-[#FF4D4D]/10 italic text-left italic italic text-left">
        <div className="flex items-center gap-4 italic text-left italic italic text-left italic">
          <div className="w-12 h-12 bg-black flex items-center justify-center border-2 border-black italic italic">
            <Gift className="text-[#FFE500] italic" size={24} />
          </div>
          <div className="italic text-left italic italic text-left italic">
            <p className="text-[10px] font-black uppercase opacity-40 italic text-left italic italic italic italic">Active Gift</p>
            <p className="text-lg font-black italic text-left italic italic italic italic">50% of Daily Yield</p>
          </div>
        </div>
        <p className="text-[10px] font-bold uppercase opacity-60 italic text-left italic italic italic italic">You are currently gifting half of your daily earnings to <span className="text-black font-black underline italic italic text-left">@queen.eth</span></p>
      </div>

      <div className="space-y-4 italic text-left italic italic text-left italic">
        <label className="text-[10px] font-black uppercase tracking-widest opacity-60 text-left italic italic italic italic text-left">Recipient (Address or Farcaster)</label>
        <div className="relative italic text-left italic italic text-left italic">
          <input
            placeholder="Search name or 0x..."
            className="w-full h-14 bg-white border-3 border-black text-sm font-black px-4 italic focus:outline-none neo-shadow-sm text-left italic italic italic text-left italic"
          />
          <UserPlus className="absolute right-4 top-1/2 -translate-y-1/2 opacity-40 italic italic" size={18} />
        </div>
      </div>

      <div className="space-y-4 italic text-left italic italic text-left italic">
        <label className="text-[10px] font-black uppercase tracking-widest opacity-60 text-left italic italic italic italic text-left">Gift Percentage</label>
        <div className="flex items-center gap-4 italic text-left italic italic text-left italic">
          {[10, 25, 50, 100].map(p => (
            <button key={p} className="neo-button flex-1 h-10 text-[10px] italic bg-white italic">{p}%</button>
          ))}
        </div>
      </div>

      <button className="neo-button w-full h-16 bg-[#FFE500] text-lg font-black uppercase italic shadow-[6px_6px_0_0_#000] mt-auto italic italic">
        Update Gift Rule
      </button>
    </div>
  );
}

function SavingsWillOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col gap-6 font-archivo italic text-left italic">
      <div className="space-y-2 italic text-left italic italic text-left italic">
        <p className="text-[10px] font-black uppercase tracking-widest opacity-60 italic text-left italic italic italic italic text-left">Last Will & Testament</p>
        <h2 className="text-4xl font-black tracking-tighter italic text-left italic italic italic text-left">SAVINGS<br />WILL</h2>
      </div>

      <div className="neo-card bg-black text-[#FFE500] rotate-[-1deg] p-6 space-y-4 italic text-left italic italic text-left italic">
        <div className="flex justify-between items-start italic text-left italic italic text-left italic">
          <Skull size={32} className="italic" />
          <div className="bg-[#FFE500] text-black px-2 py-0.5 text-[9px] font-black uppercase italic text-left italic italic italic text-left">ACTIVE PROTECTION</div>
        </div>
        <p className="text-sm font-black italic text-left italic italic italic text-left">If your account remains inactive for <span className="underline italic italic italic text-left">180 days</span>, your total balance will automatically be distributed to your beneficiaries.</p>
      </div>

      <div className="space-y-4 italic text-left italic italic text-left italic">
        <div className="flex justify-between items-center italic text-left italic italic italic text-left italic">
          <label className="text-[10px] font-black uppercase tracking-widest opacity-60 text-left italic italic italic italic text-left">Beneficiaries</label>
          <Plus size={16} className="italic" />
        </div>
        <div className="space-y-2 italic text-left italic italic text-left italic">
          <div className="neo-card h-14 flex items-center justify-between px-4 italic text-left italic italic italic text-left">
            <div className="flex items-center gap-3 italic text-left italic italic italic text-left italic">
              <div className="w-6 h-6 bg-zinc-100 border-2 border-black italic italic" />
              <span className="text-[10px] font-black italic text-left italic italic italic italic text-left">@queen.eth</span>
            </div>
            <span className="text-[10px] font-black italic text-right italic italic italic text-right italic">80%</span>
          </div>
          <div className="neo-card h-14 flex items-center justify-between px-4 italic text-left italic italic italic text-left">
            <div className="flex items-center gap-3 italic text-left italic italic italic text-left italic">
              <div className="w-6 h-6 bg-zinc-100 border-2 border-black italic italic" />
              <span className="text-[10px] font-black italic text-left italic italic italic italic text-left">0x71C...3A90</span>
            </div>
            <span className="text-[10px] font-black italic text-right italic italic italic text-right italic">20%</span>
          </div>
        </div>
      </div>

      <button className="neo-button w-full h-16 bg-white text-sm font-black uppercase italic shadow-[4px_4px_0_0_#000] mt-auto italic italic">
        Edit Inactivity Trigger
      </button>
    </div>
  );
}

function BadgeGalleryOverlay({ onClose }: { onClose: () => void }) {
  const { badgesEarned } = useStreaks();

  const badgeIcons: any = {
    '4week': { name: '4 Week Streak', icon: Flame, color: '#FFE500' },
    '8week': { name: '8 Week Streak', icon: Flame, color: '#FF4D4D' },
    '12week': { name: '3 Month King', icon: Trophy, color: '#FFE500' },
    '26week': { name: 'Half Year Hero', icon: Award, color: '#C8E6C9' },
    '52week': { name: 'The Eternal', icon: Star, color: '#0A0A0A' },
  };

  const allBadgeTypes = ['4week', '8week', '12week', '26week', '52week'];

  return (
    <div className="flex flex-col gap-6 font-archivo italic text-left italic">
      <div className="space-y-1 italic text-left italic italic text-left italic">
        <p className="text-[10px] font-black uppercase tracking-widest opacity-60 italic text-left italic italic italic italic text-left">Your Achievement Wall</p>
        <h2 className="text-4xl font-black tracking-tighter italic leading-none text-left italic italic italic text-left">THE COLLECTION</h2>
      </div>

      <div className="grid grid-cols-3 gap-4 italic text-left italic italic">
        {allBadgeTypes.map(type => {
          const isUnlocked = badgesEarned.some((b: any) => b.badgeType === type);
          const meta = badgeIcons[type];
          return (
            <div key={type} className={cn(
              "neo-card flex flex-col items-center justify-center p-4 gap-2 border-2 italic text-left italic italic italic text-left",
              !isUnlocked && "grayscale opacity-20 border-dashed italic italic text-left"
            )} style={{ backgroundColor: isUnlocked ? meta.color : 'transparent' }}>
              <meta.icon size={24} className={isUnlocked ? (type === '52week' ? "text-white" : "text-black") : "text-zinc-400"} />
              <span className={cn("text-[7px] font-black uppercase text-center leading-tight italic italic text-center", isUnlocked && type === '52week' ? "text-white" : "text-black")}>{meta.name}</span>
            </div>
          );
        })}
      </div>

      <div className="neo-card bg-black text-[#FFE500] p-6 text-center space-y-2 mt-auto italic text-center italic italic">
        <p className="text-[10px] font-black uppercase italic text-center italic italic italic text-center">Keep your streak to unlock more</p>
        <p className="text-[8px] font-bold uppercase italic opacity-60 text-center italic italic italic text-center text-center">Badges are auto-minted on milestone</p>
      </div>
    </div>
  );
}

function ChallengesOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col gap-6 font-archivo italic text-left italic">
      <div className="space-y-2 italic text-left italic italic text-left italic">
        <p className="text-[10px] font-black uppercase tracking-widest opacity-60 italic text-left italic italic italic italic text-left">Limited Time Events</p>
        <h2 className="text-4xl font-black tracking-tighter italic leading-none text-left italic italic italic text-left">ACTIVE<br />CHALLENGES</h2>
      </div>

      <div className="space-y-4 italic text-left italic italic text-left italic">
        <ChallengeRow
          icon={Zap}
          title="The 4:20 Blitz"
          desc="Deposit exactly $4.20 daily for 7 days"
          reward="+50 Savings Score"
          progress={40}
        />
        <ChallengeRow
          icon={Users}
          title="Gift Circle"
          desc="Send yield to 3 friends via Farcaster"
          reward="Exclusive 'Philanthropist' Badge"
          progress={66}
          color="#FF4D4D"
        />
        <ChallengeRow
          icon={Lock}
          title="Iron Vault"
          desc="No withdrawals for 30 days"
          reward="0% fee on next Spend&Save"
          progress={12}
          color="#C8E6C9"
        />
      </div>
    </div>
  );
}

function ChallengeRow({ icon: Icon, title, desc, reward, progress, color = "#FFE500" }: any) {
  return (
    <div className="neo-card flex flex-col gap-4 border-2 italic text-left italic italic text-left">
      <div className="flex gap-4 italic text-left italic italic text-left italic">
        <div className="w-12 h-12 border-2 border-black flex items-center justify-center shrink-0 italic italic italic text-center" style={{ backgroundColor: color }}>
          <Icon size={24} className="italic" />
        </div>
        <div className="space-y-1 italic text-left italic italic text-left italic">
          <p className="text-sm font-black italic uppercase tracking-tight text-left italic italic italic text-left">{title}</p>
          <p className="text-[9px] font-bold uppercase opacity-40 italic leading-tight text-left italic italic italic text-left">{desc}</p>
          <p className="text-[9px] font-black text-[#FF4D4D] uppercase italic text-left italic italic italic text-left">{reward}</p>
        </div>
      </div>
      <div className="h-2 bg-zinc-100 border-2 border-black relative italic text-left italic italic text-left">
        <div className="absolute inset-y-0 left-0 border-r-2 border-black italic italic italic text-left" style={{ width: `${progress}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

function EmergencyWithdrawOverlay({ onClose }: { onClose: () => void }) {
  const { withdraw, isWithdrawing, error: withdrawError } = useWithdraw();
  const { totalValueUSD, vaults } = useUserPosition();
  const { goals, syncProgress } = useGoals();
  const [txHash, setTxHash] = useState<string | null>(null);
  const [estimatedWait, setEstimatedWait] = useState<number>(0);
  const createNotification = useMutation(api.notifications.createNotification);
  const { convexUser } = useConvexUser();

  useEffect(() => {
    async function checkQueue() {
      try {
        const res = await yoApi.getPendingRedeems(YO_CONTRACTS.vaults.yoUSD);
        setEstimatedWait(res.estimatedWaitMinutes);
      } catch (e) { console.error(e); }
    }
    checkQueue();
  }, []);

  const handleWithdraw = async () => {
    const yoUSDVault = vaults.find(v => v.vault === 'yoUSD');
    if (!yoUSDVault || yoUSDVault.yoTokenBalance === BigInt(0)) return;

    try {
      const hash = await withdraw('yoUSD', yoUSDVault.yoTokenBalance, totalValueUSD);
      if (hash) {
        setTxHash(hash);
        if (typeof window !== 'undefined') {
          localStorage.setItem('vaulta_last_tx', Date.now().toString());
        }

        // Edge Case: Recalculate goal health
        const activeGoal = goals.find((g: any) => g.status === 'active');
        if (activeGoal && convexUser) {
          await syncProgress();
          await createNotification({
            userId: convexUser._id,
            type: 'goal_update',
            title: 'Goal Status Changed',
            message: 'Withdrawal detected. Goal completion date moved.'
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (txHash) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-6 text-center font-archivo italic italic">
        <div className="w-20 h-20 bg-[#FF4D4D] border-3 border-black neo-shadow flex items-center justify-center rotate-[5deg] italic text-center italic">
          <CheckCircle2 size={40} className="text-white italic" />
        </div>
        <h2 className="text-4xl font-black italic text-center italic text-center italic italic italic">WITHDRAWAL<br />COMPLETE</h2>
        <div className="neo-card w-full text-[10px] font-mono break-all p-4 bg-white italic text-left italic italic italic">
          TX: {txHash}
        </div>
        <button onClick={onClose} className="neo-button w-full h-16 bg-black text-white text-lg font-black uppercase italic italic italic">Close</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 font-archivo italic text-left italic">
      <div className="space-y-2 text-center italic text-center italic">
        <div className="w-16 h-16 bg-[#FF4D4D] border-3 border-black neo-shadow mx-auto flex items-center justify-center rotate-[5deg] italic italic text-center italic">
          <ShieldAlert size={32} className="text-white italic" />
        </div>
        <h2 className="text-4xl font-black tracking-tighter italic leading-none mt-4 text-center italic text-center italic italic">EMERGENCY<br />EXIT</h2>
      </div>

      <div className="neo-card border-2 border-[#FF4D4D] bg-[#FF4D4D]/5 p-6 space-y-4 italic text-left italic italic">
        <p className="text-xs font-black uppercase italic leading-relaxed text-left italic italic italic">You are about to bypass the yield-optimization queue. This will incur a <span className="text-[#FF4D4D] underline italic italic italic">1.0% instant-liquidity fee</span>.</p>
        {estimatedWait > 60 && (
          <div className="bg-[#FF4D4D] text-white p-3 border-2 border-black flex items-center gap-3 italic text-left italic italic">
            <AlertCircle size={20} className="italic" />
            <p className="text-[10px] font-black uppercase leading-tight italic text-left italic italic italic">HIGH QUEUE — YOUR WITHDRAWAL MAY TAKE OVER AN HOUR</p>
          </div>
        )}
        <div className="flex justify-between items-center py-2 border-y-2 border-black/10 italic text-left italic italic">
          <span className="text-[10px] font-black uppercase opacity-40 text-left italic italic italic italic">Available Now</span>
          <span className="text-xl font-black italic text-right italic italic italic">$ {totalValueUSD.toFixed(2)}</span>
        </div>
      </div>

      <div className="space-y-4 italic text-left italic italic">
        <label className="text-[10px] font-black uppercase tracking-widest opacity-60 text-left italic italic italic italic italic text-left">Withdraw To</label>
        <div className="neo-card flex items-center justify-between italic text-left italic italic italic text-left">
          <div className="flex items-center gap-3 italic text-left italic italic italic text-left italic">
            <div className="w-6 h-6 bg-[#FFE500] border-2 border-black rounded-full italic italic italic text-center" />
            <span className="text-[10px] font-black italic text-left italic italic italic italic text-left">Connected Wallet (Base)</span>
          </div>
        </div>
      </div>

      <div className="mt-auto space-y-4 italic text-center italic italic">
        {withdrawError && <p className="text-[10px] font-black text-[#FF4D4D] uppercase text-center italic italic italic italic italic">{withdrawError}</p>}
        <button
          onClick={handleWithdraw}
          disabled={isWithdrawing}
          className="neo-button w-full h-16 bg-black text-white text-lg font-black uppercase italic shadow-[6px_6px_0_0_#FF4D4D] flex items-center justify-center gap-2 italic italic italic"
        >
          {isWithdrawing && <Loader2 className="animate-spin" size={20} />}
          {isWithdrawing ? 'PROCESSING...' : 'Burn & Withdraw'}
        </button>
      </div>
    </div>
  );
}

function HistoryOverlay({ onClose }: any) {
  const events = [
    { type: 'DEPOSIT', amount: '+$250.00', date: 'Mar 15, 2026', icon: Download },
    { type: 'YIELD', amount: '+$0.12', date: 'Mar 14, 2026', icon: TrendingUp, color: '#FF4D4D' },
    { type: 'GIFT SENT', amount: '-$0.06', date: 'Mar 14, 2026', icon: Gift },
    { type: 'STREAK BONUS', amount: '+$1.00', date: 'Mar 12, 2026', icon: Flame, color: '#FFE500' },
    { type: 'DEPOSIT', amount: '+$500.00', date: 'Mar 10, 2026', icon: Download },
  ];

  return (
    <div className="flex flex-col gap-6 font-archivo italic text-left italic">
      <h2 className="text-4xl font-black tracking-tighter italic leading-none text-left italic italic italic text-left">ACTIVITY</h2>
      <div className="space-y-3 italic text-left italic italic">
        {events.map((e, i) => (
          <div key={i} className="neo-card flex items-center justify-between p-4 italic text-left italic italic italic text-left">
            <div className="flex items-center gap-4 italic text-left italic italic italic text-left">
              <div className="p-2 border-2 border-black italic text-center italic italic" style={{ backgroundColor: e.color || '#F5F0E8' }}>
                <e.icon size={16} className="italic" />
              </div>
              <div className="italic text-left italic italic italic text-left">
                <p className="text-[10px] font-black uppercase italic text-left italic italic italic italic text-left">{e.type}</p>
                <p className="text-[8px] font-bold uppercase opacity-40 italic text-left italic italic italic italic text-left">{e.date}</p>
              </div>
            </div>
            <span className={cn("text-sm font-black italic text-right italic italic", e.amount.startsWith('+') ? "text-black" : "text-black opacity-40")}>
              {e.amount}
            </span>
          </div>
        ))}
      </div>
      <button className="text-[10px] font-black uppercase tracking-widest opacity-40 py-4 underline italic italic italic">Load More</button>
    </div>
  );
}

function NotificationsOverlay({ onClose }: { onClose: () => void }) {
  const { notifications, markRead } = useNotifications();

  return (
    <div className="flex flex-col gap-6 font-archivo italic text-left italic">
      <h2 className="text-4xl font-black tracking-tighter italic leading-none text-left italic italic italic text-left">ALERTS</h2>
      <div className="space-y-4 italic text-left italic italic">
        {notifications.length === 0 ? (
          <div className="neo-card p-12 text-center opacity-40 italic italic italic text-center">No alerts</div>
        ) : (
          notifications.map((a: any) => (
            <div key={a._id} onClick={() => markRead(a._id)} className={cn("neo-card flex gap-4 p-4 italic cursor-pointer text-left italic italic", !a.read && "border-[#FFE500] italic")}>
              <div className="w-10 h-10 border-2 border-black shrink-0 flex items-center justify-center bg-white italic italic italic text-center">
                <Bell size={20} className="italic" />
              </div>
              <div className="space-y-1 italic text-left italic italic">
                <div className="flex justify-between items-center gap-4 text-left italic italic italic text-left">
                  <p className="text-[10px] font-black uppercase italic text-left italic italic italic italic text-left">{a.title}</p>
                  <span className="text-[8px] font-bold opacity-40 italic whitespace-nowrap text-right italic italic">{new Date(a.createdAt).toLocaleTimeString()}</span>
                </div>
                <p className="text-[9px] font-bold uppercase italic leading-tight text-left italic italic italic text-left">{a.message}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function YieldSubscriptionsOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col gap-6 font-archivo italic text-left italic">
      <div className="space-y-2 italic text-left italic italic italic text-left">
        <p className="text-[10px] font-black uppercase tracking-widest opacity-60 italic text-left italic italic italic italic text-left">Automated Giving</p>
        <h2 className="text-4xl font-black tracking-tighter italic leading-none text-left italic italic italic text-left">YIELD<br />SUBS</h2>
      </div>

      <div className="space-y-4 italic text-left italic italic">
        <div className="neo-card flex items-center justify-between p-4 italic text-left italic italic italic text-left">
          <div className="flex items-center gap-4 italic text-left italic italic italic text-left">
            <div className="w-10 h-10 bg-black flex items-center justify-center border-2 border-black italic italic italic text-center">
              <Zap className="text-[#FFE500] italic" size={20} />
            </div>
            <div className="italic text-left italic italic italic text-left">
              <p className="text-xs font-black uppercase italic text-left italic italic italic italic text-left">Farcaster Pro</p>
              <p className="text-[9px] font-bold uppercase opacity-40 italic text-left italic italic italic italic text-left">5% of Daily Yield</p>
            </div>
          </div>
          <button className="bg-[#FFE500] px-3 py-1 text-[9px] font-black uppercase border-2 border-black italic text-right italic italic">ACTIVE</button>
        </div>

        <div className="neo-card flex items-center justify-between p-4 opacity-40 grayscale italic text-left italic italic">
          <div className="flex items-center gap-4 text-left italic text-left italic italic italic text-left">
            <div className="w-10 h-10 bg-zinc-100 flex items-center justify-center border-2 border-black text-left italic italic italic text-center">
              <Star size={20} className="italic" />
            </div>
            <div className="italic text-left italic italic italic text-left">
              <p className="text-xs font-black uppercase italic text-left italic italic italic italic text-left">Base Guild</p>
              <p className="text-[9px] font-bold uppercase text-left italic italic italic italic italic text-left">10% of Daily Yield</p>
            </div>
          </div>
          <button className="bg-white px-3 py-1 text-[9px] font-black uppercase border-2 border-black italic text-right italic italic">ENABLE</button>
        </div>
      </div>

      <div className="neo-card bg-black text-white p-6 space-y-4 rotate-[1deg] italic text-left italic italic">
        <p className="text-xs font-black italic text-left italic italic italic text-left">Pay for your digital life with yield, not principal. The YO engine covers the cost automatically.</p>
      </div>
    </div>
  );
}

function RoundUpSavingsOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col gap-6 font-archivo italic text-left italic">
      <div className="space-y-2 italic text-left italic italic italic text-left">
        <p className="text-[10px] font-black uppercase tracking-widest opacity-60 italic text-left italic italic italic italic text-left">Passive Accumulation</p>
        <h2 className="text-4xl font-black tracking-tighter italic leading-none text-left italic italic italic text-left">SAVINGS<br />ROUNDUPS</h2>
      </div>

      <div className="neo-card bg-[#FFE500] p-6 space-y-4 neo-shadow border-3 border-black text-left italic text-left italic italic">
        <div className="flex justify-between items-center text-left italic italic text-left italic italic">
          <RefreshCcw size={24} className="italic" />
          <div className="bg-black text-white px-3 py-1 text-[9px] font-black uppercase italic text-right italic italic italic">LIVE MONITORING</div>
        </div>
        <p className="text-sm font-black italic text-left italic italic text-left italic italic text-left">VAULTA watches your Base wallet for transactions and rounds up to the nearest dollar, depositing the difference into your yoUSD vault.</p>
      </div>

      <div className="space-y-4 italic text-left italic italic">
        <div className="flex justify-between items-center italic text-left italic italic italic text-left">
          <span className="text-[10px] font-black uppercase opacity-60 italic text-left italic italic italic italic text-left">Round up to</span>
          <span className="text-sm font-black underline italic text-right italic italic italic italic">$1.00 (Standard)</span>
        </div>
        <div className="flex justify-between items-center italic text-left italic italic italic text-left">
          <span className="text-[10px] font-black uppercase opacity-60 text-left italic italic italic italic italic text-left">Multiplier</span>
          <div className="flex gap-2 italic text-right italic italic italic">
            {['1x', '2x', '5x'].map(m => (
              <button key={m} className={cn("px-3 py-1 text-[9px] font-black border-2 border-black italic italic italic italic", m === '1x' ? "bg-black text-white italic italic" : "bg-white italic italic")}>{m}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-auto space-y-2 text-left italic italic italic">
        <p className="text-[9px] font-bold text-center uppercase opacity-40 italic italic italic italic text-center italic">Saved $12.42 this month via Round-ups</p>
        <button className="neo-button w-full h-14 bg-black text-white text-sm font-black uppercase italic italic italic italic">Save Settings</button>
      </div>
    </div>
  );
}

function SavingsScoreOverlay({ onClose }: { onClose: () => void }) {
  const { totalValueUSD } = useUserPosition();
  const { currentStreak } = useStreaks();

  const score = Math.min(999, Math.floor((totalValueUSD * 0.1) + (currentStreak * 50) + 100));

  return (
    <div className="flex flex-col gap-8 font-archivo italic text-left italic">
      <div className="text-center space-y-4 italic text-center italic">
        <p className="text-[10px] font-black uppercase tracking-[4px] opacity-40 italic text-center italic italic italic text-center">Savings Identity</p>
        <div className="w-40 h-40 border-4 border-black bg-white mx-auto rounded-full flex flex-col items-center justify-center neo-shadow relative italic text-center italic italic">
          <span className="text-6xl font-black italic text-center italic italic italic">{score}</span>
          <span className="text-[10px] font-black uppercase opacity-40 italic text-center italic italic italic text-center">CRED</span>
          <div className="absolute -right-2 top-0 bg-[#FF4D4D] text-white px-2 py-1 text-[8px] font-black italic border-2 border-black italic italic italic">+12</div>
        </div>
      </div>

      <div className="space-y-4 italic text-left italic italic">
        <p className="text-[10px] font-black uppercase tracking-widest opacity-60 italic text-center italic italic italic italic text-center">Score Components</p>
        <div className="space-y-2 italic text-left italic italic">
          <ScoreItem label="Consistency" score={Math.min(100, currentStreak * 10)} />
          <ScoreItem label="Capital" score={Math.min(100, Math.floor(totalValueUSD / 100))} />
          <ScoreItem label="Social Impact" score={45} />
          <ScoreItem label="Risk Management" score={89} />
        </div>
      </div>

      <button className="neo-button w-full h-16 bg-[#FFE500] text-sm font-black uppercase italic shadow-[6px_6px_0_0_#000] italic italic">
        Compare Leaderboard
      </button>
    </div>
  );
}

function ScoreItem({ label, score }: any) {
  return (
    <div className="neo-card flex justify-between items-center h-12 italic text-left italic bg-white/50 border-2">
      <span className="text-[10px] font-black uppercase italic text-left italic italic italic text-left">{label}</span>
      <div className="flex items-center gap-3">
        <div className="w-24 h-2 bg-zinc-100 border-2 border-black relative overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            className="absolute inset-y-0 left-0 bg-[#FFE500]"
          />
        </div>
        <span className={cn("text-xs font-black italic text-right italic italic italic text-right min-w-[3ch]", score > 80 ? "text-[#00FF00]" : "text-black")}>{score}</span>
      </div>
    </div>
  );
}

function YieldAllowanceOverlay() { return null; }
function SavingsMatchingOverlay() { return null; }
function SavingsBondOverlay() { return null; }
function FamilyVaultOverlay() { return null; }
function SettingsOverlay() { return null; }
function ReferralOverlay() { return null; }
function ShareXOverlay() { return null; }
function BadgeDetailOverlay() { return null; }
function ComingSoonBadge() { return null; }
function AllocationRow() { return null; }
