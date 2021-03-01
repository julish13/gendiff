import _ from 'lodash';
import Leaf from './Leaf.js';
import Parent from './Parent.js';

const isObject = (element) => element instanceof Object && !(element instanceof Array);

const buildNodeUpdated = (key, object, status = 'equal') => {
  if (!_.has(object, key)) {
    return null;
  }
  const value = object[key];
  return isObject(value)
    ? new Parent(
      key,
      Object.keys(value).map((newKey) => buildNodeUpdated(newKey, value)),
      status,
    )
    : new Leaf(key, value, status);
};

const buildNode = (key, object1, object2, fn) => {
  if (isObject(object1[key]) && isObject(object2[key])) {
    return new Parent(key, fn(object1[key], object2[key]));
  }

  if (_.isEqual(object1[key], object2[key])) {
    return new Leaf(key, object1[key]);
  }

  return _.compact([
    buildNodeUpdated(key, object1, 'deleted'),
    buildNodeUpdated(key, object2, 'added'),
  ]);
};

export default buildNode;
