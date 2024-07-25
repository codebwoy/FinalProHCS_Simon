import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  images: [
    "/barcelona.jpg",
    "/germany.jpg",
    "/paris.jpg",
    "/rome.jpg",
    "/vienna.jpg",
    "/copenhagen.jpg",
  ],
  currentIndex: 0,
};

const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    nextImage: (state) => {
      state.currentIndex = (state.currentIndex + 1) % state.images.length;
    },
  },
});

export const { nextImage } = imagesSlice.actions;
export default imagesSlice.reducer;
