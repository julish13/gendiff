const formatter = (AST, format = 'stylish') => {
  const ASTFormatted = AST.map((node) => node.stringify(format)).join('\n');
  return `
{
${ASTFormatted}
}`;
};

export default formatter;
