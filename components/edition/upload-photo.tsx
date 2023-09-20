'use client';
import { useEffect } from 'react';
import { usePortfolioDataContext } from '@/context/portfolio-data-context';
import useSaveDataDb from '@/hooks/useSaveDataDb';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useEditContext } from '@/context/edit-context';

const UploadPhoto = () => {
  const { data, setData } = usePortfolioDataContext();
  const { data: session } = useSession();
  const { saveDataDb } = useSaveDataDb();
  const { setEdit } = useEditContext();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      const data = new FormData();
      if (!acceptedFiles[0] || !session?.user) return;
      data.append('file', acceptedFiles[0]);

      const res = await fetch(`/api/upload/${session.user.id}`, {
        method: 'POST',
        body: data,
      });
      if (res.ok) {
        const json = await res.json();
        const photoPath = json.path;
        setData((prev) => {
          saveDataDb({ ...prev, photo: photoPath });
          return { ...prev, photo: photoPath };
        });
        toast.success('File uploaded successfully');

        setEdit((prev) => ({ ...prev, photo: false }));
      } else {
        toast.error('File upload failed');
      }
    } catch (error) {
      console.log(error);
      toast.error('File upload failed');
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
    maxSize: 2 * 1024 * 1024,
    onDrop: onDrop,
  });

  const handleCloseEdit = () => {
    setEdit((prev) => ({ ...prev, photo: false }));
  };

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
        <button onClick={handleCloseEdit}>
          <AiFillCloseCircle size="2rem" />
        </button>
      </div>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        {isDragAccept && <p>All files will be accepted</p>}
        {isDragReject && <p>Some files will be rejected</p>}
        {!isDragActive && (
          <p>Drag 'n' drop an image here, or click to select one</p>
        )}
      </div>
    </motion.section>
  );
};

export default UploadPhoto;
