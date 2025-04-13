const singleSpaceClassname = {
  meta: {
    type: 'layout',
    docs: {
      description: 'Enforce a single space between class names in className attribute',
      category: 'Stylistic Issues',
      recommended: true,
    },
    fixable: 'whitespace',
    schema: [],
  },
  create( context ) {
    return {
      JSXAttribute( node ) {
        if ( node.name.name === 'className' && node.value && node.value.type === 'Literal' ) {
          const value = node.value.value;
          const classNames = value.trim().split( /\s+/ );
          if ( classNames.length > 1 ) {
            const expected = classNames.join( ' ' );
            if ( value !== expected ) {
              context.report( {
                node,
                message: 'Multiple spaces found in className. Use exactly one space between class names.',
                fix( fixer ) {
                  return fixer.replaceText( node.value, `"${expected}"` );
                },
              } );
            }
          }
        }
      },
    };
  },
};

export default singleSpaceClassname;