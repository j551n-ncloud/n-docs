import type { Metadata } from 'next';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';

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

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const homeOptions = {
    ...baseOptions(),
    links: [
      {
        text: 'Homepage',
        url: 'https://j551n.com',
        external: true,
      },
      {
        text: 'Legal',
        url: 'https://j551n.com/legal',
        external: true,
      },
    ],
  };

  return (
    <HomeLayout {...homeOptions}>
      {children}
    </HomeLayout>
  );
}