import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Sample photo data
const photoData = [
  {
    id: 1,
    title: "Themba in het park",
    description: "Een prachtige dag in het park waar Themba geniet van de zon",
    date: "2025-04-15",
    image: "https://placehold.co/1200x800/amber/white?text=Themba+in+het+park",
    thumbnail: "https://placehold.co/400x300/amber/white?text=Themba+thumbnail",
    category: "themba",
    featured: true
  },
  {
    id: 2,
    title: "Motsi bij het meer",
    description: "Motsi geniet van een verkoelende duik in het meer",
    date: "2025-04-16",
    image: "https://placehold.co/1200x800/amber/white?text=Motsi+bij+het+meer",
    thumbnail: "https://placehold.co/400x300/amber/white?text=Motsi+thumbnail",
    category: "motsi",
    featured: false
  },
  {
    id: 3,
    title: "Themba en Motsi samen",
    description: "Een mooie wandeling in het bos met beide honden",
    date: "2025-06-10",
    image: "https://placehold.co/1200x800/amber/white?text=Themba+en+Motsi+samen",
    thumbnail: "https://placehold.co/400x300/amber/white?text=Samen+thumbnail",
    category: "beide",
    featured: true
  }
];

export default function PhotoGallery() {
  const [photos, setPhotos] = useState(photoData);
  const [filteredPhotos, setFilteredPhotos] = useState(photoData);
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Filter photos when activeFilter changes
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredPhotos(photos);
    } else {
      setFilteredPhotos(photos.filter(photo => photo.category === activeFilter));
    }
  }, [activeFilter, photos]);

  // Handle filter click
  const handleFilterClick = (category) => {
    setActiveFilter(category);
  };

  // Open lightbox
  const openLightbox = (index) => {
    setCurrentPhotoIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Navigate to previous photo
  const prevPhoto = () => {
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === 0 ? filteredPhotos.length - 1 : prevIndex - 1
    );
  };

  // Navigate to next photo
  const nextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === filteredPhotos.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;

      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          prevPhoto();
          break;
        case 'ArrowRight':
          nextPhoto();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Filter Tabs */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        <button
          className={`px-5 py-2 rounded-full transition-colors ${
            activeFilter === 'all'
              ? 'bg-amber-800 text-white'
              : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
          }`}
          onClick={() => handleFilterClick('all')}
        >
          Alle Foto's
        </button>
        <button
          className={`px-5 py-2 rounded-full transition-colors ${
            activeFilter === 'themba'
              ? 'bg-amber-800 text-white'
              : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
          }`}
          onClick={() => handleFilterClick('themba')}
        >
          Themba
        </button>
        <button
          className={`px-5 py-2 rounded-full transition-colors ${
            activeFilter === 'motsi'
              ? 'bg-amber-800 text-white'
              : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
          }`}
          onClick={() => handleFilterClick('motsi')}
        >
          Motsi
        </button>
        <button
          className={`px-5 py-2 rounded-full transition-colors ${
            activeFilter === 'beide'
              ? 'bg-amber-800 text-white'
              : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
          }`}
          onClick={() => handleFilterClick('beide')}
        >
          Samen
        </button>
        <button
          className={`px-5 py-2 rounded-full transition-colors ${
            activeFilter === 'pups'
              ? 'bg-amber-800 text-white'
              : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
          }`}
          onClick={() => handleFilterClick('pups')}
        >
          Pups
        </button>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredPhotos.map((photo, index) => (
          <motion.div
            key={photo.id}
            className="bg-white rounded-lg overflow-hidden shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div
              className="relative cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => openLightbox(index)}
            >
              <img
                src={photo.thumbnail || photo.image}
                alt={photo.title}
                className="w-full h-64 object-cover"
              />
              {photo.featured && (
                <span className="absolute top-2 right-2 bg-amber-600 text-white text-xs px-2 py-1 rounded-full">
                  Uitgelicht
                </span>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-amber-800 mb-1">{photo.title}</h3>
              <p className="text-sm text-gray-600">
                {new Date(photo.date).toLocaleDateString('nl-NL')}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && filteredPhotos.length > 0 && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              className="absolute top-6 right-6 text-white text-4xl hover:text-amber-300"
              onClick={closeLightbox}
            >
              &times;
            </button>
            <button
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-amber-300"
              onClick={prevPhoto}
            >
              &#10094;
            </button>
            <button
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-amber-300"
              onClick={nextPhoto}
            >
              &#10095;
            </button>
            <motion.img
              key={currentPhotoIndex}
              src={filteredPhotos[currentPhotoIndex].image}
              alt={filteredPhotos[currentPhotoIndex].title}
              className="max-h-[90vh] max-w-[90vw] object-contain"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <div className="absolute bottom-6 left-0 right-0 text-center text-white bg-black bg-opacity-50 py-2">
              {filteredPhotos[currentPhotoIndex].title} - {new Date(filteredPhotos[currentPhotoIndex].date).toLocaleDateString('nl-NL')}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
