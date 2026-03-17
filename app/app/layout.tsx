'use client';

import React from 'react';

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] p-4">
            {/* Mobile Frame */}
            <div className="w-full max-w-[390px] h-[844px] bg-[#F5F0E8] neo-border relative overflow-hidden flex flex-col shadow-[0_0_100px_rgba(0,0,0,0.5)]">
                {children}
            </div>
        </div>
    );
}
