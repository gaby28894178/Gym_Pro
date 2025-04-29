import React, { useState, useEffect } from 'react';
import LocalDB from '../utils/localDB';

const MembershipTypesManager = () => {
  const [membershipTypes, setMembershipTypes] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    benefits: ''
  });

  useEffect(() => {
    const loadData = async () => {
      const data = await LocalDB.get('membershipTypes');
      setMembershipTypes(data);
    };
    loadData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await LocalDB.post('membershipTypes', {
        ...formData,
        price: Number(formData.price)
      });
      setFormData({
        name: '',
        description: '',
        price: '',
        benefits: ''
      });
      const updatedTypes = await LocalDB.get('membershipTypes');
      setMembershipTypes(updatedTypes);
    } catch (error) {
      console.error('Error al guardar tipo de membresía:', error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Tipos de Membresía</h3>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre*</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Precio ($)*</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción*</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Beneficios</label>
            <textarea
              name="benefits"
              value={formData.benefits}
              onChange={handleChange}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Lista de beneficios separados por comas"
            />
          </div>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700"
          >
            Agregar Membresía
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {membershipTypes.map((type) => (
          <div key={type.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-900">{type.name}</h4>
                <p className="text-sm text-gray-500">{type.description}</p>
                <p className="text-sm font-medium text-indigo-600 mt-1">${type.price}/mes</p>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                {type.benefits ? type.benefits.split(',').length : 0} beneficios
              </span>
            </div>
            {type.benefits && (
              <div className="mt-2">
                <p className="text-xs font-medium text-gray-500">Beneficios:</p>
                <p className="text-xs text-gray-600">{type.benefits}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembershipTypesManager;