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


import { Inter } from 'next/font/google'
import Header from './components/header/Header';
import Footer from './components/footer/page';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata = {
  title: 'Edusm',
  description: 'Online Learning platform',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-background text-foreground`}>
        <Header />
        {children}
        <Footer />

       

      </body>
    </html>
  )
}
