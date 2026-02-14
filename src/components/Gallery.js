
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Gallery.css';
import PhotoModal from './PhotoModal';
import galleryData from './galleryData.json';

const GalleryImage = ({ photo, index, onClick }) => {
    return (
        <motion.div
            className="gallery-item"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            onClick={() => onClick(index)}
            style={{ cursor: 'pointer' }}
        >
            <img
                src={`/gallery/${photo.filename}`}
                alt={photo.title || `Recuerdo ${index + 1}`}
                loading="lazy"
                onError={(e) => { e.target.style.display = 'none' }}
            />
        </motion.div>
    );
};

const Gallery = () => {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const images = galleryData || [];

    const handlePrev = () => {
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    };

    const handleNext = () => {
        setSelectedIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    };

    return (
        <div className="gallery-container">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.8 }}
            >
                Nuestros Recuerdos
            </motion.h2>
            <motion.div
                className="gallery-grid"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.05 }}
                transition={{ duration: 0.8 }}
            >
                {images.map((photo, index) => (
                    <GalleryImage
                        key={index}
                        photo={photo}
                        index={index}
                        onClick={setSelectedIndex}
                    />
                ))}
            </motion.div>

            {selectedIndex !== null && (
                <PhotoModal
                    photo={images[selectedIndex]}
                    onClose={() => setSelectedIndex(null)}
                    onPrev={handlePrev}
                    onNext={handleNext}
                />
            )}
        </div>
    );
};

export default Gallery;
