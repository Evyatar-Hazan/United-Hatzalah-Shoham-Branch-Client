import React from 'react';
import { motion } from 'framer-motion';
import { useScrollTrigger } from '../hooks/useScrollTrigger';
import styles from './Donors.module.css';

interface Donor {
  id: number;
  name: string;
  category: string;
}

const donors: Donor[] = [
  { id: 1, name: 'תורם אחד', category: 'תורם ראשי' },
  { id: 2, name: 'תורם שני', category: 'תורם' },
  { id: 3, name: 'תורם שלישי', category: 'תורם' },
  { id: 4, name: 'תורם רביעי', category: 'תורם' },
  { id: 5, name: 'תורם חמישי', category: 'תורם' },
  { id: 6, name: 'תורם שישי', category: 'שותף' },
];

const Donors: React.FC = () => {
  const { ref, isVisible } = useScrollTrigger();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section ref={ref} className={`${styles.donors} section`}>
      <div className="container">
        <h2 className={styles.title}>תורמים וחסויות</h2>
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          {donors.map((donor) => (
            <motion.div
              key={donor.id}
              className={styles.donorCard}
              variants={itemVariants}
              whileHover={{ y: -4 }}
            >
              <div className={styles.logo}>
                <span>{donor.name.charAt(0)}</span>
              </div>
              <h3 className={styles.name}>{donor.name}</h3>
              <p className={styles.category}>{donor.category}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Donors;
