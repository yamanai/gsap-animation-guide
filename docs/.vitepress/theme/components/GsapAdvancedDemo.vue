<script setup>
import { ref, onMounted, watch } from 'vue'
import gsap from 'gsap'

const props = defineProps({
  title: {
    type: String,
    default: '高级动画演示'
  },
  description: {
    type: String,
    default: ''
  },
  initialDelay: {
    type: Number,
    default: 0
  },
  defaultDuration: {
    type: Number,
    default: 1
  }
})

const containerRef = ref(null)
const boxRef = ref(null)
const controlsRef = ref(null)

const animationState = ref('未开始')
const timeline = ref(null)
const progress = ref(0)
const duration = ref(props.defaultDuration)
const ease = ref('power2.inOut')
const showCode = ref(false)
const activeTab = ref('timeline')

// 播放时间线的当前进度
const playheadPosition = ref(0)

// 动画属性
const animProps = ref({
  x: 200,
  y: 0,
  rotation: 360,
  scale: 1.2,
  backgroundColor: '#ff6b6b',
  borderRadius: 50
})

const easeOptions = [
  { label: '线性', value: 'none' },
  { label: '渐入', value: 'power1.in' },
  { label: '渐出', value: 'power1.out' },
  { label: '渐入渐出', value: 'power1.inOut' },
  { label: '强力渐入渐出', value: 'power2.inOut' },
  { label: '弹性', value: 'elastic.out(1, 0.3)' },
  { label: '弹跳', value: 'bounce.out' },
  { label: '回弹', value: 'back.out(1.7)' },
]

// 监听属性变化，重新创建时间轴
watch([duration, ease, animProps], () => {
  resetAnimation()
}, { deep: true })

onMounted(() => {
  if (boxRef.value) {
    createTimeline()
    
    // 添加进度拖动控制
    const progressSlider = controlsRef.value.querySelector('.timeline-slider')
    if (progressSlider) {
      progressSlider.addEventListener('input', (e) => {
        if (timeline.value) {
          const newProgress = e.target.value / 100
          timeline.value.progress(newProgress)
          playheadPosition.value = newProgress
        }
      })
    }
    
    // 如果设置了初始延迟，则延迟播放动画
    if (props.initialDelay > 0) {
      setTimeout(() => {
        playAnimation()
      }, props.initialDelay * 1000)
    }
  }
})

function createTimeline() {
  if (boxRef.value) {
    // 创建GSAP时间轴
    timeline.value = gsap.timeline({ 
      paused: true,
      onUpdate: () => {
        playheadPosition.value = timeline.value.progress()
        progress.value = Math.round(timeline.value.progress() * 100)
      },
      onStart: () => animationState.value = '运行中',
      onComplete: () => animationState.value = '已完成'
    })
    
    // 第一个动画 - 移动
    timeline.value.to(boxRef.value, { 
      duration: duration.value * 0.5, 
      x: animProps.value.x, 
      y: animProps.value.y,
      ease: ease.value
    })
    
    // 第二个动画 - 旋转和缩放
    timeline.value.to(boxRef.value, { 
      duration: duration.value * 0.25, 
      rotation: animProps.value.rotation, 
      scale: animProps.value.scale,
      ease: ease.value
    })
    
    // 第三个动画 - 颜色和形状
    timeline.value.to(boxRef.value, { 
      duration: duration.value * 0.25, 
      backgroundColor: animProps.value.backgroundColor,
      borderRadius: `${animProps.value.borderRadius}%`,
      ease: ease.value
    })
  }
}

function playAnimation() {
  if (timeline.value) {
    timeline.value.restart()
  }
}

function pauseAnimation() {
  if (timeline.value) {
    timeline.value.pause()
    animationState.value = '已暂停'
  }
}

function reverseAnimation() {
  if (timeline.value) {
    timeline.value.reverse()
  }
}

function resetAnimation() {
  if (timeline.value) {
    timeline.value.kill()
    
    // 重置元素状态
    gsap.set(boxRef.value, {
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
      backgroundColor: '#646cff',
      borderRadius: '0%'
    })
    
    // 重新创建时间轴
    createTimeline()
    
    animationState.value = '已重置'
    progress.value = 0
    playheadPosition.value = 0
  }
}

function toggleCode() {
  showCode.value = !showCode.value
}

const codeExample = `// 创建GSAP时间轴
const tl = gsap.timeline({ 
  paused: true,
  onStart: () => console.log('动画开始'),
  onComplete: () => console.log('动画完成')
})

// 添加动画序列
tl.to('.box', { 
  duration: ${duration.value * 0.5}, 
  x: ${animProps.value.x}, 
  y: ${animProps.value.y},
  ease: '${ease.value}'
})
.to('.box', { 
  duration: ${duration.value * 0.25}, 
  rotation: ${animProps.value.rotation}, 
  scale: ${animProps.value.scale},
  ease: '${ease.value}'
})
.to('.box', { 
  duration: ${duration.value * 0.25}, 
  backgroundColor: '${animProps.value.backgroundColor}',
  borderRadius: '${animProps.value.borderRadius}%',
  ease: '${ease.value}'
})

// 播放动画
tl.play()`
</script>

<template>
  <div class="gsap-advanced-demo">
    <h3 v-if="title" class="demo-title">{{ title }}</h3>
    <p v-if="description" class="demo-description">{{ description }}</p>
    
    <div class="demo-tabs">
      <div class="tab-buttons">
        <button 
          @click="activeTab = 'timeline'" 
          :class="{'active': activeTab === 'timeline'}"
        >
          动画预览
        </button>
        <button 
          @click="activeTab = 'controls'" 
          :class="{'active': activeTab === 'controls'}"
        >
          动画参数
        </button>
        <button 
          @click="activeTab = 'code'" 
          :class="{'active': activeTab === 'code'}"
        >
          代码示例
        </button>
      </div>
      
      <!-- 时间轴动画演示 -->
      <div v-show="activeTab === 'timeline'" class="tab-content">
        <div class="demo-container" ref="containerRef">
          <div ref="boxRef" class="box"></div>
          
          <div class="timeline-track">
            <div class="timeline-progress" :style="{width: `${progress}%`}"></div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              class="timeline-slider" 
              :value="playheadPosition * 100"
            >
          </div>
        </div>
      </div>
      
      <!-- 动画参数控制 -->
      <div v-show="activeTab === 'controls'" class="tab-content controls-tab">
        <div class="control-group">
          <label>持续时间</label>
          <div class="control-input">
            <input 
              type="range" 
              min="0.5" 
              max="5" 
              step="0.1" 
              v-model="duration"
            >
            <span>{{ duration }}s</span>
          </div>
        </div>
        
        <div class="control-group">
          <label>缓动函数</label>
          <div class="control-input">
            <select v-model="ease">
              <option 
                v-for="option in easeOptions" 
                :key="option.value" 
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
          </div>
        </div>
        
        <div class="control-group">
          <label>X位移</label>
          <div class="control-input">
            <input 
              type="range" 
              min="0" 
              max="300" 
              v-model.number="animProps.x"
            >
            <span>{{ animProps.x }}px</span>
          </div>
        </div>
        
        <div class="control-group">
          <label>Y位移</label>
          <div class="control-input">
            <input 
              type="range" 
              min="-100" 
              max="100" 
              v-model.number="animProps.y"
            >
            <span>{{ animProps.y }}px</span>
          </div>
        </div>
        
        <div class="control-group">
          <label>旋转</label>
          <div class="control-input">
            <input 
              type="range" 
              min="0" 
              max="720" 
              v-model.number="animProps.rotation"
            >
            <span>{{ animProps.rotation }}°</span>
          </div>
        </div>
        
        <div class="control-group">
          <label>缩放</label>
          <div class="control-input">
            <input 
              type="range" 
              min="0.5" 
              max="2" 
              step="0.1" 
              v-model.number="animProps.scale"
            >
            <span>{{ animProps.scale }}×</span>
          </div>
        </div>
        
        <div class="control-group">
          <label>圆角</label>
          <div class="control-input">
            <input 
              type="range" 
              min="0" 
              max="50" 
              v-model.number="animProps.borderRadius"
            >
            <span>{{ animProps.borderRadius }}%</span>
          </div>
        </div>
      </div>
      
      <!-- 代码预览 -->
      <div v-show="activeTab === 'code'" class="tab-content code-tab">
        <pre><code>{{ codeExample }}</code></pre>
      </div>
    </div>
    
    <div ref="controlsRef" class="controls control-panel">
      <div class="control-buttons">
        <button @click="playAnimation" class="btn play">
          播放
        </button>
        <button @click="pauseAnimation" class="btn pause">
          暂停
        </button>
        <button @click="reverseAnimation" class="btn reverse">
          反向
        </button>
        <button @click="resetAnimation" class="btn reset">
          重置
        </button>
      </div>
      
      <div class="status-bar">
        <span class="status">状态: {{ animationState }}</span>
        <span class="progress-text">进度: {{ progress }}%</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gsap-advanced-demo {
  margin: 2rem 0;
  border-radius: 16px;
  overflow: hidden;
  background-color: var(--vp-c-bg-soft);
  box-shadow: var(--shadow-2);
  transition: all 0.3s ease;
}

.gsap-advanced-demo:hover {
  box-shadow: var(--shadow-3);
}

.demo-title {
  font-size: 1.5rem;
  margin: 0;
  padding: 1.5rem 1.5rem 0.5rem;
  color: var(--vp-c-brand);
}

.demo-description {
  padding: 0 1.5rem 1rem;
  color: var(--vp-c-text-2);
  margin: 0;
}

.demo-tabs {
  margin: 0 1.5rem;
}

.tab-buttons {
  display: flex;
  border-bottom: 1px solid var(--vp-c-divider);
  margin-bottom: 1.5rem;
}

.tab-buttons button {
  background: none;
  border: none;
  padding: 0.75rem 1.25rem;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  font-weight: 500;
  color: var(--vp-c-text-2);
  transition: all 0.2s ease;
}

.tab-buttons button:hover {
  color: var(--vp-c-text-1);
}

.tab-buttons button.active {
  color: var(--vp-c-brand);
  border-bottom-color: var(--vp-c-brand);
}

.tab-content {
  margin-bottom: 1.5rem;
}

.demo-container {
  height: 250px;
  position: relative;
  margin-bottom: 1rem;
  border-radius: 8px;
  background-color: var(--vp-c-bg);
  overflow: hidden;
  box-shadow: var(--shadow-1) inset;
}

.box {
  width: 60px;
  height: 60px;
  background-color: #646cff;
  position: absolute;
  top: 95px;
  left: 20px;
  box-shadow: var(--shadow-2);
}

.timeline-track {
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  height: 6px;
  background-color: rgba(100, 108, 255, 0.2);
  border-radius: 3px;
  overflow: hidden;
}

.timeline-progress {
  height: 100%;
  background-color: #646cff;
  width: 0%;
  transition: width 0.1s linear;
}

.timeline-slider {
  position: absolute;
  top: -10px;
  left: 0;
  width: 100%;
  height: 24px;
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  cursor: pointer;
}

.timeline-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--vp-c-brand);
  cursor: pointer;
  box-shadow: 0 0 0 4px rgba(66, 184, 131, 0.2);
}

.controls {
  padding: 1.5rem;
  border-top: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg);
}

.control-panel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.control-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
}

.play {
  background-color: var(--vp-c-brand);
  color: white;
}

.play:hover {
  background-color: var(--vp-c-brand-dark);
}

.pause {
  background-color: #f8f8f8;
  color: #666;
}

.reverse {
  background-color: #a992ff;
  color: white;
}

.reset {
  background-color: #f1f1f1;
  color: #333;
}

.status-bar {
  display: flex;
  justify-content: space-between;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

/* 参数控制部分样式 */
.controls-tab {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.control-group label {
  font-weight: 500;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
}

.control-input {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.control-input input[type="range"] {
  flex: 1;
  height: 6px;
  border-radius: 3px;
  -webkit-appearance: none;
  appearance: none;
  background: linear-gradient(to right, var(--vp-c-brand), var(--vp-c-brand-light));
  outline: none;
}

.control-input input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: white;
  border: 2px solid var(--vp-c-brand);
  cursor: pointer;
  transition: all 0.2s ease;
}

.control-input input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}

.control-input span {
  min-width: 50px;
  text-align: right;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.control-input select {
  width: 100%;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  outline: none;
}

/* 代码区域样式 */
.code-tab {
  background-color: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  position: relative;
}

.code-tab pre {
  margin: 0;
  padding: 0;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  overflow-x: auto;
  color: var(--vp-c-text-1);
}

@media (max-width: 640px) {
  .controls-tab {
    grid-template-columns: 1fr;
  }
  
  .control-buttons {
    justify-content: center;
  }
  
  .status-bar {
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }
}
</style> 