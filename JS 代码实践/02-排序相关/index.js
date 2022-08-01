// 冒泡排序（可忽略最后一个元素）
const bubbleSort = arr => {
  const len = arr.length;

  for (let index = 0; index < len - 1; index++) {
    // indey < len - 1 - index  控制元素的移动次数
    for (let indey = 0; indey < len - 1 - index; indey++) {
      if (arr[indey] > arr[indey + 1]) {
        // 解构方式交换两个元素值
        [arr[indey], arr[indey + 1]] = [arr[indey + 1], arr[indey]];
      }
    }
  }
};

// ============================================================

// 插入排序
const insertSort = arr => {
  const len = arr.length;
  let curItem, preIndex;

  for (let index = 1; index < len; index++) {
    curItem = arr[index];
    preIndex = index - 1;

    while (preIndex >= 0 && curItem < arr[preIndex]) {
      // 大于 curItem 则向后移动一位
      arr[preIndex + 1] = arr[preIndex];
      preIndex--;
    }

    arr[preIndex + 1] = curItem;
  }
};

// ==============================================

// 归并排序
const merge = (left, right) => {
  let result = [];
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }

  if (left.length) {
    result = result.concat(left);
  }

  if (right.length) {
    result = result.concat(right);
  }

  return result;
};

// 递归就完事了
const mergeSort = arr => {
  const len = arr.length;

  // 边界判断
  if (len < 2) {
    return arr;
  }

  const mid = len >> 1,
    left = arr.slice(0, mid),
    right = arr.slice(mid, len);

  return merge(mergeSort(left), mergeSort(right));
};

const originList = [2, 3, 4, 1, 3, 9, 6, 8, 0];

// 冒泡排序
// bubbleSort(originList);

// 插入排序
// insertSort(originList);

// console.log(originList);

// 归并排序
const sortedList = mergeSort(originList);
console.log(sortedList);
