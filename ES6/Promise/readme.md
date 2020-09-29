# Promise

## Promises/A+ 

Promise是异步编程的一种规范，[Promises/A+](https://promisesaplus.com/)

【Promises/A+】翻译

A promise represents the eventual result of an asynchronous operation. The primary way of interacting with a promise is through its then method, which registers callbacks to receive either a promise’s eventual value or the reason why the promise cannot be fulfilled.

Promise 表示异步操作的最终结果。与Promise主要的交互方式是通过它的 `then` 方法，`then` 方法注册回调函数接收 Promise 状态由 `padding` 变成 `fulfilled` 的最终值或者变成 `rejected` 的原因。

### 1. Terminology 术语

1.1. “promise” is an object or function with a then method whose behavior conforms to this specification.
`Promise` 是一个有 `then` 方法的对象或者方法，其行为符合此规范。

1.2. “thenable” is an object or function that defines a then method.
`thenable` 是一个定义了 `then` 方法的对象或者方法。

1.3. “value” is any legal JavaScript value (including undefined, a thenable, or a promise).
`value` 是一个合法的 JavaScript 值 （包含undefined、thenable、或者 Promise）

1.4. “exception” is a value that is thrown using the throw statement.
`exception` 是通过 `throw` 语句抛出的异常。

1.5. “reason” is a value that indicates why a promise was rejected.
`reason` 是表示 `Promise` 的状态为什么变成 `rejected` 的值。

### 2. Requirements （要求）

#### 2.1. Promise States （Promise 状态）

A promise must be in one of three states: pending, fulfilled, or rejected.
`Promise` 必须处于 `pending`、`fulfilled`、`rejected` 三种状态之一。

2.1.1. When pending, a promise: 
当 `Promise` 处于 `pending` 状态： 

  2.1.1.1. may transition to either the fulfilled or rejected state.
  可以变成 fulfilled 或 rejected 状态之一。

2.1.2. When fulfilled, a promise:
当 Promise 处于 filfilled 状态：

  2.1.2.1. must not transition to any other state.
  状态不能转变成任何其他状态。

  2.1.2.2. must have a value, which must not change.
  必须有一个不能改变的 `value`。

2.1.3. When rejected, a promise:
当 Promise 处于 rejected 状态：

  2.1.3.1. must not transition to any other state.
  状态不能转变成任何其他状态。

  2.1.3.2.must have a reason, which must not change.
  必须有一个不能改变的 `reason`。

Here, “must not change” means immutable identity (i.e. ===), but does not imply deep immutability.
这里的 “不能改变” 是通过 `===` 判断，并不意味是深度不变。
> 如果 value 是引用类型，改变属性则 value 还是“不变”的状态

#### 2.2. The then Method （then 方法）

A promise must provide a then method to access its current or eventual value or reason.
Promise 必须提供 then 方法存取它的 `value` 或者 `reason`。

A promise’s then method accepts two arguments:
Promise 的 then 方法接收两个参数：

```js
promise.then(onFulfilled, onRejected)
```

2.2.1. Both onFulfilled and onRejected are optional arguments:
`onFulfilled` 和 `onRejected` 都是可选参数

  2.2.1.1. If onFulfilled is not a function, it must be ignored.
  onFulfilled 如果不是 function，必须被忽略。

  2.2.1.2. If onRejected is not a function, it must be ignored.
  onRejected 如果不是 function，必须被忽略。

2.2.2. If onFulfilled is a function:
如果 onFulfilled 是 function：

  2.2.2.1. it must be called after promise is fulfilled, with promise’s value as its first argument.
  必须在状态变成 fulfilled 后调用，使用 Promise 的 value 做为第一个参数。

  2.2.2.2. it must not be called before promise is fulfilled.
  不能在状态变成 fulfilled 之前调用。

  2.2.2.3. it must not be called more than once.
  只能被调用一次。

2.2.3. If onRejected is a function:
如果 onRejected 是 function：

  2.2.3.1. it must be called after promise is rejected, with promise’s reason as its first argument.
  必须在状态变成 rejected 后调用，使用 Promise 的 reason 做为第一个参数。

  2.2.3.2. it must not be called before promise is rejected.
  不能在状态变成 rejected 之前调用。

  2.2.3.3. it must not be called more than once.
  只能被调用一次。

2.2.4. onFulfilled or onRejected must not be called until the execution context stack contains only platform code. [3.1].

2.2.5. onFulfilled and onRejected must be called as functions (i.e. with no this value). [3.2]
onFulfilled 和 onRejected 必须被作为函数调用（即没有this值）

2.2.6. then may be called multiple times on the same promise.
同一个 Promise 可以多次调用 then 方法。

  2.2.6.1. If/when promise is fulfilled, all respective onFulfilled callbacks must execute in the order of their originating calls to then.
  Promise 状态变成 filfilled，每个 then 方法的 onFulfilled 回调函数必须根据注册顺序执行。

  2.2.6.2. If/when promise is rejected, all respective onRejected callbacks must execute in the order of their originating calls to then.
  Promise 状态变成 rejected，每个 then 方法的 onRejected 回调函数必须根据注册顺序执行。

2.2.7. then must return a promise [3.3].
then 方法的返回值必须是 Promise

```js
promise2 = promise1.then(onFulfilled, onRejected);
```

2.2.7.1. If either onFulfilled or onRejected returns a value x, run the Promise Resolution Procedure [[Resolve]](promise2, x).
onFulfilled 或者 onRejected 返回值是 x，调用 Promise.resolve() 将返回值转换成 promise2

  2.2.7.1.1. If either onFulfilled or onRejected throws an exception e, promise2 must be rejected with e as the reason.
  如果 onFulfilled 或者 onRejected 抛出异常e，promise2 必须是以 e 做为 reason 的 rejected 状态。

  2.2.7.1.2. If onFulfilled is not a function and promise1 is fulfilled, promise2 must be fulfilled with the same value as promise1.
  如果 onFulfilled 不是 function 并且 promise1 是 fulfilled 状态，promise2必须是 fulfilled 状态且 value 和 promise1 相同。

  2.2.7.1.3. If onRejected is not a function and promise1 is rejected, promise2 must be rejected with the same reason as promise1.
  如果 onRejected 不是 function 并且 promise1 是 rejected 状态，promise2 必须是 rejected 状态且 reason 和 promise1 相同。
  
#### 2.3. The Promise Resolution Procedure （Promise 解析过程）

The promise resolution procedure is an abstract operation taking as input a promise and a value, which we denote as [[Resolve]](promise, x). If x is a thenable, it attempts to make promise adopt the state of x, under the assumption that x behaves at least somewhat like a promise. Otherwise, it fulfills promise with the value x.
promise 解析过程是一个抽象操作，需要输入一个promise和一个值，我们将其表示为[[Resolve]]（promise，x）。如果 x 是一个像 Promise 的 thenable，解析的时候 Promise 会尝试接受 x 的状态。否则，解析过程会使用 x 的值。

This treatment of thenables allows promise implementations to interoperate, as long as they expose a Promises/A+-compliant then method. It also allows Promises/A+ implementations to “assimilate” nonconformant implementations with reasonable then methods.
这种 thenable 的特性使得 Promise 的实现更具有通用性：只要其暴露出一个遵循 Promise/A+ 协议的 then 方法即可；这同时也使遵循 Promise/A+ 规范的实现可以与那些不太规范但可用的实现能良好共存。



  

