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

const displayNested = (ast, depth = 0) => {
  const refByStatus = {
    added: (node, level) => `${addTab(level + 1)}+ ${node.key}: ${displayNode(node.value, level + 2)}`,
    unchanged: (node, level) => `${addTab(level + 2)}${node.key}: ${displayNode(node.value, level + 2)}`,
    deleted: (node, level) => `${addTab(level + 1)}- ${node.key}: ${displayNode(node.value, level + 2)}`,
    nested: (node, level) => `${addTab(level + 2)}${node.key}: ${displayNested(node.children, level + 2)}`,
    changed: (node, level) => `${addTab(level + 1)}+ ${node.key}: ${displayNode(node.afterValue, level + 2)}${addNewLine}${addTab(level + 1)}- ${node.key}: ${displayNode(node.beforeValue, level + 2)}`,
  };
  const stringifyNodes = ast.map((node) => refByStatus[node.status](node, depth));
  const result = stringifyNodes.join(addNewLine);
  return `{${addNewLine}${result}${addNewLine}${addTab(depth)}}`;
};

export default displayNested;
