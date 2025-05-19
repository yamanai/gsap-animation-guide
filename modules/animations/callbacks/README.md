# GSAP回调函数组件

本目录包含与GSAP回调函数和事件系统相关的动画示例组件。这些组件用于演示如何在动画的不同阶段执行代码，以及如何使用各种回调功能来创建复杂的交互体验。

## 组件列表

1. **basic-callbacks.vue** - 演示基础回调函数（onStart、onUpdate、onComplete）的使用
2. **callback-params.vue** - 展示如何向回调函数传递自定义参数
3. **callback-scope.vue** - 演示回调函数中`this`的作用和使用方法
4. **event-listeners.vue** - 展示如何使用GSAP的事件监听器系统

## 使用方法

你可以在Markdown文档中通过以下方式导入和使用这些组件：

```vue
<script setup>
import { BasicCallbacks } from '../../modules/animations/callbacks';
</script>

<BasicCallbacks />
```

也可以单独导入特定组件：

```vue
<script setup>
import BasicCallbacks from '../../modules/animations/callbacks/basic-callbacks.vue';
</script>

<BasicCallbacks />
```

## 组件设计原则

每个回调函数组件都遵循以下设计原则：

1. **可视化演示** - 提供直观的动画效果
2. **代码交互** - 允许用户修改和实验代码
3. **日志输出** - 显示回调函数的触发时机和相关信息
4. **控制界面** - 提供播放、重置等控制按钮

## 扩展方向

未来可以考虑添加以下组件：

- 连锁动画回调示例
- 回调与时间轴结合示例
- 高级事件监听器用例
- 特殊场景下的回调应用 