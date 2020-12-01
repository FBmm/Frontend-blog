# 手写 call、apply、bind

## 手写 call

```js
// Function 原型实现 myCall
Function.prototype.myCall = function(scope, ...args) {
  scope.$fn = this
  scope.$fn(...args)
  delete scope.$fn
}

// 测试
const newThis = {
  name: "newThis"
}
function testFn() {
  console.log(this)
  console.log(arguments)
}
testFn.myCall(newThis, 1, 2, 3, 4)
```

## 手写 apply

```js
// Function 原型实现 myCall
Function.prototype.myApply = function(scope, args) {
  scope.$fn = this
  scope.$fn(...args)
  delete scope.$fn
}

// 测试
const newThis = {
  name: "newThis"
}
function testFn() {
  console.log(this)
  console.log(arguments)
}
testFn.myApply(newThis, [1, 2, 3, 4])
```

## 手写 bind

```js
Function.prototype.myBind = function(scope, ...args) {
  return () => {
    this.myCall(scope, ...args) // 依赖前面实现的 myCall
  }
}

// 测试
const newThis = {
  name: "newThis"
}
function testFn() {
  console.log(this)
  console.log(arguments)
}
const binded = testFn.myBind(newT, [1,2,3])
binded()
```