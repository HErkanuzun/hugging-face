import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="text-center">
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-full border-t-2 border-l-2 border-primary animate-spin"></div>
          <div className="w-20 h-20 rounded-full border-r-2 border-b-2 border-secondary animate-spin absolute top-0 left-0" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        </div>
        <motion.p 
          className="text-lg text-white/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Loading AI models...
        </motion.p>
      </div>
    </div>
  );
};

export default LoadingScreen;