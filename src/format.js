const format = (AST) => {
  const ASTFormatted = AST.map((node) => node.toString()).join('\n');
  return `
{
${ASTFormatted}
}`;
};

export default format;
