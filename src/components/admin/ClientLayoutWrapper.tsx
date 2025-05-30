// components/admin/ClientLayoutWrapper.tsx
'use client';

import { usePathname } from 'next/navigation';

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isFullWidthPage = pathname === '/user' || pathname === '/user/login';

  return (
    <main
      className={`transition-all duration-300 overflow-y-auto bg-gray-100 p-8 ${
        isFullWidthPage ? 'w-full' : 'flex-1 ml-0 lg:ml-55'
      }`}
    >
      <section className="dashboard__area pt-10 md:pt-[100px] pb-145">
        <div className="container mx-auto">{children}</div>
      </section>
    </main>
  );
}
