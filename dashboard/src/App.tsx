import { useState, useMemo, useEffect } from 'react';
import {
  Header,
  SearchBar,
  CategoryFilter,
  ToolGrid,
  ToolModal,
  Pagination,
  Stats,
  Footer,
} from './components';
import type { Tool, SortOption, ViewMode, ToolsData } from './types';
import toolsData from './data/tools.json';

const ITEMS_PER_PAGE = 24;

function App() {
  const data = toolsData as ToolsData;
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

  const filteredAndSortedTools = useMemo(() => {
    let result = [...data.tools];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (tool) =>
          tool.name.toLowerCase().includes(query) ||
          tool.description.toLowerCase().includes(query) ||
          tool.category.toLowerCase().includes(query) ||
          tool.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Filter by category
    if (selectedCategory) {
      result = result.filter((tool) => tool.category === selectedCategory);
    }

    // Sort
    switch (sortBy) {
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'date':
        result.sort((a, b) => new Date(b.added_date).getTime() - new Date(a.added_date).getTime());
        break;
      case 'category':
        result.sort((a, b) => a.category.localeCompare(b.category));
        break;
    }

    return result;
  }, [data.tools, searchQuery, selectedCategory, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedTools.length / ITEMS_PER_PAGE);
  
  const paginatedTools = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedTools.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAndSortedTools, currentPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, sortBy]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedTool) {
        setSelectedTool(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedTool]);

  return (
    <div className="min-h-screen pb-8">
      <Header
        totalTools={data.metadata.total_tools}
        lastUpdated={data.metadata.last_updated}
      />
      
      <main className="max-w-7xl mx-auto px-6 lg:px-12">
        <Stats tools={data.tools} categories={data.categories} />
        
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          resultCount={filteredAndSortedTools.length}
        />
        
        <CategoryFilter
          categories={data.categories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />
        
        <div className="mb-4 text-sm text-[#A3A3A3]">
          Showing <span className="text-[#FFD400]">{paginatedTools.length}</span> of <span className="text-[#FFD400]">{filteredAndSortedTools.length}</span> tools
          {selectedCategory && ` in ${selectedCategory}`}
        </div>
        
        <ToolGrid
          tools={paginatedTools}
          viewMode={viewMode}
          onToolSelect={setSelectedTool}
        />
        
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
        
        <Footer lastUpdated={data.metadata.last_updated} />
      </main>
      
      <ToolModal tool={selectedTool} onClose={() => setSelectedTool(null)} />
    </div>
  );
}

export default App;
