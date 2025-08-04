import React, { useState, useRef } from 'react';
import FileInput from "../../components/form/input/FileInput"; //file input
import { uploadFile } from '../../api/kho';

const UploadFile = () => {
  const [file, setFile] = useState<File | null>(null);
  const [msg, setMsg] = useState('');
  const [link, setLink] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return setMsg("Vui lòng chọn file!");
    const formData = new FormData();
    formData.append('file', file);
    try {
      await uploadFile(formData).then(result => {
        if (result.data.success === true) {
          setMsg(result.data.message);
          setLink(result.data.link);
          // Reset form
          formRef.current?.reset();
          fileInputRef.current!.value = "";
          setFile(null);
        } else setMsg(result.data.alert);
      });
    } catch (err) {
      setMsg("Lỗi upload!");
    }
  };

  return (
    <div>
      <form onSubmit={handleUpload} className="space-y-4" encType="multipart/form-data" ref={formRef}>
        <FileInput onChange={handleFileChange} className="custom-class" ref={fileInputRef}/>
        <button type="submit" className={`inline-flex items-center justify-center gap-4 rounded-lg transition bg-green-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 px-5 py-3 text-sm mt-4`}>
          Upload </button>
        <p className={`text-red-500`}> {msg}</p>
      </form>
      <hr/>
      <img src={link} alt="Avatar" />
    </div>
  );
};

export default UploadFile;