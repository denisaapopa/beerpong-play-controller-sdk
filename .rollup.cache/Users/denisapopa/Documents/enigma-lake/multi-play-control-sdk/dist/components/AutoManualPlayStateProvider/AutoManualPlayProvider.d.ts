import { ReactElement } from "react";
import { PlayControllerProps } from "../../types/playController";
import { AutoManualPlayStateContextType } from "./AutoManualPlayStateContext";
interface AutoManualPlayStateProviderProps {
  children:
    | React.ReactNode
    | ((state: AutoManualPlayStateContextType) => ReactElement);
  config: PlayControllerProps;
}
declare const AutoManualPlayProvider: React.FC<AutoManualPlayStateProviderProps>;
export default AutoManualPlayProvider;
