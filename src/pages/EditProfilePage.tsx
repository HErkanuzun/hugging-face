import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { updateUserProfile } from '../api/auth';
import { useAuthStore } from '../store/authStore';

interface ProfileFormData {
  name: string;
  email: string;
  bio: string;
  avatar: string;
}

const EditProfilePage: React.FC = () => {
  const { user, isAuthenticated, updateUser } = useAuthStore();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProfileFormData>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  // Set form default values
  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        bio: user.bio || '',
        avatar: user.avatar || '',
      });
    }
  }, [user, reset]);
  
  const onSubmit = async (data: ProfileFormData) => {
    if (!user) return;
    
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const updatedUser = await updateUserProfile(user.id, data);
      updateUser(updatedUser);
      setSuccess('Profile updated successfully!');
      
      // Redirect after a short delay
      setTimeout(() => {
        navigate('/profile');
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!isAuthenticated || !user) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <PageTransition>
      <div className="max-w-2xl mx-auto">
        <button 
          onClick={() => navigate('/profile')}
          className="flex items-center space-x-2 text-white/70 hover:text-white mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Profile</span>
        </button>
        
        <div className="glass rounded-xl p-6 md:p-8">
          <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
          
          {error && (
            <motion.div 
              className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mb-6 flex items-center space-x-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle className="w-5 h-5 text-red-500" />
              <p className="text-sm">{error}</p>
            </motion.div>
          )}
          
          {success && (
            <motion.div 
              className="bg-green-500/20 border border-green-500/50 rounded-lg p-3 mb-6 flex items-center space-x-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle className="w-5 h-5 text-green-500" />
              <p className="text-sm">{success}</p>
            </motion.div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input
                id="name"
                type="text"
                className={`form-input ${errors.name ? 'border-red-500' : ''}`}
                {...register('name', { 
                  required: 'Name is required',
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters',
                  }
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                id="email"
                type="email"
                className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                disabled
                {...register('email')}
              />
              <p className="text-xs text-white/60 mt-1">Email cannot be changed</p>
            </div>
            
            <div className="mb-4">
              <label htmlFor="avatar" className="form-label">Avatar URL</label>
              <input
                id="avatar"
                type="text"
                className={`form-input ${errors.avatar ? 'border-red-500' : ''}`}
                placeholder="https://example.com/avatar.jpg"
                {...register('avatar')}
              />
              {errors.avatar && (
                <p className="text-red-500 text-xs mt-1">{errors.avatar.message}</p>
              )}
              <p className="text-xs text-white/60 mt-1">Enter a URL to an image (leave empty for default)</p>
            </div>
            
            <div className="mb-6">
              <label htmlFor="bio" className="form-label">Bio</label>
              <textarea
                id="bio"
                rows={4}
                className={`form-input ${errors.bio ? 'border-red-500' : ''}`}
                placeholder="Tell us about yourself..."
                {...register('bio')}
              ></textarea>
              {errors.bio && (
                <p className="text-red-500 text-xs mt-1">{errors.bio.message}</p>
              )}
            </div>
            
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => navigate('/profile')}
                disabled={isLoading}
              >
                Cancel
              </button>
              
              <button
                type="submit"
                className="btn-primary flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </PageTransition>
  );
};

export default EditProfilePage;