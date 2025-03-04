import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { 
  Loader2, AlertCircle, Copy, Check, Play, 
  Key, RefreshCw, Download, Code, ChevronDown, ChevronUp
} from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { 
  callHuggingFaceAPI, 
  getSampleInput 
} from '../api/huggingface';
import { useAuthStore } from '../store/authStore';

interface ApiTestForm {
  modelId: string;
  apiKey: string;
  input: string;
  options: string;
}

const ApiTestPage: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ApiTestForm>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [selectedModelType, setSelectedModelType] = useState('text');
  const [selectedTask, setSelectedTask] = useState('text-generation');
  const [showOptions, setShowOptions] = useState(false);
  const [resultType, setResultType] = useState<'json' | 'image' | 'audio' | 'video'>('json');
  
  const watchModelId = watch('modelId');
  const watchInput = watch('input');
  
  // Set default values
  useEffect(() => {
    setValue('modelId', getDefaultModelId());
    setValue('input', getSampleInput(selectedModelType, selectedTask));
    setValue('options', '{\n  "temperature": 0.7,\n  "max_length": 100\n}');
  }, [setValue, selectedModelType, selectedTask]);
  
  const getDefaultModelId = () => {
    switch (selectedModelType) {
      case 'text':
        switch (selectedTask) {
          case 'text-generation':
            return 'gpt2';
          case 'translation':
            return 'Helsinki-NLP/opus-mt-en-fr';
          case 'summarization':
            return 'facebook/bart-large-cnn';
          case 'fill-mask':
            return 'bert-base-uncased';
          case 'question-answering':
            return 'deepset/roberta-base-squad2';
          default:
            return 'gpt2';
        }
      case 'image':
        switch (selectedTask) {
          case 'image-generation':
            return 'stabilityai/stable-diffusion-2';
          case 'image-classification':
            return 'google/vit-base-patch16-224';
          case 'object-detection':
            return 'facebook/detr-resnet-50';
          default:
            return 'stabilityai/stable-diffusion-2';
        }
      case 'audio':
        switch (selectedTask) {
          case 'speech-recognition':
            return 'openai/whisper-large-v2';
          case 'text-to-speech':
            return 'espnet/kan-bayashi_ljspeech_vits';
          case 'audio-classification':
            return 'superb/hubert-large-superb-er';
          default:
            return 'openai/whisper-large-v2';
        }
      case 'video':
        switch (selectedTask) {
          case 'video-classification':
            return 'MCG-NJU/videomae-base';
          default:
            return 'MCG-NJU/videomae-base';
        }
      default:
        return 'gpt2';
    }
  };
  
  const handleModelTypeChange = (type: string) => {
    setSelectedModelType(type);
    setSelectedTask(getDefaultTask(type));
    setValue('modelId', getDefaultModelId());
    setValue('input', getSampleInput(type, getDefaultTask(type)));
    setResultType(getResultType(type));
    setResult(null);
  };
  
  const getDefaultTask = (modelType: string) => {
    switch (modelType) {
      case 'text':
        return 'text-generation';
      case 'image':
        return 'image-generation';
      case 'audio':
        return 'speech-recognition';
      case 'video':
        return 'video-classification';
      default:
        return 'text-generation';
    }
  };
  
  const getResultType = (modelType: string): 'json' | 'image' | 'audio' | 'video' => {
    switch (modelType) {
      case 'image':
        return 'image';
      case 'audio':
        return 'audio';
      case 'video':
        return 'video';
      default:
        return 'json';
    }
  };
  
  const handleTaskChange = (task: string) => {
    setSelectedTask(task);
    setValue('modelId', getDefaultModelId());
    setValue('input', getSampleInput(selectedModelType, task));
    setResult(null);
  };
  
  const onSubmit = async (data: ApiTestForm) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    
    try {
      let parsedInput = data.input;
      let parsedOptions = {};
      
      // Parse JSON input if needed
      if (typeof data.input === 'string' && data.input.trim().startsWith('{')) {
        try {
          parsedInput = JSON.parse(data.input);
        } catch (e) {
          // If parsing fails, use the string as is
        }
      }
      
      // Parse options
      if (data.options) {
        try {
          parsedOptions = JSON.parse(data.options);
        } catch (e) {
          setError('Invalid options JSON format');
          setIsLoading(false);
          return;
        }
      }
      
      const response = await callHuggingFaceAPI(
        data.modelId,
        parsedInput,
        data.apiKey || undefined,
        Object.keys(parsedOptions).length > 0 ? parsedOptions : undefined
      );
      
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'API call failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCopyCode = () => {
    const code = `
import axios from 'axios';

const API_URL = 'https://api-inference.huggingface.co/models';

async function callHuggingFaceAPI() {
  const response = await axios.post(
    '${API_URL}/${watchModelId}',
    {
      inputs: ${typeof watchInput === 'string' && watchInput.trim().startsWith('{') 
        ? watchInput 
        : JSON.stringify(watchInput)},
      options: ${showOptions ? watch('options') : '{}'}
    },
    {
      headers: {
        'Content-Type': 'application/json',
        ${watch('apiKey') ? `'Authorization': 'Bearer ${watch('apiKey')}'` : ''}
      }
    }
  );
  
  return response.data;
}

// Call the function
callHuggingFaceAPI()
  .then(result => console.log(result))
  .catch(error => console.error(error));
`;
    
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const renderModelTypeButtons = () => {
    const modelTypes = [
      { id: 'text', label: 'Text' },
      { id: 'image', label: 'Image' },
      { id: 'audio', label: 'Audio' },
      { id: 'video', label: 'Video' },
    ];
    
    return (
      <div className="flex flex-wrap gap-2 mb-6">
        {modelTypes.map((type) => (
          <button
            key={type.id}
            type="button"
            className={`px-4 py-2 rounded-lg ${
              selectedModelType === type.id
                ? 'techno-gradient font-medium'
                : 'bg-white/10 hover:bg-white/15'
            } transition-colors`}
            onClick={() => handleModelTypeChange(type.id)}
          >
            {type.label}
          </button>
        ))}
      </div>
    );
  };
  
  const renderTaskButtons = () => {
    let tasks: { id: string; label: string }[] = [];
    
    switch (selectedModelType) {
      case 'text':
        tasks = [
          { id: 'text-generation', label: 'Text Generation' },
          { id: 'translation', label: 'Translation' },
          { id: 'summarization', label: 'Summarization' },
          { id: 'fill-mask', label: 'Fill Mask' },
          { id: 'question-answering', label: 'Question Answering' },
        ];
        break;
      case 'image':
        tasks = [
          { id: 'image-generation', label: 'Image Generation' },
          { id: 'image-classification', label: 'Image Classification' },
          { id: 'object-detection', label: 'Object Detection' },
          { id: 'image-to-image', label: 'Image to Image' },
        ];
        break;
      case 'audio':
        tasks = [
          { id: 'speech-recognition', label: 'Speech Recognition' },
          { id: 'text-to-speech', label: 'Text to Speech' },
          { id: 'audio-classification', label: 'Audio Classification' },
        ];
        break;
      case 'video':
        tasks = [
          { id: 'video-classification', label: 'Video Classification' },
          { id: 'video-generation', label: 'Video Generation' },
          { id: 'object-tracking', label: 'Object Tracking' },
        ];
        break;
    }
    
    return (
      <div className="flex flex-wrap gap-2 mb-6">
        {tasks.map((task) => (
          <button
            key={task.id}
            type="button"
            className={`px-3 py-1.5 rounded-lg text-sm ${
              selectedTask === task.id
                ? 'bg-white/20 font-medium'
                : 'bg-white/5 hover:bg-white/10'
            } transition-colors`}
            onClick={() => handleTaskChange(task.id)}
          >
            {task.label}
          </button>
        ))}
      </div>
    );
  };
  
  const renderResult = () => {
    if (!result) return null;
    
    switch (resultType) {
      case 'image':
        // Handle different image response formats
        if (typeof result === 'string' && (result.startsWith('data:image') || result.startsWith('blob:'))) {
          return (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Generated Image</h3>
              <img src={result} alt="Generated" className="max-w-full rounded-lg" />
            </div>
          );
        } else if (Array.isArray(result) && result[0] && result[0].url) {
          return (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Generated Image</h3>
              <img src={result[0].url} alt="Generated" className="max-w-full rounded-lg" />
            </div>
          );
        }
        // Fall back to JSON display if format is unexpected
        return (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Result (JSON)</h3>
            <pre className="bg-[#1a1a2e] rounded-lg p-4 overflow-x-auto text-sm font-mono">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        );
        
      case 'audio':
        if (typeof result === 'string' && (result.startsWith('data:audio') || result.startsWith('blob:'))) {
          return (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Generated Audio</h3>
              <audio controls className="w-full">
                <source src={result} />
                Your browser does not support the audio element.
              </audio>
            </div>
          );
        }
        // Fall back to JSON display
        return (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Result (JSON)</h3>
            <pre className="bg-[#1a1a2e] rounded-lg p-4 overflow-x-auto text-sm font-mono">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        );
        
      case 'video':
        if (typeof result === 'string' && (result.startsWith('data:video') || result.startsWith('blob:'))) {
          return (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Generated Video</h3>
              <video controls className="w-full rounded-lg">
                <source src={result} />
                Your browser does not support the video element.
              </video>
            </div>
          );
        }
        // Fall back to JSON display
        return (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Result (JSON)</h3>
            <pre className="bg-[#1a1a2e] rounded-lg p-4 overflow-x-auto text-sm font-mono">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        );
        
      case 'json':
      default:
        return (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Result</h3>
            <pre className="bg-[#1a1a2e] rounded-lg p-4 overflow-x-auto text-sm font-mono">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        );
    }
  };
  
  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Hugging Face API Tester</h1>
        
        <div className="glass rounded-xl p-6 md:p-8 mb-8">
          <p className="text-white/70 mb-6">
            Test Hugging Face models directly from this interface. Select a model type, task, and provide your API key to get started.
          </p>
          
          {renderModelTypeButtons()}
          {renderTaskButtons()}
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="modelId" className="form-label">Model ID</label>
              <input
                id="modelId"
                type="text"
                className={`form-input ${errors.modelId ? 'border-red-500' : ''}`}
                placeholder="e.g., gpt2, stabilityai/stable-diffusion-2"
                {...register('modelId', { required: 'Model ID is required' })}
              />
              {errors.modelId && (
                <p className="text-red-500 text-xs mt-1">{errors.modelId.message}</p>
              )}
            </div>
            
            <div className="mb-4">
              <label htmlFor="apiKey" className="form-label flex items-center">
                <span>API Key</span>
                <span className="ml-2 text-xs text-white/60">(Optional, but recommended)</span>
              </label>
              <div className="relative">
                <input
                  id="apiKey"
                  type="password"
                  className="form-input pr-10"
                  placeholder="hf_..."
                  {...register('apiKey')}
                />
                <Key className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              </div>
              <p className="text-xs text-white/60 mt-1">
                Get your API key from <a href="https://huggingface.co/settings/tokens" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Hugging Face settings</a>
              </p>
            </div>
            
            <div className="mb-4">
              <label htmlFor="input" className="form-label">Input</label>
              <textarea
                id="input"
                rows={5}
                className={`form-input font-mono text-sm ${errors.input ? 'border-red-500' : ''}`}
                placeholder="Enter your input text or JSON..."
                {...register('input', { required: 'Input is required' })}
              ></textarea>
              {errors.input && (
                <p className="text-red-500 text-xs mt-1">{errors.input.message}</p>
              )}
            </div>
            
            <div className="mb-6">
              <button
                type="button"
                className="flex items-center space-x-1 text-sm text-white/70 hover:text-white mb-2"
                onClick={() => setShowOptions(!showOptions)}
              >
                {showOptions ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                <span>Advanced Options</span>
              </button>
              
              {showOptions && (
                <div className="mb-4">
                  <label htmlFor="options" className="form-label">Options (JSON)</label>
                  <textarea
                    id="options"
                    rows={4}
                    className="form-input font-mono text-sm"
                    placeholder="{ 'temperature': 0.7 }"
                    {...register('options')}
                  ></textarea>
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap gap-4">
              <button
                type="submit"
                className="btn-primary flex items-center space-x-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    <span>Run Model</span>
                  </>
                )}
              </button>
              
              <button
                type="button"
                className="btn-secondary flex items-center space-x-2"
                onClick={handleCopyCode}
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Code className="w-5 h-5" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
              
              <button
                type="button"
                className="btn-secondary flex items-center space-x-2"
                onClick={() => {
                  setValue('input', getSampleInput(selectedModelType, selectedTask));
                }}
              >
                <RefreshCw className="w-5 h-5" />
                <span>Reset Input</span>
              </button>
            </div>
          </form>
        </div>
        
        {error && (
          <motion.div 
            className="glass rounded-xl p-6 mb-8 border border-red-500/50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-red-400 mb-1">Error</h3>
                <p className="text-white/80">{error}</p>
              </div>
            </div>
          </motion.div>
        )}
        
        {result && (
          <motion.div 
            className="glass rounded-xl p-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {renderResult()}
          </motion.div>
        )}
      </div>
    </PageTransition>
  );
};

export default ApiTestPage;