const sha256 = require('js-sha256');

class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {

  constructor(numBuckets = 4) {
    this.data = new Array(numBuckets).fill(null);
    this.count = 0;
    this.capacity = numBuckets;
  }

  hash(key) {
    let shaKey = sha256(key).slice(0,8);

    
    return Number('0x' + shaKey);
  }

  hashMod(key) {
    return this.hash(key) % this.capacity
  }

  insertNoCollisions(key, value) {
    // Your code here
  }

  insertWithHashCollisions(key, value) {
    // Your code here
  }

  insert(key, value) {
    // Your code here
  }

}


module.exports = HashTable;