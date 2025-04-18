import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ImageLightbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState('');

  // Listen for custom events to open the lightbox
  useEffect(() => {
    const handleOpenLightbox = (event) => {
      if (event.detail && event.detail.src) {
        setImageSrc(event.detail.src);
        setIsOpen(true);
      }
    };

    // Add event listeners
    document.addEventListener('openImageLightbox', handleOpenLightbox);

    // Clean up
    return () => {
      document.removeEventListener('openImageLightbox', handleOpenLightbox);
    };
  }, []);

  // Handle keyboard events (Escape to close)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Handle body overflow
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  // If not open or no image, don't render anything
  if (!isOpen || !imageSrc) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <button
          className="absolute top-6 right-6 text-white text-4xl hover:text-amber-300"
          onClick={handleClose}
        >
          &times;
        </button>
        <motion.img
          src={imageSrc}
          alt="Enlarged view"
          className="max-h-[85vh] max-w-[85vw] object-contain"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
