import React, { useState } from 'react';
import { Calendar, TrendingUp, Award, Clock, BookOpen, Target, ChevronRight, ChevronDown, CheckCircle, AlertCircle, X } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const MyProgressDashboard = () => {
  const [expandedSP, setExpandedSP] = useState(null);
  const [expandedHistory, setExpandedHistory] = useState(false);
  const [trendView, setTrendView] = useState('week'); // 'week', 'month', 'year'

  // Sample data - in production this would come from API
  const qualificationData = {
    current: { month: 'December', status: 'qualified', completed: 5, total: 5, daysLeft: 25 },
    history: [
      { month: 'November', status: 'qualified', completed: 4, total: 4 },
      { month: 'October', status: 'at-risk', completed: 3, total: 4 }
    ]
  };

  const knowledgeData = {
    currentAR: 87,
    rank: 'Marble',
    topPercentile: 8,
    showTopBadge: true
  };

  const trendData = {
    week: [
      { date: 'Nov 20', ar: 82, avg: 75 },
      { date: 'Nov 21', ar: 83, avg: 75 },
      { date: 'Nov 22', ar: 84, avg: 76 },
      { date: 'Nov 23', ar: 85, avg: 76 },
      { date: 'Nov 24', ar: 84, avg: 75 },
      { date: 'Nov 25', ar: 86, avg: 76 },
      { date: 'Today', ar: 87, avg: 76 }
    ],
    month: [
      { date: 'Week 1', ar: 80, avg: 74 },
      { date: 'Week 2', ar: 82, avg: 74 },
      { date: 'Week 3', ar: 85, avg: 75 },
      { date: 'Week 4', ar: 87, avg: 76 }
    ],
    year: [
      { date: 'Jan', ar: 70, avg: 72 },
      { date: 'Mar', ar: 74, avg: 73 },
      { date: 'May', ar: 78, avg: 74 },
      { date: 'Jul', ar: 80, avg: 74 },
      { date: 'Sep', ar: 83, avg: 75 },
      { date: 'Nov', ar: 87, avg: 76 }
    ]
  };

  const spData = [
    { 
      id: 1, 
      date: 'Nov 26, 3:45 PM', 
      correct: 8, 
      total: 10, 
      impact: 2.3,
      questions: [
        { q: 'What is regenerative braking?', correct: true, impact: 0.4, answer: 'System that recovers energy during deceleration', explanation: 'Regenerative braking converts kinetic energy into electrical energy...' },
        { q: 'EV6 battery capacity?', correct: true, impact: 0.3, answer: '77.4 kWh', explanation: 'The EV6 GT-Line features a 77.4 kWh battery pack...' },
        { q: 'Charging time for GT-Line?', correct: false, impact: -0.1, userAnswer: '4 hours', correctAnswer: '18 min (10-80%)', explanation: 'Using 350kW fast charging, the EV6 can charge from 10% to 80% in just 18 minutes.' }
      ]
    },
    { id: 2, date: 'Nov 23, 2:15 PM', correct: 9, total: 10, impact: 3.1, questions: [] },
    { id: 3, date: 'Nov 20, 4:30 PM', correct: 7, total: 10, impact: 1.8, questions: [] }
  ];

  const effortData = {
    totalTime: { hours: 12, minutes: 34 },
    thisMonth: { hours: 3, minutes: 12 },
    cards: { count: 47, time: { hours: 8, minutes: 15 }, avg: 10 },
    sps: { count: 23, time: { hours: 4, minutes: 19 }, avg: 11 }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'qualified': return 'bg-green-50 border-green-200 text-green-800';
      case 'at-risk': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'not-qualified': return 'bg-orange-50 border-orange-200 text-orange-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'qualified': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'at-risk': return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'not-qualified': return <AlertCircle className="w-5 h-5 text-orange-600" />;
      default: return null;
    }
  };

  const getStatusMessage = (data) => {
    if (data.status === 'qualified') {
      return `Great work! You've completed all required training for ${data.month}.`;
    } else if (data.status === 'at-risk') {
      return `You're almost there! ${data.total - data.completed} Required Cards left to complete by Dec 31.`;
    } else {
      return `You have ${data.total - data.completed} Required Cards to complete. Let's get caught up!`;
    }
  };

  const getRankEmoji = (rank) => {
    const ranks = {
      'Obsidian': '💎',
      'Marble': '⚪',
      'Granite': '🟤',
      'Limestone': '🟡',
      'Sandstone': '🟠'
    };
    return ranks[rank] || '⚪';
  };

  const getRankColor = (rank) => {
    const colors = {
      'Obsidian': 'from-purple-900 to-black',
      'Marble': 'from-gray-100 to-gray-300',
      'Granite': 'from-amber-800 to-amber-950',
      'Limestone': 'from-yellow-200 to-yellow-400',
      'Sandstone': 'from-orange-300 to-orange-500'
    };
    return colors[rank] || 'from-gray-100 to-gray-300';
  };

  const formatTime = (timeObj) => {
    return `${timeObj.hours}h ${timeObj.minutes}m`;
  };

  const getTrendInsight = () => {
    const data = trendData[trendView];
    const latest = data[data.length - 1].ar;
    const previous = data[data.length - 2].ar;
    const change = latest - previous;
    
    const timeframe = trendView === 'week' ? 'this week' : trendView === 'month' ? 'this month' : 'this year';
    
    if (change > 0) {
      return `📈 +${change}% improvement ${timeframe}`;
    } else if (change < 0) {
      return `📉 -${Math.abs(change)}% decrease ${timeframe}`;
    } else {
      return `→ Stable knowledge ${timeframe}`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">My Progress</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        
        {/* 1. QUALIFICATION STATUS */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">Qualification Status</h2>
              </div>
            </div>

            {/* Current Month */}
            <div className={`rounded-lg border-2 p-4 mb-3 ${getStatusColor(qualificationData.current.status)}`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getStatusIcon(qualificationData.current.status)}
                  <span className="font-semibold text-lg">{qualificationData.current.month} 2024</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{qualificationData.current.completed}/{qualificationData.current.total}</div>
                  <div className="text-xs">Cards</div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-white bg-opacity-50 rounded-full h-2 mb-3">
                <div 
                  className="bg-current h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(qualificationData.current.completed / qualificationData.current.total) * 100}%` }}
                />
              </div>

              <p className="text-sm font-medium">
                {getStatusMessage(qualificationData.current)}
              </p>

              {qualificationData.current.status !== 'qualified' && (
                <button className="mt-3 w-full bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-900 font-medium py-2 px-4 rounded-lg transition-all">
                  View Required Cards
                </button>
              )}
            </div>

            {/* History */}
            <button 
              onClick={() => setExpandedHistory(!expandedHistory)}
              className="w-full flex items-center justify-between text-sm text-gray-600 hover:text-gray-900 py-2"
            >
              <span>View History</span>
              {expandedHistory ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>

            {expandedHistory && (
              <div className="space-y-2 mt-2">
                {qualificationData.history.map((item, idx) => (
                  <div key={idx} className={`rounded-lg border p-3 text-sm ${getStatusColor(item.status)}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(item.status)}
                        <span className="font-medium">{item.month}</span>
                      </div>
                      <span className="font-semibold">{item.completed}/{item.total}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 2. KNOWLEDGE PERFORMANCE */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-purple-600" />
              <h2 className="text-lg font-semibold text-gray-900">Knowledge Performance</h2>
            </div>

            {/* Top Performer Badge */}
            {knowledgeData.showTopBadge && (
              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">🏆</div>
                  <div>
                    <div className="text-xs font-semibold text-yellow-800 uppercase tracking-wide mb-1">Top Performer</div>
                    <div className="text-sm font-bold text-gray-900">
                      You're in the top {knowledgeData.topPercentile}% of Hyundai knowledge experts!
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Knowledge Rank */}
            <div className={`bg-gradient-to-br ${getRankColor(knowledgeData.rank)} rounded-xl p-6 mb-4 text-center relative overflow-hidden`}>
              <div className="relative z-10">
                <div className="text-6xl mb-2">{getRankEmoji(knowledgeData.rank)}</div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{knowledgeData.rank.toUpperCase()} RANK</div>
                <div className="text-4xl font-bold text-gray-900 mb-3">{knowledgeData.currentAR}%</div>
                <div className="text-sm font-medium text-gray-700 mb-3">Current Knowledge</div>
                
                {/* Progress to next rank */}
                <div className="bg-white bg-opacity-60 rounded-full h-2 w-full max-w-xs mx-auto mb-2">
                  <div 
                    className="bg-gray-900 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((knowledgeData.currentAR - 80) / 10) * 100}%` }}
                  />
                </div>
                <div className="text-xs text-gray-700">
                  {knowledgeData.rank === 'Marble' ? 'Only 3% away from Obsidian!' : 'Expert level knowledge!'}
                </div>
              </div>
            </div>

            {/* Knowledge Trend */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Knowledge Trend</h3>
                <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
                  {['week', 'month', 'year'].map((view) => (
                    <button
                      key={view}
                      onClick={() => setTrendView(view)}
                      className={`px-3 py-1 text-xs font-medium rounded transition-all ${
                        trendView === view 
                          ? 'bg-white text-gray-900 shadow-sm' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {view === 'week' ? 'Week' : view === 'month' ? 'Month' : 'Year'}
                    </button>
                  ))}
                </div>
              </div>

              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={trendData[trendView]} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#999" />
                  <YAxis domain={[60, 100]} tick={{ fontSize: 11 }} stroke="#999" />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                    formatter={(value) => `${value}%`}
                  />
                  <ReferenceLine y={70} stroke="#10b981" strokeDasharray="3 3" label={{ value: 'Target', fontSize: 11, fill: '#10b981' }} />
                  <Line type="monotone" dataKey="ar" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', r: 4 }} name="Your Knowledge" />
                  <Line type="monotone" dataKey="avg" stroke="#9ca3af" strokeWidth={2} strokeDasharray="5 5" dot={false} name="District Avg" />
                </LineChart>
              </ResponsiveContainer>

              <div className="mt-3 space-y-1 text-sm">
                <div className="text-gray-700">{getTrendInsight()}</div>
                {knowledgeData.currentAR > 70 && (
                  <div className="text-green-700">🎯 You're {knowledgeData.currentAR - 70}% above the minimum target</div>
                )}
                {knowledgeData.currentAR > trendData[trendView][trendData[trendView].length - 1].avg && (
                  <div className="text-purple-700">🏆 You're performing above district average!</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 3. RECENT SMART PRACTICES */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-semibold text-gray-900">Recent Smart Practices</h2>
            </div>

            <div className="space-y-3">
              {spData.map((sp) => (
                <div key={sp.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedSP(expandedSP === sp.id ? null : sp.id)}
                    className="w-full p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="text-left">
                        <div className="text-sm text-gray-600 mb-1">{sp.date}</div>
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-gray-900">
                            {sp.correct === sp.total ? '✅' : sp.correct >= sp.total * 0.7 ? '✓' : '○'} {sp.correct}/{sp.total} correct
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-bold text-lg ${sp.impact > 0 ? 'text-green-600' : 'text-orange-600'}`}>
                          {sp.impact > 0 ? '+' : ''}{sp.impact}%
                        </div>
                        <div className="text-xs text-gray-500">Knowledge</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center text-gray-400">
                      {expandedSP === sp.id ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </div>
                  </button>

                  {expandedSP === sp.id && sp.questions.length > 0 && (
                    <div className="border-t border-gray-200 bg-gray-50 p-4 space-y-3">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-sm text-gray-900">Question Details</h4>
                        <button onClick={() => setExpandedSP(null)} className="text-gray-400 hover:text-gray-600">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      
                      {sp.questions.map((q, idx) => (
                        <div key={idx} className="bg-white rounded-lg p-3 border border-gray-200">
                          <div className="flex items-start gap-2 mb-2">
                            <span className={`text-lg ${q.correct ? '✅' : '❌'}`}></span>
                            <div className="flex-1">
                              <div className="font-medium text-sm text-gray-900 mb-1">{q.q}</div>
                              
                              {!q.correct && q.userAnswer && (
                                <div className="text-xs text-red-600 mb-1">
                                  Your Answer: {q.userAnswer}
                                </div>
                              )}
                              
                              <div className="text-xs text-gray-700 mb-2">
                                {q.correct ? '✓' : '✅'} {q.correctAnswer || q.answer}
                              </div>

                              {q.explanation && (
                                <div className="text-xs text-gray-600 bg-blue-50 p-2 rounded border border-blue-100 mb-2">
                                  💡 {q.explanation}
                                </div>
                              )}
                              
                              <div className={`text-xs font-semibold ${q.impact >= 0 ? 'text-green-600' : 'text-orange-600'}`}>
                                Impact: {q.impact > 0 ? '+' : ''}{q.impact}% to your AR
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button className="w-full mt-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-medium text-gray-700 transition-colors">
              View All History →
            </button>
          </div>
        </div>

        {/* 4. LEARNING ACTIVITY */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-green-600" />
              <h2 className="text-lg font-semibold text-gray-900">Learning Activity</h2>
            </div>

            {/* Cards */}
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg mb-3">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{effortData.cards.count}</div>
                  <div className="text-xs text-gray-600">Cards Completed</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900">{formatTime(effortData.cards.time)}</div>
                <div className="text-xs text-gray-600">avg {effortData.cards.avg} min each</div>
              </div>
            </div>

            {/* Smart Practices */}
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg mb-3">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Target className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{effortData.sps.count}</div>
                  <div className="text-xs text-gray-600">Smart Practices</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900">{formatTime(effortData.sps.time)}</div>
                <div className="text-xs text-gray-600">avg {effortData.sps.avg} min each</div>
              </div>
            </div>

            {/* Total Time */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-600 mb-1">Total Learning Time</div>
                  <div className="text-2xl font-bold text-gray-900">{formatTime(effortData.totalTime)}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-600 mb-1">This Month</div>
                  <div className="text-lg font-semibold text-gray-900">{formatTime(effortData.thisMonth)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MyProgressDashboard;