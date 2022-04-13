// 1. 解构赋值
// 个人理解，解构无非是将对象的属性拿出来，然后可以通过 ： 设置别名，通过 = 赋默认值（如果没有在对象自身属性以及原型链中找到相应属性中找到相同属性名，则取默认值）
// 又因为万物皆对象，所有的数据类型均可视为由相应的构造函数（当然构造函数也属于对象）的实例化
// 凡是由 Object 实例的对象均具有原型，且指向 Object.prototype（这里不讨论由Object.create() 创造对象的情况）
// 再接上文，所有的数据类型实例化均可以通过追寻原型链，进而找到相应属性
// 故而从 "hello" 字符串中解构出 length 也就不难理解了
// 而 ... 作为展开语法，笔者不认识它属于解构

// 1.1. 字符串解构

let strDec = () => {
  // 字符串解构
  let arr = [..."hello"];
  console.log(arr);
  // string 对象属性的使用
  let { length } = "hello";
  console.log(length);

  // String.prototype.functions 使用
  let str = String("hello");
  console.log(str.__proto__);
  console.log(str.__proto__.__proto__.__proto__);
  console.log(String.prototype);
  console.log(str.substring(0, 3));
  console.log(str.concat(str));
  console.log(str.toUpperCase());
  console.log(str.toLocaleUpperCase());
};
// strDec();

// 1.2. number 与 boolean 解构
let numDec = () => {
  let { toString: s } = 123;
  console.log(s);
};
// numDec();

// 1.3. array 解构
let arrDec = () => {
  let arr = [1, 2, 3];
  console.log(arr.__proto__);
  let arr1 = Array(1, 2, 3);
  console.log(Array.prototype);
  console.log(arr1.__proto__);
};
// arrDec();

// 2. 字符串扩展
const strExten = () => {
  let str = "huaqi";

  // 2.1. repeat()  重复字符串 （向下取整）
  console.log(str.repeat(2));
  console.log(str.repeat(2.9));

  // 2.2. 遍历 for ... of (原因 string number array object 均可迭代)
  for (let item of str) {
    console.log(item);
  }

  // 2.2. includes() 是否含有某字符串
  console.log(str.includes("hua"));
  console.log(str.includes("11"));

  // 2.3. 字符串模板（可单行或多行输入）
  let strTemp = `
  Hello
  World
  `;
  console.log(strTemp);
};
// strExten();

// 3. array 扩展
let arrExten = () => {
  // 3.1. Array.of 将一组值直接转化为数组，返回一个新数组，不考虑参数的数量或类型
  // 注：不能将 一个 字符串 转化为 数组
  let strArr = Array.of("huaqi");
  console.log(strArr);

  // 3.2. Array.from 遍历伪数组，如 string，set结构，node 节点
  // 3.2.1 string
  let str = "huaqi";
  let strArr01 = Array.from(str, item => {
    console.log(item);
    return item;
  });
  console.log(strArr01);

  // 3.2.2. Set
  let mySet = new Set();
  mySet.add("huaqi");
  mySet.add("h");
  mySet.add("hui");
  mySet.add("qi");
  let setArr = Array.from(mySet, item => {
    console.log(item);
    return item;
  });
  console.log(setArr);
  console.log(setArr.length);
  console.log(setArr.concat);

  // 3.2.3. linkedList （不能遍历 linkedList）
  class Node {
    constructor(value, next) {
      this.value = value;
      this.next = null;
    }
  }
  class LinkedList {
    constructor() {
      this.head = null;
      this.length = 0;
    }

    append(value) {
      let newNode = new Node(value);
      if (this.length === 0) {
        this.head = newNode;
      } else {
        let current = this.head;
        while (current.next) {
          current = current.next;
        }
        current.next = newNode;
      }
      this.length += 1;
    }
  }

  let myLinkedList = new LinkedList();
  myLinkedList.append("huaqi");
  myLinkedList.append("huaqi");
  myLinkedList.append("huaqi");
  myLinkedList.append("huaqi");
  console.log(myLinkedList);
  console.log(myLinkedList.length);
  let nodeArr = Array.from(myLinkedList, item => {
    console.log(item);
    return item;
  });
  console.log(nodeArr);

  // 3.3. 查看 array 对象的属性 iterator
  console.log(nodeArr[Symbol.iterator]());
};
arrExten();

// 4. object 扩展
let objectExten = () => {
  let str = "huaqi";
  let strObject = Object.getOwnPropertyDescriptors(str);
  console.log(strObject);
  let strPrototype = Object.getPrototypeOf(str.__proto__.__proto__);
  console.log(strPrototype);
};
// objectExten();
