# GSAP 缓动函数动画组件

本目录包含 GSAP 缓动函数章节使用的动画组件模块。

## 目录结构

- `basic-easing.vue` - 基本缓动函数对比演示
- `easing-families.vue` - 缓动函数家族对比演示
- `custom-easing.vue` - 自定义缓动函数演示
- `index.js` - 导出所有缓动函数动画组件的索引文件

## 使用方法

这些动画组件可以在Markdown文件中通过Vue的组件系统引入使用：

```vue
<script setup>
// 根据您的文件位置，使用相对路径引入
// 例如，从 docs/basics/easing.md 引入
import { BasicEasing, EasingFamilies, CustomEasing } from '../../modules/animations/easing';
</script>

## 基本缓动函数演示
<BasicEasing />

## 缓动函数家族对比
<EasingFamilies />

## 自定义缓动函数
<CustomEasing />
```

## 添加新组件

要添加新的动画示例组件：

1. 在当前目录下创建新的 `.vue` 文件
2. 使用 GsapEditor 组件作为基础模板
3. 在 `index.js` 中导出新组件
4. 在 Markdown 文件中引入并使用 