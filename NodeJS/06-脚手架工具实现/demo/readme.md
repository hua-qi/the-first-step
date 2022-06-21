# huaqi-react-demo

支持跨平台（windows、MacOS、Linux）

跨包管理工具（yarn、npm）

## 目录

- [huaqi-react-demo](#huaqi-react-demo)
  - [目录](#目录)
  - [项目结构](#项目结构)
  - [工具使用](#工具使用)

## 项目结构

- index.js 入口文件
- lib 库
  - config - 配置库
    - repo-config - 模板相关配置
  - core - 核心库
    - help - 帮助和可选信息
    - create - 创建其他指令
    - actions - clone 模板流程化
  - utils - 工具库
    - terminal - 执行终端命令相关
- package.json
- package-lock.json
- readme.md

## 工具使用

该脚手架目前使用[vite-react-ts](https://github.com/hua-qi/vite-react-ts)作为模板

若需要自定义脚手架模板，请于 /lib/config/repo-config.js 文件中进行相应操作
