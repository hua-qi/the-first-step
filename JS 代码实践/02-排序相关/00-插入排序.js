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

  return arr;
};

let arr = [6, 5, 4, 3, 2, 1];
let sort_arr = insertSort(arr);
console.log(sort_arr);
