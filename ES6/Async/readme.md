# async

async 关键词可以用来声明函数，async 函数是 AsyncFunction 构造函数的实例。
在 async 函数中可以使用 await 暂停函数执行，并等待和返回基于 promise 的异步操作 resolved 的结果。

async 函数总会返回一个 promise

## async await 是 Generator 函数的语法糖

使用 babel 转义成 es5 的源码
```js
// es8
const p = Promise.resolve(1)

async function done() {
    await p
}
```
```js
// es5
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}

function _asyncToGenerator(fn) {
    return function () {
        var self = this, args = arguments;
        return new Promise(function (resolve, reject) {
            var gen = fn.apply(self, args);

            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }

            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }

            _next(undefined);
        });
    };
}

const p = Promise.resolve(1);

function done() {
    return _done.apply(this, arguments);
}

function _done() {
    _done = _asyncToGenerator(function* () {
        yield p;
    });
    return _done.apply(this, arguments);
}
```