import _ from 'lodash';
import buildNode from './buildNode.js';
import Parent from './Parent.js';

const buildAST = (object1, object2, key = '', level = 0) => {
  const keys = _.sortBy(_.union(Object.keys(object1), Object.keys(object2)));

  const diffs = keys
    .flatMap((childKey) => buildNode(childKey, object1, object2, level + 1, buildAST));
  return new Parent(key, diffs, level);
};

export default buildAST;
