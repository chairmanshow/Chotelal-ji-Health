import React, { useEffect } from 'react';
import { RouterProvider, useRouter } from './router';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { DiagnosePage } from './pages/DiagnosePage';
import { CategoriesPage } from './pages/CategoriesPage';
import { CategoryDetailPage } from './pages/CategoryDetailPage';
import { RemediesPage } from './pages/RemediesPage';
import { HerbsPage } from './pages/HerbsPage';
import { YogaPage } from './pages/YogaPage';
import { DietPage } from './pages/DietPage';
import { BlogPage } from './pages/BlogPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { DisclaimerPage } from './pages/DisclaimerPage';
import { FaqPage } from './pages/FaqPage';
import { validateFirestoreConnection } from './lib/firebase';
import { ChotelalAvatar } from './components/ChotelalAvatar';
import { Loader2 } from 'lucide-react';

function MainRouterView() {
  const { currentPath } = useRouter();

  // Normalize path
  const path = currentPath.toLowerCase().replace(/\/+$/, '') || '/';

  if (path === '/login') return <LoginPage />;
  if (path === '/' || path === '/home') return <HomePage />;
  if (path === '/diagnose') return <DiagnosePage />;
  if (path === '/categories') return <CategoriesPage />;
  if (path === '/remedies') return <RemediesPage />;
  if (path === '/herbs') return <HerbsPage />;
  if (path === '/yoga') return <YogaPage />;
  if (path === '/diet' || path === '/diet-expert') return <DietPage />;
  if (path === '/blog') return <BlogPage />;
  if (path === '/about') return <AboutPage />;
  if (path === '/contact') return <ContactPage />;
  if (path === '/privacy') return <PrivacyPage />;
  if (path === '/terms') return <TermsPage />;
  if (path === '/disclaimer') return <DisclaimerPage />;
  if (path === '/faq') return <FaqPage />;

  // Dynamic category route: /category/:slug
  if (path.startsWith('/category/')) {
    const slug = path.replace('/category/', '').trim();
    return <CategoryDetailPage slug={slug} />;
  }

  // Default to HomePage
  return <HomePage />;
}

// Mandatory Auth Guard
function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-sky-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8 flex flex-col items-center space-y-4 max-w-xs w-full text-center">
          <div className="p-1.5 rounded-full bg-orange-100">
            <ChotelalAvatar size="md" showBadge={false} />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-slate-800 text-sm">Chotelal Ji Health</h3>
            <p className="text-xs text-slate-400">स्वास्थ्य पोर्टल खुल रहा है...</p>
          </div>
          <Loader2 className="w-5 h-5 animate-spin text-orange-500" />
        </div>
      </div>
    );
  }

  // If not logged in, force Login Screen
  if (!user) {
    return <LoginPage />;
  }

  return <>{children}</>;
}

export default function App() {
  useEffect(() => {
    validateFirestoreConnection().then((connected) => {
      if (connected) {
        console.log('✓ Firestore connection verified successfully');
      }
    });
  }, []);

  return (
    <AuthProvider>
      <RouterProvider>
        <AuthGuard>
          <MainRouterView />
        </AuthGuard>
      </RouterProvider>
    </AuthProvider>
  );
}
