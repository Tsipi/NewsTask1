import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closePopup, State, store } from "../../store";
import { NewsForm } from "../../components/NewsForm/NewsForm";
import { updateTitle, updateDate, updateUrl } from "./editNewsForm.slice";
import { useFetchArticleData } from "../../hooks/useFetchArticleData";
import { isValidUrl } from "../../utils/isValidUrl";
import { editNews, getCompanyNews } from "../Company/Company.thunks";
import { getCompanyId } from "../../utils/getCompanyId";

export const EditNewsForm = () => {
  const dispatch = useDispatch();
  const selectedItemId = useSelector(
    (state: State) => state.editNewsForm.selectedItemId
  );
  const title = useSelector((state: State) => state.editNewsForm.title);
  const url = useSelector((state: State) => state.editNewsForm.url);
  const date = useSelector((state: State) => state.editNewsForm.date);

  const itemsList = useSelector((state: State) => state.companyNews.items);
  const initialNewsItem = itemsList.find((item) => {
    return item.id === selectedItemId;
  });

  const [errorUrl, setErrorUrl] = useState<string | null>(null);
  const [errorTitle, setErrorTitle] = useState<string | null>(null);

  const { data, isLoading, fetchArticle } = useFetchArticleData(url);

  useEffect(() => {
    if (data?.title) {
      dispatch(updateTitle({ title: data.title }));
    }
  }, [data?.title, dispatch]);

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
    if (url && date && title && selectedItemId) {
      store
        .dispatch(
          editNews({
            url,
            companyId: getCompanyId(),
            date,
            title,
            newsId: selectedItemId,
          })
        )
        .then(() => {
          store.dispatch(
            getCompanyNews({
              companyId: getCompanyId(),
            })
          );
        });
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
      formTitle={"Edit an Article"}
      url={url}
      title={title}
      date={date}
      errorTitle={errorTitle}
      errorUrl={errorUrl}
      handleDateChange={handleDateChange}
      handleTitleChange={handleTitleChange}
      handleUrlChange={handleUrlChange}
      handleSubmit={handleSubmit}
      onArticleTitleFetch={() => {
        if (url) {
          fetchArticle(url);
        }
      }}
    />
  );
};
