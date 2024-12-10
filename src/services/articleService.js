const getSingleArticle = async (slug, rejectedWithValue) => {
  try {
    const articleResponse = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}`);
    if (!articleResponse.ok) {
      throw new Error('ошибка запроса статьи');
    }
    const article = await articleResponse.json();
    return article;
  } catch (error) {
    if (error.status === 404) {
      getSingleArticle(slug, rejectedWithValue);
    }
    return rejectedWithValue({
      message: error.message,
      stack: error.stack,
    });
  }
};

export default getSingleArticle;
