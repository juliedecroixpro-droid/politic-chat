import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chat from './pages/Chat';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/chat/:slug" element={<Chat />} />
        <Route path="*" element={
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">PoliticChat</h1>
              <p className="text-gray-600">Please use a valid candidate chat link</p>
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
