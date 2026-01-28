import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "Combien de temps pour mettre en place ÉluIA ?",
      answer: "Moins de 5 minutes ! Créez votre compte, uploadez votre programme (PDF ou Word), configurez rapidement le ton de votre assistant, et c'est parti. Vous recevrez un lien unique à partager immédiatement."
    },
    {
      question: "Mon programme doit faire quelle taille ?",
      answer: "Il n'y a pas de limite stricte. Que votre programme fasse 10 pages ou 100 pages, notre IA l'analysera. Plus il est détaillé, meilleures seront les réponses. Nous recommandons au minimum 5-10 pages de contenu structuré."
    },
    {
      question: "Les citoyens savent-ils que c'est une IA ?",
      answer: "Oui, par souci de transparence, nous indiquons clairement qu'il s'agit d'un assistant IA. L'expérience montre que les citoyens apprécient l'honnêteté et la disponibilité 24/7 plutôt que d'attendre plusieurs jours pour une réponse."
    },
    {
      question: "Puis-je personnaliser les réponses ?",
      answer: "Absolument ! Vous pouvez configurer le ton (formel, amical, pédagogique), la longueur des réponses (courtes, moyennes, détaillées), et même ajouter des directives personnalisées. Avec le plan Professionnel, vous avez un contrôle total."
    },
    {
      question: "Que se passe-t-il après les élections ?",
      answer: "Vous êtes libre de résilier à tout moment. Si vous êtes élu, vous pouvez transformer votre assistant en outil de communication municipale pour continuer à répondre aux questions des citoyens. Sinon, vous pouvez simplement mettre fin à votre abonnement."
    },
    {
      question: "Puis-je résilier à tout moment ?",
      answer: "Oui, sans engagement. Vous pouvez résilier votre abonnement à tout moment depuis votre espace personnel. Aucun frais de résiliation, aucune question posée. Vous ne payez que pour la période utilisée."
    },
    {
      question: "L'IA peut-elle dire n'importe quoi ?",
      answer: "Non. Notre IA est strictement limitée au contenu de votre programme. Elle ne peut pas inventer de réponses ou s'écarter de votre ligne politique. En cas de question hors sujet, elle redirige poliment vers vos canaux de contact."
    },
    {
      question: "Comment puis-je intégrer ÉluIA sur mon site ?",
      answer: "Nous fournissons un widget simple à intégrer (copier-coller d'un code) ou un lien direct à partager sur vos réseaux sociaux. Aucune compétence technique requise. Nous avons également des tutoriels vidéo pour vous guider."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" ref={ref} className="section-container bg-white">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary-100 text-secondary-700 rounded-full text-sm font-semibold mb-4">
            <HelpCircle className="w-4 h-4" />
            Questions fréquentes
          </span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
        >
          Vous avez des{' '}
          <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            questions ?
          </span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-600 max-w-3xl mx-auto"
        >
          Nous avons les réponses
        </motion.p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.05 }}
            >
              <div className={`
                glass-effect rounded-xl border-2 overflow-hidden transition-all duration-300
                ${openIndex === index 
                  ? 'border-primary-300 shadow-lg' 
                  : 'border-gray-200 shadow hover:border-primary-200'
                }
              `}>
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50/50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 pr-8 text-lg">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`
                      w-6 h-6 text-primary-600 flex-shrink-0 transition-transform duration-300
                      ${openIndex === index ? 'transform rotate-180' : ''}
                    `}
                  />
                </button>
                
                <div
                  className={`
                    overflow-hidden transition-all duration-300
                    ${openIndex === index ? 'max-h-96' : 'max-h-0'}
                  `}
                >
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="glass-effect rounded-2xl p-8 border border-gray-200">
            <HelpCircle className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Vous ne trouvez pas votre réponse ?
            </h3>
            <p className="text-gray-600 mb-6">
              Notre équipe est là pour vous aider. Contactez-nous directement !
            </p>
            <a
              href="mailto:contact@politicchat.fr"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-secondary-700 transition-all shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contactez-nous
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
