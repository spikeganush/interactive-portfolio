'use client';

import { useState, useEffect } from 'react';
import { useEditContext } from '@/context/edit-context';
import EditText from './edit-text';
import AddProjectTitle from '../projects/add-project-title';
import AddProjectLinks from '../projects/add-project-links';
import FileUpload from './file-upload';
import CancelButton from '../buttons/cancel-button';
import toast from 'react-hot-toast';
import SaveButton from '../buttons/save-button';
import { usePortfolioDataContext } from '@/context/portfolio-data-context';
import AddTag from '../projects/add-tag';
import Image from 'next/image';
import CloseButton from '../buttons/close-buttons';
import { deleteFile } from '@/lib/utils';
import EditionProjectTitle from '../projects/edition-project-title';
import ContainerSlide from '../motion/container-slide';
import SectionGrow from '../motion/section-grow';
import DivGrow from '../motion/div-grow';

type EditProjectsProps = {
  idToEdit?: string | null;
};

const EditProjects = ({ idToEdit = null }: EditProjectsProps) => {
  const { updateEdit, setEdit } = useEditContext();
  const { data, saveAProject, updateAProject } = usePortfolioDataContext();
  const [title, setTitle] = useState('');
  const [id, setId] = useState('');
  const [position, setPosition] = useState<number | null>(null);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [links, setLinks] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [linkType, setLinkType] = useState<'website' | 'stores' | null>(null);

  useEffect(() => {
    if (idToEdit) return;
    const timestamp = Date.now(); // Get current time in milliseconds since 1970
    const randomNum = Math.floor(Math.random() * 100000); // Generate a random number between 0 and 99999
    const uniqueId = `${timestamp}${randomNum}`; // Concatenate the two numbers
    setId(uniqueId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPosition(data.projects ? data.projects.length + 1 : 1);
  }, [data]);

  useEffect(() => {
    if (!idToEdit) return;
    if (!data.projects) return;
    const project = data.projects.find((project) => project.id === idToEdit);

    if (!project) return;
    setTitle(project.title);
    setDescription(project.description);
    setImage(project.imageUrl as string);
    setLinks(project.url as string[]);
    setTags(project.tags);
    setId(project.id);
    setPosition(project.position);
  }, [idToEdit]);

  const closeEdit = () => {
    if (idToEdit) {
      setEdit((prev) => ({
        ...prev,
        project: { ...prev.project, [idToEdit]: false },
      }));
    } else {
      updateEdit('projects', false);
    }
  };

  const handleCancelProject = async (close: boolean) => {
    try {
      if (image && !idToEdit) {
        await deleteFile(image);
        setImage('');
        toast.success('Project image deleted');
      }
    } catch (error) {
      toast.error('Error deleting project image');
    }

    if (close) {
      closeEdit();
    }
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
    if (error > 0 || !position) return;
    let res;
    if (idToEdit) {
      res = await updateAProject({
        id,
        title,
        description,
        imageUrl: image,
        url: links,
        tags,
        position,
      });
    } else {
      res = await saveAProject(
        {
          id,
          title,
          description,
          imageUrl: image,
          url: links,
          tags,
          position,
        },
        data.userId as string
      );
    }
    console.log(res);
    if (res) {
      closeEdit();
    } else {
      toast.error('Error saving project');
    }
  };

  return (
    <ContainerSlide>
      <EditionProjectTitle
        onClick={() => handleCancelProject(true)}
        id={idToEdit}
      />
      <SectionGrow className="project-section flex flex-col items-center">
        <div className="flex flex-col items-center w-full mb-3">
          <AddProjectTitle title={title} setTitle={setTitle} />
          <AddProjectLinks
            linkType={linkType}
            setLinkType={setLinkType}
            links={links}
            setLinks={setLinks}
          />

          <h1 className="text-lg my-3">Description:</h1>
          {idToEdit ? (
            description && (
              <EditText
                component="project"
                returnToProjects={setDescription}
                initialValue={description}
                project
              />
            )
          ) : (
            <EditText
              component="projects"
              returnToProjects={setDescription}
              project
            />
          )}
          <AddTag tags={tags} setTags={setTags} />
          <FileUpload
            acceptedFileTypes="image"
            fileSize={2}
            setValue={setImage}
            title="Add project image:"
            editKey="projects"
            closeEditor={false}
            onCloseButtonClick={() => handleCancelProject(true)}
            showUploadSuccess
          />
        </div>
        {image ? (
          <DivGrow
            className="flex justify-center items-center gap-2 mb-3 w-full"
            delay={0.4}
          >
            <div className="relative">
              <Image src={image} alt={title} width={200} height={200} />
              <CloseButton
                onClick={() => handleCancelProject(false)}
                className="absolute top-1 right-1"
              />
            </div>
          </DivGrow>
        ) : null}
        <div className="flex gap-3">
          <CancelButton onClick={() => handleCancelProject(true)} />
          <SaveButton onClick={handleSaveProject} />
        </div>
      </SectionGrow>
    </ContainerSlide>
  );
};

export default EditProjects;
