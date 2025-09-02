'use client';

import { useEffect } from 'react';

export function DevToolsDisabler() {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Disable keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.keyCode === 123) {
        e.preventDefault();
        return false;
      }
      
      // Ctrl+Shift+I (Developer Tools)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        e.preventDefault();
        return false;
      }
      
      // Ctrl+Shift+J (Console)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
        e.preventDefault();
        return false;
      }
      
      // Ctrl+U (View Source)
      if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
        return false;
      }
      
      // Ctrl+Shift+C (Inspect Element)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
        e.preventDefault();
        return false;
      }

      // Cmd+Option+I (Mac Developer Tools)
      if (e.metaKey && e.altKey && e.keyCode === 73) {
        e.preventDefault();
        return false;
      }

      // Cmd+Option+J (Mac Console)
      if (e.metaKey && e.altKey && e.keyCode === 74) {
        e.preventDefault();
        return false;
      }

      // Cmd+Option+C (Mac Inspect)
      if (e.metaKey && e.altKey && e.keyCode === 67) {
        e.preventDefault();
        return false;
      }
    };

    // Disable text selection
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
      return false;
    };

    // Disable drag and drop
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('dragstart', handleDragStart);

    // Override console methods
    const originalConsole = { ...console };
    const noop = () => {};
    
    console.log = noop;
    console.warn = noop;
    console.error = noop;
    console.info = noop;
    console.debug = noop;
    console.trace = noop;
    console.table = noop;

    // Clear console periodically
    const clearConsoleInterval = setInterval(() => {
      try {
        console.clear();
      } catch {
        // Ignore errors
      }
    }, 2000);

    // DevTools detection
    const devtools = { open: false };
    const threshold = 160;

    const detectDevTools = () => {
      if (
        window.outerHeight - window.innerHeight > threshold ||
        window.outerWidth - window.innerWidth > threshold
      ) {
        if (!devtools.open) {
          devtools.open = true;
          // Show warning message
          document.body.innerHTML = `
            <div style="
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: #fff;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              z-index: 999999;
              text-align: center;
              padding: 20px;
            ">
              <div style="
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
                border-radius: 20px;
                padding: 40px;
                border: 1px solid rgba(255, 255, 255, 0.2);
                max-width: 500px;
              ">
                <h1 style="font-size: 2.5rem; margin-bottom: 20px; font-weight: 700;">🔒</h1>
                <h2 style="font-size: 1.5rem; margin-bottom: 15px; font-weight: 600;">Access Restricted</h2>
                <p style="font-size: 1rem; opacity: 0.9; line-height: 1.6;">
                  Developer tools are disabled in production for security reasons.
                </p>
                <button onclick="window.location.reload()" style="
                  margin-top: 20px;
                  padding: 12px 24px;
                  background: rgba(255, 255, 255, 0.2);
                  border: none;
                  border-radius: 8px;
                  color: white;
                  font-size: 1rem;
                  cursor: pointer;
                  transition: all 0.3s ease;
                " onmouseover="this.style.background='rgba(255, 255, 255, 0.3)'" 
                   onmouseout="this.style.background='rgba(255, 255, 255, 0.2)'">
                  Reload Page
                </button>
              </div>
            </div>
          `;
        }
      } else {
        devtools.open = false;
      }
    };

    const devToolsInterval = setInterval(detectDevTools, 1000);

    // Cleanup function
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('dragstart', handleDragStart);
      
      clearInterval(clearConsoleInterval);
      clearInterval(devToolsInterval);
      
      // Restore console methods
      Object.assign(console, originalConsole);
    };
  }, []);

  return null;
}