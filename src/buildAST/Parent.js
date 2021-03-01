import Node from './Node.js';

export default class Parent extends Node {
  constructor(key, children = [], status) {
    super(key, status);
    this.children = children;
  }
}
