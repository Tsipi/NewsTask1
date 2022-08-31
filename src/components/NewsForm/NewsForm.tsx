import "react-datepicker/dist/react-datepicker.css";

import React from "react";
import styles from "./NewsForm.module.scss";
import DatePicker from "react-datepicker";
import { Button } from "../shared/button/button";
// import { ruTranslations } from "stream-chat-react";

// TODO:
// to be able to edit article you need to create 3 components
// 1. NewsForm (base component that hols html and accepts props)
// 2. AddNewsForm (handles all logic needed to add news and passes needed propties to NewsForm)
//    AddNewsForm will render NewsForm
// 3. EditNewsForm (handles all logic needed to edit news and passes neede propties to NewsForm)
//    EditNewsForm will render NewsForm

//Important
//1. Input Validation
//2. Datepicker only 5 last years.
//3. API call to embedly - iframly
//4. API call to our endpoint

interface Props {
  url?: string | null;
  title?: string | null;
  date?: string | null;
  errorUrl?: string | null;
  handleUrlChange: (url: string) => void;
  handleTitleChange: (title: string) => void;
  handleDateChange: (date: string) => void;
  handleSubmit: () => void;
}

export const NewsForm = ({
  handleUrlChange,
  handleTitleChange,
  handleDateChange,
  url,
  title,
  date,
  errorUrl,
  handleSubmit
}: Props) => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        // handleSubmit();
      }}
    >
      <div className={styles.inputContainer}>
        <div className={styles.inputLabel}>News Item URL *</div>
        <input
          value={url!}
          type="input"
          placeholder="Paste Link"
          onChange={(event) => handleUrlChange(event.target.value)}
        />
        {errorUrl && (
          <div className={styles.errorLabel}>{errorUrl}</div>
        )}
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.inputLabel}>Date *</div>
        <DatePicker
          selected={date ? new Date(date) : new Date()}
          onChange={(date: Date) => handleDateChange(date.toISOString())}
          dateFormat="MMMM d, yyyy"
          className="news-date"
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
        <div className={styles.errorLabel}>
          Please enter the title of the article
        </div>
      </div>
      <div className={styles.inputContainer}></div>
      <div className={styles.btnsContainer}>
        <Button text="SAVE" onClick={handleSubmit} />
      </div>
    </form>
  );
};
