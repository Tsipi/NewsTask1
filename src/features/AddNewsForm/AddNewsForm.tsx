import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closePopup, State, store } from "../../store";
import { updateDate, updateTitle, updateUrl } from "./addNewsForm.slice";
import { isValidUrl } from "../../utils/isValidUrl";
import { useFetchArticleData } from "../../hooks/useFetchArticleData";
import { postNews } from "./addNewsForm.thunk";
import { NewsForm } from "../../components/NewsForm/NewsForm";

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
      store.dispatch(
        postNews({
          url,
          date,
          title,
          companyId: "agxzfmlsbGlzdHNpdGVyGAsSC05ld19Db21wYW55GICAgL6qvKcJDA",
        })
      );
      dispatch(updateUrl({ url: "" }));
      dispatch(updateTitle({ title: "" }));
      // getCompanyNews needs to be dispatched ONLY when postNews is actually resolved
      // I think you can do something like this:
      // store.dispatch(
      //   postNews({
      //     url,
      //     date,
      //     title,
      //     companyId: "agxzfmlsbGlzdHNpdGVyGAsSC05ld19Db21wYW55GICAgL6qvKcJDA",
      //   })
      // ).then(() => { 
      //   dispatch(
      //     getCompanyNews({
      //       companyId: "agxzfmlsbGlzdHNpdGVyGAsSC05ld19Db21wYW55GICAgL6qvKcJDA",
      //     })
      //   );
      //  })
      dispatch(
        getCompanyNews({
          companyId: "agxzfmlsbGlzdHNpdGVyGAsSC05ld19Db21wYW55GICAgL6qvKcJDA",
        })
      );
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
      url={url}
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
          fetchArticle(url);
        }
      }}
    />
  );
};
function getCompanyNews(arg0: { companyId: string }): any {
  throw new Error("Function not implemented.");
}
