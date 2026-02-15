import { useState, useEffect } from 'react';
import { uploadTalkingPoints } from '../utils/api';

export default function TalkingPointsUpload({ user, onUploadSuccess }) {
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
      const result = await uploadTalkingPoints(file);
      setSuccess('Éléments de langage uploadés et traités avec succès !');
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
      <h2 className="text-2xl font-bold mb-4">Éléments de langage</h2>
      
      {user?.talking_points_uploaded && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-800 font-medium">
            ✓ Éléments de langage actuels
          </p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600 mb-4">
          Uploadez vos éléments de langage pour guider la communication de votre chatbot.
        </p>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Document des éléments de langage (PDF ou Word)
          </label>
          <input
            type="file"
            accept=".pdf,.docx,.doc"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100
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
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium
            hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed
            transition-colors"
        >
          {uploading ? 'Traitement en cours...' : 'Upload & Traiter les éléments de langage'}
        </button>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">À quoi servent les éléments de langage ?</h3>
          <ul className="space-y-1 text-sm text-blue-800">
            <li>• Définir les messages clés à communiquer</li>
            <li>• Guider le ton et le vocabulaire à utiliser</li>
            <li>• Assurer la cohérence de la communication</li>
            <li>• Fournir des formulations pré-approuvées pour les sujets sensibles</li>
          </ul>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          <p className="font-medium mb-1">Que se passe-t-il ensuite ?</p>
          <ul className="space-y-1 pl-4">
            <li>→ Le document sera analysé et divisé en sections</li>
            <li>→ Les embeddings IA seront créés pour la recherche sémantique</li>
            <li>→ Votre chatbot utilisera ces éléments pour répondre aux questions</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
