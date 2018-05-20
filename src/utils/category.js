import { Categories } from '../mockData';

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
