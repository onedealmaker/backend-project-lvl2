import _ from 'lodash';

const numberTypeDefiner = (node) => {
  const checkNode = (node) => Object.keys(node).reduce((acc, key) => {
    if (_.isObject(node[key])) {
      return checkNode(node[key]);
    };
    const num = parseInt(node[key], 10);
    const newValue = (num == node[key] ? num : node[key]);
    return { ...acc, [key]: newValue };
  }, {});
  if (_.isObject(node)) {
    return checkNode(node);
  };
  const number = parseInt(node, 10);
  const newValue = number == node ? number : node;
  return newValue;
};

const buildNode = (before, after, key, func) => {
  if (!(_.has(after, key))) {
    return { key, beforeValue: numberTypeDefiner(before[key]), status: 'deleted' };
  }
  if (!(_.has(before, key))) {
    return { key, afterValue: numberTypeDefiner(after[key]), status: 'added' };
  }
  if (_.isEqual(before[key], after[key])) {
    return { key, value: numberTypeDefiner(before[key]), status: 'unchanged' };
  }
  return (_.isObject(before[key]) && _.isObject(after[key]))
    ? {
      key, children: func(before[key], after[key]), status: 'nested',
    }
    : {
      key, beforeValue: numberTypeDefiner(before[key]), afterValue: numberTypeDefiner(after[key]), status: 'changed',
    };
};

const buildDiff = (before, after) => {
  const currentKeys = Object.keys({ ...before, ...after });
  return currentKeys.map((key) => buildNode(before, after, key, buildDiff));
};

export default buildDiff;
