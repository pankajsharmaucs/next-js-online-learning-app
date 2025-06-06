'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbList,
} from '@/components/ui/breadcrumb';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface BreadcrumbsProps {
  titles: string[];
  links: string[]; // One less than titles.length (last item is current and not linked)
}

export default function Breadcrumbs({ titles, links }: BreadcrumbsProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {titles.map((title, index) => (
          <BreadcrumbItem key={index}>
            {index < links.length ? (
              <BreadcrumbLink asChild>
                <Link
                  href={links[index]}
                  className="text-gray-600 text-sm hover:underline capitalize"
                >
                  {title}
                </Link>
              </BreadcrumbLink>
            ) : (
              <BreadcrumbLink className="text-gray-700 text-sm capitalize" aria-current="page">
                {title}
              </BreadcrumbLink>
            )}
            {index < titles.length - 1 && (
              <BreadcrumbSeparator>
                <ChevronRight className="w-4 h-4" />
              </BreadcrumbSeparator>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>

  );
}
