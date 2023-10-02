'use client';

import { useState } from 'react';
import SectionHeading from './section-heading';
import { motion } from 'framer-motion';
import { useSectionInView } from '@/lib/hooks';
import { sendEmail } from '@/actions/sendEmail';
import SubmitBtn from './submit-btn';
import toast from 'react-hot-toast';
import { usePortfolioDataContext } from '@/context/portfolio-data-context';
import { useIsOwnerContext } from '@/context/is-owner-context';
import EditButton from './edition/edit-button';
import { useEditContext } from '@/context/edit-context';
import EditTitle from './edition/edit-title';
import DivGrow from './motion/div-grow';
import SectionGrow from './motion/section-grow';
import { IoIosSave } from 'react-icons/io';

const Contact = () => {
  const { ref } = useSectionInView('Contact');
  const { data, updateAndSaveOneKey } = usePortfolioDataContext();
  const { isOwner } = useIsOwnerContext();
  const { edit, setEdit } = useEditContext();
  const [newEmail, setNewEmail] = useState(data.email ?? '');
  const [saved, setSaved] = useState(false);

  const saveEmail = async () => {
    setSaved(false);
    const updated = await updateAndSaveOneKey(newEmail, 'email');
    setSaved(updated);
  };

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="mb-20 sm:mb-28 w-[min(100%,38rem)] text-center"
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      viewport={{
        once: true,
      }}
    >
      <SectionHeading>Contact me</SectionHeading>

      {edit.email ? (
        <>
          <EditTitle
            title="Edit Email"
            onClick={() => {
              setEdit({ ...edit, email: false });
            }}
          />
          <SectionGrow className="upload-section w-full" delay={0.5}>
            <input
              type="email"
              name="email"
              placeholder={`New Email`}
              className="w-5/6 sm:w-3/6 p-2 border border-gray-300 rounded outline-none focus:border-blue-500"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <button title="Save" onClick={saveEmail}>
              <IoIosSave
                className={`social-button__save${saved ? ' saved' : ''}`}
                size={'2rem'}
              />
            </button>
          </SectionGrow>
        </>
      ) : (
        <DivGrow>
          <p className="text-gray-700 -mt-6 dark:text-white/80">
            Please contact me directly at{' '}
            <a
              className="underline"
              href={`mailto:${data.email ?? 'florian.jourdain@gmail.com'}`}
            >
              {`${data.email ?? 'florian.jourdain@gmail.com'}`}
            </a>{' '}
            {isOwner ? (
              <EditButton
                className="mx-2"
                component="email"
                isAbsolute={false}
                animationType="spring"
                stiffness={125}
                delay={0.5}
                duration={0.7}
              />
            ) : null}
            or through this form.
          </p>
        </DivGrow>
      )}

      <form
        className="mt-10 flex flex-col dark:text-black"
        action={async (formData) => {
          formData.append('emailTo', data.email as string);
          const { data: _data, error } = await sendEmail(formData);

          if (error) {
            toast.error(error);
            return;
          }

          toast.success('Email sent successfully!');
          // clear the form
          const allInputs = document.querySelectorAll('input, textarea');
          allInputs.forEach((input) => {
            if (
              input instanceof HTMLInputElement ||
              input instanceof HTMLTextAreaElement
            ) {
              input.value = '';
            }
          });
        }}
      >
        <input
          className="h-14 px-4 rounded-lg borderBlack dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
          name="senderEmail"
          type="email"
          required
          maxLength={500}
          placeholder="Your email"
        />
        <textarea
          className="h-52 my-3 rounded-lg borderBlack p-4 dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
          name="message"
          placeholder="Your message"
          required
          maxLength={5000}
        />
        <SubmitBtn />
      </form>
    </motion.section>
  );
};

export default Contact;
