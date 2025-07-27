import axios from "axios";
import { toast } from "react-hot-toast";

const useUploadFiles = () => {
  const uploadFiles = async (files: File[]) => {
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });

      const res = await axios.post(
        import.meta.env.VITE_UPLOAD_FILES_URL,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Files uploaded successfully");
      console.log("The res from the file upload is: ", res.data);
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Upload failed");
      console.error("Upload error:", error);
      return null;
    }
  };

  return { uploadFiles };
};

export default useUploadFiles;
