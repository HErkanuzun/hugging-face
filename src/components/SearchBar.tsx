import React, { useState, useEffect, useRef } from 'react';
import { X, Search, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSearchStore } from '../store/searchStore';
import { searchModels } from '../api/search';
import { Model } from '../types';

const SearchBar: React.FC = () => {
  const { closeSearch } = useSearchStore();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Model[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    // Add event listener for escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeSearch();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    
    return () => {
      window.addEventListener('keydown', handleEscape);
    };
  }, [closeSearch]);
  
  // Handle search
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.trim()) {
        setIsLoading(true);
        try {
          const searchResults = await searchModels(query);
          setResults(searchResults);
        } catch (error) {
          console.error('Search error:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
      }
    }, 300);
    
    return () => clearTimeout(delayDebounceFn);
  }, [query]);
  
  const handleSearchItemClick = () => {
    closeSearch();
  };
  
  return (
    <div className="fixed inset-0 z-50 glass flex items-start justify-center pt-20 px-4">
      <div className="w-full max-w-3xl relative">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for models, tasks, or authors..."
            className="w-full px-5 py-4 pr-12 rounded-lg bg-white/10 border border-white/20 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-lg"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-2">
            {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
            <button 
              className="text-white/60 hover:text-white"
              onClick={closeSearch}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {results.length > 0 && (
          <div className="search-results mt-2">
            <div className="p-3 border-b border-white/10 text-sm text-white/60">
              {results.length} results found
            </div>
            <div className="max-h-[60vh] overflow-y-auto">
              {results.map((model) => (
                <Link 
                  key={model.id}
                  to={`/model/${model.id}`}
                  className="search-result-item"
                  onClick={handleSearchItemClick}
                >
                  {model.imageUrl ? (
                    <img 
                      src={model.imageUrl} 
                      alt={model.name} 
                      className="w-10 h-10 rounded object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded bg-white/10 flex items-center justify-center">
                      <Search className="w-5 h-5" />
                    </div>
                  )}
                  <div>
                    <h4 className="font-medium">{model.name}</h4>
                    <p className="text-xs text-white/60">{model.author} • {model.type}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
        
        {query && !isLoading && results.length === 0 && (
          <div className="search-results mt-2 p-6 text-center">
            <p className="text-white/60">No results found for "{query}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;