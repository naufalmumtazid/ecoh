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

    // Saat layar pudar sepenuhnya (350ms), lakukan navigasi
    setTimeout(() => {
      router.push(url);
    }, 350);

    // Kembalikan layar transparan setelah halaman baru termuat (750ms)
    setTimeout(() => {
      setIsAnimating(false);
    }, 750);
  };

  return (
    <TransitionContext.Provider value={{ triggerTransition }}>
      {children}

      {/* OVERLAY FADE IN/OUT COLORFUL DENGAN LOGO ECOH */}
      <div
        className={`fixed inset-0 z-[9999] bg-gradient-to-b from-[#FFFDF0] via-[#F4F9F5] to-[#FEF3C7] flex flex-col items-center justify-center transition-opacity duration-300 ease-in-out ${
          isAnimating
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* LOGO TULISAN ECOH BESAR & CERIA */}
        <div
          className={`transform transition-all duration-300 flex flex-col items-center gap-4 ${
            isAnimating ? "scale-100 opacity-100" : "scale-90 opacity-0"
          }`}
        >
          <div className="relative flex items-center gap-2">
            <span className="text-5xl md:text-7xl animate-bounce">🌱</span>
            <h1 className="font-black text-6xl md:text-8xl tracking-tight text-[#10B981] drop-shadow-md">
              ecoh
            </h1>
            <span className="text-xs md:text-sm bg-[#F59E0B] text-white font-black px-3 py-1 rounded-full uppercase tracking-wider animate-pulse shadow-md border-2 border-white self-start">
              Game
            </span>
            <span className="absolute -top-3 -right-8 text-3xl animate-spin-slow">
              ✨
            </span>
          </div>

          <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#ECFDF5] border-3 border-[#A7F3D0] text-[#065F46] font-black text-xs md:text-sm tracking-wider uppercase shadow-md animate-scale-float">
            <span>Memuat Petualangan Ceria... 🚀</span>
          </div>
        </div>
      </div>
    </TransitionContext.Provider>
  );
}