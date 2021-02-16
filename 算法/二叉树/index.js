class Node {
  constructor(data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

// 二叉树
class BinaryTree {
  root = null;

  insert (data) {
    
  }
}

// 二叉查找树
class BST {
  root = null;

  insert (data) {
    const node = new Node(data, null, null)
    if (this.root === null) {
      this.root = node
    } else {
      let current = this.root;
      let parent;
      while(true) {
        parent = current;
        if (data < current.data) {
          current = current.left;
          if (current === null) {
            parent.left = node;
            break;
          } 
        } else {
          current = current.right;
          if (current === null) {
            parent.right = node;
            break;
          }
        }
      }
    }
  }

  preOrder(node) {
    if (node !== null) {
      console.log(node.data)
      this.preOrder(node.left)
      this.preOrder(node.right)
    }
  }

  inOrder(node) {
    if (node !== null) {
      this.inOrder(node.left)
      console.log(node.data)
      this.inOrder(node.right)
    }
  }

  postOrder(node) {
    if (node !== null) {
      this.postOrder(node.left)
      this.postOrder(node.right)
      console.log(node.data)
    }
  }
}
