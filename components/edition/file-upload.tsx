import { useCallback, useState } from 'react';
import { useEditContext } from '@/context/edit-context';
import { useLoadingContext } from '@/context/loading-context';
import { usePortfolioDataContext } from '@/context/portfolio-data-context';
import { useSession } from 'next-auth/react';
import { FileRejection, useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import { AiFillCloseCircle } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { throwErrorAndToast } from '@/utils/generalUtilities';
import { EditStateKeys, SupabaseFieldsKeys } from '@/types/general';
import { BsPatchCheckFill } from 'react-icons/bs';
import UploadLoader from '../loaders/upload-loader';

type FileUploadProps = {
  title: string;
  editKey: EditStateKeys;
  supabaseKey?: SupabaseFieldsKeys;
  folder: string;
  acceptedFileTypes: 'image' | 'resume';
  fileSize: number;
  closeEditor?: boolean;
  showUploadSuccess?: boolean;
};

const FileUpload = ({
  title,
  editKey,
  supabaseKey = editKey as SupabaseFieldsKeys,
  folder,
  acceptedFileTypes,
  fileSize,
  closeEditor = true,
  showUploadSuccess = false,
}: FileUploadProps) => {
  const mappedFileTypes: {
    [key: string]: {
      [key: string]: string[];
    };
  } = {
    image: { 'image/*': ['.jpeg', '.png', '.jpg', '.webp'] },
    resume: { 'application/pdf': ['.pdf'] },
  };
  const extensionToTest =
    acceptedFileTypes === 'image' ? 'image/*' : 'application/pdf';
  const { updateAndSaveOneKey } = usePortfolioDataContext();
  const { data: session } = useSession();
  const { updateEdit } = useEditContext();
  const { setLoading, loading } = useLoadingContext();
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const onReject = useCallback((rejectedFiles: FileRejection[]) => {
    setUploadSuccess(false);
    if (rejectedFiles.length > 1) {
      return throwErrorAndToast('Only one file can be uploaded at a time');
    }
    if (rejectedFiles[0].file.size > fileSize * 1024 * 1024) {
      return throwErrorAndToast(`File size must be less than ${fileSize}MB`);
    }
    const fileExtension = rejectedFiles[0].file.name
      .split('.')
      .pop()
      ?.toLowerCase();
    if (
      !mappedFileTypes[acceptedFileTypes][extensionToTest]?.includes(
        `.${fileExtension}`
      )
    ) {
      return throwErrorAndToast(
        `File type must be ${mappedFileTypes[acceptedFileTypes][
          extensionToTest
        ].join(', ')}`
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setUploadSuccess(false);
    try {
      if (closeEditor) {
        updateEdit(editKey, false);
      }
      setLoading(true);
      if (!acceptedFiles.length) {
        return throwErrorAndToast('No files were uploaded');
      }

      const data = new FormData();
      if (!acceptedFiles[0] || !session?.user) return;
      data.append('file', acceptedFiles[0]);
      data.append('folder', folder);
      const res = await fetch(`/api/upload/${session.user.id}`, {
        method: 'POST',
        body: data,
      });
      if (res.ok) {
        const json = await res.json();
        const filePath = json.secure_url;
        updateAndSaveOneKey(filePath, supabaseKey);
        toast.success('File uploaded successfully');
        setUploadSuccess(true);
        setLoading(false);
      }
    } catch (error) {
      updateEdit(editKey, true);
      console.log(error);
      setLoading(false);
      setUploadSuccess(false);
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
    accept: mappedFileTypes[acceptedFileTypes],
    multiple: false,
    onDropRejected: onReject,
    onDropAccepted: onDrop,
  });

  return (
    <motion.section
      className="upload-section w-full"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 125,
        delay: 0.1,
        duration: 0.7,
      }}
    >
      <div className="flex justify-center items-center gap-2 mb-3">
        <h1 className="text-lg">{title}</h1>
        <button onClick={() => updateEdit(editKey, false)}>
          <AiFillCloseCircle size="2rem" />
        </button>
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        {loading ? (
          <UploadLoader className="bg-white border-gray-900 border-2 border-dashed rounded-lg pt-10 sm:w-4/6 dark:bg-white/10 h-[148px] sm:h-[120px]" />
        ) : (
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            {isDragAccept && <p>All files will be accepted</p>}
            {isDragReject && <p>Some files will be rejected</p>}
            {!isDragActive && (
              <>
                <p>
                  Drag 'n' drop a{' '}
                  {mappedFileTypes[acceptedFileTypes][extensionToTest].join(
                    ', '
                  )}{' '}
                  here, or click to select one
                </p>
                <p className="text-xs">(Less than {fileSize}MB)</p>
              </>
            )}
            {showUploadSuccess ? (
              <div
                className={`badge__upload-success${
                  uploadSuccess ? ' open' : ''
                }`}
              >
                <BsPatchCheckFill className="text-green-500 text-2xl ml-2" />
              </div>
            ) : null}
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default FileUpload;