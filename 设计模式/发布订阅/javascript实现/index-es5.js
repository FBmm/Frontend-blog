function PublishSub() {
  let broker = {};
  this.subscribe = function(topic, fn) {
    broker[topic] = fn;
  }
  this.publish = function(topic, data) {
    if(broker[topic]) {
      broker[topic](data)
    }
  }
  this.clearAll = function() {
    broker = {};
  }
  this.unsubscribe = function(topic) {
    delete broker[topic]
  }
  this.once = function(topic, data) {
    this.publish(topic, data)
    this.unsubscribe(topic)
  }
}