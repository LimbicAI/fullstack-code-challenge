import React from "react";
import RootStore from "../stores/RootStore";

const rootStore = new RootStore();

export const RootStoreContext = React.createContext(rootStore);

export const RootStoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <RootStoreContext.Provider value={rootStore}>
    {children}
  </RootStoreContext.Provider>
);
