# Brand Monitoring Setup

## Goal
Monitor online mentions of **"bebold"** and **"Go mobile solutions"** for negative press, specifically watching for posts from **Gregg Kell**.

## Platforms to Monitor
- Reddit
- Twitter/X  
- Google Search results
- Instagram
- Facebook
- TikTok

## Prerequisites
Add your Apify API token as a secret in Cursor:
1. Get token from: https://console.apify.com/settings/integrations
2. In Cursor: Settings > MCP > add secret `APIFY_TOKEN`

## Apify Actors to Use

| Platform | Actor | Search Terms |
|----------|-------|--------------|
| Reddit | `trudax/reddit-scraper-lite` | bebold, Go mobile solutions, Gregg Kell |
| Twitter/X | `apidojo/tweet-scraper` | bebold, Go mobile solutions, Gregg Kell |
| Google | `apify/google-search-scraper` | bebold reviews, Go mobile solutions reviews |
| Instagram | `apify/instagram-search-scraper` | bebold, Go mobile solutions |
| Facebook | `apify/facebook-search-scraper` | bebold, Go mobile solutions |
| Sentiment | `tri_angle/social-media-sentiment-analysis-tool` | Analyze collected URLs |

## Quick Start Command for Cursor

Once you have the token set up, paste this into Cursor chat:

> Run brand monitoring searches for "bebold" and "Go mobile solutions" on Reddit, Twitter, and Google. Flag any negative sentiment posts, especially from someone named Gregg Kell. Give me a report of what you find.

## Manual CLI Commands (if running yourself)

```bash
# Install Apify CLI
npm install -g apify-cli

# Login
apify login --token YOUR_TOKEN

# Reddit search
apify actors call "trudax/reddit-scraper-lite" \
  -i '{"searchTerms": ["bebold", "Go mobile solutions", "Gregg Kell"], "maxItems": 100}' \
  --json 2>/dev/null

# Twitter search
apify actors call "apidojo/tweet-scraper" \
  -i '{"searchTerms": ["bebold", "Go mobile solutions", "Gregg Kell"], "maxItems": 100}' \
  --json 2>/dev/null

# Google search
apify actors call "apify/google-search-scraper" \
  -i '{"queries": "bebold reviews\nGo mobile solutions reviews", "maxPagesPerQuery": 3}' \
  --json 2>/dev/null
```
