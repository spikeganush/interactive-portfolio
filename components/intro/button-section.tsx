import { BsArrowRight, BsLinkedin } from 'react-icons/bs';
import { FaGithubSquare } from 'react-icons/fa';
import { HiDownload } from 'react-icons/hi';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useActiveSectionContext } from '@/context/active-section-context';
import { usePortfolioDataContext } from '@/context/portfolio-data-context';
import EditButton from '../edition/edit-button';
import { useEditContext } from '@/context/edit-context';
import EditResumeAndLinks from '../edition/edit-resume-links';

const ButtonSection = () => {
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
  const { data } = usePortfolioDataContext();
  const { edit } = useEditContext();
  return (
    <>
      {edit.buttons ? (
        <EditResumeAndLinks />
      ) : (
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
            href={data?.resume ?? '/'}
            download
            target="_blank"
          >
            Download CV{' '}
            <HiDownload className="opacity-60 group-hover:translate-y-1 transition" />
          </a>

          <a
            title="LinkedIn"
            className="bg-white p-4 text-gray-700 hover:text-gray-950 flex items-center gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
            href={data?.linkedin ?? 'https://www.linkedin.com/'}
            target="_blank"
          >
            <BsLinkedin />
          </a>

          <a
            title="GitHub"
            className="bg-white p-4 text-gray-700 flex items-center gap-2 text-[1.35rem] rounded-full focus:scale-[1.15] hover:scale-[1.15] hover:text-gray-950 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
            href={data?.github ?? 'https://github.com'}
            target="_blank"
          >
            <FaGithubSquare />
          </a>
          <EditButton
            component="buttons"
            position="higher"
            animationType="spring"
            stiffness={125}
            delay={0.4}
            duration={0.7}
            isAbsolute={false}
          />
        </motion.div>
      )}
    </>
  );
};

export default ButtonSection;
