<template>
  <GsapEditor 
    title="嵌套时间轴示例"
    :initialHtml="htmlCode"
    :initialCss="cssCode"
    :initialJs="jsCode"
  />
</template>

<script setup>
const htmlCode = `<div class="nested-demo">
  <div class="scene">
    <div class="main-group">
      <div class="main-item item1">主1</div>
      <div class="main-item item2">主2</div>
      <div class="main-item item3">主3</div>
    </div>
    <div class="sub-group">
      <div class="sub-item sub1">子1</div>
      <div class="sub-item sub2">子2</div>
      <div class="sub-item sub3">子3</div>
    </div>
  </div>
  <div class="controls">
    <button id="play-btn">播放动画</button>
  </div>
</div>`;

const cssCode = `.nested-demo {
  width: 100%;
}
.scene {
  position: relative;
  height: 220px;
  background-color: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 10px;
}
.main-group, .sub-group {
  position: absolute;
  height: 100px;
  width: 100%;
}
.main-group {
  top: 10px;
}
.sub-group {
  top: 120px;
}
.main-item, .sub-item {
  position: absolute;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  border-radius: 8px;
  left: 20px;
  opacity: 0;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}
.main-item {
  background-color: #3498db;
}
.sub-item {
  background-color: #e74c3c;
}
.controls {
  text-align: center;
}
#play-btn {
  padding: 8px 16px;
  background-color: #9b59b6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}`;

const jsCode = `// 创建子时间轴
function createSubTimeline() {
  // 创建一个新的时间轴实例
  const subTimeline = gsap.timeline();
  
  // 为子时间轴添加动画
  subTimeline.to(".sub1", {
    opacity: 1,
    x: 50,
    duration: 0.5
  })
  .to(".sub2", {
    opacity: 1,
    x: 150,
    duration: 0.5
  })
  .to(".sub3", {
    opacity: 1,
    x: 250,
    duration: 0.5
  })
  .to(".sub-item", {
    y: 20,
    stagger: 0.2,
    duration: 0.8,
    ease: "back.out(1.7)"
  });
  
  return subTimeline;
}

// 创建主时间轴
const mainTimeline = gsap.timeline({
  paused: true,  // 创建时不自动播放
  onComplete: function() {
    console.log("整个动画序列完成");
  }
});

// 为主时间轴添加动画
mainTimeline.to(".item1", {
  opacity: 1,
  x: 50,
  duration: 0.7
})
.to(".item2", {
  opacity: 1,
  x: 150,
  duration: 0.7
})
.to(".item3", {
  opacity: 1,
  x: 250,
  duration: 0.7
});

// 在主时间轴的1.5秒位置添加子时间轴
// 可以通过第三个参数设置子时间轴的插入位置
mainTimeline.add(createSubTimeline(), 1.5);

// 为主时间轴添加更多动画
mainTimeline.to(".main-item", {
  backgroundColor: "#2ecc71",
  scale: 1.2,
  stagger: 0.2,
  duration: 0.5
}, "+=0.5");  // 在子时间轴完成后等待0.5秒再执行

// 添加播放按钮功能
document.getElementById("play-btn").addEventListener("click", function() {
  // 重置并播放主时间轴
  mainTimeline.restart();
});`;
</script> 