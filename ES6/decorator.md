# 装饰器 decorator

对类的进行处理，用来修改类和类的方法

## 类 class 的装饰器

```js
@testable
class MyTestableClass {
  // ...
}
function testable(target) {
  target.isTestable = true;
}

MyTestableClass.isTestable // true
```

等同于

```js
@decorator
class A {}

// 等同于

class A {}
A = decorator(A) || A;
```
