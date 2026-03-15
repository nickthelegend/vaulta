'use client';

import { motion } from 'framer-motion';
import { useVaultaAuth } from '@/src/hooks/useVaultaAuth';
import { Wallet, LogOut, User, ChevronRight } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ConnectModalProps {
  onClose: () => void;
}

export function ConnectModal({ onClose }: ConnectModalProps) {
  const { 
    isFullyConnected, 
    displayName, 
    disconnect, 
    connectWallet, 
    connectFarcaster,
    isFarcasterConnected
  } = useVaultaAuth();

  return (
    <div className="absolute bottom-0 inset-x-0 bg-white border-t-3 border-black z-[100] p-8 pb-10 flex flex-col gap-6 animate-in slide-in-from-bottom-full duration-300 shadow-[0_-8px_30px_rgba(0,0,0,0.2)]">
      <div className="w-12 h-1.5 bg-black rounded-full mx-auto -mt-4 mb-4" />
      
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-3xl font-black tracking-tighter uppercase italic leading-none font-archivo">
          {isFullyConnected ? 'Connected' : 'Access Vaulta'}
        </h3>
        <button onClick={onClose} className="p-1 font-black text-xl hover:scale-110 transition-transform">✕</button>
      </div>

      <div className="space-y-4">
        {!isFullyConnected ? (
          <>
            <button 
              onClick={() => { connectWallet?.(); onClose(); }}
              className="neo-card neo-shadow w-full p-6 flex items-center justify-between hover:bg-[#FFE500] transition-colors group text-left"
            >
              <div className="flex items-center gap-4">
                <Wallet className="w-8 h-8" strokeWidth={3} />
                <div className="text-left font-archivo">
                  <p className="font-black uppercase tracking-widest italic leading-none">Connect Wallet</p>
                  <p className="text-[10px] uppercase font-bold opacity-60 mt-1 italic">MetaMask, Rainbow, etc.</p>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
            </button>

            <button 
              onClick={() => { connectFarcaster(); onClose(); }}
              className="neo-card neo-shadow w-full p-6 flex items-center justify-between hover:bg-[#C8E6C9] transition-colors group text-left font-archivo"
            >
              <div className="flex items-center gap-4">
                <User className="w-8 h-8" strokeWidth={3} />
                <div className="text-left">
                  <p className="font-black uppercase tracking-widest italic leading-none">Sign in with Farcaster</p>
                  <p className="text-[10px] uppercase font-bold opacity-60 mt-1 italic">On-chain social identity</p>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
            </button>
          </>
        ) : (
          <div className="space-y-6">
            <div className="neo-card neo-shadow p-6 bg-[#FFE500] flex justify-between items-center rotate-[-1deg]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-black text-[#FFE500] flex items-center justify-center font-black rounded-lg text-xl italic font-archivo">
                    {displayName.charAt(0) === '@' ? displayName.charAt(1) : displayName.charAt(0)}
                </div>
                <div className="font-archivo text-left">
                  <p className="text-xl font-black italic tracking-tighter italic leading-none">{displayName}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="bg-black text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase italic">Base Network</span>
                    {isFarcasterConnected && <span className="bg-purple-600 text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase italic">Farcaster</span>}
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => { disconnect(); onClose(); }}
              className="neo-button w-full h-[64px] bg-black text-[#FF4D4D] flex items-center justify-center gap-3 text-sm italic font-black uppercase italic shadow-[4px_4px_0_0_#FF4D4D]"
            >
              <LogOut size={20} strokeWidth={3} />
              Disconnect
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
