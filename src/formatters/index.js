import stylish from './stylish';
import plain from './plain';

const formatDispatcher = {
  stylish: (abstractTree) => stylish(abstractTree),
  plain: (abstractTree) => plain(abstractTree),
  json: (abstractTree) => JSON.stringify(abstractTree),
};

export default formatDispatcher;
