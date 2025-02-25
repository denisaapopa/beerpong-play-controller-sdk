import { useContext } from "react";
import { createContext } from "react";
export const AutoManualPlayStateContext = createContext(undefined);
export const useAutoManualPlayState = () => {
  const context = useContext(AutoManualPlayStateContext);
  if (!context) {
    throw new Error(
      "useAutoManualPlayStateState must be used within a AutoManualPlayStateProvider",
    );
  }
  return context;
};
//# sourceMappingURL=AutoManualPlayStateContext.js.map
