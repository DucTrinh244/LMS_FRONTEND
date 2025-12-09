import { Calendar, CheckCircle, Clock, Eye, HelpCircle } from 'lucide-react';

const MyQuizAttemptsContent = () => {
  const quizAttempts = [
    {
      id: 1,
      course: 'Sketch from A to Z (2024)',
      quizTitle: 'Introduction to Sketch',
      date: '2024-01-15',
      score: 85,
      totalQuestions: 20,
      correctAnswers: 17,
      timeSpent: '25 min',
      status: 'completed'
    },
    {
      id: 2,
      course: 'Build Responsive Real World',
      quizTitle: 'CSS Fundamentals Quiz',
      date: '2024-01-12',
      score: 100,
      totalQuestions: 22,
      correctAnswers: 22,
      timeSpent: '30 min',
      status: 'completed'
    },
    {
      id: 3,
      course: 'UI/UX Design Degree',
      quizTitle: 'Design Principles Assessment',
      date: '2024-01-10',
      score: 80,
      totalQuestions: 30,
      correctAnswers: 24,
      timeSpent: '45 min',
      status: 'completed'
    },
    {
      id: 4,
      course: 'Wordpress for Beginners',
      quizTitle: 'WordPress Basics',
      date: '2024-01-08',
      score: 70,
      totalQuestions: 20,
      correctAnswers: 14,
      timeSpent: '20 min',
      status: 'completed'
    },
    {
      id: 5,
      course: 'Become an app designer',
      quizTitle: 'Mobile Design Quiz',
      date: '2024-01-05',
      score: 90,
      totalQuestions: 20,
      correctAnswers: 18,
      timeSpent: '28 min',
      status: 'completed'
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 70) return 'text-violet-400';
    return 'text-orange-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-green-600/20';
    if (score >= 70) return 'bg-violet-600/20';
    return 'bg-orange-600/20';
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-md hover:shadow-violet-500/50 transition">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-violet-600/20 rounded-xl flex items-center justify-center">
              <HelpCircle className="w-7 h-7 text-violet-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">{quizAttempts.length}</div>
              <div className="text-sm font-medium text-slate-300">Total Attempts</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-md hover:shadow-violet-500/50 transition">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-green-600/20 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-7 h-7 text-green-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">
                {Math.round(quizAttempts.reduce((acc, q) => acc + q.score, 0) / quizAttempts.length)}%
              </div>
              <div className="text-sm font-medium text-slate-300">Average Score</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-md hover:shadow-violet-500/50 transition">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-600/20 rounded-xl flex items-center justify-center">
              <Clock className="w-7 h-7 text-blue-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">
                {quizAttempts.reduce((acc, q) => acc + parseInt(q.timeSpent), 0)} min
              </div>
              <div className="text-sm font-medium text-slate-300">Total Time</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Attempts List */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-6">
        <h3 className="text-xl font-bold text-white mb-6">Quiz Attempts History</h3>
        <div className="space-y-4">
          {quizAttempts.map((attempt) => (
            <div
              key={attempt.id}
              className="p-5 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition border border-slate-600"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-lg font-semibold text-white">{attempt.quizTitle}</h4>
                    <span className="bg-violet-600/20 text-violet-400 text-xs font-semibold px-2 py-1 rounded-full">
                      {attempt.course}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(attempt.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{attempt.timeSpent}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4" />
                      <span>{attempt.correctAnswers}/{attempt.totalQuestions} Correct</span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-2 mb-2">
                    <div
                      className={`h-2 rounded-full transition-all ${getScoreBg(attempt.score)}`}
                      style={{ width: `${attempt.score}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className={`text-center ${getScoreColor(attempt.score)}`}>
                    <div className="text-3xl font-bold">{attempt.score}%</div>
                    <div className="text-xs text-slate-400">Score</div>
                  </div>
                  <button className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:shadow-violet-500/50 transition flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyQuizAttemptsContent;