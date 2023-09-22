import React from 'react';
import ActiveSectionContextProvider from '@/context/active-section-context';
import ThemeContextProvider from '@/context/theme-context';
import PortfolioDataContextProvider from '@/context/portfolio-data-context';
import IsOwnerContextProvider from '@/context/is-owner-context';
import InfoBubbleContextProvider from '@/context/info-bubble-context';
import ProviderSession from '@/components/provider';
import EditContextProvider from './edit-context';
import LoadingContextProvider from './loading-context';

const AllProviders = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) => {
  return (
    <ProviderSession session={session}>
      <PortfolioDataContextProvider>
        <LoadingContextProvider>
          <EditContextProvider>
            <InfoBubbleContextProvider>
              <ThemeContextProvider>
                <ActiveSectionContextProvider>
                  <IsOwnerContextProvider>{children}</IsOwnerContextProvider>
                </ActiveSectionContextProvider>
              </ThemeContextProvider>
            </InfoBubbleContextProvider>
          </EditContextProvider>
        </LoadingContextProvider>
      </PortfolioDataContextProvider>
    </ProviderSession>
  );
};

export default AllProviders;
