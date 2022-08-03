const list = [4, 6, 87, 9, 23, 3254, 543, 675, 867, 97];

function quickSort(arr) {
  const len = arr.length;

  if (len < 2) {
    return arr;
  }

  const midIndex = len >> 1,
    midItem = arr.splice(midIndex, 1),
    leftPart = [],
    rightPart = [];

  for (let item of arr) {
    if (item <= midItem) {
      leftPart.push(item);
    } else {
      rightPart.push(item);
    }
  }

  return quickSort(leftPart).concat(midItem).concat(quickSort(rightPart));
}

const sortedList = quickSort(list);

console.log(sortedList);
