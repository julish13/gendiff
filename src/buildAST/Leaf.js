import Node from './Node.js';

export default class Leaf extends Node {
  constructor(key, value = '', level, status) {
    super(key, status, level);
    this.value = value;
  }

  toString() {
    return `${this.getPrefix()}${this.key}: ${this.value}`;
  }
}
