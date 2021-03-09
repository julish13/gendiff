import _ from 'lodash';

const isObject = (element) => element instanceof Object && !(element instanceof Array);

const buildNodeInner = (key = '', value = '', level = 0, status = 'unchanged') => ({
  key,
  value,
  level,
  status,
});

const buildNodeUpdated = (key, object, level, status = 'unchanged') => {
  if (!_.has(object, key)) {
    return null;
  }
  const value = object[key];
  const newValue = (isObject(object[key]))
    ? Object.keys(value).map((newKey) => buildNodeUpdated(newKey, value, level + 1))
    : value;
  return buildNodeInner(key, newValue, level, status);
};

const buildNode = (key, object1, object2, level, fn) => {
  if (isObject(object1[key]) && isObject(object2[key])) {
    return fn(object1[key], object2[key], key, level);
  }

  if (_.isEqual(object1[key], object2[key])) {
    return buildNodeInner(key, object1[key], level);
  }

  return _.compact([
    buildNodeUpdated(key, object1, level, 'removed'),
    buildNodeUpdated(key, object2, level, 'added'),
  ]);
};

export { buildNodeInner, buildNode };
