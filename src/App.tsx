import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import LoadingScreen from './components/LoadingScreen';

// Lazy load pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const TextModelsPage = lazy(() => import('./pages/TextModelsPage'));
const ImageModelsPage = lazy(() => import('./pages/ImageModelsPage'));
const AudioModelsPage = lazy(() => import('./pages/AudioModelsPage'));
const VideoModelsPage = lazy(() => import('./pages/VideoModelsPage'));
const ModelDetailPage = lazy(() => import('./pages/ModelDetailPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const EditProfilePage = lazy(() => import('./pages/EditProfilePage'));
const ApiTestPage = lazy(() => import('./pages/ApiTestPage'));

function App() {
  const location = useLocation();

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Suspense fallback={<LoadingScreen />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/text-models" element={<TextModelsPage />} />
            <Route path="/image-models" element={<ImageModelsPage />} />
            <Route path="/audio-models" element={<AudioModelsPage />} />
            <Route path="/video-models" element={<VideoModelsPage />} />
            <Route path="/model/:id" element={<ModelDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/edit" element={<EditProfilePage />} />
            <Route path="/api-test" element={<ApiTestPage />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </Layout>
  );
}

export default App;