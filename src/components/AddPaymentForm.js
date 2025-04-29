import React, { useState, useEffect } from 'react';
import LocalDB from '../utils/localDB';

const AddPaymentForm = () => {
  const [formData, setFormData] = useState({
    memberId: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    type: 'Membresía',
    status: 'Pagado'
  });
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const loadMembers = async () => {
      const data = await LocalDB.get('members');
      setMembers(data);
    };
    loadMembers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await LocalDB.post('payments', {
        ...formData,
        amount: Number(formData.amount),
        memberId: Number(formData.memberId)
      });
      setFormData({
        memberId: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        type: 'Membresía',
        status: 'Pagado'
      });
      alert('Pago registrado correctamente');
    } catch (error) {
      console.error('Error al registrar pago:', error);
      alert('Error al registrar pago');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Registrar Pago</h3>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Miembro</label>
            <select
              name="memberId"
              value={formData.memberId}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="">Seleccionar miembro</option>
              {members.map(member => (
                <option key={member.id} value={member.id}>
                  {member.name} ({member.membership})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monto ($)</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="Membresía">Membresía</option>
              <option value="Clase">Clase</option>
              <option value="Producto">Producto</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Registrar Pago
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPaymentForm;