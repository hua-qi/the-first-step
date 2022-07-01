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

上述函数中，语法 (a: string) => void，表示名为 a 的函数，其参数类型是 string，且该函数并没有任何返回值。

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
