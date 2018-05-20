import Articles, { Categories } from '../mockData';

export function getCategoryName(categoryId) {
  return Categories.find(({ id }) => {
    return id === categoryId;
  });
}
export function getCategoryId(categorySlug) {
  return Categories.find(({ slug }) => {
    return slug === categorySlug;
  });
}
export function getArticlesInCategory(categorySlug) {
  return Articles.filter(({ category }) => {
    const currentSlug = getCategoryName(category).slug;
    return currentSlug === categorySlug;
  });
}
