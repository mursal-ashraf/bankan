import {
  ColourLookup,
  getISODate,
  stripField,
  getSQLStringifiedArr,
  uuidv4,
  keywordFilter,
} from './common-utils'; // Adjust the import path as needed

describe('ColourLookup', () => {
  test('it should return the correct color code for "yellow"', () => {
    expect(ColourLookup.yellow).toBe('#FFCD29');
  });

  // Add similar tests for other colors if needed
});

describe('getISODate', () => {
  test('it should convert a date string to ISO format', () => {
    const dateString = '09-10-2023-01:30 PM';
    const isoDate = getISODate(dateString);

    expect(isoDate).toBe('2023-10-08T14:30:00.000Z');
  });

  // Add more tests for different date string formats or edge cases
});

describe('stripField', () => {
  test('it should remove a specified field from an object', () => {
    const inputObject = {
      id: 1,
      name: 'John',
      age: 30,
    };

    const strippedObject = stripField(inputObject, 'age');

    expect(strippedObject).toEqual({ id: 1, name: 'John' });
  });

  // Add more tests for different object structures or edge cases
});

describe('getSQLStringifiedArr', () => {
  test('it should return a stringified array with values', () => {
    const inputArray = ['value1', 'value2', 'value3'];
    const sqlString = getSQLStringifiedArr(inputArray);

    expect(sqlString).toBe('(value1,value2,value3)');
  });

  // Add more tests for different input arrays or edge cases
});

describe('uuidv4', () => {
  test('it should generate a valid UUIDv4 string', () => {
    const uuid = uuidv4();

    // Basic regex pattern to match a UUIDv4
    const uuidPattern =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

    expect(uuid).toMatch(uuidPattern);
  });
});

describe('keywordFilter', () => {
  test('it should return true when keyword matches', () => {
    const filterFunction = keywordFilter('apple');
    expect(filterFunction('apple pie')).toBe(true);
  });

  test('it should return false when keyword does not match', () => {
    const filterFunction = keywordFilter('apple');
    expect(filterFunction('banana')).toBe(false);
  });

  test('it should return true when keyword is empty', () => {
    const filterFunction = keywordFilter('');
    expect(filterFunction('any string')).toBe(true);
  });

  // Add more tests for different keyword and isMatch combinations
});
