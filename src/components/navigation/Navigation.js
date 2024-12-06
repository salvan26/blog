import React from "react";
import { Link } from 'react-router-dom';
import classes from './Navigation.module.scss'
import classNames from 'classnames';
const Navigation = () => {
    const signInButton = classNames(classes.navigation__button, classes['navigation__button-sign-in']);
    const signUpButton = classNames(classes.navigation__button, classes['navigation__button-sign-up']);
    const mainButton = classNames(classes.navigation__button, classes['navigation__button-main']);
  

    return (
        <>
        <section className={classes.navigation}>
            <Link  className={mainButton}
                   to="/articles">
                   RealWorld Blog
            </Link>
            <div className={classes.navigation__section}>
          <Link to="/sign-in" className={signInButton}>
            Sign In
          </Link>
          <Link to="/sign-up" className={signUpButton}>
            Sign Up
          </Link>
        </div>
        </section>
        </>
    );
};

export default Navigation;