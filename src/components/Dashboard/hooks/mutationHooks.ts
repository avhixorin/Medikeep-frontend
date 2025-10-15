import { RootState } from "@/redux/store/store";
import { MedicalRecord } from "@/types/types";
import {
  useMutation,
  useQueryClient,
  UseMutationResult,
} from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

interface UploadUserRecordsPayload {
  files: File[];
  target: string;
}

interface DeleteRecordContext {
  previousRecords: MedicalRecord[] | undefined;
  idToDelete: string;
}

/**
 * @description Custom hook to handle uploading user record files.
 */
export const useUploadUserRecords = (): UseMutationResult<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any, // Response data type
  Error, // Error type
  UploadUserRecordsPayload, // Variables type
  unknown // Context type
> => {
  const queryClient = useQueryClient();
  const user = useSelector((state: RootState) => state.auth.user);
  return useMutation({
    mutationFn: async ({ files, target }: UploadUserRecordsPayload) => {
      if (!files.length) throw new Error("No files selected");
      if (!target) throw new Error("Target user is not specified");

      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));
      formData.append("target", target);

      const { data } = await axios.post(
        import.meta.env.VITE_BASE_URL + "/upload-files",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return data;
    },
    onSuccess: (data, { target }) => {
      toast.success("Files uploaded successfully");
      queryClient.invalidateQueries({
        queryKey: ["user-records", user?._id, target],
      });
      queryClient.invalidateQueries({
        queryKey: ["user-records", target, user?._id],
      });
    },
    onError: (error: Error | AxiosError) => {
      const errMsg =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "Upload failed";
      toast.error(errMsg);
    },
  });
};

/**
 * @description Custom hook to handle deleting a user record with optimistic updates.
 */
export const useDeleteUserRecord = (): UseMutationResult<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  Error,
  string,
  DeleteRecordContext
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!id) throw new Error("ID of record is not specified");

      const { data } = await axios.post(
        import.meta.env.VITE_BASE_URL + "/delete-file",
        { recordId: id },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      return data;
    },
    onMutate: async (idToDelete: string) => {
      toast.loading("Deleting file...", { id: idToDelete });
      await queryClient.cancelQueries({ queryKey: ["user-records"] });
      const previousRecords = queryClient.getQueryData<MedicalRecord[]>([
        "user-records",
      ]);
      queryClient.setQueryData<MedicalRecord[]>(["user-records"], (old) =>
        old ? old.filter((record) => record._id !== idToDelete) : []
      );
      return { previousRecords, idToDelete };
    },
    onSuccess: (data, variables, context) => {
      toast.success("File deleted successfully", { id: context.idToDelete });
      queryClient.invalidateQueries({ queryKey: ["user-records"] });
    },
    onError: (error: Error, variables, context) => {
      toast.error(error.message || "Failed to delete file", {
        id: context?.idToDelete,
      });
      if (context?.previousRecords) {
        queryClient.setQueryData(["user-records"], context.previousRecords);
      }
    },
    onSettled: (data, error, variables, context) => {
      if (context?.idToDelete) {
        toast.dismiss(context.idToDelete);
      }
    },
  });
};
