<!--
注意：本示例使用了GSAP的付费插件ScrollTrigger，在商业项目中使用需要购买Club GreenSock会员资格
本项目为非商业性质的教学项目，可以使用GSAP的所有付费插件进行演示
-->
<template>
  <GsapEditor 
    title="滚动触发动画"
    :initialHtml="htmlTemplate"
    :initialCss="cssStyles"
    :initialJs="jsScript"
  />
</template>

<script setup>
// HTML模板
const htmlTemplate = `<div class="scroll-container">
  <div class="section intro-section">
    <h2 class="section-title">滚动触发动画</h2>
    <p class="instruction">向下滚动查看元素动画效果</p>
    <div class="arrow-down">↓</div>
  </div>
  
  <div class="spacer"></div>
  
  <div class="section">
    <div class="box box1">淡入效果</div>
  </div>
  
  <div class="spacer"></div>
  
  <div class="section">
    <div class="box box2">从左滑入</div>
  </div>
  
  <div class="spacer"></div>
  
  <div class="section">
    <div class="box box3">放大进入</div>
  </div>
  
  <div class="spacer"></div>
  
  <div class="section progress-section">
    <div class="progress-bar">
      <div class="progress-fill"></div>
    </div>
    <p class="caption">滚动进度条</p>
  </div>
  
  <div class="spacer"></div>
  
  <div class="section end-section">
    <button class="reset-btn">重置动画</button>
    <p class="end-note">点击上方按钮重新体验动画效果</p>
  </div>
</div>`;

// CSS样式
const cssStyles = `.scroll-container {
  max-width: 100%;
  height: 300px;
  overflow-y: auto;
  background-color: #f8f9fa;
  border-radius: 8px;
  font-family: 'Arial', sans-serif;
  position: relative;
  scrollbar-width: thin;
  scrollbar-color: #ccc #f1f1f1;
}

.scroll-container::-webkit-scrollbar {
  width: 8px;
}

.scroll-container::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.scroll-container::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 4px;
}

.section {
  padding: 25px;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.intro-section {
  height: 240px;
  background-color: #3498db;
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

.section-title {
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 24px;
}

.instruction {
  font-size: 16px;
  opacity: 0.9;
}

.arrow-down {
  position: absolute;
  bottom: 20px;
  font-size: 24px;
  animation: bounce 1.5s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(10px); }
}

.spacer {
  height: 100px;
}

.box {
  width: 200px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  border-radius: 8px;
  opacity: 0;
}

.box1 {
  background-color: #e74c3c;
}

.box2 {
  background-color: #2ecc71;
  transform: translateX(-100%);
}

.box3 {
  background-color: #9b59b6;
  transform: scale(0.5);
}

.progress-section {
  position: relative;
}

.progress-bar {
  width: 80%;
  height: 20px;
  background-color: #ecf0f1;
  border-radius: 10px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  width: 0%;
  background-color: #f39c12;
  border-radius: 10px;
}

.caption {
  margin-top: 15px;
  color: #555;
}

.end-section {
  background-color: #2c3e50;
  color: white;
}

.reset-btn {
  background-color: #e67e22;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 15px;
  transition: background-color 0.3s;
}

.reset-btn:hover {
  background-color: #d35400;
}

.end-note {
  font-size: 14px;
  opacity: 0.8;
}`;

// JavaScript代码
const jsScript = `// 初始化动画
function initScrollAnimations() {
  // 检查是否已加载ScrollTrigger插件
  if (typeof ScrollTrigger === 'undefined' || !window.ScrollTrigger) {
    console.warn("ScrollTrigger 插件未加载，正在使用基本滚动事件模拟滚动触发效果。");
    simulateScrollTrigger();
    return;
  }

  console.log("使用 ScrollTrigger 插件创建滚动动画");
  
  // 注册ScrollTrigger插件(如果还没有注册)
  gsap.registerPlugin(ScrollTrigger);
  
  // 1. 淡入效果
  gsap.to(".box1", {
    scrollTrigger: {
      trigger: ".box1",
      scroller: ".scroll-container",
      start: "top 80%", 
      end: "top 50%",
      toggleActions: "play none none reverse"
    },
    opacity: 1,
    duration: 1,
    ease: "power2.out"
  });
  
  // 2. 从左滑入效果
  gsap.to(".box2", {
    scrollTrigger: {
      trigger: ".box2",
      scroller: ".scroll-container",
      start: "top 80%",
      end: "top 50%",
      toggleActions: "play none none reverse"
    },
    x: 0, 
    opacity: 1,
    duration: 1.2,
    ease: "power3.out"
  });
  
  // 3. 放大进入效果
  gsap.to(".box3", {
    scrollTrigger: {
      trigger: ".box3",
      scroller: ".scroll-container",
      start: "top 80%",
      end: "top 50%", 
      toggleActions: "play none none reverse"
    },
    scale: 1,
    opacity: 1,
    duration: 1,
    ease: "back.out(1.5)"
  });
  
  // 4. 进度条动画 - 跟随滚动进度
  gsap.to(".progress-fill", {
    scrollTrigger: {
      trigger: ".progress-section",
      scroller: ".scroll-container",
      start: "top bottom",
      end: "bottom center",
      scrub: true
    },
    width: "100%",
    ease: "none"
  });
  
  // 重置按钮点击事件
  document.querySelector(".reset-btn").addEventListener("click", () => {
    // 滚动回顶部
    document.querySelector(".scroll-container").scrollTop = 0;
  });
}

// 模拟ScrollTrigger功能(当插件未加载时)
function simulateScrollTrigger() {
  // 获取滚动容器
  const scrollContainer = document.querySelector(".scroll-container");
  
  // 重置元素状态
  gsap.set([".box1", ".box2", ".box3"], { opacity: 0 });
  gsap.set(".box2", { x: "-100%" });
  gsap.set(".box3", { scale: 0.5 });
  gsap.set(".progress-fill", { width: 0 });
  
  // 监听滚动事件
  scrollContainer.addEventListener("scroll", () => {
    const scrollPos = scrollContainer.scrollTop;
    const containerHeight = scrollContainer.clientHeight;
    
    // 1. 淡入效果
    const box1 = document.querySelector(".box1");
    const box1Pos = getElementPosition(box1, scrollContainer);
    if (box1Pos < containerHeight * 0.8) {
      gsap.to(".box1", { opacity: 1, duration: 1 });
    } else if (box1Pos > containerHeight) {
      gsap.to(".box1", { opacity: 0, duration: 1 });
    }
    
    // 2. 从左滑入效果
    const box2 = document.querySelector(".box2");
    const box2Pos = getElementPosition(box2, scrollContainer);
    if (box2Pos < containerHeight * 0.8) {
      gsap.to(".box2", { x: 0, opacity: 1, duration: 1.2 });
    } else if (box2Pos > containerHeight) {
      gsap.to(".box2", { x: "-100%", opacity: 0, duration: 1.2 });
    }
    
    // 3. 放大进入效果
    const box3 = document.querySelector(".box3");
    const box3Pos = getElementPosition(box3, scrollContainer);
    if (box3Pos < containerHeight * 0.8) {
      gsap.to(".box3", { scale: 1, opacity: 1, duration: 1 });
    } else if (box3Pos > containerHeight) {
      gsap.to(".box3", { scale: 0.5, opacity: 0, duration: 1 });
    }
    
    // 4. 进度条动画
    const progressSection = document.querySelector(".progress-section");
    const progressPos = getElementPosition(progressSection, scrollContainer);
    const progressPercentage = Math.max(0, Math.min(1, 1 - (progressPos / containerHeight)));
    gsap.set(".progress-fill", { width: progressPercentage * 100 + "%" });
  });
  
  // 获取元素相对于滚动容器的位置
  function getElementPosition(element, container) {
    return element.getBoundingClientRect().top - 
           container.getBoundingClientRect().top;
  }
  
  // 重置按钮点击事件
  document.querySelector(".reset-btn").addEventListener("click", () => {
    // 滚动回顶部
    document.querySelector(".scroll-container").scrollTop = 0;
  });
}

// 等待DOM准备就绪后运行初始化
window.addEventListener('DOMContentLoaded', initScrollAnimations);

// 即时运行一次初始化，确保在编辑器中正确加载
setTimeout(initScrollAnimations, 100);`;
</script>

<style>
/* 组件本身的样式 */
</style> 