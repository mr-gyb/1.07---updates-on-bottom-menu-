import React from 'react';
import { ChevronLeft, User, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Referral {
  code: string;
  count: number;
  earnings: number;
}

const Invites: React.FC = () => {
  const inviteCode = 'GYBNEW10';
  const referrals: Referral[] = [
    { code: 'SMALLBIZ123', count: 3, earnings: 450 },
    { code: 'INFLUENCER456', count: 5, earnings: 750 },
    { code: 'ENTERPRISE789', count: 1, earnings: 1000 },
  ];

  return (
    <div className="bg-white min-h-screen text-navy-blue">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <Link to="/dashboard" className="mr-4 text-navy-blue">
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold text-navy-blue">Invites</h1>
        </div>

        <div className="bg-navy-blue text-white rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-2">Your Invite Code</h2>
          <div className="text-5xl font-bold mb-4">{inviteCode}</div>
          <p className="text-lg">Share this code with potential clients to earn rewards!</p>
        </div>

        <h2 className="text-3xl font-bold mb-6 text-navy-blue">Your Referrals</h2>

        <div className="space-y-4">
          {referrals.map((referral, index) => (
            <div key={index} className="bg-navy-blue text-white rounded-lg p-6 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold mb-2">{referral.code}</h3>
                <div className="flex items-center">
                  <User size={20} className="mr-2" />
                  <span className="text-xl">{referral.count} referral{referral.count !== 1 ? 's' : ''}</span>
                </div>
              </div>
              <div className="flex items-center">
                <DollarSign size={24} className="mr-1" />
                <span className="text-3xl font-bold">${referral.earnings}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Invites;