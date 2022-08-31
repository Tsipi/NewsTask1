import "react-datepicker/dist/react-datepicker.css";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closePopup, State } from "../../store";
import { NewsForm } from "../../components/NewsForm/NewsForm";
import {
  updateTitle,
  updateDate,
  updateUrl
} from "../EditNewsForm/editNewsFormSlice";
import { editNewsItem } from "../../components/ItemsList/itemsListSlice";

export const EditNewsForm = () => {
  const dispatch = useDispatch();
  const selectedItemId = useSelector(
    (state: State) => state.editNewsForm.selectedItemId
  );
  const title = useSelector((state: State) => state.editNewsForm.title);
  const url = useSelector((state: State) => state.editNewsForm.url);
  const date = useSelector((state: State) => state.editNewsForm.date);
  // find item by selectedItemId in the state
  // 1. get all news items from the state
  // 2. find selected item by its id
  const itemsList = useSelector((state: State) => state.itemsList.items);
  const initialNewsItem = itemsList.find((item) => {
    return item.id === selectedItemId;
  });

  useEffect(() => {
    if (initialNewsItem?.url) {
      dispatch(updateUrl({ url: initialNewsItem?.url }));
    }
    if (initialNewsItem?.date) {
      dispatch(updateDate({ date: initialNewsItem?.date }));
    }
    if (initialNewsItem?.title) {
      dispatch(updateTitle({ title: initialNewsItem?.title }));
    }
  }, [initialNewsItem, dispatch]);

  const handleSubmit = () => {
    if (url && date && title && typeof selectedItemId === "number") {
      dispatch(
        editNewsItem({
          id: selectedItemId,
          url,
          date,
          title
        })
      );
      // add close handler
      dispatch(closePopup());
    }
  };

  const handleUrlChange = (url: string) => {
    dispatch(updateUrl({ url }));
  };

  const handleDateChange = (date: string) => {
    dispatch(updateDate({ date }));
  };

  const handleTitleChange = (title: string) => {
    dispatch(updateTitle({ title }));
  };

  return (
    <NewsForm
      formTitle={"Edit an Article"}
      url={url}
      title={title}
      date={date}
      handleDateChange={handleDateChange}
      handleTitleChange={handleTitleChange}
      handleUrlChange={handleUrlChange}
      handleSubmit={handleSubmit}
    />
  );
};
