import Node from './Node.js';

export default class Leaf extends Node {
  constructor(key, value = '', status) {
    super(key, status);
    this.value = value;
  }
}
