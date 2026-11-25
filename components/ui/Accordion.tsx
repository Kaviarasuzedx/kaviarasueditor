import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export type AccordionItem = {
  id: string;
  question: string;
  answer: string;
};

/** Native details/summary: keyboard and screen-reader support without JS. */
export function Accordion({ items, className }: { items: AccordionItem[]; className?: string }) {
  return (
    <div className={cn("divide-y divide-stroke border-y border-stroke", className)}>
      {items.map(({ id, question, answer }) => (
        <details key={id} className="group py-1">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-base font-medium text-foreground marker:hidden focus-visible:rounded focus-visible:outline-offset-4 [&::-webkit-details-marker]:hidden">
            <span>{question}</span>
            <Plus aria-hidden="true" className="h-5 w-5 shrink-0 text-accent transition-transform duration-200 group-open:rotate-45" />
          </summary>
          <p className="max-w-2xl pb-6 pr-8 text-sm leading-7 text-secondary">{answer}</p>
        </details>
      ))}
    </div>
  );
}
