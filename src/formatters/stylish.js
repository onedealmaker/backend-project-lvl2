import _ from 'lodash';

const addNewLine = '\n';
const addTab = (depth, step = 2) => ' '.repeat(depth * step);

const displayNode = (node, depth) => {
  if (_.isObject(node)) {
    const stringify = Object.keys(node).map((key) => `${addTab(depth + 2)}${key}: ${node[key]}`);
    return `{${addNewLine}${stringify.join(addNewLine)}${addNewLine}${addTab(depth)}}`;
  }
  return node;
};

const displayNested = (absTree, depth = 0) => {
  const refByStatus = {
    deleted: (node, lvl) => `${addTab(lvl + 1)}- ${node.key}: ${displayNode(node.beforeValue, lvl + 2)}`,
    added: (node, lvl) => `${addTab(lvl + 1)}+ ${node.key}: ${displayNode(node.afterValue, lvl + 2)}`,
    unchanged: (node, lvl) => `${addTab(lvl + 2)}${node.key}: ${displayNode(node.value, lvl + 2)}`,
    nested: (node, lvl) => `${addTab(lvl + 2)}${node.key}: ${displayNested(node.children, lvl + 2)}`,
    changed: (node, lvl) => [[refByStatus.deleted(node, lvl)], [refByStatus.added(node, lvl)]],
  };
  const stringifyNodes = absTree.flatMap((node) => refByStatus[node.status](node, depth));
  const result = stringifyNodes.join(addNewLine);
  return `{${addNewLine}${result}${addNewLine}${addTab(depth)}}`;
};

export default displayNested;
