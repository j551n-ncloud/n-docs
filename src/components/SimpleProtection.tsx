'use client';

import { useEffect } from 'react';

export function SimpleProtection() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      // Only clear console periodically - no other blocking
      const clearConsoleInterval = setInterval(() => {
        try {
          console.clear();
        } catch {
          // Ignore errors
        }
      }, 5000);

      // Override console methods
      const noop = () => {};
      console.log = noop;
      console.warn = noop;
      console.error = noop;
      console.info = noop;
      console.debug = noop;

      return () => {
        clearInterval(clearConsoleInterval);
      };
    }
  }, []);

  return null;
}