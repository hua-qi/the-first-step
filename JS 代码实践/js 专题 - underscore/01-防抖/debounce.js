let count = 0;
let container = document.getElementById("container");

function getUserAction(event) {
  console.log(this);
  console.log(event);
  container.innerHTML = ++count;
}

// container.onmousemove = getUserAction;
// container.onmousemove = debounce_01(getUserAction, 1000);
// container.onmousemove = debounce_02(getUserAction, 1000);
// container.onmousemove = debounce_03(getUserAction, 1000);
// container.onmousemove = debounce_04(getUserAction, 1000, true);
// container.onmousemove = debounce_05(getUserAction, 1000, true);

// let setUserAction = debounce(getUserAction, 1000, true);

let setUserAction = debounce_06(getUserAction, 1000, true);

container.onmousemove = setUserAction;

document.getElementById("button").addEventListener("click", function () {
  setUserAction.cancel();
});

// version 1
function debounce_01(func, wait) {
  let timeout;

  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(func, wait);
  };
}

// version 2
/* 
this 指向问题
对于 getUserAction() 中的 this 指向
在不使用 debounce_01() 时，this 指向 <div id="container"></div>
在使用 debounce_01() 之后， this 指向全局对象此时是 window 对象
 */

function debounce_02(func, wait) {
  let timeout;

  return function () {
    let context = this;

    clearTimeout(timeout);
    timeout = setTimeout(function () {
      func.apply(context);
    }, wait);
  };
}

// version 3
/* 
event 对象获取问题
对于 getUserAction() 中的 event 参数
在不使用 debounce_01() 时，event 即 MouseEvent 对象
在使用 debounce_01() 之后，event 为 undefined
 */

function debounce_03(func, wait) {
  let timeout;

  return function () {
    const context = this,
      args = arguments;

    clearTimeout(timeout);

    timeout = setTimeout(function () {
      func.apply(context, args);
    }, wait);
  };
}

// version 4
/* 
立刻执行选项
这里的实现 可以理解为 防抖 + 节流
 */

function debounce_04(func, wait, immediate) {
  let timeout;

  return function () {
    let context = this,
      args = arguments;

    if (timeout) clearTimeout(timeout);
    if (immediate) {
      // 如果已经执行过，不再执行
      let callNow = !timeout;

      timeout = setTimeout(function () {
        timeout = null;
      }, wait);

      if (callNow) func.apply(context, args);
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    }
  };
}

// version 5
/*
接收返回值
当参数 immediate 的值为 false 时，由于使用了 setTimeout，所以将 func.apply(context, args) 的返回值赋值给变量，最后再 return 该变量，该变量值将一直为 undefined。（因为 setTimout 再下一次事件循环中执行，此时已经没有当前的执行上下文）

所以只能在参数 immediate 的值为 true 时，返回函数的执行结果
 */
function debounce_05(func, wait, immediate) {
  let timeout, result;

  return function () {
    const context = this,
      args = arguments;

    if (timeout) clearTimeout(timeout);
    if (immediate) {
      let callNow = !timeout;

      timeout = setTimeout(function () {
        timeout = null;
      }, wait);

      if (callNow) result = func.apply(context, args);
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    }
  };
}

// version 6 最终版
/* 
取消 debounce() 
 */

function debounce(func, wait, immediate) {
  let timeout, result;

  const debounced = function () {
    const context = this,
      args = arguments;

    if (timeout) clearTimeout(timeout);
    if (immediate) {
      let callNow = !timeout;
      timeout = setTimeout(function () {
        timeout = null;
      }, wait);

      if (callNow) result = func.apply(context, args);
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    }
    return result;
  };

  debounced.cancel = function () {
    clearTimeout(timeout);
    timeout = null;
  };

  return debounced;
}

// 笔者认为的立即执行
function debounce_06(func, wait, immediate) {
  let timer;

  const debounced = function () {
    const context = this,
      args = arguments;

    if (immediate) {
      immediate = false;
      func.apply(context, args);
    } else {
      if (timer) clearTimeout(timer);
      timer = setTimeout(function () {
        func.apply(context, args);
      }, wait)
      ;
    }
  };

  debounced.cancel = function () {
    clearTimeout(timer);
    timer = null;
  };

  return debounced;
}
