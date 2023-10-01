'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { IoLogoGooglePlaystore, IoLogoAppleAppstore } from 'react-icons/io5';
import { project } from '@/types/general';
import Image from 'next/image';
import CloseButton from './buttons/close-buttons';
import ConsentModal from './consent-modal';
import { usePortfolioDataContext } from '@/context/portfolio-data-context';
import { deleteFile } from '@/lib/utils';
import toast from 'react-hot-toast';
import { useIsOwnerContext } from '@/context/is-owner-context';
import { FiEdit } from 'react-icons/fi';
import { useEditContext } from '@/context/edit-context';
import EditProjects from './edition/edit-projects';
import EditDeleteButtons from './buttons/edit-delete-buttons';

const Project = ({
  _id,
  id,
  title,
  description,
  tags,
  url,
  imageUrl,
}: project) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['0 1', '1.33 1'],
  });

  const scaleProgess = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgess = useTransform(scrollYProgress, [0, 1], [0.6, 1]);
  const [open, setOpen] = useState(false);
  const { data, deleteAProject } = usePortfolioDataContext();
  const { isOwner } = useIsOwnerContext();
  const { edit, setEdit } = useEditContext();

  const handleDelete = async () => {
    try {
      if (!data.projects || !data._id || !id)
        return toast.error('Error deleting project');

      const isProjectUpdated = await deleteAProject(id, data._id);
      if (isProjectUpdated) {
        await deleteFile(imageUrl as string);
        toast.success('Project deleted');
        setOpen(false);
      }
    } catch (error) {
      toast.error('Error deleting project');
    }
  };

  const handleProjectEdit = (id: string) => {
    setEdit((prev) => ({ ...prev, project: { ...prev.project, [id]: true } }));
  };

  return (
    <>
      {isOwner ? (
        <ConsentModal
          title="Delete project"
          description="Are you sure you want to delete this project?"
          onAccept={handleDelete}
          onDecline={() => setOpen(false)}
          open={open}
        />
      ) : null}
      {edit.project[id ?? _id] ? (
        <EditProjects idToEdit={id ?? _id} />
      ) : (
        <>
          <motion.div
            ref={ref}
            style={{
              scale: scaleProgess,
              opacity: opacityProgess,
            }}
            className="group mb-3 sm:mb-8 last:mb-0 w-full sm:w-5/6"
          >
            <section className="bg-gray-100 w-full border border-black/5 rounded-lg overflow-hidden sm:pr-8 relative sm:h-[25rem] hover:bg-gray-200 transition sm:group-even:pl-8 dark:text-white dark:bg-white/10 dark:hover:bg-white/20">
              {isOwner && data.projects && data.projects.length > 0 ? (
                <EditDeleteButtons
                  handleEdit={() => handleProjectEdit(id ?? _id)}
                  handleDelete={() => setOpen(true)}
                />
              ) : null}
              <div className="pt-4 pb-7 px-5 sm:pl-10 sm:pr-2 sm:pt-10 sm:max-w-[50%] flex flex-col h-full sm:group-even:ml-[18rem]">
                <h3 className="text-2xl font-semibold">{title}</h3>
                <p
                  className="mt-2 leading-relaxed text-gray-700 dark:text-white/70"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
                <p className="mt-4">
                  {url?.length === 1 ? (
                    <a href={url[0]} target="_blank" className="font-bold">
                      {url[0]}
                    </a>
                  ) : (
                    url?.map((link, index) => (
                      <a
                        title={
                          link.includes('play.google.com')
                            ? 'Play Store'
                            : 'App Store'
                        }
                        href={link}
                        target="_blank"
                        key={`${link}${index}`}
                      >
                        {link.includes('play.google.com') ? (
                          <IoLogoGooglePlaystore className="text-gray-700 text-4xl inline-block mr-6 mt-4 dark:text-white/70" />
                        ) : (
                          <IoLogoAppleAppstore className="text-gray-700 text-4xl inline-block mt-4 dark:text-white/70" />
                        )}
                      </a>
                    ))
                  )}
                </p>
                <ul className="flex flex-wrap mt-4 gap-2 sm:mt-auto">
                  {tags?.map((tag, index) => (
                    <li
                      className="bg-black/[0.7] px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white rounded-full dark:text-white/70"
                      key={index}
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>

              <Image
                src={imageUrl ?? null}
                alt="Project I worked on"
                width={440}
                height={480}
                quality={95}
                className="absolute hidden sm:block top-8 -right-40 w-[28.25rem] rounded-t-lg shadow-2xl
        transition 
        group-hover:scale-[1.04]
        group-hover:-translate-x-3
        group-hover:translate-y-3
        group-hover:-rotate-2

        group-even:group-hover:translate-x-3
        group-even:group-hover:translate-y-3
        group-even:group-hover:rotate-2

        group-even:right-[initial] group-even:-left-40"
              />
            </section>
          </motion.div>
        </>
      )}
    </>
  );
};

export default Project;
