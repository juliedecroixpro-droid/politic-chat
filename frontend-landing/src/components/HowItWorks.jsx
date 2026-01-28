import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { UserPlus, Settings, Share2 } from 'lucide-react';

const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    {
      number: "01",
      icon: UserPlus,
      title: "Créez votre compte et uploadez votre programme",
      description: "Inscription gratuite en 2 minutes. Glissez-déposez votre programme PDF, Word, ou copiez-collez directement le texte.",
      image: "📄"
    },
    {
      number: "02",
      icon: Settings,
      title: "Configurez la personnalité de votre agent IA",
      description: "Choisissez le ton (formel, amical, pédagogique), la longueur des réponses, et ajoutez des directives personnalisées.",
      image: "⚙️"
    },
    {
      number: "03",
      icon: Share2,
      title: "Partagez le lien de chat avec vos citoyens",
      description: "Intégrez le widget sur votre site, partagez le lien sur les réseaux sociaux, ou via QR code sur vos affiches.",
      image: "🚀"
    }
  ];

  return (
    <section ref={ref} className="section-container bg-white">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 bg-secondary-100 text-secondary-700 rounded-full text-sm font-semibold mb-4">
            Simple et rapide
          </span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
        >
          Lancez votre assistant IA{' '}
          <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            en 3 étapes
          </span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-600 max-w-3xl mx-auto"
        >
          De l'inscription à la première conversation : moins de 5 minutes
        </motion.p>
      </div>

      <div className="relative">
        {/* Timeline connector - hidden on mobile */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-200 via-secondary-200 to-primary-200 transform -translate-x-1/2"></div>

        <div className="space-y-24">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
              className={`flex flex-col lg:flex-row gap-8 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Content */}
              <div className="flex-1 lg:text-right" style={{ textAlign: index % 2 === 1 ? 'left' : 'right' }}>
                <div className={`inline-block ${index % 2 === 1 ? 'lg:text-left' : 'lg:text-right'} text-center lg:text-inherit`}>
                  <div className="inline-flex items-center gap-3 mb-4">
                    <span className="text-6xl font-bold text-gray-200">{step.number}</span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 max-w-md mx-auto lg:mx-0">
                    {step.title}
                  </h3>
                  
                  <p className="text-lg text-gray-600 leading-relaxed max-w-md mx-auto lg:mx-0">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Central Icon */}
              <div className="relative z-10 flex-shrink-0">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-xl border-4 border-white">
                  <step.icon className="w-10 h-10 text-white" />
                </div>
                
                {/* Pulsing effect */}
                <div className="absolute inset-0 rounded-full bg-primary-400 animate-ping opacity-20"></div>
              </div>

              {/* Visual/Mockup */}
              <div className="flex-1">
                <div className={`glass-effect rounded-2xl p-8 shadow-xl max-w-md ${index % 2 === 0 ? 'lg:ml-auto' : 'lg:mr-auto'} mx-auto lg:mx-0`}>
                  <div className="text-center">
                    <div className="text-8xl mb-4">{step.image}</div>
                    <div className="space-y-3">
                      <div className="h-3 bg-gradient-to-r from-primary-200 to-primary-300 rounded-full"></div>
                      <div className="h-3 bg-gradient-to-r from-secondary-200 to-secondary-300 rounded-full w-4/5 mx-auto"></div>
                      <div className="h-3 bg-gradient-to-r from-primary-200 to-primary-300 rounded-full w-3/5 mx-auto"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="mt-24 text-center"
      >
        <a 
          href="/register" 
          className="btn-primary inline-flex items-center gap-2"
        >
          Commencer maintenant
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
        <p className="mt-4 text-gray-600">Aucune carte bancaire requise • Essai gratuit 7 jours</p>
      </motion.div>
    </section>
  );
};

export default HowItWorks;
