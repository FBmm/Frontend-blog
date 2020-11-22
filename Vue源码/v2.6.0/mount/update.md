# update

## Why、What

src/core/instance/lifecycle.js

```js
Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {
  const vm: Component = this
  const prevEl = vm.$el // old element - 更新前的原生dom元素
  const prevVnode = vm._vnode // 暂存 old vnode - 更新前的vnode
  const restoreActiveInstance = setActiveInstance(vm)
  vm._vnode = vnode // 用新vnode替换原始vm vnode

  // Vue.prototype.__patch__ is injected in entry points
  // based on the rendering backend used.

  if (!prevVnode) { // vm._vnode不存在，则是初次渲染
    // initial render
    vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */)
  } else { // 否则，则是更新
    // updates
    vm.$el = vm.__patch__(prevVnode, vnode)
  }
  ...
}
```

so, update 是为了：
1. 初次渲染视图和更新视图
2. 通过 patch vnode 替换 vm.$el

## How

下面就是执行vm._update的具体流程

src/core/instance/init.js

```js
Vue.prototype._init = function (options?: Object) {
  const vm: Component = this

  if (vm.$options.el) {
    vm.$mount(vm.$options.el)
  }
}
```

src/platforms/web/runtime/index.js

```js
// public mount method
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && inBrowser ? query(el) : undefined
  return mountComponent(this, el, hydrating)
}
```

src/core/instance/lifecycle.js

```js
export function mountComponent (
  vm: Component,
  el: ?Element,
  hydrating?: boolean
): Component {
  vm.$el = el

  callHook(vm, 'beforeMount')

  let updateComponent

  updateComponent = () => {
    vm._update(vm._render(), hydrating)
  }

  return vm
}
```

核心流程：
- Vue初始化实例时，调用_init方法通过vm.$mount挂载vue实例对应的真实dom 
- 执行$mount，返回mountComponent方法调用的结果
- mountComponent方法执行时
  - 执行vm._render方法，生成新vnode
  - 以新vnode作为vm._update方法的参数并调用vm._update方法更新视图
