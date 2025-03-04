import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Download, Users } from 'lucide-react';
import { Model } from '../types';

interface ModelCardProps {
  model: Model;
  index: number;
}

const ModelCard: React.FC<ModelCardProps> = ({ model, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link to={`/model/${model.id}`} className="block">
        <div className="glass-card rounded-xl overflow-hidden h-full">
          {model.imageUrl && (
            <div className="h-40 overflow-hidden">
              <img 
                src={model.imageUrl} 
                alt={model.name} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
          )}
          
          <div className="p-5">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-semibold line-clamp-1">{model.name}</h3>
              <div className="flex items-center space-x-1 text-yellow-400">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm">{model.stars}</span>
              </div>
            </div>
            
            <p className="text-white/70 text-sm mb-4 line-clamp-2">{model.description}</p>
            
            <div className="flex items-center justify-between text-xs text-white/60">
              <div className="flex items-center space-x-1">
                <Users className="w-3 h-3" />
                <span>{model.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Download className="w-3 h-3" />
                <span>{model.downloads.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ModelCard;