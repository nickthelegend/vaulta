'use client';

import { useState } from 'react';
import { useVaultaAuth } from '@/src/hooks/useVaultaAuth';
import { ConnectModal } from './ConnectModal';
import { Wallet } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function ConnectButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { isFullyConnected, displayName, isFarcasterConnected } = useVaultaAuth();

  return (
    <>
      {!isFullyConnected ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="neo-button h-12 px-6 bg-[#FFE500] text-[10px] font-black uppercase tracking-widest italic flex items-center gap-2 font-archivo italic border-2 border-black"
        >
          <Wallet size={16} strokeWidth={3} />
          Select Wallet
        </button>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="neo-button h-12 px-5 bg-white text-[10px] font-black uppercase tracking-widest italic flex items-center gap-3 hover:bg-[#FFE500] transition-colors border-2 border-black font-archivo italic"
        >
          <div className={cn(
              "w-2.5 h-2.5 rounded-full animate-pulse",
              isFarcasterConnected ? "bg-purple-500" : "bg-green-500"
          )} />
          <span className="truncate max-w-[120px]">{displayName}</span>
          <div className="bg-black text-white px-2 py-0.5 rounded-[4px] text-[8px] font-mono">BASE</div>
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
            <div className="absolute inset-0 z-[100] flex flex-col pointer-events-none">
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onClick={() => setIsOpen(false)}
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto"
                />
                <ConnectModal onClose={() => setIsOpen(false)} />
            </div>
        )}
      </AnimatePresence>
    </>
  );
}
