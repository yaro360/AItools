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
        className="bg-[#161616] border border-[#2A2A2A] rounded-xl p-6 cursor-pointer group hover:border-[#3B9EFF] transition-colors flex flex-col sm:flex-row sm:items-center gap-4 animate-fade-in"
      >
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold text-[#F5F5F5] group-hover:text-[#3B9EFF] transition">
              {tool.name}
            </h3>
            {tool.featured && (
              <span className="flex items-center gap-1 bg-[#FFD400]/20 text-[#FFD400] text-xs px-2 py-1 rounded-full font-medium">
                <Star className="w-3 h-3" /> Featured
              </span>
            )}
            {isNew && (
              <span className="bg-[#FFD400]/20 text-[#FFD400] text-xs px-2 py-1 rounded-full font-medium">
                New
              </span>
            )}
          </div>
          <p className="text-[#A3A3A3] text-sm line-clamp-2 mb-3">{tool.description}</p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs bg-[#0A0A0A] border border-[#2A2A2A] text-[#FFD400] px-2 py-1 rounded-lg font-medium">
              {tool.category}
            </span>
            {tool.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs bg-[#0A0A0A] border border-[#2A2A2A] text-[#A3A3A3] px-2 py-1 rounded-lg">
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
          className="bg-[#3B9EFF] hover:bg-[#6AB6FF] text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2 whitespace-nowrap"
        >
          Visit <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    );
  }

  return (
    <div
      onClick={() => onSelect(tool)}
      className="bg-[#161616] border border-[#2A2A2A] rounded-xl p-6 cursor-pointer group hover:border-[#3B9EFF] transition-colors relative animate-fade-in flex flex-col h-full"
    >
      {tool.featured && (
        <div className="absolute top-3 right-3 bg-[#FFD400]/20 text-[#FFD400] text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
          <Star className="w-3 h-3" /> Featured
        </div>
      )}
      {isNew && !tool.featured && (
        <div className="absolute top-3 right-3 bg-[#FFD400]/20 text-[#FFD400] text-xs font-bold px-2 py-1 rounded-full">
          New
        </div>
      )}
      
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#F5F5F5] group-hover:text-[#3B9EFF] transition pr-16">
          {tool.name}
        </h3>
      </div>
      
      <p className="text-[#A3A3A3] text-sm line-clamp-3 mb-4 flex-1">{tool.description}</p>
      
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <span className="text-xs bg-[#0A0A0A] border border-[#2A2A2A] text-[#FFD400] px-2 py-1 rounded-lg font-medium">
            {tool.category}
          </span>
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-[#2A2A2A]">
          <span className="text-xs text-[#A3A3A3]">
            Added {formatDate(tool.added_date)}
          </span>
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 text-[#3B9EFF] hover:text-[#6AB6FF] hover:underline text-sm font-medium transition"
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
