import { useState, useEffect } from 'react';
import ContainerSlide from '../motion/container-slide';
import EditTitle from './edit-title';
import { useEditContext } from '@/context/edit-context';
import SectionGrow from '../motion/section-grow';
import AddProjectTitle from '../projects/add-project-title';
import { AddYears } from '../experiences/add-years';
import { getId } from '@/lib/utils';
import { usePortfolioDataContext } from '@/context/portfolio-data-context';
import EditText from './edit-text';
import ExperienceIcon from '../experiences/experience-icon';
import { ExperienceIcons } from '@/lib/data';
import CancelButton from '../buttons/cancel-button';
import SaveButton from '../buttons/save-button';
import DivGrow from '../motion/div-grow';
import { set } from 'mongoose';
import toast from 'react-hot-toast';

type EditExperiencesProps = {
  idToEdit?: string | null;
};
const EditExperiences = ({ idToEdit = null }: EditExperiencesProps) => {
  const { data, saveAnExperience, updateAnExperience } =
    usePortfolioDataContext();
  const { setEdit } = useEditContext();
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState<ExperienceIcons>('LuGraduationCap');
  const [position, setPosition] = useState<number | null>(null);

  useEffect(() => {
    if (idToEdit) return;
    const uniqueId = getId();
    setId(uniqueId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPosition(data.experiences ? data.experiences.length + 1 : 1);
  }, [data]);

  useEffect(() => {
    if (!idToEdit) return;
    if (!data.experiences) return;
    const experience = data.experiences.find(
      (experience) => experience.id === idToEdit
    );

    if (!experience) return;
    setTitle(experience.title);
    setDescription(experience.description);
    setStartYear(experience.startYear);
    setEndYear(experience.endYear || '');
    setLocation(experience.location);
    setIcon(experience.icon as ExperienceIcons);
    setId(experience.id);
    setPosition(experience.position);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idToEdit]);

  const closeEdit = () => {
    if (idToEdit) {
      setEdit((prev) => ({
        ...prev,
        experience: { ...prev.experience, [idToEdit]: false },
      }));
    } else {
      setEdit((prev) => ({ ...prev, experiences: false }));
    }
  };
  const handleCancel = () => {
    setEdit((prev) => ({ ...prev, experiences: false }));
  };

  const handleSave = async () => {
    const validationErrors = [];
    if (title === '') validationErrors.push('title');
    if (description === '<p></p>\n') validationErrors.push('description');
    if (startYear === '') validationErrors.push('startYear');
    if (location.length === 0) validationErrors.push('location');
    if (validationErrors.length > 0 || !position || !data.userId) {
      validationErrors.forEach((error) => toast.error(error));
      return;
    }

    const experienceData = {
      id,
      title,
      startYear,
      endYear,
      location,
      description,
      icon,
      position,
    };

    let res: boolean;

    if (idToEdit) {
      res = await updateAnExperience(experienceData);
    } else {
      res = await saveAnExperience(experienceData, data.userId);
    }

    if (res) {
      closeEdit();
    } else {
      toast.error('Error saving experience');
    }
  };

  return (
    <ContainerSlide>
      <EditTitle
        title={`${idToEdit ? 'Edit' : 'Add'} Experience`}
        onClick={closeEdit}
      />
      <SectionGrow className="experience-section flex flex-col items-center">
        <AddProjectTitle
          title={title}
          setTitle={setTitle}
          placeholder={`Enter your experience's title`}
        />
        <AddProjectTitle
          h1="Place:"
          title={location}
          setTitle={setLocation}
          placeholder={`Enter your experience's place`}
        />
        <AddYears
          yearStart={startYear}
          setYearStart={setStartYear}
          yearEnd={endYear}
          setYearEnd={setEndYear}
        />
        <h1 className="text-lg my-3">Description:</h1>
        <div className={`w-full ${idToEdit ? 'sm:w-full' : 'sm:w-4/6'}`}>
          {idToEdit ? (
            description && (
              <EditText
                component="experience"
                returnToProjects={setDescription}
                initialValue={description}
                project
              />
            )
          ) : (
            <EditText
              component="experiences"
              returnToProjects={setDescription}
              project
            />
          )}
        </div>
        <ExperienceIcon setIcon={setIcon} selectedIcon={icon} />
        <DivGrow delay={0.65} className="flex gap-2 mt-3 mb-6">
          <CancelButton onClick={handleCancel} />{' '}
          <SaveButton onClick={handleSave} />
        </DivGrow>
      </SectionGrow>
    </ContainerSlide>
  );
};

export default EditExperiences;
