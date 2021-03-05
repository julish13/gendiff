export default class Node {
  constructor(key = '', status = 'default', level = 0) {
    this.key = key;
    this.status = status;
    this.level = level;
  }

  getStatus() {
    return this.status;
  }

  getKey() {
    return this.key;
  }

  getLevel() {
    return this.level;
  }
}
