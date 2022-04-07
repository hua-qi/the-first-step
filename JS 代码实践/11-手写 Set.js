(function (global) {
  // 考虑 Set 中 NaN 为相等值
  // Array.prototype.indexOf() 本质上是执行 ===
  // 但是 NaN !== NaN

  let NaNSymbol = Symbol("NaN");

  //  只有 NaN !== NaN
  let encodeVal = function (value) {
    return value !== value ? NaNSymbol : value;
  };

  let decodeVal = function (value) {
    return value === NaNSymbol ? NaN : value;
  };

  //  迭代器实现
  let makeIterator = function (arr, iterator) {
    let nextIndex = 0;

    // new Set(new Set()) 会调用此处
    let obj = {
      next: function () {
        return nextIndex < arr.length
          ? {
              value: iterator(arr[nextIndex++]),
              done: false,
            }
          : {
              // 这里不明白
              value: void 0,
              done: true,
            };
      },
    };

    // [...set.keys()] 会调用这里
    obj[Symbol.iterator] = function () {
      return obj;
    };

    return obj;
  };

  function forof(obj, cb) {
    let iterable, result;

    if (typeof obj[Symbol.iterator] !== "function") {
      throw new TypeError(`${obj} is not iterable`);
    }

    if (typeof cb !== "function") {
      throw new TypeError(`${cb} must be callable`);
    }

    iterable = obj[Symbol.iterator]();

    result = iterable.next();
    while (!result.done) {
      cb(result.value);
      result = iterable.next();
    }
  }

  function Set_(data) {
    this._values = [];
    this.size = 0;

    data &&
      data.forEach(item => {
        this.add(item);
      }, this);
  }

  Set_.prototype.add = function (value) {
    value = encodeVal(value);

    if (this._values.indexOf(value) === -1) {
      this._values.push(value);
      this.size++;
    }

    return this;
  };

  Set_.prototype.has = function (value) {
    return this._values.indexOf(encodeVal(value)) !== -1;
  };

  Set_.prototype.delete = function (value) {
    let idx = this._values.indexOf(encodeVal(value));

    if (idx === -1) return false;

    this._values.splice(idx, 1);
    this.size--;
    return true;
  };

  Set_.prototype.clear = function () {
    this._values = [];
    this.size = 0;
  };

  Set_.prototype.forEach = function (callbackFn, thisArg) {
    thisArg = thisArg || global;

    let iterator = this.entries();

    forof(iterator, item => {
      callbackFn.call(thisArg, item[1], item[0], this);
    });

    // for (let i = 0; i < this._values.length; i++) {
    //   callbackFn.call(
    //     thisArg,
    //     decodeVal(this._values[i]),
    //     decodeVal(this._values[i]),
    //     this
    //   );
    // }
  };

  Set_.prototype.values = Set_.prototype.keys = function () {
    return makeIterator(this._values, function (value) {
      return decodeVal(value);
    });
  };

  Set_.prototype.entries = function () {
    return makeIterator(this._values, function (value) {
      return [decodeVal(value), decodeVal(value)];
    });
  };

  Set_.prototype[Symbol.iterator] = function () {
    return this.values();
  };

  Set_.length = 0;
  global.Set_ = Set_;
})(globalThis);

let mySet = new Set_([1, 2, 3, NaN, NaN]);
mySet.forEach((value, key, set) => {
  console.log(value, key, set.size);
});
console.log([...mySet.keys()]);
console.log([...mySet.values()]);
console.log([...mySet.entries()]);

console.log(mySet.size);
mySet.delete(1);
console.log(mySet.has(1));
mySet.clear();
console.log(mySet.size);
