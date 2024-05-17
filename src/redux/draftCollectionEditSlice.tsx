import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";

// Define a type for the slice state
interface DraftCollectionEditState {
  id: number;
  title: string;
  details: string;
  tagList: string[];
  imgFile: File | null;
  imgSrc: string;
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
    setDraftCollectionEdit: (state, action: PayloadAction<DraftCollectionEditState>) => {
      return action.payload;
    },
    updateTitle: (state, action: PayloadAction<string>) => {
      if (!state) return state;
      return { ...state, title: action.payload };
    },
    updateDetails: (state, action: PayloadAction<string>) => {
      if (!state) return state;
      return { ...state, details: action.payload };
    },
    updateTagList: (state, action: PayloadAction<string[]>) => {
      if (!state) return state;
      return { ...state, tagList: action.payload };
    },
    updateImgFile: (state, action: PayloadAction<File>) => {
      if (!state) return state;
      return { ...state, imgFile: action.payload };
    },
    updateImgSrc: (state, action: PayloadAction<string>) => {
      if (!state) return state;
      return { ...state, imgSrc: action.payload };
    },
  },
});

export const {
  clearDraftCollectionEdit,
  setDraftCollectionEdit,
  updateTitle,
  updateDetails,
  updateTagList,
  updateImgFile,
  updateImgSrc,
} = draftCollectionEditSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectDraftCollectionEdit = (state: RootState) => state.draftCollectionEdit;

export default draftCollectionEditSlice.reducer;
