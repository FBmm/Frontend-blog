// 线性链表
function LinkedList() {
  // 链表结点构造函数
  let Node = function(el) {
    this.el = el // 数据域
    this.next = null // 指针域
  }

  let length = 0 // 链表长度
  let head = null // 头结点

  // 查找节点
  this.find = function(el) {
    let currentNode = head
    while(currentNode && currentNode.el !== el) {
      currentNode = currentNode.next
    }
    return currentNode
  }

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
  this.insert = function(newEl, el) {
    const currentNode = this.find(el)
    if (!currentNode) return false
    const node = new Node(newEl)
    node.next = currentNode.next
    currentNode.next = node
    length++
    return node
  }

  // 更新结点数据
  this.update = function(el, newEl) {
    const node = this.find(el)
    node.el = newEl
    return node
  }

  // 查找前驱结点
  this.findPrevious = function(el) {
    let current = head
    while(true) {
      if (current.next === null) {
        current = false
        break
      }
      if (current.next.el === el) {
        break
      }
      current = current.next
    }
    return current
  }

  // 删除结点
  this.remove = function(el) {
    const node = this.find(el)
    if(!node) return false
    if (el === head.el) {
      head = head.next
      length--
      return
    }
    const previous = this.findPrevious(el)
    previous.next = node.next
    length--
    return node
  }

  // 返回头结点
  this.getHead = function () {
    return head
  }

  // 打印结点数据域
  this.print = function() {
    let current = head
    while(current.next) {
      console.log(current.el)
      current = current.next
    }
  }
}