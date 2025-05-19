<template>
  <GsapEditor 
    title="带参数的回调函数"
    :initialHtml="htmlCode"
    :initialCss="cssCode"
    :initialJs="jsCode"
  />
</template>

<script setup>
const htmlCode = `<div class='container'>
  <div class='animation-area'>
    <div class='box' id='box1'>盒子1</div>
    <div class='box' id='box2'>盒子2</div>
    <div class='box' id='box3'>盒子3</div>
  </div>
  <div class='log-area'>
    <div class='log-header'>参数传递演示:</div>
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
#box1 { top: 20px; }
#box2 { top: 70px; }
#box3 { top: 120px; }
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

// 自定义回调函数，将接收传入的参数
function handleComplete(element, index, tween) {
  // 元素是第一个传入的参数
  const id = element.id;
  // 索引是第二个传入的参数
  const position = index + 1;
  // tween是GSAP传入的动画实例，可以获取动画相关信息
  const duration = tween.duration();
  
  addLog(\`✨ 元素 \${id} (位置#\${position}) 的动画完成！持续时间: \${duration}秒\`);
  
  // 改变元素的背景色，证明我们可以操作传入的元素
  gsap.to(element, {
    backgroundColor: '#2ecc71',
    scale: 1.1,
    duration: 0.3
  });
}

// 创建动画序列
let animation;
function createAnimation() {
  // 重置元素位置和日志
  gsap.set('.box', { 
    x: 0, 
    backgroundColor: '#3498db', 
    scale: 1 
  });
  clearLog();
  
  // 创建时间轴
  animation = gsap.timeline();
  
  // 为每个盒子创建动画，并传递参数到回调
  animation.to('#box1', {
    x: 380,
    duration: 1.5,
    onComplete: handleComplete,
    // 传递参数给onComplete回调
    onCompleteParams: [document.getElementById('box1'), 0]
  })
  .to('#box2', {
    x: 380,
    duration: 1,
    onComplete: handleComplete,
    onCompleteParams: [document.getElementById('box2'), 1]
  })
  .to('#box3', {
    x: 380,
    duration: 0.5,
    onComplete: handleComplete,
    onCompleteParams: [document.getElementById('box3'), 2]
  });
  
  addLog('▶️ 动画序列开始播放');
  
  return animation;
}

// 添加按钮控制
document.getElementById('play-btn').onclick = function() {
  createAnimation();
};
document.getElementById('reset-btn').onclick = function() {
  if (animation) animation.kill();
  gsap.set('.box', { 
    x: 0, 
    backgroundColor: '#3498db', 
    scale: 1 
  });
  clearLog();
};`;
</script> 