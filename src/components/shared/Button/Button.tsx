import React from "react";
import { ButtonProps, ButtonType } from "../../../types";
import styles from "./button.module.scss";

export const Button = (props: ButtonProps) => {
  const {
    type = ButtonType.PRIMARY,
    onClick,
    text,
    isLoading,
    width,
    color,
    icon: Icon,
    disabled,
  } = props;

  return (
    <button
      className={`${styles.button} ${styles[type as keyof typeof styles]} ${
        isLoading ? styles.loading : ""
      }  ${disabled ? styles.secondary : ""}`}
      onClick={(e) => onClick(e)}
      disabled={disabled || isLoading}
      style={{ minWidth: `${width}rem`, color: `${color}` }}
    >
      {isLoading && (
        <div className={styles.loadingContainer}>
          {/* <LoadingIndicator color={'var(--black)'} /> */}
        </div>
      )}
      {Icon && (
        <div className={styles.iconContainer}>
          <Icon />
        </div>
      )}
      {text}
    </button>
  );
};
