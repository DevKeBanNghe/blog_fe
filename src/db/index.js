import { Dexie } from 'dexie';
import { Blog } from './models';
import { camelCase } from 'lodash';
const VITE_APP_NAME = import.meta.env.VITE_APP_NAME;

const classes = [Blog];
console.log('>>> classes', classes);

const models = classes.reduce(
  (models, classItem) => ({
    ...models,
    [camelCase(classItem.name)]: Object.keys(new classItem()).join(', '),
  }),
  {},
);

console.log('>>> models', models, VITE_APP_NAME);
const db = new Dexie(VITE_APP_NAME);
db.version(1).stores(models);
console.log('>>> ends', db);

Object.keys(models).forEach((tableName) => {
  db.table(tableName).hook('creating', (_, obj) => {
    obj[`${tableName}_id`] = crypto.randomUUID();
  });
});

export { db };
