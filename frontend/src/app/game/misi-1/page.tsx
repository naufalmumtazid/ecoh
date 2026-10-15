"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Trophy, Sparkles, Sun, Trees, Star } from "lucide-react";

interface WasteItem {
  id: string;
  name: string;
  icon: string;
  category: "organik" | "anorganik" | "b3";
  positionX: number; // 0 sampai 100 (%)
}

const ALL_WASTE_POOL: Omit<WasteItem, "id" | "positionX">[] = [
  { name: "Kulit Pisang", icon: "🍌", category: "organik" },
  { name: "Botol Plastik", icon: "🍾", category: "anorganik" },
  { name: "Baterai Bekas", icon: "🔋", category: "b3" },
  { name: "Daun Gugur", icon: "🍂", category: "organik" },
  { name: "Kaleng Minuman", icon: "🥫", category: "anorganik" },
  { name: "Lampu Pecah", icon: "💡", category: "b3" },
  { name: "Apel Busuk", icon: "🍎", category: "organik" },
  { name: "Kardus Bekas", icon: "📦", category: "anorganik" },
  { name: "Obat Expired", icon: "💊", category: "b3" },
  { name: "Sisa Sayuran", icon: "🥦", category: "organik" },
];

export default function MisiConveyorPilahSampah() {
  const [itemsOnBelt, setItemsOnBelt] = useState<WasteItem[]>([]);
  const [score, setScore] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [draggedItem, setDraggedItem] = useState<WasteItem | null>(null);
  const [activeBin, setActiveBin] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ text: string; isError: boolean } | null>(null);

  const TARGET_CORRECT = 10;
  const isGameFinished = correctCount >= TARGET_CORRECT;

  // Refs untuk Game Loop 60 FPS
  const itemsRef = useRef<WasteItem[]>([]);
  const isFinishedRef = useRef<boolean>(isGameFinished);
  const lastSpawnTimeRef = useRef<number>(0);
  const animFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    isFinishedRef.current = isGameFinished;
  }, [isGameFinished]);

  // 🎵 AUDIO SYNTHESIZER
  const playSound = useCallback((type: "correct" | "wrong" | "win") => {
    try {
      const AudioContext =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === "correct") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(587.33, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === "wrong") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(180, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
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
          g.gain.setValueAtTime(0.3, ctx.currentTime + idx * 0.12);
          g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + idx * 0.12 + 0.3);
          o.start(ctx.currentTime + idx * 0.12);
          o.stop(ctx.currentTime + idx * 0.12 + 0.3);
        });
      }
    } catch {
      // Ignore audio policy errors
    }
  }, []);

  // Reset Game Logic
  const initGame = useCallback(() => {
    itemsRef.current = [];
    setItemsOnBelt([]);
    setScore(0);
    setCorrectCount(0);
    setFeedback(null);
    lastSpawnTimeRef.current = Date.now();
  }, []);

  useEffect(() => {
    if (isGameFinished) {
      playSound("win");
    }
  }, [isGameFinished, playSound]);

  // 🚀 MAIN GAME LOOP (60 FPS)
  useEffect(() => {
    let lastTime = performance.now();
    lastSpawnTimeRef.current = Date.now();

    const gameLoop = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      if (!isFinishedRef.current) {
        const now = Date.now();

        // Spawner Sampah Baru
        if (now - lastSpawnTimeRef.current > 2200) {
          const randomWaste =
            ALL_WASTE_POOL[Math.floor(Math.random() * ALL_WASTE_POOL.length)];
          const newItem: WasteItem = {
            ...randomWaste,
            id: `conveyor-item-${now}-${Math.random()}`,
            positionX: -10,
          };

          itemsRef.current.push(newItem);
          lastSpawnTimeRef.current = now;
        }

        // Pergerakan Konveyor
        const speed = 18;
        const updatedItems: WasteItem[] = [];
        let missedCount = 0;

        for (const item of itemsRef.current) {
          const nextX = item.positionX + speed * deltaTime;
          if (nextX > 102) {
            missedCount += 1;
          } else {
            updatedItems.push({ ...item, positionX: nextX });
          }
        }

        itemsRef.current = updatedItems;
        setItemsOnBelt([...itemsRef.current]);

        if (missedCount > 0) {
          setFeedback({
            text: `Sampah jatuh dari konveyor! Ayo pilah sampah berikutnya 🍃`,
            isError: false,
          });
        }
      }

      animFrameIdRef.current = requestAnimationFrame(gameLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, []);

  // Handler Drag & Drop
  const handleDragStart = (item: WasteItem) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e: React.DragEvent, binCategory: string) => {
    e.preventDefault();
    setActiveBin(binCategory);
  };

  const handleDragLeave = () => {
    setActiveBin(null);
  };

  const handleDrop = (
    e: React.DragEvent,
    targetCategory: "organik" | "anorganik" | "b3"
  ) => {
    e.preventDefault();
    setActiveBin(null);

    if (!draggedItem) return;

    if (draggedItem.category === targetCategory) {
      playSound("correct");
      setScore((prev) => prev + 10);
      setCorrectCount((prev) => prev + 1);
      setFeedback({
        text: `Tepat! ${draggedItem.name} masuk ke Tong ${targetCategory.toUpperCase()} ✨ (+10 PTS)`,
        isError: false,
      });
    } else {
      playSound("wrong");
      setFeedback({
        text: `Salah! ${draggedItem.name} bukan sampah ${targetCategory.toUpperCase()}! 😅`,
        isError: true,
      });
    }

    itemsRef.current = itemsRef.current.filter((i) => i.id !== draggedItem.id);
    setItemsOnBelt([...itemsRef.current]);
    setDraggedItem(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFDF0] via-[#F4F9F5] to-[#FEF3C7] text-[#1E293B] font-sans p-4 md:p-8 select-none">
      <div className="max-w-5xl mx-auto space-y-6">
        
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

        {/* Title Header */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-2 px-4 py-1 bg-[#ECFDF5] rounded-full text-xs font-black text-[#059669] border-2 border-[#A7F3D0]">
            <span>LEVEL 1</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black text-[#2D1810]">
            Misi 1: Pemilahan Sampah ⚙️
          </h1>
          <p className="text-xs md:text-sm text-[#78350F] font-bold">
            Pilah 10 sampah dengan tepat untuk memenangkan misi ini!
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

        {/* GAME PLAYFIELD CONTAINER */}
        {!isGameFinished ? (
          <div className="relative bg-gradient-to-b from-[#BAE6FD] via-[#E0F2FE] to-[#DCFCE7] rounded-3xl p-6 md:p-8 border-4 border-[#38BDF8] shadow-2xl overflow-hidden space-y-6">
            
            {/* Dekorasi Pemandangan */}
            <div className="absolute top-3 left-6 flex items-center gap-2 opacity-90 pointer-events-none">
              <Sun className="w-9 h-9 text-[#F59E0B] animate-spin-slow" />
            </div>
            <div className="absolute top-4 right-8 text-3xl opacity-80 pointer-events-none">
              ☁️
            </div>
            <div className="absolute -bottom-8 -left-8 text-7xl opacity-30 pointer-events-none">
              🌳
            </div>
            <div className="absolute -bottom-8 -right-8 text-7xl opacity-30 pointer-events-none">
              🌲
            </div>

            {/* AREA TONG SAMPAH (COLORFUL DROP TARGETS) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 relative z-10">
              
              {/* TONG ORGANIK (HIJAU MINT) */}
              <div
                onDragOver={(e) => handleDragOver(e, "organik")}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, "organik")}
                className={`bg-gradient-to-b from-[#ECFDF5] to-[#D1FAE5] rounded-3xl p-4 border-4 transition-all text-center flex flex-col items-center justify-center space-y-1 min-h-[150px] shadow-md ${
                  activeBin === "organik"
                    ? "border-[#10B981] bg-[#A7F3D0] scale-105 shadow-2xl"
                    : "border-[#34D399]"
                }`}
              >
                <span className="text-5xl drop-shadow-xs">🍃</span>
                <h3 className="font-black text-base text-[#065F46]">TONG ORGANIK</h3>
                <p className="text-[11px] text-[#047857] font-bold">Daun, Pisang, Apel, Sayur</p>
              </div>

              {/* TONG ANORGANIK (KUNING SUNFLOWER) */}
              <div
                onDragOver={(e) => handleDragOver(e, "anorganik")}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, "anorganik")}
                className={`bg-gradient-to-b from-[#FEF3C7] to-[#FDE68A] rounded-3xl p-4 border-4 transition-all text-center flex flex-col items-center justify-center space-y-1 min-h-[150px] shadow-md ${
                  activeBin === "anorganik"
                    ? "border-[#F59E0B] bg-[#FCD34D] scale-105 shadow-2xl"
                    : "border-[#FBBF24]"
                }`}
              >
                <span className="text-5xl drop-shadow-xs">♻️</span>
                <h3 className="font-black text-base text-[#78350F]">TONG ANORGANIK</h3>
                <p className="text-[11px] text-[#92400E] font-bold">Botol, Kaleng, Kardus</p>
              </div>

              {/* TONG B3 (CORAL / RED) */}
              <div
                onDragOver={(e) => handleDragOver(e, "b3")}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, "b3")}
                className={`bg-gradient-to-b from-[#FFE4E6] to-[#FECDD3] rounded-3xl p-4 border-4 transition-all text-center flex flex-col items-center justify-center space-y-1 min-h-[150px] shadow-md ${
                  activeBin === "b3"
                    ? "border-[#E11D48] bg-[#FDA4AF] scale-105 shadow-2xl"
                    : "border-[#FB7185]"
                }`}
              >
                <span className="text-5xl drop-shadow-xs">⚠️</span>
                <h3 className="font-black text-base text-[#881337]">TONG LIMBAH B3</h3>
                <p className="text-[11px] text-[#9F1239] font-bold">Baterai, Lampu, Obat</p>
              </div>

            </div>

            {/* AREA CONVEYOR BELT BERGERAK */}
            <div className="bg-white/95 backdrop-blur-md p-5 rounded-3xl border-4 border-[#FCD34D] shadow-lg space-y-2 relative z-10">
              <div className="flex items-center justify-between text-xs font-black text-[#78350F]">
                <span>Progress Benar: {correctCount} / {TARGET_CORRECT}</span>
                <span className="text-[#10B981] flex items-center gap-1 font-extrabold">
                  <Trees className="w-4 h-4" />
                  <span>Seret Sampah ke Tong yang Cocok!</span>
                </span>
              </div>

              {/* TRACK MESH & ROLLER CONVEYOR */}
              <div className="relative h-28 bg-[#1E293B] rounded-2xl border-4 border-[#475569] overflow-hidden shadow-inner flex items-center">
                
                {/* Animasi Garis Konveyor Bergerak */}
                <div className="absolute inset-0 opacity-30 bg-[linear-gradient(90deg,transparent_50%,#34D399_50%)] bg-[length:40px_100%] animate-conveyor" />

                {/* Roller Roda Mesin */}
                <div className="absolute bottom-1 left-2 right-2 flex justify-between px-2">
                  <div className="w-5 h-5 rounded-full bg-[#475569] border-2 border-[#94A3B8] animate-spin" />
                  <div className="w-5 h-5 rounded-full bg-[#475569] border-2 border-[#94A3B8] animate-spin" />
                  <div className="w-5 h-5 rounded-full bg-[#475569] border-2 border-[#94A3B8] animate-spin" />
                </div>

                {/* DYNAMIC ITEM SAMPAH BERGERAK MULUS VIA GPU */}
                {itemsOnBelt.map((item) => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={() => handleDragStart(item)}
                    style={{
                      transform: `translate3d(${item.positionX * 8.5}px, 0, 0)`,
                      willChange: "transform",
                    }}
                    className="absolute top-2 left-0 p-2.5 bg-white rounded-2xl border-4 border-[#F59E0B] shadow-lg flex flex-col items-center justify-center cursor-grab active:cursor-grabbing hover:scale-110 z-20 transition-transform active:scale-95"
                  >
                    <span className="text-3xl">{item.icon}</span>
                    <span className="text-[10px] font-black text-[#2D1810] whitespace-nowrap mt-0.5">
                      {item.name}
                    </span>
                  </div>
                ))}

              </div>
            </div>

          </div>
        ) : (
          /* WIN / FINISH SCREEN COLORFUL */
          <div className="bg-gradient-to-b from-[#ECFDF5] via-[#FFFDF0] to-[#FEF3C7] rounded-3xl p-10 border-4 border-[#10B981] shadow-2xl text-center space-y-6 relative overflow-hidden animate-fade-in">
            <div className="absolute top-4 left-6 animate-bounce text-3xl">⭐</div>
            <div className="absolute top-10 right-8 animate-pulse text-3xl">✨</div>

            <div className="w-28 h-28 bg-[#FCD34D] text-white rounded-full mx-auto flex items-center justify-center shadow-lg border-4 border-white animate-bounce">
              <Trophy className="w-14 h-14 text-[#78350F]" />
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl md:text-5xl font-black text-[#2D1810]">
                Hore! Misi 1 Selesai Sempurna! 🎉
              </h2>
              <p className="text-sm md:text-base text-[#78350F] max-w-md mx-auto font-bold">
                Kamu berhasil memilah 10 sampah dengan tepat dan meraih skor <strong className="text-[#10B981] text-lg">{score} PTS</strong>!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <button
                onClick={initGame}
                className="bg-white hover:bg-[#FFFDF0] text-[#78350F] font-black px-6 py-3.5 rounded-2xl border-4 border-[#FCD34D] text-sm shadow-md transition-all cursor-pointer hover:scale-105"
              >
                Main Lagi 🔄
              </button>
              <Link
                href="/game/misi-2"
                className="bg-[#10B981] hover:bg-[#059669] text-white font-black px-8 py-3.5 rounded-2xl border-b-4 border-[#047857] text-sm shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-105 animate-scale-float"
              >
                <span>Lanjut Misi 2 (Pembersihan)</span>
                <Sparkles className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}