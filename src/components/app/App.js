import { Routes, Route } from 'react-router-dom';

import Navigation from '../navigation/navigation';
import ArticlesList from '../article-list/articleList';
import Article from '../article/article';
import SignInForm from '../sing-in-form/singInForm';
import SignUpForm from '../sing-up-form/singUpForm';
import CreateArticle from '../create-article/createArticle';
import EditProfileArticle from '../edit-form/editForm';
import EditArticle from '../edit-article/editArticle';

import classes from './App.module.scss';

const App = () => {
  return (
    <div className={classes.App}>
      <Navigation />
      <Routes>
        <Route path="/" element={<ArticlesList />} />
        <Route path="/articles" element={<ArticlesList />} />
        <Route path="/articles/:slug" element={<Article />} />
        <Route path="/articles/:slug/edit" element={<EditProfileArticle />} />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/new-article" element={<CreateArticle />} />
        <Route path="/profile" element={<EditArticle />} />
      </Routes>
    </div>
  );
};

export default App;
