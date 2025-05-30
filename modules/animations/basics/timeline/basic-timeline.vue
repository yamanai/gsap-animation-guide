<template>
  <GsapEditor 
    title="基础时间轴示例"
    :initialHtml="htmlCode"
    :initialCss="cssCode"
    :initialJs="jsCode"
  />
</template>

<script setup>
const htmlCode = `<div class="timeline-demo">
  <div class="box box1">盒子1</div>
  <div class="box box2">盒子2</div>
  <div class="box box3">盒子3</div>
</div>`;

const cssCode = `.timeline-demo {
  position: relative;
  width: 100%;
  height: 200px;
  background-color: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
}
.box {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 50px;
  color: white;
  font-weight: bold;
  border-radius: 6px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}
.box1 {
  background-color: #3498db;
  top: 20px;
  left: 20px;
}
.box2 {
  background-color: #e74c3c;
  top: 80px;
  left: 20px;
}
.box3 {
  background-color: #2ecc71;
  top: 140px;
  left: 20px;
}`;

const jsCode = `// 创建一个新的时间轴
const tl = gsap.timeline();

// 添加一系列动画
tl.to(".box1", {
  x: 250,
  duration: 1,
  ease: "power1.out"
})
.to(".box2", {
  x: 250,
  y: 20,
  duration: 1,
  ease: "power1.inOut"
})
.to(".box3", {
  x: 250,
  rotation: 360,
  duration: 1.5,
  ease: "elastic.out(1, 0.3)"
});

// 添加控制按钮
const demo = document.querySelector('.timeline-demo');
const playBtn = document.createElement('button');
playBtn.textContent = '重播动画';
playBtn.style.position = 'absolute';
playBtn.style.bottom = '10px';
playBtn.style.right = '10px';
playBtn.style.padding = '5px 10px';
playBtn.style.background = '#9b59b6';
playBtn.style.color = 'white';
playBtn.style.border = 'none';
playBtn.style.borderRadius = '4px';
playBtn.style.cursor = 'pointer';
demo.appendChild(playBtn);

playBtn.addEventListener('click', () => {
  tl.restart();
});`;
</script> 