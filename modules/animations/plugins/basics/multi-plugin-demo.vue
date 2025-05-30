<template>
  <GsapEditor 
    title="多插件协同工作示例"
    :initialHtml="htmlCode"
    :initialCss="cssCode"
    :initialJs="jsCode"
  />
</template>

<script setup>
const htmlCode = `<div class="plugin-demo">
  <div class="demo-container">
    <div class="box first-box">Text + Flip</div>
    <div class="box second-box">Path + Transform</div>
    <div id="path-container">
      <svg width="100%" height="100%" viewBox="0 0 280 120">
        <path id="motionPath" 
              d="M30,60 Q70,20 140,60 T250,60" 
              fill="none" stroke="#ccc" stroke-width="2"/>
      </svg>
    </div>
  </div>
  <div class="controls">
    <button id="startBtn">开始动画</button>
    <button id="resetBtn">重置</button>
    <button id="swapBtn">切换位置</button>
  </div>
</div>`;

const cssCode = `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.plugin-demo {
  width: 100%;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  height: auto;
}
.demo-container {
  position: relative;
  height: 250px;
  background-color: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 10px;
}
.box {
  position: absolute;
  padding: 8px 12px;
  border-radius: 6px;
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  cursor: pointer;
}
.first-box {
  top: 20px;
  left: 20px;
  background-color: #4c6ef5;
  z-index: 2;
}
.second-box {
  top: 20px;
  right: 20px;
  background-color: #e64980;
  z-index: 1;
}
#path-container {
  position: absolute;
  top: 100px;
  left: 0;
  right: 0;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}
#path-container svg {
  width: 90%;
  max-width: 280px;
  height: 120px;
}
.controls {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-bottom: 5px;
}
button {
  padding: 6px 12px;
  background-color: #12b886;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}
button:hover {
  background-color: #0ca678;
}
#resetBtn {
  background-color: #868e96;
}
#resetBtn:hover {
  background-color: #495057;
}
#swapBtn {
  background-color: #7950f2;
}
#swapBtn:hover {
  background-color: #6741d9;
}`;

const jsCode = `// 注册所需的插件
gsap.registerPlugin(Flip, TextPlugin, MotionPathPlugin);

// 获取DOM元素
const firstBox = document.querySelector('.first-box');
const secondBox = document.querySelector('.second-box');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const swapBtn = document.getElementById('swapBtn');

// 主动画时间线
let mainTimeline;

// 创建和运行动画
function runAnimation() {
  // 如果已有动画，先清除
  if (mainTimeline) mainTimeline.kill();
  
  // 重置元素状态
  gsap.set([firstBox, secondBox], {
    clearProps: "all"
  });
  firstBox.textContent = "Text + Flip";
  firstBox.style.backgroundColor = "#4c6ef5";
  secondBox.textContent = "Path + Transform";
  secondBox.style.backgroundColor = "#e64980";
  
  // 创建新的时间线
  mainTimeline = gsap.timeline();
  
  // TextPlugin动画
  mainTimeline.to('.first-box', {
    text: "正在变换文字...",
    duration: 1
  })
  
  // Flip动画准备
  .add(() => {
    // 捕获开始状态
    const state = Flip.getState([firstBox, secondBox]);
    
    // 交换位置类
    if (firstBox.style.right) {
      firstBox.style.right = "";
      firstBox.style.left = "20px";
    } else {
      firstBox.style.right = "20px";
      firstBox.style.left = "";
    }
    
    if (secondBox.style.right) {
      secondBox.style.right = "";
      secondBox.style.left = "20px";
    } else {
      secondBox.style.right = "20px";
      secondBox.style.left = "";
    }
    
    // 创建翻转动画
    return Flip.from(state, {
      duration: 1,
      ease: "power1.inOut",
      absolute: true
    });
  })
  
  // MotionPath动画
  .to('.second-box', {
    motionPath: {
      path: "#motionPath",
      align: "#motionPath",
      alignOrigin: [0.5, 0.5],
      autoRotate: 90,
      start: 0,
      end: 1
    },
    duration: 2.5,
    ease: "power1.inOut"
  })
  
  // 最终状态
  .to('.first-box', {
    text: "动画完成!",
    backgroundColor: "#37b24d",
    duration: 0.5
  });
}

// 重置函数
function resetAnimation() {
  // 停止正在进行的动画
  if (mainTimeline) mainTimeline.kill();
  
  // 重置元素状态
  gsap.set([firstBox, secondBox], {
    clearProps: "all"
  });
  
  // 恢复初始文本和颜色
  firstBox.textContent = "Text + Flip";
  firstBox.style.backgroundColor = "#4c6ef5";
  firstBox.style.left = "20px";
  firstBox.style.right = "";
  
  secondBox.textContent = "Path + Transform";
  secondBox.style.backgroundColor = "#e64980";
  secondBox.style.right = "20px";
  secondBox.style.left = "";
}

// 切换位置函数
function swapPositions() {
  // 获取当前状态
  const state = Flip.getState([firstBox, secondBox]);
  
  // 互换位置类
  if (firstBox.style.right) {
    firstBox.style.right = "";
    firstBox.style.left = "20px";
  } else {
    firstBox.style.right = "20px";
    firstBox.style.left = "";
  }
  
  if (secondBox.style.right) {
    secondBox.style.right = "";
    secondBox.style.left = "20px";
  } else {
    secondBox.style.right = "20px";
    secondBox.style.left = "";
  }
  
  // 应用翻转效果
  Flip.from(state, {
    duration: 0.5,
    ease: "power1.inOut",
    absolute: true
  });
}

// 绑定事件
startBtn.addEventListener('click', runAnimation);
resetBtn.addEventListener('click', resetAnimation);
swapBtn.addEventListener('click', swapPositions);`;
</script> 