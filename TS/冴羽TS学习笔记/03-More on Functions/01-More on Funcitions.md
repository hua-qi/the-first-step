# More on Functions

## 目录

- [More on Functions](#more-on-functions)
  - [目录](#目录)
  - [函数重载（Function Overloads）](#函数重载function-overloads)
    - [重载签名和实现签名（Overload Signatures and the Implementation Signature）](#重载签名和实现签名overload-signatures-and-the-implementation-signature)
    - [冴语建议-如何写好函数重载](#冴语建议-如何写好函数重载)
    - [在函数中声明 this（Declaring this in a Function）](#在函数中声明-thisdeclaring-this-in-a-function)
  - [其他需要知道的类型（Other Types to Know About）](#其他需要知道的类型other-types-to-know-about)
    - [void](#void)
    - [object](#object)
    - [unknown](#unknown)
    - [never](#never)
    - [Function](#function)
  - [剩余参数（Rest Parameters and Arguments）](#剩余参数rest-parameters-and-arguments)
    - [parameters 与 arguments](#parameters-与-arguments)
    - [剩余参数（Rest Parameters）](#剩余参数rest-parameters)
    - [剩余参数（Rest Arguments）](#剩余参数rest-arguments)
  - [参数解构（Parameter Destructuring）](#参数解构parameter-destructuring)
  - [函数的可赋值性（Assignability of Functions）](#函数的可赋值性assignability-of-functions)
    - [返回 void](#返回-void)

## 函数重载（Function Overloads）

JS 函数在调用时可以传入不同数量和类型的参数。

举例：一个函数接收一个时间戳（一个参数）或年/月/日的格式（三个参数），返回一个日期类型 Date

在 TS 中，可以通过重载签名（overload signatures）说明一个函数的不同调用方法。此时，需要写一些函数签名（通常两个或者更多），然后再写函数体的内容：

```typescript
function makeDate(timestamp: number): Date;
function makeDate(m: number, d?: number, y?: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d! == undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}

const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
const d3 = makeDate(1, 3);
// No overload expect 2 arguments, but overloads do 
// exist that either 1 or arguments.
```

在上述函数中，声明了两个函数重载，一个接受一个参数，另一个接受三个参数。

最上面的两个函数签名被称为重载签名（overload signatures）。

最后，声明了一个兼容签名的函数实现，称之为**实现签名**（implementation signature）。但是该签名不能被直接调用，尽管在函数的参数类型声明中，在一个必选参数后，声明了两个可选参数，它依然不能被传入两个参数进行调用。

### 重载签名和实现签名（Overload Signatures and the Implementation Signature）

在如下示例写代码时，有一个常见的困惑：

```typescript
function fn(x: string): void;
function fn() {
  // 
}

// Expected to be able to call with zero arguments
fn();
// Expected 1 arguments, but got 0;
```

**注**：写进函数体的签名（即实现签名）外部不可见，即意味着外界不能按照实现签名的方式实现函数调用。

> 实现签名对外界来说是不可见的。当写一个重载函数时，应该总是需要两个或者更多的重载签名置于实现签名之上。

实现签名必须和重载签名进行**兼容**（compatiable）。

错误示例，以下函数之所以报错就是因为它们的实现签名并没有正确的和重载签名匹配。

```typescript
function fn(x: boolean): void;
// Arguments type isn't right
function fn(x: string): void;
// This overload signature is not compatible with its implementation signature.
function fn(x: boolean) {}


function fn(x: string): string;
// Return type isn't right
function fn(x: number): boolean;
// This overload signature is not compatible with its implementation signature.
function fn(x: string | number) {
  return "oops";
}
```

### 冴语建议-如何写好函数重载

函数示例:

```typescript
function len(s: string): number;
function len(arr: any[]): number;
function len(x: any) {
  return x.length;
}

len(""); // OK
len([0]); // OK
// 因为 TS 只能一次使用一个函数重载处理函数调用
// 不能传入一个可能是字符换也可能是数组的值
len(Math.random() > 0.5 ? "hello" : [0]);
// No overload matches this call;
/* 
Overload 1 of 2, '(s: string): number', gave the following error.
  Argument of type 'number[] | hello' is not assignable to parameter of type 'string'.
    Type 'number[]' is not assignable to type 'string'.
Overload 2 of 2, '(arr: any[]): number', gave the following error.
  Argument of type 'number[] | hello' is not assignable to parameter of type 'any[]'.
    Type 'string' is not assignable to type 'any[]'.
 */

// 由于上述函数的两个函数重载都有想通过的参数数量和相同的返回类型
// 可以声明一个无重载版本的函数用于替代
function len(x: any[] | string) {
  return x.length;
}

// 此时该函数传入的参数就可以是连个类型中的任意一个了。
```

> 尽可能使用联合类型替代函数重载

### 在函数中声明 this（Declaring this in a Function）

TS 会通过代码流分析函数中的 this 为什么类型。

```typescript
const user = {
  id: 123,
  admin: false,
  becomeAdmin: function() {
    this.admin = true;
  },
}
```

上述示例中，TS 能够理解函数 user.becomeAdmin 函数体中的 this 指向的是外层的对象 user，这已经可以应对很多情况了，但还有一些情况需要明确的告诉 TS 函数中的 this 到底代表的是什么。

在 JS 中，this 作为保留字不能作为参数进行使用。但 TS 允许在函数体中声明 this 的类型。

```typescript
interface DB {
  filterUsers(filter: (this: User) => boolean): User[];
}

const db = getDB();
const admins = db.filterUsers(function (this: User) {
  return this.admin;
})

// 写法类似于回调风格的 API
// 由于箭头函数本身没有 this，所以需要使用 function 的形式
const admins = db.filterUsers(() => this.admin);
// The containing arrow function captures the global value of 'this'.
// Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. 
```

## 其他需要知道的类型（Other Types to Know About）

### void

void 表示一个函数并不会返回任何值，当函数并没有任何返回值，或者返回不了明确的值的时候，应该使用这种类型。

```typescript
// The inferred return type is void
function noop() {
  return;
}
```

在 JS 中，若函数不会返回任何值，会隐式返回 undefined，但是在 TS 中，void 和 undefined 并不一样。

### object

object 可以表示不是任何原始类型（primitive）的值（string、number、bigint、boolean、symbol、null、undefined）。

object 不同于空对象类型 { }，也不同于全局类型 Object。

> 很有可能用不到全局类型 Object
> object 不同于 Object，object 的使用频率更高

### unknown

unknown 类型可以表示任何值。类似于 any，但是更安全。

对 unknown 类型的值做任何事情都不合法。

```typescript
function f1(a: any) {
  a.b(); // OK
}

function f2(a: unknown) {
  a.b(); // Object is of type 'unknown'.
}
```

unknown 类型在用于描述函数类型时，很有用。

可以描述一个函数可以接受传入任何值，但是在函数体内又用不到 any 类型的值。

可以描述一个函数返回一个未知类型的值。

```typescript
function safeParse(s: string): unknown {
  return JSON.parse(s);
}

// Need to be careful with 'obj'!
const obj = safeParse(someRandomString);
```

### never

never 类型表示一个值不会再被观察到（observed）。

作为一个返回类型时，它表示这个函数会丢出一个异常，或者结束程序的执行。

```typescript
function fail(msg: string): never {
  throw new Error(msg);
}

// 当 TS 确定在联合类型中已经没有是其中的类型时，never 类型也会出现

function fn(x: string | number) {
  if (typeof x === "string") {
    // do something
  } else if (typeof x === "number") {
    // do something else
  } else {
    x; // has type 'never'
  }
}
```

### Function

在 JS 中，全局对象 Function 拥有 bind、call、apply 等属性，以及其他所有的函数值。

它也有一个特殊的性质，即 Function 类型的值总是可以被调用，结果会返回 any 类型：

```typescript
function doSomething(f: Function) {
  f(1, 2, 3);
}
```

上述示例是一个无类型函数调用（untyped function call）,对于这类调用最好要避免，因为它返回的是一个不安全的 any 类型。

如果准备接受一个黑盒的函数，其不打算调用它，() => void 会更安全一些。

## 剩余参数（Rest Parameters and Arguments）

### parameters 与 arguments

parameters 和 arguments 都可以表示函数的参数，由于本节内容做了具体的区分，所以定义 parameters 表示定义函数时设置的名字即形参，arguments 表示实际传入函数的参数即实参。

### 剩余参数（Rest Parameters）

除去用可选参数、重载以使函数可以接受不同数量的函数参数，也可以使用剩余参数语法（rest parameters），定义一个可以传入参数的数量不受限制的函数。

剩余参数必须放在所有参数的最后面，并使用 ... 语法：

```typescript
function multiply(n: number, ...m: number[]) {
  return m.map(x => n * x);
}
// 'a' gets value [10, 20, 30, 40]
const a = mutiply(10, 1, 2, 3, 4);
```

在 TS 中，剩余参数的类型会被隐式设置为 any[] 而不是 any，如果需要设置具体的类型，必须使用 Array\<T> 或者 T[] 形式，再或者使用**元组类型**（tuple type）。

### 剩余参数（Rest Arguments）

可以对数据使用 ... 语法，为函数提供不定数量的实参。

示例：数组的 push 方法可以接受任何数量的实参：

```typescript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
arr1.push(...arr2);
```

**注**：一般情况，TS 并不会假定数组是不变的（immutable），这会导致一些意外的行为：

```typescript
// 类型被推断为 number[] "an array with zero or more numbers"
// not specifically two numbers
const args = [8, 5];
// Math.atan2() 返回从原点 (0,0) 到 (x,y) 点的线段与 x 轴正方向之间的平面角度 (弧度值)，也就是 Math.atan2(y,x)
const angle = Math.atan2(...args);
// A spread arguments must either have a tuple type or be passed to a rest parameter.


// 通常来说，修复上述问题，使用 as const 是最直接有效的解决方法
// Inferred as 2-length tuple
// 认定 args 指向的数组不会发生更改
const args = [8, 5] as const;
// 通过 as const 语法将上述数组，转变为只读元组
// OK
const angle = Math.atan2(...args);
```

## 参数解构（Parameter Destructuring）

可以使用参数解构将对象参数解构为函数体内的一个或多个局部变量。

在 JS 中，须如下声明：

```javascript
function sum({ a, b, c}) {
  console.log(a + b + c);
}

sum({ a: 10, b: 3, c: 9});
```

在 TS 中，对于解构语法，须声明对象的类型注解：

```typescript
function sum({ a, b, c}: { a: number; b: number; c: number}) {
  console.log(a + b + c);
}

// 亦可以使用类型别名，整洁代码
type ABC = { a: number; b: number; c: number };
function sum({ a, b, c }: ABC) {
  console.log(a + b + c);
}
```

## 函数的可赋值性（Assignability of Functions）

### 返回 void

当函数的返回值类型为 void 时，会产生一些意料之外，情理之中的行为。

当基于上下文的类型推导（Contextual Typing）推导出函数的返回值类型为 void 时，并不会强制其一定不能返回内容。

即，当 type vf = () => void 被应用到某函数类型时，该函数可以返回值，但是返回的值会被忽略。

因此，下述 () => void 类型的实现都是有效的

```typescript
type voidFunc = () => void;

const f1: voidFunc = () => { return true; };
const f2: voidFunc = () => true;
const f3: voidFunc = function() { return true; };

// 即便将上述函数的返回值赋值给其他变量，也会维持 void 类型

const v1 = f1();
// v1: void
const v2 = f2();
// v2: void
const v3 = f3();
// v3: void
```

正是因为上述特性的存在，所以接下来的代码才会是有效的：

```typescript
const src = [1, 2, 3];
const dst = [0];

src.forEach(el => dst.push(el));
```

尽管 Array.prototype.push() 返回一个数字，并且 Array.prototype.forEach 方法期待一个返回 void 类型的函数，但上述代码依然没有错。

因为 TS 基于上下文推导，推导出 forEach 函数返回的类型为 void，由于不强制函数一定不能返回内容，所以上述 return dst.push(el) 的写法并不会报错。

**注**：另外一个特殊的例子需要注意，当一个函数**字面量定义**返回一个 void 类型，函数是一定不能返回任何东西的：

```typescript
function f2(): void {
  // @ts-expect-error
  return true;
}

function f3 = function (): void {
  // @ts-expect-error
  return true;
}
```
