
// app/layout.tsx
import './globals.css'
import './styles/css/style.css';
import './styles/css/animate.min.css';
import './styles/css/backToTop.css';
import './styles/css/bootstrap.min.css';
import './styles/css/default.css';
import './styles/css/fontAwesome5Pro.css';
import './styles/css/preloader.css';
import './styles/css/swiper-bundle.css';
import './styles/css/meanmenu.css';
import './styles/css/owl.carousel.min.css';
import './styles/css/jquery.fancybox.min.css';
import './styles/css/elegantFont.css';


import { Inter } from 'next/font/google';

import LayoutClient from '../components/LayoutClient';
import { ClientHeader, ClientFooter } from '@/components/user/ClientHeader';  // Import the client-side header component
import LoaderWrapper from '@/components/preloader/LoaderWrapper';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'Edusm',
  description: 'Online Learning platform',
};

export default function GlobalLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body className="font-sans bg-background text-foreground">
        <LoaderWrapper>
          <ClientHeader />
          <LayoutClient>
            {children}
          </LayoutClient>
          {<ClientFooter />}
        </LoaderWrapper>
      </body>
    </html>
  );

}
