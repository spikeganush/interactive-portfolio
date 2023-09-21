import React from 'react';
import ContentLoader from 'react-content-loader';

type UploadLoaderProps = {
  className: string;
};
const UploadLoader = ({ className }: UploadLoaderProps) => {
  return (
    <ContentLoader className={className} speed={1} width="100%">
      <rect x="75" rx="10" ry="10" width="70%" height="15" />
      <rect x="175" y="30" rx="10" ry="10" width="30%" height="15" />
    </ContentLoader>
  );
};

export default UploadLoader;
