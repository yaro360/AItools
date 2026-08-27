import type { Tool, ViewMode } from '../types';
import { ToolCard } from './ToolCard';
import { Loader2, PackageX } from 'lucide-react';

interface ToolGridProps {
  tools: Tool[];
  viewMode: ViewMode;
  onToolSelect: (tool: Tool) => void;
  isLoading?: boolean;
}

export function ToolGrid({ tools, viewMode, onToolSelect, isLoading }: ToolGridProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-10 h-10 text-purple-400 animate-spin" />
      </div>
    );
  }

  if (tools.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center">
        <PackageX className="w-16 h-16 text-white/30 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">No tools found</h3>
        <p className="text-white/60">
          Try adjusting your search or filters to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div
      className={
        viewMode === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          : 'flex flex-col gap-4'
      }
    >
      {tools.map((tool) => (
        <ToolCard
          key={tool.id}
          tool={tool}
          viewMode={viewMode}
          onSelect={onToolSelect}
        />
      ))}
    </div>
  );
}
