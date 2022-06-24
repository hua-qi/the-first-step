// 1. 通过 alloc（内存分配器）创建 buffer
const buffer = Buffer.alloc(8);
console.log(buffer);

// 修改 buffer 数组元素值
buffer[0] = 88;
buffer[1] = 0x88;

console.log(buffer);
