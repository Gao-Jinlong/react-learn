import { create } from "zustand";
import { editComponentSetting, type EditComponentSettings } from "../config";

export interface State {
  componentConfig: EditComponentSettings;
}
export interface Action {}
export const useComponentConfigStore = create<State & Action>(() => ({
  componentConfig: editComponentSetting,
}));
