# Frontend-blog

前端相关技术博客

> 君子终日乾乾，夕惕若厉，无咎 - 《易·乾》

## 目录

- html
    - [html元素](HTML/html元素.md)

- css example
    - [垂直居中]
        - [基于line-height的多行文本垂直居中](CSS/example/垂直居中/基于line-height单行文本垂直居中的1px问题.html)
        - [绝对定位元素的margin-auto垂直水平居中](CSS/example/垂直居中/绝对定位元素的margin-auto垂直水平居中.html)
    - [浮动]
        - [#锚点、焦点定位](CSS/example/浮动/#锚点、焦点定位.html)
        - [BFC-demo](CSS/example/浮动/BFC-demo.html)
        - [float特性](CSS/example/浮动/float特性.html)
    - [定位]
        - [position-relative与定位](CSS/example/定位/position-relative与定位.html)
        
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
    - [数组劫持之数组拦截器](Vue源码/数组方法拦截器/readme.md)
        - [实现代码](Vue源码/数组方法拦截器/index.html)

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
1. 组件之间全局共享的数据
2. 通过后端异步请求的数据 - 把vuex当成数据存储中心，action 中封装数据的增删改查等逻辑，组件中关注页面交互与数据渲染等视图层逻辑

我现在项目基本是使用场景2，但是遇到个问题 - vuex action中会涉及太多业务逻辑，导致action很复杂，可能是自己没有抽离好数据逻辑和视图逻辑，在以后的需求寻找答案更新。。。

今天(2020.6.24)终于找到自己的答案，下面列出一些自己的理解

首先，可以肯定的是vuex最好不包括复杂的业务逻辑(此处该吐槽一下自己以前写的代码)，每个vuex的mutation只包含对state的更新，每个action应该只包含某个http请求执行的结果，至于如果调用和组织这些action，应该交给组件去做。这里还有个原因是当项目规模发展到一定程度，我们回抽离mutation key和action key，官方文档建议的写法是大写下划线式命名规则，如果逻辑过于复杂，单这些key就能让我们头痛。

其次，要注意state保存的响应式数据最好是需要组件之间共享的、或者由http请求得到的数据，没有必要把组件内所有的数据或者一些冗余数据保存在vuex中，我们应该尽量使vuex简洁。

最后，我们必须保证在组件不能直接修改vuex state中的数据，而是应该通过提交mutation去修改。

个人遇到的例子：
1. 比如最常见的一个列表，应该包含表格组件和分页组件。
2. 表格的数据数组和数据总条数应该是从后台查到，而分页的页数和当前页条数应该是由前端组件控制。
3. 最开始，我是将数据列表和一个完整的pageInfo对象存储在state中，因为pageInfo mo对象可以从后台response中拿到，而且又包含总条数，一举两得(为了偷懒)。
4. 如果这样做，数据列表存一个state显然没有问题，因为model强依赖后台list，在组件一般不会对list进行修改。但是pageInfo对象则不然，分页组件可以修改页数和当前页条数，由于javascript对象引用的原理，state的数据则也会被修改，那么显然违背了不能在组件直接修改state的初衷。
5. 此时，我的解决办法是将state中的pageInfo在组件中进行拷贝，这样组件修改分页数据，则不会影响state数据，http请求完成后在commit新的pageInfo mutation，这样感觉是可以解决问题。
6. 那么，让我们回到上面，最初我如此设计的原因(为了偷懒)，但是现在，我额外写了pageInfo数据，又额外写了拷贝以及commit的逻辑，这貌似是反向偷懒。。。
7. 其实，这个场景，我只需要保存数据list和总数即可，list和总数是由http请求得到，不需要在组件进行修改，所以不需要拷贝。
8. 至于用什么样的条件(过滤、分页)查询列表、只要查询条件不是由后台返回，我们都没由必要写到vuex的逻辑，这样设计我的代码貌似简洁了许多。

所以，通过上面的例子，我们可以得出结论
- vuex最好不要涉及复杂的业务逻辑
- state最好只保存组件之间共享的数据、依赖后台且组件内需要使用的数据
- state只能是commit mutation的方式更新，不能在组件通过对象引用方式修改
- action是建议写http请求的逻辑（增删改查），并且没有耦合，如有耦合请抽离
- 如果能预期项目的规模足够庞大，mutation、action key则需要抽离并模块化

## 什么才是开发场景（非面试）中的前端性能优化？- 2020.6.27

-  2020.6.27

> 前端初入门的时候，相信大家都会从一些前端面试题中看到有关前端性能优化的问题，比如：js压缩打包、静态资源压缩、懒加载、预加载、首屏渲染、减少http请求等相关的解决办法。但是，在实际开发中，前端优化远远比想象的复杂很多。

做一件事情之前，我们要反复确认为什么这么做，所以此处我们该弄清楚为什么要做前端性能优化？

> 提出问题，答案构思中...


