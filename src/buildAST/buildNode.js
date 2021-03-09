import _ from 'lodash';

const isObject = (element) => element instanceof Object && !(element instanceof Array);

const buildParent = (key = '', children = [], level = 0, status = 'default') => {
  return ({
    key,
    children,
    level,
    status
  })
}

const buildLeaf = (key = '', value = '', level = 0, status = 'default') => {
  return ({
    key,
    value,
    level,
    status
  })
}

const buildNodeUpdated = (key, object, level, status = 'default') => {
  if (!_.has(object, key)) {
    return null;
  }
  const value = object[key];
  return isObject(value)
    ? buildParent(
      key,
      Object.keys(value).map((newKey) => buildNodeUpdated(newKey, value, level + 1)),
      level,
      status,
    )
    : buildLeaf(key, value, level, status);
};

const buildNode = (key, object1, object2, level, fn) => {
  if (isObject(object1[key]) && isObject(object2[key])) {
    return fn(object1[key], object2[key], key, level);
  }

  if (_.isEqual(object1[key], object2[key])) {
    return buildLeaf(key, object1[key], level);
  }

  return _.compact([
    buildNodeUpdated(key, object1, level, 'removed'),
    buildNodeUpdated(key, object2, level, 'added'),
  ]);
};

export { buildParent, buildNode };
