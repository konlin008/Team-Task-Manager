import { create } from "zustand";
import { persist } from "zustand/middleware";

const useWorkspaceStore = create(
  persist(
    (set) => ({
      workspace: null,
      setWorkspace: (data) => {
        set({
          workspace: data,
        });
      },
      clearWorkspace: () => {
        set({
          workspace: null,
        });
      },
    }),
    {
      name: "workspace-storage",
    },
  ),
);
export default useWorkspaceStore;
