/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-unknown-property */
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { editArticleThunk } from '../../redux/reducers/createArticleReduser';
import Loader from '../loader/loader';

import classes from './editForm.module.scss';
import schema from './shema';

const EditProfileArticle = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const article = useSelector((state) => state.articles.article);
  const isEditingLoading = useSelector((state) => state.myArticle.isEditingLoading);
  const userToken = useSelector((state) => state.account.token);

  const defaultTags = article.tagList.map((tag) => {
    return { name: tag };
  });
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
      tagList: defaultTags,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  });

  const onSubmit = (evt) => {
    const tagsList = [];
    evt.tagList.forEach((tag) => {
      tagsList.push(tag.name);
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

  if (isEditingLoading) {
    return <Loader />;
  }

  return (
    <div className={classes['edit-form-container']}>
      <form className={classes['edit-form']} onSubmit={handleSubmit(onSubmit)}>
        <h5 className={classes['edit-form__header']}>Edit article</h5>
        <label className={classes['edit-from__article-title']}>
          <p className={classes['edit-form__title']}>Title</p>
          <input
            {...register('title')}
            className={classes['edit-form__input']}
            defaultValue={article.title}
            type="text"
          />
          <div className={classes['edit-form__validation-error']}>{errors?.title?.message}</div>
        </label>
        <label className={classes['edit-from__article-description']}>
          <p className={classes['edit-form__title']}>Short description</p>
          <input
            {...register('description')}
            className={classes['edit-form__input']}
            defaultValue={article.description}
            type="text"
          />
          <div className={classes['edit-form__validation-error']}>{errors?.description?.message}</div>
        </label>
        <label className={classes['edit-from__article-body']}>
          <p className={classes['edit-form__title']}>Text</p>
          <textarea
            {...register('text')}
            className={classes['edit-form__textarea']}
            defaultValue={article.body}
            type="text"
          />
          <div className={classes['edit-form__validation-error']}>{errors?.text?.message}</div>
        </label>
        <form className={classes['edit-form__tags-area']}>
          <p className={classes['edit-form__title']}>Tags</p>
          <ul>
            {fields.map((item, index) => (
              <li key={item.id} className={classes['edit-form__single-tag']}>
                <Controller
                  render={({ field }) => (
                    <input
                      {...register(`tagList.${index}.name`)}
                      className={classes['edit-form__tag-input']}
                      {...field}
                      defaultValue={field.name}
                    />
                  )}
                  name={`tagList.${index}.name`}
                  control={control}
                />
                {fields.length !== 1 ? (
                  <button type="button" onClick={() => remove(index)} className={classes['edit-form__delete-button']}>
                    Delete
                  </button>
                ) : null}
                {fields.length - 1 === index ? (
                  <button
                    className={classes['edit-form__add-button']}
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
        <button type="submit" className={classes['edit-form__button']} disabled={!isValid}>
          Send
        </button>
      </form>
    </div>
  );
};
export default EditProfileArticle;
