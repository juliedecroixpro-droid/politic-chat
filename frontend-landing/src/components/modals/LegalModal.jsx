import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, FileText, Lock } from 'lucide-react';

const LegalModal = ({ isOpen, onClose, type = 'privacy' }) => {
  const legalContent = {
    privacy: {
      title: 'Politique de Confidentialité',
      icon: <Lock className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-2">1. Collecte des données</h3>
            <p className="text-gray-700">
              ÉluIA collecte les données personnelles suivantes lors de votre inscription :
              nom, adresse email, type d'élection. Ces données sont nécessaires pour la
              création et la gestion de votre compte.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-2">2. Utilisation des données</h3>
            <p className="text-gray-700">
              Vos données sont utilisées exclusivement pour :
            </p>
            <ul className="list-disc list-inside text-gray-700 ml-4 mt-2 space-y-1">
              <li>La gestion de votre compte et de vos services</li>
              <li>L'amélioration de nos services</li>
              <li>La communication d'informations importantes</li>
              <li>Le respect de nos obligations légales</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-2">3. Protection des données</h3>
            <p className="text-gray-700">
              Nous mettons en œuvre toutes les mesures techniques et organisationnelles
              appropriées pour protéger vos données contre tout accès non autorisé,
              modification, divulgation ou destruction.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-2">4. Vos droits (RGPD)</h3>
            <p className="text-gray-700">
              Conformément au RGPD, vous disposez des droits suivants :
            </p>
            <ul className="list-disc list-inside text-gray-700 ml-4 mt-2 space-y-1">
              <li>Droit d'accès à vos données</li>
              <li>Droit de rectification</li>
              <li>Droit à l'effacement</li>
              <li>Droit à la portabilité</li>
              <li>Droit d'opposition</li>
            </ul>
            <p className="text-gray-700 mt-2">
              Pour exercer ces droits, contactez-nous à : <strong>privacy@eluia.fr</strong>
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-2">5. Cookies</h3>
            <p className="text-gray-700">
              Notre site utilise des cookies essentiels au fonctionnement du service.
              Vous pouvez configurer votre navigateur pour refuser les cookies, mais
              certaines fonctionnalités pourraient ne pas fonctionner correctement.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-2">6. Hébergement</h3>
            <p className="text-gray-700">
              Vos données sont hébergées en France par des prestataires certifiés,
              garantissant le respect des normes européennes de protection des données.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-2">7. Contact</h3>
            <p className="text-gray-700">
              Pour toute question concernant vos données personnelles :<br />
              Email : <strong>privacy@eluia.fr</strong><br />
              Adresse : ÉluIA, [Adresse], France
            </p>
          </section>
        </div>
      )
    },
    terms: {
      title: 'Conditions Générales d\'Utilisation',
      icon: <FileText className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-2">1. Objet</h3>
            <p className="text-gray-700">
              Les présentes Conditions Générales d'Utilisation (CGU) ont pour objet de
              définir les modalités et conditions d'utilisation des services proposés
              par ÉluIA, ainsi que les droits et obligations des parties.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-2">2. Description du service</h3>
            <p className="text-gray-700">
              ÉluIA est une plateforme permettant aux candidats aux élections de créer
              un assistant IA pour répondre automatiquement aux questions des citoyens
              concernant leur programme électoral.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-2">3. Inscription</h3>
            <p className="text-gray-700">
              L'utilisation du service nécessite la création d'un compte. Vous vous
              engagez à :
            </p>
            <ul className="list-disc list-inside text-gray-700 ml-4 mt-2 space-y-1">
              <li>Fournir des informations exactes et à jour</li>
              <li>Maintenir la confidentialité de vos identifiants</li>
              <li>Nous informer immédiatement de toute utilisation non autorisée</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-2">4. Tarification</h3>
            <p className="text-gray-700">
              Les tarifs sont indiqués en euros HT. Le paiement s'effectue mensuellement
              par carte bancaire via Stripe. Vous pouvez résilier votre abonnement à
              tout moment sans frais.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-2">5. Propriété intellectuelle</h3>
            <p className="text-gray-700">
              Le contenu de votre programme électoral vous appartient. ÉluIA conserve
              la propriété de sa plateforme, son code source et ses algorithmes.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-2">6. Responsabilités</h3>
            <p className="text-gray-700">
              Vous êtes responsable du contenu que vous téléchargez et des réponses
              générées par votre assistant IA. ÉluIA ne peut être tenu responsable
              des erreurs ou inexactitudes dans les réponses générées.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-2">7. Résiliation</h3>
            <p className="text-gray-700">
              Vous pouvez résilier votre compte à tout moment depuis votre espace client.
              ÉluIA se réserve le droit de suspendre ou résilier un compte en cas de
              violation des présentes CGU.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-2">8. Droit applicable</h3>
            <p className="text-gray-700">
              Les présentes CGU sont régies par le droit français. En cas de litige,
              les tribunaux français seront seuls compétents.
            </p>
          </section>
        </div>
      )
    },
    legal: {
      title: 'Mentions Légales',
      icon: <Shield className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Éditeur du site</h3>
            <p className="text-gray-700">
              <strong>Nom de la société :</strong> ÉluIA<br />
              <strong>Forme juridique :</strong> [SAS / SARL / etc.]<br />
              <strong>Capital social :</strong> [Montant] euros<br />
              <strong>Siège social :</strong> [Adresse complète]<br />
              <strong>RCS :</strong> [Ville] [Numéro]<br />
              <strong>SIRET :</strong> [Numéro]<br />
              <strong>TVA intracommunautaire :</strong> [Numéro]
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Directeur de publication</h3>
            <p className="text-gray-700">
              <strong>Nom :</strong> [Nom du directeur]<br />
              <strong>Email :</strong> contact@eluia.fr
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Hébergement</h3>
            <p className="text-gray-700">
              <strong>Hébergeur :</strong> [Nom de l'hébergeur]<br />
              <strong>Adresse :</strong> [Adresse de l'hébergeur]<br />
              <strong>Téléphone :</strong> [Téléphone]
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Contact</h3>
            <p className="text-gray-700">
              Pour toute question ou réclamation :<br />
              <strong>Email :</strong> contact@eluia.fr<br />
              <strong>Téléphone :</strong> [Numéro]<br />
              <strong>Formulaire de contact :</strong> Disponible sur le site
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Données personnelles</h3>
            <p className="text-gray-700">
              Conformément au RGPD, vous disposez d'un droit d'accès, de rectification
              et de suppression de vos données personnelles. Pour plus d'informations,
              consultez notre Politique de Confidentialité.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Propriété intellectuelle</h3>
            <p className="text-gray-700">
              L'ensemble du contenu de ce site (textes, images, logos, code) est
              protégé par le droit d'auteur. Toute reproduction non autorisée est
              interdite.
            </p>
          </section>
        </div>
      )
    }
  };

  const current = legalContent[type];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="text-white">
                {current.icon}
              </div>
              <h2 className="text-2xl font-bold text-white">{current.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto flex-1">
            <div className="prose prose-gray max-w-none">
              <p className="text-sm text-gray-500 mb-6">
                Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
              </p>
              {current.content}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t px-6 py-4 bg-gray-50 flex-shrink-0">
            <button
              onClick={onClose}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              J'ai compris
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LegalModal;
