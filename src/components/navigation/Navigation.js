import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { fetchArticlesThunk } from '../../redux/reducers/articlesReducer';
import { accountReducerSlice } from '../../redux/reducers/acountReducer';
import avatar from '../../images/avatar.jpg';

import classes from './Navigation.module.scss';

const Navigation = () => {
  const page = useSelector((state) => state.articles.page);
  let user = useSelector((state) => state.account.user);
  const dispatch = useDispatch();
  const mainButton = classNames(classes.navigation__button, classes['navigation__button-main']);
  const signInButton = classNames(classes.navigation__button, classes['navigation__button-sign-in']);
  const signUpButton = classNames(classes.navigation__button, classes['navigation__button-sign-up']);
  const createArticle = classNames(classes.navigation__button, classes['navigation__button-create-article']);
  const profile = classNames(classes.navigation__button, classes['navigation__button-profile']);
  const logOutButton = classNames(classes.navigation__button, classes['navigation__button-log-out']);

  const handleLogoutClick = () => {
    dispatch(accountReducerSlice.actions.logOut());
  };

  const handleClick = () => {
    dispatch(fetchArticlesThunk((page - 1) * 5));
  };
  if (!user && localStorage.getItem('token') !== null) {
    const dataFromStorage = JSON.parse(localStorage.getItem('user'));
    user = dataFromStorage;
  }

  return (
    <section className={classes.navigation}>
      <Link to="/articles" className={mainButton} onClick={handleClick}>
        Realworld Blog
      </Link>

      {user ? (
        <div className={classes.navigation__section}>
          <Link to="/new-article" className={createArticle}>
            Create article
          </Link>
          <Link to="/profile" className={profile}>
            <span>{user?.username || 'user'} </span>
            <img src={user?.image || avatar} alt="user avatar" className={classes['navigation__button-image']} />
          </Link>
          <a href="/" className={logOutButton} onClick={handleLogoutClick}>
            Log Out
          </a>
        </div>
      ) : (
        <div className={classes.navigation__section}>
          <Link to="/sign-in" className={signInButton}>
            Sign In
          </Link>
          <Link to="/sign-up" className={signUpButton}>
            Sign Up
          </Link>
        </div>
      )}
    </section>
  );
};

export default Navigation;