import React from 'react';
import ContentLoader from 'react-content-loader';

type PhotoLoaderProps = {
  className: string;
};
const PhotoLoader = ({ className }: PhotoLoaderProps) => {
  return (
    <ContentLoader className={className}>
      // a circle
      <circle cx="43" cy="43" r="43" />
    </ContentLoader>
  );
};

export default PhotoLoader;
