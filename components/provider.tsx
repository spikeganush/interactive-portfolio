'use client';

import React from 'react';
import { SessionProvider, SessionProviderProps } from 'next-auth/react';

type ProviderSessionProps = {
  children: React.ReactNode;
  session: SessionProviderProps['session'];
};

const ProviderSession = ({ children, session }: ProviderSessionProps) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default ProviderSession;
