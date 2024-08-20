import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "src/store/store";

const initialState: number = 0;

const entityIdSlice = createSlice({
  name: "entityIdSlice",
  initialState,
  reducers: {
    setEntityId: (_, action: PayloadAction<number>) => action.payload,
  },
});

export const entityIdSelector = () => (state: RootState) => state.entityId;
export const { setEntityId } = entityIdSlice.actions;
export default entityIdSlice.reducer;
export { entityIdSlice };
