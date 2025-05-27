// app/user/layout.tsx (Server Component)
import Sidebar from '@/components/user/Sidebar';
import './style.css';
import { Inter, Roboto } from 'next/font/google';
import ClientLayoutWrapper from '@/components/user/ClientLayoutWrapper';

const inter = Inter({ subsets: ['latin'] });
const roboto = Roboto({ subsets: ['latin'] });

export const metadata = {
  title: 'User Dashboard | Edusm',
  description: 'Online Learning platform',
};

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`flex h-screen ${roboto.className}`}>
      {/* <Sidebar /> */}
      <ClientLayoutWrapper>
        {children}
      </ClientLayoutWrapper>
    </div>
  );
}
