import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showPages = 5;
    
    if (totalPages <= showPages + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      
      if (currentPage > 3) pages.push('...');
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) pages.push(i);
      
      if (currentPage < totalPages - 2) pages.push('...');
      
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={page === '...'}
          className={`min-w-[40px] h-10 rounded-xl transition ${
            page === currentPage
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold'
              : page === '...'
              ? 'cursor-default text-white/50'
              : 'bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10'
          }`}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
