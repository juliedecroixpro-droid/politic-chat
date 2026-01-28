import { MessageSquare, Mail, Twitter, Linkedin, Facebook } from 'lucide-react';
import { useState } from 'react';
import ContactModal from './modals/ContactModal';
import LegalModal from './modals/LegalModal';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showContact, setShowContact] = useState(false);
  const [showLegal, setShowLegal] = useState(false);
  const [legalType, setLegalType] = useState('privacy');

  const handleLegalClick = (type) => {
    setLegalType(type);
    setShowLegal(true);
  };

  const footerLinks = {
    product: [
      { name: 'Fonctionnalités', href: '#features' },
      { name: 'Tarifs', href: '#pricing' },
      { name: 'Démo', href: '#demo' },
      { name: 'FAQ', href: '#faq' }
    ],
    company: [
      { name: 'À propos', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Contact', href: '#', onClick: () => setShowContact(true) },
      { name: 'Carrières', href: '#' }
    ],
    legal: [
      { name: 'Mentions légales', href: '#', onClick: () => handleLegalClick('legal') },
      { name: 'CGU / CGV', href: '#', onClick: () => handleLegalClick('terms') },
      { name: 'Politique de confidentialité', href: '#', onClick: () => handleLegalClick('privacy') },
      { name: 'Cookies', href: '#' }
    ]
  };

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/eluia' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/eluia' },
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/eluia' }
  ];

  return (
    <>
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  ÉluIA
                </h3>
              </div>
              <p className="text-gray-400 mb-6 max-w-sm">
                Votre assistant de campagne intelligent, disponible 24/7.
                La solution moderne pour les candidats aux élections municipales, départementales et régionales.
              </p>
              <div className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5" />
                <a href="mailto:contact@eluia.fr" className="hover:text-blue-400 transition-colors">
                  contact@eluia.fr
                </a>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Produit</h4>
              <ul className="space-y-3">
                {footerLinks.product.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      onClick={link.onClick}
                      className="text-gray-400 hover:text-blue-400 transition-colors cursor-pointer"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Entreprise</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    {link.onClick ? (
                      <button
                        onClick={link.onClick}
                        className="text-gray-400 hover:text-blue-400 transition-colors text-left"
                      >
                        {link.name}
                      </button>
                    ) : (
                      <a 
                        href={link.href}
                        className="text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Légal</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={link.onClick || (() => {})}
                      className="text-gray-400 hover:text-blue-400 transition-colors text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Copyright */}
              <p className="text-gray-400 text-sm">
                © {currentYear} ÉluIA. Tous droits réservés.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800 text-gray-400 hover:bg-blue-600 hover:text-white transition-all"
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>

              {/* Made in France */}
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <span>Conçu et hébergé en France</span>
                <span className="text-xl">🇫🇷</span>
              </div>
            </div>

            {/* Additional info */}
            <div className="mt-6 text-center">
              <p className="text-gray-500 text-xs">
                ÉluIA est une solution SaaS française dédiée aux candidats politiques. 
                Conforme RGPD • Données hébergées en France • Support en français
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ContactModal 
        isOpen={showContact} 
        onClose={() => setShowContact(false)}
      />
      <LegalModal 
        isOpen={showLegal} 
        onClose={() => setShowLegal(false)}
        type={legalType}
      />
    </>
  );
};

export default Footer;
