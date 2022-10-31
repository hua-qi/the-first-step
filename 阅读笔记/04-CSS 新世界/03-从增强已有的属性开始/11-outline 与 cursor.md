# outline 与 cursor

## 目录

- [outline 与 cursor](#outline-与-cursor)
  - [目录](#目录)
  - [outline 相关新属性 outline-offset](#outline-相关新属性-outline-offset)
    - [curor 属性新增的手型效果](#curor-属性新增的手型效果)

## outline 相关新属性 outline-offset

outline-offset 属性用于改变 outline 属性设置的轮廓的偏移位置

默认情况下，元素设置的 outline 轮廓紧贴元素外边缘渲染，此时若多个元素紧密相连，outline 轮廓会出现互相覆盖遮挡的情况。

对于上述问题，可以使用 outline-offset 属性负值进行优化。

借助 outline-offset 属性让轮廓范围收缩，此时轮廓只会在图片所在区域显示。

---

### curor 属性新增的手型效果

- 放大手型
  - cursor: zoom-in
- 放小手型
  - cursor: zoom-out
- 五指张开
  - cursor: grab
- 五指收起
  - cursor: grabbing

