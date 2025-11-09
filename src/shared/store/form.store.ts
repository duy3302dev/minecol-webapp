import { create } from "zustand";
import formRegistry from "../lib/form/formRegistry";

type FormStoreState = {
  tick: number;
  bump: () => void;
};

export const useFormStoreCore = create<FormStoreState>((set) => ({
  tick: 0,
  bump: () => set((s) => ({ tick: s.tick + 1 })),
}));

// subscribe registry -> bump zustand so components can reselect
// Do this once when module loads
formRegistry.subscribe(() => {
  useFormStoreCore.getState().bump();
});
