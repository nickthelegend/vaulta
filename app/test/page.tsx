'use client';

import { useState, useMemo } from 'react';
import { 
  Zap, Play, RotateCcw, Loader2, ChevronDown, ChevronUp, AlertTriangle, CheckCircle2, XCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { 
  networkTests, walletTests, contractTests, apiTests, 
  previewTests, approvalTests, depositTests, withdrawalTests 
} from '@/src/lib/yo/tests/core';
import { mathTests } from '@/src/lib/yo/tests/math';
import { useVaultData } from '@/src/hooks/yo/useVaultData';
import { useYoBalance } from '@/src/hooks/yo/useYoBalance';
import { useUserPosition } from '@/src/hooks/yo/useUserPosition';
import { useYieldHistory } from '@/src/hooks/yo/useYieldHistory';
import { YO_CONTRACTS } from '@/src/lib/yo/constants';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const IS_LOCAL = process.env.NEXT_PUBLIC_ENV === 'local';
const TEST_WALLET = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';

export default function TestPage() {
  const [results, setResults] = useState<any[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);

  // Hooks for Group 9
  const vaultAddress = YO_CONTRACTS.vaults.yoUSD as `0x${string}`;
  const vaultData = useVaultData(vaultAddress);
  const yoBalance = useYoBalance(vaultAddress, TEST_WALLET as `0x${string}`);
  const userPos = useUserPosition();
  const yieldHist = useYieldHistory(vaultAddress);

  const allTests = useMemo(() => {
    return [
        ...networkTests,
        ...walletTests,
        ...contractTests,
        ...apiTests,
        ...previewTests,
        ...approvalTests,
        ...depositTests,
        ...withdrawalTests,
        // Group 9 - Hook Verification (Inline Runner)
        {
            id: '9.1', group: 'Hooks', name: 'useVaultData Hook',
            run: async () => {
                if (vaultData.apy !== undefined) return { status: 'PASS', value: 'useVaultData: returns valid data ✓' };
                throw new Error('Hook data incomplete');
            }
        },
        {
            id: '9.2', group: 'Hooks', name: 'useYoBalance Hook',
            run: async () => {
                if (yoBalance.yoTokenBalance !== undefined) return { status: 'PASS', value: 'useYoBalance: balance loaded ✓' };
                throw new Error('Balance not loaded');
            }
        },
        {
            id: '9.3', group: 'Hooks', name: 'useUserPosition Hook',
            run: async () => {
                if (userPos.totalValueUSD >= 0) return { status: 'PASS', value: `useUserPosition: $${userPos.totalValueUSD.toFixed(2)} ✓` };
                throw new Error('Position error');
            }
        },
        {
            id: '9.4', group: 'Hooks', name: 'useYieldHistory Hook',
            run: async () => {
                if (yieldHist.data && yieldHist.data.length > 0) return { status: 'PASS', value: `useYieldHistory: ${yieldHist.data.length} points ✓` };
                throw new Error('No history');
            }
        },
        ...mathTests
    ];
  }, [vaultData, yoBalance, userPos, yieldHist]);

  const resetTests = () => {
    setResults(allTests.map(t => ({ ...t, status: 'PENDING' })));
    setIsRunning(false);
    setStartTime(null);
    setEndTime(null);
  };

  const runAll = async () => {
    setIsRunning(true);
    setStartTime(Date.now());
    const currentResults = allTests.map(t => ({ ...t, status: 'PENDING' }));
    setResults(currentResults);

    for (let i = 0; i < allTests.length; i++) {
        const test = allTests[i];
        const start = Date.now();
        setResults(prev => prev.map((t, idx) => idx === i ? { ...t, status: 'RUNNING' } : t));
        
        try {
            const res = await test.run();
            setResults(prev => prev.map((t, idx) => idx === i ? { ...t, ...res, duration: Date.now() - start } : t));
        } catch (e: any) {
            setResults(prev => prev.map((t, idx) => idx === i ? { ...t, status: 'FAIL', error: e.message, duration: Date.now() - start } : t));
        }
    }
    setIsRunning(false);
    setEndTime(Date.now());
  };

  const passCount = results.filter(r => r.status === 'PASS').length;
  const failCount = results.filter(r => r.status === 'FAIL').length;
  const totalDuration = startTime && endTime ? endTime - startTime : 0;

  if (!IS_LOCAL) return <div className="flex items-center justify-center h-full font-archivo italic text-white bg-[#0A0A0A]">404 - Not Found</div>;

  return (
    <div className="flex flex-col h-full bg-[#F5F0E8] font-archivo italic overflow-hidden text-left">
      <header className="px-6 py-6 border-b-3 border-black bg-white space-y-4 shrink-0">
        <div className="flex justify-between items-center">
            <div className="flex flex-col">
                <h1 className="text-2xl font-black tracking-tighter">YO SDK TEST SUITE</h1>
                <div className="flex items-center gap-2">
                    <div className="bg-[#FFE500] border-2 border-black px-2 py-0.5 text-[8px] font-black uppercase">LOCAL FORK</div>
                </div>
            </div>
            <Zap className="fill-[#FFE500]" size={28} />
        </div>
        <div className="flex gap-3">
          <button onClick={runAll} disabled={isRunning} className="neo-button flex-1 h-12 bg-[#FFE500] text-[10px] flex items-center justify-center gap-2">
            {isRunning ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} />} RUN ALL TESTS
          </button>
          <button onClick={resetTests} className="neo-button w-24 h-12 bg-white text-[10px]">RESET</button>
        </div>
      </header>

      <div className="px-6 py-4 bg-white border-b-3 border-black shrink-0">
        <div className="h-4 bg-zinc-100 border-2 border-black relative overflow-hidden">
            <motion.div animate={{ width: `${(results.filter(r => r.status !== 'PENDING').length / allTests.length) * 100}%` }} className="absolute inset-y-0 left-0 bg-[#C8E6C9] border-r-2 border-black" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-3 pb-12">
        {results.map((test) => (
          <div key={test.id} className="flex flex-col">
            <div onClick={() => test.status === 'FAIL' && setExpandedId(expandedId === test.id ? null : test.id)} className={cn("neo-card flex items-center justify-between p-4", test.status === 'FAIL' && "border-[#FF4D4D] cursor-pointer")}>
              <div className="flex items-center gap-4">
                <StatusIcon status={test.status} />
                <div>
                  <p className="text-[11px] font-black uppercase">{test.name}</p>
                  <p className="text-[9px] font-bold text-zinc-400 uppercase">{test.value || `Group: ${test.group}`}</p>
                </div>
              </div>
              {test.duration && <span className="text-[8px] font-black opacity-30">{test.duration}ms</span>}
            </div>
            <AnimatePresence>
              {expandedId === test.id && test.status === 'FAIL' && (
                <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden bg-[#FF4D4D]/10 border-x-3 border-b-3 border-[#FF4D4D] p-4 font-mono text-[9px] text-[#FF4D4D] break-all">
                  {test.error}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        {endTime && (
          <div className="neo-card bg-white border-3 border-black p-6 space-y-4 mt-8 shadow-[8px_8px_0_0_#000]">
            <h3 className="text-xl font-black italic underline decoration-[#FFE500] decoration-4">SUMMARY</h3>
            <div className="grid grid-cols-2 gap-4 italic">
                <div>
                    <p className="text-[10px] font-black opacity-40 uppercase">Passed</p>
                    <p className="text-2xl font-black text-[#00FF00]">{passCount} / {allTests.length}</p>
                </div>
                <div>
                    <p className="text-[10px] font-black opacity-40 uppercase">Duration</p>
                    <p className="text-2xl font-black">{totalDuration}ms</p>
                </div>
            </div>
            {failCount > 0 && (
                <div className="space-y-2">
                    <p className="text-[10px] font-black text-[#FF4D4D] uppercase">Failed Tests:</p>
                    <div className="flex flex-wrap gap-2">
                        {results.filter(r => r.status === 'FAIL').map(r => (
                            <span key={r.id} className="bg-[#FF4D4D] text-white text-[8px] font-black px-2 py-0.5">{r.name}</span>
                        ))}
                    </div>
                </div>
            )}
            <div className={cn("p-3 border-2 border-black text-center text-[11px] font-black uppercase", failCount === 0 ? "bg-[#C8E6C9]" : "bg-[#FF4D4D] text-white")}>
                {failCount === 0 ? "✅ YO SDK FULLY VERIFIED" : `❌ ${failCount} ISSUES FOUND — CHECK FAILURES`}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusIcon({ status }: any) {
    if (status === 'PENDING') return <div className="w-6 h-6 border-2 border-dashed border-zinc-300 flex items-center justify-center text-[7px] font-black">...</div>;
    if (status === 'RUNNING') return <Loader2 size={20} className="animate-spin text-[#FFE500]" />;
    if (status === 'PASS') return <div className="w-6 h-6 bg-[#C8E6C9] border-2 border-black flex items-center justify-center"><CheckCircle2 size={16} /></div>;
    if (status === 'FAIL') return <div className="w-6 h-6 bg-[#FF4D4D] border-2 border-black flex items-center justify-center"><XCircle size={16} className="text-white" /></div>;
    return <div className="w-6 h-6 bg-[#FFE500] border-2 border-black flex items-center justify-center"><AlertTriangle size={16} /></div>;
}
