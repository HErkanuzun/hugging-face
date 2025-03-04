import { Model } from '../types';
import { getModels } from './models';

export const searchModels = async (query: string): Promise<Model[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Get all models
  const allModels = await getModels();
  
  // If query is empty, return empty array
  if (!query.trim()) {
    return [];
  }
  
  // Filter models by query
  const searchQuery = query.toLowerCase();
  const results = allModels.filter(model => 
    model.name.toLowerCase().includes(searchQuery) ||
    model.description.toLowerCase().includes(searchQuery) ||
    model.author.toLowerCase().includes(searchQuery) ||
    model.tasks.some(task => task.toLowerCase().includes(searchQuery))
  );
  
  return results;
};