<template>
  <GsapEditor 
    title="时间轴参数示例"
    :initialHtml="htmlCode"
    :initialCss="cssCode"
    :initialJs="jsCode"
  />
</template>

<script setup>
const htmlCode = `<div class="params-demo">
  <div class="panel">
    <h3>默认时间轴</h3>
    <div class="box-container">
      <div class="box default-box box1">默认1</div>
      <div class="box default-box box2">默认2</div>
      <div class="box default-box box3">默认3</div>
    </div>
    <button class="play-btn" id="play-default">重播</button>
  </div>
  
  <div class="panel">
    <h3>延迟(delay)时间轴</h3>
    <div class="box-container">
      <div class="box delay-box box1">延迟1</div>
      <div class="box delay-box box2">延迟2</div>
      <div class="box delay-box box3">延迟3</div>
    </div>
    <button class="play-btn" id="play-delay">重播</button>
  </div>
  
  <div class="panel">
    <h3>重复(repeat)时间轴</h3>
    <div class="box-container">
      <div class="box repeat-box box1">重复1</div>
      <div class="box repeat-box box2">重复2</div>
      <div class="box repeat-box box3">重复3</div>
    </div>
    <button class="play-btn" id="play-repeat">重播</button>
  </div>
</div>`;

const cssCode = `.params-demo {
  width: 100%;
}
.panel {
  margin-bottom: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 15px;
  background-color: #f8f9fa;
}
h3 {
  margin: 0 0 10px 0;
  font-size: 16px;
  color: #333;
}
.box-container {
  position: relative;
  height: 60px;
  margin-bottom: 10px;
  background-color: #fff;
  border-radius: 4px;
  overflow: hidden;
}
.box {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 40px;
  border-radius: 4px;
  color: white;
  font-size: 13px;
  font-weight: bold;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16);
}
.box1 {
  background-color: #3498db;
  left: 10px;
  top: 10px;
}
.box2 {
  background-color: #e74c3c;
  left: 10px;
  top: 10px;
}
.box3 {
  background-color: #2ecc71;
  left: 10px;
  top: 10px;
}
.play-btn {
  padding: 5px 10px;
  background-color: #9b59b6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}`;

const jsCode = `// 默认时间轴
function createDefaultTimeline() {
  const tl = gsap.timeline();
  tl.to(".default-box.box1", {
    x: 200,
    duration: 1
  })
  .to(".default-box.box2", {
    x: 200,
    duration: 1
  })
  .to(".default-box.box3", {
    x: 200,
    duration: 1
  });
  return tl;
}

// 延迟时间轴
function createDelayTimeline() {
  const tl = gsap.timeline({
    delay: 0.5  // 整个时间轴延迟0.5秒开始
  });
  tl.to(".delay-box.box1", {
    x: 200,
    duration: 1
  })
  .to(".delay-box.box2", {
    x: 200,
    duration: 1
  }, "+=0.5")  // 在前一个动画完成后额外等待0.5秒
  .to(".delay-box.box3", {
    x: 200,
    duration: 1
  });
  return tl;
}

// 重复时间轴
function createRepeatTimeline() {
  const tl = gsap.timeline({
    repeat: 1,        // 重复1次（总共执行2次）
    repeatDelay: 0.5, // 每次重复前等待0.5秒
    yoyo: true,       // 反向重复（来回运动）
    onRepeat: function() {
      console.log('时间轴重复!');
    }
  });
  tl.to(".repeat-box.box1", {
    x: 200,
    duration: 0.7
  })
  .to(".repeat-box.box2", {
    x: 200,
    duration: 0.7
  })
  .to(".repeat-box.box3", {
    x: 200,
    duration: 0.7
  });
  return tl;
}

// 创建并运行所有时间轴
let defaultTl = createDefaultTimeline();
let delayTl = createDelayTimeline();
let repeatTl = createRepeatTimeline();

// 添加重播按钮功能
document.getElementById("play-default").addEventListener("click", function() {
  defaultTl.restart();
});

document.getElementById("play-delay").addEventListener("click", function() {
  delayTl.restart();
});

document.getElementById("play-repeat").addEventListener("click", function() {
  repeatTl.restart();
});`;
</script> 