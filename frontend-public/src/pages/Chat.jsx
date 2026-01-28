import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Chat() {
  const { slug } = useParams();
  const [candidate, setCandidate] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [remaining, setRemaining] = useState(20);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    loadCandidateInfo();
  }, [slug]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadCandidateInfo = async () => {
    try {
      const response = await axios.get(`/api/chat/${slug}/info`);
      setCandidate(response.data);
      
      // Add welcome message
      setMessages([{
        type: 'assistant',
        text: `Bonjour ! Je suis ${response.data.agent_name}, l'assistant virtuel de ${response.data.name}. Je suis ici pour répondre à vos questions sur le programme électoral. N'hésitez pas à me poser vos questions !`
      }]);
    } catch (err) {
      setError(err.response?.data?.detail || 'Chat non disponible');
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || sending) return;

    const userMessage = input.trim();
    setInput('');
    setError('');

    // Add user message
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setSending(true);

    try {
      const response = await axios.post(`/api/chat/${slug}/message`, {
        question: userMessage
      });

      // Add assistant response
      setMessages(prev => [...prev, {
        type: 'assistant',
        text: response.data.answer,
        cached: response.data.cached
      }]);

      setRemaining(response.data.remaining_messages);
    } catch (err) {
      if (err.response?.status === 429) {
        setError('Vous avez atteint la limite quotidienne de 20 messages. Revenez demain !');
      } else {
        setError(err.response?.data?.detail || 'Erreur lors de l\'envoi du message');
      }
      
      // Remove user message on error
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (error && !candidate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Chat non disponible</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">{candidate?.name}</h1>
              <p className="text-sm text-gray-600">{candidate?.election}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Messages restants</div>
              <div className="text-2xl font-bold text-blue-600">{remaining}/20</div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden flex flex-col" style={{ height: 'calc(100vh - 200px)' }}>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-3 ${
                    msg.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                  {msg.cached && (
                    <p className="text-xs opacity-70 mt-1">⚡ Réponse instantanée</p>
                  )}
                </div>
              </div>
            ))}
            
            {sending && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Error Message */}
          {error && (
            <div className="px-4 py-2 bg-red-50 border-t border-red-200">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Input */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Posez votre question..."
                disabled={sending || remaining === 0}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || sending || remaining === 0}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {sending ? '...' : 'Envoyer'}
              </button>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-4 bg-white rounded-lg shadow-sm p-4">
          <p className="text-xs text-gray-600 text-center">
            ℹ️ Ceci est un assistant IA. Pour des informations officielles, contactez directement {candidate?.name}.
            Vos conversations sont anonymes et utilisées uniquement à des fins statistiques.
          </p>
        </div>
      </div>
    </div>
  );
}
