let arr = [1, 2, 3, 4, 5];
let arrStr = arr.toString();
let arrChar = String(arr);
console.log(arr);
console.log(arrStr);
console.log(arrChar);
console.log(`${arr}`);

console.log("==============");

let obj = {
  name: "huaqi",
  age: 20,
};
let objStr = obj.toString();
let objChar = String(obj);
console.log(obj);
console.log(objStr);
console.log(objChar);
console.log(`${obj}`);

console.log("==============");

let myMap = new Map();

myMap.set("name", "huaqi");
myMap.set("age", 20);

let mapStr = myMap.toString();
let mapChar = String(myMap);
console.log(myMap);
console.log(mapStr);
console.log(mapChar);
console.log(`${myMap}`);

console.log("==============");

let mySet = new Set();
mySet.add(1);
mySet.add(2);

let setStr = mySet.toString();
let setChar = String(mySet);
console.log(mySet);
console.log(setStr);
console.log(setChar);
console.log(`${mySet}`);
