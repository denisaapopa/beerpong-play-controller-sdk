import cx from "classnames";

import ManualPlayController from "../ManualPlayController";

import style_multi from "./ManualMultiPlayController.module.scss";
import { PlaySide } from "../../../types/playController";

const ManualMultiPlayController = ({
  lastPlayedSide,
}: {
  lastPlayedSide: PlaySide;
}) => {
  return (
    <div className={cx(style_multi.base)}>
      <ManualPlayController
        side={PlaySide.LEFT}
        lastPlayedSide={lastPlayedSide}
      />
      <ManualPlayController
        side={PlaySide.RIGHT}
        lastPlayedSide={lastPlayedSide}
      />
    </div>
  );
};
export default ManualMultiPlayController;
