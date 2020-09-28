class PublishSub {
  #broker = {};
  constructor() {}
  subscribe(topic, fn) {
    if(!topic) {
      throw new Error('The topic is empty!');
    }
    if(typeof fn !== 'function') {
      throw new Error('The second parameter must be function!');
    }
    this.#broker[topic] = fn;
  }
  publish(topic, ...args) {
    if(!topic) {
      throw new Error('The topic is empty!');
    }
    const fn = this.#broker[topic];
    if(fn) {
      fn.apply(this, args);
    }
  }
  clearAll() {
    this.#broker = {};
  }
  unsubscribe(topic) {
    delete this.#broker[topic];
  }
  once() {
    const topic = arguments[0];
    if(!topic) {
      throw new Error('The topic is empty!');
    }
    this.publish.apply(this, arguments)
    this.unsubscribe(topic);
  }
}