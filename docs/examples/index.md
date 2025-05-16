# GSAP + Vue 示例集

这个页面收集了一些使用GSAP和Vue结合的实用示例，帮助你快速理解如何在实际项目中应用这些技术。

## 基础动画示例

<GsapDemo 
  title="基础动画示例" 
  description="简单的GSAP动画，展示基本的动画属性和时间轴功能"
/>

## 动画原理

GSAP动画的核心原理是通过JavaScript在每一帧计算并更新元素的属性值，以创建平滑的动画效果。与CSS动画相比，GSAP提供了更精细的控制和更丰富的功能。

## 示例代码

以下是一个简单的Vue + GSAP的代码示例，展示了如何创建一个可复用的动画组件：

```vue
<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const props = defineProps({
  startVisible: {
    type: Boolean,
    default: false
  },
  duration: {
    type: Number,
    default: 1
  }
})

const boxRef = ref(null)
const isVisible = ref(props.startVisible)

onMounted(() => {
  // 初始化元素状态
  gsap.set(boxRef.value, {
    autoAlpha: isVisible.value ? 1 : 0,
    y: isVisible.value ? 0 : 20
  })
})

function show() {
  isVisible.value = true
  animateIn()
}

function hide() {
  isVisible.value = false
  animateOut()
}

function animateIn() {
  gsap.to(boxRef.value, {
    duration: props.duration,
    autoAlpha: 1,
    y: 0,
    ease: 'power2.out'
  })
}

function animateOut() {
  gsap.to(boxRef.value, {
    duration: props.duration,
    autoAlpha: 0,
    y: 20,
    ease: 'power2.in'
  })
}
</script>

<template>
  <div>
    <div ref="boxRef" class="animated-box">
      <slot></slot>
    </div>
    <div class="controls">
      <button @click="show">显示</button>
      <button @click="hide">隐藏</button>
    </div>
  </div>
</template>

<style scoped>
.animated-box {
  padding: 20px;
  background-color: #f1f1f1;
  border-radius: 8px;
  margin-bottom: 10px;
}

.controls {
  display: flex;
  gap: 10px;
}

button {
  padding: 8px 16px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #33a06f;
}
</style>
```

## 实际应用场景

GSAP和Vue的结合可以应用于各种实际场景：

1. **页面过渡效果**：在路由切换时添加平滑的过渡动画
2. **UI反馈**：为用户交互提供动画反馈，如按钮点击、表单提交等
3. **数据可视化**：创建动态的图表和数据展示
4. **微交互**：增强用户体验的小型动画效果
5. **引导流程**：为用户引导和教程添加动画效果

## ScrollTrigger示例

使用GSAP的ScrollTrigger插件，我们可以创建与滚动相关的动画：

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

// 注册插件
gsap.registerPlugin(ScrollTrigger)

const containerRef = ref(null)
let scrollTriggers = []

onMounted(() => {
  // 创建滚动触发的动画
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: containerRef.value,
      start: "top center",
      end: "bottom center",
      scrub: true,
      markers: true // 开发时可见，生产环境中移除
    }
  })
  
  tl.from(".item", {
    opacity: 0,
    y: 100,
    stagger: 0.2,
    duration: 1
  })
  
  // 保存引用以便清理
  scrollTriggers.push(ScrollTrigger.getAll())
})

onUnmounted(() => {
  // 清理所有ScrollTrigger实例
  scrollTriggers.forEach(trigger => trigger.kill())
})
</script>

<template>
  <div ref="containerRef" class="scroll-container">
    <div v-for="n in 5" :key="n" class="item">
      滚动触发的项目 {{ n }}
    </div>
  </div>
</template>
```

在接下来的示例中，我们将展示更多复杂的动画效果和实际应用案例。 