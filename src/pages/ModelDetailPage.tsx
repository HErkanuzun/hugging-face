import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Star, Download, Clock, User, 
  FileCode, Shield, ExternalLink, Copy, Check, Heart, Terminal
} from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { getModelById } from '../api/models';
import { useAuthStore } from '../store/authStore';

const ModelDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [copied, setCopied] = useState(false);
  const { user, updateUser, isAuthenticated } = useAuthStore();
  const [isFavorite, setIsFavorite] = useState(false);
  
  const { data: model, isLoading } = useQuery({
    queryKey: ['model', id],
    queryFn: () => getModelById(id || ''),
  });

  // Check if model is in favorites
  useEffect(() => {
    if (user?.favorites && id) {
      setIsFavorite(user.favorites.includes(id));
    }
  }, [user, id]);

  const handleCopyCode = () => {
    if (model) {
      navigator.clipboard.writeText(`from transformers import AutoModel\n\nmodel = AutoModel.from_pretrained("${model.id}")`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const toggleFavorite = () => {
    if (!isAuthenticated || !user || !id) return;
    
    let newFavorites: string[] = [...(user.favorites || [])];
    
    if (isFavorite) {
      // Remove from favorites
      newFavorites = newFavorites.filter(modelId => modelId !== id);
    } else {
      // Add to favorites
      newFavorites.push(id);
    }
    
    // Update user
    updateUser({ favorites: newFavorites });
    setIsFavorite(!isFavorite);
  };

  if (isLoading) {
    return (
      <PageTransition>
        <div className="glass rounded-xl p-6 animate-pulse">
          <div className="h-8 bg-white/5 rounded w-1/3 mb-4"></div>
          <div className="h-60 bg-white/5 rounded mb-6"></div>
          <div className="h-4 bg-white/5 rounded mb-2"></div>
          <div className="h-4 bg-white/5 rounded mb-2"></div>
          <div className="h-4 bg-white
    )
  }
}