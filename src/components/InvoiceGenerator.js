import React, { useState, useEffect } from 'react';
import LocalDB from '../utils/localDB';

const InvoiceGenerator = ({ paymentId }) => {
  const [invoiceData, setInvoiceData] = useState(null);
  const [gymName, setGymName] = useState('GymPro Fitness Center');

  useEffect(() => {
    const loadInvoiceData = async () => {
      if (paymentId) {
        const payments = await LocalDB.get('payments');
        const members = await LocalDB.get('members');
        const payment = payments.find(p => p.id === paymentId);
        const member = members.find(m => m.id === payment.memberId);
        
        if (payment && member) {
          setInvoiceData({
            ...payment,
            memberName: member.name,
            membership: member.membership
          });
        }
      }
    };
    loadInvoiceData();
  }, [paymentId]);

  const generatePDF = () => {
    // En una aplicación real, aquí se generaría el PDF usando una librería como jsPDF
    // Esta es una simulación que muestra los datos que se incluirían en el PDF
    const invoiceContent = `
      =================================
      ${gymName.toUpperCase()}
      =================================
      FACTURA #${invoiceData.id}
      Fecha: ${new Date(invoiceData.date).toLocaleDateString()}
      
      CLIENTE:
      ${invoiceData.memberName}
      Membresía: ${invoiceData.membership}
      
      DETALLE:
      Concepto: ${invoiceData.type}
      Monto: $${invoiceData.amount}
      
      Gracias por su pago!
      =================================
    `;
    
    alert('Se generaría un PDF con el siguiente contenido:\n\n' + invoiceContent);
    console.log('Contenido de la factura:', invoiceContent);
  };

  if (!invoiceData) return <div className="text-center py-4 text-gray-500">Seleccione un pago para generar factura</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Generar Factura</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Gimnasio</label>
        <input
          type="text"
          value={gymName}
          onChange={(e) => setGymName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900">Detalles del Pago</h4>
          <p className="text-sm text-gray-600 mt-2">ID: {invoiceData.id}</p>
          <p className="text-sm text-gray-600">Tipo: {invoiceData.type}</p>
          <p className="text-sm text-gray-600">Monto: ${invoiceData.amount}</p>
          <p className="text-sm text-gray-600">Fecha: {invoiceData.date}</p>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900">Detalles del Cliente</h4>
          <p className="text-sm text-gray-600 mt-2">Nombre: {invoiceData.memberName}</p>
          <p className="text-sm text-gray-600">Membresía: {invoiceData.membership}</p>
        </div>
      </div>
      
      <button
        onClick={generatePDF}
        className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Generar Factura PDF
      </button>
    </div>
  );
};

export default InvoiceGenerator;