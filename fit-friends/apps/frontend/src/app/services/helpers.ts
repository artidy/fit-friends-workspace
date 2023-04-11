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

export {
  getFormatTitle,
  getUpdateFields
}
