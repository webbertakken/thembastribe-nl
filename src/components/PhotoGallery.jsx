import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GalleryLightbox from './GalleryLightbox';

// Import optimized images
import thembaPortraitOpt from '../assets/optimized/themba-portrait.webp';
import motsiPortraitOpt from '../assets/optimized/motsi-portrait.webp';
import thembaHeroOpt from '../assets/optimized/themba-hero.webp';
import motsiInfoOpt from '../assets/optimized/motsi-info.webp';
import beachOpt from '../assets/optimized/20240801_204858.webp';
import campingOpt from '../assets/optimized/20240802_122556.webp';
import forestOpt from '../assets/optimized/20240810_114538.webp';
import waterOpt from '../assets/optimized/20240810_121156.webp';
import morningWalkOpt from '../assets/optimized/20240820_085023.webp';
import sunsetOpt from '../assets/optimized/20240820_154700.webp';

// Import thumbnails
import thembaPortraitThumb from '../assets/thumbnails/thumb-themba-portrait.webp';
import motsiPortraitThumb from '../assets/thumbnails/thumb-motsi-portrait.webp';
import thembaHeroThumb from '../assets/thumbnails/thumb-themba-hero.webp';
import motsiInfoThumb from '../assets/thumbnails/thumb-motsi-info.webp';
import beachThumb from '../assets/thumbnails/thumb-20240801_204858.webp';
import campingThumb from '../assets/thumbnails/thumb-20240802_122556.webp';
import forestThumb from '../assets/thumbnails/thumb-20240810_114538.webp';
import waterThumb from '../assets/thumbnails/thumb-20240810_121156.webp';
import morningWalkThumb from '../assets/thumbnails/thumb-20240820_085023.webp';
import sunsetThumb from '../assets/thumbnails/thumb-20240820_154700.webp';

// Photo data with imported images
const photoData = [
  {
    id: 1,
    title: "Themba in de tuin",
    description: "Themba geniet van een zonnige dag in de tuin",
    date: "2025-04-08",
    image: thembaPortraitOpt,
    thumbnail: thembaPortraitThumb,
    category: "themba",
    featured: true
  },
  {
    id: 2,
    title: "Motsi van de Palsenborghœve",
    description: "Motsi, kampioen en trotse vader van het aankomende nestje",
    date: "2023-05-20",
    image: motsiPortraitOpt,
    thumbnail: motsiPortraitThumb,
    category: "motsi",
    featured: true
  },
  {
    id: 3,
    title: "Themba in Oostenrijk",
    description: "Heerlijk genieten van het uitzicht",
    date: "2024-08-10",
    image: thembaHeroOpt,
    thumbnail: thembaHeroThumb,
    category: "themba",
    featured: false
  },
  {
    id: 4,
    title: "Motsi's officiële informatie",
    description: "Stamboom en gezondheidsgegevens van Motsi",
    date: "2021-08-01",
    image: motsiInfoOpt,
    thumbnail: motsiInfoThumb,
    category: "motsi",
    featured: false
  },
  // New photos from August 2024
  {
    id: 5,
    title: "Themba aan het strandje",
    description: "Themba geniet van een mooie zomerdag bij het water",
    date: "2024-08-01",
    image: beachOpt,
    thumbnail: beachThumb,
    category: "themba",
    featured: false
  },
  {
    id: 6,
    title: "Themba and Bosi",
    description: "Samen lekker camperen in de campervan",
    date: "2024-08-02",
    image: campingOpt,
    thumbnail: campingThumb,
    category: "themba",
    featured: false
  },
  {
    id: 7,
    title: "Themba met Bosi in het bos",
    description: "Samen op avontuur tijdens een boswandeling",
    date: "2024-08-10",
    image: forestOpt,
    thumbnail: forestThumb,
    category: "themba",
    featured: false
  },
  {
    id: 8,
    title: "Spelen bij de waterrand",
    description: "Themba en Bosi genieten van het water tijdens een warme dag",
    date: "2024-08-10",
    image: waterOpt,
    thumbnail: waterThumb,
    category: "themba",
    featured: false
  },
  {
    id: 9,
    title: "Ochtendwandeling",
    description: "Vroeg in de ochtend, klaar voor een nieuwe dag",
    date: "2024-08-20",
    image: morningWalkOpt,
    thumbnail: morningWalkThumb,
    category: "themba",
    featured: false
  },
  {
    id: 10,
    title: "Themba bij zonsondergang",
    description: "Een prachtige afsluiting van een fijne dag samen",
    date: "2024-08-20",
    image: sunsetOpt,
    thumbnail: sunsetThumb,
    category: "themba",
    featured: true
  }
];

export default function PhotoGallery() {
  // Sort photos by featured status first, then by date
  const sortPhotos = (photos) => {
    return [...photos].sort((a, b) => {
      // First sort by featured status (featured photos first)
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;

      // Then sort by date (newest first)
      return new Date(b.date) - new Date(a.date);
    });
  };

  const [photos, setPhotos] = useState(() => sortPhotos(photoData));
  const [filteredPhotos, setFilteredPhotos] = useState(() => sortPhotos(photoData));
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Filter photos when activeFilter changes
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredPhotos(photos);
    } else {
      setFilteredPhotos(sortPhotos(photos.filter(photo => photo.category === activeFilter)));
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
  };

  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  // Format photos for lightbox
  const lightboxImages = filteredPhotos.map(photo => ({
    src: photo.image,
    alt: photo.title,
    title: photo.title,
    description: photo.description,
    date: photo.date
  }));

  return (
    <div className="max-w-6xl mx-auto">
      {/* Filter Tabs */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        <button
          className={`px-5 py-2 rounded-full transition-colors cursor-pointer ${
            activeFilter === 'all'
              ? 'bg-amber-800 text-white'
              : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
          }`}
          onClick={() => handleFilterClick('all')}
        >
          Alle Foto's
        </button>
        <button
          className={`px-5 py-2 rounded-full transition-colors cursor-pointer ${
            activeFilter === 'themba'
              ? 'bg-amber-800 text-white'
              : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
          }`}
          onClick={() => handleFilterClick('themba')}
        >
          Themba
        </button>
        <button
          className={`px-5 py-2 rounded-full transition-colors cursor-pointer ${
            activeFilter === 'motsi'
              ? 'bg-amber-800 text-white'
              : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
          }`}
          onClick={() => handleFilterClick('motsi')}
        >
          Motsi
        </button>
        <button
          className={`px-5 py-2 rounded-full transition-colors cursor-pointer ${
            activeFilter === 'beide'
              ? 'bg-amber-800 text-white'
              : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
          }`}
          onClick={() => handleFilterClick('beide')}
        >
          Samen
        </button>
        <button
          className={`px-5 py-2 rounded-full transition-colors cursor-pointer ${
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
                src={photo.thumbnail.src || photo.thumbnail}
                alt={photo.title}
                className="w-full h-64 object-cover"
                loading="lazy"
                width={300}
                height={200}
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

      {/* Use the external GalleryLightbox component */}
      <GalleryLightbox
        images={lightboxImages}
        initialIndex={currentPhotoIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
      />

      {filteredPhotos.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Geen foto's gevonden in deze categorie.</p>
        </div>
      )}
    </div>
  );
}
