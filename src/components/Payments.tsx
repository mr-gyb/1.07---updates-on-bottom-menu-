import React from 'react';
import { ChevronLeft, CreditCard, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Payment {
  date: string;
  amount: number;
  method: string;
}

const Payments: React.FC = () => {
  const paymentMethod = "Direct Deposit (Default)";
  const recentPayments: Payment[] = [
    { date: "2023-04-15", amount: 180, method: "Direct Deposit" },
    { date: "2023-04-08", amount: 220, method: "PayPal" },
    { date: "2023-04-01", amount: 195, method: "Direct Deposit" },
  ];

  return (
    <div className="bg-navy-blue min-h-screen text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <Link to="/dashboard" className="mr-4">
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold">Payments</h1>
        </div>

        <div className="bg-white text-navy-blue rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
          <div className="flex items-center">
            <CreditCard size={24} className="mr-4" />
            <span className="text-xl">{paymentMethod}</span>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">Recent Payments</h2>
        <div className="space-y-4">
          {recentPayments.map((payment, index) => (
            <div key={index} className="bg-white text-navy-blue rounded-lg p-6 flex justify-between items-center">
              <div className="flex items-center">
                <Calendar size={24} className="mr-4" />
                <div>
                  <p className="text-xl font-bold">{payment.date}</p>
                  <p className="text-gray-600">{payment.method}</p>
                </div>
              </div>
              <div className="text-2xl font-bold">
                $ {payment.amount}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Payments;