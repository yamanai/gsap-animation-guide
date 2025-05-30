<template>
  <GsapEditor 
    title="基础时间参数演示"
    :initialHtml="htmlCode"
    :initialCss="cssCode"
    :initialJs="jsCode"
  />
</template>

<script setup>
const htmlCode = `<div class='container'>
  <div class='box box1'>duration: 2</div>
  <div class='box box2'>delay: 1</div>
  <div class='box box3'>repeat: 2</div>
  <div class='box box4'>yoyo: true</div>
</div>`;

const cssCode = `.container {
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.box {
  width: 150px;
  height: 50px;
  background-color: #3498db;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  margin-bottom: 5px;
  box-shadow: 0 3px 8px rgba(0,0,0,0.2);
}`;

const jsCode = `// 基础时间参数示例
// 1. 持续时间
gsap.to('.box1', {
  x: 150,
  duration: 2,
  backgroundColor: '#2ecc71'
});
// 2. 延迟开始
gsap.to('.box2', {
  x: 150,
  delay: 1,
  backgroundColor: '#e74c3c'
});
// 3. 重复动画
gsap.to('.box3', {
  x: 150,
  repeat: 2,
  duration: 0.5,
  backgroundColor: '#f39c12'
});
// 4. 来回播放
gsap.to('.box4', {
  x: 150,
  repeat: 3,
  yoyo: true,
  duration: 0.5,
  backgroundColor: '#9b59b6'
});`;
</script> 