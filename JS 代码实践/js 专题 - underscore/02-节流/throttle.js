/* 
节流
如果持续触发事件，每隔一段时间，只执行一次事件

根据首次是否执行以及结束后是否执行，效果有所不同，实现的方式也有所不同。

使用 leading 标识首次是否执行
使用 trailing 标识结束后是否再执行一次

关于实现：
一种使用时间戳
一种设置定时器
 */

let count = 0;
let container = document.getElementById("container");

function getUserAction(event) {
  console.log(this);
  console.log(event);
  container.innerHTML = ++count;
}

// container.onmousemove = getUserAction;
// container.onmousemove = throttle_01(getUserAction, 1000);
// container.onmousemove = throttle_02(getUserAction, 1000);
// container.onmousemove = throttle_03(getUserAction, 1000);
// leading 与 trailing 不能同时设置 false !!!
// container.onmousemove = throttle_04(getUserAction, 1000, { leading: false });
container.onmousemove = throttle_04(getUserAction, 1000, { trailing: false });

// version 01
/* 
使用时间戳
当触发事件时，立即执行
 */

function throttle_01(func, wait) {
  let previous = 0;

  return function () {
    const now = new Date();

    if (now - previous > wait) {
      func.apply(this, arguments);
      previous = now;
    }
  };
}

// version 02
/* 
使用定时器
由于定时器的存在，在本次事件触发结束后，会再有一次事件触发
 */
function throttle_02(func, wait) {
  let timeout;

  return function () {
    const context = this,
      args = arguments;

    if (!timeout) {
      timeout = setTimeout(function () {
        timeout = null;
        func.apply(context, args);
      }, wait);
    }
  };
}

// version 03
/* 
双剑合璧
事件触发立即执行，停止触发后再执行一次
 */
function throttle_03(func, wait) {
  let timeout,
    context,
    args,
    result,
    previous = 0;

  const later = function () {
    previous = new Date();
    timeout = null;
    func.apply(context, args);
  };

  const throttled = function () {
    const now = new Date();
    // 下次触发 func 的剩余时间
    const remaining = wait - (now - previous);
    context = this;
    args = arguments;

    // 如果没有剩余时间或者修改了系统时间
    // 第一次触发事件 或 上一次经 wait 时间后触发事件
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(context, args);
    } else if (!timeout) {
      /* 
        01、与上一次事件触发在同一 wait 时间段内触发事件，设置定时器。
        02、由于该定时器的存在，任意一个在该 wait 时间段内触发的事件都会被忽略
        03、同时也保证了最后一次触发事件，会再有一次事件执行
        */
      timeout = setTimeout(later, remaining);
    }
  };

  return throttled;
}

// version 04
/* 
优化
通过设置 options 作为第三个参数，判断 无头有尾 或 有头无尾的请跨

leading： false 表示禁用立即执行
trailing：false 表示禁用停止触发后的执行
 */

function throttle_04(func, wait, options) {
  if (!options) options = {};

  let timeout,
    context,
    args,
    result,
    previous = 0;

  const later = function () {
    previous = options.leading === false ? 0 : new Date().getTime();
    timeout = null;
    func.apply(context, args);
    if (!timeout) context = args = null;
  };

  const throttled = function () {
    const now = new Date().getTime();

    // 取消立即执行
    if (!previous && options.leading === false) previous = now;

    const remaining = wait - (now - previous);
    context = this;
    args = arguments;

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(context, args);

      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      // 如果设置最后一次触发事件后，不再执行，就完全是 时间戳方式
      timeout = setTimeout(later, remaining);
    }
  };

  throttled.cancel = function () {
    clearTimeout(timeout);
    previous = 0;
    timeout = null;
  };

  return throttled;
}
