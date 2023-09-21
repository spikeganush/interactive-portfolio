'use client';

import SectionHeading from '../section-heading';
import { AboutData } from '@/lib/data';
import sanitizeHtml from 'sanitize-html';
import EditButton from '../edition/edit-button';
import { usePortfolioDataContext } from '@/context/portfolio-data-context';

const AboutSection = () => {
  const { data } = usePortfolioDataContext();
  return (
    <>
      <SectionHeading>
        About me
        <EditButton
          className="ml-2"
          component="about"
          isAbsolute={false}
          type="spring"
          stiffness={125}
          delay={0.5}
          duration={0.7}
        />
      </SectionHeading>

      <span
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(data?.about ?? AboutData, {
            allowedTags: ['span', 'strong', 'em', 'p', 'ins'],
            allowedAttributes: {
              p: ['class'],
              span: ['class'],
            },
          }),
        }}
      />
    </>
  );
};

export default AboutSection;
