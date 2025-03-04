import axios from 'axios';

// Base URL for Hugging Face Inference API
const API_URL = 'https://api-inference.huggingface.co/models';

// Create a function to make API calls to Hugging Face
export const callHuggingFaceAPI = async (
  modelId: string, 
  inputs: any, 
  apiKey?: string,
  options?: Record<string, any>
): Promise<any> => {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    // Add API key if provided
    if (apiKey) {
      headers['Authorization'] = `Bearer ${apiKey}`;
    }
    
    const response = await axios.post(
      `${API_URL}/${modelId}`, 
      { inputs, options }, 
      { headers }
    );
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`API Error: ${error.response.status} - ${error.response.data.error || 'Unknown error'}`);
    }
    throw error;
  }
};

// Sample API calls for different model types
export const generateText = async (
  modelId: string, 
  prompt: string, 
  apiKey?: string,
  options?: Record<string, any>
): Promise<any> => {
  return callHuggingFaceAPI(modelId, prompt, apiKey, options);
};

export const generateImage = async (
  modelId: string, 
  prompt: string, 
  apiKey?: string,
  options?: Record<string, any>
): Promise<any> => {
  const response = await callHuggingFaceAPI(modelId, prompt, apiKey, options);
  
  // For image generation models, the response is usually a binary blob
  // Convert it to a base64 string if needed
  if (response instanceof Blob) {
    return URL.createObjectURL(response);
  }
  
  return response;
};

export const transcribeAudio = async (
  modelId: string, 
  audioUrl: string, 
  apiKey?: string,
  options?: Record<string, any>
): Promise<any> => {
  return callHuggingFaceAPI(modelId, audioUrl, apiKey, options);
};

export const processVideo = async (
  modelId: string, 
  videoUrl: string, 
  apiKey?: string,
  options?: Record<string, any>
): Promise<any> => {
  return callHuggingFaceAPI(modelId, videoUrl, apiKey, options);
};

// Get sample inputs for different model types
export const getSampleInput = (modelType: string, task: string): any => {
  switch (modelType) {
    case 'text':
      switch (task) {
        case 'text-generation':
          return "Once upon a time in a land far away";
        case 'translation':
          return "Hello, how are you?";
        case 'summarization':
          return "The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. It is named after the engineer Gustave Eiffel, whose company designed and built the tower. Locally nicknamed 'La dame de fer', it was constructed from 1887 to 1889 as the entrance to the 1889 World's Fair.";
        case 'fill-mask':
          return "Paris is the <mask> of France.";
        case 'question-answering':
          return { question: "What is the capital of France?", context: "France is a country in Western Europe. Its capital is Paris." };
        default:
          return "Sample text input for testing";
      }
    
    case 'image':
      switch (task) {
        case 'image-generation':
          return "A beautiful sunset over mountains with a lake in the foreground";
        case 'image-to-image':
          return "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=500&auto=format&fit=crop";
        case 'image-classification':
          return "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=500&auto=format&fit=crop";
        case 'object-detection':
          return "https://images.unsplash.com/photo-1517331156700-3c241d2b4d83?q=80&w=500&auto=format&fit=crop";
        default:
          return "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=500&auto=format&fit=crop";
      }
    
    case 'audio':
      switch (task) {
        case 'speech-recognition':
          return "https://huggingface.co/datasets/Narsil/asr_dummy/resolve/main/1.flac";
        case 'text-to-speech':
          return "Hello, this is a test of the text to speech system.";
        case 'audio-classification':
          return "https://huggingface.co/datasets/Narsil/asr_dummy/resolve/main/1.flac";
        default:
          return "https://huggingface.co/datasets/Narsil/asr_dummy/resolve/main/1.flac";
      }
    
    case 'video':
      switch (task) {
        case 'video-generation':
          return "A cat playing with a ball of yarn";
        case 'video-classification':
          return "https://huggingface.co/datasets/sayakpaul/sample-datasets/resolve/main/sample_video.mp4";
        case 'object-tracking':
          return "https://huggingface.co/datasets/sayakpaul/sample-datasets/resolve/main/sample_video.mp4";
        default:
          return "https://huggingface.co/datasets/sayakpaul/sample-datasets/resolve/main/sample_video.mp4";
      }
    
    default:
      return "Sample input for testing";
  }
};