import React from 'react';
import ModelCard from './ModelCard';
import { Model } from '../types';

interface ModelGridProps {
  models: Model[];
  isLoading?: boolean;
}

const ModelGrid: React.FC<ModelGridProps> = ({ models, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="glass-card rounded-xl overflow-hidden h-full animate-pulse">
            <div className="h-40 bg-white/5"></div>
            <div className="p-5">
              <div className="h-6 bg-white/5 rounded mb-2"></div>
              <div className="h-4 bg-white/5 rounded mb-1"></div>
              <div className="h-4 bg-white/5 rounded mb-4 w-2/3"></div>
              <div className="flex justify-between">
                <div className="h-3 bg-white/5 rounded w-1/3"></div>
                <div className="h-3 bg-white/5 rounded w-1/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {models.map((model, index) => (
        <ModelCard key={model.id} model={model} index={index} />
      ))}
    </div>
  );
};

export default ModelGrid;