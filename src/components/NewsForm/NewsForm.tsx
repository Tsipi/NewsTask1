import "react-datepicker/dist/react-datepicker.css";

import React from "react";
import styles from "./NewsForm.module.scss";
import DatePicker from "react-datepicker";
import { Button } from "../shared/button/button";
import { sub } from "date-fns";

interface Props {
  isLoading?: boolean;
  url?: string | null;
  title?: string | null;
  date?: string | null;
  errorUrl?: string | null;
  errorTitle?: string | null;
  formTitle?: string;
  handleUrlChange: (url: string) => void;
  handleTitleChange: (title: string) => void;
  handleDateChange: (date: string) => void;
  handleSubmit: () => void;
  onArticleTitleFetch?: () => any;
}

export const NewsForm = ({
  isLoading,
  handleUrlChange,
  handleTitleChange,
  handleDateChange,
  url,
  title,
  date,
  errorUrl,
  errorTitle,
  formTitle,
  handleSubmit,
  onArticleTitleFetch,
}: Props) => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <div className={styles.formTitleBold}>{formTitle}</div>
      <div className={styles.inputContainer}>
        <div className={styles.inputLabel}>
          News Item URL *
          {onArticleTitleFetch ? (
            <button onClick={onArticleTitleFetch}>Fetch article title</button>
          ) : null}
        </div>
        <input
          value={url!}
          type="input"
          placeholder="Paste Link"
          onChange={(event) => handleUrlChange(event.target.value)}
        />
        {isLoading && <div>Loading...</div>}
        {errorUrl && <div className={styles.errorLabel}>{errorUrl}</div>}
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.inputLabel}>Date *</div>
        <DatePicker
          selected={date ? new Date(date) : new Date()}
          showPopperArrow={false}
          onChange={(date: Date) => {
            handleDateChange(date.toISOString());
          }}
          dateFormat="MMMM d, yyyy"
          className="news-date"
          minDate={sub(new Date(), {
            years: 5,
          })}
        />
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.inputLabel}>Article Title *</div>
        <textarea
          value={title!}
          id="articleSummary"
          placeholder="Type article summary here..."
          onChange={(event) => handleTitleChange(event.target.value)}
        />
        {errorTitle && <div className={styles.errorLabel}>{errorTitle}</div>}
      </div>
      <div className={styles.inputContainer}></div>
      <div className={styles.btnsContainer}>
        <Button text="save" onClick={handleSubmit} />
      </div>
    </form>
  );
};
