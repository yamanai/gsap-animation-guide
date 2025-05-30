<template>
  <GsapEditor 
    title="回调函数演示"
    :initialHtml="htmlCode"
    :initialCss="cssCode"
    :initialJs="jsCode"
  />
</template>

<script setup>
const htmlCode = `<div class='container'>
  <div class='animation-area'>
    <div class='animation-box'></div>
  </div>
  <div class='event-log'>
    <div class='log-header'>动画事件日志：</div>
    <div id='event-list' class='event-list'></div>
  </div>
  <div class='controls'>
    <button id='play-btn'>播放动画</button>
    <button id='play-repeat-btn'>播放(重复2次)</button>
    <button id='reset-btn'>重置</button>
  </div>
</div>`;

const cssCode = `.container {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}
.animation-area {
  height: 150px;
  background-color: rgba(0,0,0,0.03);
  border-radius: 8px;
  position: relative;
  overflow: hidden;
}
.animation-box {
  width: 120px;
  height: 120px;
  background-color: #3498db;
  border-radius: 8px;
  position: absolute;
  top: 15px;
  left: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}
.event-log {
  margin-top: 15px;
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 10px;
  height: 120px;
  overflow-y: auto;
}
.log-header {
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
}
.event-list {
  font-family: monospace;
  font-size: 13px;
}
.event-item {
  padding: 3px 0;
  border-bottom: 1px dashed #eee;
}
.event-start { color: #2ecc71; }
.event-update { color: #3498db; }
.event-complete { color: #9b59b6; }
.event-repeat { color: #f39c12; }
.controls {
  margin-top: 15px;
  display: flex;
  gap: 10px;
}
button {
  padding: 8px 15px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}
button:hover {
  background-color: #e0e0e0;
}`;

const jsCode = `const eventList = document.getElementById('event-list');
let updateCount = 0;
let animation;

function addLog(type, message) {
  const item = document.createElement('div');
  item.className = 'event-item event-' + type;
  item.textContent = message;
  eventList.appendChild(item);
  eventList.scrollTop = eventList.scrollHeight;
}

function resetAnimation() {
  if (animation) animation.kill();
  gsap.set('.animation-box', { x: 0, backgroundColor: '#3498db', scale: 1 });
  eventList.innerHTML = '';
  updateCount = 0;
}

function createAnimation(repeat = 0) {
  resetAnimation();
  animation = gsap.to('.animation-box', {
    x: 300,
    backgroundColor: '#ff6b6b',
    scale: 1.2,
    duration: 2,
    repeat: repeat,
    yoyo: true,
    ease: 'power1.inOut',
    onStart: function() { addLog('start', '✅ onStart: 动画开始执行'); },
    onUpdate: function() {
      const progress = Math.round(this.progress() * 100);
      if (progress % 10 === 0 && progress !== updateCount) {
        updateCount = progress;
        addLog('update', \`🔄 onUpdate: 进度 \${progress}%\`);
      }
    },
    onRepeat: function() { addLog('repeat', '🔁 onRepeat: 动画重复播放'); },
    onComplete: function() { addLog('complete', '✨ onComplete: 动画完成'); }
  });
  return animation;
}

document.getElementById('play-btn').onclick = () => createAnimation();
document.getElementById('play-repeat-btn').onclick = () => createAnimation(2);
document.getElementById('reset-btn').onclick = resetAnimation;`;
</script> 