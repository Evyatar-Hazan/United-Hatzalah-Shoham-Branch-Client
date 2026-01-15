import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollTrigger } from '../hooks/useScrollTrigger';
import styles from './Contact.module.css';

const Contact: React.FC = () => {
  const { ref, isVisible } = useScrollTrigger();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section ref={ref} className={`${styles.contact} section`}>
      <div className="container">
        <h2 className={styles.title}>יצירת קשר</h2>
        <div className={styles.content}>
          <motion.div
            className={styles.contactInfo}
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8 }}
          >
            <div className={styles.infoItem}>
              <h3>📞 טלפון</h3>
              <a href="tel:+972123456789">+972 1-234-567-89</a>
            </div>
            <div className={styles.infoItem}>
              <h3>📧 דוא״ל</h3>
              <a href="mailto:info@shoham.united-hatzalah.org">
                info@shoham.united-hatzalah.org
              </a>
            </div>
            <div className={styles.infoItem}>
              <h3>📍 כתובת</h3>
              <p>שוהם, ישראל</p>
            </div>
            <div className={styles.socialLinks}>
              <h3>📱 עקב אחרינו</h3>
              <div className={styles.links}>
                <a href="#" aria-label="פייסבוק">
                  f
                </a>
                <a href="#" aria-label="אינסטגרם">
                  📷
                </a>
                <a href="#" aria-label="וואטסאפ">
                  💬
                </a>
              </div>
            </div>
          </motion.div>

          <motion.form
            className={styles.form}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className={styles.formGroup}>
              <label htmlFor="name">שם מלא</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                aria-required="true"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">דוא״ל</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                aria-required="true"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message">הודעה</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                required
                aria-required="true"
              />
            </div>
            <motion.button
              type="submit"
              className={styles.submitButton}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              שלח הודעה
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
