# 关于 Web 标准

## 目录

- [关于 Web 标准](#关于-web-标准)
  - [目录](#目录)
  - [了解 Web 标准组织](#了解-web-标准组织)
  - [W3C 规范制定流程](#w3c-规范制定流程)
  - [Ecma TC39 规范制定流程](#ecma-tc39-规范制定流程)
  - [如何参与 -- 关注会议](#如何参与----关注会议)
    - [W3C 会议](#w3c-会议)
    - [Ecam 会议](#ecam-会议)
  - [课后问答](#课后问答)
    - [公司作为标准组织会员有何好处](#公司作为标准组织会员有何好处)
    - [书籍推荐](#书籍推荐)
    - [node.js 在大厂的应用方向](#nodejs-在大厂的应用方向)
    - [是否应吃透 JS 才去学习 React、Vue 框架](#是否应吃透-js-才去学习-reactvue-框架)
    - [前端开发工程师学习 WebAssembly](#前端开发工程师学习-webassembly)

## 了解 Web 标准组织

与前端关系密切的标准组织

- [W3C](www.w3.org)
  - 全称：World Wide Web Consortium
  - [Github](github.com/w3c)
  - [规范查询](www.w3.org/TR)（TR:technique report）
  - 主要 Web 相关标准
    - DOM
    - CSS
    - Web Audio API
    - Web Storage
    - Web RTC
    - WebAssembly JavaScript Interface
- [Ecma](www.ecma-international.org) （注：其并不是什么组织名称的缩写）
  - 全称：Ecam International
  - [TC39](tc39.es)
  - [Github](github.com/tc39)
  - [Discourse](es.discourse.group)
  - 主要 Web 相关标准
    - ECMAScript Language Specification (ECMA-262)
    - ECMAScript Internationalization API Specificaition (ECMA-402)  
- [WHATWG](https://spec.whatwg.org/)
  - 全称：Web Hypertext Application Technology Working Group
  - [Github](github.com/whatwg)
  - [规范查询](spec.whatwg.org/)
  - 主要 Web 相关标准
    - HTML
    - Fetch
    - Enchoding
- [IETF](www.ietf.org/)
  - 全称：Internet Enginnering Task Force
  - [Github](github.com/ietf)
  - 主要 Web 相关标准
    - [HTTP](https://datatracker.ietf.org/doc/html/rfc7540)
    - [HTTP/2](https://datatracker.ietf.org/doc/html/rfc7540)
    - [HTTP/3](https://datatracker.ietf.org/doc/html/draft-ietf-quic-http-34)
    - [JSON](https://datatracker.ietf.org/doc/html/rfc7159)
  
## W3C 规范制定流程

1. Explainer
2. Find the right community/group
3. Web IDL for APIs
4. Step-by-step algorithms
5. GitHub,Markdown,respec,bikeshed,etc
6. Get an early review w3ctag/design-reviews
7. Write web-platform-tests(WPT) tests

## Ecma TC39 规范制定流程

1. Championing a proposal at TC39
2. How to write a good explainer
3. Presenting a Proposal to TC39
4. Reading a proposal draft
5. Stage 3 Proposal Reveiews
6. How to experiment with a proposal before Stage4
7. Implementing and shipping TC39 proposal

## 如何参与 -- 关注会议

### W3C 会议

- 年度大会
  - AC
    - 全称：Advisory Committee
  - TPAC
    - 全称：Technical Plenary and Advisory Committe
- 工作组会议
  - 每月会议
  - 各种研讨会

### Ecam 会议

- 年度大会
  - GA
    - 全称：General Assembly
- TC39 会议
  - 每 1-2 月

## 课后问答

### 公司作为标准组织会员有何好处

- 公司在实践中，会产生公司内部小返回的标准，作为会员参加会议，可以了解到相关信息
- 在会议中，亦可以将自己的标准推广出去
- 作为会员公司的员工，对标准的了解会更进一步，有利于公司氛围的提高

### 书籍推荐

- 红宝书（偏向于实践）
  - 重点放在前半部分
  - 后半部分具体场景,具体参考
- 犀牛书（偏向于理论）

### node.js 在大厂的应用方向

- 2B 层面
  - 作为 BFF （back-end and front-end）中间层，将接口再封装一层，用于不同的前端场景
- 2D 层面
  - 公司私有工具、库的生成与使用

### 是否应吃透 JS 才去学习 React、Vue 框架

- 框架作为更高一层的抽象，可以先去学习框架
- 针对具体业务，带着问题学习 JS 原理
- JS 原理学习与框架学习相辅相成

### 前端开发工程师学习 WebAssembly

- 随着计算量的提高，前端的性能亦需要提升，前端开发需要了解 WebAssembly
- 前端开发工程师亦需要学习底层原理，提高对前端的理解
