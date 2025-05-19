<template>
  <GsapEditor 
    title="基本回调函数演示"
    :initialHtml="htmlCode"
    :initialCss="cssCode"
    :initialJs="jsCode"
  />
</template>

<script setup>
const htmlCode = `<div class='container'>
  <div class='animation-area'>
    <div class='box'></div>
  </div>
  <div class='log-area'>
    <div class='log-header'>回调函数日志:</div>
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
  height: 80px;
  background-color: #3498db;
  border-radius: 6px;
  position: absolute;
  top: 35px;
  left: 20px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.2);
}
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
.log-start { color: #27ae60; }
.log-update { color: #3498db; }
.log-complete { color: #8e44ad; }
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
function addLog(type, message) {
  const entry = document.createElement('div');
  entry.className = 'log-entry log-' + type;
  entry.textContent = message;
  logOutput.appendChild(entry);
  logOutput.scrollTop = logOutput.scrollHeight;
}

// 清空日志
function clearLog() {
  logOutput.innerHTML = '';
}

// 创建动画
let animation;
function createAnimation() {
  // 重置元素位置和日志
  gsap.set('.box', { x: 0, rotation: 0, backgroundColor: '#3498db' });
  clearLog();
  
  // 创建带回调的动画
  animation = gsap.to('.box', {
    x: 380,
    rotation: 360,
    backgroundColor: '#e74c3c',
    duration: 2,
    ease: 'power2.inOut',
    
    // 动画开始时触发
    onStart: function() {
      addLog('start', '✅ onStart: 动画开始执行');
    },
    
    // 动画每次更新时触发（每一帧）
    onUpdate: function() {
      // 获取动画进度百分比
      const progress = Math.round(this.progress() * 100);
      // 只在10%的整数节点添加日志，避免过多输出
      if (progress % 10 === 0 && progress > 0) {
        addLog('update', '🔄 onUpdate: 动画进度 ' + progress + '%');
      }
    },
    
    // 动画完成时触发
    onComplete: function() {
      addLog('complete', '✨ onComplete: 动画完成');
    }
  });
  
  return animation;
}

// 添加按钮控制
document.getElementById('play-btn').onclick = function() {
  createAnimation().play(0);
};
document.getElementById('reset-btn').onclick = function() {
  if (animation) animation.kill();
  gsap.set('.box', { x: 0, rotation: 0, backgroundColor: '#3498db' });
  clearLog();
};`;
</script> 