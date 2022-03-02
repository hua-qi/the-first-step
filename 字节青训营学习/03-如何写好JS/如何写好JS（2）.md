# 过程抽象

- 用来处理局部细节控制的一些方法
- 函数式编程思想的基础应用

## 文章目录

- [过程抽象](#过程抽象)
  - [文章目录](#文章目录)
  - [代码示例 -- 操作次数限制](#代码示例----操作次数限制)
  - [高阶函数](#高阶函数)
    - [什么是高阶函数](#什么是高阶函数)
    - [常用高阶函数](#常用高阶函数)
  - [编程范式](#编程范式)
    - [JS 的命令式与声明式写法](#js-的命令式与声明式写法)
    - [代码示例](#代码示例)
  - [总结](#总结)

## 代码示例 -- 操作次数限制

- 一些异步交互
- 一次性的 HTTP 请求

为了能够让“只执行一次”的需求覆盖不同的事件处理，可以将该需求进行剥离。这个过程就是**过程抽象**。
[高阶函数 Once  JS Bin](https://jsbin.com/poliqov/3/edit?output)

## 高阶函数

### 什么是高阶函数

简单来说，高阶函数就是一个函数，**以函数作为参数** 或 **将函数作为返回值。**

**注**：高阶函数常用于作为函数装饰器。

```javascript
/* 
高阶函数等价范式
直接调用该函数 与
调用高阶函数处理后函数 （高阶函数内，通过 apply() 方式调用函数）
效果相同
*/
function HOF0(fn) {
  return function(...args) {
	  return fn.apply(this, args);
 };
};

```

### 常用高阶函数

- [Once   JS Bin](https://jsbin.com/poliqov/3/edit?output)
- [Throttle   JS Bin](https://jsbin.com/gusokoz/edit?html,js,output)
- [Debounce   JS Bin](https://jsbin.com/tekubus/edit?html,js,output)
- [Consumer - 01  JS Bin](https://jsbin.com/dahonak/edit?html,js,console)
- [Consumer - 02  JS Bin](https://jsbin.com/koluxej/edit?html,js,output)
- [Iterative  JS Bin](https://jsbin.com/nogerox/edit?html,js,output)

## 编程范式

![编程范式](https://img-blog.csdnimg.cn/f9a3520707434bc39fce396a473800c1.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAaHVhcWlf,size_20,color_FFFFFF,t_70,g_se,x_16)

### JS 的命令式与声明式写法

```javascript
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

```

### 代码示例

- [Toggle - 命令式  JS Bin](https://jsbin.com/racawih/edit?html,css,js,output)
- [Toggle - 声明式  JS Bin](https://jsbin.com/yohehag/edit?html,css,js,output)
- [Toggle - 三态  JS Bin](https://jsbin.com/fokesuw/edit?html,css,js,output)

## 总结

- 过程抽象、HOF、装饰器
- 命令式、声明式

[文章相关源码](https://github.com/hua-qi/the-first-step/tree/main/%E5%AD%97%E8%8A%82%E9%9D%92%E8%AE%AD%E8%90%A5%E5%AD%A6%E4%B9%A0/03-%E5%A6%82%E4%BD%95%E5%86%99%E5%A5%BDJS)