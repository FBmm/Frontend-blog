# CSS

> 最初的时候，对于CSS的了解只是停留在会用的阶段，只是根据原型使用一些css样式堆砌成页面，缺少了一些思考，所以代码也就少了一些灵魂。

为什么开始学习css？

公司大佬曾经问过我两个问题记忆很深刻，没有知其所以然，所以回答可能有些牵强。为了寻找解释这两个问题的答案，由此开始了CSS学习之路。现在看来当时的回答只是强行解释。

> 参阅的资料：《CSS世界》、《CSS设计指南》、[W3C层叠样式表规范](http://www.ayqy.net/doc/css2-1/cover.html#minitoc)、[MDN-CSS文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS)

两个问题
1. 浮动脱离文档流吗？
2. css中的层叠指的是什么？

在学习过程中，发现CSS的有趣之处，不只是干巴巴的属性，CSS就像是我们的现实世界，每个元素都有自己遵循的规则和完成的使命，各种规则之间的相互作用就是我们使用CSS时遇到的场景。很多看似不合理的现象其实有它存在的道理，因为这种种现象就是被设计为如此而去完成某种使命的。

> 浮动使父元素高度塌陷
> margin相邻外边距重合

下面我们来研究CSS各种有趣的规则

## CSS机制和层叠机制

CSS 机制是一种选择 HTML 元素，然后设定选中元素 CSS 属性的机制。 

层叠机制是 CSS 的基本工作机制，当元素的属性有多种样式值的时候，CSS 就要靠层叠机制来决定最终应用哪种样式。

## 文档流

>  CSS 世界中的一种基本的定位和布局机制，可以理解为现实世界的一套物理规则，“流”跟现实世界的“水流”有异曲同工的表现。 -- 《CSS世界》

文档流这个概念相信大家都很熟悉，那么大家有没思考过为什么称之为文档流而不是文档规则亦或是文档排列。
在我的理解，因为CSS文档排列的规则和现实世界的水流有很多相似之处。
比如块级元素的**流体性**，默认铺满父元素，就如同水流一样会自动铺满容器，如果水量超过容器体积，则会溢出。
而内联元素则如同水流上的木块一样，会在水流上依次排列，不会重合，当排满时换行。

所以，CSS的“流”就是CSS世界中引导元素排序和定位的一套规则。

正是“流”这种特性CSS才能从远古时期脱颖而出，“流”赋予它强大的图文显示能力，也压制了SVG多年。

### 文档流的应用

#### 流体布局

> 流体布局是利用元素的流动性，让元素具有自适应的特性，实现自适应布局。比如div元素，**一般情况**默认的宽度是父元素宽度的100%。

**那么则有几个问题**

- 如果块级元素设置了width: 100%，它还具有流动性吗？
- 设置width: 100%对于块级元素样式表现是否有影响？
- 块级元素默认的宽度是父元素宽度的100%？

答案是如果设置width: 100%，元素流动性则消失，就像设置具体数值的width属性一样，只是宽度计算为父元素宽度的100%，流动性并不是看上去的宽度100%显示这么简单。

[块级元素width:100%](http://demo.cssworld.cn/3/2-3.php)

结论：块级元素默认width是auto，具有流动性。如果元素设置了margin、border、padding属性，有流动性的块级元素具会自动计算content width，盒子的整体宽度不变。如果设置了width属性，流动性消失，content width固定，盒子宽度可能会因为边距边框被撑大。由此可见，**上面的场景**width是作用在content box上的。

所以，*块级元素默认的宽度是父元素宽度的100%* 这种说法是不正确的，只有在没有边距边框的情况才成立。比较合理的描述应该是 *自动铺满父元素*。

## 块级元素

上面大概介绍了块级元素的流动性和width的关系，下面我们了解一下块级元素的一些概念。

**几个有意思的问题**

- 块级元素是display: block的元素吗？
- 块级元素宽度如何作用？
- box-sizing属性存在的意义？
- 为什么没有margin-box？

> 块级元素是源文档中那些被格式化成视觉上的块的元素（例如，段落）。'display'属性的下列值能让一个元素变成块级的：'block'，'list-item'和'table'。块级盒是参与块格式化上下文的盒。每个块级元素生成一个主块级盒（principal block-level box），用来包含后代盒及生成的内容，并且任何定位方案都与该盒有关。有些块级元素可能会生成除主盒外的额外的盒：'list-item'元素。 -- W3C规范

所以根据W3C的规范，块级元素不只是 display: block，还有 table 和 list-item 的元素。

在《CSS世界》里，作者有一个比较有趣的解释：

> 每个元素都有两个盒子，一个是外在盒子，一个内在盒子。外在盒子负责元素是一行显示还是换行显示；内在盒子负责元素的宽高还有内容。内在盒子也称作是容器盒子。

display：inline-block 元素就可以被很好的解释，外盒子是inline级别，内盒子是block级别。类似的，display：block可以被解释为 display: block-block。

因此，块级元素的width或是height可以被形象解释为是作用在内在盒子上面。

> 这里的内在盒子其实是指 content box、padding box、border box 和 margin box。

**块级元素 width 作用细节和 box-sizing**

上面我们知道宽度是作用在内在盒子，但是具体如何作用，其实是由 box-sizing 属性决定，默认值是标准盒子模型 content-box，所以此时宽度是作用在 content 盒子。如果值是border-box，那么宽度计算则是作用在 border 盒子。

以下是box-sizing属性的一些解释：

> box-sizing 属性定义了 user agent 应该如何计算一个元素的总宽度和总高度。-- MDN

> 虽然 box-sizing 被直译为“盒尺寸”，实际上，其更准确的叫法应该是“盒尺寸的作用
细节”，或者说得更通俗一点，叫“width 作用的细节”，也就是说， box-sizing 属性的作用
是改变 width 的作用细节。-- 《css世界》

所以， box-sizing属性是为了改变元素宽高作用细节而存在的。

理论上，box-sizing应该有四个属性值，content-box、padding-box、border-box、margin-box。

**但是为什么不支持margin-box？**

我找到的解释：
1. 没有足够的使用场景。
2. W3C规范明确表示margin的背景永远是透明的。如果支持了margin-box，那么背景色要在margin box中显示吗？

有个case可以模拟margin-box，就是上面的流体布局，不管如何设置边距边框的值，总体宽度不会被撑大。但是有区别，因为不能设置width。

### 块级元素的应用

#### 宽度分离原则

这是《CSS世界》中推荐的一种布局方式，原则是width不能与padding/border（有时候是margin）共存。

我在项目中试用，发现这种布局确实很灵活，在元素定宽的同时不需要去额外计算border、padding值，实现定宽布局。

[宽度分离布局demo](example/布局/宽度分离原则布局.html)