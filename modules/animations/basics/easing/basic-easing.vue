<template>
  <GsapEditor 
    title="基本缓动函数对比"
    :initialHtml="htmlCode"
    :initialCss="cssCode"
    :initialJs="jsCode"
  />
</template>

<script setup>
const htmlCode = `<div class='container'>
  <div class='easing-row'>
    <div class='label'>none (线性)</div>
    <div class='box box1'></div>
  </div>
  <div class='easing-row'>
    <div class='label'>power1.out (缓出)</div>
    <div class='box box2'></div>
  </div>
  <div class='easing-row'>
    <div class='label'>power1.in (缓入)</div>
    <div class='box box3'></div>
  </div>
  <div class='easing-row'>
    <div class='label'>power1.inOut (缓入缓出)</div>
    <div class='box box4'></div>
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
.easing-row {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  height: 40px;
}
.label {
  width: 180px;
  font-size: 14px;
}
.box {
  width: 50px;
  height: 30px;
  background-color: #3498db;
  border-radius: 4px;
}
.controls {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}
button {
  padding: 8px 15px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #e0e0e0;
}`;

const jsCode = `// 创建动画
let animation;
function createAnimation() {
  // 重置所有方块位置
  gsap.set('.box', { x: 0 });
  
  // 创建主时间轴
  animation = gsap.timeline();
  
  // 添加各种缓动函数的动画
  animation.to('.box1', { x: 250, duration: 2, ease: "none" })
         .to('.box2', { x: 250, duration: 2, ease: "power1.out" }, 0)
         .to('.box3', { x: 250, duration: 2, ease: "power1.in" }, 0)
         .to('.box4', { x: 250, duration: 2, ease: "power1.inOut" }, 0);
  
  return animation;
}
// 初始化动画
createAnimation();
// 添加控制按钮事件
document.getElementById('play-btn').onclick = () => createAnimation().play(0);
document.getElementById('reset-btn').onclick = () => {
  if (animation) animation.kill();
  gsap.set('.box', { x: 0 });
};`;
</script> 