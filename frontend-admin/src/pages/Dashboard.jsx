import React, { useState, useEffect } from 'react';
import { removeToken } from '../utils/auth';
import { auth, program, agent, analytics } from '../utils/api';
import ProgramUpload from '../components/ProgramUpload';
import TalkingPointsUpload from '../components/TalkingPointsUpload';
import CompetitiveUpload from '../components/CompetitiveUpload';
import AgentConfig from '../components/AgentConfig';
import Analytics from '../components/Analytics';
import Conversations from '../components/Conversations';

export default function Dashboard({ setIsAuthenticated }) {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('upload');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const response = await auth.me();
      setUser(response.data);
      
      // Switch to config tab if program is already uploaded
      if (response.data.program_uploaded) {
        setActiveTab('config');
      }
    } catch (error) {
      console.error('Failed to load user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    removeToken();
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const chatUrl = user ? `https://frontend-public-pink.vercel.app/chat/${user.slug}` : '';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">PoliticChat</h1>
              <p className="text-sm text-gray-600">Welcome, {user?.name}</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Chat Link Banner */}
        {user?.program_processed && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-medium text-green-900 mb-2">
              🎉 Your chatbot is live!
            </h3>
            <p className="text-sm text-green-700 mb-2">Share this link with citizens:</p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={chatUrl}
                readOnly
                className="flex-1 px-3 py-2 bg-white border border-green-300 rounded text-sm"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(chatUrl);
                  alert('Link copied to clipboard!');
                }}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
              >
                Copy
              </button>
              <a
                href={chatUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
              >
                Open
              </a>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('upload')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'upload'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                📄 Programme
              </button>
              <button
                onClick={() => setActiveTab('talking-points')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'talking-points'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                💬 Éléments de langage
              </button>
              <button
                onClick={() => setActiveTab('competitive')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'competitive'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                ⚔️ Positionnement
              </button>
              <button
                onClick={() => setActiveTab('config')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'config'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                🤖 Config Agent
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'analytics'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                📊 Analytics
              </button>
              <button
                onClick={() => setActiveTab('conversations')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'conversations'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                💬 Conversations
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {activeTab === 'upload' && <ProgramUpload user={user} onUploadComplete={loadUser} />}
          {activeTab === 'talking-points' && <TalkingPointsUpload user={user} onUploadSuccess={loadUser} />}
          {activeTab === 'competitive' && <CompetitiveUpload user={user} onUploadSuccess={loadUser} />}
          {activeTab === 'config' && <AgentConfig user={user} onUpdate={loadUser} />}
          {activeTab === 'analytics' && <Analytics user={user} />}
          {activeTab === 'conversations' && <Conversations user={user} />}
        </div>
      </div>
    </div>
  );
}
