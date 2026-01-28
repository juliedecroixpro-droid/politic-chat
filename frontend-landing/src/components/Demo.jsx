import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { MessageSquare, Send, Sparkles } from 'lucide-react';

const Demo = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Bonjour ! Je suis l'assistant virtuel de Marie Dupont. N'hésitez pas à me poser vos questions sur son programme électoral. 👋"
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const demoQuestions = [
    "Quelle est votre position sur l'écologie ?",
    "Comment comptez-vous améliorer les transports ?",
    "Quelles sont vos propositions pour les jeunes ?"
  ];

  const demoResponses = {
    "Quelle est votre position sur l'écologie ?": "L'écologie est au cœur de notre programme ! Nous proposons : 🌱 Création d'un parc urbain de 5 hectares, 🚴 15 km de pistes cyclables sécurisées, ♻️ Plan zéro déchet d'ici 2030, 🌳 Plantation de 1000 arbres par an. Notre objectif : une ville plus verte et respirable pour tous !",
    "Comment comptez-vous améliorer les transports ?": "Nous avons un plan ambitieux pour la mobilité : 🚌 Augmentation de 30% de la fréquence des bus, 🚲 Système de vélos en libre-service, 🅿️ 5 nouveaux parkings relais gratuits, 🚶 Piétonnisation du centre-ville. Budget : 3,2M€ sur le mandat, financé à 40% par la région.",
    "Quelles sont vos propositions pour les jeunes ?": "Les jeunes sont notre priorité ! 🎓 Bourses municipales pour étudiants (500€/an), 🏀 Rénovation de 3 complexes sportifs, 🎨 Nouveau centre culturel avec studio de musique, 💼 Aide à la création d'entreprise (jusqu'à 5000€). Nous voulons que les jeunes restent et s'épanouissent ici !"
  };

  const handleSend = (question) => {
    if (!question && !inputValue.trim()) return;
    
    const userMessage = question || inputValue;
    
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      type: 'user',
      text: userMessage
    }]);
    
    setInputValue('');
    
    setTimeout(() => {
      const response = demoResponses[userMessage] || "Merci pour votre question ! Pour obtenir des réponses détaillées et personnalisées, je vous invite à tester la version complète de ÉluIA. 😊";
      
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        type: 'bot',
        text: response
      }]);
    }, 1000);
  };

  return (
    <section id="demo" ref={ref} className="section-container gradient-bg">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            Démo interactive
          </span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
        >
          Testez{' '}
          <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            ÉluIA
          </span>
          {' '}en action
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-600 max-w-3xl mx-auto"
        >
          Posez vos questions à notre assistant de démonstration
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="max-w-4xl mx-auto"
      >
        {/* Demo Chat Interface */}
        <div className="glass-effect rounded-2xl shadow-2xl overflow-hidden border-2 border-white/50">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Assistant Marie Dupont</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <p className="text-primary-100 text-sm">En ligne • Démo interactive</p>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="bg-gray-50 p-6 min-h-[400px] max-h-[500px] overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : ''}`}
                >
                  {message.type === 'bot' && (
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex-shrink-0 flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-md p-4 rounded-lg shadow ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-tr-none'
                        : 'bg-white text-gray-800 rounded-tl-none'
                    }`}
                  >
                    <p className="leading-relaxed whitespace-pre-line">{message.text}</p>
                  </div>
                  
                  {message.type === 'user' && (
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Questions */}
          <div className="bg-white border-t border-gray-200 p-4">
            <p className="text-sm text-gray-600 mb-3 font-medium">Questions suggérées :</p>
            <div className="flex flex-wrap gap-2">
              {demoQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSend(question)}
                  className="px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm hover:bg-primary-100 transition-colors border border-primary-200"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Input */}
          <div className="bg-white p-6 border-t border-gray-200">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Posez votre question..."
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button
                onClick={() => handleSend()}
                className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-lg font-semibold hover:from-primary-700 hover:to-primary-600 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
                Envoyer
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-600">
            💡 <strong>Ceci est une démo simplifiée.</strong> Avec ÉluIA, votre assistant connaîtra parfaitement votre programme complet !
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Demo;
