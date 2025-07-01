
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
  metadataBase: new URL("https://www.courseworld.store"),
  title: {
    default: "CourseWorld - NCERT Study Material for Classes 5 to 12",
    template: "%s | CourseWorld",
  },
  description:
    "Access full NCERT subject-wise study material for Classes 5th to 12th. CourseWorld offers PDF notes, videos, and assignments aligned with the latest CBSE curriculum.",
  keywords: [
    "NCERT study material",
    "Class 5 to 12 notes",
    "CBSE syllabus",
    "NCERT videos",
    "free study resources",
    "NCERT PDFs",
    "Class 10 science notes",
    "Class 12 math preparation",
  ],
  openGraph: {
    title: "CourseWorld - Complete NCERT Curriculum Study Material",
    description:
      "CourseWorld provides comprehensive study resources for Class 5 to 12 students following NCERT/CBSE curriculum — including notes, videos, assignments, and more.",
    url: "https://www.courseworld.store",
    siteName: "CourseWorld",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CourseWorld - NCERT Study Resources for Classes 5-12",
    description:
      "Subject-wise PDF notes, videos, and assessments for Classes 5th to 12th — based on the NCERT syllabus.",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
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
