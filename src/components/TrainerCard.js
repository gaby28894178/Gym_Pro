import React from 'react';

const TrainerCard = ({ trainer }) => {
  const getSpecialtyColor = (specialty) => {
    const colors = {
      'Personal Training': 'bg-blue-50 border-blue-200',
      'Yoga': 'bg-purple-50 border-purple-200',
      'Pilates': 'bg-green-50 border-green-200',
      'CrossFit': 'bg-red-50 border-red-200',
      'Nutrición': 'bg-yellow-50 border-yellow-200'
    };
    return colors[specialty] || 'bg-gray-50 border-gray-200';
  };

  return (
    <div className={`rounded-xl border ${getSpecialtyColor(trainer.specialty)} p-6 shadow-sm transition-all hover:shadow-md`}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{trainer.name}</h3>
          <div className="mt-1 flex items-center">
            <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800">
              {trainer.specialty}
            </span>
            {trainer.isCertified && (
              <span className="ml-2 inline-block px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                Certificado
              </span>
            )}
          </div>
          <p className="mt-2 text-sm text-gray-600">{trainer.bio || 'Entrenador profesional'}</p>
        </div>
        {trainer.photoUrl && (
          <div className="ml-4 flex-shrink-0">
            <img 
              className="h-16 w-16 rounded-full object-cover border-2 border-white shadow-sm" 
              src={trainer.photoUrl} 
              alt={trainer.name}
            />
          </div>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">Disciplina</p>
          <p className="text-sm text-gray-900">{trainer.discipline}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Años Exp.</p>
          <p className="text-sm text-gray-900">{trainer.experienceYears || '---'}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Horario</p>
          <p className="text-sm text-gray-900">{trainer.schedule || 'Flexible'}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Salario</p>
          <p className="text-sm text-gray-900">${trainer.salary}</p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-sm font-medium text-gray-500">Contacto</p>
        <div className="mt-1 flex items-center text-sm text-gray-600">
          <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          <a href={`mailto:${trainer.email}`} className="hover:text-indigo-600">{trainer.email}</a>
        </div>
        <div className="mt-1 flex items-center text-sm text-gray-600">
          <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          <a href={`tel:${trainer.phone}`} className="hover:text-indigo-600">{trainer.phone}</a>
        </div>
      </div>
    </div>
  );
};

export default TrainerCard;