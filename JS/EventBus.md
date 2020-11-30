# EventBus

  EventBus 是基于发布/订阅的一种通信框架，通过解耦发布者和订阅者简化事件传递。

  主要优点：
    - 解耦组件间通信。
    - 分离事件的发布者和订阅者。
    - 易于理解和使用。


## 基础版

```js
function EventBus() {
  const messages = {};

  this.$on = function (topic, fn) {
    messages[topic] = fn
  }

  this.$emit = function (topic, ...data) {
    messages[topic](...data)
  }

  this.$off = function (topic) {
    delete messages[topic]
  }
}

const eventBus = new EventBus()
eventBus.$on("a", (...args) => console.log(...args))
eventBus.$emit("a", "hello world", 1, 2) // hello world 1 2

```

## Map 版

map 版的优势是 topic 可以是任意类型 

```js
function EventBus() {
  const messageMap = new Map();
  this.$on = function (topic, fn) {
    messageMap.set(topic, fn)
  }
  this.$emit = function (topic, ...data) {
    const fn = messageMap.get(topic)
    fn(...data)
  }
  this.$off = function (topic) {
    messageMap.delete(topic)
  }
}

const eventBus = new EventBus()

const topic = {
  name: "topic"
}
eventBus.$on(topic, (args) => console.log(args)) // 对象 作为 key
eventBus.$on(null, (args) => console.log(args)) // null 作为 key

eventBus.$emit(topic, "hello world") // hello world
eventBus.$emit(null, "hello world null") // hello world null
```

## 完整版

```js
function EventBus() {
  if (typeof Map !== "function") throw new Error("Browser version too low")

  const messagesMap = new Map(); // 消息队列 Map
  let _tid = -1; // 订阅的所有回调函数唯一的 token id

  // 订阅 topic
  this.$on = function (topic, fn) {
    if (typeof fn !== "function") return false

    let message
    if (!messagesMap.has(topic)) {
      message = {} // 初始化 topic message
    } else {
      message = messagesMap.get(topic) // 获取消息队列的 topic message
    }

    const token = 'tid_' + String(++_tid) // fn 的 key -> tid_0、tid_1
    message[token] = fn
    messagesMap.set(topic, message) // 消息队列保存当前 topic 的回调函数

    return token
  }

  // 发布 topic
  this.$emit = function (topic, ...data) {
    if (!messagesMap.has(topic)) throw new Error("The topic does not exist!" + topic);

    const message = messagesMap.get(topic) // 当前 topic 对应的消息队列

    Object.values(message).forEach(fn => fn(...data)) // 执行队列的所有回调函数
  }

  this.$getMessages = function () {
    return messagesMap
  }

  // 取消订阅
  this.$off = function (topic) {
    return messagesMap.delete(topic)
  }
}

const eventBus = new EventBus()

eventBus.$on("a", (...args) => console.log(...args))

eventBus.$emit("a", "hello world", 1, 2) // hello world 1 2
```