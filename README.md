# Frontend-blog

前端相关技术博客

> 君子终日乾乾，夕惕若厉，无咎 - 《易·乾》

## 目录

- html
    - [html元素](HTML/html元素.md)

- js
    - [dom操作](JS/DOM操作.md)
    - [原型链](JS/原型链.md)

- js 应用
    - [手写Promise](JS/Promise/手写promise.js)
    - [adEventListener、冒泡事件](example/dom操作/addEventListener.html)
    - [url替换为a标签](example/url替换为a标签/urlToElementA.html)

- Vue 源码
    - [v2.0.0](Vue源码/v2.0.0/README.md)
        - [入口 - index.js](Vue源码/v2.0.0/入口-index.js.md)
        - [全局配置-config.js](Vue源码/v2.0.0/全局配置-config.js.md)

- git
    - [git命令](Git操作/readme.md)

- nodeJS
    - [egg+mongoose](https://github.com/FBmm/egg-mongoose-example)
    - [egg+mysql](https://github.com/FBmm/egg-mysql-example)

- 正则
    - [js正则表达式](RegExp/readme.md)
    - [正则测试](RegExp/正则test.html)

- 面试
    - [html](面试题/html.md)
    - [js](面试题/js.md)
    - [计算机基础](面试题/计算机基础.md)

- 计算机基础
    - 数据结构
    - 设计模式
    - [计算机网络](计算机基础/计算机网络.md)

- 数据库
    - [MongoDB](https://github.com/FBmm/Mongodb-blog)
    - Mysql

## 实际开发中的疑问

- vuex 中应该写什么？

vuex 官方文档中描述：
> 如果您不打算开发大型单页应用，使用 Vuex 可能是繁琐冗余的。...如果您需要构建一个中大型单页应用，您很可能会考虑如何更好地在组件外部管理状态，Vuex 将会成为自然而然的选择。
说明当我们项目的规模有可能**很复杂**，并且需要在**组件外部**管理状态，就可以使用 vuex

知乎大佬总结两种vuex应用场景：
> 1、组件之间全局共享的数据
> 2、通过后端异步请求的数据 - 把vuex当成数据存储中心，action 中封装数据的增删改查等逻辑，组件中关注页面交互与数据渲染等视图层逻辑

我现在项目基本是使用场景2，但是遇到个问题 - vuex action中会涉及太多业务逻辑，导致action很复杂，可能是自己没有抽离好数据逻辑和视图逻辑，在以后的需求寻找答案更新。。。
