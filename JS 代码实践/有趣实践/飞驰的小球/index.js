class Drag {
  // ele 为传入的 DOM 对象
  constructor(ele) {
    // 初始化操作
    this.ele = ele;
    ["strX", "strY", "strL", "strT", "curL", "curT"].forEach(item => {
      this[item] = null;
    });
    // 监听鼠标按下事件
    // 事件函数一定要绑定 this，在封装过程中 this 统一指向实例对象，下不赘述
    this.DOWN = this.down.bind(this);
    this.ele.addEventListener("mousedown", this.DOWN);
  }

  down(ev) {
    const ele = this.ele;
    this.strX = ev.clientX; // 鼠标点击处到浏览器窗口最左边的距离
    this.strY = ev.clientY; // 鼠标点击处到浏览器窗口最上边的距离
    this.strL = ev.offsetLeft; // 元素到浏览器窗口最左边的距离
    this.strT = ev.offsetTop; // 元素到浏览器窗口最上边的距离

    this.MOVE = this.move.bind(this);
    this.UP = this.up.bind(this);
    document.addEventListener("mousemove", this.MOVE);
    document.addEventListener("mouseup", this.up);

    // 清理上一次点击形成的定时器和变量
    clearInterval(this.flyTimer);
    clearInterval(this.dropTimer);
    this.speedFly = undefined;
  }

  move(ev) {
    const ele = this.ele;
    this.curL = ev.clientX - this.strX + this.strL; // 元素移动时到浏览器窗口最左边的距离
    this.curT = ev.clientY - this.strY + this.strT; // 元素移动时到浏览器窗口最上边的距离
    ele.style.left = this.curL + "px";
    ele.style.top = this.curT + "px";

    // ？？ 疑惑
    // 特殊情况
    if (!this.lastFly) {
      this.lastFly = ele.offsetLeft;
      this.speedFly = 0;
      return;
    }
    // 功能：记录松开鼠标瞬间，小球的速度
    this.speedFly = ele.offsetLeft - this.lastFly;
    this.lastFly = ele.offsetLeft;
  }

  up(ev) {
    // 解绑之前监听的事件
    document.removeEventListener("mousemove", this.MOVE);
    document.removeEventListener("mouseup", this.UP);

    // 之后开启水平方向与垂直方向的运动
    this.horizen.call(this);
    this.vertical.call(this);
  }

  // 水平方向的运动
  horizen() {
    const minL = 0,
      maxL = document.documentElement.clientWidth - this.ele.offsetWidth;
    let speed = Math.abs(this.speedFly);

    this.flyTimer = setInterval(() => {
      speed *= 0.98;
      Math.abs(speed) <= 0.1 ? clearInterval(this.flyTimer) : null;

      // 当前小球到视口最左端的距离
      let curL = this.ele.offsetLeft;
      curL += speed;

      // 当前小球到达视口最右端，反弹
      if (curL >= maxL) {
        this.ele.style.left = maxL + "px";
        speed *= -1;
        return;
      }

      // 当前小球到达视口最左端，反弹
      if (curL <= minL) {
        this.ele.style.left = minL + "px";
        speed *= -1;
        return;
      }

      this.ele.style = curL + "px";
    }, 20);
  }

  // 垂直方向的运动
  vertical() {
    const speed = 9.8,
      minT = 0,
      maxT = document.documentElement.clientHeight - this.ele.offsetHeight;

    this.dropTimer = setInterval(() => {
      speed += 10;
      speed *= 0.98;
      Math.abs(speed) <= 0.1 ? clearInterval(this.dropTimer) : null;

      // 当前小球到视口最上端的距离
      let curT = this.ele.offsetTop;
      curT += speed;

      // 当前小球位于视口顶部，反弹
      if (curT >= maxT) {
        this.style.ele.top = maxT + "px";
        speed *= -1;
        return;
      }

      // 当前小球位于视口底部，反弹
      if (curT <= minT) {
        this.style.ele.top = minT + "px";
        speed *= -1;
        return;
      }

      this.ele.style.top = curT + "px";
    }, 20);
  }
}

globalThis.Drag = Drag;
