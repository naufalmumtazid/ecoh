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
    <div className="min-h-screen bg-[#FFFDF0] text-[#1E293B] font-sans antialiased selection:bg-[#10B981] selection:text-white overflow-x-hidden">
      
      {/* ---------------- NAVBAR ---------------- */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b-4 border-[#FCD34D] px-4 py-3.5 transition-all duration-300 shadow-sm animate-slide-down">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          
          {/* LOGO ECOH (HIJAU MURNI) */}
          <button
            onClick={() => triggerTransition("/")}
            className="font-black text-4xl tracking-tight text-[#10B981] hover:scale-105 transition-transform flex items-center gap-2 cursor-pointer group"
          >
            <span className="text-4xl group-hover:rotate-12 transition-transform duration-300">🌱</span>
            <span className="text-[#10B981] font-black drop-shadow-xs">
              ecoh
            </span>
            <span className="text-xs bg-[#F59E0B] text-white font-black px-2.5 py-1 rounded-full uppercase tracking-wider animate-bounce shadow-xs">
              Game
            </span>
          </button>

          <div className="hidden md:flex items-center gap-6 font-bold text-sm text-[#78350F]">
            <a href="#dunia" className="hover:text-[#10B981] hover:scale-105 transition-all">
              Tentang Ecoh
            </a>
            <a href="#zona" className="hover:text-[#F59E0B] hover:scale-105 transition-all">
              Zona Misi
            </a>
            <a href="#fitur" className="hover:text-[#10B981] hover:scale-105 transition-all">
              Keunggulan
            </a>
          </div>

          <button
            onClick={() => triggerTransition("/game")}
            className="bg-[#10B981] hover:bg-[#059669] text-white font-black px-6 py-2.5 rounded-2xl border-b-4 border-[#047857] active:translate-y-0.5 active:border-b-0 transition-all flex items-center gap-2 shadow-lg text-sm cursor-pointer hover:scale-105"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Pilih Misi</span>
          </button>
        </div>
      </nav>

      {/* ---------------- HERO TEASER ---------------- */}
      <section id="dunia" className="pt-14 pb-20 px-4 relative overflow-hidden bg-gradient-to-b from-[#FFFDF0] via-[#F4F9F5] to-[#FEF3C7]">
        
        {/* Latar Belakang Warna Mengambang Dekoratif */}
        <div className="absolute top-10 left-8 w-20 h-20 bg-[#FEF3C7]/60 rounded-full blur-xl pointer-events-none" />
        <div className="absolute top-24 right-10 w-24 h-24 bg-[#D1FAE5]/60 rounded-full blur-xl pointer-events-none" />

        {/* Ornamen Mengambang */}
        <div className="absolute top-12 left-12 text-4xl animate-bounce select-none pointer-events-none" style={{ animationDuration: '3s' }}>
          🍃
        </div>
        <div className="absolute top-20 right-16 text-4xl animate-bounce select-none pointer-events-none" style={{ animationDuration: '4s' }}>
          🌻
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FEF3C7] border-2 border-[#FCD34D] text-[#78350F] font-black text-sm shadow-md transition-all hover:scale-105 animate-fade-in-up">
            <ShieldCheck className="w-4 h-4 text-[#10B981]" />
            <span>Aksi Nyata Pahlawan Bumi Cilik!</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-[#2D1810] leading-tight transition-all animate-fade-in-up [animation-delay:150ms]">
            Selamatkan Bumi Kita dari{" "}
            <span className="text-[#10B981] underline decoration-[#F59E0B] decoration-wavy decoration-4 inline-block">
              Lautan Sampah!
            </span>
          </h1>

          <p className="text-base md:text-lg text-[#78350F] max-w-2xl mx-auto leading-relaxed font-bold transition-all animate-fade-in-up [animation-delay:300ms]">
            Jadilah Pahlawan Bumi sejati! Selesaikan petualangan seru memilah sampah di konveyor, membersihkan kotoran hingga berkilau, dan mendaur ulangnya untuk melestarikan alam! 🌟
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all animate-fade-in-up [animation-delay:450ms]">
            
            {/* Tombol dengan Animasi Mengambang & Scaling Terus-Menerus */}
            <button
              onClick={() => triggerTransition("/game/misi-1")}
              className="w-full sm:w-auto bg-[#10B981] hover:bg-[#059669] text-white font-black text-xl px-10 py-4 rounded-3xl border-b-4 border-[#047857] active:translate-y-1 active:border-b-0 transition-all shadow-xl shadow-[#10B981]/20 flex items-center justify-center gap-3 cursor-pointer animate-scale-float"
            >
              <Gamepad2 className="w-7 h-7" />
              <span>Mulai Misi 1 Sekarang</span>
            </button>

            <a
              href="#zona"
              className="w-full sm:w-auto bg-white hover:bg-[#FFFDF0] text-[#78350F] font-extrabold text-lg px-8 py-4 rounded-3xl border-4 border-[#FCD34D] shadow-md flex items-center justify-center gap-2 transition-all hover:scale-105"
            >
              <Compass className="w-5 h-5 text-[#F59E0B]" />
              <span>Jelajahi Misi</span>
            </a>
          </div>
        </div>
      </section>

      {/* ---------------- ZONA MISI ---------------- */}
      <section id="zona" className="py-20 px-4 bg-white/70 backdrop-blur-xs transition-all border-y-4 border-[#FDE68A]">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#ECFDF5] rounded-full text-xs font-black text-[#059669] border-2 border-[#A7F3D0]">
              <Trophy className="w-4 h-4 text-[#F59E0B]" />
              <span>3 Level Petualangan Ceria</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-[#2D1810]">
              Peta Misi Pelestarian Lingkungan 🗺️
            </h2>
            <p className="text-[#78350F] text-sm md:text-base font-bold">
              Selesaikan setiap level berwarna untuk mendapatkan bintang dan skor tertinggi!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* CARD MISI 1 */}
            <div
              onClick={() => triggerTransition("/game/misi-1")}
              className="bg-gradient-to-b from-[#ECFDF5] to-[#D1FAE5] rounded-3xl p-6 border-4 border-[#34D399] shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-white text-[#059669] flex items-center justify-center font-black text-3xl shadow-sm group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                  ⚙️
                </div>
                <h3 className="text-2xl font-black text-[#065F46] group-hover:text-[#10B981] transition-colors">
                  Misi 1: Pemilahan Sampah
                </h3>
                <p className="text-xs md:text-sm text-[#047857] leading-relaxed font-semibold">
                  Seret sampah organik, anorganik, dan B3 yang berjalan di atas konveyor ke dalam tong pemilahan yang cocok!
                </p>
              </div>
              <div className="pt-2 flex items-center justify-between text-xs font-black text-[#047857] bg-white/90 p-3 rounded-2xl border-2 border-[#A7F3D0] shadow-xs">
                <span>Status: Siap Main ✨</span>
                <span className="flex items-center gap-1 text-[#F59E0B]">
                  <Star className="w-4 h-4 fill-[#F59E0B]" /> Level 1
                </span>
              </div>
            </div>

            {/* CARD MISI 2 */}
            <div
              onClick={() => triggerTransition("/game/misi-2")}
              className="bg-gradient-to-b from-[#FEF3C7] to-[#FDE68A] rounded-3xl p-6 border-4 border-[#FBBF24] shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-white text-[#D97706] flex items-center justify-center font-black text-3xl shadow-sm group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-300">
                  🧹
                </div>
                <h3 className="text-2xl font-black text-[#78350F] group-hover:text-[#B45309] transition-colors">
                  Misi 2: Pembersihan Sampah
                </h3>
                <p className="text-xs md:text-sm text-[#78350F] leading-relaxed font-semibold">
                  Gunakan sapu, spons, atau air melayang untuk mengusap bulatan debu cokelat hingga sampah kotor mengkilap!
                </p>
              </div>
              <div className="pt-2 flex items-center justify-between text-xs font-black text-[#78350F] bg-white/90 p-3 rounded-2xl border-2 border-[#FCD34D] shadow-xs">
                <span>Status: Siap Main ✨</span>
                <span className="flex items-center gap-1 text-[#F59E0B]">
                  <Star className="w-4 h-4 fill-[#F59E0B]" /> Level 2
                </span>
              </div>
            </div>

            {/* CARD MISI 3 (LOCKED) */}
            <div className="bg-gradient-to-b from-[#FFFBEB] to-[#FEF3C7] rounded-3xl p-6 border-4 border-[#D97706]/40 shadow-md opacity-80 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-white text-[#B45309] flex items-center justify-center font-black text-3xl shadow-sm">
                  🔒
                </div>
                <h3 className="text-2xl font-black text-[#78350F]">
                  Misi 3: Pabrik Daur Ulang
                </h3>
                <p className="text-xs md:text-sm text-[#92400E] leading-relaxed font-semibold">
                  Selesaikan Level 1 dan Level 2 terlebih dahulu untuk membuka pabrik daur ulang ajaib!
                </p>
              </div>
              <div className="pt-2 flex items-center justify-between text-xs font-black text-[#78350F] bg-white/80 p-3 rounded-2xl border-2 border-[#FCD34D]">
                <span>Status: Terkunci 🔒</span>
                <span className="flex items-center gap-1 text-gray-400">
                  <Star className="w-4 h-4" /> Level 3
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ---------------- FITUR KEUNGGULAN ---------------- */}
      <section id="fitur" className="py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-4xl font-black text-[#2D1810]">
              Kenapa Bermain Ecoh Sangat Seru? 🎉
            </h2>
            <p className="text-[#78350F] text-sm md:text-base font-bold">
              Game edukasi interaktif untuk melatih kebiasaan menjaga kebersihan alam
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border-4 border-[#34D399] shadow-md space-y-3 text-center hover:scale-105 transition-transform duration-300">
              <div className="w-14 h-14 bg-[#ECFDF5] text-[#10B981] rounded-2xl mx-auto flex items-center justify-center font-black text-3xl animate-pulse">
                ⚡
              </div>
              <h3 className="font-black text-xl text-[#065F46]">Mulus & Responsif</h3>
              <p className="text-xs text-[#047857] font-semibold">
                Sistem drag-and-drop interaktif yang lancar di layar sentuh maupun komputermu!
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border-4 border-[#FCD34D] shadow-md space-y-3 text-center hover:scale-105 transition-transform duration-300">
              <div className="w-14 h-14 bg-[#FEF3C7] text-[#D97706] rounded-2xl mx-auto flex items-center justify-center font-black text-3xl animate-bounce">
                🎵
              </div>
              <h3 className="font-black text-xl text-[#B45309]">Suara & Efek Meriah</h3>
              <p className="text-xs text-[#B45309] font-semibold">
                Suara synthesizer ceria dan efek kemenangan seru di setiap akhir misi!
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border-4 border-[#F59E0B] shadow-md space-y-3 text-center hover:scale-105 transition-transform duration-300">
              <div className="w-14 h-14 bg-[#FFFBEB] text-[#B45309] rounded-2xl mx-auto flex items-center justify-center font-bold text-3xl animate-pulse">
                🌱
              </div>
              <h3 className="font-black text-xl text-[#78350F]">Edukasi Bermanfaat</h3>
              <p className="text-xs text-[#78350F] font-semibold">
                Langsung paham jenis sampah dan cara merawat kebersihan alam sekitar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- BANNER CTA ---------------- */}
      <section className="bg-gradient-to-r from-[#10B981] via-[#059669] to-[#D97706] text-white py-20 px-4 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <h2 className="text-3xl md:text-5xl font-black drop-shadow-md">
            Siap Jadi Pahlawan Bumi Cilik? 🚀
          </h2>
          <p className="text-white/95 text-base md:text-lg max-w-xl mx-auto leading-relaxed font-bold">
            Masuk ke peta permainan sekarang dan kumpulkan skor tertinggi untuk membuktikan aksimu!
          </p>

          {/* Tombol CTA dengan Animasi Mengambang & Scaling Terus-Menerus */}
          <button
            onClick={() => triggerTransition("/game")}
            className="bg-[#F59E0B] hover:bg-[#D97706] text-white font-black text-xl px-10 py-5 rounded-3xl border-b-4 border-[#B45309] active:translate-y-1 active:border-b-0 transition-all shadow-2xl inline-flex items-center justify-center gap-3 cursor-pointer animate-scale-float"
          >
            <span>Buka Peta Permainan</span>
            <ArrowRight className="w-6 h-6 stroke-[3]" />
          </button>
        </div>
      </section>

      {/* FOOTER BAR */}
      <footer className="bg-[#2D1810] text-white/80 text-xs py-6 px-4 border-t-4 border-[#F59E0B]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="font-semibold">© 2026 Ecoh: Game Edukasi Lingkungan Anak Ceria.</p>

          <div className="flex items-center gap-4">
            <a
              href="https://linkedin.com/in/naufalmumtazid"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all hover:scale-110 text-white"
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
              className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all hover:scale-110 text-white"
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
              className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all hover:scale-110 text-white"
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