import Node from './Node.js';

export default class Parent extends Node {
  constructor(key, children = [], level, status) {
    super(key, status, level);
    this.children = children;
  }

  toString() {
    const prefix = this.getPrefix();
    return `${prefix}${this.key}: {
${this.children.join('\n')}
${' '.repeat(prefix.length)}}`;
  }
}
