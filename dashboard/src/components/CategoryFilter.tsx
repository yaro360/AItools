import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import type { Category } from '../types';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategorySelect: (categoryName: string | null) => void;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onCategorySelect,
}: CategoryFilterProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const sortedCategories = [...categories]
    .filter(c => c.tool_count > 0)
    .sort((a, b) => b.tool_count - a.tool_count);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, []);

  const pillBaseClass = "px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer whitespace-nowrap";
  const pillInactiveClass = `${pillBaseClass} bg-white/10 hover:bg-white/20 border border-white/10`;
  const pillActiveClass = `${pillBaseClass} bg-gradient-to-r from-purple-600 to-pink-600`;

  return (
    <div className="relative mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Categories</h2>
        {selectedCategory && (
          <button
            onClick={() => onCategorySelect(null)}
            className="text-sm text-purple-400 hover:text-purple-300 transition"
          >
            Clear filter
          </button>
        )}
      </div>
      
      <div className="relative">
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-slate-900/90 rounded-full shadow-lg hover:bg-slate-800 transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-3 overflow-x-auto scrollbar-hide py-2 px-1"
        >
          <button
            onClick={() => onCategorySelect(null)}
            className={selectedCategory === null ? pillActiveClass : pillInactiveClass}
          >
            All Tools
          </button>
          
          {sortedCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.name)}
              className={selectedCategory === category.name ? pillActiveClass : pillInactiveClass}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
              <span className="ml-2 text-white/50">({category.tool_count})</span>
            </button>
          ))}
        </div>
        
        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-slate-900/90 rounded-full shadow-lg hover:bg-slate-800 transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
