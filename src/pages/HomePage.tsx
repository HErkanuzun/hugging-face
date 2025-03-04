import React from 'react';
import { motion } from 'framer-motion';
import { Type, Image, Music, Video, ArrowRight, Github, Terminal } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import CategoryCard from '../components/CategoryCard';

const HomePage: React.FC = () => {
  const categories = [
    {
      title: 'Text',
      description: 'Natural language processing models for translation, summarization, question answering, and more.',
      icon: <Type className="w-6 h-6 text-white" />,
      path: '/text-models',
      count: 12500,
    },
    {
      title: 'Image',
      description: 'Computer vision models for image generation, classification, object detection, and segmentation.',
      icon: <Image className="w-6 h-6 text-white" />,
      path: '/image-models',
      count: 8750,
    },
    {
      title: 'Audio',
      description: 'Speech and audio models for recognition, synthesis, classification, and enhancement.',
      icon: <Music className="w-6 h-6 text-white" />,
      path: '/audio-models',
      count: 4200,
    },
    {
      title: 'Video',
      description: 'Video models for generation, classification, object tracking, and action recognition.',
      icon: <Video className="w-6 h-6 text-white" />,
      path: '/video-models',
      count: 2800,
    },
  ];

  return (
    <PageTransition>
      <section className="mb-16">
        <div className="glass rounded-2xl p-8 md:p-12 relative overflow-hidden glow">
          <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
            <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-primary/30 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-secondary/30 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>
          </div>
          
          <div className="relative z-10 max-w-3xl">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Explore the World of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">AI Models</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-white/80 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Discover, explore, and use state-of-the-art AI models from Hugging Face for text, image, audio, and video applications.
            </motion.p>
            
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <a 
                href="/text-models" 
                className="px-6 py-3 rounded-lg techno-gradient font-medium flex items-center space-x-2 hover:opacity-90 transition-opacity"
              >
                <span>Explore Models</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              
              <a 
                href="/api-test" 
                className="px-6 py-3 rounded-lg bg-white/10 font-medium flex items-center space-x-2 hover:bg-white/15 transition-colors"
              >
                <Terminal className="w-4 h-4" />
                <span>Test API</span>
              </a>
            </motion.div>
          </div>
        </div>
      </section>
      
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Explore by Category</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.title}
              title={category.title}
              description={category.description}
              icon={category.icon}
              path={category.path}
              count={category.count}
              index={index}
            />
          ))}
        </div>
      </section>
      
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Featured Models</h2>
        
        <div className="glass rounded-xl p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card rounded-xl overflow-hidden">
              <div className="h-40 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1682687982501-1e58ab814714?q=80&w=500&auto=format&fit=crop" 
                  alt="Stable Diffusion" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold mb-2">Stable Diffusion v1.5</h3>
                <p className="text-white/70 text-sm mb-4">Text-to-image generation model with amazing capabilities.</p>
                <a href="/model/stable-diffusion-v1-5" className="text-primary text-sm font-medium">
                  View Model →
                </a>
              </div>
            </div>
            
            <div className="glass-card rounded-xl overflow-hidden">
              <div className="h-40 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=500&auto=format&fit=crop" 
                  alt="Whisper" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold mb-2">Whisper Large v2</h3>
                <p className="text-white/70 text-sm mb-4">State-of-the-art speech recognition model by OpenAI.</p>
                <a href="/model/whisper-large-v2" className="text-primary text-sm font-medium">
                  View Model →
                </a>
              </div>
            </div>
            
            <div className="glass-card rounded-xl overflow-hidden">
              <div className="h-40 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1535016120720-40c646be5580?q=80&w=500&auto=format&fit=crop" 
                  alt="Sora" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold mb-2">Sora</h3>
                <p className="text-white/70 text-sm mb-4">Text-to-video model that generates realistic videos from text.</p>
                <a href="/model/sora" className="text-primary text-sm font-medium">
                  View Model →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section>
        <div className="glass rounded-xl p-6 md:p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Explore AI Models?</h2>
          <p className="text-white/70 mb-6 max-w-2xl mx-auto">
            Discover thousands of state-of-the-art AI models for various applications and start building amazing projects today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="/text-models" 
              className="inline-block px-6 py-3 rounded-lg techno-gradient font-medium hover:opacity-90 transition-opacity"
            >
              Browse Models
            </a>
            <a 
              href="/api-test" 
              className="inline-block px-6 py-3 rounded-lg bg-white/10 font-medium hover:bg-white/15 transition-colors"
            >
              Test Models API
            </a>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default HomePage;