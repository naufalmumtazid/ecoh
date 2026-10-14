"use client";

import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";

interface TransitionContextType {
  triggerTransition: (url: string) => void;
}

const TransitionContext = createContext<TransitionContextType>({
  triggerTransition: () => {},
});

export const useTransition = () => useContext(TransitionContext);

export function PageTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAnimating, setIsAnimating] = useState(false);

  const triggerTransition = (url: string) => {
    if (isAnimating) return;
    setIsAnimating(true);

    // Saat layar pudar sepenuhnya (300ms), lakukan navigasi
    setTimeout(() => {
      router.push(url);
    }, 350);

    // Kembalikan layar transparan setelah halaman baru termuat (700ms)
    setTimeout(() => {
      setIsAnimating(false);
    }, 750);
  };

  return (
    <TransitionContext.Provider value={{ triggerTransition }}>
      {children}

      {/* OVERLAY FADE IN/OUT DENGAN LOGO ECOH DI TENGAH */}
      <div
        className={`fixed inset-0 z-[9999] bg-[#F4F9F5] flex flex-col items-center justify-center transition-opacity duration-300 ease-in-out ${
          isAnimating
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* LOGO TULISAN ECOH BESAR & BERCAHAYA */}
        <div
          className={`transform transition-transform duration-300 flex flex-col items-center gap-3 ${
            isAnimating ? "scale-100" : "scale-90"
          }`}
        >
          <div className="relative">
            <h1 className="font-black text-6xl md:text-8xl tracking-tight text-[#38af88] drop-shadow-md animate-pulse">
              ecoh
            </h1>
            <span className="absolute -top-2 -right-6 text-2xl animate-bounce">
              ✨
            </span>
          </div>

          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E3F4EC] border border-[#B3E2CD] text-[#25785c] font-extrabold text-xs tracking-wider uppercase shadow-sm">
            <span>Loading Petualangan...</span>
          </div>
        </div>
      </div>
    </TransitionContext.Provider>
  );
}