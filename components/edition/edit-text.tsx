'use client';

import dynamic from 'next/dynamic';
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);
import { useEffect, useState, useMemo, Dispatch, SetStateAction } from 'react';
import { ContentState, EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { usePortfolioDataContext } from '@/context/portfolio-data-context';
import { useEditContext } from '@/context/edit-context';

import sanitizeHtml from 'sanitize-html';
import CancelButton from '../buttons/cancel-button';
import SaveButton from '../buttons/save-button';
import CloseButton from '../buttons/close-buttons';
import ContainerSlide from '../motion/container-slide';
import DivGrow from '../motion/div-grow';

const toolbarOptions = {
  options: ['inline', 'emoji', 'history'],
  inline: {
    options: ['bold', 'italic', 'underline'],
  },
};

type EditTextProps = {
  component: 'intro' | 'about' | 'projects' | 'project';
  project?: boolean;
  returnToProjects?: Dispatch<SetStateAction<string>>;
  initialValue?: string | null;
};

/**
 *
 * @param component  'intro' | 'about' | 'projects' | 'project'
 * @param project  boolean
 * @param returnToProjects  Dispatch<SetStateAction<string>>
 *
 * @param initialValue  string | null
 * @default null
 *
 */
const EditText = ({
  component,
  project = false,
  returnToProjects,
  initialValue = null,
}: EditTextProps) => {
  const htmlToDraft =
    typeof window === 'object' && require('html-to-draftjs').default;
  const title = component.charAt(0).toUpperCase() + component.slice(1);
  const [editorState, setEditorState] = useState<EditorState | null>(null);
  const { updateAndSaveOneKey, data } = usePortfolioDataContext();
  const [newText, setNewText] = useState(
    component === 'project'
      ? initialValue
      : component === 'projects'
      ? ''
      : data[component] || ''
  );
  const { updateEdit } = useEditContext();

  const memoizedToolbarOptions = useMemo(() => toolbarOptions, []);

  useEffect(() => {
    if (!editorState) return;
    setNewText(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    if (returnToProjects) {
      returnToProjects(
        draftToHtml(convertToRaw(editorState.getCurrentContent()))
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorState]);

  useEffect(() => {
    handleReset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // useEffect(() => {
  //   console.log('newText', newText);
  // }, [newText]);

  const handleReset = () => {
    if (component === 'projects') {
      setEditorState(() => EditorState.createEmpty());
    } else if (component === 'project') {
      setEditorState(() =>
        EditorState.createWithContent(
          ContentState.createFromBlockArray(
            htmlToDraft(initialValue).contentBlocks
          )
        )
      );
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
    const cleanText = sanitizeHtml(newText as string, {
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
    <ContainerSlide>
      {project ? null : (
        <DivGrow
          className="flex justify-center items-center gap-2 mb-3 w-full"
          delay={0.4}
        >
          <h1 className="text-lg">Edit {title}</h1>
          <CloseButton onClick={closeEditIntro} />
        </DivGrow>
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
            spellCheck
          />
        ) : null}
      </div>
      {project ? null : (
        <div className="flex justify-center gap-5">
          <CancelButton onClick={handleCancel} />
          <SaveButton onClick={handleSave} />
        </div>
      )}
    </ContainerSlide>
  );
};

export default EditText;
