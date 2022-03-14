// 封装队列类
function Queue() {
  // 属性
  this.items = [];

  // 方法
  // 1. 将元素加入队列中
  Queue.prototype.enqueue = function (element) {
    this.items.push(element);
  };

  // 2. 从队列中删除首个元素
  Queue.prototype.dequeue = function () {
    return this.items.shift();
  };

  // 3. 查看首个元素
  Queue.prototype.front = function () {
    return this.items[0];
  };

  // 4. 查看队列是否为空
  Queue.prototype.isEmpty = function () {
    return this.items.length === 0;
  };

  // 5. 查看队列中元素的个数
  Queue.prototype.size = function () {
    return this.items.length;
  };

  // 6. toString() 方法
  Queue.prototype.toString = function () {
    if (typeof this.items[0] === "string") {
      let resStr = "";
      this.items.forEach(item => {
        resStr += item.toString();
      });
      return resStr;
    }
    return this.items;
  };
}

// 实例化队列类

let myQueue = new Queue();

[1, 2, 3, 4, 5, 6].forEach(item => {
  myQueue.enqueue(item);
});

// console.log(myQueue);
myQueue.dequeue();
// console.log(myQueue.toString());
// console.log(myQueue.front());

// 击鼓传花
function playingBall(nameList, num) {
  // 1. 实例化队列对象
  let ballQueue = new Queue();

  // 2. 将所有人依次加入到队列中
  nameList.forEach(item => {
    ballQueue.enqueue(item);
  });

  // 3. 击鼓传花
  let flag = num;
  while (1) {
    // 删除队列首位元素
    let res = ballQueue.dequeue();
    if (flag > 1) {
      // 未到击鼓时，首位元素入队列
      ballQueue.enqueue(res);
      flag--;
    } else {
      // 击鼓时，flag 恢复，删除元素不再入队列
      flag = num;
    }

    if (ballQueue.size() === 1) {
      return ballQueue.front();
    }
  }
}

let arr = [1, 2, 3, 4, 5];
let myBall = playingBall(arr, 3);
// console.log(myBall);
