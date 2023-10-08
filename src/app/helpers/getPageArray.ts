export const getPageArray = (
  articlesCount: number,
  limit: number
): number[] => {
  const arrLength = Math.ceil(articlesCount / limit);

  return Array.from({ length: arrLength }, (_, index) => index + 1);
};
