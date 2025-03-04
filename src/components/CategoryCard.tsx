import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface CategoryCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  count: number;
  index: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ 
  title, description, icon, path, count, index 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Link to={path} className="block h-full">
        <div className="glass-card rounded-xl p-6 h-full techno-border">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-lg techno-gradient flex items-center justify-center mr-4">
              {icon}
            </div>
            <div>
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="text-sm text-white/60">{count.toLocaleString()} models</p>
            </div>
          </div>
          
          <p className="text-white/70 mb-4">{description}</p>
          
          <div className="text-sm font-medium text-primary">
            Explore {title} Models →
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;