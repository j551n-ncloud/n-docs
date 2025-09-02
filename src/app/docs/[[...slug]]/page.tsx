import { source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/page';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { getMDXComponents } from '@/mdx-components';

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const page = source.getPage(resolvedParams.slug);

  if (!page) {
    notFound();
  }

  const MDXContent = page.data.body;

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      lastUpdate={page.data.lastModified}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      {page.data.description && (
        <DocsDescription>{page.data.description}</DocsDescription>
      )}
      <DocsBody>
        <MDXContent
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  try {
    return source.generateParams();
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const page = source.getPage(resolvedParams.slug);

  if (!page) {
    return {
      title: 'Page Not Found',
      description: 'The requested documentation page could not be found.',
    };
  }

  const title = page.data.title;
  const description = page.data.description || 'N-Docs - Homelab Documentation';
  const slug = resolvedParams.slug?.join('/') || '';

  return {
    title: title ? `${title} | N-Docs` : 'N-Docs',
    description,
    keywords: [
      'homelab',
      'documentation',
      'proxmox',
      'docker',
      'kubernetes',
      'nextcloud',
      'infrastructure',
      'self-hosted',
    ],
    authors: [{ name: 'N-Docs Team' }],
    openGraph: {
      title: title ? `${title} | N-Docs` : 'N-Docs',
      description,
      type: 'article',
      url: `https://your-domain.com/docs/${slug}`,
      siteName: 'N-Docs',
    },
    twitter: {
      card: 'summary_large_image',
      title: title ? `${title} | N-Docs` : 'N-Docs',
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
