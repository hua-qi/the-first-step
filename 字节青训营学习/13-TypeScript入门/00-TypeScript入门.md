# TypeScript 入门

## 目录

- [TypeScript 入门](#typescript-入门)
  - [目录](#目录)
  - [为什么 什么是 TypeScript](#为什么-什么是-typescript)
    - [TypeScript 历史](#typescript-历史)
    - [JavaScript 与 TypeScript 对比](#javascript-与-typescript-对比)
    - [TypeScript 优势](#typescript-优势)
  - [基本语法](#基本语法)
    - [基础数据类型](#基础数据类型)
      - [JavaScript](#javascript)
      - [TypeScript](#typescript)
    - [对象类型](#对象类型)
    - [函数类型](#函数类型)
      - [JavaScript 函数声明](#javascript-函数声明)
      - [TypeScript 函数声明](#typescript-函数声明)
    - [函数重载](#函数重载)
    - [数组类型](#数组类型)
    - [TypeScript 补充类型](#typescript-补充类型)
    - [TypeScript 泛型](#typescript-泛型)
    - [类型别名 & 类型断言](#类型别名--类型断言)
    - [字符串/数字 字面量](#字符串数字-字面量)
  - [高级类型](#高级类型)
    - [联合/交叉类型](#联合交叉类型)
      - [普通类型声明](#普通类型声明)
      - [联合/交叉类型声明](#联合交叉类型声明)
    - [类型保护与类型守卫](#类型保护与类型守卫)
    - [case01](#case01)
    - [函数返回值类型](#函数返回值类型)
  - [工程应用](#工程应用)
    - [浏览器 Web （其他终端相似）](#浏览器-web-其他终端相似)
    - [Node](#node)
  - [Q&A](#qa)
    - [01](#01)
      - [解析](#解析)
    - [02](#02)

## 为什么 什么是 TypeScript

### TypeScript 历史

- 2012-10
  - 微软发布了 TypeScript 第一个版本（0.8）
- 2014-10
  - Angular 发布了基于 TypeScript 的 2.0 版本
- 2015-04
  - 微软发布了 Visual Studio Code
- 2016-05
  - @type/react 发布，TypeScript 可开发 React
- 2020-09
  - Vue 发布了 3.0 版本，官方支持 TypeScript
- 2021-11
  - v4.5 版本发布

### JavaScript 与 TypeScript 对比

- JavaScript
  - 动态类型
    - 编译发生在代码运行**时**
  - 弱类型语言
    - 会发生隐式类型转换
- TypeScript
  - 静态类型
    - 编译发生在代码与运行前
  - 弱类型语言

### TypeScript 优势

- 静态类型
  - 可读性增强
    - 基于语法解析 TSDoc，ide 增强
  - 可维护性增强
    - 在编译阶段暴露大部分错误
      - 多人合作的大型项目中，获得更好的稳定性和开发效率
- JS 的超集
  - 包含与兼容所有 JavaScript 的特性，支持共存
  - 支持渐进式引入与升级

## 基本语法

### 基础数据类型

#### JavaScript

```javascript
// 字符串
const q = "string";
// 数字
const w = 1;
// 布尔值
const e = true;
// null
const r = null;
// undefined
const t = undefined;
```

#### TypeScript

```typescript
// 字符串
const q: string = "string";
// 数字
const w: number = 1;
// 布尔值
const e: boolean = true;
// null
const r: null = null;
// undefined
const t: undefined = undefined;
```

### 对象类型

```typescript
interface IUser {
    // 只读属性: 约束属性不可在对象初始化外赋值
    readonly jobId: number;
    name: string;
    sex: 'man' | 'woman' | 'other';
    age: number;
    // 可选属性: 定义该属性可以不存在
    hobby?: string;
    // 任意属性: 约束所有对象属性都必须时该属性的子类型
    [key: string]: any;
}

const user: IUser = {
    jobId: 21212,
    name: "huaqi",
    sex: "man",
    age: 21,
    hobby: "basketball",
}

// 报错: 无法分配到 "jobId" 因为它是只读属性
user.jobId = 010212;
// 成功: 任意属性标注下可以添加任意属性
user.plateform = "data";
// 报错: 缺少属性 "name", hobby 可缺省
const huaqi: IUser = {
    jobId: 1111,
    sex: "man",
    age: 18,
}
```

### 函数类型

#### JavaScript 函数声明

```javascript
function add(x, y) {
    return x + y;
}

const mult = (x, y) => x * y;
```

#### TypeScript 函数声明

```typescript
function add(x: number, y: number):number {
    return x + y;
}

const mult: (x: number, y: number) => number = (x, y) => x * y;

interface IMult {
    (x: number, y: number): number;
}
const mult: IMult = (x, y) => x * y;
```

### 函数重载

```typescript
function getDate(type: "string", timestamp?: string):string;
function getDate(type: "date", timestamp?: string): Date;
function getDate(type: "string" | "date", timestamp?: string): Date | string {
    const date = new Date(timestamp);
    return type === 'string' ? date.toLocaleString() : date;
}

const x = getDate("date"); // x: Date
const y = getDate("string", "2022-03-09"); // y: string 

// 使用接口声明类型
interface IGetDate {
    (type: "string", timestamp?: string): string;
    (type: "date", timestamp?: string): Date;
    (type: "string" | "date", timestamp?: string): string | Date;
}

/*
报错:
不能将类型 "(type: any, timestamp: any) => string | Date" 分配给类型 "IGetDate"。
不能将类型 "string | Date" 分配给类型 "string"。
不能将类型 "Date" 分配给类型 "string"
*/
const getDate2: IGetDate = (type, timestamp) => {
    const date = new Date(timestamp);
    return type === "string" ? date.toLocaleString() : date;
}
```

### 数组类型

```typescript
// 类型 + 方括号 表示
type IArr1 = number[];
// 泛型表示 (Record 对象类型简化写法)
type IArr2 = Array<string | number | Record<string, number>>;
// 元组表示
type IArr3 = [number, number, string, string];
// 接口表示
interface IArr4 {
    [key: number]: any;
}

const arr1: IArr1 = [1, 2, 3, 4, 5, 6];
const arr2: IArr2 = [1, 2, "3", "4", { a: 1}];
const arr3: IArr3 = [1, 2, "3", "4"];
const arr4: IArr4 = ["string", () => null, {}, []];
```

### TypeScript 补充类型

```typescript
// 空类型，表示无赋值
type IEmptyFunction = () => void;
// 任意类型，是所有类型的子类型
type IAnyType = any;
// 枚举类型：支持枚举值到枚举名的正、反向映射
enum EnumExample {
    add = "+",
    mult = "*",
}
EnumExample["add"] === "+";
EnumExample["+"] === "add";

enum EWeek { Mon, Tue, Wed, Thu, Fri, Sat, Sun };
EWeek["Mon"] === 0;
EWeek[0] === "Mon";
// 泛型
type INumArr = Array<number>;
```

### TypeScript 泛型

```typescript
function getRepeatArr(target) {
    return new Array(100).fill(target);
}

type TGetRepeatArr = (target: any) => any[];

// 不预先指定具体的类型，而是在使用的时候在指定类型的一种特性
type IGetRepeatArrR = <T>(target: T) => T[];

// 泛型接口 & 多泛型
interface IX<T, U> {
    key: T;
    val: U;
}
// 泛型类
class IMan<T> {
    instance: T;
}
// 泛型别名
type ITypeArr<T> = Array

// 泛型约束：限制泛型必须符合字符串 extends
type IGetRepeatStringArr = <T extends string>(target: T) => T[];
const getStrArr: IGetRepeatStringArr = target => new Array(100).fill(target);
// 报错：类型 “number” 的参数不能赋给类型 “string” 的参数
getStrArr(123);

// 泛型参数默认类型 = 
type IGetRepeatArr<T = number> = (target: T) => T[];
const getRepeatArr: IGetRepeatArr = target => new Array(100).fill(target);

// 报错：类型 “string” 的参数不能赋给类型 “number” 的参数
getRepeatArr("123");
```

### 类型别名 & 类型断言

```typescript
// 通过 type 关键字定义了 IObjArr 的别名类型
type IObjArr = Array<{
    key: string;
    [objKey: string]: any;
}>
function keyBy<T extends IObjArr>(objArr: Array<T>) {
    // 未指定类型时，result 类型为 {}
    const result = objArr.reduce((res, val, key) => {
        /*
        reduce
        param01: callback()
            param01: accumlate value 累加值
            param02：current value 当前值
            param03: current value index 当前值索引
            param04: array 当前执行 callback 函数的数组
        param02: initialValue

        return 函数累计处理的结果
        */
        res[key] = val;
        return res;
    }, {});

// 通过 as 关键字，断言 result 类型为正确类型

}
```

### 字符串/数字 字面量

```typescript
// 允许指定字符串/数字必须的固定值

// IDomTag 必须为 html、body、div、span 中的其一
type IDomTag = "html" | "body" | "div" | "span";
// IOddNumber 必须为 1、3、5、7、9 中的其一
type IOddNumber = 1 | 3 | 5 | 7 | 9;
```

## 高级类型

### 联合/交叉类型

#### 普通类型声明

```typescript
// 为书籍列表编写类型
// 弊端：类型声明繁琐，存在较多重复
interface IHistoryBook {
  author: string;
  type: string;
  range: string
}

interface IStoryBook {
  author: string;
  type: string;
  theme: string
}

type IBookList = Array<IHistoryBook | IStoryBook>;

const bookList: IBookList = [{
  author: "huaqi",
  type: "history",
  range: "2001-2021"
}, {
  author: "huahua",
  type: "story",
  theme: "self-help"
}]
```

#### 联合/交叉类型声明

- 联合类型：IA | IB
  - 表示一个值可以是几种类型之一
- 交叉类型：IA & IB
  - 多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性

```typescript
type IBookList = Array<{
  author: string;
} & ({
  type: "history",
  range: string
  } | {
    type: "sytory",
    theme: string
  })>

```

### 类型保护与类型守卫

```typescript
interface IA {
  a: 1,
  a1: 2
}

interface IB {
  b: 1,
  b1: 2
}

function log(arg: IA | IB) {
  // 报错：类型 "IA | IB" 不存在属性 “a”。类型 “IB” 上不存在属性 “a”
  // 结论：访问联合类型时，处于程序安全，仅能访问联合类型中的交集部分
  if (arg.a) {
    console.log(arg.al);
  } else {
    console.log(arg.b1);
  }
}


// 类型守卫：定义一个函数，它的返回值时一个类型谓词，生效范围为子作用域(在此实例下，即是 if 判断作用域)
function getIsIA(arg: IA | IB):arg is IA {
  // arg as IA 进行一个类型断言
  return !!(arg as IA).a;
}

function log2(arg: IA | IB) {
  if (getIsIA(arg)) {
    console.log(arg.a1);
  } else {
    console.log(arg.b1);
  }
}


// 实现函数 reverse
// 其可将数组或字符串进行反转
function reverse(target: string | Array<any>) {
  // typeof 类型保护
  if (typeof target === "string") {
    return target.split("").reverse().join("");
  }
  // instance 类型保护
  if (target instanceof Object) {
    return target.reverse(); 
  }
}

// 实现函数 logBook 类型
// 函数接受书本类型，并 logger 出相关特征
function logBook(book: IBookItem) {
  // 联合类型 + 类型保护 = 自动类型推断
  if (book.type === "history") {
    console.log(book.range);
  } else {
    console.log(book.theme);
  }
}
```

### case01

```typescript
// 实现 merge 函数类型
// 要求 sourceObj 必须为 targetObj 的子集

function merge1(sourceObj, targetObj) {
  const result = { ...sourceObj};
  for (let key in targetObj) {
    const itemVal = sourceObj[key];
    itemVal && ( result[key] = itemValue);
  }
  return result;
}

function merge2(sourceObj, targetObj) {
  return { ...sourceObj, ...targetObj };
}

// 类型实现繁琐：若 obj 类型较为复杂，则证明 source 和 target 便需要大量重复
// 容易出错：若 target 增加/较少 key，则需要 source 联动去除
interface ISourceObj {
  x?: string;
  y?: string;
}
interface ITargetObj {
  x: string;
  y: string;
}
type IMerge = (
  sourceObj: ISourceObj,
  targetObj: ITargetObj
) => ITargetObj; 


// 改进
interface IMerge {
  // Record<string, any> object 类型的一种声明方式
  // key：string
  // value：any

  // Partial TS 内置高级类型
  // 与下文 IPartial 类型表示一致
  <T extends Record<string, any>>(sourceObj: Partial<T>, targetObj: T):T;
}

type IPartial<T extends Record<string, any>> = {
  [P in keyof T]?: T[P];
}

// 索引类型：关键字【keyof】，其相当于取值对象中所有 key 组成的字符串字面量
// type IKeys = "a" | "b"
type IKeys = keyof {
  a: string;
  b: number
};

// 关键字【in】，其相当于取值 字符串字面量中的一种可能，配合泛型 P，即表示每个 key

// 关键字【?】，通过设定对象可选选项，即可自动推导出子集类型
```

### 函数返回值类型

```typescript
// 实现函数 delayCall 的类型声明
// delayCall 接受一个函数作为入参，其 实现延迟 1s 运行函数
// 其返回 promise，结果为入参函数的返回结果

function delayCall(func) {
  return new Promise(reslove => {
    // 延迟 1s 执行该函数
    // 并将函数返回值通过 promise 方式传递出去
    setTimeout(() => {
      const result = func();
      resolve(result);
    }, 1000);
  })
}

// 这里的 ReturnType 为 typescript 内置类型
type IDelayCall = <T extends () => any>(func: T) => ReturnType<T>;

type IReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

// 关键字【extends】跟随泛型出现时，表示类型推断，其表达可类比三元表达式
// 如 T === 判断类型 ? 类型A : 类型B

// 关键字【infer】出现在类型推荐中，表示定义类型变量，可以用于指代类型
// 如该场景下，将函数的返回值作为变量，使用新泛型 R 表示，使用在类型推荐命中的结果中

```

## 工程应用

### 浏览器 Web （其他终端相似）

依托 Webpack 完成 typescript 的工程应用

1. 配置 webpack loader 相关配置
2. 配置 tsconfig.js 文件
   - ts 官网查看相关配置项
3. 运行 webpack 启动 / 打包
4. loader 处理 ts 文件时，会进行编译与类型检查

相关loader

- awesome-typescript-loader
  - TSC 引擎
- babel-loader
  - babel 引擎

### Node

1. 安装 Node 与 npm
2. 配置 tsconfig.js 文件
3. 使用 npm 安装 tsc
4. 使用 tsc 运行编译得到 js 文件
   - 须手动运行 tsc 编译命令

## Q&A

### 01

1. 为以下函数补全类型
2. 若入参为数字数组或字符串数组，如何编写类型
3. 若入参为 N 维数组，如何让编写类型

```typescript
// 找到数组中出现次数最多的数字
function findMaxTimesNum(numberArr) {
  const timeMap = {};
  numberArr.forEach(item => {
    const timesRes = timesMap[item];
    timeMap[item] = timesRes ? timesRes + 1 : 1;
  });

  let maxTimes = 0;
  let result = null;
  for (const key in timesMap) {
    if (timesMap[key] > maxTimes) {
      maxTimes = timesMap[key];
      result = key;
    }
  }

  return result;
}

```

#### 解析

```typescript
// 考察基本类型定义、泛型与数值字面量

interface IArr<T> = Array<T | IArr<T>>;

function timesMapAdd<T>(numberArr: IArr<T>): void {
  numberArr.forEach(item => {
    if (typeof item === array) {
      timesMapAdd(item);
    }
    const timesRes = timesMap[item];
    timesMap[item] = timesRes ? timesRes + 1 : 1;
  });
}

function findMaxTimeNum<T>(numberArr: IArr<T>): T {
  const timesMap: Record<string, T> = {};
  // 考虑多维数组情况
  timesMapAdd(numberArr);

  let maxIimes = 0;
  let result = null;
  for (const key in timesMap) {
    if (timesMap[key] > maxTimes) {
      maxTimes = timesMap[key];
      result = key;
    }
  }

  return result;
}
```

### 02

实现类型 IArrayItem 其泛型为数组类型，返回数组元素 如 IArray\<number[]> => number

```typescript
// 解析：使用泛型定义传入数组类型，通过泛型推断与定义类型变量提取元素子 item 类型 
  type IArrayItem<T> = T extnds Array<infer B> ? B : never;
```
