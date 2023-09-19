'use client';

import { useState } from 'react';

const UploadPhoto = () => {
  const [file, setFile] = useState<File>();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    try {
      const data = new FormData();
      data.set('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });
      // handle the error
      if (!res.ok) throw new Error(await res.text());
    } catch (e: any) {
      // Handle errors here
      console.error(e);
    }
  };

  return (
    <>
      <h1>Upload Photo</h1>
      <form onSubmit={onSubmit}>
        <input
          type="file"
          name="file"
          accept="image/png, image/jpeg, image/jpg, image/webp"
          onChange={(e) => setFile(e.target.files?.[0])}
        />
        <input type="submit" value="Upload" className="black_round_btn" />
      </form>
    </>
  );
};

export default UploadPhoto;
