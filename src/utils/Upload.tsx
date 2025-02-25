import React from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { XIcon } from "lucide-react";

interface UploadProps {
  cancelUpload: () => void;
  setUploadClicked: (value: boolean) => void;
}

const Upload: React.FC<UploadProps> = ({ cancelUpload, setUploadClicked }) => {
  return (
    <div className="absolute inset-0 flex justify-center items-center backdrop-blur-lg bg-slate-400/30 dark:bg-black/5">
      <button
        onClick={() => setUploadClicked(false)}
        className="absolute top-10 px-3 py-3 right-10 rounded-full"
      >
        <XIcon className="text-neutral-200" />
      </button>
      <div className="max-w-md w-full rounded-lg border-dotted border-neutral-200 dark:border-neutral-700 p-4">
        <FileUpload
          cancelUpload={cancelUpload}
          setUploadClicked={setUploadClicked}
        />
      </div>
    </div>
  );
};

export default Upload;
