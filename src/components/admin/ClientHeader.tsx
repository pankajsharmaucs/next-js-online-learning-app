// components/ClientHeader.tsx
'use client';

import { useAdminRoute } from '@/utlis/checkAdminRoute';  // Import the client-side route check hook
import AdminHeader from './AdminHeader';  // Admin header component
import Header from '../header/Header';  // Regular header component
import AdminFooter from './AdminFooter';
import Footer from '../footer/page';

export const ClientHeader = () => {
  const isAdminRoute = useAdminRoute();  // Check if the route is for the admin section

  return isAdminRoute ? <AdminHeader /> : <Header />;
};

export const ClientFooter = () => {
  const isAdminRoute = useAdminRoute();  // Check if the route is for the admin section

  return isAdminRoute ? <AdminFooter /> : <Footer />;
};

