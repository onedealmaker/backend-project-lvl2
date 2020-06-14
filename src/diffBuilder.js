import _ from 'lodash';

const areNodesNested = (node1, node2) => _.isObject(node1) && _.isObject(node2);

const buildNode = (before, after, key, func) => {
  if (!(_.has(after, key))) {
    return { key, value: before[key], status: 'deleted' };
  }
  if (!(_.has(before, key))) {
    return { key, value: after[key], status: 'added' };
  }
  if (_.isEqual(before[key], after[key])) {
    return { key, value: before[key], status: 'unchanged' };
  }
  return (areNodesNested(before[key], after[key]))
    ? {
      key, children: func(before[key], after[key]), status: 'nested',
    }
    : {
      key, beforeValue: before[key], afterValue: after[key], status: 'changed',
    };
};

const buildDiff = (before, after) => {
  const currentKeys = Object.keys({ ...before, ...after });
  return currentKeys.map((key) => buildNode(before, after, key, buildDiff));
};

export default buildDiff;
