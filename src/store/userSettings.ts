// useSettings.ts

import { create } from "zustand";
import { defaultUserSettings } from "@/config/settings";

const useSettings = create((set) => ({
  ...defaultUserSettings,
  setLiveAdhan: (value: any) => set({ liveAdhan: value }),
}));

export default useSettings;
