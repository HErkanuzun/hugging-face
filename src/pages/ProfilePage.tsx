import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Edit, Star, Calendar, LogOut } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { useAuthStore } from '../store/authStore';
import { useQuery } from '@tanstack/react-query';
import { getModelById } from '../api/models';

const ProfilePage: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  // Fetch favorite models
  const { data: favoriteModels } = useQuery({
    queryKey: ['favoriteModels', user?.favorites],
    queryFn: async () => {
      if (!user?.favorites || user.favorites.length === 0) return [];
      
      const models = await Promise.all(
        user.favorites .map(async (id) => {
          const model = await getModelById(id);
          return model;
        })
      );
      
      return models.filter(Boolean);
    },
    enabled: !!user?.favorites && user.favorites.length > 0,
  });
  
  if (!isAuthenticated || !user) {
    return null; // Will redirect in useEffect
  }
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto">
        <div className="glass rounded-xl overflow-hidden mb-8">
          <div className="h-40 bg-gradient-to-r from-primary/30 to-secondary/30"></div>
          
          <div className="p-6 md:p-8 relative">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-4 -mt-16 md:-mt-20 mb-6">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden border-4 border-background">
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-3xl font-bold">
                    {user.name.charAt(0)}
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold">{user.name}</h1>
                <p className="text-white/70">{user.email}</p>
              </div>
              
              <div className="flex gap-2 mt-4 md:mt-0">
                <Link 
                  to="/profile/edit" 
                  className="btn-secondary flex items-center space-x-2"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit Profile</span>
                </Link>
                
                <button 
                  onClick={() => logout()}
                  className="btn-secondary flex items-center space-x-2 text-red-400"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="glass-card rounded-lg p-4 flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-white/70">Joined</p>
                  <p className="font-medium">{formatDate(user.createdAt)}</p>
                </div>
              </div>
              
              <div className="glass-card rounded-lg p-4 flex items-center space-x-3">
                <Star className="w-5 h-5 text-yellow-400" />
                <div>
                  <p className="text-sm text-white/70">Favorite Models</p>
                  <p className="font-medium">{user.favorites?.length || 0}</p>
                </div>
              </div>
            </div>
            
            {user.bio && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">About</h2>
                <p className="text-white/80">{user.bio}</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="glass rounded-xl p-6 md:p-8">
          <h2 className="text-xl font-bold mb-6">Favorite Models</h2>
          
          {!favoriteModels || favoriteModels.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-white/70 mb-4">You haven't added any favorite models yet.</p>
              <Link to="/" className="btn-primary inline-flex">
                Explore Models
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteModels.map((model, index) => (
                <motion.div
                  key={model.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link to={`/model/${model.id}`} className="block">
                    <div className="glass-card rounded-xl overflow-hidden h-full">
                      {model.imageUrl && (
                        <div className="h-32 overflow-hidden">
                          <img 
                            src={model.imageUrl} 
                            alt={model.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      
                      <div className="p-4">
                        <h3 className="font-semibold mb-1">{model.name}</h3>
                        <p className="text-sm text-white/70 line-clamp-2 mb-2">{model.description}</p>
                        <div className="text-xs text-white/60">
                          {model.author} • {model.type}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default ProfilePage;