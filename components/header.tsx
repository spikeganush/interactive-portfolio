'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { links } from '@/lib/data';
import Link from 'next/link';
import clsx from 'clsx';
import { useActiveSectionContext } from '@/context/active-section-context';
import { useSession } from 'next-auth/react';
import { usePortfolioDataContext } from '@/context/portfolio-data-context';
import { useTheme } from '@/context/theme-context';
import { BG_COLORS } from '@/constant/general';

const Header = () => {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();
  const { data: session } = useSession();
  const { data } = usePortfolioDataContext();
  const { theme } = useTheme();
  const [leftLightBg, setLeftLightBg] = useState<string>(
    data.leftLightBg ?? BG_COLORS.LEFT_LIGHT
  );
  const [rightLightBg, setRightLightBg] = useState<string>(
    data.rightLightBg ?? BG_COLORS.RIGHT_LIGHT
  );
  const [leftDarkBg, setLeftDarkBg] = useState<string>(
    data.leftDarkBg ?? BG_COLORS.LEFT_DARK
  );
  const [rightDarkBg, setRightDarkBg] = useState<string>(
    data.rightDarkBg ?? BG_COLORS.RIGHT_DARK
  );

  useEffect(() => {
    setLeftDarkBg(data.leftDarkBg ?? BG_COLORS.LEFT_DARK);
    setRightDarkBg(data.rightDarkBg ?? BG_COLORS.RIGHT_DARK);
    setLeftLightBg(data.leftLightBg ?? BG_COLORS.LEFT_LIGHT);
    setRightLightBg(data.rightLightBg ?? BG_COLORS.RIGHT_LIGHT);
  }, [data.leftDarkBg, data.rightDarkBg, data.leftLightBg, data.rightLightBg]);

  return (
    <>
      <div
        className="absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]"
        style={{
          backgroundColor: `#${theme === 'light' ? leftLightBg : leftDarkBg}`,
        }}
      />
      <div
        className="absolute top-[-6rem] -z-10 right-[-11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:right-[8rem] sm:right-[11rem]"
        style={{
          backgroundColor: `#${theme === 'light' ? rightLightBg : rightDarkBg}`,
        }}
      />

      <header className="z-[10] relative">
        <motion.div
          className={`fixed top-0 left-1/2 h-[4.5rem] w-full rounded-none border border-white border-opacity-40 bg-white bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] sm:top-6 sm:h-[3.25rem] ${
            session?.user ? 'sm:w-[42rem]' : 'sm:w-[36rem]'
          }  sm:rounded-full dark:bg-gray-950 dark:border-black/40 dark:bg-opacity-75`}
          initial={{ y: -100, x: '-50%', opacity: 0 }}
          animate={{ y: 0, x: '-50%', opacity: 1 }}
        ></motion.div>
        <nav className="flex fixed top-[0.15rem] left-1/2 h-12 -translate-x-1/2 py-2 sm:top-[1.7rem] sm:h-[initial] sm:py-0">
          <ul className="flex w-[22rem] flex-wrap items-center justify-center gap-y-1 text-[0.9rem] font-medium text-gray-500 sm:w-[initial] sm:flex-nowrap sm:gap-5">
            {links.map((link) => (
              <motion.li
                className="h-3/4 flex items-center justify-center relative"
                key={link.hash}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <Link
                  className={clsx(
                    'flex w-full items-center justify-center px-3 py-3 hover:text-gray-950 transition dark:text-gray-500 dark:hover:text-gray-300',
                    {
                      'text-gray-950 dark:text-gray-200':
                        activeSection === link.name,
                    }
                  )}
                  href={link.hash}
                  onClick={() => {
                    setActiveSection(link.name);
                    setTimeOfLastClick(Date.now());
                  }}
                >
                  {link.name}

                  {link.name === activeSection && (
                    <motion.span
                      className="bg-gray-100 rounded-full absolute inset-0 -z-10 dark:bg-gray-800"
                      layoutId="activeSection"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                    ></motion.span>
                  )}
                </Link>
              </motion.li>
            ))}
            {session?.user ? (
              <motion.li
                className="h-3/4 flex items-center justify-center relative"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <Link
                  href="/api/auth/signout"
                  className="flex w-full items-center justify-center px-3 py-3 hover:text-gray-950 transition dark:text-gray-500 dark:hover:text-gray-300"
                >
                  Sign out
                </Link>
              </motion.li>
            ) : null}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
