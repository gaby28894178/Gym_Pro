import React, { useState, useEffect } from 'react';
import API from '../utils/api';

const PaymentSummary = () => {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalTrainerPayments: 0,
    netProfit: 0
  });

  useEffect(() => {
    const loadData = async () => {
      const payments = await API.getData('payments');
      const trainers = await API.getData('trainers');
      
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      
      const monthlyPayments = payments.filter(p => {
        const paymentDate = new Date(p.date);
        return paymentDate.getMonth() === currentMonth && 
               paymentDate.getFullYear() === currentYear;
      });
      
      const totalIncome = monthlyPayments.reduce((sum, p) => sum + p.amount, 0);
      const totalTrainerPayments = trainers.reduce((sum, t) => sum + (t.salary || 0), 0);
      
      setSummary({
        totalIncome,
        totalTrainerPayments,
        netProfit: totalIncome - totalTrainerPayments
      });
    };
    
    loadData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-500">Ingresos Totales</h3>
        <p className="mt-2 text-3xl font-semibold text-gray-900">${summary.totalIncome.toLocaleString()}</p>
        <div className="mt-4 flex items-center text-sm text-green-600">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
          </svg>
          Este mes
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-500">Pagos a Entrenadores</h3>
        <p className="mt-2 text-3xl font-semibold text-gray-900">${summary.totalTrainerPayments.toLocaleString()}</p>
        <div className="mt-4 flex items-center text-sm text-gray-500">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          Nómina mensual
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-500">Ganancia Neta</h3>
        <p className={`mt-2 text-3xl font-semibold ${summary.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          ${summary.netProfit.toLocaleString()}
        </p>
        <div className="mt-4 flex items-center text-sm text-gray-500">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Balance mensual
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;