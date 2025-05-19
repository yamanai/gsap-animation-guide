<template>
  <GsapEditor 
    title="动画控制示例"
    :initialHtml="htmlCode"
    :initialCss="cssCode"
    :initialJs="jsCode"
  />
</template>

<script setup>
const htmlCode = `<div class='container'>
  <div class='animation-box'></div>
  <div class='controls'>
    <button id='play-btn'>播放</button>
    <button id='pause-btn'>暂停</button>
    <button id='reverse-btn'>反向</button>
    <button id='restart-btn'>重启</button>
  </div>
  <div class='speed-control'>
    <span>播放速度: </span>
    <button id='speed-half'>0.5x</button>
    <button id='speed-normal'>1x</button>
    <button id='speed-double'>2x</button>
  </div>
</div>`;

const cssCode = `.container {
  width: 100%;
  max-width: 400px;
  margin: 20px auto;
}
.animation-box {
  width: 120px;
  height: 70px;
  background-color: #3498db;
  border-radius: 6px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}
.controls, .speed-control {
  margin-top: 15px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
button {
  padding: 6px 12px;
  border: none;
  background-color: #f0f0f0;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
}
button:hover {
  background-color: #e0e0e0;
}`;

const jsCode = `// 创建一个动画实例并存储它的引用
const animation = gsap.to('.animation-box', {
  x: 200,
  rotation: 360,
  backgroundColor: '#9b59b6',
  duration: 2,
  repeat: -1,
  yoyo: true,
  paused: true // 创建后不立即播放
});
// 按钮控制
document.getElementById('play-btn').onclick = () => animation.play();
document.getElementById('pause-btn').onclick = () => animation.pause();
document.getElementById('reverse-btn').onclick = () => animation.reverse();
document.getElementById('restart-btn').onclick = () => animation.restart();
// 速度控制
document.getElementById('speed-half').onclick = () => animation.timeScale(0.5);
document.getElementById('speed-normal').onclick = () => animation.timeScale(1);
document.getElementById('speed-double').onclick = () => animation.timeScale(2);`;
</script> 