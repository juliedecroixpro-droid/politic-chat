import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Clock, FileText, TrendingDown } from 'lucide-react';

const Problem = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const problems = [
    {
      icon: Clock,
      title: "Vos citoyens ont des questions, vous n'avez pas le temps",
      description: "Entre les réunions, les événements et la gestion quotidienne, impossible de répondre aux centaines de messages reçus chaque jour.",
      color: "from-red-500 to-orange-500"
    },
    {
      icon: FileText,
      title: "Votre programme de 50 pages est difficile à digérer",
      description: "Les électeurs veulent des réponses claires et rapides. Pas le temps de lire un programme complet avant de se décider.",
      color: "from-orange-500 to-yellow-500"
    },
    {
      icon: TrendingDown,
      title: "Vous perdez des voix par manque de disponibilité",
      description: "Un électeur sans réponse est un électeur perdu. L'indécision se transforme en vote pour un concurrent plus accessible.",
      color: "from-yellow-500 to-red-500"
    }
  ];

  return (
    <section ref={ref} className="section-container bg-white">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
        >
          Le défi des candidats municipaux
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-600 max-w-3xl mx-auto"
        >
          Vous êtes engagé, motivé, avec un programme solide. Mais la réalité du terrain est brutale.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {problems.map((problem, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
            className="relative group"
          >
            <div className="h-full bg-white rounded-2xl p-8 shadow-lg border border-gray-100 card-hover">
              {/* Icon with gradient background */}
              <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${problem.color} mb-6`}>
                <problem.icon className="w-8 h-8 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {problem.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {problem.description}
              </p>

              {/* Decorative gradient line */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${problem.color} rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Transition element */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-16 text-center"
      >
        <div className="inline-block bg-gradient-to-r from-primary-50 to-secondary-50 rounded-full px-8 py-4 border-2 border-primary-200">
          <p className="text-lg font-semibold text-gray-900">
            Et si vous pouviez être{' '}
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              disponible 24/7
            </span>
            {' '}sans effort ?
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default Problem;
