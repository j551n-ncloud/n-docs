import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-center text-center px-6 py-16 min-h-screen">
      {/* Subtle Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl animate-float animation-delay-400"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 space-y-8 max-w-3xl mx-auto animate-fade-in-up">
        <h1 className="text-6xl md:text-8xl font-light text-fd-foreground tracking-tight">
          N-Docs
        </h1>
        
        <p className="text-xl text-fd-muted-foreground font-light animate-fade-in-up animation-delay-200">
          Homelab and Knowledge Documentation
        </p>

        <p className="text-fd-muted-foreground max-w-xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400">
          Clean, comprehensive documentation for homelab infrastructure, 
          software configurations, and troubleshooting guides.
        </p>
      </div>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16 max-w-4xl mx-auto animate-fade-in-up animation-delay-600">
        <Link
          href="/docs/homelab"
          className="group p-8 rounded-lg glass-card hover:bg-fd-accent/50 hover:scale-105 transition-all duration-300"
        >
          <div className="text-2xl mb-4 opacity-60 group-hover:opacity-100 transition-opacity duration-300">🏠</div>
          <h3 className="font-medium mb-2 text-fd-foreground">Homelab</h3>
          <p className="text-sm text-fd-muted-foreground">Infrastructure & virtualization</p>
        </Link>
        
        <Link
          href="/docs/homelab/software"
          className="group p-8 rounded-lg glass-card hover:bg-fd-accent/50 hover:scale-105 transition-all duration-300 animation-delay-200"
        >
          <div className="text-2xl mb-4 opacity-60 group-hover:opacity-100 transition-opacity duration-300">⚙️</div>
          <h3 className="font-medium mb-2 text-fd-foreground">Software</h3>
          <p className="text-sm text-fd-muted-foreground">Applications & services</p>
        </Link>
        
        <Link
          href="/docs/knowledge"
          className="group p-8 rounded-lg glass-card hover:bg-fd-accent/50 hover:scale-105 transition-all duration-300 animation-delay-400"
        >
          <div className="text-2xl mb-4 opacity-60 group-hover:opacity-100 transition-opacity duration-300">📚</div>
          <h3 className="font-medium mb-2 text-fd-foreground">Knowledge</h3>
          <p className="text-sm text-fd-muted-foreground">Guides & troubleshooting</p>
        </Link>
      </div>

      {/* Simple CTA */}
      <div className="mt-16 animate-fade-in-up animation-delay-800">
        <Link
          href="/docs"
          className="group inline-flex items-center px-6 py-3 text-fd-foreground border border-fd-border rounded-lg hover:bg-fd-accent hover:scale-105 transition-all duration-200"
        >
          Browse Documentation
          <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </main>
  );
}
