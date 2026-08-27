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
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="p-8">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">{tool.name}</h2>
              {tool.featured && (
                <span className="bg-amber-500/20 text-amber-400 text-xs px-2 py-1 rounded-full">
                  Featured
                </span>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-white/60">
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
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-purple-400" />
                Description
              </h3>
              <p className="text-white/80 leading-relaxed">{tool.description}</p>
            </div>
            
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-5">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-400" />
                Example Use Case
              </h3>
              <p className="text-white/80 leading-relaxed">{tool.example}</p>
            </div>
            
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                Why Use It
              </h3>
              <p className="text-white/80 leading-relaxed">{tool.why_use}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-white/60 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tool.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white/10 rounded-full text-sm"
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
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 w-full flex items-center justify-center gap-2 mt-6"
            >
              Visit {tool.name} <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
