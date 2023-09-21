'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BsArrowRight, BsLinkedin } from 'react-icons/bs';
import { HiDownload } from 'react-icons/hi';
import { FaGithubSquare } from 'react-icons/fa';
import { useSectionInView } from '@/lib/hooks';
import { useActiveSectionContext } from '@/context/active-section-context';
import { PageComponentProps } from '@/types/general';
import { usePortfolioDataContext } from '@/context/portfolio-data-context';
import SignInAndColorPicker from './intro/sign-in-color-picker';
import PhotoAndUploadPhoto from './intro/photo-upload-photo';
import IntroEditIntro from './intro/intro-edit-intro';
import ButtonSection from './intro/button-section';

export default function Intro({ id }: PageComponentProps) {
  const { ref } = useSectionInView('Home', 0.5);
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
  const { data } = usePortfolioDataContext();

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
