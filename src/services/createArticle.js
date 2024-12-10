export const createArticle = async (articleInfo, rejected) => {
  try {
    const article = {
      article: {
        title: articleInfo.title,
        description: articleInfo.description,
        body: articleInfo.body,
        tagList: articleInfo.tagList,
      },
    };
    const createArticleRequest = await fetch('https://blog-platform.kata.academy/api/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Token ${articleInfo.token}` },
      body: JSON.stringify(article),
    });
    if (!createArticleRequest.ok) {
      throw new Error('error in createArticleRequest');
    }
    const successCreation = createArticleRequest.json();
    return successCreation;
  } catch (error) {
    return rejected(error);
  }
};

export const editArticle = async (updatedArticleInfo, rejected) => {
  try {
    const article = {
      article: {
        title: updatedArticleInfo.title,
        description: updatedArticleInfo.description,
        body: updatedArticleInfo.body,
        tagList: updatedArticleInfo.tagList,
      },
    };
    const editRequest = await fetch(`https://blog-platform.kata.academy/api/articles/${updatedArticleInfo.slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Token ${updatedArticleInfo.token}` },
      body: JSON.stringify(article),
    });
    if (!editRequest.ok) {
      throw new Error('error in createArticleRequest');
    }
    const successEdition = await editRequest.json();
    return successEdition;
  } catch (error) {
    return rejected(error);
  }
};
