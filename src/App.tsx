/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, Heart, Anchor, Waves, ShipWheel, Star, Sun, Glasses, Umbrella, Instagram } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';

const Coral1 = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 100 C 50 80, 30 70, 20 50 C 10 30, 30 10, 40 0 C 50 20, 40 40, 50 60 C 60 40, 50 20, 60 0 C 70 10, 90 30, 80 50 C 70 70, 50 80, 50 100 Z" />
  </svg>
);

const Coral2 = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 100 C 50 70, 10 80, 0 50 C 20 60, 40 70, 50 80 C 60 70, 80 60, 100 50 C 90 80, 50 70, 50 100 Z" />
  </svg>
);

interface Memory {
  id: string;
  url: string;
  caption: string;
  sticker?: string;
}

const STICKERS = ['Sun', 'Glasses', 'Umbrella', 'Star'];

const galleryData: Memory[] = [
  { id: '1', url: 'https://i.postimg.cc/26mTmy4M/IMG-20240819-094320-302.webp', caption: 'Formasi lengkap bareng Bu Sri abis upacara! ✨' },
  { id: '2', url: 'https://i.postimg.cc/R01QPmkv/IMG-20240722-WA0146.jpg', caption: 'Happy Birthday Bu Sri! 🎉 Sehat selalu ya buuu' },
  { id: '3', url: 'https://i.postimg.cc/SKL7Z4BF/IMG-20240725-WA0054.jpg', caption: 'Canggung dikit ga ngaruh, awal mula the boys 11.2 ngumpul 😎' },
  { id: '4', url: 'https://i.postimg.cc/43vb8GDg/IMG-20240725-WA0056.jpg', caption: 'Masih pada jaim nih ceritanya 🤣' },
  { id: '5', url: 'https://i.postimg.cc/nLKYdxyF/IMG-20240725-WA0094.jpg', caption: 'First meet full member 11.2! Awal dari segala kerandoman kita 🫶' },
  { id: '6', url: 'https://i.postimg.cc/QtXgwPDZ/IMG-20240725-WA0104.jpg', caption: 'Batik day! Kece-kece banget kan kita 👔✨' },
  { id: '7', url: 'https://i.postimg.cc/C1FCXt0M/IMG-20240725-WA0134.jpg', caption: 'Pose andalan pas pertama kali pake batik di 11.2 📸' },
  { id: '8', url: 'https://i.postimg.cc/fLw7pFsz/IMG-20240802-WA0030.jpg', caption: 'The boys lagi mode on fire di jam olahraga 🔥⚽' },
  { id: '9', url: 'https://i.postimg.cc/hjS86wnP/IMG-20240802-WA0031.jpg', caption: 'Ciwi-ciwi 11.2 tetep slay walau abis keringetan 💅✨' },
  { id: '10', url: 'https://i.postimg.cc/pT2Q47vT/IMG-20240802-WA0059.jpg', caption: 'Kompak terus 11.2! Capek bareng, seneng bareng 🏃‍♂️🏃‍♀️💨' },
  { id: '11', url: 'https://i.postimg.cc/sXwPrcfv/IMG-20240802-WA0105.jpg', caption: 'Sporty but make it cute 🎀' },
  { id: '12', url: 'https://i.postimg.cc/cHs72jWQ/IMG-20240802-WA0111.jpg', caption: 'Full team 11.2 nih! Energi kita emang ga ada abisnya ⚡🔥' },
  { id: '13', url: 'https://i.postimg.cc/85tdSHks/IMG-20240824-WA0084.jpg', caption: 'Pool day! Seger banget abis renang di Menza 🏊‍♀️💦' },
  { id: '14', url: 'https://i.postimg.cc/KzJ72Ncw/IMG20240819081408.jpg', caption: 'Proud of us! Ciwi-ciwi berprestasi bawa pulang piala 🏆✨' },
  { id: '15', url: 'https://i.postimg.cc/VvvqLCdf/Whats-App-Image-2026-03-08-at-22-43-12.jpg', caption: 'Akhirnya bebas dari ujian! Senyum lega 11.2 📚🎉' },
  { id: '16', url: 'https://i.postimg.cc/LXNkpT43/Whats-App-Image-2026-03-08-at-22-43-12-(1).jpg', caption: 'Projek P5 bikin eco enzyme, 11.2 mode ilmuwan 🧪🌿' },
  { id: '17', url: 'https://i.postimg.cc/kGGQXbDw/Whats-App-Image-2026-03-08-at-22-43-12-(2).jpg', caption: 'HBD Habibie! Makan-makan asik di markas 🎂🍕' },
  { id: '18', url: 'https://i.postimg.cc/85tdSHkt/Whats-App-Image-2026-03-08-at-22-43-12-(3).jpg', caption: 'School day out! Selalu ada cerita seru bareng kalian 💖' },
  { id: '19', url: 'https://i.postimg.cc/6qqr5vT1/Whats-App-Image-2026-03-08-at-22-43-12-(4).jpg', caption: 'Dapet ilmu baru dari kakak-kakak Teknokrat! 🎓✨' },
  { id: '20', url: 'https://i.postimg.cc/nrr4cDMR/Whats-App-Image-2026-03-08-at-22-43-12-(5).jpg', caption: 'Selfie time bareng Bang Alz! Matematika jadi seru 📐📸' },
  { id: '21', url: 'https://i.postimg.cc/3NNXJvW6/Whats-App-Image-2026-03-08-at-22-43-12-(6).jpg', caption: 'Bareng Bu Fatmi, guru Bahasa Indonesia kesayangan kita 📖❤️' },
  { id: '22', url: 'https://i.postimg.cc/zvvCXgVZ/Whats-App-Image-2026-03-08-at-22-43-12-(7).jpg', caption: 'Kunjungan dari kakak-kakak Unila, siap menuju kampus impian! 🏛️✨' },
  { id: '23', url: 'https://i.postimg.cc/VvvqLCdw/Whats-App-Image-2026-03-08-at-22-43-12-(8).jpg', caption: 'Makan-makan seru di rumah Anindya! Kenyang dan happy 🍝😋' },
  { id: '24', url: 'https://i.postimg.cc/L8Yx3r4h/381b2913-f5f7-4947-a34a-f30b7e5428a1.jpg', caption: 'Berkah Ramadhan! Foto bareng abis pesantren kilat di sekolah ✨🕌' },
  { id: '25', url: 'https://i.postimg.cc/YSQ8JYmY/DSCN0913.jpg', caption: 'Keluarga cemara 11.2 nih bos! Senggol dong 😎📸' },
  { id: '26', url: 'https://i.postimg.cc/mr7V0CFM/DSCN1073.jpg', caption: 'Satu lagi dari 11.2! Kompak terus sampai lulus yaa 🫶✨' },
  { id: '27', url: 'https://i.postimg.cc/5t8pZLFg/IMG-20240812-222517-325.webp', caption: 'Ciwi-ciwi kesayangan kumpul! Cantik-cantik banget sih 💖💅' },
  { id: '28', url: 'https://i.postimg.cc/W40SQgkv/IMG-20240819-094320-183.webp', caption: 'Bangga banget! Pamer sertifikat bareng Bu Sri tercinta 🏆👩‍🏫' },
  { id: '29', url: 'https://i.postimg.cc/26mTmy4M/IMG-20240819-094320-302.webp', caption: 'Prestasi lagi nih! Bukti kalau 11.2 nggak cuma jago main, tapi juga berprestasi 🌟✨' },
  { id: '30', url: 'https://i.postimg.cc/jSpZgZCy/IMG-3688.jpg', caption: 'Panas-panasan pas upacara tetep on point dong ciwi-ciwinya ☀️🎀' },
  { id: '31', url: 'https://i.postimg.cc/9Q6J8JzY/IMG-5747.jpg', caption: 'Bukber time di rumah Camelia! Vibes kelas 12.2 makin solid 🌙🍲' },
  { id: '32', url: 'https://i.postimg.cc/1XM7dDPH/07468b7d-ff93-46d8-8c33-acb1d5d767ef.jpg', caption: 'Fokus tingkat dewa! 🎶 Lagi latihan Cetik biar pentas kita pecah banget!' },
  { id: '33', url: 'https://i.postimg.cc/mkVpn7B4/IMG-20250719-054320.jpg', caption: 'Bukber bareng Bu Sri. Perut kenyang, hati senang, gosip pun tenang~ 🍕' },
  { id: '34', url: 'https://i.postimg.cc/ZnjsQ64J/IMG-20250728-WA0088.jpg', caption: 'Pasukan 12.2 mode serius! Abis jadi petugas upacara, auto gagah semua. 🫡' },
  { id: '35', url: 'https://i.postimg.cc/v8vKDw9T/IMG-20251118-WA0047.jpg', caption: 'Di 12.2, ulang tahun bukan cuma nambah umur, tapi nambah jatah makan-makan! 🎂✨' },
  { id: '36', url: 'https://i.postimg.cc/nV1WMf7G/IMG-20251124-WA0331.jpg', caption: 'Fashion Show barang bekas, tapi gaya kita tetap kelas atas! Eco-friendly banget kan? ♻️👗' },
  { id: '37', url: 'https://i.postimg.cc/fWvPkQX2/IMG-20251125-WA0018.jpg', caption: 'Happy Teacher\'s Day! Terima kasih guru-guru terbaik yang sabarnya seluas samudera. ❤️' },
  { id: '38', url: 'https://i.postimg.cc/zDkQ3YW4/IMG-20251204-WA0092.jpg', caption: 'Pink & Blue vibe! Cewek-cewek 12.2 makin cakep pakai jersey baseball kebanggaan. ⚾🌸' },
  { id: '39', url: 'https://i.postimg.cc/BbN7z2sR/IMG-4345.jpg', caption: 'Panggung kita punya! Foto bareng cast pentas musik dan guru-guru hits. 🎤🌟' },
  { id: '40', url: 'https://i.postimg.cc/NFbCnRBw/IMG-9800.jpg', caption: 'Throwback kelas 11.2! Baju kotak-kotak legendaris bareng Bu Sri tercinta. 🏁' },
  { id: '41', url: 'https://i.postimg.cc/nrTSWqpb/IMG-9811.jpg', caption: 'Studio Session! Mode keren maksimal bareng jersey baseball pink-biru muda. 📸💙' },
  { id: '42', url: 'https://i.postimg.cc/QxT01LWs/Whats-App-Image-2026-03-14-at-20-11-26.jpg', caption: 'Ganteng & Jenius! Barisan cowok-cowok 12.2 yang siap menaklukkan masa depan. 😎🧠' },
  { id: '43', url: 'https://i.postimg.cc/rFrQx6t8/Whats-App-Image-2026-03-14-at-20-11-28.jpg', caption: 'Solid tanpa batas! Cowok-cowok 12.2 yang selalu ada di setiap cerita seru kelas. 🤝🔥' },
  { id: '44', url: 'https://i.postimg.cc/rFXYhFT8/Whats-App-Image-2026-03-14-at-12-28-30.jpg', caption: 'Satu kelas, satu impian. Amin paling kencang buat SNBP warna Biru! 💙🎓' },
  { id: '45', url: 'https://i.postimg.cc/HsDPSsmW/Whats-App-Image-2026-03-14-at-20-11-19.jpg', caption: 'Cool level: Maksimal! Squad cowok-cowok keren 12.2 beraksi. 📸🕶️' },
];

export default function App() {
  const [memories, setMemories] = useState<Memory[]>([]);
  
  // Custom Cursor State
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  // Bubbles state
  const [bubbles, setBubbles] = useState<{id: number, left: number, size: number, delay: number}[]>([]);

  // Scroll Progress for background and bubbles
  const { scrollYProgress } = useScroll();
  const bubbleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  useEffect(() => {
    // Initialize memories with random stickers
    const initializedMemories = galleryData.map((item) => {
      const hasSticker = Math.random() > 0.7;
      return {
        ...item,
        sticker: hasSticker ? STICKERS[Math.floor(Math.random() * STICKERS.length)] : undefined
      };
    });
    setMemories(initializedMemories);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Generate random bubbles
    const newBubbles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 30 + 10,
      delay: Math.random() * 15,
    }));
    setBubbles(newBubbles);
  }, []);

  const updateCaption = (id: string, newCaption: string) => {
    setMemories(prev => prev.map(m => m.id === id ? { ...m, caption: newCaption } : m));
  };

  const renderSticker = (type: string) => {
    const props = { size: 40, className: "text-[#F472B6] drop-shadow-md" };
    switch (type) {
      case 'Sun': return <Sun {...props} />;
      case 'Glasses': return <Glasses {...props} />;
      case 'Umbrella': return <Umbrella {...props} />;
      case 'Star': return <Star {...props} fill="#F472B6" />;
      default: return null;
    }
  };

  return (
    <motion.div 
      className="min-h-screen font-sans text-[#0C4A6E] overflow-x-hidden selection:bg-[#F472B6] selection:text-white relative cursor-none bg-gradient-to-b from-[#E0F2FE] via-[#FCE7F3] to-[#BAE6FD]"
    >
      {/* Custom Cursor */}
      <div 
        className="custom-cursor"
        style={{ 
          transform: `translate(${cursorPos.x - 10}px, ${cursorPos.y - 10}px)`
        }}
      />
      {/* Background Bubbles */}
      <motion.div 
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        style={{ opacity: bubbleOpacity }}
      >
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className="absolute bottom-[-50px] rounded-full border border-white/40 bg-white/10 backdrop-blur-[1px] animate-rise"
            style={{
              left: `${bubble.left}%`,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              animationDelay: `${bubble.delay}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </motion.div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pb-[100px] md:pb-[150px] overflow-hidden z-10">
        <Coral1 className="absolute bottom-10 left-10 w-32 h-32 text-[#F472B6] opacity-40 z-20 animate-float" />
        <Coral2 className="absolute bottom-20 right-10 w-24 h-24 text-[#38BDF8] opacity-40 z-20 animate-float" style={{ animationDelay: '2s' }} />
        {/* Floating Objects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[15%] left-[10%] animate-float text-[#F472B6]/60">
            <Anchor size={64} />
          </div>
          <div className="absolute top-[20%] right-[15%] animate-float text-[#38BDF8]/60" style={{ animationDelay: '1s' }}>
            <ShipWheel size={80} className="animate-spin-slow" />
          </div>
          <div className="absolute bottom-[25%] left-[15%] animate-float text-[#F472B6]/60" style={{ animationDelay: '2s' }}>
            <Star size={48} fill="currentColor" />
          </div>
          <div className="absolute bottom-[20%] right-[10%] animate-float text-[#38BDF8]/60" style={{ animationDelay: '1.5s' }}>
            <Waves size={56} />
          </div>
        </div>

        {/* Animated Background Waves (Blobs) */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-[#F9A8D4] rounded-full mix-blend-multiply filter blur-3xl animate-blob opacity-50"></div>
          <div className="absolute top-10 right-10 w-64 h-64 bg-[#7DD3FC] rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000 opacity-50"></div>
          <div className="absolute -bottom-8 left-20 w-64 h-64 bg-[#FBCFE8] rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000 opacity-50"></div>
        </div>

        <div className="z-30 bg-white/40 backdrop-blur-[12px] border border-white/60 p-6 md:p-16 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] max-w-4xl w-full mx-auto transform transition-all hover:scale-[1.02] duration-500">
          <div className="flex justify-center mb-6 text-[#38BDF8] drop-shadow-[0_0_15px_rgba(255,255,255,0.9)]">
            <Anchor size={48} strokeWidth={2} />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-[#38BDF8] drop-shadow-[0_0_20px_rgba(255,255,255,0.9)] mb-4 px-2">
            ETHEREANCE
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#EC4899] drop-shadow-sm tracking-wide font-['Fredoka']">
            AKU BISA, KAMU BISA, KITA BISA!
          </p>
        </div>

        {/* Coral Border 1 - Coral Pink */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none z-20 translate-y-[1px]">
          <svg className="relative block w-full h-[100px] md:h-[150px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,120 C150,100 300,140 450,90 C600,40 750,110 900,80 C1050,50 1150,90 1200,100 L1200,120 L0,120 Z" className="fill-[#FBCFE8] opacity-80"></path>
            <path d="M0,120 C200,80 400,120 600,60 C800,0 1000,80 1200,50 L1200,120 L0,120 Z" className="fill-[#BAE6FD] opacity-60"></path>
          </svg>
        </div>
      </section>

      {/* About Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="py-32 md:py-48 px-4 relative z-10"
      >
        <Coral2 className="absolute top-10 left-5 w-24 h-24 text-[#F472B6] opacity-40 z-20 animate-float" style={{ animationDelay: '1s' }} />
        <Coral1 className="absolute bottom-10 right-5 w-32 h-32 text-[#38BDF8] opacity-40 z-20 animate-float" style={{ animationDelay: '3s' }} />
        {/* Scroll Bubbles for About Section */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {bubbles.slice(0, 15).map((bubble) => (
            <motion.div
              key={`about-bubble-${bubble.id}`}
              className="absolute rounded-full bg-white/40 border border-white/50"
              style={{
                left: `${bubble.left}%`,
                width: `${bubble.size}px`,
                height: `${bubble.size}px`,
                top: `${(bubble.id * 7) % 100}%`,
              }}
              animate={{
                y: [0, -150, 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 12 + Math.random() * 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center p-4 bg-white/50 backdrop-blur-[10px] rounded-full mb-8 text-[#EC4899] shadow-sm border border-white/60"
          >
            <Waves size={40} />
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#EC4899] mb-8 font-['Fredoka'] tracking-tight drop-shadow-sm">Tentang Kelas Kami</h2>
          <p className="text-xl md:text-2xl text-[#0C4A6E] leading-relaxed max-w-3xl mx-auto font-medium drop-shadow-sm">
            Kami adalah keluarga besar yang solid, ceria, dan penuh semangat! 
            Seperti luasnya samudra, potensi kami tak terbatas. Bersama-sama, 
            kami mengarungi lautan ilmu, menghadapi ombak tantangan, dan berlabuh 
            pada kesuksesan.
          </p>
        </div>

        {/* Coral Border 2 - Deep Coral */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none translate-y-[1px]">
          <svg className="relative block w-full h-[80px] md:h-[120px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,120 C250,130 400,60 600,90 C800,120 950,50 1200,80 L1200,120 L0,120 Z" className="fill-[#BAE6FD] opacity-80"></path>
            <path d="M0,120 C300,50 500,110 700,70 C900,30 1100,90 1200,60 L1200,120 L0,120 Z" className="fill-[#FBCFE8] opacity-60"></path>
          </svg>
        </div>
      </motion.section>

      {/* Memory Gallery Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="py-32 md:py-48 px-4 relative z-10"
      >
        <Coral1 className="absolute top-20 left-10 w-40 h-40 text-[#38BDF8] opacity-30 z-0 animate-float" style={{ animationDelay: '0.5s' }} />
        <Coral2 className="absolute top-40 right-10 w-32 h-32 text-[#F472B6] opacity-30 z-0 animate-float" style={{ animationDelay: '2.5s' }} />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              className="inline-block mb-6 p-3 bg-white/50 rounded-3xl backdrop-blur-sm shadow-sm border border-white/60"
            >
              <ImageIcon size={48} className="text-[#EC4899]" />
            </motion.div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-[#EC4899] drop-shadow-sm mb-8 font-['Fredoka'] tracking-tight">Galeri Kenangan ETHEREANCE</h2>
            <p className="text-[#0284C7] drop-shadow-sm mb-12 px-4 text-xl font-medium max-w-2xl mx-auto leading-relaxed">Simpan dan lihat kembali momen-momen indah perjalanan kita!</p>
          </div>

        {/* Masonry Gallery Grid */}
        {memories.length > 0 ? (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
            {memories.map((memory, index) => (
              <motion.div 
                key={memory.id} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: (index % 4) * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ y: -10, rotate: Math.random() > 0.5 ? 1 : -1 }}
                className="break-inside-avoid group relative flex flex-col bg-[#E0F2FE]/80 backdrop-blur-[10px] rounded-[2.5rem] overflow-hidden border-4 border-[#F472B6] shadow-[0_10px_30px_rgba(244,114,182,0.3)] hover:shadow-[0_20px_50px_rgba(244,114,182,0.5)] transition-all duration-500"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={memory.url} 
                    alt="Memory" 
                    className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Random Sticker */}
                  {memory.sticker && (
                    <div className="absolute top-4 right-4 z-20 animate-float">
                      {renderSticker(memory.sticker)}
                    </div>
                  )}
                  
                  {/* Interactive Caption Overlay */}
                  <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <div className="bg-white/70 backdrop-blur-md border border-white/60 p-4 rounded-xl text-[#0C4A6E]">
                      <textarea
                        value={memory.caption}
                        onChange={(e) => updateCaption(memory.id, e.target.value)}
                        placeholder="Klik untuk edit keterangan..."
                        className="w-full bg-transparent border-none focus:ring-0 text-sm font-['Fredoka'] resize-none placeholder-[#0C4A6E]/60 text-[#0C4A6E]"
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Static Caption (Visible on Mobile/Small screens or when not hovered) */}
                {memory.caption && (
                  <div className="p-4 bg-white/60 backdrop-blur-md border-t border-white/60 md:hidden">
                    <p className="font-['Fredoka'] text-sm text-[#0C4A6E] italic">
                      "{memory.caption.split(/(Bang Alz)/g).map((part, i) => 
                        part === 'Bang Alz' ? <span key={i} className="text-[#EC4899] font-semibold">{part}</span> : part
                      )}"
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white/40 backdrop-blur-sm rounded-3xl border border-white/60 border-dashed">
            <ImageIcon size={64} className="text-[#EC4899] mb-4" />
            <p className="text-[#0284C7] text-lg drop-shadow-sm">Belum ada kenangan. Yuk bagikan momen pertamamu!</p>
          </div>
        )}
        </div>
      </motion.section>

      {/* Closing Video Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="py-24 md:py-32 px-4 relative z-10"
      >
        {/* Top Wave Divider */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180 -translate-y-[1px]">
          <svg className="relative block w-full h-[60px] md:h-[100px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,120 C250,130 400,60 600,90 C800,120 950,50 1200,80 L1200,120 L0,120 Z" className="fill-[#FBCFE8] opacity-50"></path>
            <path d="M0,120 C300,50 500,110 700,70 C900,30 1100,90 1200,60 L1200,120 L0,120 Z" className="fill-[#BAE6FD] opacity-50"></path>
          </svg>
        </div>

        {/* Floating Decorations */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {/* Left Side */}
          <Coral1 className="absolute top-[20%] left-[5%] w-16 h-16 md:w-24 md:h-24 text-[#F472B6] opacity-40 animate-float" style={{ animationDelay: '0.5s' }} />
          <Star className="absolute top-[60%] left-[8%] w-8 h-8 md:w-12 md:h-12 text-[#38BDF8] opacity-50 animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-[35%] left-[12%] w-12 h-12 md:w-16 md:h-16 rounded-full border border-[#F472B6]/40 bg-[#F472B6]/10 animate-rise" style={{ animationDuration: '8s' }}></div>
          <div className="absolute top-[75%] left-[15%] w-6 h-6 md:w-8 md:h-8 rounded-full border border-[#F472B6]/30 bg-[#F472B6]/10 animate-rise" style={{ animationDuration: '12s' }}></div>

          {/* Right Side */}
          <Coral2 className="absolute top-[25%] right-[5%] w-20 h-20 md:w-28 md:h-28 text-[#F472B6] opacity-40 animate-float" style={{ animationDelay: '1.5s' }} />
          <Star className="absolute top-[65%] right-[10%] w-10 h-10 md:w-14 md:h-14 text-[#38BDF8] opacity-50 animate-float" style={{ animationDelay: '3s' }} />
          <div className="absolute top-[45%] right-[15%] w-16 h-16 md:w-20 md:h-20 rounded-full border border-[#F472B6]/40 bg-[#F472B6]/10 animate-rise" style={{ animationDuration: '10s' }}></div>
          <div className="absolute top-[15%] right-[8%] w-8 h-8 md:w-10 md:h-10 rounded-full border border-[#F472B6]/30 bg-[#F472B6]/10 animate-rise" style={{ animationDuration: '14s' }}></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#EC4899] drop-shadow-[0_0_15px_rgba(236,72,153,0.8)] mb-4 md:mb-6 font-['Fredoka'] tracking-tight">
            SUARA KAMI, SEMANGAT KITA
          </h2>
          
          <div className="relative">
            {/* Soft Glow Behind Video */}
            <div className="absolute inset-0 bg-[#EC4899] opacity-30 blur-[60px] md:blur-[100px] rounded-[3rem] transform scale-105 pointer-events-none"></div>
            
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden border-4 md:border-8 border-[#EC4899] shadow-[0_20px_50px_rgba(236,72,153,0.5)] bg-white/20 transform transition-transform hover:-translate-y-2 duration-500">
              <iframe
                src="https://player.cloudinary.com/embed/?cloud_name=doimdgaa9&public_id=IMG_6419_oyxjdm"
                width="100%"
                height="100%"
                allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full object-cover"
                style={{ border: 'none' }}
              ></iframe>
            </div>
          </div>

          <p className="mt-6 md:mt-8 text-[#0C4A6E] font-medium text-lg md:text-xl font-['Fredoka'] drop-shadow-sm">
            Terus melangkah, raih masa depan bersama.
          </p>
        </div>
      </motion.section>

      {/* Footer with Wave Transition */}
      <footer className="bg-transparent pt-32 pb-16 text-center relative z-10">
        {/* Coral Border 3 - Light Coral */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180 -translate-y-[1px]">
          <svg className="relative block w-full h-[80px] md:h-[120px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,120 C200,90 400,130 600,80 C800,30 1000,100 1200,70 L1200,120 L0,120 Z" className="fill-[#FBCFE8] opacity-80"></path>
            <path d="M0,120 C150,60 350,110 550,50 C750,-10 950,80 1200,40 L1200,120 L0,120 Z" className="fill-[#BAE6FD] opacity-80"></path>
          </svg>
        </div>
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center gap-2 text-[#0284C7] drop-shadow-sm mb-4 font-['Fredoka'] text-lg">
            <span>Dibuat dengan</span>
            <Heart size={20} className="text-[#EC4899] fill-[#EC4899] animate-pulse" />
            <span>oleh Keluarga Ethereance</span>
          </div>
          <p className="text-[#0C4A6E]/90 drop-shadow-sm mb-8">"Bersama mengarungi samudra, bersama meraih cita-cita."</p>
          
          {/* Instagram Link */}
          <div className="mb-10">
            <a 
              href="https://www.instagram.com/ethereancce" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 group"
            >
              <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-[#E0F2FE]/50 border-2 border-[#EC4899] shadow-[0_0_15px_rgba(236,72,153,0.4)] group-hover:shadow-[0_0_25px_rgba(236,72,153,0.8)] group-hover:bg-white/80 transition-all duration-300 group-hover:-translate-y-1">
                <Instagram className="text-[#EC4899] w-6 h-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
              </div>
              <span className="font-['Fredoka'] text-xl font-semibold text-[#0C4A6E] group-hover:text-[#0284C7] transition-colors duration-300">
                @ethereancce
              </span>
            </a>
          </div>

          <div className="h-px bg-[#0C4A6E]/10 w-full mb-8"></div>
          <p className="text-xs text-[#EC4899] font-bold uppercase tracking-widest drop-shadow-sm">
            © 2024 - 2026 ETHEREANCE CLASS • AKU BISA, KAMU BISA, KITA BISA! SUKSES!
          </p>
        </div>
      </footer>
    </motion.div>
  );
}


