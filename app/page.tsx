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
  Bell
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ConnectButton } from '../src/components/ConnectButton';
import { useVaultaAuth } from '../src/hooks/useVaultaAuth';
import { useChainGuard } from '../src/hooks/useChainGuard';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- BASE COMPONENTS ---

function FeaturePill({ text }: { text: string }) {
    return (
        <div className="w-full border-2 border-white/20 p-4 text-center font-archivo italic">
            <span className="text-white font-black uppercase tracking-[3px] text-sm italic">{text}</span>
        </div>
    );
}

function OnboardingOverlay({ onFinish }: any) {
    return (
        <div className="absolute inset-0 z-[100] bg-black flex flex-col items-center justify-center p-8 space-y-12 animate-in fade-in duration-500 font-archivo italic">
            <h1 className="text-8xl font-black text-[#FFE500] tracking-tighter leading-none italic font-archivo">VAULTA</h1>
            <div className="w-full space-y-4">
                <FeaturePill text="🔥 Savings Streaks" />
                <FeaturePill text="🎁 Yield Gifting" />
                <FeaturePill text="💀 Savings Will" />
            </div>
            <button onClick={onFinish} className="neo-button w-full h-[72px] bg-[#FFE500] text-lg font-black uppercase tracking-widest italic font-archivo shadow-[6px_6px_0_0_#FFF]">Get Started</button>
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
                    <h1 className="text-4xl font-black tracking-tighter uppercase leading-none italic">{title}</h1>
                    <div className="flex items-center gap-4 italic">
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

  const { isFullyConnected } = useVaultaAuth();
  const { needsSwitch, switchToBase } = useChainGuard();

  const openOverlay = (name: string) => setOverlay(name);
  const closeOverlay = () => setOverlay(null);

  if (!onboarded) {
      return <OnboardingOverlay onFinish={() => setOnboarded(true)} />;
  }

  return (
    <div className="flex flex-col h-full bg-[#F5F0E8] relative overflow-hidden text-left selection:bg-black selection:text-white font-archivo italic">
      
      {/* Chain Guard Header */}
      {needsSwitch && (
          <div className="bg-[#FF4D4D] border-b-3 border-black p-2 flex items-center justify-between z-[70] animate-in slide-in-from-top-full italic font-archivo">
              <span className="text-[10px] font-black uppercase text-white px-2 italic">WRONG NETWORK</span>
              <button 
                onClick={switchToBase}
                className="bg-black text-[#FFE500] px-3 py-1 text-[9px] font-black uppercase italic border-2 border-black active:translate-x-0.5 active:translate-y-0.5 font-archivo"
              >
                Switch to Base
              </button>
          </div>
      )}

      {/* App Header */}
      <header className="px-6 py-4 flex justify-between items-center bg-white border-b-3 border-black z-40 relative font-archivo">
          <div className="flex items-center gap-2 font-archivo italic">
              <Zap className="text-black fill-[#FFE500]" size={24} />
              <span className="font-black text-xl tracking-tighter italic">VAULTA</span>
          </div>
          <ConnectButton />
      </header>

      {/* Content Area */}
      <div className={cn(
          "flex-1 overflow-y-auto scrollbar-hide pb-24 px-6 pt-8 font-archivo italic",
          !isFullyConnected && "pointer-events-none grayscale opacity-40 blur-[1px] transition-all"
      )}>
        {activeTab === 'Home' && <HomeScreen onDeposit={() => openOverlay('deposit')} onSpendSave={() => openOverlay('spend-save')} onOpenROSCA={() => openOverlay('rosca')} onOpenNotifications={() => openOverlay('notifications')} />}
        {activeTab === 'Goals' && <GoalsScreen onNewGoal={() => openOverlay('new-goal')} />}
        {activeTab === 'Streaks' && <StreaksScreen onOpenGallery={() => openOverlay('gallery')} onOpenChallenges={() => openOverlay('challenges')} />}
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

      {/* Connection Mask */}
      {!isFullyConnected && (
          <div className="absolute inset-0 z-30 flex items-center justify-center p-8 bg-black/5 pointer-events-none font-archivo italic">
              <div className="neo-card bg-[#FFE500] p-6 rotate-[-1deg] neo-shadow pointer-events-auto flex flex-col items-center gap-4 text-center border-3 border-black shadow-[4px_4px_0_0_#000]">
                  <Lock size={32} strokeWidth={3} />
                  <p className="text-sm font-black uppercase tracking-tight italic">Vault access locked</p>
                  <p className="text-[10px] font-bold uppercase opacity-60 italic leading-relaxed">Please connect your wallet or sign in with Farcaster to view your savings.</p>
              </div>
          </div>
      )}

      {/* Overlays */}
      <AnimatePresence>
        {overlay && (
          <OverlayWrapper title={overlay.replace('-', ' ')} onClose={closeOverlay}>
            <div className="p-20 text-center space-y-6 italic">
                <h2 className="text-3xl font-black uppercase italic italic">{overlay.replace('-', ' ')}</h2>
                <p className="text-sm font-bold uppercase opacity-40 italic">Interactive Module Development in Progress...</p>
                <button onClick={closeOverlay} className="neo-button px-8 py-3 bg-[#FFE500] text-[10px] font-black uppercase italic">Back to Terminal</button>
            </div>
          </OverlayWrapper>
        )}
      </AnimatePresence>

      {/* Bottom Tab Bar */}
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

function HomeScreen({ onDeposit, onSpendSave, onOpenROSCA, onOpenNotifications }: any) {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 text-left italic font-archivo">
      <section className="space-y-1 font-archivo italic text-left">
        <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest italic font-archivo">Total Savings</p>
        <h2 className="text-[52px] font-black leading-none tracking-tighter italic font-archivo">$1,247.83</h2>
        <div className="flex items-center gap-3 font-archivo">
          <p className="text-[#FF4D4D] font-black text-sm flex items-center gap-0.5 uppercase tracking-tighter italic font-archivo">
            <ArrowUp size={14} strokeWidth={4} /> $8.42 this week
          </p>
          <span className="bg-[#FFE500] px-3 py-1 rounded-full border-2 border-black text-[9px] font-black tracking-[2px] uppercase font-archivo">🔥 On Track</span>
        </div>
      </section>

      <div onClick={onSpendSave} className="neo-card neo-shadow bg-[#FFE500] p-6 flex justify-between items-center cursor-pointer active:scale-[0.98] transition-all rotate-[-1deg] border-3 border-black shadow-[4px_4px_0_0_#000]">
        <div className="space-y-1 text-left font-archivo">
            <h4 className="text-xl font-black uppercase italic tracking-tighter font-archivo">Spend & Save</h4>
            <p className="text-[9px] font-bold uppercase opacity-60 italic">Unlock $800. Yield repays it.</p>
        </div>
        <div className="bg-black text-[#FFE500] px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest italic font-archivo">Zero Interest</div>
      </div>

      <button onClick={onDeposit} className="neo-button w-full h-[56px] bg-[#FFE500] text-sm tracking-widest font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all italic font-archivo border-3 border-black">
        Deposit
      </button>
    </div>
  );
}

function GoalsScreen() { return <div className="p-20 italic">Goals...</div>; }
function StreaksScreen() { return <div className="p-20 italic">Streaks...</div>; }
function YieldScreen() { return <div className="p-20 italic">Yield...</div>; }
function ProfileScreen() { return <div className="p-20 italic">Profile...</div>; }
function YieldGiftingOverlay() { return null; }
function SavingsWillOverlay() { return null; }
function DepositFlowOverlay() { return null; }
function GoalCreationOverlay() { return null; }
function BadgeGalleryOverlay() { return null; }
function YieldSubscriptionsOverlay() { return null; }
function SpendSaveOverlay() { return null; }
function RoundUpSavingsOverlay() { return null; }
function SavingsScoreOverlay() { return null; }
function ChallengesOverlay() { return null; }
function ROSCAOverlay() { return null; }
function NotificationsOverlay() { return null; }
function HistoryOverlay() { return null; }
function EmergencyWithdrawOverlay() { return null; }
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
