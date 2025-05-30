<template>
  <GsapEditor 
    title="时间轴相对位置标记演示"
    :initialHtml="htmlCode"
    :initialCss="cssCode"
    :initialJs="jsCode"
  />
</template>

<script setup>
const htmlCode = `<div class='container'>
  <div class='timeline-box box1'>默认顺序</div>
  <div class='timeline-box box2'>同时开始 <</div>
  <div class='timeline-box box3'>延迟 +=0.5</div>
  <div class='timeline-box box4'>提前 -=0.5</div>
  <div class='controls'>
    <button id='play-timeline'>播放时间轴</button>
    <button id='reset-timeline'>重置</button>
  </div>
</div>`;

const cssCode = `.container {
  width: 100%;
  max-width: 400px;
  margin: 20px auto;
  position: relative;
  height: 200px;
}
.timeline-box {
  width: 140px;
  height: 40px;
  position: absolute;
  left: 0;
  padding: 0 10px;
  background-color: #3498db;
  color: white;
  font-size: 13px;
  display: flex;
  align-items: center;
  border-radius: 6px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.15);
}
.box1 { top: 0; background-color: #e74c3c; }
.box2 { top: 45px; background-color: #2ecc71; }
.box3 { top: 90px; background-color: #f39c12; }
.box4 { top: 135px; background-color: #9b59b6; }
.controls {
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  gap: 10px;
}
button {
  padding: 6px 12px;
  border: none;
  background-color: #f0f0f0;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}
button:hover {
  background-color: #e0e0e0;
}`;

const jsCode = `// 创建时间轴实例
let tl;
// 重置函数
function resetTimeline() {
  // 如果时间轴存在，则杀死它
  if (tl) tl.kill();
  // 重置所有元素位置
  gsap.set('.timeline-box', { x: 0, opacity: 1 });
  // 创建新的时间轴
  tl = gsap.timeline({ paused: true });
  // 添加动画序列，使用不同的相对位置标记
  tl.to('.box1', { x: 220, duration: 1 })
    .to('.box2', { x: 220, duration: 1 }, '<') // 与前一动画同时开始
    .to('.box3', { x: 220, duration: 1 }, '+=0.5') // 延迟0.5秒
    .to('.box4', { x: 220, duration: 1 }, '-=0.5'); // 提前0.5秒
}
// 初始化时间轴
resetTimeline();
// 添加按钮事件
document.getElementById('play-timeline').onclick = () => tl.play(0);
document.getElementById('reset-timeline').onclick = resetTimeline;`;
</script> 