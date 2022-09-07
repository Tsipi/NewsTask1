import { format } from "date-fns";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNewsItem } from "../../components/ItemsList/ItemsList.slice";
import { State, openPopup, store } from "../../store";
import { editNewsForm } from "../EditNewsForm/editNewsFormSlice";
import { getCompanyNews } from "./Company.thunks";
import deleteIcon from "../../assets/svg/delete-icon.svg";
import editIcon from "../../assets/svg/edit-icon.svg";
import styles from "./Company.module.scss";

export const Company = () => {
  const dispatch = useDispatch();
  const itemsList = useSelector((state: State) => state.companyNews.items);
  const isLoading = useSelector((state: State) => state.companyNews.isLoading);

  const deleteArticle = (id: number) => {
    dispatch(deleteNewsItem({ id }));
  };

  const editArticle = (id: number) => {
    dispatch(openPopup({ popup: "edit" }));
    dispatch(editNewsForm({ selectedItemId: id }));
  };

  React.useEffect(() => {
    store.dispatch(
      getCompanyNews({
        companyId: "agxzfmlsbGlzdHNpdGVyGAsSC05ld19Db21wYW55GICAgL6qvKcJDA",
      })
    );
  }, []);

  return (
    <>
      {isLoading && (
        <div className={styles.newsLoading}>LOADING NEWS FORM COMPANY...</div>
      )}
      <div className={styles.itemsList}>
        <ul className={styles.itemsListUl}>
          {itemsList.map((item, index) => (
            <li key={index}>
              <a href={item.url} className="news-wrap">
                <div className={styles.newsTitle}>
                  <span>{new URL(item.url).hostname}</span> -{" "}
                  <span>{format(new Date(item.date), "dd/MM/yyyy")}</span>
                </div>
                <div>{item.title}</div>
              </a>
              <div className="btns-wrap">
                <button
                  className="delete-btn"
                  onClick={() => deleteArticle(item.id)}
                >
                  <img src={deleteIcon} alt="delete icon" />
                </button>
                <button
                  className="edit-btn"
                  onClick={() => editArticle(item.id)}
                >
                  <img src={editIcon} alt="edit icon" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
