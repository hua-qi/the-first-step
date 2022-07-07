# Object Types

## 目录

- [Object Types](#object-types)
  - [目录](#目录)
  - [对象类型（Object Types）](#对象类型object-types)
  - [属性修饰符（Property Modifiers）](#属性修饰符property-modifiers)
    - [可选属性（Optional Properties）](#可选属性optional-properties)
    - [readonly 属性（readonly Properties）](#readonly-属性readonly-properties)
    - [索引签名（Index Signatures）](#索引签名index-signatures)

## 对象类型（Object Types）

在 JS 中，**最基本的将数据成组和分发的方式就是通过对象**。

在 TS 中，通过对象类型以描述对象。

```typescript
// 匿名对象
function greet(person: { name: string; age: number }) {
    return "Hello " + person.name;
}

// 使用接口定义
interface Person {
    name: string;
    age: number;
}

function greet(person: Person) {
    return "Hello " + person.name;
}

// 通过类型别名定义
type Person = {
    name: string;
    age: number;
};

function greet(person: Person) {
    return "Hello " + person.name;
}

```

---

## 属性修饰符（Property Modifiers）

对于对象类型中的每个属性可以说明它的类型、属性是否可选、属性是否只读等信息。

### 可选属性（Optional Properties）

属性名 + ?，表示该属性可选。

```typescript
interface PaintOptions {
    shape: Shape;
    xPos?: number;
    yPos?: number;
}

function paintShape(opts: PaintOptions) {
    // ...
}

const shape = getShape();
paintShape({ shape });
paintShape({ shape, xPos: 100 });
paintShape({ shape, yPos: 100 });
paintShape({ shape, xPos: 100, yPos: 100 });
```

若在 strictNullChecks 模式下，在 paintShape() 函数体内尝试读取这些属性，TS 会提示属性值可能是 undefined。

```typescript
function paintShape(opts: PaintOptions) {
    let xPos = opts.xPos;
    // (property) PaintOptions.xPos?: number | undefined
    let yPos = opts.yPos;
    // (property) PaintOptions.yPos?: number | undefined
}

// 在 JS，若函数的参数没有传入实参，根据形参名称进行获取会得到 undefined，所以可以针对 undefined 进行特殊处理
function paintShape(opts: PaintOptions) {
    let xPos = opts.xPos === undefined ? 0 : opts.xPos; // xPos: number
    let yPos = opts.yPos === undefined ? 0 : opts.yPos; // yPos: number
}

// 上述针对 undefined 的特殊处理在 JS 中很常见，为此 TS 提供了专门的语法糖
// 使用解构语法为 xPos 和 yPos 提供默认值
// 现在 xPos 和 yPos 的值在 paintShape() 内部一定存在，但对于 paintShape() 的调用者，却是可选的
function paintShape({ shape, xPos = 0, yPos = 0 }: PaintOptions) {
    console.log("x coordinate at", xPos); // (parameter) xPos: number
    console.log("y coordinate at", yPos); // (parameter) yPos: number
}

```

注：**现在并没有在解构语法中声明类型注解的方式**

```typescript
function draw({ shape: Shape, xPos: number = 100 /* ... */ }) {
    render(shape);
    // Cannot find name 'shape'. Did you mean 'Shape'?
    render(xPos);
    // Cannot find name 'xPos'.
}
```

在对象解构语法中，shape: Shape 表示将 shape 的值赋值给局部变量 Shape。xPos: number 也是一样，会基于 xPos 创建一个名为 number 的局部变量。

### readonly 属性（readonly Properties）

在 TS 中，属性可以被标记为 readonly，这不会改变任何运行时的行为，但在类型检查时，一个标记为 readonly 的属性是不能被写入的。

```typescript
interface SomeType {
    readonly prop: string;
}

function doSomthing(obj: SomeType) {
    // We can read from 'obj.prop'.
    console.log(`prop has the value '${obj.prop}'.`)

    // But we can't re-assign it.
    obj.prop = "hello";
    // Cannot assign to 'prop' because it is a read-only property
}

// readonly 只在浅层设置了不可写

interface Home {
    readonly resident: {
        name: string;
        age: number
    };
}

function visitForBirthday(home: Home) {
    // We can read and update properties from 'home.resident'.
    console.log(`Happy birthday ${home.resident.name}!`);
    home.resident.age++;
}

function evict(home: Home) {
    // But we can't write to the 'resident' property itself on a 'Home'.
    home.resident = {
        // Cannot assign to 'resident' because it is a read-only property.
        name: "Victor the Evictor",
        age: 42,
    };
}
```

TS 在检查两个类型是否兼容时，并不会考虑两个类型里的属性是否是 readonly，这就意味着，readonly 的值可以通过别名修改。

```typescript
interface Person {
    name: string;
    age: number;
}

interface ReadonlyPerson {
    readonly name: string;
    readonly age: number;
}

let writablePerson: Person = {
    name: "Person McPersonface",
    age: 42,
};

// works
let readonlyPerson: ReadonlyPerson = writablePerson;

console.log(readonlyPerson.age); // prints '42'
writeablePerson.age++;
console.log(readonlyPerson.age); // prints '43'

```

### 索引签名（Index Signatures）

当不能提前知道类型中所有属性的名字，但知道这些值的特征时，可以使用索引签名来描述可能的值的类型。

```typescript
// 该索引签名表示当一个 StringArray 类型的值使用 number 类型的值进行索引的时候，会返回一个 string 类型的值。
interface StringArray {
    [index: number]: string;
}

const myArray: StringArray = getStringArray();
const secondItem = myArray[1]; // const secondItem: string
```

**一个索引签名的属性类型必须是 string 或 number。**

虽然 TS 同时支持 string 和 number 类型，但*数字索引的返回类型一定是字符索引类型的子类型*。因为当使用数字类型进行索引时，JS 实际上会将其转换为一个字符串。

上述原理总结：使用数字 100 进行索引与使用字符串 100 索引，效果是一样的。

```typescript
interface Animal {
    name: string;
}

interface Dog extends Animal {
    breed: string;
}

// Error: indexing with a numeric string might get you a completely separate type of Animal!
interface NotOkay {
    [x: number]: Animal;
    // 'number' index type 'Animal' is not assignable to 'string' index type 'Dog'.
    [x: string]: Dog;
}
```

尽管字符串索引用于描述字典模式（dictionary pattern）非常有效，但也会强制所有的属性要匹配索引签名的返回类型。这是因为一个声明类似于 obj.property 的字符串索引，跟 obj["property"]是一样的。

```typescript
interface NumberDictionary {
    [index: string]: number;
    length: number; // ok
    name: string;
    // Property 'name' of type 'string' is not assignable to 'string' index type 'number'
}

// 当然，如果索引签名的返回类型是所有属性类型的联合，那么各种类型的属性就都可以接受了：
interface NumberOrStringDictionary {
    [index: string]: number | string;
    length: number; // ok, length is a number
    name: string; // ok, name is a string
}

// 亦可以为索引签名设置 readonly
interface ReadonlyStringArray {
    readonly [index: number]: string;
}

let myArray: ReadonlyStringArray = getReadOnlyStringArray();
myArray[2] = "Mallory";
// Index signature in type 'ReadonlyStringArray' only permits reading.
```

---
