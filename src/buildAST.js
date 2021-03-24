import _ from 'lodash';

const buildNode = (object1, object2) => _.sortBy(_.union(
  Object.keys(object1),
  Object.keys(object2),
))
  .map((key) => {
    if (_.isPlainObject(object1[key]) && _.isPlainObject(object2[key])) {
      return {
        key,
        children: buildNode(object1[key], object2[key]),
        type: 'nested',
      };
    }
    if (_.isEqual(object1[key], object2[key])) {
      return {
        key,
        type: 'unchanged',
        value: object1[key],
      };
    }

    const nodeChanged = { key, type: 'changed' };

    if (!_.has(object2, key)) {
      return { ...nodeChanged, oldValue: object1[key] };
    }
    if (!_.has(object1, key)) {
      return { ...nodeChanged, newValue: object2[key] };
    }
    return { ...nodeChanged, oldValue: object1[key], newValue: object2[key] };
  });

const buildAST = (object1, object2) => ({
  key: 'root',
  type: 'nested',
  children: buildNode(object1, object2),
});

export default buildAST;
