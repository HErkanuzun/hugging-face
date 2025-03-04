import { User } from '../store/authStore';

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Demo User',
    email: 'demo@example.com',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
    bio: 'AI enthusiast and developer exploring the latest models on Hugging Face.',
    createdAt: '2023-01-15T00:00:00.000Z',
    favorites: ['stable-diffusion-v1-5', 'whisper-large-v2', 'gpt2'],
  },
  {
    id: '2',
    name: 'Test Account',
    email: 'test@example.com',
    createdAt: '2023-03-20T00:00:00.000Z',
  },
];

export const loginUser = async (email: string, password: string): Promise<User> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const user = mockUsers.find(user => user.email === email);
  
  if (!user) {
    throw new Error('Invalid credentials');
  }
  
  // In a real app, we would verify the password here
  // For demo purposes, any password works
  
  return user;
};

export const registerUser = async (name: string, email: string, password: string): Promise<User> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Check if user already exists
  if (mockUsers.some(user => user.email === email)) {
    throw new Error('User already exists');
  }
  
  // Create new user
  const newUser: User = {
    id: `${mockUsers.length + 1}`,
    name,
    email,
    createdAt: new Date().toISOString(),
    favorites: [],
  };
  
  // In a real app, we would save the user to the database
  // For demo purposes, we just return the new user
  
  return newUser;
};

export const updateUserProfile = async (userId: string, userData: Partial<User>): Promise<User> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // Find user
  const userIndex = mockUsers.findIndex(user => user.id === userId);
  
  if (userIndex === -1) {
    throw new Error('User not found');
  }
  
  // Update user data
  const updatedUser = {
    ...mockUsers[userIndex],
    ...userData,
  };
  
  // In a real app, we would update the user in the database
  // For demo purposes, we just return the updated user
  
  return updatedUser;
};