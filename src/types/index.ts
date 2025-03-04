export interface Model {
  id: string;
  name: string;
  description: string;
  author: string;
  stars: number;
  downloads: number;
  type: 'text' | 'image' | 'audio' | 'video';
  tasks: string[];
  license: string;
  imageUrl?: string;
  createdAt: string;
}