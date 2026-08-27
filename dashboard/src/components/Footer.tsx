import { Code2, Heart, RefreshCw } from 'lucide-react';

interface FooterProps {
  lastUpdated: string;
}

export function Footer({ lastUpdated }: FooterProps) {
  return (
    <footer className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl mt-12 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white/60">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-400 fill-red-400" />
            <span>for the AI community</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <RefreshCw className="w-4 h-4" />
              <span>Auto-updated weekly</span>
            </div>
            
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/60 hover:text-white transition"
            >
              <Code2 className="w-5 h-5" />
              <span className="text-sm">Contribute</span>
            </a>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-white/10 text-center text-sm text-white/40">
          <p>
            Last updated: {new Date(lastUpdated).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <p className="mt-2">
            This directory is automatically updated every week with the latest AI tools.
          </p>
        </div>
      </div>
    </footer>
  );
}
