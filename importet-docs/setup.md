---
title: "Setting Up Fumadocs Documentation"
description: "Complete guide to creating a professional documentation site like N-Docs using Fumadocs"
---

import { Tabs, Tab } from '@/components/tabs';

# Setting Up Fumadocs Documentation

A complete guide to creating a professional documentation site like N-Docs using Fumadocs, including sidebar tabs, icons, and interactive components.

## Prerequisites

Before starting, ensure you have:
- Node.js 18+ installed
- Basic knowledge of React and Next.js
- A code editor (VS Code recommended)

## Project Setup

### 1. Create New Fumadocs Project

<Tabs items={['npm', 'pnpm', 'yarn', 'bun']}>
<Tab value="npm">
```bash
npx create-fumadocs-app
```
</Tab>
<Tab value="pnpm">
```bash
pnpm create fumadocs-app
```
</Tab>
<Tab value="yarn">
```bash
yarn create fumadocs-app
```
</Tab>
<Tab value="bun">
```bash
bun create fumadocs-app
```
</Tab>
</Tabs>

Follow the interactive setup:
- Choose your project name (e.g., `my-docs`)
- Select **Content Collections** as the content source
- Choose **Yes** for TypeScript
- Select your preferred styling approach

### 2. Navigate to Project

```bash
cd my-docs
```

### 3. Install Dependencies and Start Development

<Tabs items={['npm', 'pnpm', 'yarn', 'bun']}>
<Tab value="npm">
```bash
npm install
npm run dev
```
</Tab>
<Tab value="pnpm">
```bash
pnpm install
pnpm dev
```
</Tab>
<Tab value="yarn">
```bash
yarn install
yarn dev
```
</Tab>
<Tab value="bun">
```bash
bun install
bun dev
```
</Tab>
</Tabs>

Your documentation site will be available at `http://localhost:3000`.

## Project Structure

After setup, your project structure should look like this:

```
my-docs/
├── src/
│   ├── app/
│   │   ├── (home)/
│   │   │   └── page.tsx          # Homepage
│   │   ├── docs/
│   │   │   └── layout.tsx        # Docs layout
│   │   ├── layout.tsx            # Root layout
│   │   └── global.css            # Global styles
│   ├── components/               # UI components
│   └── lib/
│       ├── source.ts            # Content source config
│       └── layout.shared.tsx    # Shared layout options
├── content/
│   └── docs/                    # Documentation content
│       ├── index.mdx           # Docs homepage
│       └── meta.json           # Navigation config
├── package.json
└── next.config.mjs
```

## Setting Up Sidebar Tabs

### 1. Create Content Structure

Create your main documentation sections:

```bash
mkdir -p content/docs/documentation
mkdir -p content/docs/scripts  
mkdir -p content/docs/knowledge
```

### 2. Configure Root Meta.json

Update `content/docs/meta.json`:

```json
{
  "title": "My Documentation",
  "pages": [
    "index",
    "documentation", 
    "scripts",
    "knowledge"
  ]
}
```

### 3. Create Section Meta.json Files

For each section, create a `meta.json` with `"root": true`:

**content/docs/documentation/meta.json:**
```json
{
  "title": "Documentation",
  "description": "Technical documentation and guides",
  "root": true,
  "pages": [
    "index",
    "docker",
    "kubernetes"
  ]
}
```

**content/docs/scripts/meta.json:**
```json
{
  "title": "Scripts", 
  "description": "Automation scripts and utilities",
  "root": true,
  "pages": [
    "index",
    "deployment"
  ]
}
```

**content/docs/knowledge/meta.json:**
```json
{
  "title": "Knowledge Base",
  "description": "Troubleshooting and tips",
  "root": true, 
  "pages": [
    "index",
    "troubleshooting"
  ]
}
```

### 4. Configure Docs Layout with Icons

Update `src/app/docs/layout.tsx` to add icons to sidebar tabs based on their titles.

## Adding Interactive Components

### 1. Install Fumadocs CLI Components

<Tabs items={['npm', 'pnpm', 'yarn', 'bun']}>
<Tab value="npm">
```bash
npx @fumadocs/cli add tabs codeblock files banner
```
</Tab>
<Tab value="pnpm">
```bash
pnpm dlx @fumadocs/cli add tabs codeblock files banner
```
</Tab>
<Tab value="yarn">
```bash
yarn dlx @fumadocs/cli add tabs codeblock files banner
```
</Tab>
<Tab value="bun">
```bash
bun x @fumadocs/cli add tabs codeblock files banner
```
</Tab>
</Tabs>

### 2. Use Interactive Tabs in Content

Create tabbed content by importing the Tabs component and structuring your content with Tab elements for different options like package managers or operating systems.

### 3. Add File Trees

Use the CLI to generate file trees:

<Tabs items={['npm', 'pnpm', 'yarn', 'bun']}>
<Tab value="npm">
```bash
npx @fumadocs/cli tree ./src ./components/project-structure.tsx
```
</Tab>
<Tab value="pnpm">
```bash
pnpm dlx @fumadocs/cli tree ./src ./components/project-structure.tsx
```
</Tab>
<Tab value="yarn">
```bash
yarn dlx @fumadocs/cli tree ./src ./components/project-structure.tsx
```
</Tab>
<Tab value="bun">
```bash
bun x @fumadocs/cli tree ./src ./components/project-structure.tsx
```
</Tab>
</Tabs>

## Customizing the Homepage

### 1. Update Homepage Layout

Edit `src/app/(home)/page.tsx` to create a welcoming landing page with navigation links to your documentation sections.

### 2. Add Styling Effects

Add custom CSS for glassmorphism effects and animations to enhance the visual appeal of your documentation site.

## Content Organization Best Practices

### 1. Consistent Frontmatter

Use consistent frontmatter across all MDX files with title and description fields.

### 2. Navigation Structure

Organize content logically:
- **Documentation** - Technical guides, setup instructions
- **Scripts** - Automation tools, deployment scripts  
- **Knowledge** - Troubleshooting, tips, FAQs

### 3. Cross-References

Link related content throughout your documentation to help users navigate between related topics.

### 4. Learning Paths

Add progression indicators to guide users through complex topics step by step.

## Adding Icons and Emojis

### 1. Emoji Icons in Content

Use emojis to make your content more visually appealing and easier to scan.

### 2. SVG Icons in Layout

Use the transform function in your docs layout to add custom SVG icons to sidebar tabs.

## Deployment

### 1. Build for Production

<Tabs items={['npm', 'pnpm', 'yarn', 'bun']}>
<Tab value="npm">
```bash
npm run build
```
</Tab>
<Tab value="pnpm">
```bash
pnpm build
```
</Tab>
<Tab value="yarn">
```bash
yarn build
```
</Tab>
<Tab value="bun">
```bash
bun run build
```
</Tab>
</Tabs>

### 2. Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### 3. Deploy to Netlify

```bash
# Build the project
npm run build

# Deploy to Netlify (drag & drop the .next folder)
```

## Advanced Features

### 1. Search Integration

Add search functionality by following the Fumadocs search guide.

### 2. Analytics

Integrate analytics to track usage and improve your documentation.

### 3. Custom Components

Create reusable components for your documentation like warning boxes, code blocks, and interactive elements.

## Troubleshooting

### Common Issues

**Sidebar tabs not showing:**
- Ensure `"root": true` is set in section meta.json files
- Check that the main meta.json doesn't have `"root": true`

**Components not working:**
- Verify imports are correct
- Check that components are installed via Fumadocs CLI

**Build errors:**
- Ensure all MDX files have proper frontmatter
- Check for syntax errors in meta.json files

## Example Repository

You can reference the complete N-Docs setup as an example of this implementation in action.

## What's Next?

- [Fumadocs CLI Guide](/docs/documentation/fumadocs-cli) - Learn about CLI tools
- [Docker Documentation](/docs/documentation/docker) - See example documentation structure
- [Official Fumadocs Docs](https://fumadocs.vercel.app) - Complete Fumadocs reference

This guide provides everything needed to create a professional documentation site like N-Docs using Fumadocs!