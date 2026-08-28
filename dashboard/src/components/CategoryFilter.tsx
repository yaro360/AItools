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

  return (
    <div className="relative mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-[#F5F5F5]">Categories</h2>
        {selectedCategory && (
          <button
            onClick={() => onCategorySelect(null)}
            className="text-sm text-[#3B9EFF] hover:text-[#6AB6FF] hover:underline transition"
          >
            Clear filter
          </button>
        )}
      </div>
      
      <div className="relative">
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-[#161616] border border-[#2A2A2A] rounded-full hover:bg-[#2A2A2A] transition"
          >
            <ChevronLeft className="w-5 h-5 text-[#F5F5F5]" />
          </button>
        )}
        
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-3 overflow-x-auto scrollbar-hide py-2 px-1"
        >
          <button
            onClick={() => onCategorySelect(null)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
              selectedCategory === null 
                ? 'bg-[#3B9EFF] text-white' 
                : 'bg-[#161616] border border-[#2A2A2A] text-[#F5F5F5] hover:bg-[#2A2A2A]'
            }`}
          >
            All Tools
          </button>
          
          {sortedCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.name)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                selectedCategory === category.name 
                  ? 'bg-[#3B9EFF] text-white' 
                  : 'bg-[#161616] border border-[#2A2A2A] text-[#F5F5F5] hover:bg-[#2A2A2A]'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
              <span className="ml-2 text-[#A3A3A3]">({category.tool_count})</span>
            </button>
          ))}
        </div>
        
        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-[#161616] border border-[#2A2A2A] rounded-full hover:bg-[#2A2A2A] transition"
          >
            <ChevronRight className="w-5 h-5 text-[#F5F5F5]" />
          </button>
        )}
      </div>
    </div>
  );
}
