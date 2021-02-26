import getDiff from '../src/getDiff.js';
import _ from 'lodash';
import getFileData from '../src/parsers.js';
import getFixturePath from '../src/utils.js';

const testa = (object1, object2) => {
  const keys = _.uniq([...Object.keys(object1), ...Object.keys(object2)]).sort();
  const diffs = keys
    .reduce((acc, key) => {
      const conditions = {
        isDeleted: _.has(object1, key) && !_.has(object2, key),
        isAdded: !_.has(object1, key) && _.has(object2, key),
        isEqual: _.isEqual(object1[key], object2[key]),
      }
  
      const root = {
        key,
        value: object1[key],
        status: 'equal',
      }

      const toArray = (obj) => {
        const keyss = Object.keys(obj);
        return keyss.reduce((acc, keyy) => {
          if(!(obj[keyy] instanceof Object) || (obj[keyy] instanceof Array)) {
            acc.push({ ...root, key: keyy, value: obj[keyy] });
            return acc;
          }
          acc.push({ ...root, key: keyy, value: toArray(obj[keyy]) });
          return acc;
        }, []);
      }
  
      if (conditions.isDeleted) {
        if(!(object1[key] instanceof Object) || (object1[key] instanceof Array)) {
          acc.push({ ...root, status: 'deleted' });
          return acc;
        }
        acc.push({ ...root, value: toArray(_.cloneDeep(object1[key])), status: 'deleted' });
        return acc;
      }
  
      if (conditions.isAdded) {
        
        if(!(object2[key] instanceof Object) || (object2[key] instanceof Array)) {
          acc.push({ ...root, value: object2[key], status: 'added' });
          return acc;
        }
        acc.push({ ...root, value: toArray(_.cloneDeep(object2[key])), status: 'added' });
        return acc;
      }
  
//оба не объекты: равны
  
      if((!(object1[key] instanceof Object) || (object1[key] instanceof Array))
      && (!(object2[key] instanceof Object) || (object2[key] instanceof Array))
      && conditions.isEqual) {
        acc.push(_.cloneDeep(root));
        return acc;
      }
  
      //оба объекты: равны, не равны

      if (
        (
          (object1[key] instanceof Object) && !(object1[key] instanceof Array)
      && (object2[key] instanceof Object) && !(object2[key] instanceof Array)
      )
      ) {
        acc.push({ ...root, value: getDiff(_.cloneDeep(object1[key]), _.cloneDeep(object2[key])) });
        return acc;
      }

      //для первого
      if (
        !(object1[key] instanceof Object) || (object1[key] instanceof Array)
        ) {
        acc.push({ ...root, status: 'deleted' });
      } else {
        acc.push({ ...root, value: toArray(_.cloneDeep(object1[key])), status: 'deleted' });
      }

      //для второго

      if (!(object2[key] instanceof Object) || (object2[key] instanceof Array)) {
        acc.push({ ...root, value: object2[key], status: 'added' });
      } else {
        acc.push({ ...root, value: toArray(_.cloneDeep(object2[key])), status: 'added' });
      }

      return acc;

  
    }, []);
  return diffs;
};
const jsonRecursiveFilePath1 = getFixturePath('recursive1.json');
const jsonRecursiveFilePath2 = getFixturePath('recursive2.json');
const result = testa(getFileData(jsonRecursiveFilePath1), getFileData(jsonRecursiveFilePath2));

test('getDiff', () => {
  expect(getDiff(
    getFileData(jsonRecursiveFilePath1), 
    getFileData(jsonRecursiveFilePath2)))
  .toEqual(result);
});