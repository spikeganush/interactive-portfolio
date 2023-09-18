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
        <ProviderSession session={session}>
          <ThemeContextProvider>
            <PortfolioDataContextProvider>
              <ActiveSectionContextProvider>
                <Header />
                {children}
                <Footer />
                <Toaster position="top-right" />
                <ThemeSwitch />
              </ActiveSectionContextProvider>
            </PortfolioDataContextProvider>
          </ThemeContextProvider>
        </ProviderSession>
      </body>
    </html>
  );
}
