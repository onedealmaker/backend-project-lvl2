import _ from 'lodash';

const getDifferences = (data1, data2) => {
  const keysFromData1 = _.keys(data1);
  const keysFromData2 = _.keys(data2);
  const commonKeys = _.union(keysFromData1, keysFromData2);
  const sortedCommonKeys = _.sortBy(commonKeys);
  const differences = sortedCommonKeys.map((item) => {
    if (_.isPlainObject(data1[item]) && _.isPlainObject(data2[item])) {
      return { name: item, children: getDifferences(data1[item], data2[item]), type: 'parent' };
    }
    if (!_.has(data1, item)) {
      return { name: item, value: data2[item], type: 'added' };
    }
    if (!_.has(data2, item)) {
      return { name: item, value: data1[item], type: 'removed' };
    }
    if (!_.isEqual(data1[item], data2[item])) {
      return {
        name: item,
        value: { oldValue: data1[item], newValue: data2[item] },
        type: 'changed',
      };
    }
    return { name: item, value: data1[item], type: 'unchanged' };
  });
  return differences;
};

const buildDifferencesTree = (data1, data2) => {
  const differences = getDifferences(data1, data2);
  return { type: 'root', children: differences };
};

export default buildDifferencesTree;
