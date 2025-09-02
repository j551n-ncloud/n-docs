import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { source } from '@/lib/source';
import { Server, Terminal, Code, BookOpen } from 'lucide-react';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <DocsLayout 
      tree={source.pageTree} 
      {...baseOptions()}
      sidebar={{
        tabs: {
          transform: (option, node) => {
            // Get the section path to determine color
            const meta = source.getNodeMeta(node);
            const sectionPath = meta?.path?.split('/')[0] || '';
            
            // Define colors for each section
            const getColorForSection = (path: string) => {
              switch (path) {
                case 'documentation':
                  return 'rgb(59, 130, 246)'; // Blue
                case 'software':
                  return 'rgb(34, 197, 94)'; // Green
                case 'scripts':
                  return 'rgb(168, 85, 247)'; // Purple
                case 'knowledge':
                  return 'rgb(249, 115, 22)'; // Orange
                default:
                  return 'rgb(107, 114, 128)'; // Gray
              }
            };

            // Get icon for each section
            const getIconForSection = (title: string) => {
              switch (title) {
                case 'Infrastructure':
                case 'Documentation':
                  return <Server className="size-full" />;
                case 'Software':
                  return <Code className="size-full" />;
                case 'Automation':
                case 'Scripts':
                  return <Terminal className="size-full" />;
                case 'Knowledge Base':
                case 'Knowledge & Troubleshooting':
                  return <BookOpen className="size-full" />;
                default:
                  return <Server className="size-full" />;
              }
            };

            const color = getColorForSection(sectionPath);
            const icon = getIconForSection(option.title);

            return {
              ...option,
              icon: (
                <div
                  className="size-full rounded-lg text-[--tab-color] max-md:bg-[--tab-color]/10 max-md:border max-md:p-1.5 [&_svg]:size-full"
                  style={{
                    '--tab-color': color,
                  } as React.CSSProperties}
                >
                  {icon}
                </div>
              ),
            };
          },
        },
      }}
    >
      {children}
    </DocsLayout>
  );
}
