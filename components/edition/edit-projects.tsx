'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useEditContext } from '@/context/edit-context';
import EditText from './edit-text';
import AddProjectTitle from '../projects/add-project-title';
import AddProjectLinks from '../projects/add-project-links';
import FileUpload from './file-upload';
import CancelButton from '../buttons/cancel-button';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import SaveButton from '../buttons/save-button';
import { usePortfolioDataContext } from '@/context/portfolio-data-context';
import AddTag from '../projects/add-tag';
import Image from 'next/image';
import CloseButton from '../buttons/close-buttons';

const EditProjects = () => {
  const { updateEdit } = useEditContext();
  const { data: session } = useSession();
  const { data, saveAProject } = usePortfolioDataContext();
  const [title, setTitle] = useState('');
  const [id, setId] = useState('');
  const [position, setPosition] = useState<number | null>(null);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [links, setLinks] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [linkType, setLinkType] = useState<'website' | 'stores' | null>(null);

  useEffect(() => {
    const timestamp = Date.now(); // Get current time in milliseconds since 1970
    const randomNum = Math.floor(Math.random() * 100000); // Generate a random number between 0 and 99999
    const uniqueId = `${timestamp}${randomNum}`; // Concatenate the two numbers
    setId(uniqueId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPosition(data.projects ? data.projects.length + 1 : 1);
  }, [data]);

  const handleCancelProject = async (close: boolean) => {
    if (image && id && session?.user?.id) {
      const res = await fetch(
        `/api/cloudinary/project/${session.user.id}/${id}`,
        {
          method: 'DELETE',
        }
      );
      if (res.ok) {
        setImage('');
        toast.success('Project image deleted');
      }
    }
    close && updateEdit('projects', false);
  };

  const handleSaveProject = async () => {
    let error = 0;
    if (title === '') {
      toast.error('Please enter a title');
      error++;
    }
    if (description === '<p></p>\n') {
      toast.error('Please enter a description');
      error++;
    }
    if (image === '') {
      toast.error('Please upload an image');
      error++;
    }
    if (tags.length === 0) {
      toast.error('Please add at least one tag');
      error++;
    }
    if (error > 0) return;
    const res = await saveAProject({
      id,
      title,
      description,
      imageUrl: image,
      url: links,
      tags,
      position,
    });
    if (res) {
      toast.success('Project saved');
      updateEdit('projects', false);
    } else {
      toast.error('Error saving project');
    }
  };

  return (
    <motion.section
      className="my-5 w-full"
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <motion.div
        className="flex justify-center items-center gap-2 mb-3 w-full"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 125,
          delay: 0.4,
          duration: 0.7,
        }}
      >
        <h1 className="text-lg">Add/Edit Projects</h1>
        <CloseButton onClick={() => handleCancelProject(true)} />
      </motion.div>
      <motion.section
        className="project-section flex flex-col items-center"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 125,
          delay: 0.3,
          duration: 0.7,
        }}
      >
        <motion.div className="flex flex-col items-center w-full mb-3">
          <AddProjectTitle title={title} setTitle={setTitle} />
          <AddProjectLinks
            linkType={linkType}
            setLinkType={setLinkType}
            links={links}
            setLinks={setLinks}
          />

          <h1 className="text-lg my-3">Description:</h1>
          <EditText
            component="projects"
            returnToProjects={setDescription}
            project
          />
          <AddTag tags={tags} setTags={setTags} />
          <FileUpload
            acceptedFileTypes="image"
            fileSize={2}
            folder="projects"
            setValue={setImage}
            title="Add project image:"
            editKey="projects"
            closeEditor={false}
            showUploadSuccess
            id={id}
            onCloseButtonClick={() => handleCancelProject(true)}
          />
        </motion.div>
        {image ? (
          <motion.div
            className="flex justify-center items-center gap-2 mb-3 w-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 125,
              delay: 0.4,
              duration: 0.7,
            }}
          >
            <div className="relative">
              <Image src={image} alt={title} width={200} height={200} />
              <CloseButton
                onClick={() => handleCancelProject(false)}
                className="absolute top-1 right-1"
              />
            </div>
          </motion.div>
        ) : null}
        <div className="flex gap-3">
          <CancelButton onClick={() => handleCancelProject(true)} />
          <SaveButton onClick={handleSaveProject} />
        </div>
      </motion.section>
    </motion.section>
  );
};

export default EditProjects;
