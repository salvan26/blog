import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { Typography, Modal } from 'antd';
import { format } from 'date-fns';
import Markdown from 'markdown-to-jsx';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { fetchArticleThunk, fetchArticlesThunk, likeArticleThunk } from '../../redux/reducers/articlesReducer';
import Loader from '../loader/loader';
import Error from '../error/error';
import avatar from '../../images/avatar.jpg';
import { deleteArticleThunk } from '../../redux/reducers/deleteReduser';

import classes from './article.module.scss';

const Article = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const article = useSelector((state) => state.articles.article);
  const isLoading = useSelector((state) => state.articles.isLoading);
  const isError = useSelector((state) => state.articles.isError);
  const user = useSelector((state) => state.account.user);
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    dispatch(fetchArticlesThunk());
    dispatch(fetchArticleThunk(slug));
  }, [dispatch, slug]);

  useEffect(() => {
    const liked = JSON.parse(localStorage.getItem(`liked_${slug}`));
    if (liked !== null) {
      setIsLiked(liked);
    }
  }, [slug]);

  const handleDelete = () => {
    dispatch(deleteArticleThunk(article.slug));
    setIsModalVisible(false);

    navigate('/articles');
  };
  const oneEdit = () => {
    navigate(`/articles/${article.slug}/edit`);
  };

  const handleLike = () => {
    const newFavoritedStatus = !isLiked;
    setIsLiked(newFavoritedStatus);
    console.log(slug);
    dispatch(likeArticleThunk({ slug: article.slug, favorited: article.favorited }));

    localStorage.setItem(`liked_${slug}`, JSON.stringify(newFavoritedStatus));
  };
  if (!article || isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error />;
  }

  const { Text } = Typography;
  let tags;
  if (article.tagList) {
    tags = article.tagList.map((tag) => (
      <Text code key={nanoid()}>
        {tag}
      </Text>
    ));
  } else {
    tags = [];
  }
  const updatedFavoritesCount = isLiked ? article.favoritesCount + 1 : article.favoritesCount;
  const creationDate = format(new Date(article.createdAt), 'MMMM dd, yyyy');

  return (
    <section className={classes['article-section']}>
      <div className={classes.article}>
        <section className={classes['article__text-section']}>
          <div className={classes.article__header}>
            <h5 className={classes.article__title}>{article.title}</h5>
            <button type="submit" className={classes['article__likes-section']} onClick={handleLike}>
              <span className={classes.article__like}>{isLiked ? '❤️' : '🤍'}</span>
              <span className={classes.article__count}>{updatedFavoritesCount}</span>
            </button>
          </div>
          <div className={classes['article__tags-section']}>{tags}</div>
          <div className={classes['article__article-text']}>{article.description}</div>
        </section>
        <section className={classes['article__author-section']}>
          <div className={classes['article__name-date-section']}>
            <div>
              <div className={classes['article__author-name']}>{article.author.username}</div>
              <div className={classes['article__date-of-creation']}>{creationDate}</div>
            </div>
            <img
              src={article.author.image || avatar}
              alt="Author avatar"
              className={classes['article__author-avatar']}
            />
          </div>
          {article.author.username === user?.username ? (
            <div className={classes.article__button}>
              <button
                type="button"
                className={classes['article__delete-button']}
                onClick={() => setIsModalVisible(true)}
              >
                Delete
              </button>
              <button type="button" className={classes['article__edit-button']} onClick={oneEdit}>
                Edit
              </button>
            </div>
          ) : null}
        </section>
      </div>
      <div className={classes['article-body']}>
        <Markdown>{article.body}</Markdown>
      </div>
      <Modal
        title="Confirm Deletion"
        visible={isModalVisible}
        onOk={handleDelete}
        onCancel={() => setIsModalVisible(false)}
      >
        <p>Are you sure you want to delete this article?</p>
      </Modal>
    </section>
  );
};

export default Article;
