# 全局配置 - config.js

路径 - src\core\config.js

- flow 声明 Config 对象类型
- 创建 config 对象以及初始化参数值

## import

```js
/**
 * @description 从 util 导入 no、noop 方法
 * @function no 始终返回false
 * @function noop 不执行任何操作的空方法
 */
import { no, noop } from 'shared/util'
```

## type Config

定义 Config 参数类型

```js
export type Config = {
  // user - 外部参数
  optionMergeStrategies: { [key: string]: Function }; // 自定义合并策略的选项 对象内部属性是多个function
  silent: boolean; // 取消 Vue 所有的日志与警告 默认值：false
  devtools: boolean; // 配置是否允许 vue-devtools 检查代码 开发版本默认为 true，生产版本默认为 false
  errorHandler: ?Function; // 指定组件的渲染和观察期间未捕获错误的处理函数。这个处理函数被调用时，可获取错误信息和 Vue 实例。
  ignoredElements: ?Array<string>; // 使 Vue 忽略在 Vue 之外的自定义元素
  keyCodes: { [key: string]: number }; // v-on 自定义键位别名
  // platform - 框架方法
  isReservedTag: (x?: string) => boolean;
  isUnknownElement: (x?: string) => boolean;
  getTagNamespace: (x?: string) => string | void;
  mustUseProp: (x?: string) => boolean;
  // internal - 内部方法
  _assetTypes: Array<string>;
  _lifecycleHooks: Array<string>;
  _maxUpdateCount: number;
  _isServer: boolean;
}
```

## config

创建 Vue 初始化时的 config 配置

```js
const config: Config = {
  /**
   * Option merge strategies (used in core/util/options)
   * 自定义合并策略的选项
   */
  optionMergeStrategies: Object.create(null), // 默认值是没有任何继承的空对象 - {}

  /**
   * Whether to suppress warnings.
   * 取消 Vue 所有的日志与警告 默认值：false
   */
  silent: false,

  /**
   * Whether to enable devtools
   * 配置是否允许 vue-devtools 检查代码 开发版本默认为 true，生产版本默认为 false
   */
  devtools: process.env.NODE_ENV !== 'production',

  /**
   * Error handler for watcher errors
   * 指定组件的渲染和观察期间未捕获错误的处理函数。
   */
  errorHandler: null,

  /**
   * Ignore certain custom elements
   * 使 Vue 忽略在 Vue 之外的自定义元素
   */
  ignoredElements: null,

  /**
   * Custom user key aliases for v-on
   * v-on 自定义键位别名
   */
  keyCodes: Object.create(null), // 默认值是没有任何继承的空对象 - {}

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * List of asset types that a component can own.
   */
  _assetTypes: [
    'component',
    'directive',
    'filter'
  ],

  /**
   * List of lifecycle hooks.
   * Vue生命周期
   */
  _lifecycleHooks: [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'beforeDestroy',
    'destroyed',
    'activated',
    'deactivated'
  ],

  /**
   * Max circular updates allowed in a scheduler flush cycle.
   * 最大循环更新次数
   */
  _maxUpdateCount: 100,

  /**
   * Server rendering?
   * 是否服务器渲染
   */
  _isServer: process.env.VUE_ENV === 'server'
}

```