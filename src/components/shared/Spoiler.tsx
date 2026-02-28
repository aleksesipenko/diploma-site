import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SpoilerProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

const Spoiler: React.FC<SpoilerProps> = ({ title, children, defaultOpen, className }) => {
  return (
    <Accordion.Root
      type="single"
      collapsible
      defaultValue={defaultOpen ? 'item-1' : undefined}
      className={cn('border border-border rounded-lg overflow-hidden bg-surface shadow-sm', className)}
    >
      <Accordion.Item value="item-1">
        <Accordion.Header>
          <Accordion.Trigger className="flex w-full items-center justify-between px-4 py-3 text-left font-medium text-text-primary hover:bg-bg/50 transition-colors group">
            <span>{title}</span>
            <ChevronDown className="h-5 w-5 text-text-secondary transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="px-4 py-3 border-t border-border bg-white text-text-secondary overflow-hidden data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown">
          <div className="py-1">{children}</div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};

export default Spoiler;
