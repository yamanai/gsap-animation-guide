<template>
  <GsapEditor 
    title="ScrollTrigger 自定义滚动容器演示"
    :initialHtml="htmlCode"
    :initialCss="cssCode"
    :initialJs="jsCode"
    scrollHeight="650px"
  />
</template>

<script setup>
const htmlCode = `<div class="page-container">
  <!-- 页面标题和说明 -->
  <header class="page-header">
    <h3>ScrollTrigger 自定义滚动容器</h3>
    <p>本示例展示如何让动画响应特定容器内的滚动，而不是整个页面的滚动</p>
  </header>
  
  <!-- 主要区域：展示区和说明区并排 -->
  <div class="main-content">
    <!-- 左侧：自定义滚动容器区域 -->
    <div class="demo-section">
      <div class="demo-header">
        <div class="section-label">自定义滚动区</div>
        <div class="scroll-instructions">← 在此区域内滚动 →</div>
      </div>
      
      <!-- 这是自定义滚动容器 - 核心部分 -->
      <div class="custom-scroller" id="customScrollContainer">
        <!-- 滚动容器的内容 -->
        <div class="scroller-content">
          <!-- 起始区域 -->
          <div class="scroll-area start-area">开始区域</div>
          
          <!-- 动画触发元素 -->
          <div class="trigger-box" id="triggerElement">
            <div class="animated-box"></div>
            <div class="trigger-label">触发元素</div>
          </div>
          
          <!-- 结束区域 -->
          <div class="scroll-area end-area">结束区域</div>
        </div>
      </div>
      
      <!-- 滚动进度显示 -->
      <div class="scroll-progress">
        <div class="progress-text">动画进度: <span id="progressValue">0%</span></div>
        <div class="progress-bar">
          <div class="progress-fill" id="progressFill"></div>
        </div>
      </div>
    </div>
    
    <!-- 右侧：说明和代码 -->
    <div class="info-section">
      <div class="info-block">
        <h4>自定义滚动容器说明</h4>
        <p>ScrollTrigger 允许指定一个特定的容器作为滚动监听源，而不是默认的视口/页面。</p>
        <p>这在以下场景特别有用：</p>
        <ul>
          <li>在面板或卡片内创建滚动动画</li>
          <li>在不影响页面滚动的情况下控制动画</li>
          <li>创建独立的、可滚动的内容区域</li>
        </ul>
      </div>
      
      <div class="code-block">
        <div class="code-title">核心代码示例：</div>
        <pre><code>gsap.to(".animated-box", {
  scrollTrigger: {
    <strong>scroller: "#customScrollContainer",</strong> // 这是关键设置
    trigger: "#triggerElement",
    start: "top 70%",
    end: "bottom 30%",
    scrub: true,
    markers: true
  },
  rotation: 360,
  scale: 1.5,
  backgroundColor: "#9b59b6"
});</code></pre>
      </div>
    </div>
  </div>
  
  <!-- 页脚提示 -->
  <footer class="page-footer">
    <div class="footer-note">注意：页面本身可以滚动，自定义容器也可以独立滚动，这就是多重滚动的效果</div>
  </footer>
  
  <!-- 静态内容 - 用于使外层页面也可滚动 -->
  <div class="page-spacer"></div>
</div>`;

const cssCode = `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Arial', sans-serif;
  color: #333;
  line-height: 1.6;
}

.page-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

/* 页面头部 */
.page-header {
  text-align: center;
  margin-bottom: 30px;
}

.page-header h3 {
  color: #2c3e50;
  margin-bottom: 8px;
}

.page-header p {
  color: #7f8c8d;
}

/* 主内容区 */
.main-content {
  display: flex;
  gap: 25px;
  margin-bottom: 30px;
}

/* 左侧演示区 */
.demo-section {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.demo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.section-label {
  font-weight: bold;
  color: #2c3e50;
}

.scroll-instructions {
  color: #e74c3c;
  font-size: 14px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
}

/* 自定义滚动容器 - 核心样式 */
.custom-scroller {
  height: 300px;
  border: 2px solid #3498db;
  border-radius: 8px;
  overflow-y: auto;
  background-color: #f8f9fa;
  margin-bottom: 10px;
  
  /* 美化滚动条 */
  scrollbar-width: thin;
  scrollbar-color: #3498db #e7f4fd;
}

.custom-scroller::-webkit-scrollbar {
  width: 8px;
}

.custom-scroller::-webkit-scrollbar-track {
  background: #e7f4fd;
}

.custom-scroller::-webkit-scrollbar-thumb {
  background-color: #3498db;
  border-radius: 4px;
}

/* 滚动容器内容 */
.scroller-content {
  padding: 20px;
}

.scroll-area {
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  color: white;
  font-weight: bold;
}

.start-area {
  background: linear-gradient(to bottom, #3498db, #2980b9);
  margin-bottom: 20px;
}

.end-area {
  background: linear-gradient(to bottom, #2980b9, #1f618d);
  margin-top: 20px;
}

/* 触发元素 */
.trigger-box {
  padding: 25px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  text-align: center;
}

.animated-box {
  width: 80px;
  height: 80px;
  background-color: #3498db;
  border-radius: 8px;
  margin: 0 auto 15px;
}

.trigger-label {
  color: #7f8c8d;
  font-size: 14px;
}

/* 滚动进度 */
.scroll-progress {
  margin-top: 10px;
}

.progress-text {
  text-align: center;
  font-size: 14px;
  margin-bottom: 5px;
  color: #555;
}

.progress-bar {
  height: 6px;
  background-color: #ecf0f1;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  width: 0%;
  background-color: #3498db;
  border-radius: 3px;
  transition: width 0.2s;
}

/* 右侧信息区 */
.info-section {
  flex: 1;
  display: flex; 
  flex-direction: column;
  gap: 20px;
}

.info-block {
  background-color: #ecf0f1;
  padding: 15px;
  border-radius: 8px;
}

.info-block h4 {
  margin-bottom: 10px;
  color: #2c3e50;
}

.info-block p {
  margin-bottom: 10px;
  color: #555;
}

.info-block ul {
  padding-left: 20px;
  color: #555;
}

.info-block li {
  margin-bottom: 5px;
}

/* 代码块 */
.code-block {
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 15px;
  border-radius: 8px;
}

.code-title {
  margin-bottom: 10px;
  color: #3498db;
  font-weight: bold;
}

pre code {
  font-family: monospace;
  font-size: 14px;
  line-height: 1.5;
  display: block;
  white-space: pre-wrap;
}

code strong {
  color: #e74c3c;
  font-weight: bold;
}

/* 页脚 */
.page-footer {
  text-align: center;
  padding: 15px 0;
  border-top: 1px solid #ecf0f1;
}

.footer-note {
  font-style: italic;
  color: #7f8c8d;
  font-size: 14px;
}

/* 页面填充空间 - 确保外层也可滚动 */
.page-spacer {
  height: 400px;
}`;

const jsCode = `// 注册 ScrollTrigger 插件
gsap.registerPlugin(ScrollTrigger);

// 清除可能存在的ScrollTrigger实例
ScrollTrigger.getAll().forEach(st => st.kill());

// 全局禁用标记
ScrollTrigger.defaults({ markers: false });

// 获取元素
const progressFill = document.getElementById('progressFill');
const progressValue = document.getElementById('progressValue');
const customScroller = document.getElementById('customScrollContainer');
const animatedBox = document.querySelector('.animated-box');

// 确保滚动容器初始位置
customScroller.scrollTop = 0;

// 设置初始状态
gsap.set(animatedBox, { 
  rotation: 0, 
  scale: 1, 
  backgroundColor: '#3498db',
  borderRadius: '8px'
});

// 1. 创建响应自定义滚动容器的动画
gsap.to(animatedBox, {
  rotation: 360,
  scale: 1.5, 
  backgroundColor: '#9b59b6',
  borderRadius: '50%',
    duration: 1,
    scrollTrigger: {
    trigger: '#triggerElement',
    scroller: '#customScrollContainer', // 这是关键设置：指定自定义滚动容器
    start: 'top 70%',     // 当触发元素的顶部到达滚动容器70%位置时开始
    end: 'bottom 30%',    // 当触发元素的底部到达滚动容器30%位置时结束
    scrub: true,          // 动画进度跟随滚动位置
    id: 'custom-scroller-demo',
    onUpdate: self => {
      // 更新进度显示
      const progress = Math.round(self.progress * 100);
      progressFill.style.width = \`\${progress}%\`;
      progressValue.textContent = \`\${progress}%\`;
    }
  }
});

// 2. 额外创建一个响应页面滚动的动画，帮助理解区别
gsap.timeline({
  scrollTrigger: {
    trigger: '.demo-section',
    start: 'top 60%',
    end: 'bottom 40%',
    toggleActions: 'play pause reverse reset'
  }
})
.to('.code-block', {
  borderColor: '#e74c3c',
  boxShadow: '0 0 15px rgba(231, 76, 60, 0.5)',
  duration: 1
});

// 添加交互提示
customScroller.addEventListener('scroll', function() {
  // 当用户开始滚动容器时，添加提示类
  document.querySelector('.scroll-instructions').classList.add('scrolling');
  
  // 延迟移除提示类
  clearTimeout(window.scrollTimer);
  window.scrollTimer = setTimeout(() => {
    document.querySelector('.scroll-instructions').classList.remove('scrolling');
  }, 1000);
});

// 添加自定义CSS类
const style = document.createElement('style');
style.textContent = \`.scrolling { color: #27ae60; }\`;
document.head.appendChild(style);`;
</script> 