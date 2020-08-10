// 定义数组泛型
let array: Array<number> = [1,2,3]

// 数组泛型的元素类型由interface定义
interface user {
  name: String,
  age: number,
}
let userList: Array<user> = [{
  name: "wuqian",
  age: 27,
}, {
  name: "wuqian1",
  age: 29,
}]
// 等价定义
let userList1: user[] = [{
  name: "wuqian",
  age: 27,
}, {
  name: "wuqian1",
  age: 29,
}]

// 泛型基础demo
function createArray<T>(len: number, val: T): Array<T> {
  let result: T[] = [];
  for(let i = 0;i < length; i++) {
    result[i] = val
  }
  return result
}

createArray<number>(10, 1) // 指定 T 的类型
createArray(10, 1) // 自动推断 T 类型

// 多个参数类型
function swap<T, U>([a, b]: [T, U]): [U, T] {
  return [b, a]
}
swap(['love', 0])

// 泛型约束
// 函数内部使用泛型变量的时候，预先不知道哪种类型，所以不能随意操作属性
// function getLength<T>(p: T): T {
//   console.log(a.length)
//   return a // 异常提示：类型“T”上不存在属性“length”
// }

interface MyArray {
  length: number
}

function printLen<T extends MyArray>(a: T): T {
  console.log(a.length)
  return a
}

// 泛型接口
// 泛型类