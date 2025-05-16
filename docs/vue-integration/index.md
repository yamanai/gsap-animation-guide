# GSAP与Vue集成

在Vue项目中集成GSAP是一件非常简单的事情，可以充分利用Vue的响应式系统和GSAP强大的动画引擎创建精彩的交互体验。本章将介绍几种在Vue中使用GSAP的方法。

## 安装GSAP

首先，在Vue项目中安装GSAP：

```bash
# npm
npm install gsap

# 或使用yarn
yarn add gsap
```

## 在Vue组件中使用GSAP

### 1. 组合式API (Composition API)

使用Vue 3的组合式API是最推荐的方式：

```vue
<script setup>
import { ref, onMounted, watch } from 'vue'
import gsap from 'gsap'

// 响应式状态
const count = ref(0)
const boxRef = ref(null)

// 监听状态变化触发动画
watch(count, (newValue, oldValue) => {
  // 基于数值变化创建动画
  gsap.to('.counter', {
    duration: 0.5,
    y: -10,
    opacity: 0,
    ease: 'power2.in',
    onComplete: () => {
      gsap.to('.counter', {
        duration: 0.5,
        y: 0,
        opacity: 1,
        ease: 'power2.out'
      })
    }
  })
})

// 在组件挂载后创建动画
onMounted(() => {
  if (boxRef.value) {
    gsap.from(boxRef.value, {
      duration: 1, 
      opacity: 0, 
      y: 50,
      ease: 'elastic.out(1, 0.3)'
    })
  }
})

function animate() {
  count.value++
  
  // 点击时创建更复杂的动画
  if (boxRef.value) {
    gsap.to(boxRef.value, {
      duration: 0.5,
      rotation: '+=360',
      scale: 1.2,
      ease: 'back.out(1.7)',
      onComplete: () => {
        gsap.to(boxRef.value, {
          duration: 0.5,
          scale: 1
        })
      }
    })
  }
}
</script>

<template>
  <div class="demo">
    <div ref="boxRef" class="box" @click="animate">
      <span class="counter">{{ count }}</span>
    </div>
    <p>点击方块增加计数并触发动画</p>
  </div>
</template>
```

### 2. 选项式API (Options API)

如果你使用选项式API，可以这样集成GSAP：

```vue
<template>
  <div class="demo">
    <div ref="box" class="box" @click="animate"></div>
  </div>
</template>

<script>
import gsap from 'gsap'

export default {
  data() {
    return {
      timeline: null
    }
  },
  mounted() {
    // 创建一个复用的时间轴
    this.timeline = gsap.timeline({ paused: true })
      .to(this.$refs.box, { duration: 0.5, x: 100 })
      .to(this.$refs.box, { duration: 0.5, rotation: 360 })
      .to(this.$refs.box, { duration: 0.5, backgroundColor: '#ff6b6b' })
  },
  methods: {
    animate() {
      if (this.timeline) {
        this.timeline.restart()
      }
    }
  }
}
</script>
```

## 结合Vue的响应式属性

Vue的响应式系统与GSAP可以完美结合：

```vue
<script setup>
import { ref, watch } from 'vue'
import gsap from 'gsap'

const progress = ref(0)
const color = ref('#42b883')
const barElement = ref(null)

watch(progress, (newValue) => {
  if (barElement.value) {
    gsap.to(barElement.value, {
      duration: 0.5,
      width: `${newValue}%`,
      backgroundColor: newValue > 80 ? '#ff6b6b' : 
                      newValue > 50 ? '#ffaa33' : 
                      '#42b883'
    })
  }
})

function updateProgress(value) {
  progress.value = value
}
</script>

<template>
  <div class="progress-container">
    <div ref="barElement" class="progress-bar"></div>
    <div class="controls">
      <button @click="updateProgress(25)">25%</button>
      <button @click="updateProgress(50)">50%</button>
      <button @click="updateProgress(75)">75%</button>
      <button @click="updateProgress(100)">100%</button>
    </div>
  </div>
</template>
```

## 创建可复用的动画组件

在Vue中，我们可以创建封装了GSAP动画逻辑的可复用组件：

```vue
<!-- AnimatedBox.vue -->
<script setup>
import { ref, onMounted, defineProps, defineEmits } from 'vue'
import gsap from 'gsap'

const props = defineProps({
  duration: {
    type: Number,
    default: 1
  },
  ease: {
    type: String,
    default: 'power2.out'
  }
})

const emit = defineEmits(['animation-complete'])
const boxRef = ref(null)

onMounted(() => {
  animate()
})

function animate() {
  if (boxRef.value) {
    gsap.from(boxRef.value, {
      duration: props.duration,
      opacity: 0,
      y: 50,
      ease: props.ease,
      onComplete: () => emit('animation-complete')
    })
  }
}
</script>

<template>
  <div ref="boxRef" class="animated-box">
    <slot></slot>
  </div>
</template>
```

然后在其他组件中使用：

```vue
<template>
  <div>
    <AnimatedBox :duration="1.5" ease="elastic.out(1, 0.3)" @animation-complete="handleComplete">
      <h2>欢迎使用GSAP!</h2>
      <p>这个内容会以弹性动画进入</p>
    </AnimatedBox>
  </div>
</template>
```

在接下来的章节中，我们将探讨在Vue中使用GSAP的高级技巧，包括与Vue过渡系统的结合使用、动画钩子等。 