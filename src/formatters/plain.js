import _ from 'lodash';

const getString = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};
const getName = (item, nested) => (nested === '' ? `${item.name}` : `${nested}.${item.name}`);
const plain = (difference, nested = '') => {
  const lines = difference
    .filter((item) => item.type !== 'unchanged')
    .map((item) => {
      switch (item.type) {
        case 'changed':
          return `Property '${getName(item, nested)}' was updated. From ${getString(item.value.oldValue)} to ${getString(item.value.newValue)}`;
        case 'added':
          return `Property '${getName(item, nested)}' was added with value: ${getString(item.value)}`;
        case 'removed':
          return `Property '${getName(item, nested)}' was removed`;
        case 'nested':
          return plain(item.children, getName(item, nested));
        default:
          throw new Error(`Type ${item.type} of ${item.name} is not defined`);
      }
    });
  return lines.join('\n');
};
const makePlain = (difference) => plain(difference, '');

export default makePlain;