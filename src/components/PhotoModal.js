
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingPetals from './FloatingPetals';
import './PhotoModal.css';

const PhotoModal = ({ photo, onClose, onPrev, onNext }) => {
    if (!photo) return null;

    const hasInfo = photo.title || photo.location || photo.description;

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowLeft') onPrev();
        if (e.key === 'ArrowRight') onNext();
        if (e.key === 'Escape') onClose();
    };

    return (
        <AnimatePresence>
            <motion.div
                className="photo-modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={onClose}
                onKeyDown={handleKeyDown}
                tabIndex={0}
                ref={(el) => el && el.focus()}
            >
                {/* Petals in the background, blurred by the overlay */}
                <div className="photo-modal-petals">
                    <FloatingPetals visible={true} />
                </div>

                <button className="photo-modal-close" onClick={onClose}>✕</button>



                <motion.div
                    className="photo-modal"
                    key={photo.filename}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    onClick={(e) => e.stopPropagation()}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(e, { offset, velocity }) => {
                        const swipe = offset.x;

                        if (swipe < -50 || velocity.x < -500) {
                            onNext();
                        } else if (swipe > 50 || velocity.x > 500) {
                            onPrev();
                        }
                    }}
                >
                    <div className="photo-modal-image">
                        <img
                            src={`/gallery/${photo.filename}`}
                            alt={photo.title || 'Recuerdo'}
                        />
                    </div>
                    {hasInfo && (
                        <div className="photo-modal-info">
                            {photo.title && (
                                <h3>{photo.title}</h3>
                            )}
                            {photo.location && (
                                <>
                                    <div className="photo-modal-divider" />
                                    <span className="photo-modal-location">
                                        📍 {photo.location}
                                    </span>
                                </>
                            )}
                            {photo.description && (
                                <>
                                    <div className="photo-modal-divider" />
                                    <p className="photo-modal-description">
                                        {photo.description}
                                    </p>
                                </>
                            )}
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default PhotoModal;
