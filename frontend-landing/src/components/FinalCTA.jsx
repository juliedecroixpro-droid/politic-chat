import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Rocket, ArrowRight, Sparkles } from 'lucide-react';
import SignupModal from './modals/SignupModal';
import ContactModal from './modals/ContactModal';

const FinalCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showSignup, setShowSignup] = useState(false);
  const [showContact, setShowContact] = useState(false);

  return (
    <>
      <section ref={ref} className="relative section-container overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600"></div>
        
        {/* Animated shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-lg rounded-2xl mb-6">
              <Rocket className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Prêt à transformer votre campagne ?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl md:text-2xl text-blue-100 mb-12 max-w-2xl mx-auto"
          >
            Rejoignez les candidats qui ont déjà choisi l'innovation pour leur campagne électorale
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={() => setShowSignup(true)}
              className="group px-10 py-5 bg-white text-blue-600 font-bold rounded-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-200 flex items-center gap-3 text-lg"
            >
              Créer mon agent IA gratuitement
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setShowContact(true)}
              className="px-10 py-5 bg-white/10 backdrop-blur-lg border-2 border-white text-white font-bold rounded-lg hover:bg-white/20 transition-all duration-200 flex items-center gap-3 text-lg"
            >
              <Sparkles className="w-6 h-6" />
              Planifier une démo
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 space-y-2"
          >
            <p className="text-blue-100 font-semibold">
              ✨ Essai gratuit 7 jours • Sans carte bancaire
            </p>
            <p className="text-blue-200 text-sm">
              Configuration en 5 minutes • Support en français • Résiliable à tout moment
            </p>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 pt-16 border-t border-white/20"
          >
            <p className="text-blue-100 text-sm mb-6 font-medium">Déjà utilisé par des candidats dans toute la France</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-80">
              {['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Bordeaux', 'Nantes', 'Lille'].map((city, index) => (
                <div key={index} className="text-white/60 font-semibold text-sm">
                  📍 {city}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modals */}
      <SignupModal 
        isOpen={showSignup} 
        onClose={() => setShowSignup(false)}
      />
      <ContactModal 
        isOpen={showContact} 
        onClose={() => setShowContact(false)}
      />
    </>
  );
};

export default FinalCTA;
