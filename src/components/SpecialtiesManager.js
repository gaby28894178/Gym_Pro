import React, { useState, useEffect } from 'react';
import LocalDB from '../utils/localDB';

const SpecialtiesManager = () => {
  const [specialties, setSpecialties] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  useEffect(() => {
    const loadData = async () => {
      const data = await LocalDB.get('specialties');
      setSpecialties(data);
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
      await LocalDB.post('specialties', formData);
      setFormData({
        name: '',
        description: ''
      });
      const updatedSpecialties = await LocalDB.get('specialties');
      setSpecialties(updatedSpecialties);
    } catch (error) {
      console.error('Error al guardar especialidad:', error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Especialidades</h3>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700"
          >
            Agregar Especialidad
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {specialties.map((specialty) => (
          <div key={specialty.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
            <h4 className="font-medium text-gray-900">{specialty.name}</h4>
            <p className="text-sm text-gray-500 mt-1">{specialty.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialtiesManager;