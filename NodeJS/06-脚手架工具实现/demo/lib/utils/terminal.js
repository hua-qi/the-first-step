/* 
执行终端命令的相关代码
 */

// 操作子进程
const { spawn } = require("child_process");

const commandSpawn = (...args) => {
  return new Promise((resolve, reject) => {
    // 开启子进程
    console.log(...args);
    const childProcess = spawn(...args);
    /* 
    将子进程执行信息 传输到 当前进程
    stdout 正常执行流信息
    stderr 错误执行流信息
     */

    childProcess.stdout.pipe(process.stdout);
    childProcess.stderr.pipe(process.stderr);
    // 监听进程关闭信息
    childProcess.on("close", () => {
      resolve();
    });
  });
};

module.exports = {
  commandSpawn,
};
