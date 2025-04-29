import React from 'react';

const MetricsCharts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Asistencia mensual</h3>
          <select className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option>Últimos 30 días</option>
            <option>Últimos 90 días</option>
          </select>
        </div>
        <div className="h-64 bg-gray-50 rounded-lg"></div>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Tipos de membresía</h3>
        </div>
        <div className="h-64 bg-gray-50 rounded-lg"></div>
      </div>
    </div>
  );
};

export default MetricsCharts;