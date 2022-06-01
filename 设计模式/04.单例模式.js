class SingleDog {
  show() {
    console.log("我是一个单例对象");
  }
  static getInstance() {
    if (!SingleDog.instance) {
      SingleDog.instance = new SingleDog();
    }
    return SingleDog.instance;
  }
}

// 闭包实现
function SingleCat() {}

SingleCat.getInstance = function () {
  let instance = null;
  return function () {
    if (!instance) {
      instance = new SingleCat();
    }

    return instance;
  };
};
