# AI Tools Directory Dashboard

A modern, dashboard-style web application to browse, search, and discover AI tools. Features automated weekly updates to keep the directory current with the latest AI innovations.

## Features

- **850+ AI Tools**: Comprehensive directory of AI-powered tools across 100+ categories
- **Modern Dashboard UI**: Beautiful glass-morphism design with dark mode
- **Smart Search**: Search by name, description, category, or tags
- **Category Filtering**: Browse tools by category with horizontal scrolling pills
- **Tool Details**: Click any tool to see examples, use cases, and reasons to use it
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Weekly Auto-Updates**: GitHub Actions workflow to add new tools automatically

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
dashboard/
├── src/
│   ├── components/        # React components
│   │   ├── Header.tsx     # Dashboard header with stats
│   │   ├── SearchBar.tsx  # Search and sort controls
│   │   ├── CategoryFilter.tsx  # Category pills
│   │   ├── ToolCard.tsx   # Tool display card
│   │   ├── ToolGrid.tsx   # Grid/list layout
│   │   ├── ToolModal.tsx  # Tool detail popup
│   │   ├── Pagination.tsx # Page navigation
│   │   ├── Stats.tsx      # Dashboard statistics
│   │   └── Footer.tsx     # Footer with info
│   ├── data/
│   │   └── tools.json     # Tool database
│   ├── types/
│   │   └── index.ts       # TypeScript types
│   ├── App.tsx            # Main application
│   └── index.css          # Tailwind CSS styles
├── scripts/
│   ├── research_new_tools.py  # Tool management CLI
│   └── sample_new_tools.json  # Example batch file
└── .github/workflows/
    ├── weekly-update.yml      # Weekly update workflow
    └── research-tools.yml     # Research trigger workflow
```

## Adding New Tools

### Method 1: Manual CLI

```bash
python scripts/research_new_tools.py add
```

Follow the interactive prompts to add name, URL, description, and category.

### Method 2: Batch Import

Create a JSON file with new tools:

```json
{
  "tools": [
    {
      "name": "Tool Name",
      "url": "https://tool.com",
      "description": "What the tool does",
      "category": "Category Name"
    }
  ]
}
```

Then run:

```bash
python scripts/research_new_tools.py batch your_file.json
```

### Method 3: GitHub Actions (Automated)

1. Go to **Actions** → **Weekly AI Tools Update** → **Run workflow**
2. Optionally provide JSON with new tools
3. A PR will be created with the updates

### Method 4: Pending Tools File

Add tools to `src/data/pending_tools.json` - they will be processed on the next weekly run.

## Tool Data Structure

Each tool in `tools.json` has:

```typescript
interface Tool {
  id: string;           // Unique identifier
  name: string;         // Tool name
  url: string;          // Tool website URL
  description: string;  // What the tool does
  category: string;     // Category name
  added_date: string;   // Date added (YYYY-MM-DD)
  example: string;      // Example use case
  why_use: string;      // Reasons to use it
  tags: string[];       // Searchable tags
  featured: boolean;    // Featured flag
}
```

## Categories

Tools are organized into these main categories:

- AI Agents
- Audio & Voice
- Business & Productivity
- Chatbots & Assistants
- Code & Development
- Content & Copywriting
- Creative & Design
- Data & Analytics
- Education & Learning
- Image Generation
- Marketing & Sales
- Music & Audio
- Research & Knowledge
- Video & Animation
- Writing & Documents

## Weekly Update Process

The GitHub Actions workflow runs every Sunday at midnight UTC:

1. Checks for `pending_tools.json`
2. Processes any pending tools
3. Updates the timestamp
4. Creates a PR with changes

You can also trigger updates manually with custom tool data.

## Statistics CLI

View database stats:

```bash
python scripts/research_new_tools.py stats
```

Output includes:
- Total tools and categories
- Top categories by tool count
- Recent additions

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS v4** for styling
- **Lucide React** for icons
- **Python 3** for CLI tools

## Contributing

1. Fork the repository
2. Add new tools via any of the methods above
3. Submit a pull request

## License

MIT License - feel free to use and modify for your own projects.
