"use client";

import {
  Sparkles,
  ArrowRight,
  Trophy,
  Gamepad2,
  Play,
  Compass,
  Star,
  ShieldCheck,
} from "lucide-react";
import { useTransition } from "@/components/PageTransition";

export default function LandingPage() {
  const { triggerTransition } = useTransition();

  return (
    <div className="min-h-screen bg-[#F4F9F5] text-[#2C3E35] font-sans antialiased selection:bg-[#38af88] selection:text-white">
      {/* ---------------- NAVBAR ---------------- */}
      <nav className="sticky top-0 z-50 bg-[#F4F9F5]/90 backdrop-blur-md border-b-2 border-[#E1EFE6] px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button
            onClick={() => triggerTransition("/")}
            className="font-extrabold text-4xl tracking-tight text-[#38af88] hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer"
          >
            <span>ecoh</span>
            <span className="text-xs bg-[#F9C846] text-[#5C4500] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
              Game
            </span>
          </button>

          <div className="hidden md:flex items-center gap-6 font-semibold text-sm text-[#4A6B5D]">
            <a href="#dunia" className="hover:text-[#38af88] transition-colors">
              Tentang Ecoh
            </a>
            <a href="#zona" className="hover:text-[#38af88] transition-colors">
              Zona Misi
            </a>
            <a href="#fitur" className="hover:text-[#38af88] transition-colors">
              Keunggulan
            </a>
          </div>

          <button
            onClick={() => triggerTransition("/game")}
            className="bg-[#38af88] hover:bg-[#2d9371] text-white font-bold px-6 py-2.5 rounded-2xl border-b-4 border-[#25785c] active:translate-y-0.5 active:border-b-0 transition-all flex items-center gap-2 shadow-md text-sm cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Pilih Misi</span>
          </button>
        </div>
      </nav>

      {/* ---------------- HERO TEASER ---------------- */}
      <section id="dunia" className="pt-12 pb-16 px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E3F4EC] border border-[#B3E2CD] text-[#25785c] font-black text-sm shadow-sm animate-bounce">
            <ShieldCheck className="w-4 h-4 text-[#38af88]" />
            <span>Aksi Nyata Pahlawan Bumi</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-[#1D3B2E] leading-tight">
            Selamatkan Bumi Kita dari{" "}
            <span className="text-[#38af88] underline decoration-[#F9C846] decoration-wavy decoration-2">
              Lautan Sampah!
            </span>
          </h1>

          <p className="text-base md:text-lg text-[#527363] max-w-2xl mx-auto leading-relaxed font-medium">
            Jadilah Pahlawan Bumi sejati! Selesaikan petualangan seru memilah sampah di konveyor, membersihkan kotoran hingga berkilau, dan mendaur ulangnya untuk menjaga kelestarian alam.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => triggerTransition("/game/misi-1")}
              className="w-full sm:w-auto bg-[#38af88] hover:bg-[#2d9371] text-white font-black text-xl px-10 py-4 rounded-3xl border-b-4 border-[#236e54] active:translate-y-1 active:border-b-0 transition-all shadow-xl shadow-[#38af88]/25 flex items-center justify-center gap-3 cursor-pointer"
            >
              <Gamepad2 className="w-7 h-7" />
              <span>Mulai Misi 1 Sekarang</span>
            </button>
            <a
              href="#zona"
              className="w-full sm:w-auto bg-white hover:bg-[#F0F7F2] text-[#25785c] font-bold text-lg px-8 py-4 rounded-3xl border-2 border-[#CBE4D6] shadow-sm flex items-center justify-center gap-2 transition-all"
            >
              <Compass className="w-5 h-5 text-[#38af88]" />
              <span>Jelajahi Misi</span>
            </a>
          </div>
        </div>
      </section>

      {/* ---------------- ZONA MISI ---------------- */}
      <section id="zona" className="py-16 px-4 bg-[#E8F3ED]">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full text-xs font-black text-[#38af88] border border-[#D1E7DC]">
              <Trophy className="w-4 h-4 text-[#F2B705]" />
              <span>3 Level Petualangan</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#1D3B2E]">
              Peta Misi Pelestarian Lingkungan
            </h2>
            <p className="text-[#527363] text-sm md:text-base font-medium">
              Selesaikan tantangan di setiap level untuk mengembalikan kebersihan dan keindahan alam!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* CARD MISI 1 */}
            <div
              onClick={() => triggerTransition("/game/misi-1")}
              className="bg-white rounded-3xl p-6 border-2 border-[#D5E8DD] shadow-sm hover:shadow-xl hover:border-[#38af88] transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-[#E3F5EC] text-[#38af88] flex items-center justify-center font-black text-2xl group-hover:scale-110 transition-transform">
                  ⚙️
                </div>
                <h3 className="text-xl font-black text-[#1D3B2E] group-hover:text-[#38af88] transition-colors">
                  Misi 1: Konveyor Pemilahan
                </h3>
                <p className="text-xs md:text-sm text-[#527363] leading-relaxed">
                  Seret sampah organik, anorganik, dan B3 yang berjalan di mesin konveyor menuju tong pemilahan yang tepat!
                </p>
              </div>
              <div className="pt-2 flex items-center justify-between text-xs font-bold text-[#38af88] bg-[#F4F9F5] p-3 rounded-xl border border-[#E1EFE6]">
                <span>Status: Siap Dimainkan ✨</span>
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-[#F2B705] text-[#F2B705]" /> Level 1
                </span>
              </div>
            </div>

            {/* CARD MISI 2 */}
            <div
              onClick={() => triggerTransition("/game/misi-2")}
              className="bg-white rounded-3xl p-6 border-2 border-[#D5E8DD] shadow-sm hover:shadow-xl hover:border-[#F2B705] transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-[#FFF8E5] text-[#D9A000] flex items-center justify-center font-black text-2xl group-hover:scale-110 transition-transform">
                  🧹
                </div>
                <h3 className="text-xl font-black text-[#1D3B2E] group-hover:text-[#D9A000] transition-colors">
                  Misi 2: Pembersihan Sampah
                </h3>
                <p className="text-xs md:text-sm text-[#527363] leading-relaxed">
                  Gunakan sapu, spons, atau air untuk membersihkan noda debu pada berbagai sampah kotor hingga mengkilap!
                </p>
              </div>
              <div className="pt-2 flex items-center justify-between text-xs font-bold text-[#D9A000] bg-[#FFFDF5] p-3 rounded-xl border border-[#FCEECB]">
                <span>Status: Siap Dimainkan ✨</span>
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-[#F2B705] text-[#F2B705]" /> Level 2
                </span>
              </div>
            </div>

            {/* CARD MISI 3 (LOCKED) */}
            <div
              className="bg-white/70 rounded-3xl p-6 border-2 border-gray-200 shadow-sm opacity-80 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-gray-100 text-gray-400 flex items-center justify-center font-black text-2xl">
                  🔒
                </div>
                <h3 className="text-xl font-black text-gray-600">
                  Misi 3: Pabrik Daur Ulang
                </h3>
                <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                  Selesaikan Level 1 dan Level 2 terlebih dahulu untuk membuka pabrik daur ulang sampah.
                </p>
              </div>
              <div className="pt-2 flex items-center justify-between text-xs font-bold text-gray-400 bg-gray-50 p-3 rounded-xl border border-gray-200">
                <span>Status: Coming Soon 🔒</span>
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-gray-300" /> Level 3
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- FITUR KEUNGGULAN ---------------- */}
      <section id="fitur" className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-[#1D3B2E]">
              Kenapa Bermain Ecoh Sangat Seru?
            </h2>
            <p className="text-[#527363] text-sm md:text-base font-medium">
              Dirancang khusus untuk melatih kepedulian lingkungan anak-anak dengan cara yang menyenangkan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border-2 border-[#D5E8DD] shadow-sm space-y-2 text-center">
              <div className="w-12 h-12 bg-[#E3F4EC] text-[#38af88] rounded-2xl mx-auto flex items-center justify-center font-bold text-2xl">
                ⚡
              </div>
              <h3 className="font-extrabold text-lg text-[#1D3B2E]">Interaktif & Responsif</h3>
              <p className="text-xs text-[#527363]">
                Mekanisme drag-and-drop dan sentuhan langsung yang mulus di berbagai perangkat.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border-2 border-[#D5E8DD] shadow-sm space-y-2 text-center">
              <div className="w-12 h-12 bg-[#FFF8E5] text-[#D9A000] rounded-2xl mx-auto flex items-center justify-center font-bold text-2xl">
                🎵
              </div>
              <h3 className="font-extrabold text-lg text-[#1D3B2E]">Audio & Efek Ceria</h3>
              <p className="text-xs text-[#527363]">
                Suara synthesizer interaktif dan perayaan kemenangan di setiap akhir misi.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border-2 border-[#D5E8DD] shadow-sm space-y-2 text-center">
              <div className="w-12 h-12 bg-[#E8F0FE] text-[#1A73E8] rounded-2xl mx-auto flex items-center justify-center font-bold text-2xl">
                🌱
              </div>
              <h3 className="font-extrabold text-lg text-[#1D3B2E]">Edukasi Bermakna</h3>
              <p className="text-xs text-[#527363]">
                Memahami pentingnya menjaga kebersihan alam dan pengelolaan sampah sejak dini.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- CTA BANNER ---------------- */}
      <section className="bg-[#38af88] text-white py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-5xl font-black">
            Siap Menjadi Pahlawan Bumi Hari Ini?
          </h2>
          <p className="text-white/90 text-base max-w-xl mx-auto leading-relaxed">
            Masuk ke peta permainan sekarang dan buktikan kemampuanmu menyelamatkan lingkungan!
          </p>
          <button
            onClick={() => triggerTransition("/game")}
            className="bg-[#F9C846] hover:bg-[#ebd43f] text-[#5C4500] font-black text-xl px-10 py-5 rounded-3xl border-b-4 border-[#C9A02A] active:translate-y-1 active:border-b-0 transition-all shadow-lg inline-flex items-center justify-center gap-3 cursor-pointer"
          >
            <span>Buka Peta Permainan</span>
            <ArrowRight className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>
      </section>

      {/* FOOTER BAR */}
      <footer className="bg-[#287d61] text-white/80 text-xs py-6 px-4 border-t border-white/10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p>© 2026 Ecoh: Game Edukasi Lingkungan Anak.</p>

          <div className="flex items-center gap-4">
            <a
              href="https://linkedin.com/in/naufalmumtazid"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-white"
              aria-label="LinkedIn Profile"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.4a1.6 1.6 0 0 0-1.6 1.6c0 .88.71 1.6 1.6 1.6a1.6 1.6 0 0 0 1.6-1.6c0-.89-.72-1.6-1.6-1.6Z" />
              </svg>
            </a>

            <a
              href="https://instagram.com/naufalmumtazid"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-white"
              aria-label="Instagram Profile"
            >
              <svg
                className="w-4 h-4 fill-none stroke-current stroke-[2]"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>

            <a
              href="https://github.com/naufalmumtazid"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-white"
              aria-label="GitHub Profile"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}