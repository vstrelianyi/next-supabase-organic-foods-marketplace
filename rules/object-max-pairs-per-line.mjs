const objectMaxPairsPerLine = {
  meta: {
    type: 'layout',
    docs: {
      description: 'Enforce max 3 key-value pairs per line for objects with 3 or fewer pairs, and 1 per line for more',
      category: 'Stylistic Issues',
      recommended: true,
    },
    schema: [],
  },
  create( context ) {
    return {
      ObjectExpression( node ) {
        const properties = node.properties;
        const totalPairs = properties.length;

        if ( totalPairs <= 3 ) {
          const allOnSameLine = properties.every(
            ( prop ) => prop.loc.start.line === properties[0].loc.start.line
          );
          if ( !allOnSameLine && totalPairs > 1 ) {
            context.report( {
              node,
              message: 'With 3 or fewer key-value pairs, all should be on the same line.',
            } );
          }
        } else {
          properties.forEach( ( prop, index ) => {
            if ( index > 0 && prop.loc.start.line === properties[index - 1].loc.start.line ) {
              context.report( {
                node: prop,
                message: 'With more than 3 key-value pairs, each must be on its own line.',
              } );
            }
          } );
        }
      },
    };
  },
};

export default objectMaxPairsPerLine;