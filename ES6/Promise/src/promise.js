const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  constructor(executor) {
    if (typeof executor !== "function") {
      throw new Error("Promise must accept a function as a parameter")
    }
    this._status = PENDING;
    this._value = undefined;
    this._fulfilledQueues = [];
    this._rejectedQueues = [];
    try {
      executor(this._resolve, this._reject)
    } catch(err) {
      this._reject(err)
    }
  }
  _resolve(val) {
    if(this._status !== PENDING) return
    this._status = FULFILLED;
    this._value = val;
  }
  _reject(err) {
    if(this._status !== PENDING) return
    this._value = REJECTED;
    this._value = err;
  }
  then(onFulfilled, onRejected) {
    const { _value, _status } = this
    switch (_status) {
      case PENDING:
        this._fulfilledQueues.push(onFulfilled)
        this._rejectedQueues.push(onRejected)
        break
      case FULFILLED:
        onFulfilled(_value)
        break
      case REJECTED:
        onRejected(_value)
        break
    }
    return new MyPromise(() => {})
  }
}

