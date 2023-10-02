import { useState, useEffect } from 'react';
import ContainerSlide from '../motion/container-slide';
import EditTitle from './edit-title';
import DivGrow from '../motion/div-grow';
import SaveButton from '../buttons/save-button';
import { useEditContext } from '@/context/edit-context';
import { usePortfolioDataContext } from '@/context/portfolio-data-context';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';

const EditUrl = () => {
  const { data, updateAndSaveOneKey } = usePortfolioDataContext();
  const [url, setUrl] = useState(data.customUrl ?? data._id);
  const [urlIsValid, setUrlIsValid] = useState<boolean>(true);
  const [listExistingUrls, setListExistingUrls] = useState<string[]>([]);
  const { setEdit } = useEditContext();
  const closeEdit = () => {
    setEdit((prev) => ({ ...prev, customUrl: false }));
  };
  const saveUrl = () => {
    if (urlIsValid) {
      updateAndSaveOneKey(url, 'customUrl');
      closeEdit();
    }
  };

  const updateUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    // Replace spaces with dashes
    value = value.replace(/\s+/g, '-');

    // Remove special characters
    value = value.replace(/[^a-zA-Z0-9-]/g, '');

    setUrl(value);
    if (listExistingUrls.includes(value) || value.length < 3) {
      setUrlIsValid(false);
    } else {
      setUrlIsValid(true);
    }
  };

  useEffect(() => {
    const fetchExistingUrls = async () => {
      const response = await fetch(`/api/portfolio/all`, {
        method: 'GET',
      });
      if (response.status == 200) {
        const data = await response.json();
        data.map((item: any) => {
          setListExistingUrls((prev) => {
            if (prev.includes(item.customUrl ?? item._id)) return prev;
            return [...prev, item.customUrl ?? item._id];
          });
        });
      }
    };
    fetchExistingUrls();
  }, []);

  return (
    <ContainerSlide>
      <EditTitle title="Edit URL" onClick={closeEdit} />
      <DivGrow className="mb-3 w-5/6 sm:w-5/6 mx-auto" delay={0.7}>
        <h1 className="text-lg my-3">Enter URL:</h1>
        <input
          type="text"
          name="Demo Website"
          placeholder={`Enter your url`}
          className="w-full p-2 border border-gray-300 rounded outline-none focus:border-blue-500"
          value={url}
          onChange={updateUrl}
        />
        <div className="flex justify-center w-full mt-3">
          <SaveButton onClick={saveUrl} />
        </div>
        <div className="mt-3 font-bold">
          <span className="mr-3">{`https://mypersonalportfolio.app/${url}`}</span>
          {urlIsValid ? (
            <AiFillCheckCircle
              size="1.5rem"
              className="inline-block text-green-600"
            />
          ) : (
            <AiFillCloseCircle
              size="1.5rem"
              className="inline-block text-red-600"
            />
          )}
        </div>
      </DivGrow>
    </ContainerSlide>
  );
};

export default EditUrl;
