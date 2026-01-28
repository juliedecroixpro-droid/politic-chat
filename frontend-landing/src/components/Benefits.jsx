import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Clock, Target, TrendingUp, Zap, BookOpen, Clock3 } from 'lucide-react';

const Benefits = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const candidateBenefits = [
    {
      icon: Clock,
      title: "Gagnez du temps",
      description: "Répondez automatiquement aux questions répétitives"
    },
    {
      icon: Target,
      title: "Touchez plus de monde",
      description: "Disponible pour tous, à toute heure"
    },
    {
      icon: TrendingUp,
      title: "Comprenez vos électeurs",
      description: "Analytics sur les préoccupations principales"
    },
    {
      icon: Zap,
      title: "Démarquez-vous",
      description: "Innovez avec l'IA dans votre campagne"
    }
  ];

  const citizenBenefits = [
    {
      icon: Zap,
      title: "Réponses instantanées",
      description: "Pas d'attente, pas de formulaire"
    },
    {
      icon: BookOpen,
      title: "Clarté",
      description: "Programme expliqué simplement"
    },
    {
      icon: Clock3,
      title: "Disponibilité",
      description: "Posez vos questions à 23h, obtenez une réponse"
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
            Avantages
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
            gagnant-gagnant
          </span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-600 max-w-3xl mx-auto"
        >
          Des bénéfices concrets pour vous et vos citoyens
        </motion.p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Pour les candidats */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="mb-8">
            <div className="inline-block p-3 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">Pour les candidats</h3>
            <p className="text-gray-600">Concentrez-vous sur l'essentiel : votre campagne</p>
          </div>

          <div className="space-y-6">
            {candidateBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="flex gap-4 group"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                  <benefit.icon className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1 text-lg">{benefit.title}</h4>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 glass-effect rounded-xl p-6 border-2 border-primary-100"
          >
            <div className="flex items-center gap-4">
              <div className="text-5xl font-bold text-primary-600">85%</div>
              <p className="text-gray-700 font-medium">
                des candidats constatent une meilleure engagement citoyen
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Pour les citoyens */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="mb-8">
            <div className="inline-block p-3 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">Pour les citoyens</h3>
            <p className="text-gray-600">Une démocratie plus accessible et transparente</p>
          </div>

          <div className="space-y-6">
            {citizenBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="flex gap-4 group"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center group-hover:bg-secondary-200 transition-colors">
                  <benefit.icon className="w-6 h-6 text-secondary-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1 text-lg">{benefit.title}</h4>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Testimonial Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 glass-effect rounded-xl p-6 border-2 border-secondary-100"
          >
            <div className="flex items-start gap-3 mb-3">
              <svg className="w-8 h-8 text-secondary-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-gray-700 italic">
                "Enfin un moyen simple d'obtenir des réponses claires ! Plus besoin d'attendre des jours pour une réponse par email."
              </p>
            </div>
            <p className="text-sm text-gray-600 font-medium">— Sophie, citoyenne de Lyon</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;
