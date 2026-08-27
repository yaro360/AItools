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
      color: 'from-purple-500 to-pink-500',
    },
    {
      label: 'Categories',
      value: activeCategories.length,
      icon: Layers,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      label: 'Added This Month',
      value: recentTools.length,
      icon: Calendar,
      color: 'from-emerald-500 to-teal-500',
    },
    {
      label: 'Featured',
      value: featuredTools.length,
      icon: TrendingUp,
      color: 'from-amber-500 to-orange-500',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2 bg-gradient-to-br ${stat.color} rounded-lg`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white">{stat.value.toLocaleString()}</div>
          <div className="text-sm text-white/60">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
