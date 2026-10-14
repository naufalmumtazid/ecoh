"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Play, Star, Lock, Gamepad2 } from "lucide-react";
import { useTransition } from "@/components/PageTransition";

export default function GameHubPage() {
  const { triggerTransition } = useTransition();
  return (
    <div className="min-h-screen bg-[#E8F3ED] text-[#2C3E35] font-sans p-4 md:p-8 select-none transition-all duration-300">
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        
        {/* Header Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => triggerTransition("/")}
            className="bg-white hover:bg-[#F4F9F5] text-[#25785c] font-bold px-4 py-2.5 rounded-2xl border-2 border-[#CBE4D6] flex items-center gap-2 text-sm transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Utama</span>
          </button>

          <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-2xl border-2 border-[#CBE4D6] shadow-sm transition-transform hover:scale-105">
            <Star className="w-5 h-5 text-[#F2B705] fill-[#F2B705] animate-bounce" />
            <span className="font-black text-[#1D3B2E] text-sm">350 PTS</span>
          </div>
        </div>

        {/* Title Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full text-xs font-black text-[#38af88] border border-[#D1E7DC] shadow-xs">
            <Gamepad2 className="w-4 h-4 text-[#38af88]" />
            <span>Peta Misi Ecoh</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-[#1D3B2E]">
            Pilih Misi Lingkunganmu 🌍
          </h1>
          <p className="text-xs md:text-sm text-[#527363]">
            Selesaikan setiap level untuk menjadi Pahlawan Lingkungan Desa Rindang!
          </p>
        </div>

        {/* Level List */}
        <div className="space-y-4">
          
          {/* LEVEL 1 CARD */}
          <div className="bg-white rounded-3xl p-6 border-2 border-[#D5E8DD] shadow-md flex flex-col md:flex-row items-center justify-between gap-6 hover:border-[#38af88] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="w-16 h-16 rounded-2xl bg-[#E3F5EC] text-[#38af88] flex items-center justify-center font-black text-3xl shrink-0 transition-transform group-hover:scale-110">
                ⚙️
              </div>
              <div>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <span className="text-xs font-black bg-[#E3F5EC] text-[#38af88] px-2.5 py-0.5 rounded-full">
                    LEVEL 1
                  </span>
                  <div className="flex items-center gap-1 text-[#F2B705]">
                    <Star className="w-4 h-4 fill-[#F2B705]" />
                    <Star className="w-4 h-4 fill-[#F2B705]" />
                    <Star className="w-4 h-4 fill-[#F2B705]" />
                  </div>
                </div>
                <h3 className="text-xl font-black text-[#1D3B2E] mt-1">
                  Misi 1: Pemilahan Sampah
                </h3>
                <p className="text-xs text-[#527363]">
                  Seret sampah organik, anorganik, dan B3 yang berjalan di konveyor ke tong yang tepat!
                </p>
              </div>
            </div>

            <button
              onClick={() => triggerTransition("/game/misi-1")}
              className="w-full md:w-auto bg-[#38af88] hover:bg-[#2d9371] text-white font-extrabold px-8 py-3.5 rounded-2xl border-b-4 border-[#236e54] active:translate-y-0.5 active:border-b-0 transition-all duration-150 flex items-center justify-center gap-2 shadow-sm shrink-0 hover:scale-105 active:scale-95"
            >
              <span>Main Level 1</span>
              <Play className="w-4 h-4 fill-white" />
            </button>
          </div>

          {/* LEVEL 2 CARD */}
          <div className="bg-white rounded-3xl p-6 border-2 border-[#D5E8DD] shadow-md flex flex-col md:flex-row items-center justify-between gap-6 hover:border-[#F2B705] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="w-16 h-16 rounded-2xl bg-[#FFF8E5] text-[#D9A000] flex items-center justify-center font-black text-3xl shrink-0 transition-transform group-hover:scale-110">
                🧹
              </div>
              <div>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <span className="text-xs font-black bg-[#FFF8E5] text-[#D9A000] px-2.5 py-0.5 rounded-full">
                    LEVEL 2
                  </span>
                  <div className="flex items-center gap-1 text-[#F2B705]">
                    <Star className="w-4 h-4 fill-[#F2B705]" />
                    <Star className="w-4 h-4 fill-[#F2B705]" />
                    <Star className="w-4 h-4 fill-[#F2B705]" />
                  </div>
                </div>
                <h3 className="text-xl font-black text-[#1D3B2E] mt-1">
                  Misi 2: Pembersihan Sampah
                </h3>
                <p className="text-xs text-[#527363]">
                  Gunakan sapu, spons, dan semprotan air untuk membersihkan noda debu pada 5 sampah!
                </p>
              </div>
            </div>

            <button
              onClick={() => triggerTransition("/game/misi-2")}
              className="w-full md:w-auto bg-[#F2B705] hover:bg-[#d9a404] text-[#5C4500] font-extrabold px-8 py-3.5 rounded-2xl border-b-4 border-[#b88c02] active:translate-y-0.5 active:border-b-0 transition-all duration-150 flex items-center justify-center gap-2 shadow-sm shrink-0 hover:scale-105 active:scale-95"
            >
              <span>Main Level 2</span>
              <Play className="w-4 h-4 fill-[#5C4500]" />
            </button>
          </div>

          {/* LEVEL 3 CARD (LOCKED) */}
          <div className="bg-white/70 rounded-3xl p-6 border-2 border-gray-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 opacity-80 transition-all duration-300">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 text-gray-400 flex items-center justify-center font-black text-3xl shrink-0">
                🔒
              </div>
              <div>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <span className="text-xs font-black bg-gray-200 text-gray-600 px-2.5 py-0.5 rounded-full">
                    LEVEL 3
                  </span>
                  <span className="text-xs font-bold text-gray-400">
                    (Terkunci)
                  </span>
                </div>
                <h3 className="text-xl font-black text-gray-600 mt-1">
                  Misi 3: Pabrik Daur Ulang
                </h3>
                <p className="text-xs text-gray-400">
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