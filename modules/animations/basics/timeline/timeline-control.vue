<template>
  <GsapEditor 
    title="时间轴控制示例"
    :initialHtml="htmlCode"
    :initialCss="cssCode"
    :initialJs="jsCode"
  />
</template>

<script setup>
const htmlCode = `<div class="control-demo">
  <div class="timeline-visual">
    <div class="timeline-track">
      <div id="timeline-progress"></div>
    </div>
    <div id="timeline-head"></div>
  </div>
  <div class="animation-container">
    <div class="animated-box"></div>
  </div>
  <div class="controls">
    <div class="control-buttons">
      <button id="play-btn">播放</button>
      <button id="pause-btn">暂停</button>
      <button id="reverse-btn">反向</button>
      <button id="restart-btn">重播</button>
    </div>
    <div class="speed-control">
      <span>速度：</span>
      <button id="speed-half">0.5x</button>
      <button id="speed-normal">1x</button>
      <button id="speed-double">2x</button>
    </div>
    <div class="progress-control">
      <span>进度：</span>
      <button id="progress-start">开始</button>
      <button id="progress-25">25%</button>
      <button id="progress-50">50%</button>
      <button id="progress-75">75%</button>
      <button id="progress-end">结束</button>
    </div>
  </div>
</div>`;

const cssCode = `.control-demo {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}
.timeline-visual {
  position: relative;
  height: 40px;
  margin-bottom: 10px;
}
.timeline-track {
  position: absolute;
  top: 19px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #ddd;
  border-radius: 1px;
}
#timeline-progress {
  position: absolute;
  height: 100%;
  width: 0%;
  background-color: #9b59b6;
  border-radius: 1px;
}
#timeline-head {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #9b59b6;
  border-radius: 50%;
  top: 15px;
  left: 0;
  transform: translateX(-50%);
}
.animation-container {
  height: 120px;
  background-color: #f8f9fa;
  border-radius: 8px;
  position: relative;
  margin-bottom: 15px;
  overflow: hidden;
}
.animated-box {
  width: 100px;
  height: 50px;
  background-color: #3498db;
  border-radius: 6px;
  position: absolute;
  top: 50%;
  left: 10%;
  transform: translateY(-50%);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}
.controls {
  margin-top: 15px;
}
.control-buttons, .speed-control, .progress-control {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 10px;
  align-items: center;
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
}
.speed-control span, .progress-control span {
  font-size: 13px;
  color: #666;
}`;

const jsCode = `// 创建一个复杂的时间轴动画
const tl = gsap.timeline({
  paused: true, // 创建时不自动播放
  onUpdate: updateTimelineVisual // 每次更新时调用此函数
});

// 添加动画序列
tl.to(".animated-box", {
  x: "400%", // 移动到容器右侧
  duration: 2,
  ease: "power1.inOut"
})
.to(".animated-box", {
  backgroundColor: "#e74c3c", // 变色
  borderRadius: "50%", // 变为圆形
  duration: 1
})
.to(".animated-box", {
  y: "70%", // 向下移动
  scale: 1.5, // 放大
  duration: 1.5,
  ease: "elastic.out(1, 0.3)"
})
.to(".animated-box", {
  rotation: 360, // 旋转一圈
  duration: 1.5,
  ease: "power2.inOut"
});

// 控制按钮功能
document.getElementById("play-btn").addEventListener("click", () => tl.play());
document.getElementById("pause-btn").addEventListener("click", () => tl.pause());
document.getElementById("reverse-btn").addEventListener("click", () => tl.reverse());
document.getElementById("restart-btn").addEventListener("click", () => tl.restart());

// 速度控制
document.getElementById("speed-half").addEventListener("click", () => tl.timeScale(0.5));
document.getElementById("speed-normal").addEventListener("click", () => tl.timeScale(1));
document.getElementById("speed-double").addEventListener("click", () => tl.timeScale(2));

// 进度控制
document.getElementById("progress-start").addEventListener("click", () => tl.progress(0));
document.getElementById("progress-25").addEventListener("click", () => tl.progress(0.25));
document.getElementById("progress-50").addEventListener("click", () => tl.progress(0.5));
document.getElementById("progress-75").addEventListener("click", () => tl.progress(0.75));
document.getElementById("progress-end").addEventListener("click", () => tl.progress(1));

// 更新时间轴可视化
function updateTimelineVisual() {
  // 更新进度条和头部位置
  const progress = tl.progress() * 100;
  document.getElementById("timeline-progress").style.width = progress + "%";
  document.getElementById("timeline-head").style.left = progress + "%";
}`;
</script> 