// useSettings.ts

import { create } from "zustand";

const defaultUserSettings = {
  liveAdhan: true,
}

const useSettings = create((set) => ({
  ...defaultUserSettings,
  setLiveAdhan: (value: any) => set({ liveAdhan: value }),
}));

export default useSettings;
