import { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';

const OverviewPage = lazy(() => import('./pages/OverviewPage'));
const EvidencePage = lazy(() => import('./pages/EvidencePage'));
const GenresPage = lazy(() => import('./pages/GenresPage'));
const CriteriaPage = lazy(() => import('./pages/CriteriaPage'));
const MethodologyPage = lazy(() => import('./pages/MethodologyPage'));
const ModelsPage = lazy(() =>
  import('./pages/ModelsPage').then((mod) => ({ default: mod.ModelsPage }))
);
const PromptsPage = lazy(() => import('./pages/PromptsPage'));

function PageFallback() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-sm text-stone-500">
      загрузка страницы...
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<OverviewPage />} />
            <Route path="/models" element={<ModelsPage />} />
            <Route path="/genres" element={<GenresPage />} />
            <Route path="/criteria" element={<CriteriaPage />} />
            <Route path="/evidence" element={<EvidencePage />} />
            <Route path="/methodology" element={<MethodologyPage />} />
            <Route path="/prompts" element={<PromptsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
