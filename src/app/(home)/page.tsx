'use client';

import Link from 'next/link';
import React from 'react';

// Minimalistic modern animations
const customStyles = `
  @keyframes fade-up {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes float-subtle {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  .animate-fade-up { animation: fade-up 0.6s ease-out forwards; opacity: 0; }
  .animate-float-subtle { animation: float-subtle 4s ease-in-out infinite; }
  
  .animation-delay-100 { animation-delay: 0.1s; }
  .animation-delay-200 { animation-delay: 0.2s; }
  .animation-delay-300 { animation-delay: 0.3s; }
  .animation-delay-400 { animation-delay: 0.4s; }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = customStyles;
  document.head.appendChild(styleSheet);
}

// Navigation data for better maintainability
const navigationSections = [
  {
    href: '/docs/documentation',
    icon: '🏠',
    title: 'Documentation',
    description: 'Infrastructure & virtualization',
    delay: 'animation-delay-100',
  },
  {
    href: '/docs/software',
    icon: '⚙️',
    title: 'Software',
    description: 'Applications & services',
    delay: 'animation-delay-200',
  },
  {
    href: '/docs/scripts',
    icon: '🔧',
    title: 'Scripts',
    description: 'Automation & utilities',
    delay: 'animation-delay-300',
  },
  {
    href: '/docs/knowledge',
    icon: '📚',
    title: 'Knowledge',
    description: 'Guides & troubleshooting',
    delay: 'animation-delay-400',
  },
] as const;



function BackgroundElements() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Minimal floating elements */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gray-500/5 rounded-full blur-2xl animate-float-subtle opacity-30" />
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gray-400/4 rounded-full blur-xl animate-float-subtle animation-delay-200 opacity-20" />
    </div>
  );
}

function HeroSection() {
  return (
    <header className="relative z-10 max-w-4xl mx-auto">
      <div className="space-y-4">
        <div className="animate-fade-up">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-black dark:text-white leading-tight">
            N-Docs
          </h1>
        </div>

        <div className="animate-fade-up animation-delay-100">
          <p className="text-sm md:text-base text-black/60 dark:text-white/60 max-w-xl mx-auto leading-relaxed font-light">
            Documentation Platform of J551n.com
          </p>
        </div>

        <div className="animate-fade-up animation-delay-200 flex flex-col sm:flex-row gap-3 pt-2 justify-center">
          <Link
            href="/docs/documentation"
            className="group inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white dark:text-black bg-black/90 dark:bg-white/90 backdrop-blur-sm rounded-lg hover:bg-black dark:hover:bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400/50"
          >
            Getting Started
          </Link>
          <a
            href="https://j551n.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-black dark:text-white border border-gray-500/30 bg-gray-500/10 backdrop-blur-sm rounded-lg hover:border-gray-400/50 hover:bg-gray-500/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400/50"
          >
            Visit Homepage
            <svg className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}







export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-center text-center px-6 py-16 min-h-screen bg-white dark:bg-black">
      <BackgroundElements />
      <HeroSection />

      {/* Compact Features Grid */}
      <div className="mt-12 max-w-4xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {navigationSections.map((section, index) => (
            <Link
              key={section.href}
              href={section.href}
              className="group relative p-4 rounded-xl bg-gray-500/10 border border-gray-500/20 hover:border-gray-400/40 hover:bg-gray-500/20 backdrop-blur-md transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-gray-400/50 animate-fade-up hover:-translate-y-1"
              style={{
                animationDelay: `${0.3 + index * 0.1}s`,
                animationFillMode: 'both'
              }}
              aria-label={`Navigate to ${section.title} - ${section.description}`}
            >
              {/* Glass morphism overlay */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-white/0 opacity-50" />

              <div className="relative z-10 text-center">
                <div className="text-2xl mb-3 opacity-80 group-hover:opacity-100 transition-opacity duration-200">
                  {section.icon}
                </div>
                <h3 className="font-medium text-black dark:text-white mb-2 text-sm transition-colors duration-200">
                  {section.title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 transition-colors duration-200 leading-relaxed">
                  {section.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
