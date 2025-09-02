import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import { Card, Cards } from 'fumadocs-ui/components/card';
import { Callout } from 'fumadocs-ui/components/callout';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import { File, Files, Folder } from 'fumadocs-ui/components/files';
import * as Icons from 'lucide-react';
import type { MDXComponents } from 'mdx/types';

// use this function to get MDX components, you will need it for rendering MDX
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    // Accordion components
    Accordion,
    Accordions,
    // Card components
    Card,
    Cards,
    // Callout component
    Callout,
    // Tab components
    Tab,
    Tabs,
    // File components
    File,
    Files,
    Folder,
    // Icons from lucide-react
    ...Icons,
    ...components,
  };
}
