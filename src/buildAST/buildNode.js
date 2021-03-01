import _ from 'lodash';
import Leaf from './Leaf.js';
import Parent from './Parent.js';

const isObject = (element) => element instanceof Object && !(element instanceof Array);

const buildNodeUpdated = (key, object, level, status = 'default') => {
  if (!_.has(object, key)) {
    return null;
  }
  const value = object[key];
  return isObject(value)
    ? new Parent(
      key,
      Object.keys(value).map((newKey) => buildNodeUpdated(newKey, value, level + 1)),
      level,
      status,
    )
    : new Leaf(key, value, level, status);
};

const buildNode = (key, object1, object2, level, fn) => {
  if (isObject(object1[key]) && isObject(object2[key])) {
    return new Parent(key, fn(object1[key], object2[key], level + 1), level);
  }

  if (_.isEqual(object1[key], object2[key])) {
    return new Leaf(key, object1[key], level);
  }

  return _.compact([
    buildNodeUpdated(key, object1, level, 'deleted'),
    buildNodeUpdated(key, object2, level, 'added'),
  ]);
};

export default buildNode;
