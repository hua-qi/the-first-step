(function () {
  let root = this;

  // 防止对象中出现同名属性
  let generateName = (function () {
    let profix = 0;
    return function (descString) {
      profix++;
      return `@@${descString}_${profix}`;
    };
  })();

  let SymbolPolyfill = function Symbol(description) {
    // 实现特性第 2 点，Symbol 函数前不能使用 new 关键字
    if (this instanceof SymbolPolyfill)
      throw new TypeError("Symbol is not a constructor");

    // 实现特性第 5 点，如果 Symbol 的参数是一个对象，就调用该对象的 toString() 方法，将其转换为字符串
    let descString =
      description === undefined ? undefined : String(description);

    //  为返回值（对象） 添加 toString() 方法
    let symbol = Object.create({
      toString: function () {
        return `Symbol(${this.__Description__})`;
      },
    });

    // 为 symbol 定义私有属性
    Object.defineProperties(symbol, {
      __Description__: {
        value: descString,
        writable: false,
        enumerable: false,
        configurable: false,
      },
      __Name__: {
        value: generateName(descString),
        writable: false,
        enumerable: false,
        configurable: false,
      },
    });

    // 实现特性第 6 点，每次调用 Symbol 返回一个新对象，两个对象之间，只要引用不同，就不会相同
    return symbol;
  };

  //  实现 Symbol.for Symbol.keyFor
  let forMap = {};

  Object.defineProperties(SymbolPolyfill, {
    for: {
      value: function (description) {
        let descString =
          description === undefined ? undefined : String(description);

        return forMap[descString]
          ? forMap[descString]
          : (forMap[descString] = SymbolPolyfill(descString));
      },
      writable: true,
      enumerable: false,
      configurable: true,
    },
    keyFor: {
      value: function (symbol) {
        for (let key in forMap) {
          if (forMap[key] === symbol) return key;
        }
      },
      writable: true,
      enumerable: false,
      configurable: true,
    },
  });

  root.SymbolPolyfill = SymbolPolyfill;
})();
