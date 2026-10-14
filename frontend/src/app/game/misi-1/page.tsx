"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Trophy, Sparkles, Sun, Trees } from "lucide-react";

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
  const [correctCount, setCorrectCount] = useState<number>(0); // Hanya bertambah saat BENAR
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

        // Spawner Sampah Baru secara kontinu
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
            // Sampah jatuh/luput -> HILANG, TAPI PROGRESS TIDAK BERHAMBOH
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
      setCorrectCount((prev) => prev + 1); // 🎯 PROGRESS HANYA NAMBAH DI SINI!
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

    // Hapus sampah terproses dari ref array
    itemsRef.current = itemsRef.current.filter((i) => i.id !== draggedItem.id);
    setItemsOnBelt([...itemsRef.current]);
    setDraggedItem(null);
  };

  return (
    <div className="min-h-screen bg-[#F4F9F5] text-[#2C3E35] font-sans p-4 md:p-8 select-none">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Top Header Navigation */}
        <div className="flex items-center justify-between bg-white p-4 rounded-3xl border-2 border-[#D5E8DD] shadow-sm">
          <Link
            href="/game"
            className="bg-[#E8F3ED] hover:bg-[#d8eadd] text-[#25785c] font-bold px-4 py-2 rounded-2xl flex items-center gap-2 text-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Peta Misi</span>
          </Link>

          <div className="bg-[#38af88] text-white font-black px-6 py-2.5 rounded-2xl shadow-sm text-sm">
            SKOR: {score} / 100 PTS
          </div>
        </div>

        {/* Title Header */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl md:text-3xl font-black text-[#1D3B2E]">
            Misi 1: Pemilahan Sampah 
          </h1>
          <p className="text-xs md:text-sm text-[#527363]">
            Pilah 10 sampah dengan tepat untuk memenangkan misi!
          </p>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div
            className={`p-3 rounded-2xl border-2 text-center font-bold text-xs md:text-sm shadow-sm transition-all ${
              feedback.isError
                ? "bg-rose-50 border-rose-300 text-rose-700"
                : "bg-emerald-50 border-emerald-300 text-emerald-800"
            }`}
          >
            {feedback.text}
          </div>
        )}

        {/* GAME PLAYFIELD CONTAINER (BOXED PEMANDANGAN DESA RINDANG) */}
        {!isGameFinished ? (
          <div className="relative bg-gradient-to-b from-[#BAE6FD] via-[#E0F2FE] to-[#DCFCE7] rounded-3xl p-6 md:p-8 border-4 border-[#7DD3FC] shadow-xl overflow-hidden space-y-6">
            
            {/* Dekorasi Pemandangan di dalam Box */}
            <div className="absolute top-3 left-6 flex items-center gap-2 opacity-80 pointer-events-none">
              <Sun className="w-8 h-8 text-amber-400 animate-spin-slow" />
            </div>
            <div className="absolute top-4 right-8 text-3xl opacity-60 pointer-events-none">
              ☁️
            </div>
            <div className="absolute -bottom-10 -left-10 text-7xl opacity-20 pointer-events-none">
              🌳
            </div>
            <div className="absolute -bottom-10 -right-10 text-7xl opacity-20 pointer-events-none">
              🌲
            </div>

            {/* AREA TONG SAMPAH (DROP TARGETS) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 relative z-10">
              
              {/* TONG ORGANIK */}
              <div
                onDragOver={(e) => handleDragOver(e, "organik")}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, "organik")}
                className={`bg-white/90 backdrop-blur-sm rounded-3xl p-4 border-4 transition-all text-center flex flex-col items-center justify-center space-y-1 min-h-[150px] shadow-sm ${
                  activeBin === "organik"
                    ? "border-emerald-500 bg-emerald-100/90 scale-105 shadow-lg"
                    : "border-emerald-400 border-dashed"
                }`}
              >
                <span className="text-4xl">🍃</span>
                <h3 className="font-black text-sm text-emerald-900">TONG ORGANIK</h3>
                <p className="text-[10px] text-emerald-700 font-medium">Drop Sampah Alami</p>
              </div>

              {/* TONG ANORGANIK */}
              <div
                onDragOver={(e) => handleDragOver(e, "anorganik")}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, "anorganik")}
                className={`bg-white/90 backdrop-blur-sm rounded-3xl p-4 border-4 transition-all text-center flex flex-col items-center justify-center space-y-1 min-h-[150px] shadow-sm ${
                  activeBin === "anorganik"
                    ? "border-amber-500 bg-amber-100/90 scale-105 shadow-lg"
                    : "border-amber-400 border-dashed"
                }`}
              >
                <span className="text-4xl">♻️</span>
                <h3 className="font-black text-sm text-amber-900">TONG ANORGANIK</h3>
                <p className="text-[10px] text-amber-700 font-medium">Drop Plastik / Kardus</p>
              </div>

              {/* TONG B3 */}
              <div
                onDragOver={(e) => handleDragOver(e, "b3")}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, "b3")}
                className={`bg-white/90 backdrop-blur-sm rounded-3xl p-4 border-4 transition-all text-center flex flex-col items-center justify-center space-y-1 min-h-[150px] shadow-sm ${
                  activeBin === "b3"
                    ? "border-rose-500 bg-rose-100/90 scale-105 shadow-lg"
                    : "border-rose-400 border-dashed"
                }`}
              >
                <span className="text-4xl">⚠️</span>
                <h3 className="font-black text-sm text-rose-900">TONG LIMBAH B3</h3>
                <p className="text-[10px] text-rose-700 font-medium">Drop Baterai / Lampu</p>
              </div>

            </div>

            {/* AREA CONVEYOR BELT BERGERAK */}
            <div className="bg-white/90 backdrop-blur-sm p-5 rounded-3xl border-2 border-emerald-200 shadow-md space-y-2 relative z-10">
              <div className="flex items-center justify-between text-xs font-bold text-gray-600">
                <span>Sampah Benar: {correctCount} / {TARGET_CORRECT}</span>
                <span className="text-[#38af88] flex items-center gap-1">
                  <Trees className="w-3.5 h-3.5" />
                  <span>Seret Sampah ke Tong yang Pas</span>
                </span>
              </div>

              {/* TRACK MESH & ROLLER CONVEYOR */}
              <div className="relative h-28 bg-gray-800 rounded-2xl border-4 border-gray-600 overflow-hidden shadow-inner flex items-center">
                
                {/* Animasi Garis Konveyor Bergerak */}
                <div className="absolute inset-0 opacity-25 bg-[linear-gradient(90deg,transparent_50%,#ffffff_50%)] bg-[length:40px_100%] animate-conveyor" />

                {/* Roller Roda Mesin */}
                <div className="absolute bottom-1 left-2 right-2 flex justify-between px-2">
                  <div className="w-5 h-5 rounded-full bg-gray-600 border-2 border-gray-400 animate-spin" />
                  <div className="w-5 h-5 rounded-full bg-gray-600 border-2 border-gray-400 animate-spin" />
                  <div className="w-5 h-5 rounded-full bg-gray-600 border-2 border-gray-400 animate-spin" />
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
                    className="absolute top-2 left-0 p-2 bg-white rounded-2xl border-2 border-[#38af88] shadow-md flex flex-col items-center justify-center cursor-grab active:cursor-grabbing hover:scale-110 z-20 transition-transform"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-[9px] font-black text-[#1D3B2E] whitespace-nowrap">
                      {item.name}
                    </span>
                  </div>
                ))}

              </div>
            </div>

          </div>
        ) : (
          /* WIN / FINISH SCREEN */
          <div className="bg-white rounded-3xl p-10 border-4 border-[#38af88] shadow-2xl text-center space-y-6 relative overflow-hidden animate-fade-in">
            <div className="absolute top-4 left-6 animate-bounce text-2xl">⭐</div>
            <div className="absolute top-10 right-8 animate-pulse text-2xl">✨</div>

            <div className="w-24 h-24 bg-[#E3F5EC] text-[#38af88] rounded-full mx-auto flex items-center justify-center shadow-inner animate-bounce">
              <Trophy className="w-12 h-12 text-[#F2B705]" />
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-black text-[#1D3B2E]">
                Hore! Misi 1 Selesai Sempurna! 🎉
              </h2>
              <p className="text-sm md:text-base text-[#527363] max-w-md mx-auto">
                Kamu berhasil memilah 10 sampah dengan tepat dan meraih skor <strong className="text-[#38af88]">{score} PTS</strong>!
              </p>
            </div>

            <div className="flex justify-center gap-4 pt-4">
              <button
                onClick={initGame}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-6 py-3.5 rounded-2xl text-sm shadow-sm transition-all"
              >
                Main Lagi
              </button>
              <Link
                href="/game/misi-2"
                className="bg-[#38af88] hover:bg-[#2d9371] text-white font-extrabold px-8 py-3.5 rounded-2xl border-b-4 border-[#236e54] text-sm shadow-md transition-all flex items-center gap-2"
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