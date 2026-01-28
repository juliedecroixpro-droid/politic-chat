import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Upload, Bot, MessageCircle, BarChart3, Shield, Zap } from 'lucide-react';

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Upload,
      title: "Upload en 1 clic",
      description: "Téléversez votre programme PDF ou Word",
      color: "primary"
    },
    {
      icon: Bot,
      title: "Agent IA personnalisé",
      description: "Configurez le ton et la personnalité",
      color: "secondary"
    },
    {
      icon: MessageCircle,
      title: "Disponible 24/7",
      description: "Répondez aux citoyens même pendant votre sommeil",
      color: "primary"
    },
    {
      icon: BarChart3,
      title: "Analytics en temps réel",
      description: "Découvrez les questions les plus fréquentes",
      color: "secondary"
    },
    {
      icon: Shield,
      title: "RGPD compliant",
      description: "Vos données et celles de vos citoyens protégées",
      color: "primary"
    },
    {
      icon: Zap,
      title: "En ligne en 5 minutes",
      description: "Aucune compétence technique requise",
      color: "secondary"
    }
  ];

  return (
    <section ref={ref} className="section-container gradient-bg">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
            Fonctionnalités
          </span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
        >
          Comment ÉluIA{' '}
          <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            transforme
          </span>
          {' '}votre campagne
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-600 max-w-3xl mx-auto"
        >
          Une solution complète pensée pour les candidats qui veulent se démarquer
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            className="group"
          >
            <div className="h-full glass-effect rounded-2xl p-8 card-hover">
              {/* Animated icon container */}
              <div className="relative mb-6">
                <div className={`
                  inline-flex p-4 rounded-xl 
                  ${feature.color === 'primary' 
                    ? 'bg-gradient-to-br from-primary-500 to-primary-600' 
                    : 'bg-gradient-to-br from-secondary-500 to-secondary-600'
                  }
                  shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300
                `}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Glow effect on hover */}
                <div className={`
                  absolute inset-0 rounded-xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300
                  ${feature.color === 'primary' 
                    ? 'bg-primary-400' 
                    : 'bg-secondary-400'
                  }
                `}></div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="mt-16 text-center"
      >
        <a 
          href="/register" 
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
        >
          Découvrir toutes les fonctionnalités
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
      </motion.div>
    </section>
  );
};

export default Features;
