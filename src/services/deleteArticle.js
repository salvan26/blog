export const deleteArticle = async (slug, token, rejected) => {
    try {
      const response = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete article');
      }
  
      return await response.json();
    } catch (error) {
      return rejected(error);
    }
  };