const list = [4, 6, 87, 9, 23, 3254, 543, 675, 867, 97];

function merge(leftPart, rightPart) {
  let ans = [];

  while (leftPart.length && rightPart.length) {
    if (leftPart[0] <= rightPart[0]) {
      ans.push(leftPart.shift());
    } else {
      ans.push(rightPart.shift());
    }
  }

  if (leftPart.length) {
    ans = ans.concat(leftPart);
  }

  if (rightPart.length) {
    ans = ans.concat(rightPart);
  }

  return ans;
}

function mergeSort(arr) {
  const len = arr.length;

  // 边界判断
  if (len < 2) {
    return arr;
  }

  const midIndex = len >> 1,
    leftPart = arr.slice(0, midIndex),
    rightPart = arr.slice(midIndex, len);

  return merge(mergeSort(leftPart), mergeSort(rightPart));
}

const sortedList = mergeSort(list);

console.log(sortedList);
