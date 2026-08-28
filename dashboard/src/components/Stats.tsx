import { TrendingUp, Layers, Calendar, Sparkles } from 'lucide-react';
import type { Tool, Category } from '../types';

interface StatsProps {
  tools: Tool[];
  categories: Category[];
}

export function Stats({ tools, categories }: StatsProps) {
  const recentTools = tools.filter((tool) => {
    const added = new Date(tool.added_date);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - added.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
  });

  const featuredTools = tools.filter((tool) => tool.featured);
  const activeCategories = categories.filter((c) => c.tool_count > 0);

  const stats = [
    {
      label: 'Total Tools',
      value: tools.length,
      icon: Sparkles,
    },
    {
      label: 'Categories',
      value: activeCategories.length,
      icon: Layers,
    },
    {
      label: 'Added This Month',
      value: recentTools.length,
      icon: Calendar,
    },
    {
      label: 'Featured',
      value: featuredTools.length,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-[#161616] border border-[#2A2A2A] rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg">
              <stat.icon className="w-5 h-5 text-[#FFD400]" />
            </div>
          </div>
          <div className="text-2xl font-bold text-[#FFD400]">{stat.value.toLocaleString()}</div>
          <div className="text-sm text-[#A3A3A3]">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
