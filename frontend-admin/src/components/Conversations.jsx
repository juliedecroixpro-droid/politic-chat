import React, { useState, useEffect } from 'react';
import { analytics } from '../utils/api';

export default function Conversations({ user }) {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      const response = await analytics.conversations(100);
      setConversations(response.data);
    } catch (error) {
      console.error('Failed to load conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading conversations...</p>
      </div>
    );
  }

  if (!user?.program_processed || conversations.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">💬</div>
        <h3 className="text-xl font-medium text-gray-900 mb-2">
          No Conversations Yet
        </h3>
        <p className="text-gray-600">
          Conversations will appear here after citizens start chatting with your AI assistant.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Recent Conversations</h2>
        <span className="text-sm text-gray-600">{conversations.length} conversations</span>
      </div>

      <div className="space-y-4">
        {conversations.map((conv) => (
          <div key={conv.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>🕐 {new Date(conv.created_at).toLocaleString('fr-FR')}</span>
                <span>•</span>
                <span>⚡ {conv.response_time_ms}ms</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="text-xs font-medium text-gray-500 mb-1">QUESTION</div>
                <p className="text-sm text-gray-900">{conv.question}</p>
              </div>
              
              <div>
                <div className="text-xs font-medium text-gray-500 mb-1">ANSWER</div>
                <p className="text-sm text-gray-700">{conv.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
