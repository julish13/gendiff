import _ from 'lodash';

const compareObjects = (object1, object2) => {
  const keys = _.uniq([...Object.keys(object1), ...Object.keys(object2)]).sort();
  const diff = keys
    .reduce((acc, key) => {
      if (_.has(object1, key) && !_.has(object2, key)) {
        acc.push(`  - ${key}: ${object1[key]}`);
        return acc;
      }

      if (!_.has(object1, key) && _.has(object2, key)) {
        acc.push(`  + ${key}: ${object2[key]}`);
        return acc;
      }

      if (object1[key] === object2[key]) {
        acc.push(`    ${key}: ${object1[key]}`);
        return acc;
      }

      acc.push(`  - ${key}: ${object1[key]}`);
      acc.push(`  + ${key}: ${object2[key]}`);
      return acc;
    }, [])
    .join('\n');
  const result = `
{
${diff}
}`;

  return result;
};

export default compareObjects;