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

const ExperiencesSection = () => {
  const { ref } = useSectionInView('Experience');
  const { theme } = useTheme();
  const { data } = usePortfolioDataContext();
  const [experiences, setExperiences] = useState(experiencesData);

  useEffect(() => {
    if (data && data.experiences) {
      setExperiences(data.experiences);
    }
  }, [data]);

  const ReturnVerticalTimeline = () => {
    return (
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
            <h3 className="font-semibold capitalize">{item.title}</h3>
            <p className="font-normal !mt-0">{item.location}</p>
            <p
              className="!mt-1 !font-normal text-gray-700 dark:text-white/75"
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
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
