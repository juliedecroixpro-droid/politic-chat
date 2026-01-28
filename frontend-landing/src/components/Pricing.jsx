import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Check, Star, Sparkles } from 'lucide-react';
import SignupModal from './modals/SignupModal';
import ContactModal from './modals/ContactModal';

const Pricing = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showSignup, setShowSignup] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isTrial, setIsTrial] = useState(false);

  const handlePlanClick = (plan, trial = false) => {
    if (plan === 'enterprise') {
      setShowContact(true);
    } else {
      setSelectedPlan(plan);
      setIsTrial(trial);
      setShowSignup(true);
    }
  };

  const plans = [
    {
      id: 'starter',
      name: "Starter",
      price: "49€",
      period: "/mois",
      description: "Parfait pour tester ÉluIA",
      popular: false,
      features: [
        "500 conversations/mois",
        "1 agent IA",
        "Upload programme (PDF/Word)",
        "Personnalisation basique",
        "Analytics de base",
        "Support email"
      ],
      cta: "Commencer",
      trial: false
    },
    {
      id: 'pro',
      name: "Professionnel",
      price: "149€",
      period: "/mois",
      description: "Le choix des candidats sérieux",
      popular: true,
      features: [
        "2000 conversations/mois",
        "1 agent IA",
        "Upload & mise à jour illimitée",
        "Personnalisation avancée (ton, longueur, nom)",
        "Analytics détaillés",
        "Export CSV",
        "Support prioritaire"
      ],
      cta: "Essayer 7 jours gratuits",
      trial: true
    },
    {
      id: 'enterprise',
      name: "Entreprise",
      price: "Sur mesure",
      period: "",
      description: "Pour les grandes campagnes",
      popular: false,
      features: [
        "Conversations illimitées",
        "Agents IA multiples",
        "API access",
        "Personnalisation complète",
        "White-label possible",
        "Intégration sur mesure",
        "Support dédié"
      ],
      cta: "Nous contacter",
      trial: false
    }
  ];

  return (
    <>
      <section ref={ref} id="pricing" className="section-container gradient-bg">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
              Tarifs
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Des tarifs{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              transparents
            </span>
            {' '}adaptés à votre campagne
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Choisissez l'offre qui correspond à vos besoins
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className={`relative ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full shadow-lg text-sm font-bold">
                    <Star className="w-4 h-4" />
                    POPULAIRE
                  </div>
                </div>
              )}

              <div className={`
                h-full glass-effect rounded-2xl p-8 
                ${plan.popular 
                  ? 'border-2 border-purple-400 shadow-2xl' 
                  : 'border border-gray-200 shadow-lg'
                }
                card-hover
              `}>
                {/* Plan Header */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
                  <div className="flex items-baseline gap-1">
                    {plan.price !== 'Sur mesure' ? (
                      <>
                        <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                        <span className="text-gray-600">{plan.period}</span>
                      </>
                    ) : (
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    )}
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <div className={`
                        flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5
                        ${plan.popular 
                          ? 'bg-purple-100' 
                          : 'bg-blue-100'
                        }
                      `}>
                        <Check className={`
                          w-3.5 h-3.5
                          ${plan.popular ? 'text-purple-600' : 'text-blue-600'}
                        `} />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => handlePlanClick(plan.id, plan.trial)}
                  className={`
                    block w-full text-center px-6 py-4 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5
                    ${plan.popular
                      ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:from-purple-700 hover:to-purple-600'
                      : 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50'
                    }
                  `}
                >
                  {plan.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 glass-effect rounded-full border border-gray-200">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <p className="text-gray-700">
              <strong>Prix HT.</strong> Résiliable à tout moment. Sans engagement.
            </p>
          </div>
        </motion.div>

        {/* FAQ Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-600">
            Des questions sur nos tarifs ?{' '}
            <a href="#faq" className="text-blue-600 font-semibold hover:underline">
              Consultez la FAQ
            </a>
          </p>
        </motion.div>
      </section>

      {/* Modals */}
      <SignupModal 
        isOpen={showSignup} 
        onClose={() => setShowSignup(false)}
        preSelectedPlan={selectedPlan}
        isTrial={isTrial}
      />
      <ContactModal 
        isOpen={showContact} 
        onClose={() => setShowContact(false)}
      />
    </>
  );
};

export default Pricing;
