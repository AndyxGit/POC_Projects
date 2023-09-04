import { orderByService, orderByVolume, orderByCost, orderByDate, formatCost } from './tableUtils';

describe('orderByService', () => {
  it('should return the array in ascending order based on ratingGroupDescription', () => {
    const array = [
      { ratingGroupDescription: 'B' },
      { ratingGroupDescription: 'C' },
      { ratingGroupDescription: 'A' },
    ];
    const expected = [
      { ratingGroupDescription: 'A' },
      { ratingGroupDescription: 'B' },
      { ratingGroupDescription: 'C' },
    ];
    const result = orderByService(array, true);
    expect(result).toEqual(expected);
  });

  it('should return the array in descending order based on ratingGroupDescription', () => {
    const array = [
      { ratingGroupDescription: 'B' },
      { ratingGroupDescription: 'C' },
      { ratingGroupDescription: 'A' },
    ];
    const expected = [
      { ratingGroupDescription: 'C' },
      { ratingGroupDescription: 'B' },
      { ratingGroupDescription: 'A' },
    ];
    const result = orderByService(array, false);
    expect(result).toEqual(expected);
  });

  it('should return the array as-is if ratingGroupDescription values are the same', () => {
    const array = [
      { ratingGroupDescription: 'B' },
      { ratingGroupDescription: 'A' },
      { ratingGroupDescription: 'B' },
    ];
    const expected = [
      { ratingGroupDescription: 'A' },
      { ratingGroupDescription: 'B' },
      { ratingGroupDescription: 'B' },
    ];
    const result = orderByService(array, true);
    expect(result).toEqual(expected);
  });
});


describe('orderByVolume', () => {
  it('should return the array in ascending order based on volume value', () => {
    const array = [
      { volume: { value: 5 } },
      { volume: { value: 10 } },
      { volume: { value: 3 } },
    ];
    const expected = [
      { volume: { value: 3 } },
      { volume: { value: 5 } },
      { volume: { value: 10 } },
    ];
    const result = orderByVolume(array, true);
    expect(result).toEqual(expected);
  });

  it('should return the array in descending order based on volume value', () => {
    const array = [
      { volume: { value: 5 } },
      { volume: { value: 10 } },
      { volume: { value: 3 } },
    ];
    const expected = [
      { volume: { value: 10 } },
      { volume: { value: 5 } },
      { volume: { value: 3 } },
    ];
    const result = orderByVolume(array, false);
    expect(result).toEqual(expected);
  });

  it('should return the array as-is if volume values are the same', () => {
    const array = [
      { volume: { value: 5 } },
      { volume: { value: 3 } },
      { volume: { value: 5 } },
    ];
    const expected = [
      { volume: { value: 3 } },
      { volume: { value: 5 } },
      { volume: { value: 5 } },
    ];
    const result = orderByVolume(array, true);
    expect(result).toEqual(expected);
  });
});


describe('orderByCost', () => {
  it('should return the array in ascending order based on cost value', () => {
    const array = [
      { cost: { value: 50 } },
      { cost: { value: 10 } },
      { cost: { value: 30 } },
    ];
    const expected = [
      { cost: { value: 10 } },
      { cost: { value: 30 } },
      { cost: { value: 50 } },
    ];
    const result = orderByCost(array, true);
    expect(result).toEqual(expected);
  });

  it('should return the array in descending order based on cost value', () => {
    const array = [
      { cost: { value: 50 } },
      { cost: { value: 10 } },
      { cost: { value: 30 } },
    ];
    const expected = [
      { cost: { value: 50 } },
      { cost: { value: 30 } },
      { cost: { value: 10 } },
    ];
    const result = orderByCost(array, false);
    expect(result).toEqual(expected);
  });

  it('should return the array as-is if cost values are the same', () => {
    const array = [
      { cost: { value: 50 } },
      { cost: { value: 30 } },
      { cost: { value: 50 } },
    ];
    const expected = [
      { cost: { value: 30 } },
      { cost: { value: 50 } },
      { cost: { value: 50 } },
    ];
    const result = orderByCost(array, true);
    expect(result).toEqual(expected);
  });
});


describe('orderByDate', () => {
  it('should sort an array of objects by date in ascending order', () => {
    const inputArray = [
      { cdrDate: { dateTime: '2022-03-01T12:00:00Z' } },
      { cdrDate: { dateTime: '2021-03-01T12:00:00Z' } },
      { cdrDate: { dateTime: '2023-03-01T12:00:00Z' } },
    ];
    const expectedOutput = [
      { cdrDate: { dateTime: '2021-03-01T12:00:00Z' } },
      { cdrDate: { dateTime: '2022-03-01T12:00:00Z' } },
      { cdrDate: { dateTime: '2023-03-01T12:00:00Z' } },
    ];
    const actualOutput = orderByDate(inputArray, true);
    expect(actualOutput).toEqual(expectedOutput);
  });

  it('should sort an array of objects by date in descending order', () => {
    const inputArray = [
      { cdrDate: { dateTime: '2022-03-01T12:00:00Z' } },
      { cdrDate: { dateTime: '2021-03-01T12:00:00Z' } },
      { cdrDate: { dateTime: '2023-03-01T12:00:00Z' } },
    ];
    const expectedOutput = [
      { cdrDate: { dateTime: '2023-03-01T12:00:00Z' } },
      { cdrDate: { dateTime: '2022-03-01T12:00:00Z' } },
      { cdrDate: { dateTime: '2021-03-01T12:00:00Z' } },
    ];
    const actualOutput = orderByDate(inputArray, false);
    expect(actualOutput).toEqual(expectedOutput);
  });
});

describe('formatCost', () => {
  it('returns a formatted cost string', () => {
    const currency = 'EUR';
    const cost = 1234.5678;
    const expected = 'EUR 1,234.57';
    const result = formatCost(currency, cost);
    expect(result).toBe(expected);
  });

  it('returns a formatted cost string with negative value', () => {
    const currency = 'EUR';
    const cost = -1234.5678;
    const expected = '-EUR 1,234.57';
    const result = formatCost(currency, cost);
    expect(result).toBe(expected);
  });
});
