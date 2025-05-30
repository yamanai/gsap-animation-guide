<template>
  <GsapEditor 
    title="自定义缓动函数"
    :initialHtml="htmlCode"
    :initialCss="cssCode"
    :initialJs="jsCode"
  />
</template>

<script setup>
const htmlCode = `<div class='container'>
  <div class='demo-area'>
    <div class='box standard-box'>标准缓动</div>
    <div class='box custom-box'>自定义缓动</div>
  </div>
  <div class='controls'>
    <button id='play-btn'>播放动画</button>
    <button id='reset-btn'>重置</button>
  </div>
  <div class='description'>
    <h3>自定义函数说明：</h3>
    <pre id='code-display'>
// 自定义缓动函数 - "弹跳后停顿"
function customBounceWithPause(progress) {
  // 前70%时间使用弹跳效果
  if (progress < 0.7) {
    return gsap.parseEase("bounce.out")(progress / 0.7);
  } 
  // 后30%时间几乎停顿
  else {
    return 0.95 + (progress - 0.7) * 0.16;
  }
}</pre>
  </div>
</div>`;

const cssCode = `.container {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}
.demo-area {
  height: 300px;
  position: relative;
  background-color: #f8f8f8;
  border-radius: 8px;
  margin-bottom: 15px;
  overflow: hidden;
}
.box {
  width: 100px;
  height: 60px;
  background-color: #3498db;
  position: absolute;
  left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border-radius: 6px;
  font-size: 14px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.2);
  text-align: center;
}
.standard-box {
  top: 50px;
  background-color: #e74c3c;
}
.custom-box {
  top: 150px;
  background-color: #9b59b6;
}
.controls {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
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
}
.description {
  background-color: #f8f8f8;
  padding: 15px;
  border-radius: 6px;
  margin-top: 20px;
}
h3 {
  margin: 0 0 10px 0;
  font-size: 16px;
}
pre {
  margin: 0;
  white-space: pre-wrap;
  font-size: 13px;
  color: #333;
  font-family: monospace;
  line-height: 1.5;
}`;

const jsCode = `// 自定义缓动函数 - "弹跳后停顿"
function customBounceWithPause(progress) {
  // 前70%时间使用弹跳效果
  if (progress < 0.7) {
    return gsap.parseEase("bounce.out")(progress / 0.7);
  } 
  // 后30%时间几乎停顿
  else {
    return 0.95 + (progress - 0.7) * 0.16;
  }
}
// 注册自定义缓动函数
gsap.registerEase("customBounce", customBounceWithPause);
// 创建动画
let animation;
function createAnimation() {
  // 重置所有方块位置
  gsap.set('.box', { x: 0 });
  
  // 创建主时间轴
  animation = gsap.timeline();
  
  // 添加动画
  animation.to('.standard-box', { 
    x: 350, 
    duration: 3, 
    ease: "bounce.out" 
  }, 0)
  .to('.custom-box', { 
    x: 350, 
    duration: 3, 
    ease: "customBounce" 
  }, 0);
  
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