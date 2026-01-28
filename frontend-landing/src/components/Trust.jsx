import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Shield, Server, Headphones, RefreshCw, UserX } from 'lucide-react';

const Trust = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const trustItems = [
    {
      icon: Shield,
      title: "Conforme RGPD",
      description: "Respect total de la vie privée et des données personnelles"
    },
    {
      icon: Server,
      title: "Hébergement sécurisé en France",
      description: "Vos données restent sur le territoire européen"
    },
    {
      icon: Headphones,
      title: "Support technique réactif",
      description: "Une équipe disponible pour vous accompagner"
    },
    {
      icon: RefreshCw,
      title: "Mises à jour régulières",
      description: "Améliorations continues et nouvelles fonctionnalités"
    },
    {
      icon: UserX,
      title: "Aucun spam, aucune revente de données",
      description: "Votre confiance est notre priorité absolue"
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
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
            <Shield className="w-4 h-4" />
            Sécurité et Confiance
          </span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
        >
          Une solution{' '}
          <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            fiable et conforme
          </span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-600 max-w-3xl mx-auto"
        >
          La sécurité de vos données et de celles de vos citoyens est notre priorité
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {trustItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            className={`${index === trustItems.length - 1 ? 'md:col-span-2 lg:col-span-1' : ''}`}
          >
            <div className="h-full glass-effect rounded-2xl p-8 border border-gray-100 card-hover">
              {/* Icon with checkmark */}
              <div className="relative inline-flex mb-6">
                <div className="p-4 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Certifications / Badges */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-16"
      >
        <div className="glass-effect rounded-2xl p-8 border-2 border-primary-100 max-w-4xl mx-auto">
          <h3 className="text-center text-lg font-semibold text-gray-900 mb-6">
            Certifié et approuvé
          </h3>
          
          <div className="flex flex-wrap justify-center items-center gap-8">
            {/* RGPD Badge */}
            <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-lg shadow">
              <Shield className="w-8 h-8 text-primary-600" />
              <div>
                <p className="font-bold text-gray-900">RGPD</p>
                <p className="text-xs text-gray-600">Conforme 2024</p>
              </div>
            </div>

            {/* SSL Badge */}
            <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-lg shadow">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <div>
                <p className="font-bold text-gray-900">SSL/TLS</p>
                <p className="text-xs text-gray-600">Cryptage 256-bit</p>
              </div>
            </div>

            {/* France Badge */}
            <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-lg shadow">
              <div className="text-3xl">🇫🇷</div>
              <div>
                <p className="font-bold text-gray-900">Hébergé en France</p>
                <p className="text-xs text-gray-600">Données souveraines</p>
              </div>
            </div>

            {/* Support Badge */}
            <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-lg shadow">
              <Headphones className="w-8 h-8 text-secondary-600" />
              <div>
                <p className="font-bold text-gray-900">Support 7j/7</p>
                <p className="text-xs text-gray-600">Français</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Trust;
