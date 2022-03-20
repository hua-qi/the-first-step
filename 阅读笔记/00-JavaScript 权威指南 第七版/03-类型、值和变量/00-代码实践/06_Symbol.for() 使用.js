let s = Symbol.for("shared");
let t = Symbol.for("shared");
s === t; // => true
s.toString(); // => "Symbol(shared)"
Symbol.keyFor(t); // => "shared"

console.log(s === t);
console.log(s.toString());
console.log(t.toString());
console.log(Symbol.keyFor(s));
console.log(Symbol.keyFor(t));

// Symbol.for() 与 Symbol() 方法对比

let s1 = Symbol("sym_x");
let s2 = Symbol("sym_x");
console.log(s1 === s2);
console.log(s1.toString());
console.log(s2.toString());
