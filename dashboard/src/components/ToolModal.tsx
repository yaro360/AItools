import { X, ExternalLink, Lightbulb, CheckCircle, Tag, Calendar, Bookmark } from 'lucide-react';
import type { Tool } from '../types';

interface ToolModalProps {
  tool: Tool | null;
  onClose: () => void;
}

export function ToolModal({ tool, onClose }: ToolModalProps) {
  if (!tool) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80"
        onClick={onClose}
      />
      
      <div className="relative bg-[#161616] border border-[#2A2A2A] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-[#0A0A0A] border border-[#2A2A2A] hover:border-[#3B9EFF] rounded-lg transition"
        >
          <X className="w-5 h-5 text-[#F5F5F5]" />
        </button>
        
        <div className="p-8">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-[#FFD400]">{tool.name}</h2>
              {tool.featured && (
                <span className="bg-[#FFD400]/20 text-[#FFD400] text-xs px-2 py-1 rounded-full font-medium">
                  Featured
                </span>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-[#A3A3A3]">
              <span className="flex items-center gap-1">
                <Tag className="w-4 h-4" />
                {tool.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Added {new Date(tool.added_date).toLocaleDateString()}
              </span>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-[#F5F5F5]">
                <Bookmark className="w-5 h-5 text-[#3B9EFF]" />
                Description
              </h3>
              <p className="text-[#A3A3A3] leading-relaxed">{tool.description}</p>
            </div>
            
            <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-5">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-[#F5F5F5]">
                <Lightbulb className="w-5 h-5 text-[#FFD400]" />
                Example Use Case
              </h3>
              <p className="text-[#A3A3A3] leading-relaxed">{tool.example}</p>
            </div>
            
            <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-5">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-[#F5F5F5]">
                <CheckCircle className="w-5 h-5 text-[#FFD400]" />
                Why Use It
              </h3>
              <p className="text-[#A3A3A3] leading-relaxed">{tool.why_use}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-[#A3A3A3] mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tool.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-sm text-[#F5F5F5]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#3B9EFF] hover:bg-[#6AB6FF] text-white px-6 py-3 rounded-lg font-semibold transition w-full flex items-center justify-center gap-2 mt-6"
            >
              Visit {tool.name} <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
