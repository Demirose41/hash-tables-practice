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
    let idx = this.hashMod(key);
    if(this.data[idx]) throw new Error('hash collision or same key/value pair already exists!')
    this.data[idx] = {key: key, value: value};
    this.count++;
  }

  insertWithHashCollisions(key, value) {
    let idx = this.hashMod(key);
    let newPair = new KeyValuePair(key, value);
    if(this.data[idx]){
      newPair.next = this.data[idx];
      this.data[idx] = newPair;
    }else{
      this.data[idx] = newPair;
    }
    this.count++;
  }

  insert(key, value) {
    let idx = this.hashMod(key)
    let newPair = new KeyValuePair(key, value);
    if(this.data[idx]){
      let node = this.data[idx];
      // check for existing nodes with same key
      while(node){
        if(node.key === key){
          // update if found
          node.value = value;
          return;
        }
        node = node.next;
      }
      newPair.next = this.data[idx];
      this.data[idx] = newPair
      this.count++
    }else{
      this.data[idx] = newPair
      this.count++;
    }

  } 

}

module.exports = HashTable;