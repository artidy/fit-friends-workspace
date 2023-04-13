import { UpdateEntity } from '../types/update-entity';

function getFormatTitle(title: string): string {
  return `${title[0].toUpperCase()}${title.slice(1)}`;
}

function getUpdateFields(initialObject: UpdateEntity, stateObject: object): UpdateEntity | null {
  const initialObjectKeys = Object.keys(initialObject);
  const result: UpdateEntity = {
    id: initialObject.id
  };

  initialObjectKeys.forEach((key) => {
    const stateKey = key as keyof typeof stateObject;

    if (stateObject.hasOwnProperty(key) &&
      stateObject[stateKey] !== initialObject[stateKey]) {
      result[stateKey] = stateObject[stateKey];
    }
  });

  return Object.keys(result).length === 1 ? null : result;
}

function toggleArrayValue(value: string, array: string[]): string[] {
  if (array.includes(value)) {
    const idxValue = array.indexOf(value);

    return [...array.slice(0, idxValue), ...array.slice(idxValue + 1)];
  }

  return [...array, value];
}

export {
  getFormatTitle,
  getUpdateFields,
  toggleArrayValue
}
