import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import { closePopup, State } from "../../store";
import { NewsForm } from "../../components/NewsForm/NewsForm";
import { updateDate, updateTitle, updateUrl } from "./addNewsFormSlice";
import { addNewsItem } from "../../components/ItemsList/itemsListSlice";
import { isValidUrl } from "../../utils/isValidUrl";
import { useFetchArticleData } from "../../hooks/useFetchArticleData";

export const AddNewsForm = () => {
  const dispatch = useDispatch();
  const url = useSelector((state: State) => state.addNewsForm.url);
  const title = useSelector((state: State) => state.addNewsForm.title);
  const date = useSelector((state: State) => state.addNewsForm.date);
  const [errorUrl, setErrorUrl] = useState<string | null>(null);
  const [errorTitle, setErrorTitle] = useState<string | null>(null);
  const { data, isLoading, fetchArticle } = useFetchArticleData(url);

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
      //Clearing form variables afer submit           
      dispatch(updateUrl({url: ""}));  
      dispatch(updateTitle({title: ""}));    
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
      formTitle={"Add an Article"}
      errorTitle={errorTitle}
      errorUrl={errorUrl}
      handleDateChange={handleDateChange}
      handleTitleChange={handleTitleChange}
      handleUrlChange={handleUrlChange}
      handleSubmit={handleSubmit}
      onArticleTitleFetch={() => {
        if (url) {
          fetchArticle(url)
        }
      }}
    />
  );
};
