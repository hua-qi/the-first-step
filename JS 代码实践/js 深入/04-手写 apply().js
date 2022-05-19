Function.prototype.apply01 = function (context, arr) {
  // 调用者不是 function
  if (typeof this !== "function") {
    throw new Error("Type Error");
  }

  // context 未传值
  context = Object(context) || globalThis;
  context.fn = this;
  console.log(context);

  let res = null;

  if (!arr) {
    res = context.fn();
  } else {
    let args = [];
    // 对参数进行深拷贝
    for (let i = 0; i < arr.length; i++) {
      args.push(`arr[${i}]`);
    }

    // args 此时隐式执行 Array.prototype.toString()
    res = eval(`context.fn(${args})`);
  }

  delete context.fn;
  return res;
};

function foo(name, age) {
  let value = this.value;
  return {
    name,
    age,
    value,
  };
}

let obj = {
  value: "010212",
};

let ret = foo.apply01(obj, ["huaqi", 21]);
console.log(ret);

let ret01 = foo.apply(1, ["huaqi", 21]);
console.log(ret01);

let ret02 = foo.apply01(1, ["huaqi", 21]);
console.log(ret02);
