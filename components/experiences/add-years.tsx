import React from 'react';
import DivGrow from '../motion/div-grow';
import { motion } from 'framer-motion';

type AddYearsProps = {
  yearStart: string;
  setYearStart: (yearStart: string) => void;
  yearEnd: string;
  setYearEnd: (yearEnd: string) => void;
};

export const AddYears = ({
  yearStart,
  setYearStart,
  yearEnd,
  setYearEnd,
}: AddYearsProps) => {
  return (
    <>
      <DivGrow>
        <h1 className="text-lg my-3">Add Years:</h1>
      </DivGrow>
      <motion.div className="flex gap-2 w-full sm:w-2/6">
        <DivGrow delay={0.2} className="flex-1">
          <h1 className="text-base my-3">Year Start:</h1>
          <input
            type="text"
            name="Year Start"
            placeholder={`Experience's year start`}
            className="placeholder:text-xs placeholder:sm:text-base text-xs w-full py-3 px-2 sm:p-2 sm:text-base border border-gray-300 rounded outline-none focus:border-blue-500"
            value={yearStart}
            onChange={(e) => setYearStart(e.target.value)}
          />
        </DivGrow>

        <DivGrow delay={0.3} className="flex-1">
          <h1 className="text-base my-3 text-right">Year End (optional):</h1>
          <input
            type="text"
            name="Year End"
            placeholder={`Experience's year end`}
            className="placeholder:text-xs placeholder:sm:text-base text-xs w-full py-3 px-2 sm:p-2 sm:text-base border border-gray-300 rounded outline-none focus:border-blue-500"
            value={yearEnd}
            onChange={(e) => setYearEnd(e.target.value)}
          />
        </DivGrow>
      </motion.div>
    </>
  );
};
