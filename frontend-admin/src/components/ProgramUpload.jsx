import React, { useState } from 'react';
import { program } from '../utils/api';

export default function ProgramUpload({ user, onUploadComplete }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setError('');
    setSuccess('');

    if (selectedFile) {
      // Validate file type
      const validTypes = ['.pdf', '.docx', '.doc'];
      const fileExt = '.' + selectedFile.name.split('.').pop().toLowerCase();
      
      if (!validTypes.includes(fileExt)) {
        setError('Please select a PDF or Word document');
        setFile(null);
        return;
      }

      // Validate file size (50MB)
      if (selectedFile.size > 50 * 1024 * 1024) {
        setError('File size must be less than 50MB');
        setFile(null);
        return;
      }

      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError('');
    setSuccess('');
    setUploadProgress(0);

    try {
      const response = await program.upload(file, (progressEvent) => {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setUploadProgress(progress);
      });

      setSuccess(`Program uploaded and processed successfully! ${response.data.details.total_chunks} sections indexed.`);
      setFile(null);
      
      // Reset file input
      document.getElementById('file-input').value = '';
      
      // Refresh user data
      if (onUploadComplete) {
        setTimeout(() => onUploadComplete(), 1000);
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Upload Campaign Program</h2>
      
      {user?.program_uploaded && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-900">
            ✓ Current program: <strong>{user.program_filename}</strong>
          </p>
          <p className="text-xs text-blue-700 mt-1">
            Upload a new file to replace the current program.
          </p>
        </div>
      )}

      <div className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
            {success}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Program Document (PDF or Word)
          </label>
          <input
            id="file-input"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            disabled={uploading}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          />
          <p className="text-xs text-gray-500 mt-2">
            Maximum file size: 50MB | Maximum pages: 100
          </p>
        </div>

        {file && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm font-medium text-gray-900">{file.name}</p>
                <p className="text-xs text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              {!uploading && (
                <button
                  onClick={() => {
                    setFile(null);
                    document.getElementById('file-input').value = '';
                  }}
                  className="text-red-600 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              )}
            </div>

            {uploading && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-700">Uploading & Processing...</span>
                  <span className="text-sm font-medium text-gray-900">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {uploading ? 'Processing...' : 'Upload & Process Program'}
        </button>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-2">What happens next?</h3>
          <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
            <li>Your document will be parsed and text extracted</li>
            <li>Content will be divided into searchable sections</li>
            <li>AI embeddings will be created for intelligent search</li>
            <li>Your chatbot will be ready to answer questions</li>
          </ul>
          <p className="text-xs text-gray-500 mt-3">
            Processing typically takes 30-60 seconds depending on document size.
          </p>
        </div>
      </div>
    </div>
  );
}
