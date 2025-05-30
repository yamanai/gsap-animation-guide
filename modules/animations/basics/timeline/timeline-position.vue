<template>
  <GsapEditor 
    title="时间轴位置控制示例"
    :initialHtml="htmlCode"
    :initialCss="cssCode"
    :initialJs="jsCode"
  />
</template>

<script setup>
const htmlCode = `<div class="position-demo">
  <div class="timeline">
    <div class="timeline-track"></div>
    <div class="timeline-marker start">开始</div>
    <div class="timeline-marker position-a">位置A</div>
    <div class="timeline-marker position-b">位置B</div>
    <div class="timeline-marker position-c">位置C</div>
    <div class="timeline-marker end">结束</div>
  </div>
  <div class="animation-container">
    <div class="box box1">元素1</div>
    <div class="box box2">元素2</div>
    <div class="box box3">元素3</div>
  </div>
  <div class="controls">
    <button id="restart-btn">重播</button>
  </div>
</div>`;

const cssCode = `.position-demo {
  width: 100%;
  padding: 10px;
}
.timeline {
  position: relative;
  height: 50px;
  margin-bottom: 20px;
}
.timeline-track {
  position: absolute;
  top: 25px;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: #ddd;
  border-radius: 2px;
}
.timeline-marker {
  position: absolute;
  top: 10px;
  padding: 3px 8px;
  background-color: #9b59b6;
  color: white;
  border-radius: 4px;
  font-size: 12px;
  transform: translateX(-50%);
}
.start { left: 0%; }
.position-a { left: 25%; }
.position-b { left: 50%; }
.position-c { left: 75%; }
.end { left: 100%; }
.animation-container {
  position: relative;
  height: 180px;
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
  opacity: 0;
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
}
.controls {
  margin-top: 10px;
  text-align: right;
}
#restart-btn {
  padding: 5px 15px;
  background-color: #9b59b6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}`;

const jsCode = `// 创建一个时间轴
const tl = gsap.timeline();

// 在不同位置添加动画
tl.to(".box1", {
  opacity: 1,
  x: 100,
  duration: 1
}, 0) // 在时间轴开始处 (0秒)
.to(".box2", {
  opacity: 1,
  x: 200,
  duration: 1
}, 1) // 在时间轴的1秒处
.to(".box3", {
  opacity: 1,
  x: 300,
  scale: 1.2,
  duration: 1.5
}, "-=0.5"); // 在前一个动画结束前0.5秒开始

// 添加标记点动画，使其在对应时间显示活跃状态
tl.to(".position-a", { backgroundColor: "#f39c12", scale: 1.2, duration: 0.3 }, 0)
  .to(".position-a", { backgroundColor: "#9b59b6", scale: 1, duration: 0.3 }, 0.5)
  .to(".position-b", { backgroundColor: "#f39c12", scale: 1.2, duration: 0.3 }, 1)
  .to(".position-b", { backgroundColor: "#9b59b6", scale: 1, duration: 0.3 }, 1.5)
  .to(".position-c", { backgroundColor: "#f39c12", scale: 1.2, duration: 0.3 }, 1.5)
  .to(".position-c", { backgroundColor: "#9b59b6", scale: 1, duration: 0.3 }, 2);

// 添加重播功能
document.getElementById("restart-btn").addEventListener("click", () => {
  tl.restart();
});`;
</script> 