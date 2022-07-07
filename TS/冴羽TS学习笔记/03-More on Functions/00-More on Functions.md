# More on Functions

函数是任何应用的基础组成部分，无论它是局部函数（local functions），还是从其他模块导入的函数，亦或是类中的方法。

当然，函数也是值（values），而且像其他值一样，TS 拥有很多描述用于描述。

## 目录

- [More on Functions](#more-on-functions)
  - [目录](#目录)
  - [函数类型表达式（Function Type Expressions）](#函数类型表达式function-type-expressions)
    - [类型别名配合函数类型表达式](#类型别名配合函数类型表达式)
  - [调用签名（Call Signatures）](#调用签名call-signatures)
  - [构造签名（Construct Signatures）](#构造签名construct-signatures)
  - [泛型函数（Generic Functions）](#泛型函数generic-functions)
    - [推断（Inference）](#推断inference)
    - [约束（Constraints）](#约束constraints)
    - [泛型约束实战（Working with Constrained Values）](#泛型约束实战working-with-constrained-values)
    - [声明类型参数（Specifying Type Arguments）](#声明类型参数specifying-type-arguments)
    - [冴语建议-如何写好泛型](#冴语建议-如何写好泛型)
      - [类型参数下移（Push Type Parameters Down）](#类型参数下移push-type-parameters-down)
      - [使用更少的类型参数（Use Fewer Type Parameters）](#使用更少的类型参数use-fewer-type-parameters)
      - [类型参数应该出现两次（Type Parameters Should Appear Twice）](#类型参数应该出现两次type-parameters-should-appear-twice)
  - [可选参数（Optional Parameters）](#可选参数optional-parameters)
    - [回调中的可选参数（Optional Parameters in Callbacks）](#回调中的可选参数optional-parameters-in-callbacks)

## 函数类型表达式（Function Type Expressions）

函数类型表达式的写法类似于箭头函数

```typescript
function greeter(fn: (a: string) => void) {
    fn("Hello, World");
}

function printToConsole(s: string) {
    console.log(s);
}

greeter(printToConsole)
```

上述函数中，语法 (a: string) => void，表示该函数，其参数名为 a，该参数类型类型是 string，且该函数并没有任何返回值。

如果函数的参数类型没有明确给出，会被隐式设置为 any。

**注**：在为函数注明类型时，函数参数的名字必须被连带声明。

函数类型描述 (string) => void，表示该函数的参数名为 string，其类型为 any，且并没有任何返回值。

### 类型别名配合函数类型表达式

```typescript
type GreetFunction = (a: string) => void;
function greeter(fn: GreetFunction) {
    // ...
}
```

---

## 调用签名（Call Signatures）

在 JS 中，函数自身可以拥有属性值。在上一节提到的函数类型表达式并不支持声明函数属性。

如果想要使用 TS 描述一个带有属性的函数，可以在一个对象类型中写一个调用签名（call signature）。

```typescript
type DescribableFunction = {
    description: string;
    (someArg: number): boolean;
}

function doSomething(fn: DescribableFunction) {
    console.log(fn.description + " returned " + fn(6));
}
```

**注**：该语法与函数类型表达式稍有不同，在参数列表和返回类型之间使用 : 符号进行分隔，而不是 =>。

---

## 构造签名（Construct Signatures）

JS 中函数也可以使用 new 操作符调用，函数被当作构造函数进行调用时，TS 会认为这是一个构造函数（constructors）。

由于构造函数会产生一个新对象，此时可以写一个构造签名用于应对这种情况。

构造签名的声明方式：在调用签名之前添加一个 new 关键字。

```typescript
type SomeConstructor = {
    new (s: string): SomeObject;
};

function fn(ctor: SomeConstructor) {
    return new ctor("hello");
}
```

一些对象，比如 Date 对象，可以直接调用，也可以使用 new 操作符调用，此时可以将调用签名和构造签名合并在一起。

```typescript
interface CallOrConstruct {
    (n?: number): number;
    new (s: string): Date;
}
```

---

## 泛型函数（Generic Functions）

函数类型声明亦需要考虑以下情况：

- 函数的输出类型依赖其输入类型
- 函数的两个输入类型以某种形式相互关联

下例函数，返回传入数组的第一个元素：

```typescript
// 此时函数返回值类型为 any，如何能确定函数返回值类型？
function firstElement(arr: arr[]) {
    return arr[0];
}
```

在 TS 中，泛型用于描述两个值之间的对应关系。

若使用泛型，需要在**函数签名**中声明一个**类型参数（type parameter）**

```typescript
function firstElement<Type>(arr: Type[]): Type | undefined {
    return arr[0];
}
```

通过给函数签名中添加一个类型参数 Type，此时在函数的输入和输出之间创建了关联。

当调用函数时，返回值的类型更容易被判断出来：

```typescript
// s is of type 'string'
const s = firstElement(["a", "b", "c"]);
// n is of type 'number'
const n = firstElement([1, 2, 3]);
// u is of type undefined
const u = firstElement([]);
```

### 推断（Inference）

在上述例子中，并没有明确指定 Type 的类型，其返回值的类型是由 TS 自动推断而出。

类型参数亦可以用于多参数情况

```typescript
function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
    return arr.map(func);
}

// Parameter 'n' is of type 'string'
// 'parsed' is of type 'number[]'
const parsed = map(["1", "2", "3"], n => parseInt(n));
```

在上述例子中，TS 既可以推断出 Input 的类型，亦可以根据函数表达式的返回值推断出 Output 的类型。

### 约束（Constraints）

若要关联两个值，并限制只能操作值的一些固定字段，针对这种情况，可以使用**约束**（constraint）对参数类型进行限制。

示例，设计一个函数，该函数需要返回 length 属性值较大的那个对象。

为此，需要保证传入的值需有一个 number 类型的 length 属性，此时，可以使用 extends 语法用于对该函数的参数类型进行约束。

```typescript
function longer<Type extends { length: number }>(a: Type, b: Type) {
    if (a.length >= b.length) {
        return a;
    } else {
        return b;
    }
}

// longerArray is of type 'number[]'
const longerArray = longer([1, 2], [1, 2, 3]);

// longerString is of type 'alice' | 'bob'
const longerString = longer("alice", "bob");

// Error! Numbers don't have a 'length' property
const notOk = longer(10, 100);
// Argument of type 'number' is not assignable to parameter of type '{ length: number }'
```

由上述例子可知，TS 会推断 longer() 的返回类型，即，返回值的类型推断在泛型函数中也是适用的。

正是由于对 Type 进行了 { length: number } 限制，函数才被允许获取 a、b 参数的 length 属性。若没有该类型约束，可能都不可以获取该属性，因为参数 a、b 也许是其他类型，并且没有 length 属性。

基于传入的参数，longerArray 和 longerString 的类型亦可被推断出。

**注**：所谓泛型就是用一个相同类型关联两个或者更多的值。

### 泛型约束实战（Working with Constrained Values）

常见错误示例：

```typescript
function minimumLength<Type extends { length: number }>(obj: Type, minimum: number): Type {
    if (obj.length >= minimum) {
        return obj;
    } else {
        return { length: minimum }
        // Type '{ length: number }' is not assignable to type 'Type'.
        // '{ length: number }' is assignable to the constraint of type 'Type',
        // but 'Type' could be instantiated with a different subtype of constriant '{ length: number }'
    }
}
```

该函数看起来没有任何问题，Type 被 { length: number } 约束，函数返回 Type 类型数据或返回一个符合约束的值。

而这其中的问题在于*函数理应返回与传入参数相同的对象，而不仅仅只是符合约束的对象。*

反例：

```typescript
// 'arr' gets value { length: 6 }
const arr = minimumLength([1, 2, 3], 6);
// and crashes here because arrays have
// a 'slice' method, but not the returned object!
console.log(arr.slice(0));
```

### 声明类型参数（Specifying Type Arguments）

TS 通常能够自动推断泛型调用中传入的类型参数，但并不能总是推断出。

函数示例：

```typescript
function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
    return arr1.concat(arr2);
}

// 不同类型参数调用
const arr = combine([1, 2, 3], ["hello"]);
// Type 'string' is not assignable to type 'number'.

// 若执意将两个不同类型的数组进行合并，可以手动指定 Type
const arr = combine<string | number>([1, 2, 3], ["hello"]);
```

### 冴语建议-如何写好泛型

#### 类型参数下移（Push Type Parameters Down）

函数对比示例：

```typescript
function firstElement1<Type>(arr: Type[]) {
    return arr[0];
}

function firstElement2<Type extends any[]>(arr: Type) {
    return arr[0];
}

// a: number (good)
const a = firstElement1([1, 2, 3]);
// b: any (bad)
const b = firstElement2([1, 2, 3]);
```

对比：

第一个函数可以推断出返回值的类型为 number，这是 TS 由函数调用时推断的。

第二个函数推断的返回值类型为 any，这是 TS 由给出的约束类型推断的。

显然，第一个函数要好很多。

关于本节的 Push Type Parameters Down 含义，在《重构》中，有一个关于**函数下移**（Push Down Method）的优化方法：如果超类中的某个函数只与一个或者少数几个子类有关，那么最好将其从超类中移到真正关心它的子类中去。即只在超类保留共用的行为。

上述将超类中的函数本体复制到具体需要的子类的方法，可以称之为 “push down”，本节中去除 extend any[]，将具体的推断交给 Type 的操作就类似于 push down。

**Rule**：使用泛型时，尽量直接使用类型参数而不是进行约束。

#### 使用更少的类型参数（Use Fewer Type Parameters）

函数对比示例：

```typescript
function filter1<Type>(arr: Type[], func: (arg: Type) => boolean): Type[] {
    return arr.filter(func);
}

function filter2<Type, Func extends (arg: Type) => boolean>(arr: Type[], func: Func): Type[] {
    return arr.filter(func);
}
```

对于第二个函数，创建了一个并没有关联两个值的类型参数 Func，这意味着调用者不得不毫无理由的手动指定一个额外的类型参数。Func 什么也没做，却导致函数更难阅读和推断。

**Rule**：尽可能使用更少的类型参数

#### 类型参数应该出现两次（Type Parameters Should Appear Twice）

函数对比示例：

```typescript
funnction greet1<Str extends string>(s: Str) {
    console.log("Hello, " + s);
}

greet1("world");

function greet2(s: string) {
    console.log("Hello, ", + s);
}
```

对比两个函数可见，函数并不需要泛型。

**注**：类型参数是用于关联多个值之间的类型。如果一个类型参数只在函数签名中出现了一次，那它就没有跟任何东西产生关联。。

**Rule**：如果一个类型参数仅仅出现在一个地方，强烈建议重新考虑是否真的需要它。

---

## 可选参数（Optional Parameters）

JS 中的函数经常会被传入非固定数量的参数，比如 Number.prototype.toFixed() 支持传入一个可选的参数：

```typescript
function fn1(n: number) {
    console.log(n.toFixed()); // 0 arguments
    console.log(n.toFixed(3)); // 1 arguments
}

// ? 表示参数可选
function fn2(x?: number) {
    // ....
}

fn2(); // Ok
fn2(10); // Ok

declare function fn3(x?: number): void;
function fn3(x = 10) {}

// cut All OK
fn3();
fn3(10);
fn3(undefined); // 当函数的参数为可选时，可以传入 undefined

```

对于第二个函数，尽管其参数被声明为 number 类型，但其实际上的类型为 number | undefined，这是因为在 JS 中未指定的函数参数会被赋值为 undefined。

当然可以如 fn3() 为参数提供一个默认值，但此时显然不符合 Number.prototype.toFixed() 其对可选参数的要求。

此时 fn3() 函数体内，x 的类型为 number，因为参数的 undefined 值会被替换为 10。

### 回调中的可选参数（Optional Parameters in Callbacks）

错误示例：

```typescript
function myForEach(arr: any[], callback: (arg: any, index?: number) => void) {
    for (let i = 0; i < arr.length; i++) {
        callback(arr[i], i);
    }
}

// 将回调函数的 index 设置为可选参数，本意是希望下列调用是合法的：
myForEach([1, 2, 3], a => console.log(a));
myForEach([1, 2, 3], (a, i) => console.log(a, i));

```

对于上述情况，TS 并不如我们所想一致，其认为该回调函数可能只会被传入一个参数，即如下情况：

```typescript
function myForEach(arr: any[], callback: (arg: any, index?: number) => void) {
    for (let i = 0; i < arr.length; i++) {
        // I don't like providing the index today
        callback(arr[i]);
    }
}

// 函数调用时，TS 会进行报错。（当然实际并无可能）
myForEach([1, 2, 3], (a, i) => {
    console.log(i.toFixed());
    // Object is possibly 'undefined'.
})
```

对于上述情况，如何修改呢？不设置可选参数就可以：

```typescript
function myForEach(arr: any[], callback: (arg: any, index: number) => void) {
    for (let i = 0; i < arr.length; i++) {
        callback(arr[i], i);
    }
};

myForEach([1, 2, 3], (a, i) => {
    console.log(a);
})
```

**注**：在 JS 中，如果调用一个函数时，传入了比其需要更多参数，额外的参数就会被忽略。TS 亦是同样的做法。

当声明一个回调函数的类型时，不要写一个可选参数，除非真的打算调用函数的时候不传入实参。
