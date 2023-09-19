import React from 'react';
import ActiveSectionContextProvider from '@/context/active-section-context';
import ThemeContextProvider from '@/context/theme-context';
import PortfolioDataContextProvider from '@/context/portfolio-data-context';
import IsOwnerContextProvider from '@/context/is-owner-context';
import InfoBubbleContextProvider from '@/context/info-bubble-context';
import ProviderSession from '@/components/provider';

const AllProviders = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) => {
  return (
    <ProviderSession session={session}>
      <InfoBubbleContextProvider>
        <ThemeContextProvider>
          <PortfolioDataContextProvider>
            <ActiveSectionContextProvider>
              <IsOwnerContextProvider>{children}</IsOwnerContextProvider>
            </ActiveSectionContextProvider>
          </PortfolioDataContextProvider>
        </ThemeContextProvider>
      </InfoBubbleContextProvider>
    </ProviderSession>
  );
};

export default AllProviders;
