function insertion_sort(new_arr) {
  for (let index = 1; index < new_arr.length; ++index) {
    let cur = new_arr[index];
    for (var indey = index - 1; indey >= 0; --indey) {
      let temp = new_arr[indey];

      if (temp > cur) {
        new_arr[indey + 1] = temp;
      } else {
        break;
      }
    }
    new_arr[indey + 1] = cur;
  }
  return new_arr;
}

let arr = [6, 5, 4, 3, 2, 1];
let sort_arr = insertion_sort(arr);
console.log(sort_arr);
