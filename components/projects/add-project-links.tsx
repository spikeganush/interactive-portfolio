import { motion } from 'framer-motion';
import { SetStateAction, Dispatch } from 'react';
import CancelButton from '../buttons/cancel-button';
import DivGrow from '../motion/div-grow';
type AddProjectLinksProps = {
  links: string[];
  setLinks: Dispatch<SetStateAction<string[]>>;
  linkType: 'website' | 'stores' | null;
  setLinkType: Dispatch<SetStateAction<'website' | 'stores' | null>>;
};

const AddProjectLinks = ({
  links,
  setLinks,
  linkType,
  setLinkType,
}: AddProjectLinksProps) => {
  return (
    <>
      <DivGrow>
        <h1 className="text-lg my-3">Add demo link(s):</h1>
      </DivGrow>
      <div className="mb-3 flex flex-col items-center w-full">
        {linkType ? (
          linkType === 'website' ? (
            <DivGrow delay={0.2} className="w-5/6 sm:w-3/6">
              <h1 className="text-lg my-3">Demo Website:</h1>
              <input
                type="text"
                name="Demo Website"
                placeholder={`Enter your project's demo`}
                className="w-full p-2 border border-gray-300 rounded outline-none focus:border-blue-500"
                value={links[0] || ''}
                onChange={(e) => setLinks([e.target.value])}
              />
            </DivGrow>
          ) : (
            <motion.div className="flex gap-2 w-full sm:w-5/6">
              <DivGrow delay={0.2} className="flex-1">
                <h1 className="text-base my-3">Demo Play Store:</h1>
                <input
                  type="text"
                  name="Demo Play Store"
                  placeholder={`Enter your project's demo`}
                  className="placeholder:text-xs placeholder:sm:text-base text-xs w-full py-3 px-2 sm:p-2 sm:text-base border border-gray-300 rounded outline-none focus:border-blue-500"
                  value={links[0]}
                  onChange={(e) => setLinks([e.target.value])}
                />
              </DivGrow>

              <DivGrow delay={0.3} className="flex-1">
                <h1 className="text-base my-3 text-right">Demo App Store:</h1>
                <input
                  type="text"
                  name="Demo App Store"
                  placeholder={`Enter your project's demo`}
                  className="placeholder:text-xs placeholder:sm:text-base text-xs w-full py-3 px-2 sm:p-2 sm:text-base border border-gray-300 rounded outline-none focus:border-blue-500"
                  value={links[1]}
                  onChange={(e) =>
                    setLinks((prev) => [prev[0], e.target.value])
                  }
                />
              </DivGrow>
            </motion.div>
          )
        ) : (
          <div className="flex gap-3">
            <DivGrow delay={0.8}>
              <button
                className="relative bg-blue-500 text-white flex items-center justify-center w-[75px] aspect-square gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-blue-600 active:scale-105 transition"
                onClick={() => setLinkType('website')}
              >
                <span className="font-bold">Website</span>
              </button>
            </DivGrow>
            <DivGrow delay={0.85}>
              <button
                className="bg-blue-500 text-white flex items-center justify-center w-[75px] aspect-square gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-blue-600 active:scale-105 transition"
                onClick={() => setLinkType('stores')}
              >
                <span className="font-bold">
                  App <br />
                  Stores
                </span>
              </button>
            </DivGrow>
          </div>
        )}
      </div>
      {linkType ? (
        <DivGrow delay={linkType === 'website' ? 0.3 : 0.6}>
          <CancelButton onClick={() => setLinkType(null)} />
        </DivGrow>
      ) : null}
    </>
  );
};

export default AddProjectLinks;
