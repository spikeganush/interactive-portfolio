'use client';

import FileUpload from './file-upload';
import { usePortfolioDataContext } from '@/context/portfolio-data-context';
import { motion } from 'framer-motion';

const UploadResume = () => {
  const { data } = usePortfolioDataContext();
  return (
    <>
      <div className="w-full flex justify-center items-center">
        <FileUpload
          title="Upload Resume"
          acceptedFileTypes="resume"
          fileSize={5}
          editKey="buttons"
          supabaseKey={'resume'}
          folder="resume"
          closeEditor={false}
          showUploadSuccess={true}
        />
      </div>
      {data.resume ? (
        <motion.a
          href={data.resume}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center text-xs sm:w-3/6 mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 125,
            delay: 0.3,
            duration: 0.7,
          }}
        >
          Actual resume:{' '}
          {data.resume.split('/')[data.resume.split('/').length - 1]}
        </motion.a>
      ) : null}
    </>
  );
};

export default UploadResume;
