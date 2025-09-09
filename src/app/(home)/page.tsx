'use client';

import Link from 'next/link';
import React from 'react';
import { 
  BookOpen, 
  Settings, 
  Terminal, 
  Brain,
  Server,
  Cloud,
  Rocket,
  RefreshCw,
  FolderOpen,
  Wrench,
  TimerIcon,
  LayoutIcon,
  KeyboardIcon,
  PersonStandingIcon,
  type LucideIcon
} from 'lucide-react';

// Enhanced animations and styles
const customStyles = `
  @keyframes fade-up {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes float-subtle {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes gradient-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 20px rgba(71, 85, 105, 0.3); }
    50% { box-shadow: 0 0 40px rgba(71, 85, 105, 0.6); }
  }
  
  .animate-fade-up { animation: fade-up 0.6s ease-out forwards; opacity: 0; }
  .animate-float-subtle { animation: float-subtle 4s ease-in-out infinite; }
  .animate-gradient-bg { 
    background: linear-gradient(-45deg, #1e293b, #334155, #475569, #64748b);
    background-size: 400% 400%;
    animation: gradient-shift 8s ease infinite;
  }
  .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
  
  .animation-delay-100 { animation-delay: 0.1s; }
  .animation-delay-200 { animation-delay: 0.2s; }
  .animation-delay-300 { animation-delay: 0.3s; }
  .animation-delay-400 { animation-delay: 0.4s; }
  .animation-delay-500 { animation-delay: 0.5s; }
  .animation-delay-600 { animation-delay: 0.6s; }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = customStyles;
  document.head.appendChild(styleSheet);
}

// Enhanced navigation data with Lucide icons and modern color scheme
const navigationSections = [
  {
    href: '/docs/documentation',
    icon: BookOpen,
    title: 'Documentation',
    description: 'Docker, Kubernetes, Proxmox guides',
    color: 'from-slate-600 to-slate-700',
    iconColor: 'text-slate-600 dark:text-slate-400',
    delay: 'animation-delay-100',
    count: '15+ guides',
  },
  {
    href: '/docs/software',
    icon: Settings,
    title: 'Software',
    description: 'Nextcloud, authentication, tools',
    color: 'from-emerald-600 to-emerald-700',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    delay: 'animation-delay-200',
    count: '10+ apps',
  },
  {
    href: '/docs/scripts',
    icon: Terminal,
    title: 'Scripts',
    description: 'Automation, networking, utilities',
    color: 'from-violet-600 to-violet-700',
    iconColor: 'text-violet-600 dark:text-violet-400',
    delay: 'animation-delay-300',
    count: '8+ scripts',
  },
  {
    href: '/docs/knowledge',
    icon: Brain,
    title: 'Knowledge',
    description: 'Troubleshooting & best practices',
    color: 'from-amber-600 to-amber-700',
    iconColor: 'text-amber-600 dark:text-amber-400',
    delay: 'animation-delay-400',
    count: '12+ articles',
  },
] as const;

// Featured content for quick access
const featuredContent = [
  {
    title: 'Proxmox Setup Guide',
    description: 'Complete Proxmox VE installation and configuration',
    href: '/docs/documentation/proxmox',
    icon: Server,
    iconColor: 'text-slate-600 dark:text-slate-400',
    category: 'Documentation',
  },
  {
    title: 'Nextcloud Deployment',
    description: 'Self-hosted cloud storage with Docker',
    href: '/docs/software/cloud-services/nextcloud',
    icon: Cloud,
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    category: 'Software',
  },
  {
    title: 'Container Deployment Script',
    description: 'Automated Docker container management',
    href: '/docs/scripts/system-management/container-deploy',
    icon: Rocket,
    iconColor: 'text-violet-600 dark:text-violet-400',
    category: 'Scripts',
  },
] as const;



function Hero() {
  return (
    <div className="relative z-2 flex flex-col border-x border-t bg-fd-background/80 px-4 pt-12 max-md:text-center md:px-12 md:pt-16 overflow-hidden">
      <div
        className="absolute inset-0 z-[-1] blur-2xl hidden dark:block"
        style={{
          maskImage:
            'linear-gradient(to bottom, transparent, white, transparent)',
          background:
            'repeating-linear-gradient(65deg, var(--color-blue-500), var(--color-blue-500) 12px, color-mix(in oklab, var(--color-blue-600) 30%, transparent) 20px, transparent 200px)',
        }}
      />
      <div
        className="absolute inset-0 z-[-1] blur-2xl dark:hidden"
        style={{
          maskImage:
            'linear-gradient(to bottom, transparent, white, transparent)',
          background:
            'repeating-linear-gradient(65deg, var(--color-purple-300), var(--color-purple-300) 12px, color-mix(in oklab, var(--color-blue-600) 30%, transparent) 20px, transparent 200px)',
        }}
      />
      <h1 className="mb-8 text-4xl font-medium md:hidden">N-Docs</h1>
      <h1 className="mb-8 max-w-[600px] text-4xl font-medium max-md:hidden">
        Your comprehensive homelab
        <br />
        documentation hub
      </h1>
      <p className="mb-8 text-fd-muted-foreground md:max-w-[80%] md:text-xl">
        Infrastructure guides, automation scripts, and troubleshooting knowledge
        for your homelab and development projects.
      </p>
      <div className="inline-flex items-center gap-3 max-md:mx-auto">
        <Link
          href="/docs/documentation"
          className="inline-flex items-center justify-center rounded-full bg-fd-primary px-6 py-3 text-sm font-medium text-fd-primary-foreground hover:bg-fd-primary/90 transition-colors"
        >
          <Rocket className="mr-2 w-4 h-4" />
          Getting Started
        </Link>
        <a
          href="https://j551n.com"
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center justify-center rounded-full border border-fd-border bg-fd-background px-6 py-3 text-sm font-medium hover:bg-fd-accent transition-colors"
        >
          Visit Homepage
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
}

function Introduction() {
  return (
    <div className="grid grid-cols-1 border-r md:grid-cols-2">
      <div className="flex flex-col gap-2 border-l border-t px-6 py-12 md:py-16">
        <div className="inline-flex size-7 items-center justify-center rounded-full bg-fd-primary font-medium text-fd-primary-foreground">1</div>
        <h3 className="text-xl font-semibold">Explore.</h3>
        <p className="mb-8 text-fd-muted-foreground">
          Browse comprehensive documentation across different categories.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {navigationSections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="group flex flex-col items-center p-4 rounded-lg border border-fd-border hover:bg-fd-accent transition-colors"
            >
              <section.icon className={`w-6 h-6 ${section.iconColor} mb-2`} />
              <h4 className="font-medium text-sm">{section.title}</h4>
              <p className="text-xs text-fd-muted-foreground text-center">{section.count}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2 border-l border-t px-6 py-12 md:py-16">
        <div className="inline-flex size-7 items-center justify-center rounded-full bg-fd-primary font-medium text-fd-primary-foreground">2</div>
        <h3 className="text-xl font-semibold">Learn.</h3>
        <p className="text-fd-muted-foreground mb-8">
          Follow step-by-step guides and best practices for your infrastructure.
        </p>
        <div className="space-y-4">
          {featuredContent.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-start gap-3 p-3 rounded-lg border border-fd-border hover:bg-fd-accent transition-colors"
            >
              <item.icon className={`w-5 h-5 ${item.iconColor} mt-0.5`} />
              <div>
                <h4 className="font-medium text-sm">{item.title}</h4>
                <p className="text-xs text-fd-muted-foreground">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="col-span-full flex flex-col items-center gap-2 border-l border-t px-6 py-16 text-center">
        <div className="inline-flex size-7 items-center justify-center rounded-full bg-fd-primary font-medium text-fd-primary-foreground">3</div>
        <h3 className="text-2xl font-semibold">Deploy.</h3>
        <p className="text-fd-muted-foreground">
          Apply what you learn to build and maintain your homelab infrastructure.
        </p>
      </div>
    </div>
  );
}

function Features() {
  return (
    <div className="grid grid-cols-1 border-r md:grid-cols-2">
      <Feature
        icon={BookOpen}
        subheading="Documentation"
        heading="Comprehensive guides"
        description="Step-by-step guides for Docker, Kubernetes, Proxmox, and more infrastructure tools."
      />
      <Feature
        icon={Settings}
        subheading="Software"
        heading="Application setup"
        description="Complete setup guides for Nextcloud, authentication systems, and productivity tools."
      />
      <Feature
        icon={Terminal}
        subheading="Scripts"
        heading="Automation tools"
        description="Ready-to-use scripts for deployment, networking, and system management tasks."
      />
      <Feature
        icon={Brain}
        subheading="Knowledge"
        heading="Troubleshooting"
        description="Best practices, troubleshooting guides, and expert tips for common issues."
      />
    </div>
  );
}

function Feature({
  icon: Icon,
  heading,
  subheading,
  description,
}: {
  icon: LucideIcon;
  subheading: React.ReactNode;
  heading: React.ReactNode;
  description: React.ReactNode;
}): React.ReactElement {
  return (
    <div className="border-l border-t px-6 py-12 md:py-16">
      <div className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-fd-muted-foreground">
        <Icon className="size-4" />
        <p>{subheading}</p>
      </div>
      <h2 className="mb-2 text-lg font-semibold">{heading}</h2>
      <p className="text-fd-muted-foreground">{description}</p>
    </div>
  );
}

function Highlights() {
  return (
    <div className="grid grid-cols-1 border-r md:grid-cols-2 lg:grid-cols-3">
      <div className="col-span-full flex flex-row items-start justify-center border-l border-t p-8 pb-2 text-center">
        <h2 className="bg-fd-primary text-fd-primary-foreground px-1 text-2xl font-semibold">
          Highlights
        </h2>
      </div>
      <Highlight icon={TimerIcon} heading="Light & Fast.">
        Optimized documentation with clean, readable content and fast loading.
      </Highlight>
      <Highlight icon={Rocket} heading="Production Ready.">
        Battle-tested guides and scripts used in real homelab environments.
      </Highlight>
      <Highlight icon={LayoutIcon} heading="Well Organized.">
        Clear categorization and navigation for easy content discovery.
      </Highlight>
      <Highlight icon={Server} heading="Infrastructure Focus.">
        Specialized content for homelab, DevOps, and system administration.
      </Highlight>
      <Highlight icon={KeyboardIcon} heading="Practical Examples.">
        Real-world examples and code snippets you can use immediately.
      </Highlight>
      <Highlight icon={PersonStandingIcon} heading="Community Driven.">
        Continuously updated with community feedback and contributions.
      </Highlight>
    </div>
  );
}

function Highlight({
  icon: Icon,
  heading,
  children,
}: {
  icon: LucideIcon;
  heading: React.ReactNode;
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <div className="border-l border-t px-6 py-12">
      <div className="mb-4 flex flex-row items-center gap-2 text-fd-muted-foreground">
        <Icon className="size-4" />
        <h2 className="text-sm font-medium">{heading}</h2>
      </div>
      <span className="font-medium">{children}</span>
    </div>
  );
}

function End() {
  return (
    <div className="flex flex-col border-b border-r md:flex-row *:border-l *:border-t">
      <div className="group flex flex-col min-w-0 flex-1 pt-8 **:transition-colors">
        <h2 className="text-3xl text-center font-extrabold font-mono uppercase text-fd-muted-foreground mb-4 lg:text-4xl group-hover:text-blue-500">
          Build Your Homelab
        </h2>
        <p className="text-center font-mono text-xs text-fd-foreground/60 mb-8 group-hover:text-blue-500/80">
          infrastructure and automation, just like the pros.
        </p>
        <div className="h-[200px] overflow-hidden p-8 bg-gradient-to-b from-fd-primary/10 group-hover:from-blue-500/10">
          <div className="mx-auto bg-radial-[circle_at_0%_100%] from-60% from-transparent to-fd-primary size-[500px] rounded-full group-hover:from-blue-500 group-hover:to-blue-600/10" />
        </div>
      </div>
      <ul className="flex flex-col gap-4 p-6 pt-8">
        <li>
          <span className="flex flex-row items-center gap-2 font-medium">
            <BookOpen className="size-5" />
            Comprehensive guides.
          </span>
          <span className="mt-2 text-sm text-fd-muted-foreground">
            Step-by-step documentation for all major technologies.
          </span>
        </li>
        <li>
          <span className="flex flex-row items-center gap-2 font-medium">
            <Terminal className="size-5" />
            Ready-to-use scripts.
          </span>
          <span className="mt-2 text-sm text-fd-muted-foreground">
            Automation scripts tested in production environments.
          </span>
        </li>
        <li>
          <span className="flex flex-row items-center gap-2 font-medium">
            <Brain className="size-5" />
            Expert knowledge.
          </span>
          <span className="mt-2 text-sm text-fd-muted-foreground">
            Best practices and troubleshooting from real experience.
          </span>
        </li>
        <li className="flex flex-row flex-wrap gap-2 mt-auto">
          <Link href="/docs/documentation" className="inline-flex items-center justify-center rounded-md bg-fd-primary px-4 py-2 text-sm font-medium text-fd-primary-foreground hover:bg-fd-primary/90 transition-colors">
            Read docs
          </Link>
          <a
            href="https://j551n.com"
            rel="noreferrer noopener"
            className="inline-flex items-center justify-center rounded-md border border-fd-border bg-fd-background px-4 py-2 text-sm font-medium hover:bg-fd-accent transition-colors"
          >
            Visit Homepage
          </a>
        </li>
      </ul>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="container relative max-w-[1100px] px-2 py-4 z-2 lg:py-8">
      <div
        style={{
          background:
            'repeating-linear-gradient(to bottom, transparent, color-mix(in oklab, var(--color-fd-primary) 1%, transparent) 500px, transparent 1000px)',
        }}
      >
        <div className="relative">
          <Hero />
        </div>
        <Introduction />
        <Features />
        <Highlights />
        <End />
      </div>
    </main>
  );
}
