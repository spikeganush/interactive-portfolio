'use client';

import { useEditContext } from '@/context/edit-context';
import ExperiencesSection from './experiences/experiences-section';
import EditExperiences from './edition/edit-experiences';

const Experience = () => {
  const { edit } = useEditContext();

  return <>{edit.experiences ? <EditExperiences /> : <ExperiencesSection />}</>;
};

export default Experience;
