import { useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { createArticleThunk } from '../../redux/reducers/createArticleReduser';
import Loader from '../../components/loader/loader';

import classes from './createArticle.module.scss';
import schema from './schema';

const CreateArticle = () => {
  const isLoading = useSelector((state) => state.myArticle.isCreatingLoading);
  const createdArticle = useSelector((state) => state.myArticle.article);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let userToken;

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    control,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      tagList: [{ tag: '' }],
    },
  });

  if (localStorage.getItem('token') !== null) {
    userToken = JSON.parse(localStorage.getItem('token'));
  }

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  });

  const onSubmit = (evt) => {
    const tagsList = [];
    evt.tagList.forEach((tag) => {
      tagsList.push(tag.tag);
    });
    const article = {
      title: evt.title,
      description: evt.description,
      body: evt.text,
      tagList: tagsList,
      token: userToken,
    };
    dispatch(createArticleThunk(article));
    reset();
  };

  useEffect(() => {
    if (createdArticle) {
      navigate('/');
    }
  }, [createdArticle, navigate]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={classes['article-form-container']}>
      <form className={classes['article-form']} onSubmit={handleSubmit(onSubmit)}>
        <h5 className={classes['article-form__header']}>Create new article</h5>
        <label className={classes['article-from__article-title']}>
          <p className={classes['article-form__title']}>Title</p>
          <input {...register('title')} className={classes['article-form__input']} placeholder="Title" type="text" />
          <div className={classes['article-form__validation-error']}>{errors?.title?.message}</div>
        </label>
        <label className={classes['article-from__article-description']}>
          <p className={classes['article-form__title']}>Short description</p>
          <input
            {...register('description')}
            className={classes['article-form__input']}
            placeholder="Description"
            type="text"
          />
          <div className={classes['article-form__validation-error']}>{errors?.description?.message}</div>
        </label>
        <label className={classes['article-from__article-body']}>
          <p className={classes['article-form__title']}>Text</p>
          <textarea
            {...register('text')}
            className={classes['article-form__textarea']}
            placeholder="Text"
            type="text"
          />
          <div className={classes['article-form__validation-error']}>{errors?.text?.message}</div>
        </label>
        <form className={classes['article-form__tags-area']}>
          <p className={classes['article-form__title']}>Tags</p>
          <ul>
            {fields.map((item, index) => (
              <li key={item.id} className={classes['article-form__single-tag']}>
                <Controller
                  render={({ field }) => (
                    <input
                      {...register(`tagList.${index}.tag`)}
                      className={classes['article-form__tag-input']}
                      {...field}
                    />
                  )}
                  name={`tagList.${index}.tag`}
                  control={control}
                />
                {fields.length !== 1 ? (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className={classes['article-form__delete-button']}
                  >
                    Delete
                  </button>
                ) : null}
                {fields.length - 1 === index ? (
                  <button
                    className={classes['article-form__add-button']}
                    type="button"
                    onClick={() => append({ tag: '' })}
                  >
                    Add tag
                  </button>
                ) : null}
              </li>
            ))}
          </ul>
        </form>
        <button type="submit" className={classes['article-form__button']} disabled={!isValid}>
          Send
        </button>
      </form>
    </div>
  );
};

export default CreateArticle;