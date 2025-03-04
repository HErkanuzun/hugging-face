import axios from 'axios';
import { Model } from '../types';

// This is a mock API service that would normally fetch from Hugging Face API
// In a real application, you would use the actual Hugging Face API endpoints

// Mock data for demonstration
const mockModels: Model[] = [
  // Text models
  {
    id: 'gpt2',
    name: 'GPT-2',
    description: 'GPT-2 is a large transformer-based language model with 1.5 billion parameters, trained on a dataset of 8 million web pages.',
    author: 'OpenAI',
    stars: 9823,
    downloads: 1250000,
    type: 'text',
    tasks: ['text-generation'],
    license: 'open',
    imageUrl: 'https://images.unsplash.com/photo-1655720828018-edd2daec9349?q=80&w=500&auto=format&fit=crop',
    createdAt: '2019-02-14T00:00:00.000Z',
  },
  {
    id: 'bert-base-uncased',
    name: 'BERT Base Uncased',
    description: 'BERT base model uncased. Pretrained model on English language using a masked language modeling objective.',
    author: 'Google',
    stars: 8456,
    downloads: 980000,
    type: 'text',
    tasks: ['fill-mask', 'text-classification'],
    license: 'open',
    imageUrl: 'https://images.unsplash.com/photo-1677442135136-760c813028c0?q=80&w=500&auto=format&fit=crop',
    createdAt: '2018-10-11T00:00:00.000Z',
  },
  {
    id: 't5-base',
    name: 'T5 Base',
    description: 'T5 (Text-to-Text Transfer Transformer) base model. Pretrained on C4 with span-based masking.',
    author: 'Google',
    stars: 5234,
    downloads: 750000,
    type: 'text',
    tasks: ['translation', 'summarization'],
    license: 'open',
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=500&auto=format&fit=crop',
    createdAt: '2019-10-23T00:00:00.000Z',
  },
  {
    id: 'roberta-base',
    name: 'RoBERTa Base',
    description: 'RoBERTa: A Robustly Optimized BERT Pretraining Approach. Pretrained model on English language using a masked language modeling objective.',
    author: 'Facebook AI',
    stars: 4567,
    downloads: 620000,
    type: 'text',
    tasks: ['fill-mask', 'text-classification'],
    license: 'open',
    imageUrl: 'https://images.unsplash.com/photo-1655635643532-fa9ba2648cbe?q=80&w=500&auto=format&fit=crop',
    createdAt: '2019-07-26T00:00:00.000Z',
  },
  
  // Image models
  {
    id: 'stable-diffusion-v1-5',
    name: 'Stable Diffusion v1.5',
    description: 'Stable Diffusion is a latent text-to-image diffusion model capable of generating photo-realistic images given any text input.',
    author: 'Stability AI',
    stars: 12456,
    downloads: 2300000,
    type: 'image',
    tasks: ['image-generation'],
    license: 'open',
    imageUrl: 'https://images.unsplash.com/photo-1682687982501-1e58ab814714?q=80&w=500&auto=format&fit=crop',
    createdAt: '2022-08-22T00:00:00.000Z',
  },
  {
    id: 'vit-base-patch16-224',
    name: 'ViT Base Patch16 224',
    description: 'Vision Transformer (ViT) model pre-trained on ImageNet-21k at resolution 224x224, and fine-tuned on ImageNet 2012.',
    author: 'Google',
    stars: 5678,
    downloads: 890000,
    type: 'image',
    tasks: ['image-classification'],
    license: 'open',
    imageUrl: 'https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=500&auto=format&fit=crop',
    createdAt: '2020-10-01T00:00:00.000Z',
  },
  {
    id: 'yolov5',
    name: 'YOLOv5',
    description: 'YOLOv5 is a family of object detection architectures and models pretrained on the COCO dataset.',
    author: 'Ultralytics',
    stars: 7890,
    downloads: 1100000,
    type: 'image',
    tasks: ['object-detection'],
    license: 'open',
    imageUrl: 'https://images.unsplash.com/photo-1625014618427-fbc980b974f5?q=80&w=500&auto=format&fit=crop',
    createdAt: '2020-06-09T00:00:00.000Z',
  },
  {
    id: 'controlnet',
    name: 'ControlNet',
    description: 'ControlNet is a neural network structure to control diffusion models by adding extra conditions.',
    author: 'Stability AI',
    stars: 6543,
    downloads: 950000,
    type: 'image',
    tasks: ['image-to-image'],
    license: 'open',
    imageUrl: 'https://images.unsplash.com/photo-1684779847639-fbcc5a57dfe9?q=80&w=500&auto=format&fit=crop',
    createdAt: '2023-02-08T00:00:00.000Z',
  },
  
  // Audio models
  {
    id: 'whisper-large-v2',
    name: 'Whisper Large v2',
    description: 'Whisper is a general-purpose speech recognition model that can transcribe speech and translate from multiple languages into English.',
    author: 'OpenAI',
    stars: 8765,
    downloads: 1400000,
    type: 'audio',
    tasks: ['speech-recognition'],
    license: 'open',
    imageUrl: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=500&auto=format&fit=crop',
    createdAt: '2022-09-21T00:00:00.000Z',
  },
  {
    id: 'wav2vec2-base',
    name: 'Wav2Vec2 Base',
    description: 'Wav2Vec2 is a speech model that is trained using contrastive self-supervised learning, then fine-tuned on transcribed speech.',
    author: 'Facebook AI',
    stars: 4321,
    downloads: 780000,
    type: 'audio',
    tasks: ['speech-recognition'],
    license: 'open',
    imageUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=500&auto=format&fit=crop',
    createdAt: '2020-06-16T00:00:00.000Z',
  },
  {
    id: 'musicgen',
    name: 'MusicGen',
    description: 'MusicGen is a simple and controllable music generation model that can generate music from text descriptions.',
    author: 'Meta AI',
    stars: 5432,
    downloads: 850000,
    type: 'audio',
    tasks: ['text-to-audio'],
    license: 'research',
    imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=500&auto=format&fit=crop',
    createdAt: '2023-06-09T00:00:00.000Z',
  },
  {
    id: 'bark',
    name: 'Bark',
    description: 'Bark is a transformer-based text-to-audio model that can generate highly realistic, multilingual speech as well as other audio.',
    author: 'Suno AI',
    stars: 6789,
    downloads: 920000,
    type: 'audio',
    tasks: ['text-to-speech'],
    license: 'research',
    imageUrl: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?q=80&w=500&auto=format&fit=crop',
    createdAt: '2023-04-20T00:00:00.000Z',
  },
  
  // Video models
  {
    id: 'sora',
    name: 'Sora',
    description: 'Sora is a text-to-video model that can generate realistic and imaginative scenes from text instructions.',
    author: 'OpenAI',
    stars: 9876,
    downloads: 1500000,
    type: 'video',
    tasks: ['video-generation'],
    license: 'commercial',
    imageUrl: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?q=80&w=500&auto=format&fit=crop',
    createdAt: '2024-02-15T00:00:00.000Z',
  },
  {
    id: 'videomae',
    name: 'VideoMAE',
    description: 'VideoMAE is a masked autoencoder for self-supervised learning on videos, inspired by the success of MAE for images.',
    author: 'Meta AI',
    stars: 3456,
    downloads: 580000,
    type: 'video',
    tasks: ['video-classification'],
    license: 'open',
    imageUrl: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=500&auto=format&fit=crop',
    createdAt: '2022-05-30T00:00:00.000Z',
  },
  {
    id: 'gen-2',
    name: 'Gen-2',
    description: 'Gen-2 is a text-to-video and image-to-video model that can generate high-quality videos from text or image prompts.',
    author: 'Runway',
    stars: 7654,
    downloads: 1050000,
    type: 'video',
    tasks: ['video-generation', 'image-to-video'],
    license: 'commercial',
    imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=500&auto=format&fit=crop',
    createdAt: '2023-03-20T00:00:00.000Z',
  },
  {
    id: 'detr-resnet-50',
    name: 'DETR ResNet-50',
    description: 'DETR (DEtection TRansformer) with a ResNet-50 backbone for object detection and tracking in videos.',
    author: 'Facebook AI',
    stars: 4567,
    downloads: 670000,
    type: 'video',
    tasks: ['object-detection', 'object-tracking'],
    license: 'open',
    imageUrl: 'https://images.unsplash.com/photo-1579403124614-197f69d8187b?q=80&w=500&auto=format&fit=crop',
    createdAt: '2020-05-26T00:00:00.000Z',
  },
];

export const getModels = async (type?: string, filters?: Record<string, string>): Promise<Model[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  let filteredModels = [...mockModels];
  
  // Filter by type if specified
  if (type) {
    filteredModels = filteredModels.filter(model => model.type === type.toLowerCase());
  }
  
  // Apply additional filters
  if (filters) {
    if (filters.license && filters.license !== 'all') {
      filteredModels = filteredModels.filter(model => model.license === filters.license);
    }
    
    if (filters.task) {
      filteredModels = filteredModels.filter(model => model.tasks.includes(filters.task));
    }
    
    // Sort models
    if (filters.sort === 'popular') {
      filteredModels.sort((a, b) => b.stars - a.stars);
    } else if (filters.sort === 'recent') {
      filteredModels.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (filters.sort === 'downloads') {
      filteredModels.sort((a, b) => b.downloads - a.downloads);
    }
  }
  
  return filteredModels;
};

export const getModelById = async (id: string): Promise<Model | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const model = mockModels.find(model => model.id === id);
  return model || null;
};