const plainFormat = (AST, path = '') => {
  // const ASTFormatted = AST.reduce((acc, node) => {
  //   if (_.has
  // }, []);
  const ASTFormatted = AST.map((node) => {
    if (Object.getPrototypeOf(node) === Leaf.prototype) {
      const name = path;
      const status = node.getStatus;
      const { value } = node;
    }
  }).join('\n');
};
