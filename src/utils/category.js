import Articles, { Categories } from '../mockData';

export function getCategoryName(categoryId) {
  return Categories.filter(({ id }) => {
    return id === categoryId;
  })[0];
}
export function getCategoryId(categorySlug) {
  return Categories.filter(({ slug }) => {
    return slug === categorySlug;
  })[0];
}
export function getArticlesInCategory(categorySlug) {
  return Articles.filter(({ category }) => {
    const currentSlug = getCategoryName(category).slug;
    return currentSlug === categorySlug;
  });
}
