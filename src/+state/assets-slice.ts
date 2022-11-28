import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AssetState {
  isAssetsLoaded: boolean
  assetsProgress: { itemsLoaded: number; itemsTotal: number }
  isErrorLoadingAssets: boolean
}

const initialState = {
  isAssetsLoaded: false,
  assetsProgress: { itemsLoaded: 0, itemsTotal: 0 },
  isErrorLoadingAssets: false,
} as AssetState

const assetSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    loaded: (state) => {
      state.isAssetsLoaded = true
    },
    progress: (state, action: PayloadAction<{ itemsLoaded: number; itemsTotal: number }>) => {
      state.assetsProgress = action.payload
    },
    failed: (state) => {
      state.isErrorLoadingAssets = true
    },
  },
})

export const { loaded, progress, failed } = assetSlice.actions
export default assetSlice.reducer
