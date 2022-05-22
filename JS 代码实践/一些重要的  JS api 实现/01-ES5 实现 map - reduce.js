// 1. map
/* 
核心要点：
1、回调函数的参数有哪些，返回如何处理
2、不修改原先数组
 */
Array.prototype.MyMap = function (fn, context) {
  // 调用 MyMap() 数组的浅拷贝
  // 鉴于使用 ES5 进行实现，这里不使用 ...展开运算符
  const arr = Array.prototype.slice.call(this);
  const mappedArr = [];

  for (let index = 0, len = arr.length; index < len; index++) {
    mappedArr.push(fn.call(context, arr[index], index, this));
  }

  return mappedArr;
};

const arr = [1, 2, 3, 4, 5];

const formatMap = arr.MyMap(item => item * 2);
// console.log(formatMap);

// 2. reduce
/* 
核心要点：
1、初始值不传怎么处理
2、回调函数的参数有哪些，返回值如何处理
 */
Array.prototype.MyReduce = function (fn, initialValue) {
  const arr = Array.prototype.slice.call(this);
  let res, startIndex;
  res = initialValue ? initialValue : arr[0];
  startIndex = initialValue ? 0 : 1;

  for (let index = startIndex, len = arr.length; index < len; index++) {
    res = fn.call(null, res, arr[index], index, this);
  }

  return res;
};
