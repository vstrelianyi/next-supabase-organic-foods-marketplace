import objectMaxPairsPerLine from './object-max-pairs-per-line.mjs';
import singleSpaceClassname from './single-space-classname.mjs';

const plugin = {
  rules: {
    'single-space-classname': singleSpaceClassname,
    // 'object-max-pairs-per-line': objectMaxPairsPerLine,
  },
};

export default plugin;