import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import PageTransition from '../components/PageTransition';
import FilterBar from '../components/FilterBar';
import ModelGrid from '../components/ModelGrid';
import { getModels } from '../api/models';

const VideoModelsPage: React.FC = () => {
  const [filters, setFilters] = useState<Record<string, string>>({
    sort: 'popular',
    license: 'all',
  });

  const { data: models, isLoading } = useQuery({
    queryKey: ['videoModels', filters],
    queryFn: () => getModels('video', filters),
  });

  const handleFilterChange = (newFilters: Record<string, string>) => {
    setFilters(newFilters);
  };

  return (
    <PageTransition>
      <FilterBar onFilterChange={handleFilterChange} modelType="Video" />
      <ModelGrid models={models || []} isLoading={isLoading} />
    </PageTransition>
  );
};

export default VideoModelsPage;