import React, { useState } from 'react';
import { Calendar, TrendingUp, Award, Clock, BookOpen, Target, ChevronRight, ChevronDown, CheckCircle, AlertCircle, X } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const MyProgressDashboard: React.FC = () => {
  const [expandedSP, setExpandedSP] = useState<number | null>(null);
  const [expandedHistory, setExpandedHistory] = useState(false);
  const [trendView, setTrendView] = useState<'week'|'month'|'year'>('week');

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
  } as const;

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

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'qualified': return 'bg-green-50 border-green-200 text-green-800';
      case 'at-risk': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'not-qualified': return 'bg-orange-50 border-orange-200 text-orange-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'qualified': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'at-risk': return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'not-qualified': return <AlertCircle className="w-5 h-5 text-orange-600" />;
      default: return null;
    }
  };

  const getStatusMessage = (data: any) => {
    if (data.status === 'qualified') {
      return `Great work! You've completed all required training for ${data.month}.`;
    } else if (data.status === 'at-risk') {
      return `You're almost there! ${data.total - data.completed} Required Cards left to complete by Dec 31.`;
    } else {
      return `You have ${data.total - data.completed} Required Cards to complete. Let's get caught up!`;
    }
  };

  const getRankEmoji = (rank: string) => {
    const ranks: Record<string,string> = {
      'Obsidian': '💎',
      'Marble': '⚪',
      'Granite': '🟤',
      'Limestone': '🟡',
      'Sandstone': '🟠'
    };
    return ranks[rank] || '⚪';
  };

  const getRankColor = (rank: string) => {
    const colors: Record<string,string> = {
      'Obsidian': 'from-purple-900 to-black',
      'Marble': 'from-gray-100 to-gray-300',
      'Granite': 'from-amber-800 to-amber-950',
      'Limestone': 'from-yellow-200 to-yellow-400',
      'Sandstone': 'from-orange-300 to-orange-500'
    };
    return colors[rank] || 'from-gray-100 to-gray-300';
  };

  const formatTime = (timeObj: any) => {
    return `${timeObj.hours}h ${timeObj.minutes}m`;
  };

  const getTrendInsight = () => {
    const data = trendData[trendView as keyof typeof trendData];
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

            {/* Current AR */}
            <div className="rounded-lg border-2 p-4 mb-3 bg-blue-50 border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-lg">AR Trend</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{knowledgeData.currentAR}%</div>
                  <div className="text-xs">Today</div>
                </div>
              </div>

              {/* Trend Selector */}
              <div className="flex gap-2 mb-3">
                {(['week', 'month', 'year'] as const).map((period) => (
                  <button
                    key={period}
                    onClick={() => setTrendView(period)}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2
                    ${trendView === period ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}
                    `}
                  >
                    {period === 'week' && '📅'}
                    {period === 'month' && '📊'}
                    {period === 'year' && '📈'}
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </button>
                ))}
              </div>

              {/* Trend Chart */}
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData[trendView] as any} margin={{ top: 8, right: 8, left: -10, bottom: 8 }}>
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
              </div>

              {/* Trend Insight */}
              <div className="mt-3 text-sm text-gray-600">
                {getTrendInsight()}
              </div>
            </div>

            {/* Knowledge Rank */}
            <div className="rounded-lg border-2 p-4 bg-gradient-to-r from-gray-50 to-gray-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-gray-600" />
                  <span className="font-semibold text-lg">Knowledge Rank</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{getRankEmoji(knowledgeData.rank)} {knowledgeData.rank}</div>
                  <div className="text-xs">As of Dec 1, 2023</div>
                </div>
              </div>

              <div className="w-full bg-white bg-opacity-50 rounded-full h-2 mb-3">
                <div 
                  className="bg-current h-2 rounded-full transition-all duration-300"
                  style={{ width: `${knowledgeData.topPercentile}%` }}
                />
              </div>

              <p className="text-sm text-gray-600">
                You're in the top {knowledgeData.topPercentile}% of learners. Keep it up!
              </p>
            </div>
          </div>
        </div>

        {/* 3. STRATEGIC PROJECTS */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-green-600" />
              <h2 className="text-lg font-semibold text-gray-900">Strategic Projects</h2>
            </div>

            {spData.map((sp, idx) => (
              <div key={sp.id} className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-gray-400" />
                    </div>
                    <span className="font-semibold text-gray-900">{sp.date}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{sp.correct}/{sp.total}</div>
                    <div className="text-xs">Cards</div>
                  </div>
                </div>

                {/* Impact & Questions */}
                <div className="flex gap-4 mb-2">
                  <div className="flex-1 bg-gray-50 rounded-lg p-3">
                    <div className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">Impact</div>
                    <div className="text-lg font-bold">{sp.impact}</div>
                  </div>
                  <div className="flex-1 bg-gray-50 rounded-lg p-3">
                    <div className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">Questions</div>
                    <div className="text-lg font-bold">{sp.questions.length}</div>
                  </div>
                </div>

                {/* Questions List */}
                {sp.questions.length > 0 && (
                  <div className={`bg-gray-50 rounded-lg p-3 mb-2`}>
                    <div className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">Questions</div>
                    <div className="space-y-2">
                      {sp.questions.map((q, qidx) => (
                        <div key={qidx} className="flex flex-col sm:flex-row gap-2">
                          <div className="flex-1 bg-white rounded-lg shadow-sm p-3">
                            <div className="text-sm font-medium text-gray-900">{q.q}</div>
                            <div className="text-xs text-gray-600 mt-1">
                              {q.correct ? '✅ Correct' : '❌ Incorrect'}
                            </div>
                          </div>
                          <div className="flex-none text-xs text-gray-500">
                            Impact: {q.impact}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Expand/Collapse Button */}
                <button
                  onClick={() => setExpandedSP(expandedSP === sp.id ? null : sp.id)}
                  className="w-full flex items-center justify-between text-sm text-gray-600 hover:text-gray-900 py-2"
                >
                  <span>{expandedSP === sp.id ? 'Hide Details' : 'View Details'}</span>
                  {expandedSP === sp.id ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>

                {/* Expanded Content */}
                {expandedSP === sp.id && (
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <div className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">Detailed View</div>
                    <div className="space-y-2">
                      {sp.questions.map((q, qidx) => (
                        <div key={qidx} className="flex flex-col sm:flex-row gap-2">
                          <div className="flex-1 bg-white rounded-lg shadow-sm p-3">
                            <div className="text-sm font-medium text-gray-900">{q.q}</div>
                            <div className="text-xs text-gray-600 mt-1">
                              {q.correct ? '✅ Correct' : '❌ Incorrect'}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {q.explanation}
                            </div>
                          </div>
                          <div className="flex-none text-xs text-gray-500">
                            Impact: {q.impact}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 4. EFFORT ANALYSIS */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-green-600" />
              <h2 className="text-lg font-semibold text-gray-900">Effort Analysis</h2>
            </div>

            {/* Total Time */}
            <div className="rounded-lg border-2 p-4 mb-3 bg-blue-50 border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-lg">Total Time</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{formatTime(effortData.totalTime)}</div>
                  <div className="text-xs">As of Nov 30, 2023</div>
                </div>
              </div>

              <div className="w-full bg-white bg-opacity-50 rounded-full h-2 mb-3">
                <div 
                  className="bg-current h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(effortData.thisMonth.hours * 60 + effortData.thisMonth.minutes) / (effortData.totalTime.hours * 60 + effortData.totalTime.minutes) * 100}%` }}
                />
              </div>

              <p className="text-sm text-gray-600">
                You've completed {formatTime(effortData.thisMonth)} this month. Great job!
              </p>
            </div>

            {/* Cards & SPs Effort */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-lg border-2 p-4 bg-gradient-to-r from-green-50 to-green-100">
                <div className="text-xs font-semibold text-green-800 uppercase tracking-wide mb-1">Cards</div>
                <div className="text-2xl font-bold">{effortData.cards.count}</div>
                <div className="text-xs text-green-700 mt-1">
                  Avg. {effortData.cards.avg} min/card
                </div>
              </div>
              <div className="rounded-lg border-2 p-4 bg-gradient-to-r from-blue-50 to-blue-100">
                <div className="text-xs font-semibold text-blue-800 uppercase tracking-wide mb-1">SPs</div>
                <div className="text-2xl font-bold">{effortData.sps.count}</div>
                <div className="text-xs text-blue-700 mt-1">
                  Avg. {effortData.sps.avg} min/SP
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-xs">
          &copy; 2023 Hyundai Learning. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default MyProgressDashboard;
