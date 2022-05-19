// ES5 模拟 迭代器
function createIterator(items) {
  let i = 0;
  return {
    next: function () {
      let done = i >= items.length;
      let value = !done ? items[i++] : undefined;

      return {
        done: done,
        value: value,
      };
    },
  };
}

// 模拟实现 for of
function forof(obj, cb) {
  let iterable, result;

  if (typeof obj[Symbol.iterator] !== "function") {
    throw new TypeError(`${obj} is not iterbale`);
  }

  if (typeof cb !== "function") {
    throw new TypeError("cb must be callable");
  }

  iterable = obj[Symbol.iterator]();

  result = iterable.next();

  while (!result.done) {
    cb(result.value);
    result = iterable.next();
  }
}
