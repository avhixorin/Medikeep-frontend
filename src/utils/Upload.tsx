import React from "react";
import { FileUpload } from "@/components/ui/file-upload";

interface UploadProps {
  cancelUpload: () => void;
  setUploadClicked: (value: boolean) => void;
}

const Upload: React.FC<UploadProps> = ({ cancelUpload, setUploadClicked }) => {

  return (
    <div className="absolute inset-0 flex justify-center items-center backdrop-blur-lg bg-slate-400/30">
      <div className="max-w-md w-full p-6 rounded-lg">
        <FileUpload cancelUpload={cancelUpload} setUploadClicked={setUploadClicked} />
      </div>
    </div>
  );
};

export default Upload;
