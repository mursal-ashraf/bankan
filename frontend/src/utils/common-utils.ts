import { isEmpty } from 'lodash';

export const ColourLookup: { [key in GeneralColour]: string } = {
  yellow: '#FFCD29',
  orange: '#F5754F',
  blue: '#0000FF',
  white: '#FFFFFF',
};

// Generate UUID
export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

//keyword match
export const keywordFilter = (keyword: string) => (isMatch: string) =>
  isEmpty(keyword) || !!isMatch.match(keyword);
