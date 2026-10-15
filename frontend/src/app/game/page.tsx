"use client";

import React from "react";
import { ArrowLeft, Play, Star, Lock, Gamepad2, Trophy } from "lucide-react";
import { useTransition } from "@/components/PageTransition";

export default function GameHubPage() {
  const { triggerTransition } = useTransition();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFDF0] via-[#F4F9F5] to-[#FEF3C7] text-[#1E293B] font-sans p-4 md:p-8 select-none transition-all duration-300">
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        
        {/* Header Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => triggerTransition("/")}
            className="bg-white hover:bg-[#FFFDF0] text-[#78350F] font-bold px-4 py-2.5 rounded-2xl border-4 border-[#FCD34D] flex items-center gap-2 text-sm transition-all duration-200 hover:scale-105 active:scale-95 shadow-md cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#F59E0B]" />
            <span>Kembali ke Utama</span>
          </button>

          <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-2xl border-4 border-[#FCD34D] shadow-md transition-transform hover:scale-105">
            <Star className="w-5 h-5 text-[#F59E0B] fill-[#F59E0B] animate-bounce" />
            <span className="font-black text-[#2D1810] text-sm">350 PTS</span>
          </div>
        </div>

        {/* Title Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#ECFDF5] rounded-full text-xs font-black text-[#059669] border-2 border-[#A7F3D0] shadow-xs">
            <Gamepad2 className="w-4 h-4 text-[#10B981]" />
            <span>Peta Misi Ecoh</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-[#2D1810]">
            Pilih Misi Lingkunganmu 🌍
          </h1>
          <p className="text-xs md:text-sm text-[#78350F] font-bold">
            Selesaikan setiap level untuk menjadi Pahlawan Bumi sejati!
          </p>
        </div>

        {/* Level List */}
        <div className="space-y-4">
          
          {/* LEVEL 1 CARD (Hijau Mint) */}
          <div className="bg-gradient-to-b from-[#ECFDF5] to-[#D1FAE5] rounded-3xl p-6 border-4 border-[#34D399] shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="w-16 h-16 rounded-2xl bg-white text-[#059669] flex items-center justify-center font-black text-3xl shrink-0 shadow-sm transition-transform hover:scale-110">
                ⚙️
              </div>
              <div>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <span className="text-xs font-black bg-white text-[#059669] px-2.5 py-1 rounded-full border border-[#34D399]">
                    LEVEL 1
                  </span>
                  <div className="flex items-center gap-1 text-[#F59E0B]">
                    <Star className="w-4 h-4 fill-[#F59E0B]" />
                    <Star className="w-4 h-4 fill-[#F59E0B]" />
                    <Star className="w-4 h-4 fill-[#F59E0B]" />
                  </div>
                </div>
                <h3 className="text-xl font-black text-[#065F46] mt-1">
                  Misi 1: Pemilahan Sampah
                </h3>
                <p className="text-xs text-[#047857] font-semibold">
                  Seret sampah organik, anorganik, dan B3 yang berjalan di konveyor ke tong yang tepat!
                </p>
              </div>
            </div>

            <button
              onClick={() => triggerTransition("/game/misi-1")}
              className="w-full md:w-auto bg-[#10B981] hover:bg-[#059669] text-white font-extrabold px-8 py-3.5 rounded-2xl border-b-4 border-[#047857] active:translate-y-0.5 active:border-b-0 transition-all duration-150 flex items-center justify-center gap-2 shadow-md shrink-0 hover:scale-105 active:scale-95 cursor-pointer animate-scale-float"
            >
              <span>Main Level 1</span>
              <Play className="w-4 h-4 fill-white" />
            </button>
          </div>

          {/* LEVEL 2 CARD (Kuning Sunflower) */}
          <div className="bg-gradient-to-b from-[#FEF3C7] to-[#FDE68A] rounded-3xl p-6 border-4 border-[#FBBF24] shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="w-16 h-16 rounded-2xl bg-white text-[#D97706] flex items-center justify-center font-black text-3xl shrink-0 shadow-sm transition-transform hover:scale-110">
                🧹
              </div>
              <div>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <span className="text-xs font-black bg-white text-[#D97706] px-2.5 py-1 rounded-full border border-[#FBBF24]">
                    LEVEL 2
                  </span>
                  <div className="flex items-center gap-1 text-[#F59E0B]">
                    <Star className="w-4 h-4 fill-[#F59E0B]" />
                    <Star className="w-4 h-4 fill-[#F59E0B]" />
                    <Star className="w-4 h-4 fill-[#F59E0B]" />
                  </div>
                </div>
                <h3 className="text-xl font-black text-[#78350F] mt-1">
                  Misi 2: Pembersihan Sampah
                </h3>
                <p className="text-xs text-[#78350F] font-semibold">
                  Gunakan sapu, spons, dan semprotan air untuk membersihkan noda debu pada 5 sampah!
                </p>
              </div>
            </div>

            <button
              onClick={() => triggerTransition("/game/misi-2")}
              className="w-full md:w-auto bg-[#F59E0B] hover:bg-[#D97706] text-white font-extrabold px-8 py-3.5 rounded-2xl border-b-4 border-[#B45309] active:translate-y-0.5 active:border-b-0 transition-all duration-150 flex items-center justify-center gap-2 shadow-md shrink-0 hover:scale-105 active:scale-95 cursor-pointer animate-scale-float"
            >
              <span>Main Level 2</span>
              <Play className="w-4 h-4 fill-white" />
            </button>
          </div>

          {/* LEVEL 3 CARD (LOCKED) */}
          <div className="bg-gradient-to-b from-[#FFFBEB] to-[#FEF3C7] rounded-3xl p-6 border-4 border-[#D97706]/40 shadow-md flex flex-col md:flex-row items-center justify-between gap-6 opacity-80 transition-all duration-300">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="w-16 h-16 rounded-2xl bg-white text-[#B45309] flex items-center justify-center font-black text-3xl shrink-0 shadow-sm">
                🔒
              </div>
              <div>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <span className="text-xs font-black bg-white text-gray-500 px-2.5 py-1 rounded-full border border-gray-300">
                    LEVEL 3
                  </span>
                  <span className="text-xs font-bold text-gray-500">
                    (Terkunci)
                  </span>
                </div>
                <h3 className="text-xl font-black text-[#78350F] mt-1">
                  Misi 3: Pabrik Daur Ulang
                </h3>
                <p className="text-xs text-[#92400E] font-semibold">
                  Selesaikan Misi 1 dan Misi 2 terlebih dahulu untuk membuka pabrik daur ulang.
                </p>
              </div>
            </div>

            <button
              disabled
              className="w-full md:w-auto bg-gray-200 text-gray-400 font-extrabold px-8 py-3.5 rounded-2xl cursor-not-allowed flex items-center justify-center gap-2 shrink-0 transition-all"
            >
              <Lock className="w-4 h-4" />
              <span>Coming Soon</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}