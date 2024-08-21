import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TreeRowResponse } from "src/api/tableApi.types";
import { RootState } from "src/store/store";

const initialState: TreeRowResponse[] = [
  {
    equipmentCosts: 0,
    estimatedProfit: 0,
    id: 0,
    machineOperatorSalary: 0,
    mainCosts: 0,
    materials: 0,
    mimExploitation: 0,
    overheads: 0,
    rowName: "",
    salary: 0,
    supportCosts: 0,
    total: 0,
  },
];

const tableOriginalDataSlice = createSlice({
  name: "tableOriginalDataSlice",
  initialState: () => [...initialState],
  reducers: {
    setTableOriginalData: (state, action: PayloadAction<TreeRowResponse[]>) => {
      state = action.payload;
    },
  },
});

export const tableOriginalDataSelector = () => (state: RootState) =>
  state.tableOriginalData;

export const { setTableOriginalData } = tableOriginalDataSlice.actions;

export default tableOriginalDataSlice.reducer;

export { tableOriginalDataSlice };
