import _ from 'lodash';

const defineType = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  } if (_.isString(value)) {
    return `'${value}'`;
  } return value;
};

const displayNested = (absTree, nodePath = []) => {
  const refByStatus = {
    deleted: (node, currentPath) => `Property '${[...currentPath, node.key].join('.')}' was removed`,
    added: (node, currentPath) => `Property '${[...currentPath, node.key].join('.')}' was added with value: ${defineType(node.afterValue)}`,
    unchanged: () => [],
    nested: (node, currentPath) => displayNested(node.children, [...currentPath, node.key]),
    changed: (node, currentPath) => `Property '${[...currentPath, node.key].join('.')}.' was updated. From ${defineType(node.beforeValue)} to ${defineType(node.afterValue)}`,
  };
  const stringifyNodes = absTree.flatMap((node) => refByStatus[node.status](node, nodePath));

  return `${stringifyNodes.join('\n')}`;
};

export default displayNested;
