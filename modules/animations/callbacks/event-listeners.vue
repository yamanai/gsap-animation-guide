<template>
  <GsapEditor 
    title="全局事件监听"
    :initialHtml="htmlCode"
    :initialCss="cssCode"
    :initialJs="jsCode"
  />
</template>

<script setup>
const htmlCode = `<div class='container'>
  <div class='animation-area'>
    <div class='box box1'>盒子1</div>
    <div class='box box2'>盒子2</div>
    <div class='box box3'>盒子3</div>
  </div>
  <div class='log-area'>
    <div class='log-header'>全局事件监听:</div>
    <div id='log-output' class='log-output'></div>
  </div>
  <div class='controls'>
    <button id='play-btn'>播放动画</button>
    <button id='reset-btn'>重置</button>
  </div>
</div>`;

const cssCode = `.container {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}
.animation-area {
  height: 150px;
  position: relative;
  background-color: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 15px;
}
.box {
  width: 80px;
  height: 40px;
  background-color: #3498db;
  border-radius: 6px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  left: 20px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.2);
}
.box1 { top: 20px; background-color: #e74c3c; }
.box2 { top: 70px; background-color: #3498db; }
.box3 { top: 120px; background-color: #2ecc71; }
.log-area {
  background-color: #f0f0f0;
  border-radius: 6px;
  padding: 10px;
  height: 150px;
  margin-bottom: 15px;
  overflow-y: auto;
}
.log-header {
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
}
.log-output {
  font-family: monospace;
  font-size: 13px;
  line-height: 1.5;
}
.log-entry {
  padding: 3px 0;
  border-bottom: 1px solid #e0e0e0;
}
.controls {
  display: flex;
  gap: 10px;
}
button {
  padding: 8px 15px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}
button:hover {
  background-color: #e0e0e0;
}`;

const jsCode = `// 获取日志输出区域
const logOutput = document.getElementById('log-output');

// 添加日志函数
function addLog(message) {
  const entry = document.createElement('div');
  entry.className = 'log-entry';
  entry.textContent = message;
  logOutput.appendChild(entry);
  logOutput.scrollTop = logOutput.scrollHeight;
}

// 清空日志
function clearLog() {
  logOutput.innerHTML = '';
}

// 重置动画
function resetAnimation() {
  gsap.killTweensOf('.box');
  gsap.set('.box', { 
    x: 0,
    scale: 1
  });
  clearLog();
  
  // 移除全局事件监听
  gsap.ticker.remove(tickerCallback);
  
  // 在实际项目中应该记录并移除之前添加的所有事件监听器
  // 这里为了简单起见，我们直接从头设置事件监听
  setupGlobalListeners();
  
  addLog("🔄 已重置动画和日志");
}

// 设置全局事件监听函数
function setupGlobalListeners() {
  addLog("🔔 设置全局事件监听...");
  
  // 监听所有动画的启动事件
  gsap.globalTimeline.addEventListener("start", function(e) {
    const target = e.target.targets()[0];
    const targetClass = target ? target.className : "未知目标";
    addLog(\`📢 事件: 动画开始 - 目标: \${targetClass}\`);
  });
  
  // 监听所有动画的完成事件
  gsap.globalTimeline.addEventListener("complete", function(e) {
    const target = e.target.targets()[0];
    const targetClass = target ? target.className : "未知目标";
    addLog(\`✅ 事件: 动画完成 - 目标: \${targetClass}\`);
  });
}

// 创建ticker回调函数（动画引擎每帧调用）
let tickCount = 0;
const tickerCallback = function() {
  // 避免输出过多日志，每30帧输出一次
  if (tickCount % 30 === 0) {
    addLog(\`⏱️ Ticker: 帧 #\${tickCount}\`);
  }
  tickCount++;
};

// 创建动画序列
let animation;
function createAnimation() {
  resetAnimation();
  
  // 添加ticker监听（每帧调用）
  gsap.ticker.add(tickerCallback);
  addLog("⏱️ 已添加ticker监听");
  
  // 创建时间轴
  animation = gsap.timeline();
  
  // 添加动画序列
  animation.to('.box1', {
    x: 380,
    duration: 2
  })
  .to('.box2', {
    x: 380,
    duration: 1.5
  })
  .to('.box3', {
    x: 380,
    duration: 1
  });
  
  addLog("▶️ 动画序列开始播放");
  
  return animation;
}

// 初始化设置全局监听器
setupGlobalListeners();

// 添加按钮控制
document.getElementById('play-btn').onclick = function() {
  createAnimation();
};

document.getElementById('reset-btn').onclick = resetAnimation;`;
</script> 