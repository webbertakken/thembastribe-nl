import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import GalleryLightbox from "./GalleryLightbox";
import PhotoFilters from "./PhotoFilters";

// Import optimized images
import thembaPortraitOpt from "../assets/optimized/themba-portrait.webp";
import motsiPortraitOpt from "../assets/optimized/motsi-portrait.webp";
import thembaHeroOpt from "../assets/optimized/themba-hero.webp";
import motsiInfoOpt from "../assets/optimized/motsi-info.webp";
import beachOpt from "../assets/optimized/20240801_204858.webp";
import campingOpt from "../assets/optimized/20240802_122556.webp";
import forestOpt from "../assets/optimized/20240810_114538.webp";
import waterOpt from "../assets/optimized/20240810_121156.webp";
import morningWalkOpt from "../assets/optimized/20240820_085023.webp";
import sunsetOpt from "../assets/optimized/20240820_154700.webp";
import lilacFemale from "../assets/optimized/lilac-female-20250515_201908.webp";
import cyanMale from "../assets/optimized/cyan-male-20250515_205442.webp";
import blueMale from "../assets/optimized/blue-male-20250515_202347.webp";
import reutjeGroenOpt from "../assets/optimized/reutje-groen-20250516_193750.webp";
import teefjeOranjeOpt from "../assets/optimized/teefje-oranje-20250517_105257.webp";
import teefjeGeelOpt from "../assets/optimized/teefje-geel-20250517_112037.webp";
import reutjeDonkerblauwOpt from "../assets/optimized/reutje-donkerblauw-20250517_114558.webp";
import deTeefjesOpt from "../assets/optimized/de-teefjes-20250517_115328.webp";
import reutjePaarsOpt from "../assets/optimized/reutje-paars-20250517_103059.webp";
import deReutjesOpt from "../assets/optimized/de-reutjes-20250517_115831.webp";
import teefjeLichtblauwOpt from "../assets/optimized/teefje-lichtblauw-20250517_110301.webp";
import reutjeRoodOpt from "../assets/optimized/reutje-rood-20250517_101817.webp";
import teefjeRozeOpt from "../assets/optimized/teefje-roze-20250516_200353.webp";

// Import thumbnails
import thembaPortraitThumb from "../assets/thumbnails/thumb-themba-portrait.webp";
import motsiPortraitThumb from "../assets/thumbnails/thumb-motsi-portrait.webp";
import thembaHeroThumb from "../assets/thumbnails/thumb-themba-hero.webp";
import motsiInfoThumb from "../assets/thumbnails/thumb-motsi-info.webp";
import beachThumb from "../assets/thumbnails/thumb-20240801_204858.webp";
import campingThumb from "../assets/thumbnails/thumb-20240802_122556.webp";
import forestThumb from "../assets/thumbnails/thumb-20240810_114538.webp";
import waterThumb from "../assets/thumbnails/thumb-20240810_121156.webp";
import morningWalkThumb from "../assets/thumbnails/thumb-20240820_085023.webp";
import sunsetThumb from "../assets/thumbnails/thumb-20240820_154700.webp";
import lilacFemaleThumb from "../assets/thumbnails/thumb-lilac-female-20250515_201908.webp";
import cyanMaleThumb from "../assets/thumbnails/thumb-cyan-male-20250515_205442.webp";
import blueMaleThumb from "../assets/thumbnails/thumb-blue-male-20250515_202347.webp";
import reutjeGroenThumb from "../assets/thumbnails/thumb-reutje-groen-20250516_193750.webp";
import teefjeOranjeThumb from "../assets/thumbnails/thumb-teefje-oranje-20250517_105257.webp";
import teefjeGeelThumb from "../assets/thumbnails/thumb-teefje-geel-20250517_112037.webp";
import reutjeDonkerblauwThumb from "../assets/thumbnails/thumb-reutje-donkerblauw-20250517_114558.webp";
import deTeefjesThumb from "../assets/thumbnails/thumb-de-teefjes-20250517_115328.webp";
import reutjePaarsThumb from "../assets/thumbnails/thumb-reutje-paars-20250517_103059.webp";
import deReutjesThumb from "../assets/thumbnails/thumb-de-reutjes-20250517_115831.webp";
import teefjeLichtblauwThumb from "../assets/thumbnails/thumb-teefje-lichtblauw-20250517_110301.webp";
import reutjeRoodThumb from "../assets/thumbnails/thumb-reutje-rood-20250517_101817.webp";
import teefjeRozeThumb from "../assets/thumbnails/thumb-teefje-roze-20250516_200353.webp";

// Photo data with imported images
const photoData = [
  // {
  //   id: 1,
  //   title: "Themba in de tuin",
  //   description: "Themba geniet van een zonnige dag in de tuin",
  //   date: "2025-04-08",
  //   image: thembaPortraitOpt,
  //   thumbnail: thembaPortraitThumb,
  //   categories: "themba",
  //   featured: true,
  // },
  {
    id: 2,
    title: "Motsi van de Palsenborghœve",
    description: "Motsi, kampioen en trotse vader van het nestje",
    date: "",
    image: motsiPortraitOpt,
    thumbnail: motsiPortraitThumb,
    categories: ["motsi"],
    featured: true,
  },
  // {
  //   id: 3,
  //   title: "Themba in Oostenrijk",
  //   description: "Heerlijk genieten van het uitzicht",
  //   date: "2024-08-10",
  //   image: thembaHeroOpt,
  //   thumbnail: thembaHeroThumb,
  //   categories: "themba",
  //   featured: false,
  // },
  {
    id: 4,
    title: "Motsi's officiële informatie",
    description: "Stamboom en gezondheidsgegevens van Motsi",
    date: "",
    image: motsiInfoOpt,
    thumbnail: motsiInfoThumb,
    categories: ["motsi"],
    featured: false,
  },
  // {
  //   id: 5,
  //   title: "Themba aan het strandje",
  //   description: "Themba geniet van een mooie zomerdag bij het water",
  //   date: "2024-08-01",
  //   image: beachOpt,
  //   thumbnail: beachThumb,
  //   categories: ["themba"],
  //   featured: false,
  // },
  {
    id: 6,
    title: "Themba and Bosi",
    description: "Samen lekker kamperen met de camper",
    date: "2024",
    image: campingOpt,
    thumbnail: campingThumb,
    categories: ["themba"],
    featured: false,
  },
  // {
  //   id: 7,
  //   title: "Themba met Bosi in het bos",
  //   description: "Samen op avontuur tijdens een boswandeling",
  //   date: "2024-08-10",
  //   image: forestOpt,
  //   thumbnail: forestThumb,
  //   categories: ["themba"],
  //   featured: false,
  // },
  {
    id: 8,
    title: "Spelen bij de waterrand",
    description:
      "Themba en Bosi genieten bij het water tijdens een warme dag in Noorwegen",
    date: "2024",
    image: waterOpt,
    thumbnail: waterThumb,
    categories: ["themba"],
    featured: false,
  },
  {
    id: 9,
    title: "Ochtendwandeling",
    description: "Vroeg in de ochtend, klaar voor een nieuwe dag",
    date: "2024",
    image: morningWalkOpt,
    thumbnail: morningWalkThumb,
    categories: ["themba"],
    featured: false,
  },
  {
    id: 10,
    title: "Themba in Noorwegen",
    description: "Samen op avontuur!",
    date: "2024",
    image: sunsetOpt,
    thumbnail: sunsetThumb,
    categories: ["themba"],
    featured: true,
  },
  // {
  //   id: 11,
  //   title: "Teefje lila",
  //   description: "",
  //   date: "2025-05-15",
  //   image: lilacFemale,
  //   thumbnail: lilacFemaleThumb,
  //   categories: ["pups"],
  //   featured: true,
  // },
  // {
  //   id: 12,
  //   title: "Reutje lichtblauw",
  //   description: "",
  //   date: "2025-05-15",
  //   image: cyanMale,
  //   thumbnail: cyanMaleThumb,
  //   categories: ["pups"],
  //   featured: true,
  // },
  // {
  //   id: 13,
  //   title: "Reutje donkerblauw",
  //   description: "",
  //   date: "2025-05-15",
  //   image: blueMale,
  //   thumbnail: blueMaleThumb,
  //   categories: ["pups"],
  //   featured: true,
  // },
  {
    id: 15,
    title: "Reutje groen",
    description: "",
    date: "2025",
    image: reutjeGroenOpt,
    thumbnail: reutjeGroenThumb,
    categories: ["pups"],
    featured: false,
  },
  {
    id: 16,
    title: "Teefje oranje",
    description: "",
    date: "2025",
    image: teefjeOranjeOpt,
    thumbnail: teefjeOranjeThumb,
    categories: ["pups"],
    featured: false,
  },
  {
    id: 17,
    title: "Teefje geel",
    description: "",
    date: "2025",
    image: teefjeGeelOpt,
    thumbnail: teefjeGeelThumb,
    categories: ["pups"],
    featured: false,
  },
  {
    id: 18,
    title: "Reutje donkerblauw",
    description: "",
    date: "2025",
    image: reutjeDonkerblauwOpt,
    thumbnail: reutjeDonkerblauwThumb,
    categories: ["pups"],
    featured: false,
  },
  {
    id: 19,
    title: "Reutje paars",
    description: "",
    date: "2025",
    image: reutjePaarsOpt,
    thumbnail: reutjePaarsThumb,
    categories: ["pups"],
    featured: false,
  },
  {
    id: 20,
    title: "Teefje lichtblauw",
    description: "",
    date: "2025",
    image: teefjeLichtblauwOpt,
    thumbnail: teefjeLichtblauwThumb,
    categories: ["pups"],
    featured: false,
  },
  {
    id: 21,
    title: "Reutje rood",
    description: "",
    date: "2025",
    image: reutjeRoodOpt,
    thumbnail: reutjeRoodThumb,
    categories: ["pups"],
    featured: false,
  },
  {
    id: 22,
    title: "Teefje roze",
    description: "",
    date: "2025",
    image: teefjeRozeOpt,
    thumbnail: teefjeRozeThumb,
    categories: ["pups"],
    featured: false,
  },
  {
    id: 23,
    title: "De teefjes",
    description: "",
    date: "2025",
    image: deTeefjesOpt,
    thumbnail: deTeefjesThumb,
    categories: ["pups", "samen"],
    featured: true,
  },
  {
    id: 24,
    title: "De reutjes",
    description: "",
    date: "2025",
    image: deReutjesOpt,
    thumbnail: deReutjesThumb,
    categories: ["pups", "samen"],
    featured: true,
  },
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
  const [filteredPhotos, setFilteredPhotos] = useState(() =>
    sortPhotos(photoData),
  );
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Filter photos when activeFilter changes
  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredPhotos(photos);
    } else {
      setFilteredPhotos(
        sortPhotos(
          photos.filter((photo) => photo.categories.includes(activeFilter)),
        ),
      );
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
  const lightboxImages = filteredPhotos.map((photo) => ({
    src: photo.image,
    alt: photo.title,
    title: photo.title,
    description: photo.description,
    date: photo.date,
  }));

  return (
    <div className="max-w-6xl mx-auto">
      <PhotoFilters
        activeFilter={activeFilter}
        onFilterChange={handleFilterClick}
      />

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
              <h3 className="font-semibold text-amber-800 mb-1">
                {photo.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {/*{new Date(photo.date).toLocaleDateString("nl-NL")}*/}
                {photo.date}
              </p>
              <p className="text-sm text-gray-700">{photo.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <GalleryLightbox
        images={lightboxImages}
        initialIndex={currentPhotoIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
      />

      {filteredPhotos.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            Geen foto's gevonden in deze categorie.
          </p>
        </div>
      )}
    </div>
  );
}
