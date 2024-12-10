const getArticles = async (offset, rejectWithValue) => {
  try {
    const responseArticles = await fetch(`https://blog-platform.kata.academy/api/articles?offset=${offset}&&limit=5`);
    if (!responseArticles.ok) {
      throw new Error('The error of response');
    }
    const articles = await responseArticles.json();
    return articles;
  } catch (error) {
    return rejectWithValue(error);
  }
};

export default getArticles;