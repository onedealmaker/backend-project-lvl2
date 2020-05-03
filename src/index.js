import path from 'path';
import _ from 'lodash';

const stateDifiner = {
    unchanged: '    ',
    added: '  + ',
    deleted: '  - ',
};

const makeString = (status, key, value) => `${stateDifiner[status]}${key}: ${value}\n`;

export default (before, after) => {
    const mergeKeys = Object.keys({ ...before, ...after });
    const showDiff = mergeKeys.map((key) => {
        if (before[key] === after[key]) {
            return makeString('unchanged', key, before[key]);
        } if (!before.hasOwnProperty(key) && after.hasOwnProperty(key)) {
            return makeString('added', key, after[key]);
        } if (before.hasOwnProperty(key) && !after.hasOwnProperty(key)) {
            return makeString('deleted', key, before[key]);
        }
        return `${makeString('added', key, after[key])}${makeString('deleted', key, before[key])}`;
    });
    return `{\n${showDiff.join('')}}`;
};
