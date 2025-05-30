<template>
  <GsapEditor 
    title="时间轴标签系统演示"
    :initialHtml="htmlCode"
    :initialCss="cssCode"
    :initialJs="jsCode"
  />
</template>

<script setup>
const htmlCode = `<div class='container'>
  <div class='timeline-container'>
    <div class='timeline-box red-box'>方块1</div>
    <div class='timeline-box green-box'>方块2</div>
    <div class='timeline-box blue-box'>方块3</div>
    <div class='label-markers'>
      <div class='label-marker start-label'>开始</div>
      <div class='label-marker middle-label'>中间标签</div>
      <div class='label-marker end-label'>结束标签</div>
    </div>
  </div>
  <div class='controls'>
    <button id='play-all-btn'>完整播放</button>
    <button id='play-from-start'>从开始播放</button>
    <button id='play-from-middle'>从"middle"标签播放</button>
    <button id='play-from-end'>从"end"标签播放</button>
    <button id='reset-btn'>重置</button>
  </div>
</div>`;

const cssCode = `.container {
  width: 100%;
  max-width: 550px;
  margin: 20px auto;
  position: relative;
}
.timeline-container {
  height: 220px;
  position: relative;
  background-color: rgba(0,0,0,0.05);
  border-radius: 8px;
  overflow: hidden;
}
.timeline-box {
  width: 120px;
  height: 80px;
  position: absolute;
  left: 20px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}
.red-box { top: 20px; background-color: #e74c3c; }
.green-box { top: 70px; background-color: #2ecc71; }
.blue-box { top: 120px; background-color: #3498db; }
.label-markers {
  position: absolute;
  height: 30px;
  bottom: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.label-marker {
  padding: 4px 8px;
  background-color: rgba(0,0,0,0.1);
  border-radius: 4px;
  font-size: 12px;
}
.start-label { margin-left: 20px; }
.middle-label { margin-left: 40px; }
.end-label { margin-right: 20px; }
.controls {
  margin-top: 15px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
button {
  padding: 8px 12px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
}
button:hover {
  background-color: #e0e0e0;
}`;

const jsCode = `// 创建一个可重复使用的时间轴
let tl;

// 初始化时间轴函数
function createTimeline() {
  // 如果已存在时间轴，先清除它
  if (tl) tl.kill();
  
  // 重置所有元素位置
  gsap.set('.timeline-box', { x: 0, backgroundColor: '' });
  
  // 创建新的时间轴
  tl = gsap.timeline({ paused: true });
  
  // 添加第一个动画和标签
  tl.addLabel('start')
    .to('.red-box', { 
      x: 380, 
      backgroundColor: '#ff6b6b',
      duration: 2,
      ease: 'power1.inOut' 
    })
    
    // 添加中间标签（在前一动画结束后0.5秒）
    .addLabel('middle', '+=0.5')
    
    // 第二个动画
    .to('.green-box', { 
      x: 380, 
      backgroundColor: '#42b883',
      duration: 1.5,
      ease: 'back.out(1.7)' 
    })
    
    // 添加结束标签
    .addLabel('end')
    
    // 第三个动画
    .to('.blue-box', { 
      x: 380, 
      backgroundColor: '#4a7aff',
      duration: 1,
      ease: 'bounce.out' 
    });
  
  return tl;
}

// 初始化时间轴
createTimeline();

// 添加按钮控制功能
document.getElementById('play-all-btn').onclick = () => {
  // 从头播放完整时间轴
  createTimeline().play(0);
};

document.getElementById('play-from-start').onclick = () => {
  // 从'start'标签开始播放
  createTimeline().play('start');
};

document.getElementById('play-from-middle').onclick = () => {
  // 从'middle'标签开始播放
  createTimeline().play('middle');
};

document.getElementById('play-from-end').onclick = () => {
  // 从'end'标签开始播放
  createTimeline().play('end');
};

document.getElementById('reset-btn').onclick = () => {
  // 重置时间轴和元素
  createTimeline();
};`;
</script> 