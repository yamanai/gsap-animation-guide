<template>
  <div class="scrollsmoother-advanced-demo">
    <h3>ScrollSmoother高级功能示例</h3>
    
    <GsapEditor 
      title="平滑滚动高级效果" 
      :initialHtml="initialHtml"
      :initialCss="initialCss"
      :initialJs="initialJs"
      scrollHeight="2500px"
    />

    <!-- 提示说明区 -->
    <div class="explanation">
      <div class="tip">
        <strong>高级功能：</strong> ScrollSmoother提供了丰富的高级功能，包括选择性平滑、速度控制和事件回调
      </div>
      
      <div class="info">
        <strong>性能提示：</strong> 使用<code>effects()</code>方法创建视差效果比手动创建多个ScrollTrigger更高效
      </div>
      
      <h4>高级API用法</h4>
      <pre><code>// 1. 暂停和恢复平滑滚动
smoother.paused(true);  // 暂停平滑滚动
smoother.paused(false); // 恢复平滑滚动

// 2. 动态调整平滑程度
smoother.smoothTo(2.5, 0.5); // 平滑过渡到新的平滑值(0.5秒内过渡)

// 3. 获取当前滚动速度
const velocity = smoother.getVelocity(); // 返回当前滚动速度

// 4. 手动刷新
smoother.refresh(); // 在DOM变化后刷新</code></pre>
    </div>
  </div>
</template>

<script setup>
// 定义初始HTML，包含ScrollSmoother高级功能演示所需的结构
const initialHtml = `<!-- ScrollSmoother特殊DOM结构 -->
<div id="smooth-wrapper">
  <div id="smooth-content">
    <!-- 页头 -->
    <header>
      <h1>ScrollSmoother高级功能</h1>
      <p>向下滚动以体验不同的高级效果</p>
    </header>
    
    <!-- 自定义速度区域 -->
    <section class="section speed-control">
      <h2>区域性平滑控制</h2>
      <p>这个区域拥有自己的平滑滚动速度。</p>
      <p>它会根据滚动方向使用不同的平滑值。</p>
      <div class="box smooth-box">自定义平滑度</div>
    </section>
    
    <!-- 复杂视差区域 -->
    <section class="section parallax-section">
      <h2>高级视差效果</h2>
      <p>元素以不同的速度和方向移动</p>
      <div class="parallax-container">
        <div class="parallax-layer layer1" data-speed="0.2">
          <div class="parallax-element">速度 0.2</div>
        </div>
        <div class="parallax-layer layer2" data-speed="0.6">
          <div class="parallax-element">速度 0.6</div>
        </div>
        <div class="parallax-layer layer3" data-speed="1.5">
          <div class="parallax-element">速度 1.5</div>
        </div>
        <div class="parallax-layer layer4" data-speed="-0.3">
          <div class="parallax-element">速度 -0.3</div>
        </div>
      </div>
    </section>
    
    <!-- 控制面板区域 -->
    <section class="section controls">
      <h2>动态控制</h2>
      <p>使用这些控件动态控制平滑滚动行为</p>
      
      <div class="control-panel">
        <div class="control-group">
          <label for="smooth-slider">平滑程度: <span id="smooth-value">1.5</span></label>
          <input type="range" id="smooth-slider" min="0" max="5" step="0.1" value="1.5">
        </div>
        
        <div class="control-group">
          <button id="pause-btn">暂停平滑</button>
          <button id="resume-btn">恢复平滑</button>
        </div>
        
        <div class="control-group">
          <button id="scroll-top">滚动到顶部</button>
          <button id="scroll-bottom">滚动到底部</button>
        </div>
      </div>
      
      <!-- 状态显示 -->
      <div id="status-display" class="status">
        <div>当前速度: <span id="velocity-value">0</span></div>
        <div>滚动位置: <span id="scroll-position">0</span></div>
        <div>状态: <span id="status-text">正常</span></div>
      </div>
    </section>
    
    <!-- 页脚 -->
    <footer>
      <p>高级ScrollSmoother功能示例</p>
    </footer>
  </div>
</div>`;

// 定义初始CSS，设置高级效果的样式
const initialCss = `/* 基础样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  color: #333;
  line-height: 1.6;
}

/* ScrollSmoother必要样式 */
#smooth-wrapper {
  overflow: hidden;
}

/* 主要部分样式 */
header {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: linear-gradient(135deg, #6366f1, #a855f7);
  color: white;
  padding: 20px;
}

.section {
  min-height: 100vh;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

h2 {
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
  color: #333;
}

p {
  font-size: 1.2rem;
  max-width: 700px;
  margin-bottom: 1.5rem;
  text-align: center;
}

/* 自定义平滑度区域 */
.speed-control {
  background-color: #f0f9ff;
}

.box {
  width: 200px;
  height: 200px;
  background-color: #6366f1;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  margin: 2rem 0;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

/* 视差效果区域 */
.parallax-section {
  background-color: #faf5ff;
  overflow: hidden;
}

.parallax-container {
  position: relative;
  width: 100%;
  height: 400px;
  max-width: 800px;
  margin: 0 auto;
}

.parallax-layer {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.parallax-element {
  padding: 20px;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.layer1 .parallax-element {
  background-color: #6366f1;
  transform: translateX(-100px);
}

.layer2 .parallax-element {
  background-color: #8b5cf6;
  transform: translateX(100px) translateY(-50px);
}

.layer3 .parallax-element {
  background-color: #a855f7;
  transform: translateY(80px);
}

.layer4 .parallax-element {
  background-color: #d946ef;
  transform: translateX(-80px) translateY(30px);
}

/* 控制面板区域 */
.controls {
  background-color: #f8fafc;
}

.control-panel {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 500px;
  margin: 2rem 0;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.control-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

input[type="range"] {
  flex: 1;
  height: 8px;
}

button {
  padding: 10px 15px;
  background-color: #6366f1;
  border: none;
  border-radius: 6px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #4f46e5;
}

/* 状态显示区域 */
.status {
  margin-top: 30px;
  padding: 15px 20px;
  background-color: #334155;
  color: white;
  border-radius: 8px;
  font-family: monospace;
  width: 100%;
  max-width: 500px;
}

/* 页脚 */
footer {
  background-color: #1e293b;
  color: white;
  padding: 40px 20px;
  text-align: center;
}`;

// 定义初始JS，实现ScrollSmoother高级功能
const initialJs = `// 注册必要插件
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// 创建ScrollSmoother实例
let smoother = ScrollSmoother.create({
  // 必需的容器设置
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  
  // 默认平滑值
  smooth: 1.5,
  
  // 启用视差效果支持
  effects: true,
  
  // 根据滚动方向使用不同的平滑值
  smoothTouch: 0.1,
  
  // 监听滚动事件
  onUpdate: self => {
    // 更新状态显示
    updateStatusDisplay(self);
  },
  
  // 滚动完成后的回调
  onStop: () => {
    document.getElementById("status-text").textContent = "静止";
    setTimeout(() => {
      document.getElementById("status-text").textContent = "正常";
    }, 1000);
  }
});

// 高级功能1：使用effects方法创建视差效果
// 为所有带data-speed属性的元素自动添加视差效果
gsap.utils.toArray("[data-speed]").forEach(layer => {
  const speed = parseFloat(layer.getAttribute("data-speed"));
  // 使用effects方法简化视差创建过程
  smoother.effects(layer, { speed });
});

// 高级功能2：为特定区域设置不同的平滑度
// 使用中间件功能修改平滑滚动行为
const originalSmoothFunc = smoother.scrollFunc;
smoother.scrollFunc = (position, forceOnly) => {
  // 获取速度控制区域位置
  const section = document.querySelector(".speed-control");
  const rect = section.getBoundingClientRect();
  const sectionTop = window.scrollY + rect.top;
  const sectionBottom = sectionTop + rect.height;
  
  // 检查当前滚动位置是否在特定区域
  if (position > sectionTop && position < sectionBottom) {
    // 区域内使用不同的平滑度
    const originalSmooth = smoother.vars.smooth;
    
    // 检测滚动方向
    const direction = smoother.scrollDirection === -1 ? "up" : "down";
    
    // 根据方向使用不同平滑度
    if (direction === "down") {
      smoother.vars.smooth = 3; // 向下滚动更平滑
    } else {
      smoother.vars.smooth = 0.5; // 向上滚动更快
    }
    
    // 调用原始函数
    originalSmoothFunc(position, forceOnly);
    
    // 恢复原始平滑度
    smoother.vars.smooth = originalSmooth;
  } else {
    // 区域外使用默认平滑度
    originalSmoothFunc(position, forceOnly);
  }
};

// 高级功能3：动态控制平滑滚动

// 平滑度滑块控制
const smoothSlider = document.getElementById("smooth-slider");
const smoothValue = document.getElementById("smooth-value");

smoothSlider.addEventListener("input", function() {
  const value = parseFloat(this.value);
  smoothValue.textContent = value.toFixed(1);
  
  // 使用smoothTo方法平滑过渡到新的平滑度
  smoother.smoothTo(value, 0.5); // 0.5秒过渡
});

// 暂停和恢复按钮
document.getElementById("pause-btn").addEventListener("click", function() {
  smoother.paused(true); // 暂停平滑滚动
  document.getElementById("status-text").textContent = "已暂停";
});

document.getElementById("resume-btn").addEventListener("click", function() {
  smoother.paused(false); // 恢复平滑滚动
  document.getElementById("status-text").textContent = "已恢复";
});

// 滚动控制按钮
document.getElementById("scroll-top").addEventListener("click", function() {
  smoother.scrollTo(0, 0.8); // 平滑滚动到顶部，0.8秒
});

document.getElementById("scroll-bottom").addEventListener("click", function() {
  smoother.scrollTo("footer", 1.2); // 平滑滚动到底部，1.2秒
});

// 更新状态显示
function updateStatusDisplay(self) {
  const velocity = self.getVelocity().toFixed(1);
  const position = self.scrollTop().toFixed(0);
  
  document.getElementById("velocity-value").textContent = velocity;
  document.getElementById("scroll-position").textContent = position;
  
  // 根据速度更新状态
  if (Math.abs(velocity) > 100) {
    document.getElementById("status-text").textContent = "快速滚动";
  } else if (Math.abs(velocity) > 0) {
    document.getElementById("status-text").textContent = "正常";
  }
}

// 添加一些视觉效果
gsap.to(".smooth-box", {
  rotation: 360,
  duration: 1,
  repeat: -1,
  ease: "none",
  paused: true
});

// 当滚动到视线内时启动旋转
ScrollTrigger.create({
  trigger: ".smooth-box",
  start: "top center",
  end: "bottom center",
  scroller: "#smooth-wrapper", // 关键参数
  onEnter: () => gsap.getById(".smooth-box")?.play(),
  onLeave: () => gsap.getById(".smooth-box")?.pause(),
  onEnterBack: () => gsap.getById(".smooth-box")?.play(),
  onLeaveBack: () => gsap.getById(".smooth-box")?.pause()
});`;
</script>

<style scoped>
.scrollsmoother-advanced-demo {
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

.tip, .info {
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 6px;
}

.tip {
  background-color: #e3f2fd;
  border-left: 4px solid #2196f3;
}

.info {
  background-color: #e8f5e9;
  border-left: 4px solid #4caf50;
}

pre {
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
  margin: 1rem 0;
}

code {
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
}

h4 {
  margin: 1.5rem 0 0.5rem 0;
}
</style> 