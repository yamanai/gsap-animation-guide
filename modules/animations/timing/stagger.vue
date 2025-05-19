<template>
  <GsapEditor 
    title="交错动画示例"
    :initialHtml="htmlCode"
    :initialCss="cssCode"
    :initialJs="jsCode"
  />
</template>

<script setup>
const htmlCode = `<div class='container'>
  <div class='stagger-demo'>
    <div class='stagger-item'></div>
    <div class='stagger-item'></div>
    <div class='stagger-item'></div>
    <div class='stagger-item'></div>
    <div class='stagger-item'></div>
    <div class='stagger-item'></div>
    <div class='stagger-item'></div>
    <div class='stagger-item'></div>
  </div>
  <div class='controls'>
    <button id='simple-stagger'>基本交错</button>
    <button id='from-center'>从中间开始</button>
    <button id='from-edges'>从边缘开始</button>
    <button id='random'>随机交错</button>
  </div>
</div>`;

const cssCode = `.container {
  width: 100%;
  max-width: 400px;
  margin: 20px auto;
}
.stagger-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  margin-bottom: 20px;
}
.stagger-item {
  width: 50px;
  height: 50px;
  background-color: #3498db;
  border-radius: 6px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}
.controls {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
}
button {
  padding: 6px 10px;
  border: none;
  background-color: #f0f0f0;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
}
button:hover {
  background-color: #e0e0e0;
}`;

const jsCode = `// 重置所有盒子
const resetBoxes = () => {
  gsap.set('.stagger-item', {
    y: 0,
    opacity: 1,
    scale: 1,
    backgroundColor: '#3498db'
  });
};
// 基本交错
document.getElementById('simple-stagger').onclick = () => {
  resetBoxes();
  gsap.to('.stagger-item', {
    y: 40,
    opacity: 0.5,
    scale: 0.8,
    backgroundColor: '#e74c3c',
    stagger: 0.1 // 每个元素延迟0.1秒
  });
};
// 从中间开始向两边
document.getElementById('from-center').onclick = () => {
  resetBoxes();
  gsap.to('.stagger-item', {
    y: 40,
    scale: 0.8,
    backgroundColor: '#2ecc71',
    stagger: {
      amount: 0.5, // 总交错时间
      from: 'center' // 从中间开始
    }
  });
};
// 从边缘开始向中间
document.getElementById('from-edges').onclick = () => {
  resetBoxes();
  gsap.to('.stagger-item', {
    y: 40,
    scale: 0.8,
    backgroundColor: '#f39c12',
    stagger: {
      amount: 0.5,
      from: 'edges' // 从边缘开始
    }
  });
};
// 随机顺序
document.getElementById('random').onclick = () => {
  resetBoxes();
  gsap.to('.stagger-item', {
    y: 40,
    rotation: 360,
    backgroundColor: '#9b59b6',
    stagger: {
      amount: 0.5,
      from: 'random' // 随机顺序
    }
  });
};`;
</script> 