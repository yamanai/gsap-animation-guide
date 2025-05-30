<template>
  <div class="scrollsmoother-performance-demo">
    <h3>ScrollSmoother性能优化示例</h3>
    
    <GsapEditor 
      title="优化后的平滑滚动" 
      :initialHtml="initialHtml"
      :initialCss="initialCss"
      :initialJs="initialJs"
      scrollHeight="2000px"
    />

    <!-- 提示说明区 -->
    <div class="explanation">
      <div class="warning">
        <strong>性能影响因素：</strong> 平滑滚动可能会导致性能问题，特别是在移动设备或包含大量DOM元素的页面上
      </div>
      
      <div class="info">
        <strong>最佳实践：</strong> 使用will-change属性、减少视差元素数量并适当延迟加载内容
      </div>
      
      <h4>性能对比</h4>
      <div class="comparison">
        <div class="code-block bad">
          <h5>❌ 低效实现</h5>
          <pre><code>// 不推荐：过多的视差元素
gsap.utils.toArray('.parallax').forEach(el => {
  // 为每个元素单独创建ScrollTrigger
  gsap.to(el, {
    y: (i, target) => -100 * target.dataset.speed || 0,
    ease: "none",
    scrollTrigger: {
      trigger: el,
      scrub: true,
      scroller: "#smooth-wrapper"
    }
  });
});</code></pre>
        </div>
        
        <div class="code-block good">
          <h5>✅ 优化实现</h5>
          <pre><code>// 推荐：使用ScrollSmoother内置的effects方法
// 一次性处理所有视差元素
gsap.utils.toArray("[data-speed]").forEach(el => {
  smoother.effects(el, { speed: parseFloat(el.dataset.speed) || 1 });
});</code></pre>
        </div>
      </div>
      
      <h4>关键优化技巧</h4>
      <ol class="tips-list">
        <li>使用<code>will-change: transform</code>属性提示浏览器提前准备图层</li>
        <li>对不在视口内的内容使用<code>content-visibility: auto</code></li>
        <li>减少使用大量的视差元素或复杂动画</li>
        <li>使用纯CSS实现简单视差效果以减轻JS负担</li>
        <li>考虑在移动设备上降低平滑程度或完全禁用</li>
      </ol>
    </div>
  </div>
</template>

<script setup>
// 定义HTML，主要展示优化过的滚动页面结构
const initialHtml = `<!-- 优化的ScrollSmoother DOM结构 -->
<div id="smooth-wrapper">
  <div id="smooth-content">
    <!-- 页头 -->
    <header>
      <h1>ScrollSmoother性能优化</h1>
      <p>展示各种优化技巧以提升滚动性能</p>
    </header>
    
    <!-- 分组视差效果部分 -->
    <section class="section parallax-section">
      <h2>优化的视差效果</h2>
      <p>所有视差元素使用一致的data-speed属性，而不是单独的ScrollTrigger</p>
      
      <!-- 每个视差组包含多个元素 -->
      <div class="parallax-group">
        <!-- 使用data-speed属性，让ScrollSmoother一次性处理 -->
        <div class="parallax-element bg" data-speed="0.5"></div>
        <div class="parallax-element circle-1" data-speed="0.8"></div>
        <div class="parallax-element circle-2" data-speed="0.3"></div>
        <div class="parallax-element box-1" data-speed="1.2"></div>
        <div class="parallax-element box-2" data-speed="-0.4"></div>
      </div>
    </section>
    
    <!-- 延迟加载部分 -->
    <section class="section lazy-section">
      <h2>延迟加载内容</h2>
      <p>使用IntersectionObserver和content-visibility优化</p>
      
      <!-- 懒加载容器 -->
      <div class="lazy-container">
        <div class="lazy-item" data-src="https://picsum.photos/id/10/300/200"></div>
        <div class="lazy-item" data-src="https://picsum.photos/id/20/300/200"></div>
        <div class="lazy-item" data-src="https://picsum.photos/id/30/300/200"></div>
        <div class="lazy-item" data-src="https://picsum.photos/id/40/300/200"></div>
      </div>
    </section>
    
    <!-- 减少重绘区域部分 -->
    <section class="section will-change-section">
      <h2>减少重绘区域</h2>
      <p>使用will-change和composite layers优化</p>
      
      <div class="optimized-animation">
        <div class="floating-element">使用will-change优化</div>
      </div>
    </section>
    
    <!-- 设备检测部分 -->
    <section class="section device-section">
      <h2>设备自适应优化</h2>
      <p>根据设备性能自动调整平滑度</p>
      
      <div class="device-info">
        <div id="device-display" class="info-box">
          <span>检测中...</span>
        </div>
        <div class="controls">
          <button id="toggle-smooth">切换平滑模式</button>
          <div class="slider-group">
            <label for="smoothSlider">平滑度: <span id="smooth-value">1.5</span></label>
            <input type="range" id="smoothSlider" min="0" max="3" step="0.1" value="1.5">
          </div>
        </div>
      </div>
    </section>
    
    <!-- 页脚 -->
    <footer>
      <p>滚动性能优化示例</p>
      <button id="scrollTop">回到顶部</button>
    </footer>
  </div>
</div>`;

// 定义CSS，应用性能优化的样式
const initialCss = `/* 基础样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  color: #334155;
  line-height: 1.6;
}

/* ScrollSmoother必要样式 */
#smooth-wrapper {
  overflow: hidden;
  /* 提示浏览器这是一个将要变换的元素 */
  will-change: transform;
}

/* 主要部分样式 */
header {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: linear-gradient(135deg, #0ea5e9, #6366f1);
  color: white;
  padding: 20px;
}

.section {
  min-height: 90vh;
  padding: 80px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  /* 使用content-visibility优化不可见内容 */
  content-visibility: auto;
  /* 提前估计大小避免布局偏移 */
  contain-intrinsic-size: 700px;
}

h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

h2 {
  font-size: 2.2rem;
  margin-bottom: 2rem;
  color: #0f172a;
}

p {
  font-size: 1.2rem;
  max-width: 700px;
  margin-bottom: 2rem;
}

/* 视差部分样式 */
.parallax-section {
  background-color: #f1f5f9;
  overflow: hidden;
}

.parallax-group {
  position: relative;
  width: 100%;
  height: 400px;
  max-width: 800px;
}

.parallax-element {
  position: absolute;
  border-radius: 8px;
  /* 提示浏览器这是一个将要变换的元素 */
  will-change: transform;
}

.bg {
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #f9a8d4, #c4b5fd);
  opacity: 0.6;
  transform: translateY(20px);
}

.circle-1 {
  width: 150px;
  height: 150px;
  background-color: #0ea5e9;
  border-radius: 50%;
  top: 50px;
  left: 100px;
  opacity: 0.8;
}

.circle-2 {
  width: 100px;
  height: 100px;
  background-color: #6366f1;
  border-radius: 50%;
  bottom: 60px;
  right: 120px;
  opacity: 0.8;
}

.box-1 {
  width: 120px;
  height: 120px;
  background-color: #0f172a;
  bottom: 80px;
  left: 150px;
  opacity: 0.7;
}

.box-2 {
  width: 80px;
  height: 80px;
  background-color: #f43f5e;
  top: 100px;
  right: 180px;
  opacity: 0.7;
}

/* 延迟加载部分样式 */
.lazy-section {
  background-color: #f8fafc;
}

.lazy-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  max-width: 800px;
  margin-top: 40px;
}

.lazy-item {
  width: 300px;
  height: 200px;
  background-color: #e2e8f0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  font-weight: bold;
  /* 淡入效果 */
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.5s, transform 0.5s;
  
  /* 图片加载前的占位符 */
  position: relative;
  overflow: hidden;
}

.lazy-item.loaded {
  opacity: 1;
  transform: translateY(0);
}

.lazy-item::after {
  content: "加载中...";
  position: absolute;
}

.lazy-item.loaded::after {
  display: none;
}

/* will-change部分样式 */
.will-change-section {
  background-color: #eff6ff;
}

.optimized-animation {
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-top: 40px;
}

.floating-element {
  padding: 40px;
  background-color: #3b82f6;
  color: white;
  border-radius: 8px;
  font-weight: bold;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  /* 性能优化: 提示浏览器元素将会被动画处理 */
  will-change: transform;
  /* 确保在单独的层上渲染 */
  transform: translateZ(0);
}

/* 设备自适应部分样式 */
.device-section {
  background-color: #f0f9ff;
}

.device-info {
  width: 100%;
  max-width: 600px;
  margin-top: 40px;
}

.info-box {
  padding: 20px;
  background-color: #0c4a6e;
  color: white;
  border-radius: 8px;
  margin-bottom: 30px;
  font-family: monospace;
  font-size: 1.1rem;
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 400px;
  margin: 0 auto;
}

.slider-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

input[type="range"] {
  width: 100%;
  height: 8px;
}

button {
  padding: 12px 20px;
  background-color: #0ea5e9;
  border: none;
  border-radius: 6px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #0284c7;
}

/* 页脚 */
footer {
  background-color: #0f172a;
  color: white;
  padding: 60px 20px;
  text-align: center;
}

footer button {
  margin-top: 20px;
  background-color: #6366f1;
}

footer button:hover {
  background-color: #4f46e5;
}`;

// 定义JS，展示性能优化技术
const initialJs = `// 注册GSAP插件
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// 定义性能监测数据
let frameRate = 0;
let lastFrameTime = performance.now();
let smoothingEnabled = true;
let devicePerformance; // 提前声明变量

// 设备检测函数 - 评估当前设备性能并调整平滑度
function detectDevicePerformance() {
  // 获取设备信息
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isLowEndDevice = isMobile && navigator.hardwareConcurrency <= 4;
  const isHighEndDevice = navigator.hardwareConcurrency >= 8;
  
  // 根据设备性能返回推荐的平滑滚动值
  if (isLowEndDevice) {
    return {
      device: "低性能设备",
      recommended: 0.5,
      shouldEnable: false
    };
  } else if (isMobile) {
    return {
      device: "移动设备",
      recommended: 1,
      shouldEnable: true
    };
  } else if (isHighEndDevice) {
    return {
      device: "高性能设备",
      recommended: 2,
      shouldEnable: true
    };
  } else {
    return {
      device: "标准设备",
      recommended: 1.5,
      shouldEnable: true
    };
  }
}

// 更新设备信息显示
function updateDeviceInfo() {
  const deviceDisplay = document.getElementById('device-display');
  if (!deviceDisplay) return;
  
  // 计算有意义的FPS（限制在120以内）
  const currentFPS = Math.min(Math.round(frameRate), 120);
  
  // 确保devicePerformance已经初始化
  if (!devicePerformance) return;
  
  deviceDisplay.innerHTML = \`
    <div>设备类型: <strong>\${devicePerformance.device}</strong></div>
    <div>推荐平滑度: <strong>\${devicePerformance.recommended}</strong></div>
    <div>当前平滑度: <strong>\${smoother.vars.smooth}</strong></div>
    <div>平滑状态: <strong>\${smoothingEnabled ? '已启用' : '已禁用'}</strong></div>
    <div>当前帧率: <strong>\${currentFPS} FPS</strong></div>
  \`;
  
  // 根据帧率设置样式指示性能状况
  if (currentFPS < 30) {
    deviceDisplay.style.backgroundColor = '#ef4444';
  } else if (currentFPS < 50) {
    deviceDisplay.style.backgroundColor = '#f59e0b';
  } else {
    deviceDisplay.style.backgroundColor = '#10b981';
  }
}

// 设备性能初始化 - 在声明后执行
devicePerformance = detectDevicePerformance();

// 初始化ScrollSmoother，使用根据设备优化的设置
const smoother = ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  // 根据设备性能设置平滑度
  smooth: devicePerformance.shouldEnable ? devicePerformance.recommended : 0,
  // 启用性能优化的effects模式
  effects: true,
  // 减少移动端平滑度
  smoothTouch: devicePerformance.recommended * 0.5,
  // 性能优化：只在滚动时启用动画，减少资源消耗
  ignoreMobileResize: true,
  // 滚动更新回调
  onUpdate: updatePerformanceMetrics
});

// 更新性能指标
function updatePerformanceMetrics(self) {
  // 仅在必要时更新UI，减少DOM操作
  if (Math.random() < 0.05) { // 降低更新频率到5%
    updateDeviceInfo();
  }
}

// 测量每帧FPS
function measureFrameRate() {
  const now = performance.now();
  const delta = now - lastFrameTime;
  lastFrameTime = now;
  
  // 计算帧率
  frameRate = 1000 / delta;
  
  // 下一帧继续测量
  requestAnimationFrame(measureFrameRate);
}

// 启动帧率测量 - 初始化后再开始
setTimeout(() => {
  measureFrameRate();
  // 初始更新一次显示
  updateDeviceInfo();
}, 100);

// 平滑切换按钮
document.getElementById('toggle-smooth').addEventListener('click', function() {
  smoothingEnabled = !smoothingEnabled;
  smoother.paused(!smoothingEnabled);
  this.textContent = smoothingEnabled ? '禁用平滑' : '启用平滑';
  updateDeviceInfo(); // 更新状态显示
});

// 平滑度滑块控制
const smoothSlider = document.getElementById('smoothSlider');
const smoothValue = document.getElementById('smooth-value');

smoothSlider.addEventListener('input', function() {
  const value = parseFloat(this.value);
  smoothValue.textContent = value.toFixed(1);
  
  if (smoothingEnabled) {
    smoother.smoothTo(value, 0.5);
  }
});

// 回到顶部按钮
document.getElementById('scrollTop').addEventListener('click', function() {
  smoother.scrollTo(0, true);
});

// 视差效果 - 使用优化的方法
// 使用ScrollSmoother的effects方法，而不是单独的ScrollTrigger
gsap.utils.toArray('.parallax-element').forEach(el => {
  // 只需要一行代码就能创建视差效果
  // 比创建多个ScrollTrigger实例效率更高
  const speed = parseFloat(el.getAttribute('data-speed') || 1);
  smoother.effects(el, { speed });
});

// 创建浮动效果，使用requestAnimationFrame以优化性能
function animateFloatingElement() {
  const element = document.querySelector('.floating-element');
  
  // 使用时间变量创建平滑动画
  let startTime = null;
  
  function animate(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    
    // 使用sin函数创建平滑上下移动效果
    const yOffset = Math.sin(elapsed / 1000) * 15;
    
    // 使用transform而不是top/left等属性
    // 这样可以避免重排，只触发重绘，性能更好
    element.style.transform = \`translateY(\${yOffset}px) translateZ(0)\`;
    
    // 继续动画循环
    requestAnimationFrame(animate);
  }
  
  // 启动动画
  requestAnimationFrame(animate);
}

animateFloatingElement();

// 延迟加载图片 - 使用IntersectionObserver
function setupLazyLoading() {
  const lazyItems = document.querySelectorAll('.lazy-item');
  
  // 如果浏览器支持IntersectionObserver
  if ('IntersectionObserver' in window) {
    const lazyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const item = entry.target;
          loadImage(item);
          lazyObserver.unobserve(item); // 加载后停止观察
        }
      });
    }, {
      rootMargin: '100px', // 提前100px开始加载
      threshold: 0.1 // 10%可见时触发
    });
    
    // 为每个懒加载项添加观察
    lazyItems.forEach(item => {
      lazyObserver.observe(item);
    });
  } else {
    // 降级方案：简单地加载所有图片
    lazyItems.forEach(item => loadImage(item));
  }
}

// 加载单个图片
function loadImage(item) {
  const src = item.getAttribute('data-src');
  if (!src) return;
  
  // 创建图片并加载
  const img = new Image();
  
  img.onload = () => {
    // 图片加载完成后添加到DOM
    item.style.backgroundImage = \`url("\${src}")\`;
    item.classList.add('loaded');
  };
  
  img.onerror = () => {
    item.textContent = '加载失败';
    item.classList.add('error');
  };
  
  img.src = src;
}

// 启动延迟加载
setupLazyLoading();`;
</script>

<style scoped>
.scrollsmoother-performance-demo {
  margin: 2rem 0;
  border-radius: 8px;
  overflow: hidden;
}

.explanation {
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.warning, .info {
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 6px;
}

.warning {
  background-color: #fff4e5;
  border-left: 4px solid #ff9800;
}

.info {
  background-color: #e3f2fd;
  border-left: 4px solid #2196f3;
}

.comparison {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin: 1.5rem 0;
}

@media (min-width: 768px) {
  .comparison {
    flex-direction: row;
  }
}

.code-block {
  flex: 1;
  padding: 1.5rem;
  border-radius: 6px;
  overflow-x: auto;
}

.code-block h5 {
  margin-top: 0;
  margin-bottom: 1rem;
}

.bad {
  background-color: #ffebee;
  border-left: 4px solid #f44336;
}

.good {
  background-color: #e8f5e9;
  border-left: 4px solid #4caf50;
}

pre {
  margin: 0;
  white-space: pre-wrap;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
}

h4 {
  margin: 1.5rem 0 0.5rem 0;
}

.tips-list {
  padding-left: 1.5rem;
  margin: 1rem 0;
}

.tips-list li {
  margin-bottom: 0.5rem;
}

code {
  font-family: 'Courier New', monospace;
  background-color: #f1f1f1;
  padding: 2px 4px;
  border-radius: 3px;
  font-size: 0.9rem;
}
</style> 