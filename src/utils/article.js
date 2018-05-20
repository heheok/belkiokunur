import striptags from 'striptags';
const WORDS_PER_MINUTE = 160;

export function getReadTime(text) {
  return Math.ceil(striptags(text).split(' ').length / WORDS_PER_MINUTE);
}
