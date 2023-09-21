'use client';

import dynamic from 'next/dynamic';
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);
import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { AiFillCloseCircle } from 'react-icons/ai';
import { ContentState, EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { usePortfolioDataContext } from '@/context/portfolio-data-context';
import { useEditContext } from '@/context/edit-context';

const toolbarOptions = {
  options: ['inline', 'emoji', 'history'],
  inline: {
    options: ['bold', 'italic', 'underline'],
  },
};

const EditIntro = () => {
  const htmlToDraft =
    typeof window === 'object' && require('html-to-draftjs').default;
  const [editorState, setEditorState] = useState<EditorState | null>();
  const { updateAndSaveOneKey, data } = usePortfolioDataContext();
  const [newText, setNewText] = useState(data.intro || '');
  const { updateEdit } = useEditContext();

  const memoizedToolbarOptions = useMemo(() => toolbarOptions, []);

  useEffect(() => {
    if (!editorState) return;
    setNewText(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  }, [editorState]);

  useEffect(() => {
    handleReset();
  }, [data]);

  const handleReset = () => {
    setEditorState(() =>
      EditorState.createWithContent(
        ContentState.createFromBlockArray(
          htmlToDraft(data.intro || '').contentBlocks
        )
      )
    );
  };

  const handleSave = () => {
    updateAndSaveOneKey(newText, 'intro');
    updateEdit('intro', false);
  };

  const closeEditIntro = () => updateEdit('intro', false);

  return (
    <motion.section
      className="my-5"
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <motion.div
        className="flex justify-center items-center gap-2 mb-3 w-full"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 125,
          delay: 0.4,
          duration: 0.7,
        }}
      >
        <h1 className="text-lg">Edit Intro</h1>
        <button onClick={closeEditIntro}>
          <AiFillCloseCircle size="2rem" />
        </button>
      </motion.div>
      {editorState ? (
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          placeholder="Write your intro here..."
          wrapperClassName="bg-white text-left border-gray-900 rounded-lg w-full  p-2 mb-5 resize-none dark:bg-white/10"
          editorClassName="!h-[260px]"
          toolbarClassName="bg-white dark:bg-white/10"
          toolbar={memoizedToolbarOptions}
        />
      ) : null}

      <div className="flex justify-center gap-5">
        <button
          aria-label="Cancel"
          className="bg-red-600 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-red-700 active:scale-105 transition"
          onClick={handleReset}
        >
          Cancel
        </button>
        <button
          aria-label="Save"
          className="bg-gray-900 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 transition"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </motion.section>
  );
};

export default EditIntro;
