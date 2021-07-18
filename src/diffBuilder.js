import _ from 'lodash';

const getDifference = (data1, data2) => {
  const keysFromData1 = _.keys(data1);
  const keysFromData2 = _.keys(data2);
  const commonKeys = _.union(keysFromData1, keysFromData2);
  const sortedCommonKeys = _.sortBy(commonKeys);
  const difference = sortedCommonKeys.map((item) => {
    if (_.isPlainObject(data1[item]) && _.isPlainObject(data2[item])) {
      return { name: item, children: getDifference(data1[item], data2[item]), type: 'nested' };
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
  return difference;
};

const buildDifferenceTree = (data1, data2) => {
  const difference = getDifference(data1, data2);
  return { type: 'root', children: difference };
};

export default buildDifferenceTree;
