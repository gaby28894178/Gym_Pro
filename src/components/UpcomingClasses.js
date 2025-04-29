import React from 'react';
import { classes } from '../mock/data';

const UpcomingClasses = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="text-lg font-medium text-gray-900">Próximas clases</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {classes.map((cls) => (
          <div key={cls.id} className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">{cls.name}</h4>
                <p className="text-sm text-gray-500 mt-1">{cls.time} • {cls.trainer}</p>
              </div>
              <div className="flex items-center">
                <span className={`text-sm font-medium ${cls.spots === 0 ? 'text-red-600' : 'text-gray-900'}`}>
                  {cls.spots === 0 ? 'Lleno' : `${cls.spots} cupos`}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingClasses;

// DONE