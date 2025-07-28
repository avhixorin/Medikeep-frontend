import { setRecords } from "@/redux/features/recordSlice";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";

const useRecord = () => {
  const dispatch = useDispatch();

  const uploadFiles = async (files: File[], target: string) => {
    try {
      console.log("Preparing to upload files...");
      if (!files.length) {
        toast.error("No files selected");
        return null;
      }
      if (!target) {
        toast.error("Target user is not specified");
        return null;
      }

      const formData = new FormData();
      files.forEach((file) => {
        console.log("Appending file to formData:", file.name);
        formData.append("files", file);
      });

      console.log("Appending target:", target);
      formData.append("target", target);

      console.log("Sending request to:", import.meta.env.VITE_UPLOAD_FILES_URL);
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

      console.log("Upload successful. Response:", res.data);
      toast.success("Files uploaded successfully");
      dispatch(setRecords(res.data.records));
      return res.data;
    } catch (error: unknown) {
      let errMsg = "Upload failed";
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        errMsg = error.response.data.message;
      }
      toast.error(errMsg);
      console.error("Upload error:", error);
      return null;
    }
  };

  const getUserRecords = async () => {
    try {

      const res = await axios.get(
        import.meta.env.VITE_GET_USER_RECORDS_URL,
        {
          withCredentials: true,
        }
      );

      console.log("Records fetched successfully:", res.data);
      dispatch(setRecords(res.data.records));
      return res.data;
    } catch (error: unknown) {
      let errMsg = "Fetch failed";
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        errMsg = error.response.data.message;
      }
      toast.error(errMsg);
      console.error("Record fetching error:", error);
      return null;
    }
  }

  const deleteFile = async (id: string) => {
    try {
      console.log("Preparing to upload files...");

      if (!id) {
        toast.error("ID of record is not specified");
        return null;
      }

      const formData = new FormData();
      console.log("Appending target:", id);
      formData.append("recordId", id);

      console.log("Sending request to:", import.meta.env.VITE_DELETE_FILE_URL);
      const res = await axios.post(
        import.meta.env.VITE_DELETE_FILE_URL,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Deletion successful. Response:", res.data);
      toast.success(res.data.message);
      dispatch(setRecords(res.data.records));
      return res.data;
    } catch (error: unknown) {
      let errMsg = "Delete failed";
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        errMsg = error.response.data.message;
      }
      toast.error(errMsg);
      console.error("Deletion error:", error);
      return null;
    }
  };

  return { uploadFiles, deleteFile, getUserRecords };
};

export default useRecord;
