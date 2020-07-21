// 基础版 promise 完善版
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class SimplePromise {
  status = PENDING
  val = undefined
  fulfilledQueue = [] // 回调函数队列
  rejectedQueue = [] // 回调函数队列
  constructor(executor) {
    // 初始化执行 executor -> Promise 构造函数参数方法
    // Promise.resolve 方法作为参数传递而给 Promise 构造函数参数方法
    try {
      executor(this._resolve.bind(this), this._reject.bind(this))
    } catch (e) {
      console.log(e)
      this._reject(e)
    }
  }
  _resolve(value) {
    this.status = FULFILLED
    this.value = value
    // 调用 resolve 方法时，依次执行队列的所有回调函数
    this.fulfilledQueue.forEach(fn => fn(value))
  }
  _reject(value) {
    this.status = REJECTED
    this.value = value
    this.rejectedQueue.forEach(fn => fn(value))
  }
  then(onFulfilled, onRejected) {
    if (this.status === PENDING) {
      // then 回调函数暂存在 queue 回调函数队列
      this.fulfilledQueue.push(onFulfilled)
      typeof onRejected === 'function' && this.rejectedQueue.push(onRejected)
    } else if (this.status === FULFILLED) {
      // 如果 Promise 状态变成 FULFILLED，直接调用 onFulfilled 回调函数
      onFulfilled(this.value)
    } else if (this.status === REJECTED) {
      typeof onRejected === 'function' && onRejected(this.value)
    }
    return this // 实现链式调用
  }
  catch(onRejected) {
    if (this.status === PENDING) {
      // then 回调函数暂存在 queue 回调函数队列
      typeof onRejected === 'function' && this.rejectedQueue.push(onRejected)
    } else if (this.status === REJECTED) {
      onRejected(this.value)
    }
  }
}

// var p = new SimplePromise((resolve) => {
//   setTimeout(() => {
//     resolve('resolve')
//   }, 1000)
// })
// .then(_=> {console.log(_)})
// .then(_=> {console.log(_)})

