const format = (AST) => {
  console.log(JSON.stringify(AST.value, null, '  '));
};

export default format;
