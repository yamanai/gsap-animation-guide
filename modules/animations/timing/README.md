# GSAP 时间控制动画组件

本目录包含 GSAP 时间控制章节使用的动画组件模块。

## 目录结构

  - `basic-parameters.vue` - 基础时间参数演示
  - `animation-control.vue` - 动画状态控制演示
  - `stagger.vue` - 交错动画示例
  - `relative-position.vue` - 时间轴相对位置标记演示
  - `timeline-labels.vue` - 时间轴标签系统演示
  - `callbacks.vue` - 回调函数演示
  - `index.js` - 导出所有动画组件的索引文件

## 使用方法

这些动画组件可以在Markdown文件中通过Vue的组件系统引入使用：

```vue
<script setup>
// 根据您的文件位置，使用相对路径引入
// 例如，从 docs/basics/timing.md 引入
import { BasicParameters, AnimationControl } from '../../modules/animations/timing';
</script>

## 基础时间参数演示
<BasicParameters />

## 动画控制示例
<AnimationControl />
```

## 添加新组件

要添加新的动画示例组件：

1. 在当前目录下创建新的 `.vue` 文件
2. 使用 GsapEditor 组件作为基础模板
3. 在 `index.js` 中导出新组件
4. 在 Markdown 文件中引入并使用