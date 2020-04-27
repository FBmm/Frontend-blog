# 入口 - index.js

路径 - src\core\index.js

- 主要是执行一些全局配置相关的逻辑
- 是否服务器渲染 Vue.prototype.$isServer getter 方法

## import

```js
/**
 * @description 从 config.js 导入 vue 全局配置对象
 * @Object config
 * 1. 通过 flow 定义参数类型
 * 2. 初始化配置参数默认值
 **/
import config from './config'

/**
 * @description 导入初始化 Vue 全局 API 方法
 * @function initGlobalAPI
 * 1. 入参是Vue对象
 * 2. 在Vue对象挂载全局方法 - util、set、delete、nextTick等
 **/
import { initGlobalAPI } from './global-api/index'

/**
 * @description 导入 Vue 对象
 * 
 **/
import Vue from './instance/index'
```

## 执行逻辑

- 通过 initGlobalAPI(Vue) 方法挂载 Vue 全局 api
- 服务器渲染 Vue.prototype.$isServer 属性
  - 返回值是 config._isServer： process.env.VUE_ENV === 'server'
  - process.env.VUE_ENV：通过 npm 脚本控制 VUE_ENV 值
- 设置当前vue版本信息

## 源码

```js
import config from './config'
import { initGlobalAPI } from './global-api/index'
import Vue from './instance/index'

initGlobalAPI(Vue)

Object.defineProperty(Vue.prototype, '$isServer', {
  get: () => config._isServer
})

Vue.version = '2.0.0'

export default Vue
```
