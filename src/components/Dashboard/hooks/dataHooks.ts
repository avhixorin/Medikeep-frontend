import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { MedicalRecord } from "@/types/types";

interface UseUserRecordsParams {
  doctorId: string | undefined;
  patientId: string | undefined;
}

/**
 * @description Custom hook to fetch medical records for a specific doctor-patient relationship.
 * @param {string | undefined} doctorId - The ID of the doctor.
 * @param {string | undefined} patientId - The ID of the patient.
 * @returns {UseQueryResult<MedicalRecord[], Error>} The result of the query, including data, isLoading, and error states.
 */
export const useUserRecords = ({
  doctorId,
  patientId,
}: UseUserRecordsParams): UseQueryResult<MedicalRecord[], Error> => {
  return useQuery<MedicalRecord[], Error>({
    queryKey: ["user-records", doctorId, patientId],
    queryFn: async () => {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/get-records`,
        {
          doctorId,
          patientId,
        },
        {
          withCredentials: true,
        }
      );
      console.log("Fetched records:", data);
      return data.records as MedicalRecord[];
    },
    enabled: !!doctorId && !!patientId,
  });
};