import { motion } from 'framer-motion';
import Hero from './components/Hero';
import About from './components/About';
import Statistics from './components/Statistics';
import Stories from './components/Stories';
import Gallery from './components/Gallery';
import Donors from './components/Donors';
import DonationSection from './components/DonationSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './styles/globals.css';

function App() {

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <About />
      <Statistics />
      <Stories />
      <Gallery />
      <Donors />
      <DonationSection />
      <Contact />
      <Footer />
    </motion.main>
  );
}

export default App;
