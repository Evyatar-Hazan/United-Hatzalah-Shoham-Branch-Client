import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollTrigger } from '../hooks/useScrollTrigger';
import styles from './Statistics.module.css';

interface StatisticItemProps {
  label: string;
  value: number;
  suffix?: string;
  isVisible: boolean;
}

const StatisticItem: React.FC<StatisticItemProps> = ({
  label,
  value,
  suffix = '',
  isVisible,
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const increment = value / 50;
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, 30);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <motion.div
      className={styles.statItem}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.statValue}>
        {displayValue.toLocaleString('he-IL')}
        {suffix}
      </div>
      <div className={styles.statLabel}>{label}</div>
    </motion.div>
  );
};

const Statistics: React.FC = () => {
  const { ref, isVisible } = useScrollTrigger({ threshold: 0.3 });

  return (
    <section ref={ref} className={`${styles.statistics} section`}>
      <div className="container">
        <h2 className={styles.title}>הנתונים שלנו</h2>
        <div className={styles.statsGrid}>
          <StatisticItem
            label="מתנדבים פעילים"
            value={150}
            isVisible={isVisible}
          />
          <StatisticItem
            label="קריאות חירום שטופלו"
            value={5000}
            isVisible={isVisible}
          />
          <StatisticItem
            label="זמן תגובה ממוצע"
            value={5}
            suffix=" דקות"
            isVisible={isVisible}
          />
          <StatisticItem
            label="שנים בשירות"
            value={15}
            isVisible={isVisible}
          />
        </div>
      </div>
    </section>
  );
};

export default Statistics;
