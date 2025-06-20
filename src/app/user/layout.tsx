// app/user/layout.tsx (Server Component)
import Sidebar from '@/components/user/Sidebar';
import './style.css';
import { Inter, Roboto } from 'next/font/google';
import DashboardLayout from '@/components/user/dashboard/Dashboard-layout';
import AuthGuardWrapper from '@/components/user/AuthGuardWrapper';

const inter = Inter({ subsets: ['latin'] });
const roboto = Roboto({ subsets: ['latin'] });

export const metadata = {
  title: 'User Dashboard | Courseworld',
  description: 'Online Learning platform',
};

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`w-100 bg-black h-screen ${roboto.className}`}>
      <DashboardLayout>
        <AuthGuardWrapper>
          <div className='' style={{ margin: "0%", background: "#fff", padding: "2%" }}>
            {children}
          </div>
        </AuthGuardWrapper>
      </DashboardLayout>
    </div>
  );
}
