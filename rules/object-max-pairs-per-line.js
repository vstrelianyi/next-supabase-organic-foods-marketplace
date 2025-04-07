// rules/object-max-pairs-per-line.js
module.exports = {
  rules: {
    'object-max-pairs-per-line': {
      create(context) {
        return {
          ObjectExpression(node) {
            const properties = node.properties;
            const totalPairs = properties.length;

            if (totalPairs <= 3) {
              // Allow up to 3 key-value pairs on one line
              const allOnSameLine = properties.every(
                (prop) => prop.loc.start.line === properties[0].loc.start.line
              );
              if (!allOnSameLine && totalPairs > 1) {
                context.report({
                  node,
                  message: 'With 3 or fewer key-value pairs, all should be on the same line.',
                });
              }
            } else {
              // More than 3 pairs: enforce 1 per line
              properties.forEach((prop, index) => {
                if (index > 0 && prop.loc.start.line === properties[index - 1].loc.start.line) {
                  context.report({
                    node: prop,
                    message: 'With more than 3 key-value pairs, each must be on its own line.',
                  });
                }
              });
            }
          },
        };
      },
    },
  },
};