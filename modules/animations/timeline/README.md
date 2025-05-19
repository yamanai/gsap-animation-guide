# GSAP 时间轴动画组件

本目录包含 GSAP 时间轴章节使用的动画组件模块。

## 目录结构

- `basic-timeline.vue` - 基础时间轴演示
- `timeline-control.vue` - 时间轴控制演示
- `timeline-position.vue` - 时间轴位置控制演示
- `nested-timeline.vue` - 嵌套时间轴演示
- `timeline-params.vue` - 时间轴参数演示
- `index.js` - 导出所有时间轴动画组件的索引文件

## 使用方法

这些动画组件可以在Markdown文件中通过Vue的组件系统引入使用：

```vue
<script setup>
// 根据您的文件位置，使用相对路径引入
// 例如，从 docs/basics/timeline.md 引入
import { BasicTimeline, TimelineControl, NestedTimeline } from '../../modules/animations/timeline';
</script>

## 基础时间轴演示
<BasicTimeline />

## 时间轴控制演示
<TimelineControl />

## 嵌套时间轴演示
<NestedTimeline />
```

## 添加新组件

要添加新的动画示例组件：

1. 在当前目录下创建新的 `.vue` 文件
2. 使用 GsapEditor 组件作为基础模板
3. 在 `index.js` 中导出新组件
4. 在 Markdown 文件中引入并使用

## 设计规范

根据项目规范，所有动画示例需要遵循以下原则：

1. 动画元素尺寸设计要适中：确保元素完全在预览区域内显示，同时不能过小，动画效果应当清晰可见（建议元素宽度不小于100px，确保移动距离足够明显）
2. 使用合适的阴影和颜色对比，提升视觉效果
3. 提供控制按钮，便于用户重放动画
4. 添加合适的注释，解释关键代码段的作用
5. 避免在模板代码中使用空行，以防止解析错误 