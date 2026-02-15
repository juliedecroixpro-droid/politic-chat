import { useState, useEffect } from 'react';
import { uploadCompetitive } from '../utils/api';

export default function CompetitiveUpload({ user, onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setError('');
    setSuccess('');
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Veuillez sélectionner un fichier');
      return;
    }

    setUploading(true);
    setError('');
    setSuccess('');

    try {
      const result = await uploadCompetitive(file);
      setSuccess('Positionnement concurrentiel uploadé et traité avec succès !');
      setFile(null);
      if (onUploadSuccess) onUploadSuccess();
      
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';
    } catch (err) {
      setError(err.message || 'Erreur lors de l\'upload');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold mb-4">Positionnement concurrentiel</h2>
      
      {user?.competitive_uploaded && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-800 font-medium">
            ✓ Positionnement concurrentiel actuel
          </p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600 mb-4">
          Uploadez votre document de positionnement vis-à-vis des adversaires pour guider les réponses comparatives.
        </p>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Document de positionnement (PDF ou Word)
          </label>
          <input
            type="file"
            accept=".pdf,.docx,.doc"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-purple-50 file:text-purple-700
              hover:file:bg-purple-100
              cursor-pointer"
          />
          <p className="mt-1 text-sm text-gray-500">
            Maximum : 50MB | Maximum 100 pages
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded text-green-700">
            {success}
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg font-medium
            hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed
            transition-colors"
        >
          {uploading ? 'Traitement en cours...' : 'Upload & Traiter le positionnement'}
        </button>

        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h3 className="font-semibold text-amber-900 mb-2">À quoi sert le positionnement concurrentiel ?</h3>
          <ul className="space-y-1 text-sm text-amber-800">
            <li>• Définir les différences clés avec les adversaires</li>
            <li>• Préparer des réponses aux comparaisons</li>
            <li>• Mettre en valeur vos avantages distinctifs</li>
            <li>• Anticiper et répondre aux critiques</li>
          </ul>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          <p className="font-medium mb-1">Que se passe-t-il ensuite ?</p>
          <ul className="space-y-1 pl-4">
            <li>→ Le document sera analysé et divisé en sections</li>
            <li>→ Les embeddings IA seront créés pour la recherche sémantique</li>
            <li>→ Votre chatbot utilisera ces éléments pour répondre aux questions comparatives</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
