// app/admin/layout.tsx (Server Component)
import Sidebar from '@/components/admin/Sidebar';
import './style.css';
import { Inter, Roboto } from 'next/font/google';
import ClientLayoutWrapper from '@/components/admin/ClientLayoutWrapper';

const inter = Inter({ subsets: ['latin'] });
const roboto = Roboto({ subsets: ['latin'] });

export const metadata = {
  title: 'Admin | Courseworld',
  description: 'Online Learning platform',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`flex h-screen ${roboto.className}`}>
      <Sidebar />
      <ClientLayoutWrapper>
        {children}
      </ClientLayoutWrapper>
    </div>
  );
}
