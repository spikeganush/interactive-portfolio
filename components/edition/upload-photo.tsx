'use client';

import { usePortfolioDataContext } from '@/context/portfolio-data-context';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useEditContext } from '@/context/edit-context';
import { useLoadingContext } from '@/context/loading-context';
import { throwErrorAndToast } from '@/utils/generalUtilities';

const UploadPhoto = () => {
  const { updateAndSaveOneKey } = usePortfolioDataContext();
  const { data: session } = useSession();
  const { updateEdit } = useEditContext();
  const { setLoading } = useLoadingContext();
  const fileSize = 2;

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      updateEdit('photo', false);
      setLoading(true);
      if (!acceptedFiles.length) {
        return throwErrorAndToast('No files were uploaded');
      }
      if (acceptedFiles.length > 1) {
        return throwErrorAndToast('Only one file can be uploaded at a time');
      }
      if (acceptedFiles[0].size > fileSize * 1024 * 1024) {
        return throwErrorAndToast(`File size must be less than ${fileSize}MB`);
      }
      const data = new FormData();
      if (!acceptedFiles[0] || !session?.user) return;
      data.append('file', acceptedFiles[0]);

      const res = await fetch(`/api/upload/${session.user.id}`, {
        method: 'POST',
        body: data,
      });
      if (res.ok) {
        const json = await res.json();
        const photoPath = json.secure_url;
        updateAndSaveOneKey(photoPath, 'photo');
        toast.success('File uploaded successfully');
        setLoading(false);
      }
    } catch (error) {
      updateEdit('photo', true);
      console.log(error);
      toast.error('File upload failed');
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg', '.webp'],
    },
    multiple: false,
    onDrop: onDrop,
  });

  return (
    <motion.section
      className="upload-photo"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 125,
        delay: 0.1,
        duration: 0.7,
      }}
    >
      <div className="flex justify-center items-center gap-2 mb-3 w-auto sm:w-[35rem]">
        <h1 className="text-lg">Upload Photo</h1>
        <button onClick={() => updateEdit('photo', false)}>
          <AiFillCloseCircle size="2rem" />
        </button>
      </div>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        {isDragAccept && <p>All files will be accepted</p>}
        {isDragReject && <p>Some files will be rejected</p>}
        {!isDragActive && (
          <>
            <p>Drag 'n' drop an image here, or click to select one</p>
            <p className="text-xs">(Less than 2MB)</p>
          </>
        )}
      </div>
    </motion.section>
  );
};

export default UploadPhoto;
