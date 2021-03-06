# CSS 属性值定义语法

CSS 属性值定义语法（CSS value definition syntax）。

CSS 属性值具有专门的定义语法，用于表示 **CSS 属性值的合法组成**。

示例：

线性渐变的语法为：

> linear-gradient( [ \<angle> | to \<side-or-corner> ,]? \<color-stop-list>)

## 目录

- [CSS 属性值定义语法](#css-属性值定义语法)
  - [目录](#目录)
  - [CSS 属性值定义语法详解](#css-属性值定义语法详解)
  - [关键字](#关键字)
  - [数据类型](#数据类型)
  - [符号](#符号)
  - [字面符号斜杠（/）的详细介绍](#字面符号斜杠的详细介绍)

## CSS 属性值定义语法详解

CSS 属性值定义语法包含以下 3 种基本组成元素：

- 关键字
- 数据类型
- 符号

详解上述线性渐变的语法：

- 关键字
  - to
- 数据类型
  - \<angle>
  - \<side-or-corner>
  - \<color-stop-list>
- 符号
  - []
  - ?

---

## 关键字

关键字分为通用关键字和全局关键字。

- **通用关键字**（普通关键字）
  - 只被部分 CSS 属性支持
  - auto
  - none
  - ease
  - to
- **全局关键字**
  - 被所有 CSS 属性支持
  - inherit
  - initial
  - unset
  - revert

---

## 数据类型

数据类型定义方式 “< 数据类型名称 >”。

有些数据类型是 CSS 规范中专门定义的，被称为**基本类型**，其他数据类型被称为**其他类型**。

---

## 符号

CSS 语法中符号分为字面符号、组合符号和数量符号。

**字面符号**，指 CSS 属性值中原本就支持的合法符号，这些符号在 CSS 语法中会按照其原本的字面意义呈现。

| 符号 | 名称       | 描述                                                                                                    |
| :--- | :--------- | :------------------------------------------------------------------------------------------------------ |
| ,    | 并列分隔符 | 用于分隔数个并列值，或者分隔函数的参数值                                                                |
| /    | 缩写分隔符 | 用于分隔一个值的多个部分，在 CSS 缩写中用于分离类型相同但属于不同 CSS 属性的值，以及用在部分 CSS 函数中 |

**组合符号**，用于表示数个基本元素的组合关系。

表中从上往下，组合符号的优先级越来越高。

| 符号 | 名称         | 描述                                                               |
| :--- | :----------- | :----------------------------------------------------------------- |
|      | 并列         | 符号为普通字符，表示各部分必须同时出现，同时需要按顺序出现         |
| &&   | “与”组合符   | 各部分必须出现，可以不按照顺序出现                                 |
| \|\| | “或”组合符   | 各部分至少出现一个，可以不按照顺序出现                             |
| \|   | “互斥”组合符 | 各部分恰好出现其中一个                                             |
| []   | 方括号       | 将各部分进行分组以绕过上述几个符号的优先级规则，方括号的优先级最高 |

**数量符号**，用于描述一个元素可以出现多少次，数量符号不能叠加出现，并且优先级高于组合符号。

| 符号   | 名称       | 描述                                                                                                    |
| :----- | :--------- | :------------------------------------------------------------------------------------------------------ |
|        | 无数量符号 | 恰好出现一次                                                                                            |
| *      | 星号       | 可以出现任意次数                                                                                        |
| +      | 加号       | 可以出现一次或多次                                                                                      |
| ?      | 问号       | 可以出现零次或一次，即该元素可有可无                                                                    |
| {A, B} | 花括号     | 最少出现 A 次，最多出现 B 次                                                                            |
| #      | 井号       | 可以出现一次或多次，但多次出现时必须以逗号分隔，也可以指定数量范围（#{number} number 即指定的数量范围） |
| !      | 叹号       | 表示当前分组必须产生一个值，该符号多出现在组合符号方括号的后面                                          |

---

## 字面符号斜杠（/）的详细介绍

在 CSS 中，凡是出现斜杠（/）的地方，**斜杠前后的数据类型一定是相同或者部分相同的**，否则整个语句就是非法的。
