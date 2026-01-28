import React, { useState, useEffect } from 'react';
import { agent } from '../utils/api';

export default function AgentConfig({ user, onUpdate }) {
  const [config, setConfig] = useState({
    agent_name: '',
    tone: 'accessible',
    response_length: 'concise',
  });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setConfig({
        agent_name: user.agent_name || '',
        tone: user.tone || 'accessible',
        response_length: user.response_length || 'concise',
      });
    }
  }, [user]);

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess(false);

    try {
      await agent.updateConfig(config);
      setSuccess(true);
      if (onUpdate) {
        onUpdate();
      }
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to save configuration');
    } finally {
      setSaving(false);
    }
  };

  if (!user?.program_processed) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📄</div>
        <h3 className="text-xl font-medium text-gray-900 mb-2">
          Upload Your Program First
        </h3>
        <p className="text-gray-600">
          Agent configuration will be available after you upload your campaign program.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Configure Your AI Agent</h2>
      
      <div className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
            Configuration saved successfully!
          </div>
        )}

        {/* Agent Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Agent Name
          </label>
          <input
            type="text"
            value={config.agent_name}
            onChange={(e) => setConfig({ ...config, agent_name: e.target.value })}
            placeholder="e.g., Assistant, Marie, Programme Bot"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">
            The name your AI assistant will use when introducing itself
          </p>
        </div>

        {/* Tone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Tone
          </label>
          <div className="space-y-3">
            <label className="flex items-start p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
              style={{ borderColor: config.tone === 'formal' ? '#3B82F6' : '#E5E7EB' }}
            >
              <input
                type="radio"
                name="tone"
                value="formal"
                checked={config.tone === 'formal'}
                onChange={(e) => setConfig({ ...config, tone: e.target.value })}
                className="mt-1 mr-3"
              />
              <div>
                <div className="font-medium text-gray-900">Formal</div>
                <div className="text-sm text-gray-600">
                  Professional and official tone. Uses complete sentences and avoids colloquialisms.
                </div>
              </div>
            </label>

            <label className="flex items-start p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
              style={{ borderColor: config.tone === 'accessible' ? '#3B82F6' : '#E5E7EB' }}
            >
              <input
                type="radio"
                name="tone"
                value="accessible"
                checked={config.tone === 'accessible'}
                onChange={(e) => setConfig({ ...config, tone: e.target.value })}
                className="mt-1 mr-3"
              />
              <div>
                <div className="font-medium text-gray-900">Accessible</div>
                <div className="text-sm text-gray-600">
                  Clear, friendly language that's easy to understand. Warm and approachable.
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Response Length */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Response Length
          </label>
          <div className="space-y-3">
            <label className="flex items-start p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
              style={{ borderColor: config.response_length === 'concise' ? '#3B82F6' : '#E5E7EB' }}
            >
              <input
                type="radio"
                name="response_length"
                value="concise"
                checked={config.response_length === 'concise'}
                onChange={(e) => setConfig({ ...config, response_length: e.target.value })}
                className="mt-1 mr-3"
              />
              <div>
                <div className="font-medium text-gray-900">Concise</div>
                <div className="text-sm text-gray-600">
                  Brief, to-the-point responses (typically 2-3 sentences)
                </div>
              </div>
            </label>

            <label className="flex items-start p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
              style={{ borderColor: config.response_length === 'detailed' ? '#3B82F6' : '#E5E7EB' }}
            >
              <input
                type="radio"
                name="response_length"
                value="detailed"
                checked={config.response_length === 'detailed'}
                onChange={(e) => setConfig({ ...config, response_length: e.target.value })}
                className="mt-1 mr-3"
              />
              <div>
                <div className="font-medium text-gray-900">Detailed</div>
                <div className="text-sm text-gray-600">
                  Comprehensive answers with explanations and context
                </div>
              </div>
            </label>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition-colors font-medium"
        >
          {saving ? 'Saving...' : 'Save Configuration'}
        </button>

        {/* Preview Section */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-3">Preview</h3>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-900">
              <strong>{config.agent_name || 'Assistant'}:</strong> Bonjour ! Je suis l'assistant virtuel de {user.name}. 
              {config.tone === 'formal' 
                ? ' Je suis à votre disposition pour répondre à vos questions concernant le programme électoral.' 
                : ' Je suis là pour répondre à vos questions sur le programme !'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
