const array = [1, 1, "1", "1"];
// console.log(unique_01(array));
// console.log(unique_02(array));
// console.log(unique_03(array));

// 01-双重循环
/* 
特点：兼容性好
 */
function unique_01(array) {
  // res 用于存储结果
  const res = [];
  for (let index = 0, len = array.length; index < len; index++) {
    for (var indey = 0, resLen = res.length; indey < resLen; indey++) {
      if (array[index] === res[indey]) {
        break;
      }
    }
    // 如果 array[index] 是唯一的，那么执行完循环，indey === resLen
    if (indey === resLen) {
      res.push(array[index]);
    }
  }
  return res;
}

// ============================================

// 02-indexOf 简化双重循环
function unique_02(array) {
  const res = [];
  for (let item of array) {
    if (res.indexOf(item) === -1) {
      res.push(item);
    }
  }
  return res;
}

// ============================================

// 03-排序后去重
/* 
排序后，相同值会被排在一起，只需判断当前元素是否与前一元素相同，不相同就添加进 res
 */
function unique_03(array) {
  const res = [],
    sortedArr = array.concat().sort(); // concat 浅拷贝原数组，使排序不对原数组有影响
  for (let index = 0, len = sortedArr.length, seen; index < len; index++) {
    // 如果是第一个元素 或 相邻元素不相同
    if (!index || seen !== sortedArr[index]) {
      res.push(sortedArr[index]);
    }
    seen = sortedArr[index];
  }
  return res;
}

// ============================================

// 04-unique API
/* 
unique 工具函数
根据参数 isSorted 判断传入的数组是否已排序
 */

const arr = [1, 2, "1", 2, 1];
const sortedArr = [1, 1, "1", 2, 2];

// console.log(unique_04(arr));
// console.log(unique_04(sortedArr));

// 0401 第一版
function unique_04(array, isSorted) {
  const res = [];

  for (let index = 0, len = array.length, seen = null; index < len; index++) {
    let current = array[index];
    if (isSorted) {
      if (!index || seen !== current) {
        res.push(current);
      }
      seen = current;
    } else if (res.indexOf(current) === -1) {
      res.push(current);
    }
  }
  return res;
}

// ============================================

const arr01 = [1, 1, "a", "A", 2, 2];

// 0402 优化
/* 
新需求：忽略字母大小写

unique_05
array: any[]
isSorted: boolean
iterate: function
return: any[]
 */

function unique_05(array, isSorted, iterate) {
  const res = [],
    seen = [];

  for (let index = 0, len = array.length; index < len; index++) {
    const current = array[index],
      computed = iterate ? iterate(current, index, array) : current;

    if (isSorted) {
      if (!index || seen !== computed) {
        res.push(value);
      }
      seen = computed;
    } else if (iterate) {
      if (seen.indexOf(computed) === -1) {
        seen.push(computed);
        res.push(current);
      }
    } else if (res.indexOf(current) === -1) {
      res.push(current);
    }
  }
  return res;
}

const iterate = (item, index, array) => {
  return typeof item === "string" ? item.toLocaleLowerCase() : item;
};

// console.log(unique_05(arr01, false, iterate));

// ============================================

// 05 filter
/* 
ES5 提供的 filter() 可以用于简化外层循环
 */

const arr02 = [1, 2, 1, 1, "1"];

function unique_06(array) {
  const res = array.filter((item, index, array) => {
    return array.indexOf(item) === index;
  });
  return res;
}
// console.log(unique_06(arr02));

// 0501 排序去重

function unique_07(array) {
  return array
    .concat()
    .sort()
    .filter((item, index, array) => {
      return !index || item !== array[index - 1];
    });
}

// console.log(unique_07(arr02));

// ============================================

// 06 Object 键值对

/* 
利用一个空 Object 对象，将数组元素的值存储为 Object 的 key 值，在判断另一个值时，如果该值对应的 key 值已存在，那么说明该元素重复
 */

const arr03 = [1, 2, 1, 1, "1"];

function unique_08(array) {
  const obj = [];
  return array.filter(item => {
    return obj.hasOwnProperty(item) ? false : (obj[item] = true);
  });
}

/* 
console.log(unique_08(arr03));

弊端：尽管 1 和 "1" 不相同，但是用于 obj 的 key 只能是字符串或 Symbol，所以存储时类型相同

优化：使用 typeof item + item 使 obj 的 key 值为 类型 + value
 */

function unique_09(array) {
  const obj = [];
  return array.filter(item => {
    return obj.hasOwnProperty(typeof item + item)
      ? false
      : (obj[typeof item + item] = true);
  });
}

/* 
console.log(unique_09(arr03));

弊端：无法正确区分两个对象，对 object 类型元素项，进行 typeof item + item 的结果会是  object[object Object]

优化：可以使用 JSON.stringify 将对象序列化
 */

const arr04 = [{ value: 1 }, { value: 1 }, { value: 2 }];

function unique_10(array) {
  const obj = [];
  return array.filter(item => {
    const formatItem = typeof item + JSON.stringify(item);

    return obj.hasOwnProperty(formatItem) ? false : (obj[formatItem] = true);
  });
}

/* 
console.log(unique_10(arr04));

弊端：JSON.stringify 处理任何一个正则表达式的结果都是 {}。所以 unique10() 并不适用于处理正则表达式去重

console.log(typeof /a/);
console.log(JSON.stringify(/a/));
console.log(JSON.stringify(/b/));
*/

// ============================================

// 07 ES6
/* 
可以使用 Set 和 Map 数据结构
 */

const arr05 = [1, 2, 1, 1, "1"];

function unique_11(array) {
  return Array.from(new Set(array));
}

function unique_12(array) {
  return [...new Set(array)];
}

const unique_13 = array => [...new Set(array)];

// 使用 Map
function unique_13(array) {
  const seen = new Map();
  return array.filter(item => !seen.has(item) && seen.set(a, 1));
}
