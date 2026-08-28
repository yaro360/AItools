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
        <Loader2 className="w-10 h-10 text-[#3B9EFF] animate-spin" />
      </div>
    );
  }

  if (tools.length === 0) {
    return (
      <div className="bg-[#161616] border border-[#2A2A2A] rounded-xl p-12 text-center">
        <PackageX className="w-16 h-16 text-[#A3A3A3] mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-[#F5F5F5] mb-2">No tools found</h3>
        <p className="text-[#A3A3A3]">
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
