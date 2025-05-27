// components/admin/ClientLayoutWrapper.tsx
'use client';

import { usePathname } from 'next/navigation';

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isFullWidthPage = pathname === '/user' || pathname === '/user/login';

  return (
    <main className={`transition-all duration-300 overflow-y-auto bg-white p-8 ${isFullWidthPage ? 'w-full' : 'flex-1 '
      }`}
    >
      <section className="dashboard__area pt-50 md:pt-[100px] pb-145">
        <div className="container mx-auto">{children}</div>
      </section>
    </main>
  );
}
