import React, { useState, useEffect } from 'react';
import { analytics } from '../utils/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Analytics({ user }) {
  const [overview, setOverview] = useState(null);
  const [topQuestions, setTopQuestions] = useState([]);
  const [hourlyData, setHourlyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const [overviewRes, topQuestionsRes, hourlyRes] = await Promise.all([
        analytics.overview(),
        analytics.topQuestions(),
        analytics.hourlyActivity(),
      ]);

      setOverview(overviewRes.data);
      setTopQuestions(topQuestionsRes.data);
      
      // Format hourly data for chart
      const formatted = hourlyRes.data.hours.map((hour, idx) => ({
        hour: `${hour}h`,
        conversations: hourlyRes.data.counts[idx],
      }));
      setHourlyData(formatted);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading analytics...</p>
      </div>
    );
  }

  if (!user?.program_processed) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📊</div>
        <h3 className="text-xl font-medium text-gray-900 mb-2">
          No Data Yet
        </h3>
        <p className="text-gray-600">
          Analytics will appear after citizens start using your chatbot.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
        <button
          onClick={() => analytics.exportCSV()}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
        >
          📥 Export CSV
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-sm text-gray-600 mb-1">Total Conversations</div>
          <div className="text-3xl font-bold text-gray-900">{overview?.total_conversations || 0}</div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-sm text-gray-600 mb-1">Today</div>
          <div className="text-3xl font-bold text-blue-600">{overview?.conversations_today || 0}</div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-sm text-gray-600 mb-1">Unique Users</div>
          <div className="text-3xl font-bold text-purple-600">{overview?.unique_users || 0}</div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-sm text-gray-600 mb-1">Avg Response Time</div>
          <div className="text-3xl font-bold text-green-600">{overview?.avg_response_time_ms || 0}ms</div>
        </div>
      </div>

      {/* Cost Monitoring */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="font-medium text-gray-900 mb-2">Daily Cost</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-gray-900">
            ${(overview?.daily_cost_usd || 0).toFixed(4)}
          </span>
          <span className="text-sm text-gray-600">/ $10.00 budget</span>
        </div>
        <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min((overview?.daily_cost_usd || 0) / 10 * 100, 100)}%` }}
          ></div>
        </div>
      </div>

      {/* Hourly Activity Chart */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="font-medium text-gray-900 mb-4">Hourly Activity (Last 7 Days)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={hourlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="conversations" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top Questions */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="font-medium text-gray-900 mb-4">Top Questions</h3>
        {topQuestions.length > 0 ? (
          <div className="space-y-3">
            {topQuestions.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-medium text-sm">
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{item.question}</p>
                  <p className="text-xs text-gray-500 mt-1">Asked {item.count} times</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No questions yet</p>
        )}
      </div>
    </div>
  );
}
