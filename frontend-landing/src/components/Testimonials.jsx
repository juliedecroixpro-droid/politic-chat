import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const testimonials = [
    {
      name: "Jean Martin",
      role: "Candidat maire",
      city: "Toulouse (31)",
      party: "Indépendant",
      avatar: "👨‍💼",
      quote: "J'ai pu répondre à 300 questions pendant que je dormais ! ÉluIA m'a fait gagner un temps précieux et mes citoyens adorent la réactivité.",
      rating: 5
    },
    {
      name: "Sophie Dubois",
      role: "Candidate municipale",
      city: "Lyon (69)",
      party: "Europe Écologie",
      avatar: "👩‍💼",
      quote: "Les citoyens adorent avoir des réponses instantanées. Mon taux d'engagement sur les réseaux a augmenté de 45% depuis que j'ai intégré ÉluIA !",
      rating: 5
    },
    {
      name: "Pierre Lefebvre",
      role: "Candidat conseiller",
      city: "Marseille (13)",
      party: "Liste citoyenne",
      avatar: "👨‍💻",
      quote: "Mon adversaire n'a pas compris ce qui se passait. Pendant qu'il répondait manuellement à 10 questions par jour, mon IA en gérait 200. La différence est flagrante.",
      rating: 5
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
            Témoignages
          </span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
        >
          Ce que disent{' '}
          <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            nos utilisateurs
          </span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-600 max-w-3xl mx-auto"
        >
          Rejoignez les candidats qui ont déjà transformé leur campagne
        </motion.p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
            className="group"
          >
            <div className="h-full glass-effect rounded-2xl p-8 shadow-lg border border-gray-100 card-hover relative overflow-hidden">
              {/* Quote Icon Background */}
              <div className="absolute top-0 right-0 -mt-4 -mr-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Quote className="w-32 h-32 text-primary-600" />
              </div>

              {/* Rating Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 leading-relaxed mb-6 relative z-10">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center text-3xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-sm text-gray-500">{testimonial.city} • {testimonial.party}</p>
                </div>
              </div>

              {/* Verified Badge */}
              <div className="absolute top-4 right-4">
                <div className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Vérifié
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Trust Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
      >
        {[
          { number: "50+", label: "Candidats actifs" },
          { number: "15K+", label: "Questions traitées" },
          { number: "98%", label: "Satisfaction" },
          { number: "2.3s", label: "Temps de réponse" }
        ].map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-2">
              {stat.number}
            </div>
            <div className="text-gray-600 font-medium">{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default Testimonials;
