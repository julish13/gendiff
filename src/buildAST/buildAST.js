import _ from 'lodash';
import { buildNodeInner, buildNode } from './buildNode.js';

const buildAST = (object1, object2, key = '', level = 0) => {
  const keys = _.sortBy(_.union(Object.keys(object1), Object.keys(object2)));

  return buildNodeInner(
    key,
    keys.flatMap((childKey) => buildNode(childKey, object1, object2, level + 1, buildAST)),
    level,
  );
};

export default buildAST;
