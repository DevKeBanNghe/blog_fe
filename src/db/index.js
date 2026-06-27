import { Dexie } from 'dexie';
import { Blog } from './models';
import { camelCase } from 'lodash';
const VITE_APP_NAME = import.meta.env.VITE_APP_NAME;

const classes = [Blog];

const models = classes.reduce((models, classItem) => {
  const classNew = new classItem();
  return {
    ...models,
    [camelCase(classNew.name)]: Object.keys(classNew)
      .filter((key) => key !== 'name')
      .join(', '),
  };
}, {});

const db = new Dexie(VITE_APP_NAME);
db.version(1).stores(models);

Object.keys(models).forEach((tableName) => {
  db.table(tableName).hook('creating', (_, obj) => {
    obj[`${tableName}_id`] = crypto.randomUUID();
  });
});

export { db };
