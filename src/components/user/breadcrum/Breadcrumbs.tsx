'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbsProps {
  titles: string[];
  links: string[]; // One less than titles.length (last item is current and not linked)
}

export default function Breadcrumbs({ titles, links }: BreadcrumbsProps) {
  return (
    <nav className="col-12" aria-label="Breadcrumb">
      <ul className="flex flex-wrap px-0 py-2 items-center text-sm text-gray-500 space-x-1 sm:space-x-2">
        {titles.map((title, index) => (
          <li key={index} className="flex items-center space-x-1">
            {index < links.length ? (
              <>
                <Link
                  href={links[index]}
                  className="text-gray-600 hover:underline capitalize"
                >
                  {title}
                </Link>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </>
            ) : (
              <span
                className="text-gray-800 font-medium capitalize"
                aria-current="page"
              >
                {title}
              </span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
