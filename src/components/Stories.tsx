import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollTrigger } from '../hooks/useScrollTrigger';
import styles from './Stories.module.css';

interface Story {
  id: number;
  title: string;
  description: string;
  image?: string;
  date: string;
}

const stories: Story[] = [
  {
    id: 1,
    title: 'הצלה במטבח',
    description:
      'אדם בן 62 נפל בחצר ביתו. המתנדבים שלנו הגיעו תוך 4 דקות, סיפקו עזרה ראשונה והעבירו אותו בטוח לבית החולים.',
    date: '15 בינואר 2024',
  },
  {
    id: 2,
    title: 'נערה צעירה בחנק',
    description:
      'קריאה חירום לדירה בשכונת הדר. מתנדב עם הכשרה בעזרה ראשונה בצע טכניקת פרוק חנק וחציא חיי הנערה.',
    date: '8 בדצמבר 2023',
  },
  {
    id: 3,
    title: 'גבר בהתקף לב',
    description:
      'קריאה בחצות הלילה לגבר בן 55 שסבול התקף לב. המתנדבים השתמשו במכשיר הדיפיברילציה וחזרו את הלב לקצב תקין.',
    date: '22 בנובמבר 2023',
  },
];

const Stories: React.FC = () => {
  const { ref } = useScrollTrigger();
  const [activeStory, setActiveStory] = useState(0);

  const nextStory = () => {
    setActiveStory((prev) => (prev + 1) % stories.length);
  };

  const prevStory = () => {
    setActiveStory((prev) => (prev - 1 + stories.length) % stories.length);
  };

  return (
    <section ref={ref} className={`${styles.stories} section`}>
      <div className="container">
        <h2 className={styles.title}>סיפורי הצלה מהשטח</h2>

        <div className={styles.carousel}>
          <AnimatePresence mode="wait">
            <motion.div
              key={stories[activeStory].id}
              className={styles.storyCard}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <div className={styles.storyContent}>
                <h3 className={styles.storyTitle}>
                  {stories[activeStory].title}
                </h3>
                <p className={styles.storyDescription}>
                  {stories[activeStory].description}
                </p>
                <time className={styles.storyDate}>
                  {stories[activeStory].date}
                </time>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className={styles.controls}>
            <button
              className={styles.navButton}
              onClick={prevStory}
              aria-label="סיפור קודם"
            >
              ❮
            </button>
            <div className={styles.indicators}>
              {stories.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.indicator} ${
                    index === activeStory ? styles.active : ''
                  }`}
                  onClick={() => setActiveStory(index)}
                  aria-label={`עבור לסיפור ${index + 1}`}
                />
              ))}
            </div>
            <button
              className={styles.navButton}
              onClick={nextStory}
              aria-label="סיפור הבא"
            >
              ❯
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stories;
