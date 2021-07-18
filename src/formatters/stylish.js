import _ from 'lodash';

const getSpace = (count) => ('    '.repeat(count));
const getString = (value, count = 0) => {
  if (!_.isObject(value)) {
    return String(value);
  }
  const explainedValue = _.keys(value).map((item) => `${getSpace(count)}    ${item}: ${getString(value[item], count + 1)}`);
  return `{\n${explainedValue.join('\n')}\n${getSpace(count)}}`;
};
const getCommonString = (mark, value, name, count) => `${getSpace(count)}  ${mark} ${name}: ${getString(value, count + 1)}`;
const getChangedString = (name, oldValue, newValue, count) => `${getSpace(count)}  - ${name}: ${getString(oldValue, count + 1)}\n ${getSpace(count)} + ${name}: ${getString(newValue, count + 1)}`;

const stylish = (differences, count = 0) => {
  const arrayOfDifferences = differences.map((item) => {
    switch (item.type) {
      case 'unchanged':
        return getCommonString(' ', item.value, item.name, count);
      case 'changed':
        return getChangedString(item.name, item.value.oldValue, item.value.newValue, count);
      case 'added':
        return getCommonString('+', item.value, item.name, count);
      case 'removed':
        return getCommonString('-', item.value, item.name, count);
      case 'parent':
        return `${getSpace(count)}    ${item.name}: ${stylish(item.children, count + 1)}`;
      default:
        throw new Error(`Type ${item.type} of ${item.name} not recognized`);
    }
  });
  return `{\n${arrayOfDifferences.join('\n')}\n${getSpace(count)}}`;
};
const renderStylish = (differences) => stylish(differences, 0);

export default renderStylish;