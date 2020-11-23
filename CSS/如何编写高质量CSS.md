# 如何编写高质量CSS

## 概述

> 很多前端同行在潜意识里都觉得js比css更加重要，所以平时都不是很注重css编写的质量。然而，虽然页面的交互能力很大程度取决于js，但是css代码的质量却直接决定了页面的美观程度。所以，css编写地好与坏，直接决定了用户使用产品的第一印象。因此，编写高质量的css代码，是一个优秀前端必须掌握的技能。

相比js或者其他编程语言，css无疑是简单的，因为css鲜有逻辑，无须算法，只是规范。何为规范，规范是被大家认可和遵循的标准。对于css，规范就是所有css属性和特性的集合。在css的世界里，页面上的任何看似简单的呈现都是由许许多多css属性共同作用的结果。

但是这个世上，越是简单的东西却是却越难深入，就好比1+1为何等于2？

所以，要完全深入理解css很难，因此我们需要基于现有的css制定符合团队的规则和规范，由大家一起编写维护，一起遵循推广。让我们开发的页面更专业，保证css代码的可读性、可维护性、扩展性以及复用性，同时让大家开发的页面得到用户、团队其他成员甚至是老板的认可，体现团队的优势和能力。

### 为什么要编写高质量的CSS

- 超高质量还原设计稿（专业性）
- 便于阅读和维护（可读性和维护性）
- 可扩展和样式复用（扩展性和复用性）

### 预期效果

- 开发的页面得到用户、产品、老板的认可
- 让团队其他人阅读和维护css代码时，很容易看得懂，甚至是惊叹css可以如此写，而不是吐槽
- 抽离项目和组件相同的css样式，如此，在修改和扩展样式时只需修改公共css代码就可以保持样式统一

## 编写原则

- 编写尽量遵循团队规范，保持团队整体风格，避免强个人主义
- 使用较合理、较主流的css属性
- 编写时，尽量使用较少的css属性，避免重复写已继承的属性、删掉无效属性和多余属性
- 计算交给浏览器去做，保持布局的自适应性
- 必须考虑css属性的兼容性与产品支持浏览器的版本

## 最佳实践

### 命名

#### BEM

格式：**`block__element--modifier`**

推荐使用现在主流的BEM命名规范，它的优势是：

- 高可用的，强大的，而且简单的命名规范
- 使前端代码更加易读和理解，容易与他人协作，容易扩展，更加强壮和明确，关键是更加严谨
- 组件之间的完全解耦，不会造成命名空间的污染
- 不需要过多考虑class如何起名

虽然 `BEM` 命名会使得 Class 类名变长，但经过 `GZIP` 等压缩后，文件的体积其实并无太大影响。

规则：

- 开发中则推荐按照 **`[命名空间]-[组件名/块]__[元素名/元素]--[修饰符]`**的格式命名。
- **block**
  - 块名需能清晰的表达出，其用途、功能或意义，具有唯一性。
  - 每个块在逻辑上和功能上都相互独立。、
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

示例：

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

flex实现

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

grid实现

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

flex实现

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

grid实现

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>三栏两列自适应 - grid</title>
    <style>
        .three-layout {
            display: grid;
            grid-template-columns: 1fr 1.5fr 2fr; /* 三栏宽度 */
            grid-template-rows: 300px 300px; /* 两列高度 */
            grid-gap: 8px 0; /* 间隔 */
        }
        .three-layout__item--bg-gray {
            background-color: #D0D0D0;
        }
        .three-layout__item--bg-red {
            background-color: #D24D57;
        }
        .three-layout__item--bg-black {
            background-color: #2C3E50;
        }
    </style>
</head>
<body>
    <div class="three-layout">
        <div class="three-layout__item--bg-gray"></div>
        <div class="three-layout__item--bg-red"></div>
        <div class="three-layout__item--bg-black"></div>
        <div class="three-layout__item--bg-gray"></div>
        <div class="three-layout__item--bg-red"></div>
        <div class="three-layout__item--bg-black"></div>
    </div>
</body>
</html>
```

## 典型错误

## 参考

