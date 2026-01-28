import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, EyeOff, Check, AlertCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';

const SignupModal = ({ isOpen, onClose, preSelectedPlan = null, isTrial = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    election: '',
    plan: preSelectedPlan || 'starter',
    acceptTerms: false
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');

  const electionTypes = [
    { value: 'municipales-2026', label: 'Municipales 2026' },
    { value: 'departementales-2027', label: 'Départementales 2027' },
    { value: 'regionales-2027', label: 'Régionales 2027' },
    { value: 'legislatives', label: 'Législatives' },
    { value: 'autre', label: 'Autre élection' }
  ];

  const plans = [
    { value: 'starter', label: 'Starter - 49€/mois', description: '500 conversations/mois' },
    { value: 'pro', label: 'Professionnel - 149€/mois', description: '2000 conversations/mois' },
    { value: 'enterprise', label: 'Entreprise - Sur mesure', description: 'Conversations illimitées' }
  ];

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    return strength;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setFormData({ ...formData, password: newPassword });
    setPasswordStrength(calculatePasswordStrength(newPassword));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
    }
    
    if (!formData.election) {
      newErrors.election = 'Veuillez sélectionner un type d\'élection';
    }
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Vous devez accepter les CGU';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          election: formData.election
          // Note: plan and trial will be handled after Stripe integration
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de l\'inscription');
      }

      // Success! Redirect to admin portal with auto-login token
      if (data.access_token) {
        // Store token for auto-login
        localStorage.setItem('token', data.access_token);
        
        // Redirect to admin portal
        const ADMIN_URL = import.meta.env.VITE_ADMIN_URL || 'https://frontend-admin-nine-zeta.vercel.app';
        window.location.href = ADMIN_URL;
      } else {
        // Fallback if no token provided
        const ADMIN_URL = import.meta.env.VITE_ADMIN_URL || 'https://frontend-admin-nine-zeta.vercel.app';
        window.location.href = ADMIN_URL;
      }
      
    } catch (error) {
      console.error('Registration error:', error);
      setApiError(error.message || 'Une erreur est survenue. Veuillez réessayer.');
      setIsSubmitting(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 1) return 'bg-red-500';
    if (passwordStrength <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 1) return 'Faible';
    if (passwordStrength <= 3) return 'Moyen';
    return 'Fort';
  };

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
          className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">
                {isTrial ? 'Essai gratuit 7 jours' : 'Créer mon compte'}
              </h2>
              <p className="text-blue-100 text-sm mt-1">
                Rejoignez ÉluIA dès maintenant
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* API Error */}
            {apiError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2 p-4 bg-red-50 border border-red-200 rounded-lg"
              >
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">{apiError}</p>
              </motion.div>
            )}

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nom complet
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Marie Dupont"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="marie@exemple.fr"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handlePasswordChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12 ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Minimum 8 caractères"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded ${
                          i < passwordStrength ? getPasswordStrengthColor() : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-600">
                    Force: <span className="font-semibold">{getPasswordStrengthText()}</span>
                  </p>
                </div>
              )}
              
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Election Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Type d'élection
              </label>
              <select
                value={formData.election}
                onChange={(e) => setFormData({ ...formData, election: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.election ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Sélectionnez...</option>
                {electionTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {errors.election && (
                <p className="mt-1 text-sm text-red-600">{errors.election}</p>
              )}
            </div>

            {/* Plan Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Formule
              </label>
              <div className="space-y-2">
                {plans.map((plan) => (
                  <label
                    key={plan.value}
                    className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.plan === plan.value
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="plan"
                        value={plan.value}
                        checked={formData.plan === plan.value}
                        onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                        className="mt-1"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">{plan.label}</p>
                        <p className="text-sm text-gray-600">{plan.description}</p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Terms Checkbox */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.acceptTerms}
                  onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                  className={`mt-1 w-4 h-4 border-2 rounded ${
                    errors.acceptTerms ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <span className="text-sm text-gray-700">
                  J'accepte les{' '}
                  <a href="#" className="text-blue-600 hover:underline">
                    Conditions Générales d'Utilisation
                  </a>{' '}
                  et la{' '}
                  <a href="#" className="text-blue-600 hover:underline">
                    Politique de Confidentialité
                  </a>
                </span>
              </label>
              {errors.acceptTerms && (
                <p className="mt-1 text-sm text-red-600">{errors.acceptTerms}</p>
              )}
            </div>

            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-4 py-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Check className="w-4 h-4 text-green-600" />
                <span>🔒 RGPD</span>
              </div>
              <div className="flex items-center gap-1">
                <Check className="w-4 h-4 text-green-600" />
                <span>🇫🇷 France</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Création en cours...
                </>
              ) : (
                <>
                  Créer mon compte
                  {isTrial && ' - Essai gratuit'}
                </>
              )}
            </button>

            {/* Stripe Note */}
            <div className="text-center">
              <p className="text-xs text-gray-500">
                💳 Paiement via Stripe - Intégration prochainement
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SignupModal;
