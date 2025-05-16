# GSAP + Vue 最佳实践

在结合GSAP和Vue开发项目时，遵循一些最佳实践可以让你的代码更加高效、可维护，同时提供最佳的用户体验。

## 性能优化原则

<div class="tip custom-block">
  <p class="custom-block-title">性能提示</p>
  <p>动画性能对用户体验至关重要。即使是微小的性能问题也会导致动画卡顿。</p>
</div>

### 1. 使用transform和opacity属性

GSAP默认会尽量使用CSS transform和opacity进行动画，这些属性不会触发浏览器的重排(reflow)，仅触发重绘(repaint)，性能更好：

```js
// 推荐
gsap.to('.element', { x: 100, rotation: 45, opacity: 0.5 });

// 避免（除非必要）
gsap.to('.element', { left: 100, backgroundColor: '#ff0000' });
```

### 2. 避免同时动画过多元素

当需要同时为大量元素（上百个）制作动画时，可能会导致性能问题。解决方案包括：

- 使用stagger效果而不是同时启动所有动画
- 考虑使用CSS变量动画单个属性，让多个元素继承
- 对于列表，考虑仅为可见元素应用动画

```js
// 更高效的大量元素动画
gsap.to('.items', { 
  opacity: 1, 
  y: 0,
  stagger: 0.05, // 每个元素间隔50ms开始
  ease: 'power1.out'
});
```

### 3. 谨慎使用复杂的SVG动画

SVG动画很强大，但大量的路径或过于复杂的形状可能导致性能问题。优化方法：

- 简化SVG路径
- 使用DrawSVG插件而不是手动操作路径长度
- 对非活跃的SVG动画使用`will-change`属性

## Vue集成优化

### 1. 正确管理GSAP实例

在Vue组件中使用GSAP时，确保正确管理动画实例的生命周期：

```vue
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'

const animations = ref([])

onMounted(() => {
  // 创建动画并保存引用
  const anim1 = gsap.to('.element', { x: 100, paused: true })
  animations.value.push(anim1)
})

onBeforeUnmount(() => {
  // 组件销毁前清理动画
  animations.value.forEach(anim => anim.kill())
  animations.value = []
})
</script>
```

### 2. 利用Vue的响应式系统

结合Vue的响应性与GSAP可以创建高度动态的动画：

```vue
<script setup>
import { ref, watch } from 'vue'
import gsap from 'gsap'

const count = ref(0)
const barElement = ref(null)

watch(count, (newValue) => {
  // 每当count改变时，自动触发动画
  if (barElement.value) {
    gsap.to(barElement.value, {
      width: `${newValue}%`,
      backgroundColor: newValue > 80 ? '#ff0000' : '#00ff00',
      duration: 0.5
    })
  }
})
</script>
```

### 3. 使用自定义钩子

为常用的动画模式创建自定义组合式函数（composables）：

```js
// useGsapAnimation.js
import { ref, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'

export function useGsapAnimation(options = {}) {
  const target = ref(null)
  const timeline = ref(null)
  
  onMounted(() => {
    if (target.value) {
      timeline.value = gsap.timeline({
        paused: options.paused !== false,
        ...options.timelineOptions
      })
      
      if (options.animation) {
        options.animation(timeline.value, target.value)
      }
    }
  })
  
  onBeforeUnmount(() => {
    if (timeline.value) {
      timeline.value.kill()
    }
  })
  
  return {
    target,
    timeline,
    play: () => timeline.value?.play(),
    pause: () => timeline.value?.pause(),
    restart: () => timeline.value?.restart()
  }
}
```

使用自定义钩子：

```vue
<script setup>
import { useGsapAnimation } from './useGsapAnimation'

const { target, play, pause } = useGsapAnimation({
  animation: (tl, el) => {
    tl.to(el, { x: 100 })
      .to(el, { rotation: 360 })
  }
})
</script>

<template>
  <div ref="target" class="animation-target"></div>
  <button @click="play">播放</button>
  <button @click="pause">暂停</button>
</template>
```

## 设计原则

### 1. 保持一致性

为提供专业的用户体验，在整个应用中保持动画风格的一致性：

- 为类似的界面元素使用类似的动画
- 为不同的交互类型创建标准化的动画预设
- 建立动画配置系统，便于全局调整

### 2. 动画应该有目的

每个动画都应该服务于特定的用户体验目标：

- 用于指导用户注意力
- 提供反馈和状态变化的视觉提示
- 创建空间关系和上下文转换
- 减少感知等待时间

### 3. 尊重用户偏好

记住，并非所有用户都喜欢动画：

```vue
<script setup>
import { ref, onMounted } from 'vue'

const prefersReducedMotion = ref(false)

onMounted(() => {
  // 检测用户是否偏好减少动画
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  prefersReducedMotion.value = mediaQuery.matches
  
  // 监听设置变化
  mediaQuery.addEventListener('change', (e) => {
    prefersReducedMotion.value = e.matches
  })
})
</script>
```

在以下章节中，我们将更详细地探讨这些最佳实践，提供更多代码示例和实际应用场景。 