import { Search, SlidersHorizontal, Grid3X3, List, X } from 'lucide-react';
import type { SortOption, ViewMode } from '../types';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  resultCount: number;
}

export function SearchBar({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  resultCount,
}: SearchBarProps) {
  return (
    <div className="bg-[#161616] border border-[#2A2A2A] rounded-xl p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A3A3A3]" />
          <input
            type="text"
            placeholder="Search tools by name, description, or category..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-5 py-4 pl-12 pr-10 text-[#F5F5F5] placeholder-[#A3A3A3] focus:outline-none focus:border-[#3B9EFF] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A3A3A3] hover:text-[#F5F5F5] transition"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#A3A3A3]" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-4 py-3 text-[#F5F5F5] text-sm focus:outline-none focus:border-[#3B9EFF] cursor-pointer"
            >
              <option value="name">Sort by Name</option>
              <option value="date">Sort by Date</option>
              <option value="category">Sort by Category</option>
            </select>
          </div>
          
          <div className="flex items-center gap-1 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg p-1">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 rounded-lg transition ${
                viewMode === 'grid' ? 'bg-[#3B9EFF] text-white' : 'text-[#A3A3A3] hover:text-[#F5F5F5]'
              }`}
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-2 rounded-lg transition ${
                viewMode === 'list' ? 'bg-[#3B9EFF] text-white' : 'text-[#A3A3A3] hover:text-[#F5F5F5]'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      {searchQuery && (
        <div className="mt-4 text-sm text-[#A3A3A3]">
          Found <span className="text-[#FFD400] font-semibold">{resultCount}</span> tools matching "{searchQuery}"
        </div>
      )}
    </div>
  );
}
