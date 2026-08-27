import { ExternalLink, Star } from 'lucide-react';
import type { Tool } from '../types';

interface ToolCardProps {
  tool: Tool;
  viewMode: 'grid' | 'list';
  onSelect: (tool: Tool) => void;
}

export function ToolCard({ tool, viewMode, onSelect }: ToolCardProps) {
  const isNew = isRecentlyAdded(tool.added_date);

  if (viewMode === 'list') {
    return (
      <div
        onClick={() => onSelect(tool)}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 cursor-pointer group hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex flex-col sm:flex-row sm:items-center gap-4 animate-fade-in"
      >
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition">
              {tool.name}
            </h3>
            {tool.featured && (
              <span className="flex items-center gap-1 bg-amber-500/20 text-amber-400 text-xs px-2 py-1 rounded-full">
                <Star className="w-3 h-3" /> Featured
              </span>
            )}
            {isNew && (
              <span className="flex items-center gap-1 bg-emerald-500/20 text-emerald-400 text-xs px-2 py-1 rounded-full">
                New
              </span>
            )}
          </div>
          <p className="text-white/70 text-sm line-clamp-2 mb-3">{tool.description}</p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">
              {tool.category}
            </span>
            {tool.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs bg-white/10 text-white/60 px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 flex items-center gap-2 whitespace-nowrap"
        >
          Visit <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    );
  }

  return (
    <div
      onClick={() => onSelect(tool)}
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 cursor-pointer group hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] relative animate-fade-in flex flex-col h-full"
    >
      {tool.featured && (
        <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
          <Star className="w-3 h-3" /> Featured
        </div>
      )}
      {isNew && !tool.featured && (
        <div className="absolute top-3 right-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-xs font-bold px-2 py-1 rounded-full">
          New
        </div>
      )}
      
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition pr-16">
          {tool.name}
        </h3>
      </div>
      
      <p className="text-white/70 text-sm line-clamp-3 mb-4 flex-1">{tool.description}</p>
      
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">
            {tool.category}
          </span>
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <span className="text-xs text-white/50">
            Added {formatDate(tool.added_date)}
          </span>
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 text-purple-400 hover:text-purple-300 text-sm font-medium transition"
          >
            Visit <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

function isRecentlyAdded(dateStr: string): boolean {
  const added = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - added.getTime()) / (1000 * 60 * 60 * 24));
  return diffDays <= 7;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
