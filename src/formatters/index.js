import renderStylish from './stylish.js';
import renderPlain from './plain.js';
import renderJson from './json.js';

const formatters = { stylish: renderStylish, plain: renderPlain, json: renderJson };
const renderFormattedTree = (format, difference) => formatters[format](difference.children);

export default renderFormattedTree;