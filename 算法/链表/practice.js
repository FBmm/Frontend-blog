////////////////////////////// 返回倒数第 k 个节点 //////////////////////////////////////////

/**
 * 实现一种算法，找出单向链表中倒数第 k 个节点。返回该节点的值。
 * 
 * 说明：给定的 k 保证是有效的。
 * 
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * 解法一：数组存储链表
 * @param {ListNode} head
 * @param {number} k
 * @return {number}
 */
var kthToLast1 = function (head, k) {
  const arr = []
  while (head) {
    arr.push(head.val)
    head = head.next
  }
  return arr[arr.length - k]
};

/**
 * 解法二：快慢指针
 * 思路：快指针比慢指针多走 k - 1，当快指针指向最后一个节点时，慢指针指向倒数第 k - 1 个节点 
 * @param {ListNode} head
 * @param {number} k
 * @return {number}
 */
var kthToLast2 = function (head, k) {
  let fast = head;
  let slow = head;
  while (fast.next) {
    fast = fast.next
    if (k <= 1) {
        slow = slow.next
    }
    k--
  }
  return slow.val
};

////////////////////////////////////////////////////////////////////////

////////////////////////////// 扁平化多级双向链表 //////////////////////////////////////////

/**
 * 多级双向链表中，除了指向下一个节点和前一个节点指针之外，它还有一个子链表指针，可能指向单独的双向链表。这些子列表也可能会有一个或多个自己的子项，依此类推，生成多级数据结构，如下面的示例所示。
 * 给你位于列表第一级的头节点，请你扁平化列表，使所有结点出现在单级双链表中。
 * 
 * 输入：head = [1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]
 * 输出：[1,2,3,7,8,11,12,9,10,4,5,6]
 * 
 * // Definition for a Node.
 * function Node(val,prev,next,child) {
 *    this.val = val;
 *    this.prev = prev;
 *    this.next = next;
 *    this.child = child;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
var flatten = function(node, item) {
 
};
////////////////////////////////////////////////////////////////////////

////////////////////////////// 合并两个有序链表 //////////////////////////////////////////

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 * 
 * 1 -> 3 -> 4   2 -> 4 -> 5
 * 
 * 1 -> 2 -> 3 -> 4 -> 4 -> 5
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
let count = 0;
var mergeTwoLists = function(l1, l2) {
  if(l1 == null) {
      return l2;
  }
  if(l2 == null) {
      return l1;
  }
  count++
  console.log(count) 
  if(l1.val < l2.val) {
      l1.next = mergeTwoLists(l1.next, l2);
      return l1;
  } else {
      l2.next = mergeTwoLists(l1, l2.next);
      return l2;
  }
};
// const res = mergeTwoLists(tranform([1,3,4]), tranform([2,4,5]))
// console.log(res)
////////////////////////////////////////////////////////////////////////

// function fn(n, r) {
//   if (n === 1) {
//     return 1
//   } else {
//     return n * fn(n-1)
//   }
// }

// console.log(fn(3))

var getIntersectionNode = function(headA, headB) {
  if (!headA || headA.next == null) return null
  const list = []
  let c = headA;
  list.push(c)
  while(c.next) {
    list.push(c.next)
    c = c.next
  }
  if (!headB || headB.next == null) return null
  let cc = headB
  if (list.includes(cc)) {
    return cc
  }
  while(cc.next) {
    if (list.includes(cc.next)) {
      return cc.next
    }
    cc = cc.next
  }
  return null
};
const a = {a:1}
var res = getIntersectionNode(tranform([{},{},{}, a]), tranform([{},{},a, {}]))
console.log(res)

for(let i = 0; i < 3; i++) {
  console.log('i', i)
  for(let j = 0; j < 2; j++) {
    if (j ===2 ) {
      break
    }
    console.log('j', j)
  }
  
}