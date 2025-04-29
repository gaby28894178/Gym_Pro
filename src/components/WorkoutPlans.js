import React, { useState } from 'react';

const WorkoutPlans = () => {
  const [activeTab, setActiveTab] = useState('plans');

  const workoutPlans = [
    { id: 1, member: 'Alex Johnson', trainer: 'Carlos Mendez', startDate: '2023-05-15', endDate: '2023-08-15', status: 'Active' },
    { id: 2, member: 'Maria Garcia', trainer: 'Sophia Chen', startDate: '2023-06-01', endDate: '2023-09-01', status: 'Active' },
    { id: 3, member: 'Sam Wilson', trainer: 'David Kim', startDate: '2023-04-10', endDate: '2023-07-10', status: 'Completed' },
  ];

  const workoutHistory = [
    { id: 1, member: 'Alex Johnson', date: '2023-06-20', exercises: 'Press banca, Sentadillas, Peso muerto', weight: '75kg', notes: 'Buen progreso' },
    { id: 2, member: 'Maria Garcia', date: '2023-06-18', exercises: 'Yoga flow, Meditación', weight: '-', notes: 'Flexibilidad mejorada' },
    { id: 3, member: 'Sam Wilson', date: '2023-06-15', exercises: 'HIIT, Ciclismo', weight: '82kg', notes: 'Bajar intensidad' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Rutinas y Entrenamientos</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('plans')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'plans' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            Planes
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'history' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            Historial
          </button>
        </div>
      </div>

      {activeTab === 'plans' ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Miembro</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entrenador</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Inicio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Fin</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {workoutPlans.map((plan) => (
                <tr key={plan.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{plan.member}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{plan.trainer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{plan.startDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{plan.endDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${plan.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                      {plan.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Miembro</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ejercicios</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Peso</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notas</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {workoutHistory.map((history) => (
                <tr key={history.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{history.member}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{history.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{history.exercises}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{history.weight}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{history.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WorkoutPlans;