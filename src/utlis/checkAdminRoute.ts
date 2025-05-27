// utils/checkAdminRoute.ts
'use client';

import { usePathname } from 'next/navigation';

export function useAdminLoginRoute() {
  const pathname = usePathname();
  return pathname.startsWith('/admin/login');
}

export function useAdminRoute() {
  const pathname = usePathname();
  return pathname.startsWith('/admin');
}

export function useUserRoute() {
  const pathname = usePathname();
  return pathname.startsWith('/user');
}