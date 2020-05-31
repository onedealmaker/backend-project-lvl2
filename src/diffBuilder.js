import _ from 'lodash';

const areNodesNested = (node1, node2) => _.isObject(node1) && _.isObject(node2);

const buildNode = (before, after, key, fn) => {
  if (_.isEqual(before[key], after[key])) {
    return { key, status: 'unchanged', value: before[key] };
  }
  if (!(_.has(before, key))) {
    return { key, status: 'added', value: after[key] };
  }
  if (!(_.has(after, key))) {
    return { key, status: 'removed', value: before[key] };
  }
  return (areNodesNested(before[key], after[key]))
    ? {
      key, status: 'nested', children: fn(before[key], after[key]),
    }
    : {
      key, status: 'changed', oldValue: before[key], newValue: after[key],
    };
};

const buildDiff = (before, after) => {
  const currentKeys = _.union(Object.keys(before), Object.keys(after));
  return currentKeys.map((key) => buildNode(before, after, key, buildDiff));
};

export default buildDiff;
