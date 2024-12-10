import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector, useDispatch } from 'react-redux';

import { enterAccountThunk } from '../../redux/reducers/acountReducer';
import Loader from '../loader/loader';

import { shema } from './shema';
import classes from './singInForm.module.scss';

const SignInForm = () => {
  const enteringError = useSelector((state) => state.account.isEnteringError);
  const enteringLoader = useSelector((state) => state.account.isEnteringLoader);
  const user = useSelector((state) => state.account.user);
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(shema),
    mode: 'onBlur',
  });

  const onSubmit = (evt) => {
    dispatch(enterAccountThunk(evt));
    reset();
  };

  if (enteringLoader) {
    return <Loader />;
  }

  if (user) {
    navigation('/');
  }
  return (
    <section className={classes['sign-in-section']}>
      <form className={classes['sign-in-form']} method="get" onSubmit={handleSubmit(onSubmit)}>
        <h3 className={classes['sign-in-form__header']}>Sign In</h3>
        <label className={classes['sign-in-form__email-label']}>
          <p className={classes['sign-in-form__text']}>Email address</p>
          <input
            {...register('email')}
            type="email"
            className={errors?.email ? classes['sign-in-form__input--error'] : classes['sign-in-form__input']}
            placeholder="Email address"
          />
          <div className={classes['sign-in-form__validation-error']}>
            {errors?.email ? errors?.email?.message : null}
          </div>
        </label>
        <label className={classes['sign-in-form__password-label']}>
          <p className={classes['sign-in-form__text']}>Password</p>
          <input
            {...register('password')}
            type="password"
            className={errors?.password ? classes['sign-in-form__input--error'] : classes['sign-in-form__input']}
            placeholder="Password"
          />
          <div className={classes['sign-in-form__validation-error']}>
            {errors?.password ? errors?.password?.message : null}
          </div>
        </label>
        <button type="submit" className={classes['sign-in-form__button']} disabled={!isValid}>
          Login
        </button>
        {enteringError ? (
          <div className={classes['sign-in-form__validation-error']}>Incorrect username or email</div>
        ) : null}
        <p className={classes['sign-in-form__notification']}>
          Don&apos;t have an account?{' '}
          <Link to="/sign-up" className={classes['sign-in-form__link']}>
            Sign Up.
          </Link>
        </p>
      </form>
    </section>
  );
};

export default SignInForm;