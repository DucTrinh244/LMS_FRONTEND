import { CheckCircle, Copy, DollarSign, Gift, Share2, TrendingUp, Users } from 'lucide-react';
import { useState } from 'react';

const ReferralsContent = () => {
  const [copied, setCopied] = useState(false);

  const referralCode = 'RONALD2024';
  const referralLink = `https://lms.example.com/ref/${referralCode}`;

  const stats = {
    totalReferrals: 12,
    activeReferrals: 8,
    totalEarnings: 240,
    pendingEarnings: 60
  };

  const referrals = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      status: 'active',
      joinedDate: '2024-01-10',
      earnings: 20,
      coursePurchased: 'Advanced React Development'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      status: 'active',
      joinedDate: '2024-01-08',
      earnings: 20,
      coursePurchased: 'Complete Python Bootcamp'
    },
    {
      id: 3,
      name: 'Bob Wilson',
      email: 'bob.wilson@example.com',
      status: 'pending',
      joinedDate: '2024-01-15',
      earnings: 0,
      coursePurchased: null
    },
    {
      id: 4,
      name: 'Alice Brown',
      email: 'alice.brown@example.com',
      status: 'active',
      joinedDate: '2024-01-05',
      earnings: 20,
      coursePurchased: 'Digital Marketing Mastery'
    }
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-md hover:shadow-violet-500/50 transition">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-violet-600/20 rounded-xl flex items-center justify-center">
              <Users className="w-7 h-7 text-violet-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">{stats.totalReferrals}</div>
              <div className="text-sm font-medium text-slate-300">Total Referrals</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-md hover:shadow-violet-500/50 transition">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-green-600/20 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-7 h-7 text-green-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">{stats.activeReferrals}</div>
              <div className="text-sm font-medium text-slate-300">Active Referrals</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-md hover:shadow-violet-500/50 transition">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-amber-600/20 rounded-xl flex items-center justify-center">
              <DollarSign className="w-7 h-7 text-amber-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">${stats.totalEarnings}</div>
              <div className="text-sm font-medium text-slate-300">Total Earnings</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-md hover:shadow-violet-500/50 transition">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-600/20 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-7 h-7 text-blue-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">${stats.pendingEarnings}</div>
              <div className="text-sm font-medium text-slate-300">Pending</div>
            </div>
          </div>
        </div>
      </div>

      {/* Referral Code Section */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-6">
        <div className="flex items-center gap-3 mb-6">
          <Gift className="w-6 h-6 text-violet-400" />
          <h3 className="text-xl font-bold text-white">Your Referral Code</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Referral Code</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={referralCode}
                readOnly
                className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white font-mono text-lg font-bold"
              />
              <button
                onClick={copyToClipboard}
                className="bg-violet-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-violet-500 transition flex items-center gap-2"
              >
                {copied ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Referral Link</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white text-sm"
              />
              <button
                onClick={copyToClipboard}
                className="bg-slate-700 text-slate-300 px-6 py-3 rounded-lg font-semibold hover:bg-slate-600 transition flex items-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>
          </div>
          <div className="bg-violet-600/10 border border-violet-600/30 rounded-lg p-4">
            <p className="text-sm text-slate-300">
              <span className="font-semibold text-violet-400">How it works:</span> Share your referral code or link with friends.
              When they sign up and make a purchase, you'll earn $20 in credits!
            </p>
          </div>
        </div>
      </div>

      {/* Referrals List */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-6">
        <h3 className="text-xl font-bold text-white mb-6">Referral History</h3>
        <div className="space-y-4">
          {referrals.map((referral) => (
            <div
              key={referral.id}
              className="p-5 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition border border-slate-600"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-lg font-semibold text-white">{referral.name}</h4>
                    <span className={`${referral.status === 'active'
                      ? 'bg-green-600/20 text-green-400'
                      : 'bg-yellow-600/20 text-yellow-400'
                      } text-xs font-semibold px-3 py-1 rounded-full`}>
                      {referral.status.charAt(0).toUpperCase() + referral.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-2">
                    <span>{referral.email}</span>
                    <span>•</span>
                    <span>Joined: {new Date(referral.joinedDate).toLocaleDateString()}</span>
                  </div>
                  {referral.coursePurchased && (
                    <p className="text-sm text-slate-300">
                      Purchased: <span className="text-violet-400">{referral.coursePurchased}</span>
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-violet-400 mb-1">
                    ${referral.earnings}
                  </div>
                  <div className="text-xs text-slate-400">Earnings</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReferralsContent;