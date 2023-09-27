import React from 'react';
import { motion } from 'framer-motion';
import { useEditContext } from '@/context/edit-context';
import PhotoLoader from '../loaders/photo-loader';
import { usePortfolioDataContext } from '@/context/portfolio-data-context';
import Image from 'next/image';
import { FaUserTie } from 'react-icons/fa';
import { useLoadingContext } from '@/context/loading-context';
import EditButton from '../edition/edit-button';
import FileUpload from '../edition/file-upload';
import DivGrow from '../motion/div-grow';

const PhotoAndUploadPhoto = () => {
  const { edit } = useEditContext();
  const { data } = usePortfolioDataContext();
  const { loading } = useLoadingContext();

  return (
    <div className="flex items-center justify-center">
      <div className={`relative${edit.photo ? ' w-full' : ''}`}>
        {edit.photo ? (
          <FileUpload
            acceptedFileTypes="image"
            fileSize={2}
            title="Upload photo"
            editKey="photo"
            previousUrl={data?.photo || null}
          />
        ) : (
          <>
            <DivGrow type="tween" duration={0.2}>
              {loading ? (
                <PhotoLoader className="h-24 w-24 rounded-full object-cover border-[0.35rem] border-white shadow-xl" />
              ) : data?.photo ? (
                <Image
                  src={data?.photo}
                  alt="Profile photo"
                  width="192"
                  height="192"
                  quality={95}
                  className="italic h-24 w-24 rounded-full object-cover border-[0.35rem] border-white shadow-xl"
                />
              ) : (
                <FaUserTie size="5rem" />
              )}
            </DivGrow>

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
        <EditButton
          component="photo"
          animationType="spring"
          stiffness={125}
          delay={0.1}
          duration={0.7}
        />
      </div>
    </div>
  );
};

export default PhotoAndUploadPhoto;
