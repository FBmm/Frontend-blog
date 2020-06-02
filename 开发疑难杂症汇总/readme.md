# 开发疑难杂症汇总

## js部分

### 浏览器缩放后，滚动到容器底部距离判断误差

问题场景：vue项目无限滚动组件中，浏览器缩放后，滚动条滚动到容器底部无法触发更新函数

判断滚动到容器底部距离的算法：`[scrollHeight] - [scrollTop] - [clientHeight]`

scrollHeight：这个只读属性是一个元素内容高度的度量，包括由于溢出导致的视图中不可见内容。
> scrollHeight：滚动条到容器顶部的距离
> scrollHeight：滚动条到容器顶部的距离