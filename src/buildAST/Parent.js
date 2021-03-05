import Node from './Node.js';

export default class Parent extends Node {
  constructor(key, children = [], level, status) {
    super(key, status, level);
    this.children = children;
  }

  getChildren() {
    return this.children;
  }
}
