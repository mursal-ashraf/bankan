import { isEmpty } from 'lodash';

export const ColourLookup: { [key in GeneralColour]: string } = {
  yellow: '#FFCD29',
  orange: '#F5754F',
  blue: '#0000FF',
  white: '#FFFFFF',
};

export function getISODate(dateString: string) {
  // Step 1: Convert the string to a Date object
  const dateParts = dateString.split(/[- :]/); // Split the string into parts
  const day = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10) - 1; // Month is 0-based in JavaScript (0 = January)
  const year = parseInt(dateParts[2], 10);
  const hours = dateParts[3].includes('PM')
    ? parseInt(dateParts[3], 10) + 12 // Convert to 24-hour format if PM
    : parseInt(dateParts[3], 10);
  const minutes = parseInt(dateParts[4], 10);

  const isoDate = new Date(year, month, day, hours, minutes);

  // Step 2: Format the Date object as an ISO string
  return isoDate.toISOString();
}

export function stripField(object: any, field: string) {
  const { [field]: _, ...rest } = object;

  return rest;
}

export const getSQLStringifiedArr = (c: string[]) =>
  '(' +
  c.reduce(
    (acc, curr, idx) => (idx === c.length - 1 ? acc + curr : acc + curr + ','),
    '',
  ) +
  ')';

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
