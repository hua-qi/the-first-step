const EventEmitter = require("events");

// 1. 创建发射器
const emitter = new EventEmitter();

// 2. 监听某一事件
// listener 为 emitter.on 的别名
emitter.on("click", (...args) => {
  console.log("监听到 click 事件--01", ...args);
});

const click02 = (...args) => {
  console.log("监听到 click 事件--02", ...args);
};

emitter.on("click", click02);

// emitter.once() 只监听一次
emitter.once("tap", args => {
  console.log("监听到 tap 事件");
});

// 触发本次事件时，该回调最先执行
emitter.prependListener("tap", args => {
  console.log("监听到 tap -- 01");
});

// 3. 发出一个事件
setTimeout(() => {
  emitter.emit("click", "huaqi");
  emitter.off("click", click02);
  emitter.emit("click", "huaqi");
  emitter.emit("tap");
  emitter.emit("tap");
  //   emitter.removeAllListeners(); 移除所有监听器
}, 2000);

// 4. 获取当前 emmiter 的有关信息
console.log(emitter.eventNames); // emmiter 监听的事件
console.log(emitter.listenerCount("click")); // 监听的 click 事件所绑定的方法个数
console.log(emitter.listeners("click"));
