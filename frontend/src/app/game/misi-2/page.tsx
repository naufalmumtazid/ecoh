"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Trophy, Sparkles, RefreshCw, Star } from "lucide-react";
import confetti from "canvas-confetti";

interface DustParticle {
  id: number;
  top: number;
  left: number;
  sizePx: number;
}

interface DirtyItem {
  id: string;
  name: string;
  dirtyIcon: string;
  cleanIcon: string;
  requiredTool: "broom" | "sponge" | "water";
  toolName: string;
  toolIcon: string;
  description: string;
  dustCount: number;
}

const DIRTY_ITEMS_POOL: DirtyItem[] = [
  {
    id: "1",
    name: "Botol Plastik Berdebu",
    dirtyIcon: "🍾",
    cleanIcon: "✨🍾✨",
    requiredTool: "broom",
    toolName: "Sapu Lidi",
    toolIcon: "🧹",
    description: "Ambil Sapu Lidi lalu usapkan ke bulatan debu cokelat pada botol!",
    dustCount: 5,
  },
  {
    id: "2",
    name: "Kaleng Minuman Berminyak",
    dirtyIcon: "🥫",
    cleanIcon: "✨🥫✨",
    requiredTool: "sponge",
    toolName: "Spons Busa",
    toolIcon: "🧽",
    description: "Ambil Spons Busa lalu usapkan ke noda minyak cokelat pada kaleng!",
    dustCount: 6,
  },
  {
    id: "3",
    name: "Kardus Bekas Berlumpur",
    dirtyIcon: "📦",
    cleanIcon: "✨📦✨",
    requiredTool: "water",
    toolName: "Semprotan Air",
    toolIcon: "🚿",
    description: "Ambil Semprotan Air lalu semprotkan noda lumpur cokelat pada kardus!",
    dustCount: 6,
  },
  {
    id: "4",
    name: "Ban Bekas Kotor",
    dirtyIcon: "🛞",
    cleanIcon: "✨🛞✨",
    requiredTool: "water",
    toolName: "Semprotan Air",
    toolIcon: "🚿",
    description: "Ambil Semprotan Air lalu bilas sisa kotoran pada ban bekas!",
    dustCount: 7,
  },
  {
    id: "5",
    name: "Mainan Plastik Berdebu",
    dirtyIcon: "🧸",
    cleanIcon: "✨🧸✨",
    requiredTool: "sponge",
    toolName: "Spons Busa",
    toolIcon: "🧽",
    description: "Ambil Spons Busa lalu usap noda debu pada mainan hingga mengkilap!",
    dustCount: 5,
  },
];

const generateDustForIndex = (index: number, count: number): DustParticle[] => {
  return Array.from({ length: count }).map((_, idx) => {
    const pseudoRandom1 = Math.sin(index * 99 + idx * 33) * 10000;
    const pseudoRandom2 = Math.cos(index * 55 + idx * 77) * 10000;
    const pseudoRandom3 = Math.sin(index * 11 + idx * 22) * 10000;

    const top = 15 + Math.abs(Math.floor(pseudoRandom1 % 60));
    const left = 15 + Math.abs(Math.floor(pseudoRandom2 % 60));
    const sizePx = 32 + Math.abs(Math.floor(pseudoRandom3 % 32));

    return { id: idx, top, left, sizePx };
  });
};

export default function MisiPembersihanSampah() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [feedback, setFeedback] = useState<{ text: string; isError: boolean } | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const currentItem = DIRTY_ITEMS_POOL[currentIndex];
  
  const [dustParticles, setDustParticles] = useState<DustParticle[]>(() =>
    generateDustForIndex(0, DIRTY_ITEMS_POOL[0].dustCount)
  );
  const [draggedTool, setDraggedTool] = useState<"broom" | "sponge" | "water" | null>(null);

  const isCleaned = dustParticles.length === 0;

  // 🎉 TRIGGER CONFETTI CELEBRATION
  const triggerConfetti = useCallback((type: "small" | "win") => {
    if (type === "small") {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#10B981", "#F59E0B", "#3B82F6", "#EC4899"],
        disableForReducedMotion: true,
      });
    } else if (type === "win") {
      const duration = 2.5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 999 };

      const interval: NodeJS.Timeout = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
          return clearInterval(interval);
        }
        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          origin: { x: Math.random() * 0.3 + 0.1, y: Math.random() - 0.2 },
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: Math.random() * 0.3 + 0.6, y: Math.random() - 0.2 },
        });
      }, 250);
    }
  }, []);

  // 🎵 AUDIO SYSTEM (CUSTOM correct.mp3 + SYNTHESIZER FALLBACK)
  const playSynthSound = useCallback((type: "pop" | "wrong" | "win") => {
    try {
      const AudioContext =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      const ctx = new AudioContext();

      if (type === "pop") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(500, ctx.currentTime + 0.04);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      } else if (type === "wrong") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(160, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(90, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } else if (type === "win") {
        const notes = [523.25, 659.25, 783.99, 1046.5];
        notes.forEach((freq, idx) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.connect(g);
          g.connect(ctx.destination);
          o.type = "triangle";
          o.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);
          g.gain.setValueAtTime(0.25, ctx.currentTime + idx * 0.12);
          g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + idx * 0.12 + 0.3);
          o.start(ctx.currentTime + idx * 0.12);
          o.stop(ctx.currentTime + idx * 0.12 + 0.3);
        });
      }
    } catch {
      // Ignore audio policy
    }
  }, []);

  const playSound = useCallback((type: "pop" | "correct" | "wrong" | "win") => {
    if (type === "correct") {
      const audio = new Audio("/correct.mp3");
      audio.volume = 0.8;
      audio.play().catch(() => {
        playSynthSound("pop");
      });
      return;
    }
    if (type === "win") {
      const audio = new Audio("/correct.mp3");
      audio.volume = 0.9;
      audio.play().catch(() => {
        playSynthSound("win");
      });
      return;
    }

    playSynthSound(type);
  }, [playSynthSound]);

  const handleDragStart = (tool: "broom" | "sponge" | "water") => {
    setDraggedTool(tool);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleRemoveDust = (dustId: number, e?: React.SyntheticEvent) => {
    if (e) e.stopPropagation();

    if (!draggedTool) {
      setFeedback({
        text: `Gunakan ${currentItem.toolName} untuk membersihkan! 🧹`,
        isError: true,
      });
      return;
    }

    if (draggedTool !== currentItem.requiredTool) {
      playSound("wrong");
      setFeedback({
        text: `Alat belum pas! Gunakan ${currentItem.toolName}! ❌`,
        isError: true,
      });
      return;
    }

    setDustParticles((prev) => {
      const remaining = prev.filter((d) => d.id !== dustId);
      
      if (remaining.length === 0) {
        playSound("correct");
        triggerConfetti("small");
        setScore((s) => s + 20);
        setFeedback({
          text: `Sempurna! ${currentItem.name} kini bersih mengkilap! ✨ (+20 PTS)`,
          isError: false,
        });
      } else {
        playSound("pop");
        setFeedback({
          text: `Bagus! Tersisa ${remaining.length} debu cokelat lagi...`,
          isError: false,
        });
      }

      return remaining;
    });
  };

  const handleNextItem = () => {
    if (currentIndex < DIRTY_ITEMS_POOL.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setDustParticles(generateDustForIndex(nextIdx, DIRTY_ITEMS_POOL[nextIdx].dustCount));
      setDraggedTool(null);
      setFeedback(null);
    } else {
      setIsCompleted(true);
      playSound("win");
      triggerConfetti("win");
    }
  };

  const handleResetGame = () => {
    setCurrentIndex(0);
    setScore(0);
    setFeedback(null);
    setIsCompleted(false);
    setDraggedTool(null);
    setDustParticles(generateDustForIndex(0, DIRTY_ITEMS_POOL[0].dustCount));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFDF0] via-[#F4F9F5] to-[#FEF3C7] text-[#1E293B] font-sans p-4 md:p-8 select-none">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Top Header Navigation */}
        <div className="flex items-center justify-between bg-white/90 backdrop-blur-md p-4 rounded-3xl border-4 border-[#FCD34D] shadow-md">
          <Link
            href="/game"
            className="bg-[#FFFDF0] hover:bg-[#FEF3C7] text-[#78350F] font-extrabold px-4 py-2 rounded-2xl border-2 border-[#FCD34D] flex items-center gap-2 text-sm transition-all hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-[#F59E0B]" />
            <span>Peta Misi</span>
          </Link>

          <div className="bg-[#10B981] text-white font-black px-6 py-2.5 rounded-2xl border-b-4 border-[#047857] shadow-md text-sm flex items-center gap-2 animate-scale-float">
            <Star className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
            <span>SKOR: {score} / 100 PTS</span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-2 px-4 py-1 bg-[#FEF3C7] rounded-full text-xs font-black text-[#D97706] border-2 border-[#FCD34D]">
            <span>LEVEL 2</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black text-[#2D1810]">
            Misi 2: Pembersihan Sampah 🧹
          </h1>
          <p className="text-xs md:text-sm text-[#78350F] font-bold">
            {currentItem.description}
          </p>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div
            className={`p-3.5 rounded-2xl border-4 text-center font-black text-xs md:text-sm shadow-md transition-all animate-bounce ${
              feedback.isError
                ? "bg-[#FFE4E6] border-[#FB7185] text-[#9F1239]"
                : "bg-[#ECFDF5] border-[#34D399] text-[#065F46]"
            }`}
          >
            {feedback.text}
          </div>
        )}

        {!isCompleted ? (
          <div className="space-y-6">
            
            {/* AREA UTAMA PENGGOSOKAN SAMPAH */}
            <div
              onDragOver={handleDragOver}
              className={`relative bg-gradient-to-b from-[#FFFBEB] via-[#FEF3C7] to-[#FDE68A] rounded-3xl p-8 border-4 border-[#FBBF24] shadow-2xl text-center space-y-6 overflow-hidden transition-all ${
                isCleaned ? "from-[#ECFDF5] via-[#D1FAE5] to-[#A7F3D0] border-[#34D399]" : ""
              }`}
            >
              <div className="flex items-center justify-between text-xs font-black text-[#78350F] bg-white/90 px-4 py-2 rounded-full border-2 border-[#FCD34D] shadow-xs">
                <span>Progres: {currentIndex + 1} / {DIRTY_ITEMS_POOL.length} Sampah</span>
                <span>{isCleaned ? "BERSIH KILAU ✨" : `Tersisa ${dustParticles.length} Debu Cokelat`}</span>
              </div>

              {/* OBJEK SAMPAH DENGAN DEBU COKELAT */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto bg-white/95 rounded-3xl border-4 border-[#F59E0B] shadow-inner flex items-center justify-center overflow-hidden">
                
                <span className="text-8xl md:text-9xl transition-all duration-300 drop-shadow-md">
                  {isCleaned ? currentItem.cleanIcon : currentItem.dirtyIcon}
                </span>

                {!isCleaned &&
                  dustParticles.map((dust) => (
                    <div
                      key={dust.id}
                      onDragOver={(e) => {
                        e.preventDefault();
                        handleRemoveDust(dust.id, e);
                      }}
                      onDrop={(e) => handleRemoveDust(dust.id, e)}
                      onClick={(e) => handleRemoveDust(dust.id, e)}
                      style={{
                        top: `${dust.top}%`,
                        left: `${dust.left}%`,
                        width: `${dust.sizePx}px`,
                        height: `${dust.sizePx}px`,
                      }}
                      className="absolute bg-[#78350F] hover:bg-[#92400E] rounded-full border-2 border-[#D97706]/50 shadow-lg cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 active:scale-90 transition-all opacity-90"
                    />
                  ))}
              </div>

              {isCleaned && (
                <div className="pt-2 animate-bounce">
                  <button
                    onClick={handleNextItem}
                    className="bg-[#10B981] hover:bg-[#059669] text-white font-black px-8 py-3.5 rounded-2xl border-b-4 border-[#047857] text-sm shadow-xl transition-all inline-flex items-center gap-2 cursor-pointer hover:scale-105 animate-scale-float"
                  >
                    <span>Lanjut Sampah Berikutnya ➔</span>
                  </button>
                </div>
              )}
            </div>

            {/* ALAT PEMBERSIH MELAYANG */}
            <div className="py-4 text-center space-y-2">
              <p className="text-xs font-black text-[#78350F] uppercase tracking-wider bg-[#FEF3C7] inline-block px-4 py-1.5 rounded-full border-2 border-[#FCD34D]">
                💡 Drag alat di bawah ini lalu usapkan ke debu cokelat:
              </p>
              
              <div className="flex justify-center items-center gap-6 pt-2">
                <div
                  draggable
                  onDragStart={() => handleDragStart(currentItem.requiredTool)}
                  className={`text-6xl md:text-7xl cursor-grab active:cursor-grabbing hover:scale-125 transition-transform p-2 drop-shadow-lg ${
                    draggedTool === currentItem.requiredTool ? "scale-125 drop-shadow-2xl" : ""
                  }`}
                  title={currentItem.toolName}
                >
                  {currentItem.toolIcon}
                </div>
              </div>
            </div>

          </div>
        ) : (
          /* WIN SCREEN MISI 2 COLORFUL */
          <div className="bg-gradient-to-b from-[#ECFDF5] via-[#FFFDF0] to-[#FEF3C7] rounded-3xl p-10 border-4 border-[#10B981] shadow-2xl text-center space-y-6 relative overflow-hidden animate-fade-in">
            <div className="absolute top-4 left-6 animate-bounce text-3xl">⭐</div>
            <div className="absolute top-10 right-8 animate-pulse text-3xl">✨</div>

            <div className="w-28 h-28 bg-[#FCD34D] text-white rounded-full mx-auto flex items-center justify-center shadow-lg border-4 border-white animate-bounce">
              <Trophy className="w-14 h-14 text-[#78350F]" />
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl md:text-5xl font-black text-[#2D1810]">
                Misi 2 Selesai Sempurna! 🎉
              </h2>
              <p className="text-sm md:text-base text-[#78350F] max-w-md mx-auto font-bold">
                Seluruh 5 sampah kotor telah berhasil kamu bersihkan hingga mengkilap! Total skor: <strong className="text-[#10B981] text-lg">{score} PTS</strong>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <button
                onClick={handleResetGame}
                className="bg-white hover:bg-[#FFFDF0] text-[#78350F] font-black px-6 py-3.5 rounded-2xl border-4 border-[#FCD34D] text-sm shadow-md transition-all cursor-pointer hover:scale-105 flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4 text-[#F59E0B]" />
                <span>Ulangi Misi 2</span>
              </button>
              <Link
                href="/game"
                className="bg-[#10B981] hover:bg-[#059669] text-white font-black px-8 py-3.5 rounded-2xl border-b-4 border-[#047857] text-sm shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-105 animate-scale-float"
              >
                <span>Kembali ke Peta Misi</span>
                <Sparkles className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}