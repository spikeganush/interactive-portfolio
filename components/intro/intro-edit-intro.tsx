'use client';

import { useEditContext } from '@/context/edit-context';
import { usePortfolioDataContext } from '@/context/portfolio-data-context';
import { IntroData } from '@/lib/data';
import EditButton from '../edition/edit-button';
import EditText from '../edition/edit-text';
import ContainerSlide from '../motion/container-slide';

const IntroEditIntro = () => {
  const { edit } = useEditContext();
  const { data } = usePortfolioDataContext();

  return (
    <div className="relative w-full">
      {edit.intro ? (
        <EditText component="intro" />
      ) : (
        <ContainerSlide
          className="portfolio-intro mb-10 mt-4 px-4 text-2xl font-medium !leading-[1.5] sm:text-4xl"
          slide="down-up"
          dangerouslySetInnerHTML={{
            __html: data?.intro ?? IntroData,
          }}
        />
      )}
      <EditButton
        component="intro"
        animationType="spring"
        position="higher"
        stiffness={125}
        delay={0.3}
        duration={0.7}
      />
    </div>
  );
};

export default IntroEditIntro;
