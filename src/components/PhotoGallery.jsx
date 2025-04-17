import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Photo data using real images from public/images folder
const photoData = [
  {
    id: 1,
    title: "Themba in de tuin",
    description: "Themba geniet van een zonnige dag in de tuin",
    date: "2025-04-08",
    image: "/images/themba-portrait.png",
    thumbnail: "/images/themba-portrait.png",
    category: "themba",
    featured: true
  },
  {
    id: 2,
    title: "Motsi van de Palsenborghœve",
    description: "Motsi, kampioen en trotse vader van het aankomende nestje",
    date: "2023-05-20",
    image: "/images/motsi-portrait.jpg",
    thumbnail: "/images/motsi-portrait.jpg",
    category: "motsi",
    featured: true
  },
  {
    id: 3,
    title: "Themba in Oostenrijk",
    description: "Heerlijk genieten van het uitzicht",
    date: "2024-08-10",
    image: "/images/themba-hero.jpg",
    thumbnail: "/images/themba-hero.jpg",
    category: "themba",
    featured: false
  },
  {
    id: 4,
    title: "Motsi's officiële informatie",
    description: "Stamboom en gezondheidsgegevens van Motsi",
    date: "2021-08-01",
    image: "/images/motsi-info.webp",
    thumbnail: "/images/motsi-info.webp",
    category: "motsi",
    featured: false
  },
  // New photos from August 2024
  {
    id: 5,
    title: "Themba aan het strandje",
    description: "Themba geniet van een mooie zomerdag bij het water",
    date: "2024-08-01",
    image: "/images/20240801_204858.jpg",
    thumbnail: "/images/20240801_204858.jpg",
    category: "themba",
    featured: false
  },
  {
    id: 6,
    title: "Themba and Bosi",
    description: "Samen lekker camperen in de campervan",
    date: "2024-08-02",
    image: "/images/20240802_122556.jpg",
    thumbnail: "/images/20240802_122556.jpg",
    category: "themba",
    featured: false
  },
  {
    id: 7,
    title: "Themba met Bosi in het bos",
    description: "Samen op avontuur tijdens een boswandeling",
    date: "2024-08-10",
    image: "/images/20240810_114538.jpg",
    thumbnail: "/images/20240810_114538.jpg",
    category: "themba",
    featured: false
  },
  {
    id: 8,
    title: "Spelen bij de waterrand",
    description: "Themba en Bosi genieten van het water tijdens een warme dag",
    date: "2024-08-10",
    image: "/images/20240810_121156.jpg",
    thumbnail: "/images/20240810_121156.jpg",
    category: "themba",
    featured: false
  },
  {
    id: 9,
    title: "Ochtendwandeling",
    description: "Vroeg in de ochtend, klaar voor een nieuwe dag",
    date: "2024-08-20",
    image: "/images/20240820_085023.jpg",
    thumbnail: "/images/20240820_085023.jpg",
    category: "themba",
    featured: false
  },
  {
    id: 10,
    title: "Themba bij zonsondergang",
    description: "Een prachtige afsluiting van een fijne dag samen",
    date: "2024-08-20",
    image: "/images/20240820_154700.jpg",
    thumbnail: "/images/20240820_154700.jpg",
    category: "themba",
    featured: true
  }
];

export default function PhotoGallery() {
  // Sort photos by date, newest first
  const [photos, setPhotos] = useState(() =>
    [...photoData].sort((a, b) => new Date(b.date) - new Date(a.date))
  );
  const [filteredPhotos, setFilteredPhotos] = useState(() =>
    [...photoData].sort((a, b) => new Date(b.date) - new Date(a.date))
  );
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
                src={photo.thumbnail}
                alt={photo.title}
                className="w-full h-64 object-cover"
                loading="lazy"
              />
              {photo.featured && (
                <span className="absolute top-2 right-2 bg-amber-600 text-white text-xs px-2 py-1 rounded-full">
                  Uitgelicht
                </span>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-amber-800 mb-1">{photo.title}</h3>
              <p className="text-sm text-gray-600 mb-2">
                {new Date(photo.date).toLocaleDateString('nl-NL')}
              </p>
              <p className="text-sm text-gray-700">{photo.description}</p>
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
              className="max-h-[85vh] max-w-[85vw] object-contain"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <div className="absolute bottom-6 left-0 right-0 text-center">
              <div className="bg-black bg-opacity-70 mx-auto p-3 max-w-2xl">
                <h2 className="text-white text-xl mb-1">{filteredPhotos[currentPhotoIndex].title}</h2>
                <p className="text-gray-300 text-sm">{filteredPhotos[currentPhotoIndex].description}</p>
                <p className="text-gray-400 text-xs mt-2">{new Date(filteredPhotos[currentPhotoIndex].date).toLocaleDateString('nl-NL')}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {filteredPhotos.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Geen foto's gevonden in deze categorie.</p>
        </div>
      )}
    </div>
  );
}
