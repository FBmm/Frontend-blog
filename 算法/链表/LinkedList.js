// 链表的js实现
function LinkedList() {
  // 链表结点
  let Node = function(el) {
    this.el = el // 数据域
    this.next = null // 指针域
  }

  let length = 0 // 链表长度
  let head = null // 头结点

  // 尾新增节点
  this.append = function(el) {
    let node = new Node(el)

    let current

    if(head === null) {
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

  // 任意位置插入
  this.insert = function(position, el) {

  }

  this.getHead = function () {
    return head
  }
}