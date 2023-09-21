'use client';

import { useSectionInView } from '@/lib/hooks';
import { PageComponentProps } from '@/types/general';
import SignInAndColorPicker from './intro/sign-in-color-picker';
import PhotoAndUploadPhoto from './intro/photo-upload-photo';
import IntroEditIntro from './intro/intro-edit-intro';
import ButtonSection from './intro/button-section';

export default function Intro({ id }: PageComponentProps) {
  const { ref } = useSectionInView('Home', 0.5);

  return (
    <section
      ref={ref}
      id="home"
      className="mb-28 max-w-[50rem] text-center sm:mb-0 scroll-mt-[100rem]"
    >
      <SignInAndColorPicker id={id} />
      <PhotoAndUploadPhoto />
      <IntroEditIntro />
      <ButtonSection />
    </section>
  );
}
