let data = [1, 2, 3, 4, 5];
let object = {
  name: "huaqi",
  age: 21,
};

for (let i = 0, len = data.length; i < len; i++) {
  console.log(data[i]);
}

for (let datum of data) {
  console.log(datum);
}

for (let property in object) {
  console.log(property);
}

console.log("=============================");

for (const datum of data) {
  console.log(datum);
}

for (const property in object) {
  console.log(property);
}
