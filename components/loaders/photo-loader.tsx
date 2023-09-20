import React from 'react';
import ContentLoader from 'react-content-loader';

type PhotoLoaderProps = {
  className: string;
};
const PhotoLoader = ({ className }: PhotoLoaderProps) => {
  return (
    <ContentLoader className={className}>
      <rect x="0" y="0" rx="5" ry="5" width="96" height="96" />
    </ContentLoader>
  );
};

export default PhotoLoader;
