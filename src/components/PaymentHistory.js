import React, { useState, useEffect } from 'react';
import LocalDB from '../utils/localDB';
import InvoiceGenerator from './InvoiceGenerator';

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const paymentsData = await LocalDB.get('payments');
      const membersData = await LocalDB.get('members');
      setPayments(paymentsData);
      setMembers(membersData);
    };
    loadData();
  }, []);

  const getMemberName = (id) => {
    const member = members.find(m => m.id === id);
    return member ? member.name : 'Desconocido';
  };

  const getMemberMembership = (id) => {
    const member = members.find(m => m.id === id);
    return member ? member.membership : '---';
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-medium text-gray-900">Historial de Pagos ({payments.length})</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Membresía</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {getMemberName(payment.memberId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getMemberMembership(payment.memberId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${payment.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setSelectedPayment(payment.id)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Factura
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedPayment && (
        <InvoiceGenerator paymentId={selectedPayment} />
      )}
    </div>
  );
};

export default PaymentHistory;

// DONE