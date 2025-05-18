import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GalleryLightbox({
  images = [],
  initialIndex = 0,
  isOpen = false,
  onClose = () => {},
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [open, setOpen] = useState(isOpen);

  // Update state when props change
  useEffect(() => {
    setOpen(isOpen);
    if (isOpen && initialIndex >= 0 && initialIndex < images.length) {
      setCurrentIndex(initialIndex);
    }
  }, [isOpen, initialIndex, images]);

  // Navigate to previous image
  const prevImage = (e) => {
    e.stopPropagation(); // Prevent background click handling
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  // Navigate to next image
  const nextImage = (e) => {
    e.stopPropagation(); // Prevent background click handling
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!open) return;

      switch (e.key) {
        case "Escape":
          handleClose();
          break;
        case "ArrowLeft":
          prevImage(e);
          break;
        case "ArrowRight":
          nextImage(e);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Handle body overflow
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  // Handle image click to prevent propagation
  const handleImageClick = (e) => {
    e.stopPropagation();
  };

  // If no images or not open, don't render anything
  if (!open || images.length === 0) return null;

  const currentImage = images[currentIndex];

  // Handle null or undefined image safely
  if (!currentImage) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
      >
        <button
          className="absolute top-6 right-6 text-white text-4xl hover:text-amber-300 cursor-pointer p-4"
          onClick={handleClose}
        >
          &times;
        </button>
        {images.length > 1 && (
          <>
            <button
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-amber-300 cursor-pointer p-8 w-24 h-24 flex items-center justify-center"
              onClick={prevImage}
            >
              &#10094;
            </button>
            <button
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-amber-300 cursor-pointer p-8 w-24 h-24 flex items-center justify-center"
              onClick={nextImage}
            >
              &#10095;
            </button>
          </>
        )}
        <motion.img
          key={currentIndex}
          src={currentImage.src?.src || currentImage.src}
          alt={currentImage.alt || ""}
          className="max-h-[85vh] max-w-[85vw] object-contain cursor-default"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleImageClick}
        />
        {currentImage.title && (
          <div
            className="absolute bottom-6 left-0 right-0 text-center"
            onClick={handleImageClick}
          >
            <div className="bg-black bg-opacity-70 mx-auto p-3 max-w-2xl">
              <h2 className="text-white text-xl mb-1">{currentImage.title}</h2>
              {currentImage.description && (
                <p className="text-gray-300 text-sm">
                  {currentImage.description}
                </p>
              )}
              {currentImage.date && (
                <p className="text-gray-400 text-xs mt-2">
                  {/*{new Date(currentImage.date).toLocaleDateString('nl-NL')}*/}
                  {currentImage.date}
                </p>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
