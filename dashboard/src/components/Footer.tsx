import { RefreshCw } from 'lucide-react';

interface FooterProps {
  lastUpdated: string;
}

export function Footer({ lastUpdated }: FooterProps) {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#2A2A2A] mt-12">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 text-[#A3A3A3] text-sm">
            <RefreshCw className="w-4 h-4" />
            <span>Auto-updated weekly</span>
            <span className="text-[#2A2A2A]">•</span>
            <span>
              Last updated: {new Date(lastUpdated).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>
        
        <div className="text-center text-sm text-[#A3A3A3]">
          Created by{' '}
          <a 
            href="https://ycoproductions.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#3B9EFF] hover:text-[#6AB6FF] hover:underline"
          >
            YCO Productions
          </a>
          {' · '}
          <a 
            href="https://services.ycoproductions.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#3B9EFF] hover:text-[#6AB6FF] hover:underline"
          >
            services.ycoproductions.com
          </a>
          {' · '}
          <a 
            href="mailto:scale@ycoproductions.com"
            className="text-[#3B9EFF] hover:text-[#6AB6FF] hover:underline"
          >
            scale@ycoproductions.com
          </a>
        </div>
      </div>
    </footer>
  );
}
