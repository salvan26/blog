import { useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { createArticleThunk, editArticleThunk } from '../../redux/reducers/createArticleReduser';
import Loader from '../loader/loader';

import classes from './createArticle.module.scss';
import schema from './schema';

const CreateArticle = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.myArticle.isCreatingLoading);
  const editedArticle = useSelector((state) => state.articles.article);
  const user = useSelector((state) => state.account.user);
  const editMode = useSelector((state) => state.myArticle.isEditing);
  const { slug } = useParams();
  const navigation = useNavigate();
  let userToken;
  let defaultTags;

  if (editedArticle || editedArticle?.author?.username === user?.username) {
    defaultTags = editedArticle?.tagList?.map((tag) => {
      return { name: tag };
    });
  }

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    control,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      tagList: editedArticle?.author?.username === user?.username && editMode ? defaultTags : [{ name: '' }],
    },
  });

  if (localStorage.getItem('token') !== null) {
    userToken = JSON.parse(localStorage.getItem('token'));
  }

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  });

  useEffect(() => {
    if (!userToken) {
      navigation('/sign-in');
    }
  }, [userToken, navigation]);

  const handleCreate = (evt) => {
    const tagsList = [];
    evt.tagList.forEach((tag) => {
      if (tag.name !== '') {
        tagsList.push(tag.name);
      }
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
    navigation('/articles');
  };

  const handleEdit = (evt) => {
    const tagsList = [];
    evt.tagList.forEach((tag) => {
      if (tag.name !== '') {
        tagsList.push(tag.name);
      }
    });
    const articleInfo = {
      title: evt.title,
      description: evt.description,
      body: evt.text,
      tagList: tagsList,
      token: userToken,
      slug,
    };
    dispatch(editArticleThunk(articleInfo));
    reset();
    navigation('/articles');
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={classes['article-form-container']}>
      <form
        className={classes['article-form']}
        onSubmit={
          editedArticle?.author?.username === user?.username && editMode
            ? handleSubmit(handleEdit)
            : handleSubmit(handleCreate)
        }
      >
        <h5 className={classes['article-form__header']}>
          {editedArticle?.author?.username === user?.username && editMode ? 'Edit article' : 'Create new article'}
        </h5>
        <label className={classes['article-from__article-title']}>
          <p className={classes['article-form__title']}>Title</p>
          {editedArticle ? (
            <input
              {...register('title')}
              className={classes['article-form__input']}
              defaultValue={
                editedArticle?.author?.username === user?.username && editMode ? editedArticle?.title : null
              }
              placeholder={editedArticle?.author?.username !== user?.username ? 'Title' : null}
              type="text"
            />
          ) : (
            <input {...register('title')} className={classes['article-form__input']} placeholder="Title" type="text" />
          )}
          <div className={classes['article-form__validation-error']}>{errors?.title?.message}</div>
        </label>
        <label className={classes['article-from__article-description']}>
          <p className={classes['article-form__title']}>Short description</p>
          {editedArticle ? (
            <input
              {...register('description')}
              className={classes['article-form__input']}
              defaultValue={
                editedArticle?.author?.username === user?.username && editMode ? editedArticle?.description : null
              }
              placeholder={editedArticle?.author?.username !== user?.username ? 'Sort description' : null}
              type="text"
            />
          ) : (
            <input
              {...register('description')}
              className={classes['article-form__input']}
              placeholder="Description"
              type="text"
            />
          )}
          <div className={classes['article-form__validation-error']}>{errors?.description?.message}</div>
        </label>
        <label className={classes['article-from__article-body']}>
          <p className={classes['article-form__title']}>Text</p>
          {editedArticle ? (
            <textarea
              {...register('text')}
              className={classes['article-form__textarea']}
              defaultValue={editedArticle?.author?.username === user?.username && editMode ? editedArticle?.body : null}
              placeholder={editedArticle?.author?.username !== user?.username ? 'Text' : null}
              type="text"
            />
          ) : (
            <textarea
              {...register('text')}
              className={classes['article-form__textarea']}
              placeholder="Text"
              type="text"
            />
          )}

          <div className={classes['article-form__validation-error']}>{errors?.text?.message}</div>
        </label>
        <form className={classes['article-form__tags-area']}>
          <p className={classes['article-form__title']}>Tags</p>
          <ul>
            {fields.map((item, index) => (
              <li key={item.id} className={classes['article-form__single-tag']}>
                <Controller
                  render={({ field }) => (
                    <div>
                      <input
                        {...register(`tagList.${index}.name`)}
                        className={classes['article-form__tag-input']}
                        {...field}
                        defaultValue={editedArticle ? field.name : null}
                      />
                      <div className={classes['article-form__validation-error']}>
                        {errors?.tagList?.[index]?.name?.message}
                      </div>
                    </div>
                  )}
                  name={`tagList.${index}.name`}
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
                    onClick={() => append({ name: '' })}
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
