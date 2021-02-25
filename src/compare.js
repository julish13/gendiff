import _ from 'lodash';

const compareObjects = (object1, object2) => {
  const keys = _.uniq([...Object.keys(object1), ...Object.keys(object2)]).sort();
  const diffs = keys
    .reduce((acc, key) => {
      if (_.has(object1, key) && !_.has(object2, key)) {
        acc.push({ key, value: object1[key], status: 'deleted' });
        return acc;
      }

      if (!_.has(object1, key) && _.has(object2, key)) {
        acc.push({ key, value: object2[key], status: 'added' });
        return acc;
      }

      if (object1[key] === object2[key]) {
        acc.push({ key, value: object1[key], status: 'same' });
        return acc;
      }

      acc.push({ key, value: object1[key], status: 'deleted' });
      acc.push({ key, value: object2[key], status: 'added' });
      return acc;
    }, []);
  return diffs;
};

export default compareObjects;
