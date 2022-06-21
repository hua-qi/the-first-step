#!/usr/bin/env node
//  shebang 指令

const program = require("commander");

const helpOptions = require("./lib/core/help");
const createCommanders = require("./lib/core/create");

// 引入 package.json 拿到 version 属性
program.version(require("./package.json").version);

// 帮助和可选信息
helpOptions();

// 创建其他指令
createCommanders();

// 解析参数
program.parse(process.argv);

const options = program.opts();

if (options.dest) console.log(options.dest);
