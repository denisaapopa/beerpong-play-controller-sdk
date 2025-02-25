import cx from "classnames";

import ManualPlayController from "../ManualPlayController";

import style_multi from "./ManualMultiPlayController.module.scss";

const ManualMultiPlayController = () => {
  return (
    <div className={cx(style_multi.base)}>
      <ManualPlayController />
      <ManualPlayController />
    </div>
  );
};
export default ManualMultiPlayController;
