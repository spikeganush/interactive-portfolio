import Header from '@/components/header';
import './globals.css';
import { Inter } from 'next/font/google';
import ActiveSectionContextProvider from '@/context/active-section-context';
import ThemeContextProvider from '@/context/theme-context';
import { Toaster } from 'react-hot-toast';
import ThemeSwitch from '@/components/theme-switch';
import Footer from '@/components/footer';
import ProviderSession from '@/components/provider';
import PortfolioDataContextProvider from '@/context/portfolio-data-context';
import IsOwnerContextProvider from '@/context/is-owner-context';
import InfoBubbleContextProvider from '@/context/info-bubble-context';
import AllProviders from '@/context/all-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Your personal portfolio',
  description: 'Customise your personal portfolio and share it with the world.',
};

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body className={`${inter.className}`}>
        <AllProviders session={session}>
          <Header />
          {children}
          <Footer />
          <Toaster position="top-right" />
          <ThemeSwitch />
        </AllProviders>
      </body>
    </html>
  );
}
