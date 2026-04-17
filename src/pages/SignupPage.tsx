import React, { useState } from 'react';
import { supabase } from '@/src/lib/supabase';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { HardDrive, Loader2, Info, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      toast.success('Check your email for confirmation!');
      navigate('/login');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-6">
       <Link to="/" className="fixed top-8 left-8 text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
        <ArrowLeft className="w-4 h-4" /> Back Home
      </Link>

      <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-600/20">
            <HardDrive className="text-white w-7 h-7" />
          </div>
          <h2 className="text-3xl font-bold text-white">Create an account</h2>
          <p className="text-slate-400 mt-2">Start storing your files smart today.</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-6 p-8 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl">
          <Input
            label="Email Address"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-slate-950 border-slate-800 h-12"
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-slate-950 border-slate-800 h-12"
          />

          <Button 
            className="w-full h-12 rounded-xl text-base font-semibold" 
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Creating account...
              </>
            ) : (
              'Get Started'
            )}
          </Button>

          <div className="p-4 bg-indigo-950/20 border border-indigo-900/50 rounded-xl flex items-start gap-3">
             <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
             <p className="text-xs text-indigo-300 leading-relaxed">
               Make sure to use a valid email. You'll receive a confirmation link to activate your storage account.
             </p>
          </div>

          <p className="text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
