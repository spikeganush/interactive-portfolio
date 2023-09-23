'use client';

import dynamic from 'next/dynamic';
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);
import { useEffect, useState, useMemo, Dispatch, SetStateAction } from 'react';
import { motion } from 'framer-motion';
import { ContentState, EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { usePortfolioDataContext } from '@/context/portfolio-data-context';
import { useEditContext } from '@/context/edit-context';

import sanitizeHtml from 'sanitize-html';
import CancelButton from '../buttons/cancel-button';
import SaveButton from '../buttons/save-button';
import CloseButton from '../buttons/close-buttons';

const toolbarOptions = {
  options: ['inline', 'emoji', 'history'],
  inline: {
    options: ['bold', 'italic', 'underline'],
  },
};

type EditTextProps = {
  component: 'intro' | 'about' | 'projects';
  project?: boolean;
  returnToProjects?: Dispatch<SetStateAction<string>>;
};

const EditText = ({
  component,
  project = false,
  returnToProjects,
}: EditTextProps) => {
  const htmlToDraft =
    typeof window === 'object' && require('html-to-draftjs').default;
  const title = component.charAt(0).toUpperCase() + component.slice(1);
  const [editorState, setEditorState] = useState<EditorState | null>();
  const { updateAndSaveOneKey, data } = usePortfolioDataContext();
  const [newText, setNewText] = useState(
    component === 'projects' ? '' : data[component] || ''
  );
  const { updateEdit } = useEditContext();

  const memoizedToolbarOptions = useMemo(() => toolbarOptions, []);

  useEffect(() => {
    if (!editorState) return;
    setNewText(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    if (returnToProjects)
      returnToProjects(
        draftToHtml(convertToRaw(editorState.getCurrentContent()))
      );
  }, [editorState]);

  useEffect(() => {
    handleReset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleReset = () => {
    if (component === 'projects') {
      setEditorState(() => EditorState.createEmpty());
    } else {
      setEditorState(() =>
        EditorState.createWithContent(
          ContentState.createFromBlockArray(
            htmlToDraft(data[component] || '').contentBlocks
          )
        )
      );
    }
  };

  const handleSave = () => {
    const cleanText = sanitizeHtml(newText, {
      allowedTags: ['span', 'strong', 'em', 'p', 'ins'],
      allowedAttributes: {
        p: ['class'],
        span: ['class'],
      },
    });
    updateAndSaveOneKey(cleanText, component);
    updateEdit(component, false);
  };

  const handleCancel = () => {
    handleReset();
    closeEditIntro();
  };

  const closeEditIntro = () => updateEdit(component, false);

  return (
    <motion.section
      className="my-5 w-full"
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {project ? null : (
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
          <h1 className="text-lg">Edit {title}</h1>
          <CloseButton onClick={closeEditIntro} />
        </motion.div>
      )}
      <div className="h-[340px] sm:w-full">
        {editorState ? (
          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            placeholder="Write your text here..."
            wrapperClassName="bg-white text-left border-gray-900 rounded-lg p-2 mb-5 resize-none dark:bg-white/10"
            editorClassName="!h-[260px]"
            toolbarClassName="bg-white dark:bg-white/10"
            toolbar={memoizedToolbarOptions}
          />
        ) : null}
      </div>
      {project ? null : (
        <div className="flex justify-center gap-5">
          <CancelButton onClick={handleCancel} />
          <SaveButton onClick={handleSave} />
        </div>
      )}
    </motion.section>
  );
};

export default EditText;
