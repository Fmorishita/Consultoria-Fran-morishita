"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

export function Acordeon({ items }: { items: { p: string; r: string }[] }) {
  return (
    <Accordion.Root type="single" collapsible className="border-t border-borde">
      {items.map((item, indice) => (
        <Accordion.Item key={indice} value={`item-${indice}`} className="border-b border-borde">
          <Accordion.Header>
            <Accordion.Trigger className="group flex w-full items-center justify-between gap-6 py-6 text-left">
              <span className="titular titular-sm">{item.p}</span>
              <ChevronDown
                aria-hidden
                className="size-5 shrink-0 text-acento-suave transition-transform duration-300 group-data-[state=open]:rotate-180"
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden data-[state=closed]:animate-none">
            <p className="cuerpo pb-7 pr-10">{item.r}</p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
