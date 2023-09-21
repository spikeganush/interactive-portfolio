import React from 'react';
import { motion } from 'framer-motion';
import { useEditContext } from '@/context/edit-context';
import UploadPhoto from '../edition/upload-photo';
import PhotoLoader from '../loaders/photo-loader';
import { usePortfolioDataContext } from '@/context/portfolio-data-context';
import Image from 'next/image';
import { FaUserTie } from 'react-icons/fa';
import { useLoadingContext } from '@/context/loading-context';
import { useIsOwnerContext } from '@/context/is-owner-context';
import { FiEdit } from 'react-icons/fi';

const PhotoAndUploadPhoto = () => {
  const { edit, updateEdit } = useEditContext();
  const { data } = usePortfolioDataContext();
  const { loading } = useLoadingContext();
  const { isOwner } = useIsOwnerContext();

  const handleEditPhoto = () => {
    updateEdit('photo', true);
  };
  return (
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
  );
};

export default PhotoAndUploadPhoto;
