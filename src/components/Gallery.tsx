import React from 'react';
import { motion } from 'framer-motion';
import { useScrollTrigger } from '../hooks/useScrollTrigger';
import styles from './Gallery.module.css';

interface GalleryItem {
  id: number;
  title: string;
  category: string;
}

const galleryItems: GalleryItem[] = [
  { id: 1, title: 'קוד אחמר', category: 'סדנה' },
  { id: 2, title: 'הכשרה בשטח', category: 'הכשרה' },
  { id: 3, title: 'צוות חדש', category: 'מתנדבים' },
  { id: 4, title: 'אמבולנס חדש', category: 'ציוד' },
  { id: 5, title: 'פעילות קהילתית', category: 'קהילה' },
  { id: 6, title: 'תרגיל הצלה', category: 'הכשרה' },
];

const Gallery: React.FC = () => {
  const { ref, isVisible } = useScrollTrigger();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section ref={ref} className={`${styles.gallery} section`}>
      <div className="container">
        <h2 className={styles.title}>גלריית מדיה</h2>
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          {galleryItems.map((item) => (
            <motion.div
              key={item.id}
              className={styles.item}
              variants={itemVariants}
              whileHover={{ y: -8 }}
            >
              <div className={styles.itemImage}>
                <div className={styles.placeholder}></div>
              </div>
              <div className={styles.itemInfo}>
                <p className={styles.itemCategory}>{item.category}</p>
                <h3 className={styles.itemTitle}>{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
