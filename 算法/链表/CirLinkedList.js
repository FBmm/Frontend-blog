// 循环链表
function CirLinkedList() {
  // 链表结点构造函数
  let Node = function (el) {
    this.el = el // 数据域
    this.next = null // 指针域
  }

  let length = 0 // 链表长度
  let head = null // 头结点

  // 尾新增节点
  this.append = function (el) {
    let node = new Node(el)

    let current

    if (head === null) {
      head = node
    } else {
      current = head
      while (current.next) {
        current = current.next
      }

      current.next = node
    }

    length++
  }
}