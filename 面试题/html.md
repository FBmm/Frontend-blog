# html 部分面试题

## 盒模型

- 盒模型是 css 中的概念
    盒子的宽高 = 内容宽高 + padding 宽高 + border 宽高 + margin 宽高
- 四个区域：content（内容）、padding（内边距）、border（边框）、margin（外边距）
- 盒模型分标准盒模型、IE盒模型（总宽高计算是一样的）
    1. 标准盒模型（w3c盒子）：内容宽高是 content 宽高，不包含其他部分，盒子会被撑大。
    2. IE盒模型：内容宽高是 content + padding + border 宽高，设置的宽高是页面实际的宽高，会挤压内容宽高。
- css3 设置两种模型
    1. box-sizing: content-box; // 标准盒模型
    2. box-sizing: border-box; // IE盒模型
- js 获取宽高
    1. dom.style.width/height 只能获取内联样式的宽高（style标签或者css文件定义获取不到）
    2. dom.offsetWidth/offsetHeight 推荐使用、兼容性最好
- 边距重叠 未完待续
- BFC (Block Formatting Context) 块级格式化上下文 未完待续
