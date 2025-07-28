import { MedicalRecord } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type RecordState = {
  records: Record<string, MedicalRecord[]>;
};

const initialState: RecordState = {
  records: {},
};

const recordSlice = createSlice({
  name: "records",
  initialState,
  reducers: {
    setRecords: (state, action: PayloadAction<MedicalRecord[]>) => {
      const recordMap: Record<string, MedicalRecord[]> = {};
      action.payload.forEach((record) => {
        const key =
          record.uploadedBy.role === "doctor"
            ? record.patient._id
            : record.doctor._id;

        if (key) {
          if (!recordMap[key]) {
            recordMap[key] = [];
          }
          recordMap[key].push(record);
        }
      });
      console.log("Final record map:", recordMap);
      state.records = recordMap;
    },
  },
});

export const { setRecords } = recordSlice.actions;
export default recordSlice.reducer;
