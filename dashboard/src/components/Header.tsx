import { Sparkles, RefreshCw } from 'lucide-react';

interface HeaderProps {
  totalTools: number;
  lastUpdated: string;
}

export function Header({ totalTools, lastUpdated }: HeaderProps) {
  const formattedDate = new Date(lastUpdated).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-orange-600/20 blur-3xl" />
      
      <div className="relative px-6 py-12 lg:px-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg shadow-purple-500/30">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                  AI Tools Directory
                </h1>
              </div>
              <p className="text-lg text-white/70 max-w-2xl">
                Discover and explore {totalTools.toLocaleString()}+ AI-powered tools organized by category. 
                Automatically updated weekly with the latest AI innovations.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4 text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">{totalTools.toLocaleString()}</div>
                <div className="text-sm text-white/60">Total Tools</div>
              </div>
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4 text-center">
                <div className="flex items-center justify-center gap-2 text-emerald-400 mb-1">
                  <RefreshCw className="w-4 h-4" />
                  <span className="text-sm font-medium">Auto-Updated</span>
                </div>
                <div className="text-xs text-white/60">{formattedDate}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
