// 命令式
let list = [1, 2, 3, 4];

let map1 = [];
for (let i = 0; i < list.length; i++) {
  map1.push(list[i] * 2);
}

// 声明式
let list = [1, 2, 3, 4];

// 过程抽象
const double = x => x * 2;

list.map(double);
