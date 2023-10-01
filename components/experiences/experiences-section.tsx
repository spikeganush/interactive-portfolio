import React, { useState, useEffect } from 'react';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { experiencesData, experiencesDataIcons } from '@/lib/data';
import { useSectionInView } from '@/lib/hooks';
import { useTheme } from '@/context/theme-context';
import { usePortfolioDataContext } from '@/context/portfolio-data-context';
import SectionHeading from '../section-heading';
import ContainerSlide from '../motion/container-slide';
import EditButton from '../edition/edit-button';
import EditDeleteButtons from '../buttons/edit-delete-buttons';
import { useIsOwnerContext } from '@/context/is-owner-context';
import ConsentModal from '../consent-modal';
import toast from 'react-hot-toast';
import { useEditContext } from '@/context/edit-context';
import EditExperiences from '../edition/edit-experiences';

const ExperiencesSection = () => {
  const { ref } = useSectionInView('Experience');
  const { theme } = useTheme();
  const { data, deleteAnExperience } = usePortfolioDataContext();
  const [experiences, setExperiences] = useState(experiencesData);
  const { isOwner } = useIsOwnerContext();
  const [open, setOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');
  const { edit, setEdit } = useEditContext();

  useEffect(() => {
    if (data && data.experiences) {
      setExperiences(data.experiences);
    }
  }, [data]);

  const handleDelete = async () => {
    try {
      if (!data._id || !idToDelete)
        return toast.error('Error deleting project');

      const isProjectUpdated = await deleteAnExperience(idToDelete, data._id);
      if (isProjectUpdated) {
        toast.success('Experience deleted');
        setOpen(false);
      }
    } catch (error) {
      toast.error('Error deleting project');
    }
  };

  const handleEdit = (id: string) => {
    setEdit((prev) => ({
      ...prev,
      experience: { ...prev.experience, [id]: true },
    }));
  };

  const ReturnVerticalTimeline = () => {
    return (
      <>
        {isOwner ? (
          <ConsentModal
            title="Delete experience"
            description="Are you sure you want to delete this experience?"
            onAccept={handleDelete}
            onDecline={() => setOpen(false)}
            open={open}
          />
        ) : null}
        <VerticalTimeline lineColor="">
          {experiences.map((item, index) => (
            <VerticalTimelineElement
              key={index}
              // visible={true} //Temporary, everything is hidden on next 13.5 without that on local
              contentStyle={{
                background:
                  theme === 'light' ? '#f3f4f6' : 'rgba(255, 255, 255, 0.05)',
                boxShadow: 'none',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                textAlign: 'left',
                padding: '1.3rem 2rem',
              }}
              contentArrowStyle={{
                borderRight:
                  theme === 'light'
                    ? '0.4rem solid #9ca3af'
                    : '0.4rem solid rgba(255, 255, 255, 0.5)',
              }}
              date={
                item.endYear
                  ? item.startYear + ' - ' + item.endYear
                  : item.startYear
              }
              icon={React.createElement(experiencesDataIcons[item.icon])}
              iconStyle={{
                background: theme === 'light' ? 'white' : '#1c2432',
                fontSize: '1.5rem',
              }}
            >
              {isOwner && data.experiences && data.experiences.length > 0 ? (
                <EditDeleteButtons
                  handleEdit={() => handleEdit(item.id)}
                  handleDelete={() => {
                    setIdToDelete(item.id);
                    setOpen(true);
                  }}
                />
              ) : null}
              {edit.experience[item.id] ? (
                <EditExperiences idToEdit={item.id} />
              ) : (
                <>
                  <h3 className="font-semibold capitalize">{item.title}</h3>
                  <p className="font-normal !mt-0">{item.location}</p>
                  <p
                    className="!mt-1 !font-normal text-gray-700 dark:text-white/75"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                </>
              )}
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </>
    );
  };

  return (
    <ContainerSlide
      className="w-full scroll-mt-28 mb-28 sm:mb-40"
      ref={ref}
      id="experience"
      slide="down-up"
      delay={0.175}
    >
      <SectionHeading>
        My experience
        <EditButton
          type="add"
          className="ml-2"
          component="experiences"
          isAbsolute={false}
          animationType="spring"
          stiffness={125}
          delay={0.5}
          duration={0.7}
        />
      </SectionHeading>
      <ReturnVerticalTimeline />
    </ContainerSlide>
  );
};

export default ExperiencesSection;
