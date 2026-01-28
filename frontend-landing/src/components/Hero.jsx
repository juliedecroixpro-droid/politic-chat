import { motion } from 'framer-motion';
import { MessageSquare, ArrowRight, Users, Shield, MapPin } from 'lucide-react';
import { useState } from 'react';
import SignupModal from './modals/SignupModal';

const Hero = () => {
  const [showSignup, setShowSignup] = useState(false);

  const scrollToDemo = () => {
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section className="relative min-h-screen gradient-bg overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
          <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="relative section-container">
          <div className="flex flex-col items-center text-center space-y-8 pt-20">
            {/* Logo/Brand */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center space-x-3"
            >
              <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ÉluIA
              </h1>
            </motion.div>

            {/* Main Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 max-w-5xl leading-tight"
            >
              Votre assistant de campagne{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                disponible 24/7
              </span>
            </motion.h2>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-600 max-w-3xl"
            >
              Un agent IA qui répond instantanément aux questions sur votre programme électoral
            </motion.p>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full shadow-sm">
                <Shield className="w-4 h-4 text-green-600" />
                <span>🔒 Conforme RGPD</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full shadow-sm">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>🇫🇷 Hébergé en France</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <button 
                onClick={() => setShowSignup(true)}
                className="btn-primary flex items-center justify-center gap-2"
              >
                Créer mon compte
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={scrollToDemo} 
                className="btn-secondary flex items-center justify-center gap-2"
              >
                Voir la démo
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </motion.div>

            {/* Trust Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex items-center gap-2 text-gray-600 pt-8"
            >
              <Users className="w-5 h-5 text-blue-600" />
              <span className="text-sm">
                Déjà <strong className="text-blue-600">50+ candidats</strong> nous font confiance
              </span>
            </motion.div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="w-full max-w-5xl pt-12"
            >
              <div className="relative">
                {/* Mockup Container with glass effect */}
                <div className="glass-effect rounded-2xl shadow-2xl p-8 border-2 border-white/50">
                  {/* Chat Interface Mockup */}
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Chat Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <MessageSquare className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-semibold">Assistant Marie Dupont</p>
                        <p className="text-blue-100 text-sm">En ligne • Répond en quelques secondes</p>
                      </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="p-6 space-y-4 bg-gray-50 min-h-[300px]">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.5 }}
                        className="flex gap-3"
                      >
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0"></div>
                        <div className="bg-white rounded-lg rounded-tl-none p-4 shadow max-w-md">
                          <p className="text-gray-800">Quelle est votre position sur les pistes cyclables ?</p>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 2 }}
                        className="flex gap-3 justify-end"
                      >
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg rounded-tr-none p-4 shadow max-w-md">
                          <p className="text-white">
                            Excellente question ! Notre programme prévoit la création de 15 km de pistes cyclables sécurisées 
                            dans les deux prochaines années. Nous voulons aussi mettre en place un système de vélos en 
                            libre-service accessible à tous les quartiers. 🚴‍♀️
                          </p>
                        </div>
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex-shrink-0 flex items-center justify-center">
                          <MessageSquare className="w-5 h-5 text-white" />
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 2.5 }}
                        className="flex gap-3"
                      >
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0"></div>
                        <div className="bg-white rounded-lg rounded-tl-none p-4 shadow max-w-md">
                          <p className="text-gray-800">Et le budget ? D'où vient le financement ?</p>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 3 }}
                        className="flex gap-3 justify-end"
                      >
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg rounded-tr-none p-4 shadow max-w-md">
                          <p className="text-white">
                            Le budget estimé est de 2,5 millions d'euros sur 5 ans. Ce financement proviendra de trois sources : 
                            45% de subventions régionales, 30% du budget municipal et 25% de fonds européens. 
                            Vous trouverez tous les détails page 23 de notre programme !
                          </p>
                        </div>
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex-shrink-0 flex items-center justify-center">
                          <MessageSquare className="w-5 h-5 text-white" />
                        </div>
                      </motion.div>
                    </div>

                    {/* Chat Input */}
                    <div className="p-4 bg-white border-t">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Posez votre question..."
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          disabled
                        />
                        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                          Envoyer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3.5 }}
                  className="absolute -bottom-8 -left-8 glass-effect rounded-xl p-4 shadow-xl hidden md:block"
                >
                  <p className="text-sm text-gray-600">Temps de réponse moyen</p>
                  <p className="text-3xl font-bold text-blue-600">2.3s</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3.7 }}
                  className="absolute -bottom-8 -right-8 glass-effect rounded-xl p-4 shadow-xl hidden md:block"
                >
                  <p className="text-sm text-gray-600">Questions répondues</p>
                  <p className="text-3xl font-bold text-purple-600">1,247</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Signup Modal */}
      <SignupModal 
        isOpen={showSignup} 
        onClose={() => setShowSignup(false)} 
      />
    </>
  );
};

export default Hero;
