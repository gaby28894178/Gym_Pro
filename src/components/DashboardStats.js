import React from 'react';
import { members, classes } from '../mock/data';

const DashboardStats = () => {
  const activeMembers = members.filter(m => m.status === 'active').length;
  const upcomingClasses = classes.filter(c => c.spots > 0).length;
  const avgCheckins = (members.reduce((sum, m) => sum + m.checkins, 0) / activeMembers).toFixed(1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-500">Miembros activos</h3>
        <p className="mt-2 text-3xl font-semibold text-gray-900">{activeMembers}</p>
        <div className="mt-4 flex items-center text-sm text-green-600">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
          </svg>
          +12% desde el mes pasado
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-500">Clases próximas</h3>
        <p className="mt-2 text-3xl font-semibold text-gray-900">{upcomingClasses}</p>
        <div className="mt-4 flex items-center text-sm text-gray-500">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          Próxima clase: 08:00 AM
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-500">Check-ins promedio</h3>
        <p className="mt-2 text-3xl font-semibold text-gray-900">{avgCheckins}</p>
        <div className="mt-4 flex items-center text-sm text-gray-500">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          Últimos 30 días
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;