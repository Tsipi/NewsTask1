import { useState } from "react";
import axios from "axios";

interface TData {
  title: string;
}

export const useFetchArticleData = (url: string | null | undefined) => {
  const [data, setData] = useState<TData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchArticle = async (url: string) => {
    setData(null)
    return axios.get(url).then((response) => {
      setIsLoading(false);
      const title = parseTitleFromHTML(response.data);
      if (title) {
        setData({ title });
      }
    });
  };

  return { data, isLoading, fetchArticle };
};

function parseTitleFromHTML(html: string) {
  const el = document.createElement("html");

  el.innerHTML = html;

  document.querySelector(".className");

  return el.querySelector("title")?.innerText;
}
