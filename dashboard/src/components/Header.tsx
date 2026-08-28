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
    <header className="border-b border-[#2A2A2A]">
      <div className="px-6 py-10 lg:px-12 lg:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-[#161616] border border-[#2A2A2A] rounded-xl">
                  <Sparkles className="w-8 h-8 text-[#FFD400]" />
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-[#F5F5F5]">
                  AI Tools Directory
                </h1>
              </div>
              <p className="text-lg text-[#A3A3A3] max-w-2xl">
                Discover and explore {totalTools.toLocaleString()}+ AI-powered tools organized by category. 
                Automatically updated weekly with the latest AI innovations.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="bg-[#161616] border border-[#2A2A2A] rounded-xl px-6 py-4 text-center">
                <div className="text-3xl font-bold text-[#FFD400]">{totalTools.toLocaleString()}</div>
                <div className="text-sm text-[#A3A3A3]">Total Tools</div>
              </div>
              <div className="bg-[#161616] border border-[#2A2A2A] rounded-xl px-6 py-4 text-center">
                <div className="flex items-center justify-center gap-2 text-[#FFD400] mb-1">
                  <RefreshCw className="w-4 h-4" />
                  <span className="text-sm font-medium">Auto-Updated</span>
                </div>
                <div className="text-xs text-[#A3A3A3]">{formattedDate}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
