import { useState, useEffect } from 'react';
import { ClientBooking } from './components/ClientBooking';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { Marketplace } from './components/Marketplace';
import { Button } from './components/ui/button';
import { Toaster } from './components/ui/sonner';
import { ShoppingBag } from 'lucide-react';

export default function App() {
  const [view, setView] = useState<'client' | 'admin' | 'marketplace'>('client');
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    checkSession();
    checkRoute();
  }, []);

  const checkRoute = () => {
    // Check if URL is /admin to show admin panel
    const path = window.location.pathname;
    if (path === '/admin' || path === '/admin/') {
      // Try to get token from sessionStorage
      const token = sessionStorage.getItem('bizbook_admin_token');
      if (token) {
        setAdminToken(token);
        setView('admin');
      } else {
        setView('admin'); // Will show login
      }
    }
  };

  const checkSession = () => {
    try {
      // Try to restore session from sessionStorage
      const token = sessionStorage.getItem('bizbook_admin_token');
      if (token) {
        setAdminToken(token);
        // Only auto-switch to admin if on admin route
        const path = window.location.pathname;
        if (path === '/admin' || path === '/admin/') {
          setView('admin');
        }
      }
    } catch (err) {
      console.error('Session check error:', err);
    } finally {
      setCheckingSession(false);
    }
  };

  const handleAdminLogin = (token: string) => {
    setAdminToken(token);
    sessionStorage.setItem('bizbook_admin_token', token);
    setView('admin');
  };

  const handleLogout = () => {
    setAdminToken(null);
    sessionStorage.removeItem('bizbook_admin_token');
    setView('client');
    window.history.pushState({}, '', '/');
  };

  if (checkingSession) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-zinc-400">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (view === 'admin' && adminToken) {
    return (
      <>
        <AdminDashboard token={adminToken} onLogout={handleLogout} />
        <Toaster />
      </>
    );
  }

  if (view === 'admin') {
    return (
      <>
        <AdminLogin onLogin={handleAdminLogin} />
        <Toaster />
      </>
    );
  }

  if (view === 'marketplace') {
    return (
      <>
        <Marketplace onBack={() => setView('client')} />
        <Toaster />
      </>
    );
  }

  return (
    <>
      <div className="relative">
        <div className="absolute top-4 right-4 md:top-6 md:right-6 z-50">
          <Button
            variant="outline"
            onClick={() => setView('marketplace')}
            className="bg-zinc-800/80 backdrop-blur-sm border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white hover:border-amber-500 shadow-lg transition-all duration-300"
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Магазин</span>
          </Button>
        </div>
        <ClientBooking onMarketplace={() => setView('marketplace')} />
      </div>
      <Toaster />
    </>
  );
}