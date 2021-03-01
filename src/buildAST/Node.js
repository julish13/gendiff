const PREFIXES = {
  deleted: '  - ',
  added: '  + ',
  default: '    ',
};

export default class Node {
  constructor(key = '', status = 'default', level = 0) {
    this.key = key;
    this.status = status;
    this.level = level;
  }

  getPrefix() {
    return `${PREFIXES.default.repeat(this.level)}${PREFIXES[this.status]}`;
  }
}
