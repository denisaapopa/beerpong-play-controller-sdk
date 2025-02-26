import cx from "classnames";

import ManualPlayController from "../ManualPlayController";

import style_multi from "./ManualMultiPlayController.module.scss";
import { PlaySide } from "../../../types/playController";

const ManualMultiPlayController = () => {
  return (
    <div className={cx(style_multi.base)}>
      <ManualPlayController side={PlaySide.LEFT} />
      <ManualPlayController side={PlaySide.RIGHT} />
    </div>
  );
};
export default ManualMultiPlayController;
