import { SpinnerDotted } from 'spinners-react';

import classes from './loader.module.scss';

const Loader = () => {
  return (
    <div className={classes.loader}>
      <SpinnerDotted color="#2196F3" />
      <p className={classes.loading__text}>Загрузка постов...</p>
    </div>
  );
};

export default Loader;
