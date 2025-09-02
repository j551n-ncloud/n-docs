'use client';

import Link from 'next/link';
import React from 'react';

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
      {/* Subtle grey animated orbs */}
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gray-500/8 rounded-full blur-3xl animate-float opacity-40" />
      <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-gray-400/6 rounded-full blur-2xl animate-float-reverse animation-delay-400 opacity-30" />
    </div>
  );
}

function HeroSection() {
  return (
    <header className="relative z-10 max-w-4xl mx-auto">
      <div className="space-y-4">
        <div className="animate-slide-up-fade">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            N-Docs
          </h1>
        </div>

        <div className="animate-slide-up-fade animation-delay-200">
          <p className="text-sm md:text-base text-white/60 max-w-xl mx-auto leading-relaxed font-light">
            Beautiful documentation framework for developers, flexible and performant.
          </p>
        </div>

        <div className="animate-slide-up-fade animation-delay-400 flex flex-col sm:flex-row gap-3 pt-2 justify-center">
          <Link
            href="/docs/documentation"
            className="group relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-black bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400/50"
          >
            Getting Started
          </Link>
          <a
            href="https://your-website.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white border border-gray-500/30 bg-gray-500/10 backdrop-blur-sm rounded-lg hover:border-gray-400/50 hover:bg-gray-500/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400/50"
          >
            Visit Website
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    <main className="flex flex-1 flex-col justify-center text-center px-6 py-16 min-h-screen bg-black">
      <BackgroundElements />
      <HeroSection />

      {/* Compact Features Grid */}
      <div className="mt-12 max-w-4xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {navigationSections.map((section, index) => (
            <Link
              key={section.href}
              href={section.href}
              className="group relative p-4 rounded-xl bg-gray-500/10 border border-gray-500/20 hover:border-gray-400/40 hover:bg-gray-500/20 backdrop-blur-md transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-gray-400/50 animate-slide-up-fade"
              style={{
                animationDelay: `${0.6 + index * 0.1}s`,
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
                <h3 className="font-medium text-white mb-2 text-sm group-hover:text-white transition-colors duration-200">
                  {section.title}
                </h3>
                <p className="text-xs text-gray-300 group-hover:text-white transition-colors duration-200 leading-relaxed">
                  {section.description}
                </p>
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-gray-400/10 to-gray-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Glass reflection */}
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
