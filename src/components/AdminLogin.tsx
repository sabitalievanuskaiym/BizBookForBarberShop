import { useState } from 'react';
import { api } from '../utils/api';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { LockKeyhole } from 'lucide-react';

interface AdminLoginProps {
  onLogin: (token: string) => void;
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError('');

      const response = await api.login(email, password);
      
      if (response.access_token) {
        onLogin(response.access_token);
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Ошибка входа');
    } finally {
      setLoading(false);
    }
  };

  const handleResetAuth = () => {
    if (confirm('Вы уверены? Это удалит данные админа и позволит создать новый аккаунт.')) {
      sessionStorage.removeItem('bizbook_admin_token');
      setError('');
      alert('Данные авторизации сброшены. Теперь можете войти с новыми данными или зарегистрироваться.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-2xl shadow-2xl p-8">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-amber-500/20 rounded-xl flex items-center justify-center">
            <LockKeyhole className="w-8 h-8 text-amber-500" />
          </div>
        </div>
        <h1 className="text-center mb-2 text-white">Панель администратора</h1>
        <p className="text-center text-zinc-400 mb-8">BizBook Management</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="login-email" className="text-zinc-300">Email</Label>
            <Input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
              className="bg-zinc-900/50 border-zinc-700 text-white placeholder:text-zinc-500"
            />
          </div>

          <div>
            <Label htmlFor="login-password" className="text-zinc-300">Пароль</Label>
            <Input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="bg-zinc-900/50 border-zinc-700 text-white placeholder:text-zinc-500"
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded text-sm">
              {error}
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full bg-amber-500 hover:bg-amber-600 text-zinc-900" 
            disabled={loading}
          >
            {loading ? 'Вход...' : 'Войти'}
          </Button>
        </form>

        <div className="mt-6 p-4 bg-zinc-900/30 border border-zinc-700/30 rounded-lg">
          <p className="text-xs text-zinc-400 mb-2">Первый вход:</p>
          <p className="text-xs text-zinc-500 mb-4">
            Сначала создайте аккаунт администратора через Supabase Dashboard (Authentication → Add User), 
            затем войдите с теми же данными здесь.
          </p>
          <div className="pt-4 border-t border-zinc-700/30">
            <p className="text-xs text-zinc-400 mb-2">Проблемы со входом?</p>
            <Button
              type="button"
              variant="outline"
              className="w-full border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300 text-xs"
              onClick={handleResetAuth}
            >
              Очистить локальную сессию
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}