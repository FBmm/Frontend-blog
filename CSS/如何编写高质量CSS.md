# 如何编写高质量CSS

## 概述

> 很多前端同行在潜意识里都觉得 js 比 css 更加重要，所以平时都不是很注重 css 编写的质量。然而，虽然页面的交互能力很大程度取决于 js，但是 css 代码的质量却直接决定了页面的美观程度。所以，css 编写地好与坏，直接决定了用户使用产品的第一印象。因此，编写高质量的 css 代码，是一个优秀前端必须掌握的技能。

相比js或者其他编程语言，css 无疑是简单的，因为 css 鲜有逻辑，无须算法，只是规范。何为规范，规范是被大家认可和遵循的标准。对于 css，规范就是所有 css 属性和特性的集合。在 css 的世界里，页面上的任何看似简单的呈现都是由许许多多属性共同作用的结果。

但是这个世上，越是简单的东西却是越难深入，就好比1+1为何等于2？

所以，要完全深入理解 css 很难，因此我们需要基于现有的 css 制定符合团队的规则和规范，由大家一起编写维护，一起遵循推广。让我们产出的页面更美观，风格较统一，保证 css 代码的可读性、可维护性、扩展性以及复用性。同时让页面得到用户、产品以及老板的认可，体现团队的优势和能力。

### 为什么要编写高质量的CSS

- 超高质量还原设计稿（专业性）。
- 便于阅读和维护（可读性和维护性）。
- 可扩展和样式复用（扩展性和复用性）。

### 预期效果

- 开发的页面得到用户、产品、老板的认可。
- 让其他人阅读和维护 css 代码时，很容易看得懂，甚至是惊叹 css 可以如此写，而不是吐槽。
- 抽离项目和组件相同的 css 样式。如此，在修改和扩展样式时只需修改公共 css 代码，就可以保证样式统一。

## 编写原则

- 编写尽量遵循团队规范，保持团队整体风格，避免强个人主义。
- 使用较合理、较主流的 css 属性。
- 编写时，尽量使用较少的 css 属性，避免重复写已继承的属性、删掉无效属性和多余属性。
- 计算交给浏览器去做，保持布局的自适应性和健壮性。
- 必须考虑 css 属性的兼容性与产品支持浏览器的版本。
- 避免使用耗性能的属性。
- 如果 css 可以做到，就不要使用 js。

## 最佳实践

### 命名

#### BEM

BEM 命名是目前推荐的比较主流的命名规范。

格式：**`block__element--modifier`**

优势：

- 高可用的，强大的，而且简单的命名规范。
- 使前端代码更加易读和理解，容易与他人协作，容易扩展，更加强壮和明确，关键是更加严谨。
- 组件之间的完全解耦，不会造成命名空间的污染。
- 不需要过多考虑class如何起名。

虽然 `BEM` 命名会使得 class 类名变长，但经过 `GZIP` 等压缩后，文件的体积其实并无太大影响。

规则：

- 开发中则推荐按照 **`[命名空间]-[组件名/块]__[元素名/元素]--[修饰符]`**的格式命名。
- **block**
  - 块名需能清晰的表达出，其用途、功能或意义，具有唯一性。
  - 每个块在逻辑上和功能上都相互独立。
  - 由于块是独立的，可以在应用开发中进行复用，从而降低代码重复并提高开发效率。
  - 块可以放置在页面上的任何位置，也可以互相嵌套。

- **element**
  - 元素名需能简单的描述出，其结构、布局或意义，并且在语义上与块相关联。
  - 不能与块分开单独使用。
  - 块的内部元素，都被认为是块的子元素。
  - 一个块中元素的类名必须用父级块的名称作为前缀，因此不能写成：`block__elem1__elem2`。

- **modifier**
  - 修饰符需能直观易懂表达出，其外观、状态或行为。
  - 参考值：disabled、active、selected、checked、highlight、fixed、size-big、size-small、color-yellow、bg-blue等等。
  - 在必要时可进行扩展，书写成：`block__elem_modifier_modifier`，第一个`modifier`表示其命名空间。

注意：

- BEM 命名原则上嵌套不会超过两层。

示例：

demo

```html
<!-- good -->
<!-- dark 表明 search 组件的外观 -->
<form class="main-search main-search-form--dark">
    <input class="main-search__input">
    <!-- disabled 表明 search__button 的状态 -->
    <button class="main-search__button main-search__button--disabled">Search</button>
</form>
```

语义不符

```css
/* bad */
.app__content--left .color-gray {}

/* good */
.app-content__left--color-gray {}
```

### 布局

推荐使用 `flex` 布局，斟酌使用 `grid` 布局（需要考虑兼容性），避免使用 `float + position` 布局。

#### 左定宽，右自适应两栏布局

示例：

flex 实现

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>左定宽，右自适应两栏布局 - flex</title>
    <style>
        .two-cols-layout {
            display: flex;
        }
        .two-cols-layout__left {
            width: 300px;
            height: 600px;
            background: #D24D57;
        }
        .two-cols-layout__right {
            flex: 1;
            height: 600px;
            background: #2C3E50;
        }
    </style>
</head>
<body>
    <div class="two-cols-layout">
        <div class="two-cols-layout__left"></div>
        <div class="two-cols-layout__right"></div>
    </div>
</body>
</html>
```

grid 实现

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>左定宽，右自适应两栏布局 - grid</title>
    <style>
        .two-cols-layout {
            display: grid;
            grid-template-columns: 300px auto;
            grid-template-rows: 600px;
        }
        .two-cols-layout__left {
            background-color: #D24D57;
        }
        .two-cols-layout__right {
            background-color: #2C3E50;
        }
    </style>
</head>
<body>
    <div class="two-cols-layout">
        <div class="two-cols-layout__left"></div>
        <div class="two-cols-layout__right"></div>
    </div>
</body>
</html>
```

#### 三栏两列自适应布局

示例：

flex 实现

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>三栏两列自适应 - flex</title>
    <style>
        .three-cols-layout {
            display: flex;
        }
        .three-cols-layout__left {
            flex: 1;
            height: 300px;
            background: #D0D0D0;
        }
        .three-cols-layout__middle {
            flex: 1.5;
            height: 300px;
            background: #D24D57;
        }
        .three-cols-layout__right {
            flex: 2;
            height: 300px;
            background: #2C3E50;
        }
        .mt {
            margin-top: 8px;
        }
    </style>
</head>
<body>
    <div class="three-cols-layout">
        <div class="three-cols-layout__left"></div>
        <div class="three-cols-layout__middle"></div>
        <div class="three-cols-layout__right"></div>
    </div>
    <div class="three-cols-layout mt">
        <div class="three-cols-layout__left"></div>
        <div class="three-cols-layout__middle"></div>
        <div class="three-cols-layout__right"></div>
    </div>
</body>
</html>
```

grid 实现

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>三栏两列自适应 - grid</title>
    <style>
        .three-cols-layout {
            display: grid;
            grid-template-columns: 1fr 1.5fr 2fr; /* 三栏宽度 */
            grid-template-rows: 300px 300px; /* 两列高度 */
            grid-gap: 8px 0; /* 间隔 */
        }
        .three-cols-layout__item--bg-gray {
            background-color: #D0D0D0;
        }
        .three-cols-layout__item--bg-red {
            background-color: #D24D57;
        }
        .three-cols-layout__item--bg-black {
            background-color: #2C3E50;
        }
    </style>
</head>
<body>
    <div class="three-cols-layout">
        <div class="three-cols-layout__item--bg-gray"></div>
        <div class="three-cols-layout__item--bg-red"></div>
        <div class="three-cols-layout__item--bg-black"></div>
        <div class="three-cols-layout__item--bg-gray"></div>
        <div class="three-cols-layout__item--bg-red"></div>
        <div class="three-cols-layout__item--bg-black"></div>
    </div>
</body>
</html>
```

### 宽度

#### 宽度分离原则

引自《css世界》，若有疑问，请阅之。

所谓 `宽度分离原则` ，就是 css 中的 width 属性不与影响宽度的 padding/border（有时候包括 margin）属性共存，也就是不能出现以下的组合：

`.box { width: 100px; border: 1px solid; }`  或者 `.box { width: 100px; padding: 20px; }  `

推荐写法：

```css
.father {
	width: 180px;
}
.son {
    margin: 0 20px;
    padding: 20px;
    border: 1px solid;
}
```

挑战宽度分离的写法：

如此，以 css box-sizing 属性节约一个html元素，但是在 margin 的场景有局限，因为 `box-sizing: border-box` 的作用不计算 margin。 

```css
.father {
	box-sizing: border-box; /* 通过 box-sizing 改变 width 作用的细节 */
	width: 180px;
	margin: 0 20px;
    padding: 20px;
    border: 1px solid;
}
```

### 垂直居中

#### 文字图标垂直居中

good - 使用 vertical-align 属性

优点是文字或图标的 font-size 发生变化后，依然是垂直居中的。

```html
<!-- good -->
<style>
.middle {
    vertical-align: middle;
}
</style>
<div>
    <span class="middle">上传图标</span>
    <i class="el-icon-upload middle"></i>
</div>
```

bad - 使用绝对定位 计算 top

如此，当行高变化或图标的 font-size 发生变化后，则需要重新计算和修改 top，这种计算应该由浏览器完成，保证布局的健壮性。

```html
<!-- bad -->
<style>
.el-icon-upload {
	position: absolute;
    top: 4px;
}
</style>
<div>
    <span>上传图标</span>
    <i class="el-icon-upload"></i>
</div>
```

## 典型错误

### 块级元素设置 width: 100%

​	项目很多 el-table 都会设置自定义样式 width: 100%，官方文档 demo 也这么写，但却是多余的。

### 滥用 important

​	当属性优先级不够时，可以考虑通过其他方式提高优先级，而不是无脑设置 `!important`，这样会导致样式很难维护。

### 滥用 calc

​	当 width 与 padding 等属性同时存在时，为了精确控制盒子宽度，会出现类似 `width: calc(300px - 15px)` 的写法。这种问题可以通过 `宽度分离原则` 或者 `box-sizing: border-box ` 属性避免。

### overflow-x: hidde 和 overflow-y: auto 同时存在

​	当 overflow-x: hidde 时， overflow-y 默认为 auto，则 overflow-y: auto 可以省略。

### 使用 scss 嵌套的层级很深

如果出现嵌套层级很深的情况，可以考虑布局能否优化，命名是否规范或者能否改成 BEM 命名。

```scss
/* bad */
.box {
    .left {
        .top {} 
    }
    .right {
       .nav {}
       .content {
           .header {}
           .middle {}
           .footer {}
       } 
	} 
}
```

```scss
/* good */
.box-left__top {}
.box-right__nav {}
.box-right-content__header {}
.box-right-content__middle {}
.box-right-content__footer {}
```



## 参考

### 网站

[层叠样式表2级修订版1（CSS 2.1）规范的中文翻译](http://www.ayqy.net/doc/css2-1/cover.html#minitoc)

[MDN - CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS)

[W3C官网](https://developer.mozilla.org/zh-CN/docs/Web/CSS)

### 书籍

《CSS世界》 - 张鑫旭

