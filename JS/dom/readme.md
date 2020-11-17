# DOM

- DOM (Document Object Model) 文档对象模型
- DOM 是针对 HTML XML 的一个 API，允许程序和脚本动态访问和更新 HTML 文档的内容、结构和样式（开发者通过 DOM 去操作 HTML）。

## Node

节点类型 ?

节点关系

- node.childNodes：当前节点子节点的集合，其中保存着一个NodeList集合

> NodeList集合：
> - 节点集合，通常由node.childNodes和document.querySelectorAll返回。
> - node.childNodes返回的NodeList 是一个实时集合，dom树结构的变化能自动反映到NodeList。
> - document.querySelectorAll返回的是静态NodeList。
> - 是一个类数组对象，但不是数组，可以使用Array.from()和Array.prototype.slice.call(node.childNodes, 0)转换成数组。
> - 可通过node.childNodes[0]或者node.childNodes.item(0)方式访问集合的节点。

- parentNode.firstNode：指向childNodes的第一个节点
- parentNode.lastNode：指向childNodes的最后一个节点
- node.previousSibling：指向同一childNodes列表的前一个节点 
- node.nextSibling：指向同一childNodes列表的后一个节点
- hasChildNodes()：childNodes.length > 0 时返回 true

操作节点

- 操作节点的本质是操作节点在chlildNodes中的位置。
- appendChild()：在chlildNodes末尾添加一个节点
  - ```parentNode.appendChild(newNode)```

```js
  const returnNode = parentNode.appendChild(newNode)
  console.log(returnNode === newNode) // true
```
- replaceChild()：替换chlildNodes列表的某个节点
  - ```parentNode.replaceChild(newNode, oldNode)```
- removeChild()：移除chlildNodes列表的某个节点
  - ```parentNode.removeChild(oldNode)```
- insertBefore()：在chlildNodes列表的某个节点前插入一个节点
  - ```parentNode.insertBefore(newNode, referenceNode)```
  - parentNode 父节点
  - newNode 被插入的新节点
  - referenceNode newNode 插入到这个节点前
  - 如果 referenceNode 不存在，insertBefore 与 appendChild 一致

其他方法

- 所有节点都有
  - cloneNode()：获得某个节点的副本
    - ```const newNode = node.cloneNode(deep)```
    - deep true表示深克隆（克隆节点以及所有子节点），false表示浅克隆（只克隆节点本身）
  - normalize() 处理文档树中的文本节点


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
