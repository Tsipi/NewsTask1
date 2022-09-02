import "react-datepicker/dist/react-datepicker.css";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closePopup, State } from "../../store";
import { NewsForm } from "../../components/NewsForm/NewsForm";
import { updateDate, updateTitle, updateUrl } from "./addNewsFormSlice";
import { addNewsItem } from "../../components/ItemsList/itemsListSlice";
import { isValidUrl } from "../../utils/isValidUrl";
import { useFetchArticleData } from "../../hooks/useFetchArticleData";

export const AddNewsForm = () => {
  const dispatch = useDispatch();
  //helps to get the data from the state - accepts selector function
  const url = useSelector((state: State) => state.addNewsForm.url);
  const title = useSelector((state: State) => state.addNewsForm.title);
  const date = useSelector((state: State) => state.addNewsForm.date);
  const [errorUrl, setErrorUrl] = useState<string | null>(null);
  const [errorTitle, setErrorTitle] = useState<string | null>(null);
  const { data, isLoading } = useFetchArticleData(url);

  useEffect(() => {
    if (data?.title) {
      dispatch(updateTitle({ title: data.title }));
    }
  }, [data?.title, dispatch]);

  const handleSubmit = () => {
    if (!url) {
      setErrorUrl("Please paste a valid url");
      return;
    }
    if (!isValidUrl(url)) {
      setErrorUrl("This is not a valid url");
      return;
    }
    if (!title) {
      setErrorTitle("Please type a title");
      return;
    }
    if (date && title) {
      dispatch(
        addNewsItem({
          url,
          date,
          title,
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
      isLoading={isLoading}
      title={title}
      url={url}
      date={date}
      formTitle={"Add an Article"}
      errorTitle={errorTitle}
      errorUrl={errorUrl}
      handleDateChange={handleDateChange}
      handleTitleChange={handleTitleChange}
      handleUrlChange={handleUrlChange}
      handleSubmit={handleSubmit}
    />
  );
};
