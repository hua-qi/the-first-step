class QueueElement {
  constructor(element, priority) {
    this.element = element;
    // priority 越小优先级越大
    this.priority = priority;
  }
}

class PriorityQueue {
  // 封装属性
  constructor() {
    this.items = [];
  }

  // 1. 实现插入方法
  enqueue(element, priority) {
    // 1. 创建 QueueElement 对象
    let queueElement = new QueueElement(element, priority);

    if (this.items.length === 0) {
      this.items.push(queueElement);
    } else {
      // 标志位
      let isAdd = false;

      for (let index in this.items) {
        if (queueElement.priority < this.items[index].priority) {
          this.items.splice(index, 0, queueElement);
          isAdd = true;
          break;
        }
      }

      if (!isAdd) {
        this.items.push(queueElement);
      }
    }
  }

  // 2. 从队列中删除首个元素
  dequeue() {
    return this.items.shift();
  }

  // 3. 查看首个元素
  front() {
    return this.items[0];
  }

  // 4. 查看队列是否为空
  isEmpty() {
    return this.items.length === 0;
  }

  // 5. 查看队列中元素的个数
  size() {
    return this.items.length;
  }

  // 6. toString() 方法
  toString() {
    if (typeof this.items[0] === "string") {
      let resStr = "";
      this.items.forEach(item => {
        resStr += item.toString();
      });
      return resStr;
    }
    return this.items;
  }
}

let myQueue = new PriorityQueue();
myQueue.enqueue(1, 2);
myQueue.enqueue(199, 1241414);
myQueue.enqueue(2222, 41341);
myQueue.enqueue(14414, 1);
console.log(myQueue);
console.log(myQueue.toString());
