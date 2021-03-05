import Node from './Node.js';

export default class Leaf extends Node {
  constructor(key, value = '', level, status) {
    super(key, status, level);
    this.value = value;
  }

  getValue() {
    return this.value;
  }
}
