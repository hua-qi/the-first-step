# font 的关键字属性值

font 属性值除了缩写用法，亦**支持关键字属性值**。

## 目录

- [font 的关键字属性值](#font-的关键字属性值)
  - [目录](#目录)
  - [font 属性值缩写](#font-属性值缩写)
    - [font 缩写破坏部分属性的继承](#font-缩写破坏部分属性的继承)
    - [font 缩写必须声明 font-family](#font-缩写必须声明-font-family)
  - [使用关键字值的 font 属性](#使用关键字值的-font-属性)
  - [font 关键字属性值的应用价值](#font-关键字属性值的应用价值)

## font 属性值缩写

font 属性值缩写完整语法：

> [ [font-style || font-variant || font-wight]? font-size [/ line-height]? font-family ]

|| 表示或。？表示 0 或 1 个（于正则表达式中的 ？含义一致）。

由上述语法，**font-size 和 font-family 关键字不可省略**。

### font 缩写破坏部分属性的继承

若当前页面 line-height: 20px，当声明下述 CSS 属性：

```css
.font {
  font: 400 30px "Microsoft Yahei";
}
```

此时，.font 元素的**行高 line-height 属性值被重置为 normal**，而不同浏览器上 line-height: normal 的计算值不一样。因此，在**使用 font 缩写时，如果不设定行高值，一定会出现不兼容的问题**。

### font 缩写必须声明 font-family

由于元素原本继承的 font-family 可能会很长，如果每次 font 缩写都需要重新声明一边，显然不现实。

两种方法解决上述问题：

方法一：使用系统根本不存在的字体名占位，如字母 a 或笑脸表情😊，然后再声明 font-family: inherit 重置该占位字体。

```css
.font {
  font: 30px/30px "😊";
  font-family: inherit;
}
```

方法二：使用 **@font-face 规则将字体列表重定义为一个字体**，该方法兼容性好、效益高。

---

## 使用关键字值的 font 属性

> font: caption | icon | menu | message-box | small-caption | status-bar

若将 font 属性设置为上述任意一个值，等同于设置 font 为操作系统该部件对应的 font，即直接使用系统字体。

- caption
  - 活动窗口标题栏使用的字体
- icon
  - 包含图标内容所使用的字体
  - 如所有文件夹名称、文件名称、磁盘名称、浏览器窗口标题
- menu
  - 菜单使用的字体
  - 文件夹菜单
- message-box
  - 消息盒中的字体
- small-caption
  - 调色板标题所使用的字体
- status-bar
  - 窗体状态栏使用的字体

**注**：使用关键字作为 font 属性值必须单独使用，不能添加 font-family、font-size 之类属性值。

**font 关键字属性值本质上也是一种缩写，其中包含了诸如 font-size 信息**。

---

## font 关键字属性值的应用价值

对于 CSS 的初始化代码

```css
html {
  font-family: 'Microsoft YaHei';
}
```

若使用上述初始化设置，意味着所有操作系统下的所有浏览器都要使用“微软雅黑”字体。假如用户的 iMac 或 macbook 因为某些原因安装了“微软雅黑”字体，就无法使用系统原本更加漂亮的中文字体。

需求：非 Windows 系统下不使用“微软雅黑”字体，而使用其系统字体。

使用标准的系统字体关键字：system-ui。

```css
html {
  font-family: system-ui;
}
```

在 Windows 系统下的 Chrome 浏览器的 system-ui 指调色板标题（small-caption）使用的字体。

当然，**更好的方法就是现在介绍的 font 的关键字**。

三选一即可

```css
html {
  font: menu;
}
body {
  font-size: 16px;
}

/* ============== */

html {
  font: small-caption;
}
body {
  font-size: 16px;
}

/* ============== */

html {
  font: status-bar;
}
body {
  font-size: 16px;
}
```
