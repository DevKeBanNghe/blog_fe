import { isUndefined, lowerCase } from 'lodash';

const redirectTo = (path) => (window.location = path);

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const convertUndefinedToNull = (values = {}) =>
  Object.entries(values).reduce((acc, [key, value]) => ({ ...acc, [key]: isUndefined(value) ? null : value }), {});

const convertToField = (value) => lowerCase(value).split(' ').join('_');

const removeURLParams = (url) => {
  try {
    const urlObj = new URL(url);
    return `${urlObj.origin}${urlObj.pathname}`;
  } catch (error) {
    return url;
  }
};

export { redirectTo, delay, convertUndefinedToNull, convertToField, removeURLParams };
