// components/ClientHeader.tsx
'use client';

import { useAdminRoute, useUserRoute } from '@/utlis/checkAdminRoute';  // Import the client-side route check hook
import HeaderWithSidebar from './sidebar/HeaderWithSidebar';
import Footer from '../footer/page';
import Header from '../header/Header';
import AdminHeader from '../admin/AdminHeader';

export const ClientHeader = () => {
  const isUserRoute = useUserRoute();
  const isAdminRoute = useAdminRoute();
  return isAdminRoute ? <AdminHeader/> : isUserRoute ? <HeaderWithSidebar /> : <Header />;
};

export const ClientFooter = () => {
  const isUserRoute = useUserRoute();
  const isAdminRoute = useAdminRoute();
  return isUserRoute ? <></> : <Footer />;
};

