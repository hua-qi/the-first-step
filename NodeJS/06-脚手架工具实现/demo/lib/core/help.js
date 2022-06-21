const program = require("commander");

const helpOptions = () => {
  // 设置自定义 options
  // <dest> 使用变量名 dest 接收参数
  program.option(
    "-D --dest <dest>",
    "a destination folder, e.g. -d /src/components"
  );

  program.on("--help", () => {
    console.log(`
Other:
    other options...
    `);
  });
};

module.exports = helpOptions;
