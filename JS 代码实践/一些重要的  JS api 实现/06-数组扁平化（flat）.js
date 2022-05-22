// 需求：多维数组 --> 一维数组

const arr = [1, [2, [3, [4, 5]]], 6];
const str = JSON.stringify(arr);

console.log(arr);
console.log(str);

// 01、调用 Array.prototype.flat()
const arr_flat = arr.flat(Infinity);
console.log(arr_flat);

// 02、使用正则表达式
const str_reg = str.replace(/(\[|\])/g, "");
const arr_reg = JSON.parse(`[${str_reg}]`);
console.log(arr_reg);

// 03、递归处理
const result = [];
const fn = function (arr) {
  for (let item of arr) {
    if (Array.isArray(item)) {
      fn(item);
    } else {
      result.push(item);
    }
  }
};
fn(arr);
console.log(result);

// 04、使用 reduce() 实现数组的 flat() 方法
function flatten(arr) {
  return arr.reduce((pre, cur) => {
    const item = Array.isArray(cur) ? flatten(cur) : cur;
    return pre.concat(item);
  }, []);
}
console.log(flatten(arr));

// 05、扩展运算符
/* 
Array.prototype.some()
调用该方法的数组中是否有元素能通过作为参数的函数测试
 */
let ary = [...arr];
while (ary.some(Array.isArray)) {
  ary = [].concat(...ary);
}
console.log(ary);
