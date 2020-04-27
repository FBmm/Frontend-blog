# DOM操作

- DOM (Document Object Model) 文档对象模型
- DOM 是针对 HTML XML 的一个 API，允许程序和脚本动态访问和更新 HTML 文档的内容、结构和样式。（开发者通过 DOM 去操作 HTML）
- 在 DOM 中，每一个元素都是节点
- 文档 -> 文档节点
- html 属性 -> 属性节点
- html 元素 -> 元素节点
- 文本 -> 文本节点
- 注释 -> 注释节点

## Document 对象

当浏览器载入 html 文档时，会被解析为 document 对象
document 对象是 html 文档的根节点
可以通过 document 访问所有元素

### [target].addEventListener(event, function, useCapture) 方法

- document.addEventListener() 文档添加事件监听
- element.addEventListener() 指定元素添加事件监听
- [targetEl].removeEventListener() 移除事件监听
- 参数event：事件名称，不使用 'on' 前缀
- 参数useCapture：可选值，默认为false。true 表示事件在捕获阶段执行，false 表示事件在冒泡阶段执行。 
