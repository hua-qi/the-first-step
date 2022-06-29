# JS Object 实现

## 目录

- [JS Object 实现](#js-object-实现)
  - [目录](#目录)
  - [JS Object 类图说明](#js-object-类图说明)
  - [创建 JSObject](#创建-jsobject)
    - [FixedArray 介绍](#fixedarray-介绍)

## JS Object 类图说明

![JS Object 类图](./images/00-JS%20Object%20%E7%B1%BB%E5%9B%BE.png)

1. V8 中所有数据类型的根父类都是 Object
2. Object 派生 HeapObject
   - 提供存储基本功能
3. JS Receiver
   - 用于原型查找
4. JSObject
   - 即 JS 中的 Object
   - Array/Function/Date 等继承于 JSObject
5. FiexedArray
   - 实际存储数据的地方

## 创建 JSObject

在创建一个 JSObject 之前，会先把读到的 Object 的文本属性序列化成 constant_properties

```javascript
var data = {
    name: "yin",
    age: 18,
    "-school-": "high school"
}
```

上述数据会被序列化为下图所示的 constant_properties（即 FixedArray）

![constant_properites 序列化](images/01-constant_properites%20序列化.png)

图示的 FixedArray，共有 6 个元素。data 对象共有三个属性，每个属性都有一个 key 和一个 value。

Object 提供的 Print() 函数可用于打印上述对象的信息。

图示的 FixedArray 有两种类型的数据，String 和 整型。

### FixedArray 介绍

FixedArray 是 V8 实现的一个类似于数组的类，表示一段连续的内存，上述 FixedArray.length = 6，那么它所占的内存大小将是：

```shell
length * kPointerSize
```

由于其对象的每个属性存储的都是对应对象的指针（或 直接是整型数据类型，如上述 18）。

在 64 位操作系统上，一个指针的大小为 8 个字节，那么上述数据序列化生成的 FixedArray 的大小为 48 个字节。

FixedArray 记录了一个初始的内存开始地址，使用元素 index 乘以指针大小作为偏移，再加上开始地址，就可以取到相应 index 的元素。与数组取值是一样的道理，V8 为方便添加一些自定义的函数，便自己封装了一个。

