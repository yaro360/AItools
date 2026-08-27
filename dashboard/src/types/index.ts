export interface Tool {
  id: string;
  name: string;
  url: string;
  description: string;
  category: string;
  added_date: string;
  example: string;
  why_use: string;
  tags: string[];
  featured: boolean;
}

export interface Category {
  id: string;
  name: string;
  tool_count: number;
  icon: string;
}

export interface ToolsData {
  metadata: {
    total_tools: number;
    total_categories: number;
    last_updated: string;
    version: string;
  };
  categories: Category[];
  tools: Tool[];
}

export type SortOption = 'name' | 'date' | 'category';
export type ViewMode = 'grid' | 'list';
