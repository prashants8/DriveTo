import { Link } from 'react-router-dom';
import { Shield, FastForward, Layout, HardDrive, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { motion } from 'motion/react';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-indigo-500/30">
      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
              <HardDrive className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">DriveTo</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" className="text-sm">Sign in</Button>
            </Link>
            <Link to="/signup">
              <Button size="sm" className="hidden sm:inline-flex rounded-xl">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="pt-40 pb-24 px-6 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/20 blur-[120px] rounded-full" />
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8 leading-[1.1]">
                Store smart. <br />
                <span className="bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text text-transparent">
                  Access anywhere.
                </span>
              </h1>
              <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                Experience the next generation of personal cloud storage. Simple, secure, and blazingly fast. Your files, your way.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/signup">
                  <Button size="lg" className="rounded-2xl h-14 px-8 text-lg group shadow-xl shadow-indigo-600/20">
                    Get Started Free <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <div className="flex items-center gap-4 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                  <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-6 h-6 rounded-full border-2 border-slate-950 bg-slate-800" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400 font-medium tracking-wide uppercase">Used by 10k+ users</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-24 px-6 bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Built for performance</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">Everything you need to manage your documents and assets in one place.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  title: 'Secure storage', 
                  desc: 'Enterprise-grade encryption for all your stored files.', 
                  icon: Shield,
                  color: 'text-emerald-400'
                },
                { 
                  title: 'Fast access', 
                  desc: 'Blazing fast upload and download speeds worldwide.', 
                  icon: FastForward,
                  color: 'text-indigo-400'
                },
                { 
                  title: 'Simple UI', 
                  desc: 'Modern, clean interface designed for maximum productivity.', 
                  icon: Layout,
                  color: 'text-orange-400'
                }
              ].map((f, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5 }}
                  className="p-8 rounded-3xl bg-slate-950 border border-white/5 hover:border-indigo-500/30 transition-all group"
                >
                  <div className={`p-4 bg-slate-900 rounded-2xl w-fit mb-6 group-hover:bg-indigo-600/10 transition-colors`}>
                    <f.icon className={`w-6 h-6 ${f.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="py-24 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-white mb-8 leading-tight">Simple. Reliable. <br />Completely secure.</h2>
                <div className="space-y-6">
                  {[
                    "Sign up in seconds with your email",
                    "Drag and drop any file to the dashboard",
                    "Access your files from any device",
                    "Manage metadata and file organization effortlessly"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-indigo-600/10 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                      </div>
                      <p className="text-slate-300 font-medium">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-tr from-indigo-600/20 to-purple-600/20 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full blur-3xl opacity-50" />
                <div className="bg-slate-900 border border-white/10 rounded-[2rem] p-4 relative shadow-2xl overflow-hidden">
                   <div className="aspect-[4/3] bg-slate-950 rounded-[1.5rem] flex items-center justify-center border border-white/5">
                      <HardDrive className="w-24 h-24 text-indigo-500/20 animate-pulse" />
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <HardDrive className="text-white w-4 h-4" />
          </div>
          <span className="text-lg font-bold text-white tracking-tight">DriveTo</span>
        </div>
        <p className="text-slate-500 text-sm">© 2026 DriveTo Cloud Storage. All rights reserved.</p>
      </footer>
    </div>
  );
}
