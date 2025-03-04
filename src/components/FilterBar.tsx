import React, { useState } from 'react';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';

interface FilterBarProps {
  onFilterChange: (filters: Record<string, string>) => void;
  modelType: string;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange, modelType }) => {
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({
    sort: 'popular',
    license: 'all',
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...activeFilters, [key]: value };
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h2 className="text-2xl font-bold mb-2 sm:mb-0">{modelType} Models</h2>
        
        <button 
          className="flex items-center space-x-2 px-3 py-2 rounded-lg glass-card sm:hidden"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filters</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>
      
      <div className={`glass rounded-xl p-4 ${isFilterOpen ? 'block' : 'hidden sm:block'}`}>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
          <div>
            <label className="block text-sm text-white/70 mb-2">Sort By</label>
            <select 
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 w-full sm:w-auto"
              value={activeFilters.sort}
              onChange={(e) => handleFilterChange('sort', e.target.value)}
            >
              <option value="popular">Most Popular</option>
              <option value="recent">Recently Added</option>
              <option value="downloads">Most Downloads</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm text-white/70 mb-2">License</label>
            <select 
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 w-full sm:w-auto"
              value={activeFilters.license}
              onChange={(e) => handleFilterChange('license', e.target.value)}
            >
              <option value="all">All Licenses</option>
              <option value="open">Open Source</option>
              <option value="commercial">Commercial</option>
              <option value="research">Research Only</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm text-white/70 mb-2">Task</label>
            <select 
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 w-full sm:w-auto"
              defaultValue=""
              onChange={(e) => handleFilterChange('task', e.target.value)}
            >
              <option value="">All Tasks</option>
              {modelType === 'Text' && (
                <>
                  <option value="translation">Translation</option>
                  <option value="summarization">Summarization</option>
                  <option value="question-answering">Question Answering</option>
                  <option value="text-generation">Text Generation</option>
                </>
              )}
              {modelType === 'Image' && (
                <>
                  <option value="image-classification">Image Classification</option>
                  <option value="object-detection">Object Detection</option>
                  <option value="image-generation">Image Generation</option>
                  <option value="image-to-image">Image-to-Image</option>
                </>
              )}
              {modelType === 'Audio' && (
                <>
                  <option value="speech-recognition">Speech Recognition</option>
                  <option value="text-to-speech">Text to Speech</option>
                  <option value="audio-classification">Audio Classification</option>
                </>
              )}
              {modelType === 'Video' && (
                <>
                  <option value="video-classification">Video Classification</option>
                  <option value="video-generation">Video Generation</option>
                  <option value="object-tracking">Object Tracking</option>
                </>
              )}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;