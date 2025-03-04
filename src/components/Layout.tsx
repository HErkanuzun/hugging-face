import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, Home, Type, Image, Music, Video, 
  Github, Search, Moon, Sun, HelpCircle, User, LogOut, Terminal
} from 'lucide-react';
import SearchBar from './SearchBar';
import { useThemeStore } from '../store/themeStore';
import { useAuthStore } from '../store/authStore';
import { useSearchStore } from '../store/searchStore';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { isAuthenticated, user, logout } = useAuthStore();
  const { isSearchOpen, toggleSearch } = useSearchStore();
  const location = useLocation();

  // Apply theme class to root element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
    }
  }, [isDarkMode]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    toggleMobileMenu();
  };

  const navLinks = [
    { path: '/', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { path: '/text-models', label: 'Text', icon: <Type className="w-5 h-5" /> },
    { path: '/image-models', label: 'Image', icon: <Image className="w-5 h-5" /> },
    { path: '/audio-models', label: 'Audio', icon: <Music className="w-5 h-5" /> },
    { path: '/video-models', label: 'Video', icon: <Video className="w-5 h-5" /> },
    { path: '/api-test', label: 'API Test', icon: <Terminal className="w-5 h-5" /> },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen grid-pattern">
      {/* Background gradient effects */}
      <div className="fixed top-0 left-0 w-1/3 h-1/3 bg-primary/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-1/3 h-1/3 bg-secondary/20 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
      
      {/* Header */}
      <header className="glass fixed top-0 left-0 right-0 z-50 border-b border-white/10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg techno-gradient flex items-center justify-center">
              <Github className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight hidden sm:block">HuggingFace Explorer</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg flex items-center space-x-1 transition-all ${
                  isActive(link.path)
                    ? 'bg-white/10 text-white'
                    : 'hover:bg-white/5 text-white/70 hover:text-white'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              className="p-2 rounded-lg hover:bg-white/5"
              onClick={toggleSearch}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button 
              className="p-2 rounded-lg hover:bg-white/5"
              onClick={toggleTheme}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            {isAuthenticated ? (
              <Link 
                to="/profile" 
                className="p-2 rounded-lg hover:bg-white/5 relative group"
              >
                {user?.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-6 h-6 rounded-full"
                  />
                ) : (
                  <User className="w-5 h-5" />
                )}
                <div className="absolute right-0 top-full mt-2 w-48 glass rounded-lg overflow-hidden hidden group-hover:block">
                  <div className="p-3 border-b border-white/10">
                    <p className="font-medium">{user?.name}</p>
                    <p className="text-xs text-white/60">{user?.email}</p>
                  </div>
                  <Link 
                    to="/profile" 
                    className="block p-3 hover:bg-white/10 transition-colors"
                  >
                    Profile
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left p-3 hover:bg-white/10 transition-colors flex items-center space-x-2 text-red-400"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </Link>
            ) : (
              <Link 
                to="/login" 
                className="p-2 rounded-lg hover:bg-white/5"
              >
                <User className="w-5 h-5" />
              </Link>
            )}
            
            <button 
              className="p-2 rounded-lg hover:bg-white/5 md:hidden"
              onClick={toggleMobileMenu}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>
      
      {/* Search overlay */}
      {isSearchOpen && (
        <SearchBar />
      )}
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 glass">
          <div className="container mx-auto px-4 py-6">
            <div className="flex justify-end mb-8">
              <button 
                className="p-2 rounded-lg hover:bg-white/10"
                onClick={toggleMobileMenu}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-3 rounded-lg flex items-center space-x-3 ${
                    isActive(link.path)
                      ? 'bg-white/10 text-white'
                      : 'text-white/70'
                  }`}
                  onClick={toggleMobileMenu}
                >
                  {link.icon}
                  <span className="text-lg">{link.label}</span>
                </Link>
              ))}
              
              <div className="border-t border-white/10 my-2 pt-2"></div>
              
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="px-4 py-3 rounded-lg flex items-center space-x-3 text-white/70"
                    onClick={toggleMobileMenu}
                  >
                    <User className="w-5 h-5" />
                    <span className="text-lg">Profile</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-3 rounded-lg flex items-center space-x-3 text-red-400 w-full text-left"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="text-lg">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-3 rounded-lg flex items-center space-x-3 text-white/70"
                    onClick={toggleMobileMenu}
                  >
                    <User className="w-5 h-5" />
                    <span className="text-lg">Login</span>
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-3 rounded-lg flex items-center space-x-3 text-white/70"
                    onClick={toggleMobileMenu}
                  >
                    <User className="w-5 h-5" />
                    <span className="text-lg">Register</span>
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
      
      {/* Main content */}
      <main className="container mx-auto px-4 pt-24 pb-20">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="glass border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-white/60">
                © 2025 HuggingFace Explorer. All rights reserved.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-white/60 hover:text-white">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-white">
                <HelpCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;