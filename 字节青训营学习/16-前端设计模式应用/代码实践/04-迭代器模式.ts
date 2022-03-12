// 数组，map，set 都可使用 迭代

const numbers = [1, 2, 3];

const map = new Map();

map.set("k1", "v1");
map.set("k2", "v2");

const set = new Set(["1", "2", "3"]);

for (const number of numbers) {
  // ...
}

for (const [key, value] of map) {
  // ...
}

for (const key of set) {
  // ...
}

// 使用 for of 迭代所有组件

class MyDomElement {
  tag: string;
  children: MyDomElement[];

  constructor(tag: string) {
    this.tag = tag;
    this.children = [];
  }

  addChildren(component: MyDomElement) {
    this.children.push(component);
  }

  // JS 特性，添加 Symbol.iterator 使对象 可迭代
  [Symbol.iterator]() {
    const list = [...this.children];
    let node;

    return {
      next: () => {
        while ((node = list.shift())) {
          node.children.length > 0 && list.push(...node.children);

          return {
            value: node,
            done: false,
          };
        }
        return {
          value: null,
          done: true,
        };
      },
    };
  }
}

test("can iterate root element", () => {
  const body = new MyDomElement("body");

  const header = new MyDomElement("header");

  const main = new MyDomElement("main");

  const banner = new MyDomElement("banner");
  const content = new MyDomElement("content");

  const footer = new MyDomElement("footer");

  body.addChildren(header);
  body.addChildren(main);
  body.addChildren(footer);

  main.addChildren(banner);
  main.addChildren(content);

  const expectTags: string[] = [];

  for (const element of body) {
    if (element) {
      expectTags.push(element.tag);
    }
  }

  expect(expectTags.length).toBe(5);
});
