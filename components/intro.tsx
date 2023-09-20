'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BsArrowRight, BsLinkedin } from 'react-icons/bs';
import { HiDownload } from 'react-icons/hi';
import { FaGithubSquare, FaUserTie } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { useSectionInView } from '@/lib/hooks';
import { useActiveSectionContext } from '@/context/active-section-context';
import { signIn, useSession } from 'next-auth/react';
import { IntroData } from '@/lib/data';
import sanitizeHtml from 'sanitize-html';
import { PageComponentProps } from '@/types/general';
import { usePortfolioDataContext } from '@/context/portfolio-data-context';
import BgPicker from './edition/bg-picker';
import UploadPhoto from './edition/upload-photo';
import { useIsOwnerContext } from '@/context/is-owner-context';
import { useEditContext } from '@/context/edit-context';

export default function Intro({ id }: PageComponentProps) {
  const { ref } = useSectionInView('Home', 0.5);
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
  const { data } = usePortfolioDataContext();
  const { data: session } = useSession();
  const { isOwner } = useIsOwnerContext();
  const { edit, setEdit } = useEditContext();

  const handleEditPhoto = () => {
    setEdit((prev) => ({ ...prev, photo: true }));
  };

  return (
    <section
      ref={ref}
      id="home"
      className="mb-28 max-w-[50rem] text-center sm:mb-0 scroll-mt-[100rem]"
    >
      <div
        className={`flex mb-5 relative ${
          isOwner
            ? 'justify-between items-start'
            : 'justify-center items-center'
        }`}
      >
        {session?.user ? null : (
          <button
            type="button"
            onClick={() => {
              signIn('google');
            }}
            className="group bg-gray-900 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 transition"
          >
            Customise your portfolio
          </button>
        )}
        {isOwner ? <BgPicker /> : null}
      </div>
      <div className="flex items-center justify-center">
        <div className="relative">
          {edit.photo ? (
            <UploadPhoto />
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: 'tween',
                  duration: 0.2,
                }}
              >
                {data?.photo ? (
                  <img
                    src={data?.photo}
                    alt="Profile photo"
                    width="192"
                    height="192"
                    className="h-24 w-24 rounded-full object-cover border-[0.35rem] border-white shadow-xl"
                  />
                ) : (
                  <FaUserTie size="5rem" />
                )}
              </motion.div>

              <motion.span
                className="absolute bottom-0 right-0 text-4xl"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 125,
                  delay: 0.1,
                  duration: 0.7,
                }}
              >
                👋
              </motion.span>
            </>
          )}
          {isOwner ? (
            edit.photo ? null : (
              <motion.button
                className="absolute bottom-0 -right-6"
                onClick={() => handleEditPhoto()}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 125,
                  delay: 0.1,
                  duration: 0.7,
                }}
              >
                <FiEdit size="1.5rem" />
              </motion.button>
            )
          ) : null}
        </div>
      </div>

      <motion.h1
        className="mb-10 mt-4 px-4 text-2xl font-medium !leading-[1.5] sm:text-4xl"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(data?.intro ?? IntroData, {
            allowedTags: ['span'],
            allowedAttributes: {
              span: ['class'],
            },
          }),
        }}
      />

      <motion.div
        className="flex flex-col sm:flex-row items-center justify-center gap-2 px-4 text-lg font-medium"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
        }}
      >
        <Link
          href="#contact"
          className="black_round_btn"
          onClick={() => {
            setActiveSection('Contact');
            setTimeOfLastClick(Date.now());
          }}
        >
          Contact me here{' '}
          <BsArrowRight className="opacity-70 group-hover:translate-x-1 transition" />
        </Link>

        <a
          className="group bg-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10"
          href={data?.resumeUrl ?? '/'}
          download
        >
          Download CV{' '}
          <HiDownload className="opacity-60 group-hover:translate-y-1 transition" />
        </a>

        <a
          className="bg-white p-4 text-gray-700 hover:text-gray-950 flex items-center gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
          href={data?.linkedinUrl ?? 'https://www.linkedin.com/'}
          target="_blank"
        >
          <BsLinkedin />
        </a>

        <a
          className="bg-white p-4 text-gray-700 flex items-center gap-2 text-[1.35rem] rounded-full focus:scale-[1.15] hover:scale-[1.15] hover:text-gray-950 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
          href={data?.githubUrl ?? 'https://github.com'}
          target="_blank"
        >
          <FaGithubSquare />
        </a>
      </motion.div>
    </section>
  );
}
