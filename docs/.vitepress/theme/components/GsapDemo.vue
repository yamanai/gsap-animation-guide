<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const props = defineProps({
  title: {
    type: String,
    default: '动画演示'
  },
  description: {
    type: String,
    default: ''
  }
})

const boxRef = ref(null)
const animationState = ref('未开始')
const timeline = ref(null)

onMounted(() => {
  if (boxRef.value) {
    // 创建GSAP时间轴
    timeline.value = gsap.timeline({ paused: true })
      .to(boxRef.value, { 
        duration: 1, 
        x: 200, 
        ease: 'power2.inOut',
        onStart: () => animationState.value = '运行中',
        onComplete: () => animationState.value = '已完成'
      })
      .to(boxRef.value, { 
        duration: 0.5, 
        rotation: 360, 
        scale: 1.2,
        ease: 'back.out(1.7)'
      })
      .to(boxRef.value, { 
        duration: 0.5, 
        backgroundColor: '#ff6b6b',
        borderRadius: '50%'
      })
  }
})

function playAnimation() {
  if (timeline.value) {
    timeline.value.restart()
  }
}

function resetAnimation() {
  if (timeline.value) {
    timeline.value.kill()
    
    // 重置元素状态
    gsap.set(boxRef.value, {
      x: 0,
      rotation: 0,
      scale: 1,
      backgroundColor: '#646cff',
      borderRadius: '0%'
    })
    
    // 重新创建时间轴
    timeline.value = gsap.timeline({ paused: true })
      .to(boxRef.value, { 
        duration: 1, 
        x: 200, 
        ease: 'power2.inOut',
        onStart: () => animationState.value = '运行中',
        onComplete: () => animationState.value = '已完成'
      })
      .to(boxRef.value, { 
        duration: 0.5, 
        rotation: 360, 
        scale: 1.2,
        ease: 'back.out(1.7)'
      })
      .to(boxRef.value, { 
        duration: 0.5, 
        backgroundColor: '#ff6b6b',
        borderRadius: '50%'
      })
      
    animationState.value = '已重置'
  }
}
</script>

<template>
  <div class="gsap-demo">
    <h3 v-if="title">{{ title }}</h3>
    <p v-if="description">{{ description }}</p>
    
    <div class="demo-container">
      <div ref="boxRef" class="box"></div>
    </div>
    
    <div class="controls">
      <button @click="playAnimation" class="btn play">播放动画</button>
      <button @click="resetAnimation" class="btn reset">重置</button>
      <span class="status">状态: {{ animationState }}</span>
    </div>
  </div>
</template>

<style scoped>
.gsap-demo {
  margin: 2rem 0;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-soft);
}

.demo-container {
  height: 200px;
  position: relative;
  margin: 1.5rem 0;
  overflow: hidden;
  background-color: var(--vp-c-bg);
  border-radius: 6px;
}

.box {
  width: 60px;
  height: 60px;
  background-color: #646cff;
  position: absolute;
  top: 70px;
  left: 20px;
}

.controls {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.play {
  background-color: #646cff;
  color: white;
}

.play:hover {
  background-color: #747bff;
}

.reset {
  background-color: #f1f1f1;
  color: #333;
}

.reset:hover {
  background-color: #e1e1e1;
}

.status {
  margin-left: auto;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}
</style> 