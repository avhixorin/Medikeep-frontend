import { MedicalRecord } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type RecordState = {
  records: MedicalRecord[];
};

const initialState: RecordState = {
  records: [],
};

const recordSlice = createSlice({
  name: "records",
  initialState,
  reducers: {
    setRecords: (state, action: PayloadAction<MedicalRecord[]>) => {
      state.records = action.payload;
    },
  },
});

export const { setRecords } = recordSlice.actions;
export default recordSlice.reducer;
