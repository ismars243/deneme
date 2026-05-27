import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react';

export function PhotoGallery({ photos }: { photos: string[] }) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  if (photos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-400 gap-2">
        <ImageIcon size={40} strokeWidth={1.5} />
        <p className="text-sm">Henüz fotoğraf yok</p>
      </div>
    );
  }

  function prev() { setLightbox(i => (i !== null && i > 0 ? i - 1 : photos.length - 1)); }
  function next() { setLightbox(i => (i !== null && i < photos.length - 1 ? i + 1 : 0)); }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {photos.map((src, i) => (
          <button
            key={i}
            onClick={() => setLightbox(i)}
            className="aspect-video rounded-xl overflow-hidden bg-gray-100 hover:opacity-90 transition-opacity group relative"
          >
            <img src={src} alt={`Fotoğraf ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
          </button>
        ))}
      </div>

      {lightbox !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 text-white/70 hover:text-white">
            <X size={24} />
          </button>
          <button onClick={prev} className="absolute left-4 text-white/70 hover:text-white p-2">
            <ChevronLeft size={32} />
          </button>
          <img
            src={photos[lightbox]}
            alt=""
            className="max-w-full max-h-[80vh] rounded-xl object-contain"
          />
          <button onClick={next} className="absolute right-4 text-white/70 hover:text-white p-2">
            <ChevronRight size={32} />
          </button>
          <div className="absolute bottom-4 text-white/60 text-sm">
            {lightbox + 1} / {photos.length}
          </div>
        </div>
      )}
    </>
  );
}
