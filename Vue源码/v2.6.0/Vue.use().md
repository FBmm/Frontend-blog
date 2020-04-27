# Vue.use()

- 由源码需要学习的点
  - Vue.use 是用来安装vue.js插件，也就是在vue原有功能的基础上对vue进行扩展
  - vue.use 需要在 new Vue 之前调用
  - vue.use 安装的插件是对象，必须提供 install 方法
  - vue.use 安装的插件是函数，函数作为 install 方法

## 先看Vue.use源码中相关的代码

### initUse(Vue) - 初始化 Vue.use 方法代码

路径 - src\core\global-api\index.js 代码位置 - 65行

```js
...
extend(Vue.options.components, builtInComponents)

// 初始化 Vue.use 方法
initUse(Vue)
initMixin(Vue)
...
```

> 这里的 initUse 主要是将 use 方法挂载到 Vue 构造函数上，因此开发者在初始化 Vue 实例之前就可以调用 Vue.use()
> initUse 入参是 Vue 全局对象，所以 use 方法是 Vue 的一个全局 API
> 下面探讨 Vue.use() 调用后做的事情

### Vue.use 安装插件代码

路径 - src\core\global-api\use.js

```js
import { toArray } from '../util/index'

export function initUse (Vue: GlobalAPI) {
  Vue.use = function (plugin: Function | Object) {
    const installedPlugins = (this.   || (this._installedPlugins = []))
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    const args = toArray(arguments, 1)
    args.unshift(this)
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }
    installedPlugins.push(plugin)
    return this
  }
}
```

今天bug有点多 未完待续...
