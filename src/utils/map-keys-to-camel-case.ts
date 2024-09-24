import { mapObjectKeys } from './utils';

const capitalize = (string: string) => {
  if (string.length === 0) {
    return '';
  }

  return `${string[0].toUpperCase()}${string.slice(1)}`;
};

const snakeToCamel = (string: string) => {
  const [start, ...rest] = string.split('_');

  return `${start}${rest.map(capitalize).join('')}`;
};

export const mapKeysToCamelCase = mapObjectKeys(snakeToCamel);
