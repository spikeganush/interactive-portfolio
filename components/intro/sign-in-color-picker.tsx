import { motion } from 'framer-motion';
import { useIsOwnerContext } from '@/context/is-owner-context';
import { signIn, useSession } from 'next-auth/react';
import React from 'react';
import BgPicker from '../edition/bg-picker';
import { useParams } from 'next/navigation';

const SignInAndColorPicker = () => {
  const { isOwner } = useIsOwnerContext();
  const { data: session } = useSession();
  const params = useParams();
  return (
    <div
      className={`flex mb-5 relative ${
        isOwner ? 'justify-between items-start' : 'justify-center items-center'
      }`}
    >
      {session?.user || params?.id ? null : (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 125,
            delay: 0.1,
            duration: 0.5,
          }}
        >
          <button
            type="button"
            onClick={() => {
              signIn('google');
            }}
            className="group bg-gray-900 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 transition"
          >
            Customise your portfolio
          </button>
        </motion.div>
      )}
      {isOwner ? <BgPicker /> : null}
    </div>
  );
};

export default SignInAndColorPicker;
