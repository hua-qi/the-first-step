// 节点类封装
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

// 链表类封装
class LinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  // 1. 添加元素
  append(data) {
    // 创建新节点
    let newNode = new Node(data);

    // 1.1. 是否是首元素判断
    if (this.length === 0) {
      this.head = newNode;
    } else {
      let current = this.head;

      // 1.2. 根据当前节点的 next 属性，判断该节点之后是否有节点
      while (current.next) {
        current = current.next;
      }

      // 1.3. 最后一个节点的 next 指向新节点
      current.next = newNode;
    }

    // 2. 链表长度加一
    this.length += 1;
  }

  // 2. toString 方法
  toString() {
    // 2.1. 定义当前节点变量
    let current = this.head;
    let resString = "";

    // 2.2. 循环获取每个节点
    while (current) {
      if (typeof current.data !== "object") {
        resString += current.data.toString();
      }

      current = current.next;
    }

    return resString;
  }

  // 3. insert 方法
  insert(position, data) {
    // 3.1. 边界判断
    if (position < 0 || position > this.length) {
      return false;
    }

    // 3.2. 创建新节点
    let newNode = new Node(data);

    // 3.3. 判断插入的位置
    if (position == 0) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      let index = 0,
        current = this.head,
        previous = null;

      while (index++ < position) {
        previous = current;
        current = current.next;
      }

      // 插入新节点
      newNode.next = current;
      previous.next = newNode;
    }
  }
}

let myLinkedList = new LinkedList();

myLinkedList.append(1);
myLinkedList.append(1);
myLinkedList.append(1);
myLinkedList.append(1);
myLinkedList.append(1);
console.log(myLinkedList.toString());
console.log(myLinkedList);

let i = 0;
while (i++ < 5) {
  console.log(i);
}
console.log("========");
console.log(i);
