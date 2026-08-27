#!/usr/bin/env python3
"""
AI Tools Research Script

This script is designed to be run weekly (via GitHub Actions or manually) to:
1. Search for newly released AI tools
2. Extract tool information (name, URL, description)
3. Generate examples and use cases using AI
4. Add new tools to the tools.json database

The script uses search APIs to find new tools and can integrate with
AI services for generating descriptions and examples.
"""

import json
import os
import re
import uuid
from datetime import datetime, timedelta
from pathlib import Path
from typing import Optional
import urllib.request
import urllib.parse

# Configuration
TOOLS_JSON_PATH = Path(__file__).parent.parent / "src" / "data" / "tools.json"
NEW_TOOLS_PATH = Path(__file__).parent.parent / "src" / "data" / "pending_tools.json"

# Categories we track
CATEGORIES = [
    "AI Agents",
    "Audio & Voice",
    "Business & Productivity", 
    "Chatbots & Assistants",
    "Code & Development",
    "Content & Copywriting",
    "Creative & Design",
    "Data & Analytics",
    "Education & Learning",
    "Image Generation",
    "Marketing & Sales",
    "Music & Audio",
    "Research & Knowledge",
    "Video & Animation",
    "Writing & Documents",
]

# Search queries to find new AI tools
SEARCH_QUERIES = [
    "new AI tools released this week {year}",
    "latest AI productivity tools {month} {year}",
    "new generative AI tools {year}",
    "AI startup launches {month} {year}",
    "best new AI tools for developers {year}",
    "new AI image generation tools {year}",
    "AI writing tools launched {month} {year}",
    "new AI coding assistants {year}",
    "AI business tools released {year}",
    "latest AI chatbot tools {year}",
]


def load_existing_tools() -> dict:
    """Load the existing tools database."""
    if TOOLS_JSON_PATH.exists():
        with open(TOOLS_JSON_PATH, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {"metadata": {}, "categories": [], "tools": []}


def get_existing_urls(data: dict) -> set:
    """Get set of existing tool URLs to avoid duplicates."""
    return {normalize_url(tool["url"]) for tool in data.get("tools", [])}


def normalize_url(url: str) -> str:
    """Normalize URL for comparison."""
    url = url.lower().strip()
    url = re.sub(r'^https?://', '', url)
    url = re.sub(r'^www\.', '', url)
    url = url.rstrip('/')
    return url


def categorize_tool(name: str, description: str) -> str:
    """Attempt to categorize a tool based on its name and description."""
    text = (name + " " + description).lower()
    
    category_keywords = {
        "AI Agents": ["agent", "autonomous", "workflow automation"],
        "Audio & Voice": ["voice", "audio", "speech", "podcast", "sound", "transcrib"],
        "Business & Productivity": ["business", "productivity", "enterprise", "team", "project management"],
        "Chatbots & Assistants": ["chatbot", "assistant", "conversation", "chat"],
        "Code & Development": ["code", "developer", "programming", "api", "debug", "github"],
        "Content & Copywriting": ["copywriting", "content", "blog", "article", "marketing copy"],
        "Creative & Design": ["design", "creative", "ui", "ux", "figma", "graphic"],
        "Data & Analytics": ["data", "analytics", "insights", "dashboard", "metrics"],
        "Education & Learning": ["education", "learn", "tutor", "course", "study"],
        "Image Generation": ["image", "art", "photo", "picture", "visual", "midjourney", "dalle"],
        "Marketing & Sales": ["marketing", "sales", "lead", "crm", "outreach"],
        "Music & Audio": ["music", "song", "compose", "melody", "beat"],
        "Research & Knowledge": ["research", "knowledge", "paper", "academic", "science"],
        "Video & Animation": ["video", "animation", "film", "movie", "edit"],
        "Writing & Documents": ["writing", "document", "grammar", "text", "essay"],
    }
    
    for category, keywords in category_keywords.items():
        if any(keyword in text for keyword in keywords):
            return category
    
    return "Business & Productivity"


def generate_example(name: str, description: str, category: str) -> str:
    """Generate an example use case for a tool."""
    examples = {
        "AI Agents": f"Set up {name} to automate your daily workflow tasks, such as scheduling meetings, organizing emails, and managing project updates without manual intervention.",
        "Audio & Voice": f"Use {name} to convert your written content into professional voiceovers, or transcribe meeting recordings into searchable text documents.",
        "Business & Productivity": f"Integrate {name} into your daily workflow to automate repetitive tasks, generate reports, and boost team productivity.",
        "Chatbots & Assistants": f"Deploy {name} on your website to provide 24/7 customer support, answer FAQs, and qualify leads automatically.",
        "Code & Development": f"Use {name} to write boilerplate code, debug issues, and get code suggestions as you type in your IDE.",
        "Content & Copywriting": f"Input your product features into {name} to generate compelling marketing copy, social media posts, and blog articles.",
        "Creative & Design": f"Describe your design concept to {name} and receive multiple creative variations to choose from for your project.",
        "Data & Analytics": f"Connect {name} to your data sources to automatically generate insights, visualizations, and actionable recommendations.",
        "Education & Learning": f"Use {name} to create personalized study plans, get explanations for complex topics, or practice with AI-generated quizzes.",
        "Image Generation": f"Enter a detailed prompt into {name} to generate unique images for your marketing materials, social media, or creative projects.",
        "Marketing & Sales": f"Use {name} to personalize outreach emails, score leads, and optimize your marketing campaigns with AI-driven insights.",
        "Music & Audio": f"Describe the mood and style you want, and {name} will compose royalty-free music for your video or podcast.",
        "Research & Knowledge": f"Upload your research papers to {name} to get summaries, extract key findings, and discover related literature.",
        "Video & Animation": f"Input your script into {name} to generate AI-powered video content with realistic avatars or animated visuals.",
        "Writing & Documents": f"Paste your draft into {name} to get grammar corrections, style improvements, and suggestions for clearer writing.",
    }
    
    return examples.get(category, f"Try {name} by exploring its main features that can help streamline your work and boost productivity.")


def generate_why_use(name: str, description: str, category: str) -> str:
    """Generate reasons why someone should use this tool."""
    benefits = []
    desc_lower = description.lower()
    
    if any(word in desc_lower for word in ['fast', 'quick', 'instant', 'seconds', 'speed']):
        benefits.append("Save significant time with lightning-fast results")
    if any(word in desc_lower for word in ['free', 'no cost', 'open source']):
        benefits.append("Get started at no cost with free tier options")
    if any(word in desc_lower for word in ['ai', 'intelligent', 'smart', 'ml', 'machine learning']):
        benefits.append("Leverage cutting-edge AI for superior outcomes")
    if any(word in desc_lower for word in ['professional', 'quality', 'enterprise']):
        benefits.append("Achieve professional-grade results")
    if any(word in desc_lower for word in ['easy', 'simple', 'intuitive', 'no-code']):
        benefits.append("Easy to use with no technical expertise required")
    if any(word in desc_lower for word in ['automate', 'automatic', 'automated']):
        benefits.append("Automate repetitive tasks and focus on what matters")
    
    if not benefits:
        benefits = [
            f"{name} helps streamline your workflow",
            "Leverage AI technology for better results",
            "Save time and increase productivity"
        ]
    
    return "; ".join(benefits[:3]) + "."


def generate_tags(name: str, description: str, category: str) -> list:
    """Generate relevant tags for a tool."""
    tags = [category.lower().replace(" & ", "-").replace(" ", "-")]
    
    keywords_to_tags = {
        "ai": ["artificial-intelligence"],
        "free": ["free", "freemium"],
        "open source": ["open-source"],
        "api": ["api", "developer-tools"],
        "no-code": ["no-code", "low-code"],
        "automation": ["automation"],
        "productivity": ["productivity"],
        "collaboration": ["team", "collaboration"],
    }
    
    text = (description + " " + name).lower()
    for keyword, tag_list in keywords_to_tags.items():
        if keyword in text:
            tags.extend(tag_list)
    
    return list(set(tags))[:5]


def create_tool_entry(
    name: str,
    url: str,
    description: str,
    category: Optional[str] = None
) -> dict:
    """Create a new tool entry with all required fields."""
    if not category:
        category = categorize_tool(name, description)
    
    return {
        "id": str(uuid.uuid4())[:8],
        "name": name.strip(),
        "url": url.strip(),
        "description": description.strip(),
        "category": category,
        "added_date": datetime.now().strftime("%Y-%m-%d"),
        "example": generate_example(name, description, category),
        "why_use": generate_why_use(name, description, category),
        "tags": generate_tags(name, description, category),
        "featured": False,
    }


def add_tools_to_database(new_tools: list, data: dict) -> dict:
    """Add new tools to the existing database."""
    existing_urls = get_existing_urls(data)
    added_count = 0
    
    for tool in new_tools:
        normalized_url = normalize_url(tool["url"])
        if normalized_url not in existing_urls:
            data["tools"].append(tool)
            existing_urls.add(normalized_url)
            added_count += 1
            print(f"  Added: {tool['name']} ({tool['category']})")
    
    # Update metadata
    data["metadata"]["total_tools"] = len(data["tools"])
    data["metadata"]["last_updated"] = datetime.now().isoformat()
    
    # Update category counts
    category_counts = {}
    for tool in data["tools"]:
        cat = tool["category"]
        category_counts[cat] = category_counts.get(cat, 0) + 1
    
    for cat in data["categories"]:
        cat["tool_count"] = category_counts.get(cat["name"], 0)
    
    return data, added_count


def save_tools_database(data: dict):
    """Save the updated tools database."""
    with open(TOOLS_JSON_PATH, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"\nSaved to: {TOOLS_JSON_PATH}")


def save_pending_tools(tools: list):
    """Save tools that need human review."""
    with open(NEW_TOOLS_PATH, 'w', encoding='utf-8') as f:
        json.dump({
            "generated_at": datetime.now().isoformat(),
            "tools": tools
        }, f, indent=2, ensure_ascii=False)
    print(f"Saved pending tools for review: {NEW_TOOLS_PATH}")


def manual_add_tool():
    """Interactive CLI to manually add a new tool."""
    print("\n=== Add New AI Tool ===\n")
    
    name = input("Tool Name: ").strip()
    url = input("Tool URL: ").strip()
    description = input("Description: ").strip()
    
    print("\nAvailable categories:")
    for i, cat in enumerate(CATEGORIES, 1):
        print(f"  {i}. {cat}")
    
    cat_input = input("\nCategory number (or press Enter for auto-detect): ").strip()
    
    if cat_input.isdigit() and 1 <= int(cat_input) <= len(CATEGORIES):
        category = CATEGORIES[int(cat_input) - 1]
    else:
        category = categorize_tool(name, description)
        print(f"Auto-detected category: {category}")
    
    tool = create_tool_entry(name, url, description, category)
    
    print("\n=== Generated Tool Entry ===")
    print(json.dumps(tool, indent=2))
    
    confirm = input("\nAdd this tool? (y/n): ").strip().lower()
    if confirm == 'y':
        data = load_existing_tools()
        data, added = add_tools_to_database([tool], data)
        if added > 0:
            save_tools_database(data)
            print(f"\nSuccessfully added {name}!")
        else:
            print("\nTool already exists in database.")
    else:
        print("Cancelled.")


def batch_add_from_file(file_path: str):
    """Add tools from a JSON file."""
    print(f"\n=== Adding tools from {file_path} ===\n")
    
    with open(file_path, 'r', encoding='utf-8') as f:
        new_tools_data = json.load(f)
    
    tools_to_add = []
    for item in new_tools_data.get("tools", []):
        tool = create_tool_entry(
            name=item.get("name", ""),
            url=item.get("url", ""),
            description=item.get("description", ""),
            category=item.get("category")
        )
        tools_to_add.append(tool)
    
    data = load_existing_tools()
    data, added = add_tools_to_database(tools_to_add, data)
    
    if added > 0:
        save_tools_database(data)
        print(f"\nSuccessfully added {added} new tools!")
    else:
        print("\nNo new tools to add (all already exist).")


def show_stats():
    """Show current database statistics."""
    data = load_existing_tools()
    
    print("\n=== AI Tools Database Statistics ===\n")
    print(f"Total Tools: {data['metadata']['total_tools']}")
    print(f"Total Categories: {len(data['categories'])}")
    print(f"Last Updated: {data['metadata']['last_updated']}")
    
    print("\nTop Categories:")
    sorted_cats = sorted(data['categories'], key=lambda x: x['tool_count'], reverse=True)
    for cat in sorted_cats[:10]:
        if cat['tool_count'] > 0:
            print(f"  {cat['icon']} {cat['name']}: {cat['tool_count']} tools")
    
    # Recent additions
    recent = sorted(data['tools'], key=lambda x: x['added_date'], reverse=True)[:5]
    print("\nRecent Additions:")
    for tool in recent:
        print(f"  - {tool['name']} ({tool['added_date']})")


def main():
    import sys
    
    if len(sys.argv) < 2:
        print("AI Tools Research Script")
        print("\nUsage:")
        print("  python research_new_tools.py add        - Manually add a new tool")
        print("  python research_new_tools.py batch FILE - Add tools from JSON file")
        print("  python research_new_tools.py stats      - Show database statistics")
        print("  python research_new_tools.py help       - Show this help")
        return
    
    command = sys.argv[1].lower()
    
    if command == "add":
        manual_add_tool()
    elif command == "batch" and len(sys.argv) > 2:
        batch_add_from_file(sys.argv[2])
    elif command == "stats":
        show_stats()
    else:
        print("Unknown command. Use 'help' for usage information.")


if __name__ == "__main__":
    main()
