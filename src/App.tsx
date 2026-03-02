/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Upload, Image as ImageIcon, Heart, Anchor, Waves, Music, Play, Pause, X, Save, PenTool, ShipWheel, RefreshCw, Star } from 'lucide-react';

interface Student {
  photo: string;
  name: string;
  role: string;
}

export default function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isMusicOpen, setIsMusicOpen] = useState(false);
  
  // Form State
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  
  // Logbook State
  const [logbookPhoto, setLogbookPhoto] = useState<string | null>(null);
  const [logbookText, setLogbookText] = useState("");
  const [isEditingLogbook, setIsEditingLogbook] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const logbookInputRef = useRef<HTMLInputElement>(null);

  // Bubbles state
  const [bubbles, setBubbles] = useState<{id: number, left: number, size: number, delay: number}[]>([]);

  useEffect(() => {
    // Generate random bubbles
    const newBubbles = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 30 + 10,
      delay: Math.random() * 15,
    }));
    setBubbles(newBubbles);
  }, []);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleLogbookUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setLogbookPhoto(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (previewUrl && name && role) {
      setStudents([...students, { photo: previewUrl, name, role }]);
      // Reset form
      setPreviewUrl(null);
      setName('');
      setRole('');
      setIsFormOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#BDE0FE] font-sans text-slate-800 overflow-x-hidden selection:bg-[#FFC8DD] selection:text-slate-900 relative">
      {/* SoundCloud Player Widget */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {isMusicOpen && (
          <div className="bg-white/90 backdrop-blur-md p-2 rounded-2xl shadow-xl border border-[#FFC8DD] animate-in fade-in slide-in-from-bottom-4 duration-300 w-[300px]">
            <iframe 
              width="100%" 
              height="166" 
              scrolling="no" 
              frameBorder="no" 
              allow="autoplay" 
              src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/337866344&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true"
              className="rounded-xl"
            ></iframe>
            <div className="text-center mt-2 text-xs text-slate-500 font-['Fredoka']">
              Relaxing Ocean Waves 🌊
            </div>
          </div>
        )}
        
        <button 
          onClick={() => setIsMusicOpen(!isMusicOpen)}
          className="bg-white/80 backdrop-blur-md p-4 rounded-full shadow-lg border-2 border-[#FFC8DD] text-blue-500 hover:scale-110 transition-transform animate-bounce-slow group relative"
        >
          {isMusicOpen ? <X size={24} /> : <Music size={24} />}
          <span className="absolute -top-2 -right-2 bg-[#FFC8DD] text-xs font-bold px-2 py-0.5 rounded-full text-pink-600 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {isMusicOpen ? 'Tutup' : 'Musik Pantai'}
          </span>
        </button>
      </div>

      {/* Background Bubbles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
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
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden z-10">
        {/* Animated Background Waves (Blobs) */}
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-[#FFC8DD] rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-10 right-10 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="z-10 bg-white/30 backdrop-blur-md border border-white/50 p-6 md:p-16 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] max-w-4xl w-full mx-auto transform transition-all hover:scale-[1.02] duration-500">
          <div className="flex justify-center mb-6 text-blue-500">
            <Anchor size={48} strokeWidth={1.5} />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 mb-4 drop-shadow-sm px-2">
            ETHEREANCE
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-medium text-slate-700 tracking-wide font-['Fredoka']">
            AKU BISA, KAMU BISA, KITA BISA!
          </p>
        </div>

        {/* Bottom Wave SVG */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none">
          <svg className="relative block w-full h-[100px] md:h-[150px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118,130.9,122.9,190.41,109.1,236.4,98.8,280.5,76.5,321.39,56.44Z" className="fill-white/40"></path>
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" className="fill-white/60" opacity=".5"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" className="fill-white" opacity=".25"></path>
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-white/60 backdrop-blur-sm relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-3 bg-[#FFC8DD] rounded-full mb-6 text-pink-600 shadow-sm">
            <Waves size={32} />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-6 font-['Fredoka']">Tentang Kelas Kami</h2>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Kami adalah keluarga besar yang solid, ceria, dan penuh semangat! 
            Seperti luasnya samudra, potensi kami tak terbatas. Bersama-sama, 
            kami mengarungi lautan ilmu, menghadapi ombak tantangan, dan berlabuh 
            pada kesuksesan.
          </p>
        </div>
      </section>

      {/* Student Gallery Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-4 font-['Fredoka']">Galeri Murid</h2>
          <p className="text-slate-600 mb-8 px-4">Kenalan yuk sama anggota awak kapal Ethereance!</p>
          
          {/* Add Student Button */}
          <button 
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2 bg-white/80 hover:bg-white text-blue-600 px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all border border-blue-100 backdrop-blur-sm hover:-translate-y-1 cursor-pointer mx-auto"
          >
            <Upload size={20} />
            <span>Tambah Murid</span>
          </button>
        </div>

        {/* Add Student Modal */}
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl relative animate-in fade-in zoom-in duration-300">
              <button 
                onClick={() => setIsFormOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              >
                <X size={24} />
              </button>
              
              <h3 className="text-2xl font-bold text-center mb-6 text-blue-600 font-['Fredoka']">Tambah Anggota Baru</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Photo Upload */}
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-blue-200 rounded-xl p-8 text-center cursor-pointer hover:bg-blue-50 transition-colors group"
                >
                  {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="w-32 h-32 object-cover rounded-full mx-auto border-4 border-[#FFC8DD] shadow-md" />
                  ) : (
                    <div className="flex flex-col items-center text-blue-400 group-hover:text-blue-500">
                      <ImageIcon size={48} className="mb-2" />
                      <span className="text-sm font-medium">Klik untuk pilih foto</span>
                    </div>
                  )}
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                  />
                </div>

                {/* Inputs */}
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Nama Murid</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                    placeholder="Contoh: Budi Santoso"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Jabatan / Kesan Singkat</label>
                  <input 
                    type="text" 
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                    placeholder="Contoh: Ketua Kelas / Si Paling Rajin"
                    required
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3 rounded-xl shadow-md transform transition hover:scale-[1.02]"
                >
                  Simpan ke Galeri
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Gallery Grid */}
        {students.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {students.map((student, index) => (
              <div 
                key={index} 
                className="group relative flex flex-col bg-white/40 backdrop-blur-md rounded-2xl overflow-hidden border-[6px] border-[#FFC8DD] shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="aspect-[3/4] overflow-hidden relative">
                  <img 
                    src={student.photo} 
                    alt={student.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                {/* Biodata Section */}
                <div className="p-4 text-center bg-white/80 backdrop-blur-sm border-t border-[#FFC8DD]/50">
                  <h3 className="font-['Fredoka'] font-bold text-lg text-slate-800 mb-1 truncate">{student.name}</h3>
                  <p className="font-['Fredoka'] text-sm text-pink-500 font-medium truncate">{student.role}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white/30 backdrop-blur-sm rounded-3xl border border-white/50 border-dashed">
            <ImageIcon size={64} className="text-blue-300 mb-4" />
            <p className="text-slate-500 text-lg">Belum ada foto. Yuk tambah anggota baru!</p>
          </div>
        )}
      </section>

      {/* Logbook Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-4 font-['Fredoka']">Logbook ETHEREANCE</h2>
          <p className="text-slate-600">Jurnal perjalanan kelas kita mengarungi samudra ilmu.</p>
        </div>

        <div className="bg-white/30 backdrop-blur-md border-[8px] border-[#BDE0FE] rounded-[3rem] p-6 md:p-12 relative shadow-2xl mx-auto transform transition-all hover:scale-[1.01]">
          {/* Decorative Icons - Adjusted for mobile symmetry */}
          <Anchor className="absolute top-4 left-4 md:top-6 md:left-6 text-[#BDE0FE] rotate-[-45deg] drop-shadow-sm opacity-40 md:opacity-100" size={32} />
          <ShipWheel className="absolute bottom-4 right-4 md:bottom-6 md:right-6 text-[#BDE0FE] animate-spin-slow drop-shadow-sm opacity-40 md:opacity-100" size={32} />
          
          {/* Starfish Decoration (Top Left) */}
          <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 text-[#FFC8DD] drop-shadow-md animate-pulse">
            <Star size={48} fill="#FFC8DD" className="rotate-12 md:w-16 md:h-16" />
          </div>
          
          {/* Shell Decoration (Bottom Right) */}
          <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 text-[#FFC8DD] drop-shadow-md">
             <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" className="rotate-[-15deg] md:w-16 md:h-16">
               <path d="M12 2C7 2 3 7 3 13C3 16 5 19 8 20C8 21 9 22 12 22C15 22 16 21 16 20C19 19 21 16 21 13C21 7 17 2 12 2ZM12 20C10.5 20 9.5 19 9 18C10 18 11 17 12 17C13 17 14 18 15 18C14.5 19 13.5 20 12 20ZM12 4C15.5 4 18.5 7.5 19 13C19 13.5 18.5 14 18 14C17.5 14 17 13.5 17 13C16.5 8.5 14.5 6 12 6C9.5 6 7.5 8.5 7 13C7 13.5 6.5 14 6 14C5.5 14 5 13.5 5 13C5.5 7.5 8.5 4 12 4Z" />
             </svg>
          </div>

          {/* Photo Upload Area */}
          <div 
            onClick={() => !logbookPhoto && logbookInputRef.current?.click()}
            className={`w-full aspect-video bg-white/50 backdrop-blur-sm rounded-2xl border-4 border-dashed border-blue-200 flex items-center justify-center cursor-pointer hover:bg-white/60 transition-all overflow-hidden relative group shadow-inner ${!logbookPhoto ? 'hover:border-blue-300' : 'border-transparent'}`}
          >
            {logbookPhoto ? (
              <>
                <img 
                  src={logbookPhoto} 
                  alt="Logbook Memory" 
                  className="w-full h-full object-cover animate-in fade-in duration-1000" 
                />
                {/* Change Photo Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    logbookInputRef.current?.click();
                  }}
                  className="absolute top-4 right-4 bg-white/90 text-blue-600 px-3 py-1.5 rounded-full text-sm font-medium shadow-md hover:bg-blue-50 transition-colors flex items-center gap-2 z-10 hover:scale-105"
                >
                  <RefreshCw size={14} /> Ganti Foto
                </button>
              </>
            ) : (
              <div className="text-center text-blue-400 group-hover:text-blue-500 transition-colors p-4">
                <ImageIcon size={64} className="mx-auto mb-4 opacity-50" />
                <p className="font-['Fredoka'] text-xl mb-2">Upload Foto Kenangan (Landscape)</p>
                <p className="text-sm opacity-70">Klik di sini untuk memilih foto momen seru kelas</p>
              </div>
            )}
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={logbookInputRef}
              onChange={handleLogbookUpload}
            />
          </div>

          {/* Editable Description with Journal Paper Effect */}
          <div className="mt-8 relative">
            <div className={`rounded-2xl p-6 border border-slate-200/60 shadow-sm transition-all ${isEditingLogbook ? 'ring-4 ring-[#FFC8DD] border-[#FFC8DD]' : 'hover:shadow-md'} bg-[#FDFBF7]/90 backdrop-blur-sm`}>
              {isEditingLogbook ? (
                <div className="flex flex-col gap-4">
                  <textarea
                    value={logbookText}
                    onChange={(e) => setLogbookText(e.target.value)}
                    className="w-full bg-transparent border-none focus:ring-0 text-slate-700 text-lg leading-relaxed font-medium resize-none min-h-[120px] placeholder-blue-300/70 font-['Fredoka']"
                    placeholder="Klik di sini untuk menulis cerita..."
                    autoFocus
                  />
                  <div className="flex justify-end">
                    <button 
                      onClick={() => setIsEditingLogbook(false)}
                      className="flex items-center gap-2 bg-[#BDE0FE] hover:bg-blue-300 text-blue-800 px-6 py-2 rounded-full font-bold transition-colors shadow-md"
                    >
                      <Save size={18} />
                      Simpan Catatan
                    </button>
                  </div>
                </div>
              ) : (
                <div 
                  onClick={() => setIsEditingLogbook(true)}
                  className="cursor-text min-h-[120px] relative group"
                >
                  <p className={`text-lg leading-relaxed whitespace-pre-wrap font-medium font-['Fredoka'] ${!logbookText ? 'text-blue-300/70' : 'text-slate-700'}`}>
                    {logbookText || "Klik di sini untuk menulis cerita..."}
                  </p>
                  <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400">
                    <PenTool size={20} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-transparent to-blue-200/50 py-10 text-center relative z-10">
        <div className="flex items-center justify-center gap-2 text-slate-600 mb-2">
          <span>Dibuat dengan</span>
          <Heart size={16} className="text-[#FFC8DD] fill-[#FFC8DD] animate-pulse" />
          <span>oleh Ethereance</span>
        </div>
        <p className="text-sm text-slate-500">Teruslah berlayar menggapai mimpi!</p>
      </footer>
    </div>
  );
}


