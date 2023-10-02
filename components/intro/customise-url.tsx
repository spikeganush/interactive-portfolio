import { usePortfolioDataContext } from '@/context/portfolio-data-context';
import React from 'react';
import DivGrow from '../motion/div-grow';
import EditButton from '../edition/edit-button';
import { useEditContext } from '@/context/edit-context';
import EditUrl from '../edition/edit-url';

const CustomiseUrl = () => {
  const { data } = usePortfolioDataContext();
  const { edit } = useEditContext();
  return (
    <>
      {edit.customUrl ? (
        <EditUrl />
      ) : (
        <DivGrow className="mb-8">
          <p className="text-xl font-bold">
            Customise your url:
            <EditButton
              className="ml-2"
              component="customUrl"
              isAbsolute={false}
              animationType="spring"
              stiffness={125}
              delay={0.5}
              duration={0.7}
            />
          </p>
          <span>{`https://mypersonalportfolio.app/${
            data.customUrl ?? data._id
          }`}</span>
        </DivGrow>
      )}
    </>
  );
};

export default CustomiseUrl;
