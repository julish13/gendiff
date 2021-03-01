import Node from './Node.js';

export default class Parent extends Node {
  constructor(key, children = [], level, status) {
    super(key, status, level);
    this.children = children;
  }

  stringify(format = 'stylish') {
    if (format === 'stylish') {
      const prefix = this.getPrefix();
      return `${prefix}${this.key}: {
${this.children.map((child) => child.stringify()).join('\n')}
${' '.repeat(prefix.length)}}`;
    }
  }
}
