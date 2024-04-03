import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";
import Pin from "@/types/Pin";

// Define a type for the slice state
interface DraftCollectionEditState {
  id: number;
  title: string;
  details: string;
  imgFile: File | null;
  imgSrc: string;
  tagList: string[];
}

const initialState: DraftCollectionEditState | null = null;

export const draftCollectionEditSlice = createSlice({
  name: "draftCollectionEditSlice",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: initialState as DraftCollectionEditState | null,
  reducers: {
    clearDraftCollectionEdit: () => {
      return initialState;
    },
    setDraftCollectionEdit: (
      state,
      action: PayloadAction<DraftCollectionEditState>
    ) => {
      return action.payload;
    },
  },
});

export const { clearDraftCollectionEdit, setDraftCollectionEdit } =
  draftCollectionEditSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectDraftCollectionEdit = (state: RootState) =>
  state.draftCollectionEdit;

export default draftCollectionEditSlice.reducer;
