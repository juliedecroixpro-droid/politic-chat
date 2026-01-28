import { BrowserRouter as Router } from 'react-router-dom';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Demo from './components/Demo';
import Benefits from './components/Benefits';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Trust from './components/Trust';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Hero />
        <Problem />
        <Features />
        <HowItWorks />
        <Demo />
        <Benefits />
        <Pricing />
        <Testimonials />
        <Trust />
        <FAQ />
        <FinalCTA />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
