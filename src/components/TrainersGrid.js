import React, { useState, useEffect } from 'react';
import LocalDB from '../utils/localDB';
import TrainerCard from './TrainerCard';

const TrainersGrid = () => {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    const loadTrainers = async () => {
      const data = await LocalDB.get('trainers');
      setTrainers(data);
    };
    loadTrainers();
  }, []);

  return (
    <div className="space-y-6">
      {trainers.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No hay entrenadores registrados</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainers.map((trainer) => (
            <TrainerCard key={trainer.id} trainer={trainer} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TrainersGrid;

// DONE