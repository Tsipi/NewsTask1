import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import closeBtn from "../../assets/svg/close.svg";
import styles from "./Popup.module.scss";

interface Props {
  isOpen: boolean;
  onClose: React.MouseEventHandler<HTMLButtonElement>;
}

export const Popup = ({
  isOpen,
  onClose,
  children,
}: React.PropsWithChildren<Props>) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <div className={styles.titlesWrap}>
          <button className={styles.closeBtn} onClick={onClose}>
            <img src={closeBtn} alt="close popup" />
          </button>
        </div>
        <div className={styles.popupBody}>{children}</div>
      </div>
      <button className={styles.overlayBackground} onClick={onClose} />
    </div>
  );
};
