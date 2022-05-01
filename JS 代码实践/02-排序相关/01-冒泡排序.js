function bubble_sort(arr) {
  let max = arr.length - 1;
  for (let index = 0; index < max; ++index) {
    // 标志位
    let done = true;

    for (let indey = 0; indey < max - index; ++indey) {
      if (arr[indey] > arr[indey + 1]) {
        [arr[indey], arr[indey + 1]] = [arr[indey + 1], arr[indey]];
        done = false;
      }
    }

    if (done) {
      break;
    }
  }

  return arr;
}

let arr = [6, 5, 4, 3, 2, 1];
let sort_arr = bubble_sort(arr);
console.log(sort_arr);
