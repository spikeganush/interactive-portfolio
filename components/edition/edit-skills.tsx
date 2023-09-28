import { useState } from 'react';
import ContainerSlide from '../motion/container-slide';
import { useEditContext } from '@/context/edit-context';
import { usePortfolioDataContext } from '@/context/portfolio-data-context';
import DivGrow from '../motion/div-grow';
import CloseButton from '../buttons/close-buttons';
import SaveButton from '../buttons/save-button';
import toast from 'react-hot-toast';
import EditTitle from './edit-title';

const EditSkills = () => {
  const { setEdit } = useEditContext();
  const { data, updateSkill, deleteSkill } = usePortfolioDataContext();
  const [skills, setSkills] = useState<string[]>(data.skills || []);
  const [skill, setSkill] = useState('');

  const closeEditSkillz = () => {
    setEdit((prev) => ({ ...prev, skills: false }));
  };
  const handleAddSkill = async () => {
    if (!skill || skill.trim() === '') {
      setSkill('');
      return toast.error('Please write a skill');
    }
    await updateSkill(skill);
    setSkills([...skills, skill]);
    setSkill('');
  };
  const handleRemoveSkill = async (skill: string) => {
    await deleteSkill(skill);
    setSkills(skills.filter((t) => t !== skill));
  };

  return (
    <ContainerSlide>
      <EditTitle title="Edit Skills" onClick={closeEditSkillz} />
      <DivGrow className="mb-3 w-5/6 sm:w-3/6 mx-auto" delay={0.7}>
        <h1 className="text-lg my-3">Add skills:</h1>
        <input
          type="text"
          name="Demo Website"
          placeholder={`Write skill and 👇🏻 Enter or 👇🏻 button`}
          className="w-full p-2 border border-gray-300 rounded outline-none focus:border-blue-500"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddSkill();
            }
          }}
        />
        <div className="flex justify-center w-full mt-3">
          <SaveButton onClick={handleAddSkill} />
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex justify-center items-center gap-2 bg-gray-200 rounded-2xl py-2 px-4"
            >
              <p>{skill}</p>
              <CloseButton
                onClick={() => handleRemoveSkill(skill)}
                size="1.5rem"
              />
            </div>
          ))}
        </div>
      </DivGrow>
    </ContainerSlide>
  );
};

export default EditSkills;
