import EditSocials from './edit-socials';
import UploadResume from './upload-resume';

const EditResumeAndLinks = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <UploadResume />
      <EditSocials />
    </div>
  );
};

export default EditResumeAndLinks;
