export const likeArticle = async ({ token, slug, favorited }) => {
  console.log(token, slug, favorited);
  const response = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}/favorite`, {
    method: favorited ? 'DELETE' : 'POST',
    headers: {
      // 'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(),
  });

  if (!response.ok) {
    throw new Error('Failed to favorite the article');
  }

  return response.json();
};

export default likeArticle;
