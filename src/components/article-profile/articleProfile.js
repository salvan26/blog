import { Typography } from 'antd';
import { nanoid } from 'nanoid';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { fetchArticleThunk, likeArticleThunk } from '../../redux/reducers/articlesReducer';
import avatar from '../../images/avatar.jpg';

import classes from './articleProfile.module.scss';

const ArticleProfile = ({ article }) => {
  const { slug } = article;
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false);
  const cutTitle = (title) => {
    if (title.length > 40) {
      return `${title.split('').slice(0, 40).join('')}...`;
    }
    return title;
  };

  const cutDescription = (description) => {
    if (description.length > 150) {
      return `${description.split('').slice(0, 150).join('')}...`;
    }
    return description;
  };

  const handleClick = () => {
    dispatch(fetchArticleThunk(slug));
  };

  useEffect(() => {
    const liked = JSON.parse(localStorage.getItem(`liked_${slug}`));
    if (liked !== null) {
      setIsLiked(liked);
    }
  }, [slug]);

  const handleLike = () => {
    const newFavoritedStatus = !isLiked;
    setIsLiked(newFavoritedStatus);
    localStorage.setItem(`liked_${slug}`, JSON.stringify(newFavoritedStatus));
    dispatch(likeArticleThunk({ slug: article.slug, favorited: newFavoritedStatus }));
  };

  const { Text } = Typography;

  let tags;
  if (article.tagList) {
    tags = article.tagList.map((tag) => (
      <Text key={nanoid()} code>{tag}</Text>
    ));
  } else {
    tags = [];
  }
  
  const updatedFavoritesCount = isLiked ? article.favoritesCount + 1 : article.favoritesCount;

  const creationDate = format(new Date(article.createdAt), 'MMMM dd, yyyy');

  const { image, username } = article;

  return (
    <li className={classes['article-profile']}>
      <section className={classes['article-profile__text']}>
        <div className={classes['article-profile__header']}>
          <Link to={`/articles/${slug}`} className={classes['article-profile__title']} onClick={handleClick}>
            {cutTitle(article.title)}
          </Link>
          <button type="submit" className={classes['article-profile__likes']} onClick={handleLike}>
            <span className={classes['article-profile__like']}>{isLiked ? '❤️' : '🤍'}</span>
            <span className={classes['article-profile__count']}>{updatedFavoritesCount}</span>
          </button>
        </div>
        <div className={classes['article-profile__tags']}>{tags}</div>
        <div className={classes['article-profile__article-text']}>{cutDescription(article.description)}</div>
      </section>
      <section className={classes['article-profile__author']}>
        <div className={classes['article-profile__name-date']}>
          <div className={classes['article-profile__author-name']}>{username}</div>
          <div className={classes['article-profile__date-of-creation']}>{creationDate}</div>
        </div>
        <img src={image || avatar} alt="Author avatar" className={classes['article-profile__author-avatar']} />
      </section>
    </li>
  );
};

export default ArticleProfile;