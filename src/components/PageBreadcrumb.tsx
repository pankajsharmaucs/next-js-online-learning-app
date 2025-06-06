// components/Breadcrumb.tsx
"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbProps {
  homeLabel?: string;
  homeHref?: string;
  pageName: string;
}

export default function PageBreadcrumb({
  homeLabel = "Home",
  homeHref = "/",
  pageName,
}: BreadcrumbProps) {
  return (
    <nav className="text-lg my-4">
      <ol className="flex items-center ps-0 space-x-1 text-gray-600 dark:text-gray-300">
        <li>
          <Link
            href={homeHref}
            className="text-white hover:underline font-medium"
          >
            {homeLabel}
          </Link>
        </li>
        <li>
          <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
        </li>
        <li className="capitalize truncate max-w-[200px] text-red-500">
          {pageName}
        </li>
      </ol>
    </nav>
  );
}
