import { combineReducers } from "redux";
import { getArticlesReducer } from "./articlesReducer"; 
import { accountReducer } from "./acountReducer";
import { createArticleReducer } from "./createArticleReduser";
import { deleteArticleReducer } from "./deleteReduser";


const rootReducer = combineReducers({ 
    articles: getArticlesReducer,
    account: accountReducer,
    myArticle: createArticleReducer,
    article: deleteArticleReducer,
});


export default rootReducer;