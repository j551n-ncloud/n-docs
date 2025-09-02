import Link from 'next/link';
import type { Metadata } from 'next';

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

export const metadata: Metadata = {
  title: 'N-Docs - Homelab Documentation',
  description: 'Clean, comprehensive documentation for homelab infrastructure, software configurations, and troubleshooting guides.',
  keywords: ['homelab', 'documentation', 'proxmox', 'docker', 'kubernetes', 'nextcloud', 'infrastructure'],
  authors: [{ name: 'N-Docs Team' }],
  openGraph: {
    title: 'N-Docs - Homelab Documentation',
    description: 'Clean, comprehensive documentation for homelab infrastructure, software configurations, and troubleshooting guides.',
    type: 'website',
    url: 'https://your-domain.com',
    siteName: 'N-Docs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'N-Docs - Homelab Documentation',
    description: 'Clean, comprehensive documentation for homelab infrastructure, software configurations, and troubleshooting guides.',
  },
};

function BackgroundElements() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/6 w-40 h-40 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-float" />
      <div className="absolute top-1/3 right-1/5 w-32 h-32 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-2xl animate-float-reverse animation-delay-300" />
      <div className="absolute bottom-1/4 left-1/3 w-28 h-28 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-2xl animate-float animation-delay-600" />
      <div className="absolute bottom-1/3 right-1/3 w-36 h-36 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-full blur-3xl animate-float-reverse animation-delay-900" />
      
      {/* Rotating geometric shapes */}
      <div className="absolute top-1/2 left-1/12 w-2 h-2 bg-blue-400/30 rotate-45 animate-rotate-slow" />
      <div className="absolute top-3/4 right-1/12 w-3 h-3 bg-purple-400/30 animate-rotate-slow animation-delay-500" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <header className="relative z-10 space-y-8 max-w-4xl mx-auto">
      {/* Main title with gradient animation */}
      <div className="animate-scale-in">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tight gradient-text-animated hover:animate-wiggle transition-all duration-300 cursor-default">
          N-Docs
        </h1>
      </div>

      {/* Subtitle with staggered animation */}
      <div className="animate-fade-in-up animation-delay-300">
        <p className="text-xl md:text-2xl text-fd-muted-foreground font-light tracking-wide">
          Homelab and Knowledge Documentation
        </p>
      </div>

      {/* Description with enhanced styling */}
      <div className="animate-fade-in-up animation-delay-500">
        <p className="text-fd-muted-foreground max-w-2xl mx-auto leading-relaxed text-lg md:text-xl font-light">
          Clean, comprehensive documentation for homelab infrastructure,
          software configurations, and troubleshooting guides.
        </p>
      </div>

      {/* Animated divider */}
      <div className="animate-fade-in-up animation-delay-700">
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full animate-pulse-slow" />
      </div>
    </header>
  );
}

function NavigationCard({ href, icon, title, description, index }: {
  href: string;
  icon: string;
  title: string;
  description: string;
  index: number;
}) {
  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Create particle effect on hover
    const rect = e.currentTarget.getBoundingClientRect();
    const particles = 5;
    
    for (let i = 0; i < particles; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * rect.width + 'px';
      particle.style.top = rect.height + 'px';
      particle.style.animationDelay = Math.random() * 0.5 + 's';
      e.currentTarget.appendChild(particle);
      
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 3000);
    }
  };

  return (
    <Link
      href={href}
      onMouseEnter={handleMouseEnter}
      className="group relative p-8 rounded-2xl glass-card hover-lift glow-on-hover shimmer-effect particle-container focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 animate-fade-in-up overflow-hidden border border-white/10"
      style={{ 
        animationDelay: `${0.8 + index * 0.15}s`,
        animationFillMode: 'both'
      }}
      aria-label={`Navigate to ${title} - ${description}`}
    >
      {/* Animated background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out" />
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100" />
      
      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-sm animate-gradient" />
      
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-blue-500/20 to-transparent rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="text-4xl mb-6 opacity-80 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500 transform group-hover:rotate-12 group-hover:animate-bounce-gentle" aria-hidden="true">
          {icon}
        </div>
        <h3 className="font-semibold mb-4 text-lg text-fd-foreground group-hover:text-blue-300 transition-all duration-300 group-hover:translate-x-1">
          {title}
        </h3>
        <p className="text-sm text-fd-muted-foreground group-hover:text-fd-foreground/90 transition-all duration-300 leading-relaxed group-hover:translate-x-1">
          {description}
        </p>
      </div>
      
      {/* Enhanced hover indicators */}
      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0 rotate-45 group-hover:rotate-0">
        <div className="w-8 h-8 border-2 border-blue-400/60 rounded-lg animate-pulse-slow" />
      </div>
      
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-700 ease-out" />
    </Link>
  );
}

function NavigationGrid() {
  return (
    <nav className="mt-20 max-w-7xl mx-auto">
      {/* Section title */}
      <div className="text-center mb-12 animate-fade-in-up animation-delay-700">
        <h2 className="text-2xl font-light text-fd-muted-foreground mb-4">
          Explore Documentation
        </h2>
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto" />
      </div>
      
      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
        {navigationSections.map((section, index) => (
          <NavigationCard key={section.href} {...section} index={index} />
        ))}
      </div>
    </nav>
  );
}

function CallToAction() {
  return (
    <div className="mt-16 animate-fade-in-up animation-delay-800">
      <Link
        href="/docs/documentation"
        className="group inline-flex items-center px-6 py-3 text-fd-foreground border border-fd-border rounded-lg hover:bg-fd-accent hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-fd-ring focus:ring-offset-2"
        aria-label="Browse all documentation sections"
      >
        Browse Documentation
        <svg
          className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-center text-center px-6 py-16 min-h-screen">
      <BackgroundElements />
      <HeroSection />
      <NavigationGrid />
      <CallToAction />
    </main>
  );
}
