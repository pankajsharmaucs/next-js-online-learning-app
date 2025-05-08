// components/admin/ClientLayoutWrapper.tsx
'use client';

import { usePathname } from 'next/navigation';

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isFullWidthPage = pathname === '/admin' || pathname === '/admin/login';

  return (
    <main
      className={`transition-all duration-300 overflow-y-auto bg-gray-50 p-8 ${
        isFullWidthPage ? 'w-full' : 'flex-1 ml-0 lg:ml-55'
      }`}
    >
      <section className="dashboard__area pt-100 md:pt-[300px] pb-145">
        <div className="container mx-auto">{children}</div>
      </section>
    </main>
  );
}
