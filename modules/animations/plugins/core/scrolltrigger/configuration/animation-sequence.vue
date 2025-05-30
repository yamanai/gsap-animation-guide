<template>
  <GsapEditor 
    title="ScrollTrigger 动画序列"
    :initialHtml="htmlCode"
    :initialCss="cssCode"
    :initialJs="jsCode"
    scrollHeight="700px"
  />
</template>

<script setup>
const htmlCode = `<div class="animation-sequence-demo">
  <!-- 页面标题 -->
  <header class="demo-header">
    <h2>ScrollTrigger 动画序列</h2>
    <div class="scroll-instruction">↓ 向下滚动激活序列动画 ↓</div>
  </header>
  
  <!-- 动画展示区域 -->
  <div class="sequence-container">
    <div class="timeline-indicator">
      <div class="timeline-line"></div>
      <div class="timeline-progress" id="timelineProgress"></div>
      
      <!-- 时间线节点 -->
      <div class="timeline-node node-1" data-step="1">1</div>
      <div class="timeline-node node-2" data-step="2">2</div>
      <div class="timeline-node node-3" data-step="3">3</div>
      <div class="timeline-node node-4" data-step="4">4</div>
      <div class="timeline-node node-5" data-step="5">完成</div>
    </div>
    
    <div class="animation-stage">
      <!-- 动画元素 -->
      <div class="sequence-element element-1" id="element1">
        <div class="element-content">
          <div class="element-number">1</div>
          <div class="element-text">移入</div>
        </div>
      </div>
      
      <div class="sequence-element element-2" id="element2">
        <div class="element-content">
          <div class="element-number">2</div>
          <div class="element-text">旋转</div>
        </div>
      </div>
      
      <div class="sequence-element element-3" id="element3">
        <div class="element-content">
          <div class="element-number">3</div>
          <div class="element-text">缩放</div>
        </div>
      </div>
      
      <div class="sequence-element element-4" id="element4">
        <div class="element-content">
          <div class="element-number">4</div>
          <div class="element-text">弹跳</div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- 当前进度显示 -->
  <div class="sequence-progress">
    <div class="progress-display">
      <div class="progress-label">动画进度</div>
      <div class="progress-bar">
        <div class="progress-fill" id="progressFill"></div>
      </div>
      <div class="progress-value" id="progressValue">0%</div>
    </div>
    
    <div class="current-step" id="currentStep">准备开始动画序列...</div>
  </div>
  
  <!-- 说明区域 -->
  <div class="sequence-info">
    <h3>动画序列说明</h3>
    <p>ScrollTrigger 动画序列允许您创建一系列随滚动触发的动画，每个动画可以在前一个动画之后开始，形成连贯的序列。</p>
    <div class="code-snippet">
      <pre><code>// 创建时间轴
const tl = gsap.timeline({
  scrollTrigger: { trigger, start, end, scrub }
});

// 添加序列动画
tl.to(element1, { x: 200 })
  .to(element2, { rotation: 360 })
  .to(element3, { scale: 1.5 })
  .to(element4, { y: -30 });</code></pre>
    </div>
  </div>
  
  <!-- 底部间距 -->
  <div class="bottom-spacer"></div>
</div>`;

const cssCode = `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Arial', sans-serif;
  color: #333;
  background-color: #f8f9fa;
  overflow-x: hidden;
}

.animation-sequence-demo {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  position: relative;
}

/* 头部样式 */
.demo-header {
  text-align: center;
  padding: 20px 0;
  background-color: white;
  border-bottom: 1px solid #eaeaea;
  position: sticky;
  top: 0;
  z-index: 100;
}

.demo-header h2 {
  color: #2c3e50;
  margin-bottom: 15px;
}

.scroll-instruction {
  display: inline-block;
  padding: 8px 15px;
  background-color: #3498db;
  color: white;
  border-radius: 20px;
  font-weight: bold;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: translateY(0); }
  50% { transform: translateY(5px); }
  100% { transform: translateY(0); }
}

/* 序列容器样式 */
.sequence-container {
  background-color: white;
  border-radius: 10px;
  margin: 30px 0;
  padding: 40px 20px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 时间线指示器 */
.timeline-indicator {
  width: 80%;
  height: 60px;
  position: relative;
  margin-bottom: 40px;
}

.timeline-line {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: #e0e0e0;
  transform: translateY(-50%);
  border-radius: 2px;
}

.timeline-progress {
  position: absolute;
  top: 50%;
  left: 0;
  width: 0%;
  height: 4px;
  background-color: #3498db;
  transform: translateY(-50%);
  border-radius: 2px;
  transition: width 0.2s ease;
}

.timeline-node {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #e0e0e0;
  color: #555;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s, color 0.3s;
  z-index: 2;
}

.timeline-node:last-child {
  width: auto;
  padding: 0 15px;
  border-radius: 15px;
}

.timeline-node.node-1 { left: 0%; }
.timeline-node.node-2 { left: 25%; }
.timeline-node.node-3 { left: 50%; }
.timeline-node.node-4 { left: 75%; }
.timeline-node.node-5 { left: 100%; }

.timeline-node.active {
  background-color: #3498db;
  color: white;
  box-shadow: 0 0 0 4px rgba(52, 152, 219, 0.3);
}

/* 动画舞台 */
.animation-stage {
  width: 100%;
  height: 300px;
  position: relative;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px dashed #ddd;
  overflow: hidden;
}

/* 序列元素样式 */
.sequence-element {
  position: absolute;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transition: box-shadow 0.3s;
}

.sequence-element:hover {
  box-shadow: 0 6px 12px rgba(0,0,0,0.15);
}

.element-content {
  text-align: center;
  color: white;
  font-weight: bold;
}

.element-number {
  font-size: 22px;
  line-height: 1;
}

.element-text {
  font-size: 14px;
  margin-top: 2px;
}

.element-1 {
  background-color: #3498db;
  top: 50px;
  left: -100px;
}

.element-2 {
  background-color: #9b59b6;
  top: 150px;
  left: 100px;
  opacity: 0;
}

.element-3 {
  background-color: #e74c3c;
  top: 70px;
  left: 300px;
  opacity: 0;
}

.element-4 {
  background-color: #2ecc71;
  top: 200px;
  left: 500px;
  opacity: 0;
}

/* 进度显示 */
.sequence-progress {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  margin: 20px 0;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  text-align: center;
}

.progress-display {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.progress-label {
  font-weight: bold;
  color: #2c3e50;
  flex: 1;
  text-align: left;
}

.progress-bar {
  height: 8px;
  flex: 3;
  background-color: #ecf0f1;
  border-radius: 4px;
  overflow: hidden;
  margin: 0 15px;
}

.progress-fill {
  height: 100%;
  width: 0%;
  background-color: #3498db;
  transition: width 0.2s ease;
}

.progress-value {
  font-weight: bold;
  color: #3498db;
  flex: 0.5;
  text-align: right;
}

.current-step {
  color: #7f8c8d;
  font-style: italic;
  margin-top: 10px;
}

/* 信息区域 */
.sequence-info {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
}

.sequence-info h3 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 18px;
}

.sequence-info p {
  color: #7f8c8d;
  line-height: 1.6;
  margin-bottom: 15px;
}

.code-snippet {
  background-color: #2c3e50;
  padding: 15px;
  border-radius: 5px;
  overflow-x: auto;
}

.code-snippet pre {
  margin: 0;
}

.code-snippet code {
  color: #ecf0f1;
  font-family: monospace;
  font-size: 14px;
  line-height: 1.5;
}

/* 底部间距 */
.bottom-spacer {
  height: 100px;
}`;

const jsCode = `// 注册 ScrollTrigger 插件
gsap.registerPlugin(ScrollTrigger);

// 清除任何可能存在的ScrollTrigger实例
ScrollTrigger.getAll().forEach(st => st.kill());

// 全局禁用标记
ScrollTrigger.defaults({ markers: false });

// 初始化动画序列
function initAnimationSequence() {
  try {
    // 检查GSAP和ScrollTrigger是否已加载
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      console.warn('GSAP或ScrollTrigger未加载，尝试稍后初始化');
      setTimeout(initAnimationSequence, 100);
      return;
    }

    // 在页面内容加载完成之后再初始化，确保DOM元素存在
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      setTimeout(setupAnimations, 100);
    } else {
      document.addEventListener('DOMContentLoaded', setupAnimations);
    }
  } catch (e) {
    console.error('初始化动画序列时出错:', e);
  }
}

function setupAnimations() {
  try {
    // 使用安全的方式获取DOM元素
    const safeGetElement = (id) => {
      const element = document.getElementById(id);
      if (!element) console.warn(\`元素未找到: #\${id}\`);
      return element;
    };
    
    const timelineProgress = safeGetElement('timelineProgress');
    const progressFill = safeGetElement('progressFill');
    const progressValue = safeGetElement('progressValue');
    const currentStep = safeGetElement('currentStep');
    
    // 如果关键元素缺失，则退出
    if (!timelineProgress || !progressFill || !progressValue || !currentStep) {
      console.error('关键DOM元素缺失，无法继续');
      return;
    }
    
    // 初始化元素
    gsap.set('.element-2, .element-3, .element-4', { opacity: 0 });
    
    // 确保初始滚动位置
    window.scrollTo(0, 0);
    
    // 添加滚动指南动画
    gsap.to('.scroll-instruction', {
      y: 5,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });
    
    // 创建主时间轴
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.sequence-container',
        start: 'top 60%',
        end: 'bottom 40%',
      scrub: 1,
        id: 'animation-sequence',
        onUpdate: function(self) {
          // 使用try-catch块包装更新逻辑，确保错误不会阻止其他功能
          try {
            // 更新进度条
            const progress = Math.round(self.progress * 100);
            progressFill.style.width = \`\${progress}%\`;
            progressValue.textContent = \`\${progress}%\`;
            timelineProgress.style.width = \`\${progress}%\`;
            
            // 更新时间线节点状态 - 使用选择器直接操作
            updateNodesByProgress(progress);
            
            // 更新当前步骤描述
            updateStepDescription(progress, currentStep);
          } catch (err) {
            console.error('更新动画状态时出错:', err);
          }
        }
      }
  });
  
    // 添加序列动画
    tl.to('.element-1', { 
      left: '20%', 
      duration: 0.2,
      ease: 'power1.out',
      onStart: () => highlightElement('element1')
    })
    .to('.element-2', { 
      opacity: 1, 
      duration: 0.1 
    }, '>')
    .to('.element-2', { 
      rotation: 360, 
      duration: 0.2,
      ease: 'power1.inOut',
      onStart: () => highlightElement('element2')
    })
    .to('.element-3', { 
      opacity: 1, 
      duration: 0.1 
    }, '>')
    .to('.element-3', { 
      scale: 1.5, 
      duration: 0.2,
      ease: 'power1.inOut',
      onStart: () => highlightElement('element3')
    })
    .to('.element-4', { 
      opacity: 1, 
      duration: 0.1 
    }, '>')
    .to('.element-4', { 
      y: -50, 
      duration: 0.2,
      ease: 'bounce.out',
      onStart: () => highlightElement('element4')
    });
    
    console.log('动画序列设置完成');
  } catch (e) {
    console.error('设置动画序列时出错:', e);
  }
}

// 使用类选择器更新节点状态，避免使用可能不存在的nodeList引用
function updateNodesByProgress(progress) {
  // 移除所有节点的激活状态
  document.querySelectorAll('.timeline-node').forEach(node => {
    if (node && node.classList) {
      node.classList.remove('active');
    }
  });
  
  // 根据进度激活对应节点
  let activeNodeClass = '';
  
  if (progress < 0.2) {
    activeNodeClass = '.node-1';
  } else if (progress < 0.4) {
    activeNodeClass = '.node-2';
  } else if (progress < 0.6) {
    activeNodeClass = '.node-3';
  } else if (progress < 0.8) {
    activeNodeClass = '.node-4';
  } else {
    activeNodeClass = '.node-5';
  }
  
  // 安全地添加活跃类
  const activeNode = document.querySelector(activeNodeClass);
  if (activeNode && activeNode.classList) {
    activeNode.classList.add('active');
  }
}

// 更新当前步骤描述
function updateStepDescription(progress, stepElement) {
  if (!stepElement) return;
  
  let description = '';
  
  if (progress < 0.1) {
    description = '准备开始动画序列...';
  } else if (progress < 0.3) {
    description = '步骤 1: 元素1 从左侧移入场景';
  } else if (progress < 0.5) {
    description = '步骤 2: 元素2 执行旋转动画';
  } else if (progress < 0.7) {
    description = '步骤 3: 元素3 执行缩放动画';
  } else if (progress < 0.9) {
    description = '步骤 4: 元素4 执行弹跳动画';
  } else {
    description = '动画序列已完成!';
  }
  
  stepElement.textContent = description;
}

// 高亮当前激活的元素
function highlightElement(id) {
  try {
    // 移除所有高亮
    document.querySelectorAll('.sequence-element').forEach(el => {
      if (el && typeof el.style !== 'undefined') {
        el.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
        el.style.zIndex = '1';
      }
    });
    
    // 添加高亮到当前元素
    const element = document.getElementById(id);
    if (element && typeof element.style !== 'undefined') {
      element.style.boxShadow = '0 0 0 4px rgba(255,255,255,0.5), 0 6px 20px rgba(0,0,0,0.3)';
      element.style.zIndex = '10';
    }
  } catch (err) {
    console.error('高亮元素时出错:', err);
  }
}

// 启动初始化过程
initAnimationSequence();`;
</script> 