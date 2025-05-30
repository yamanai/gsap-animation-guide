<template>
  <GsapEditor 
    title="自定义容器滚动触发器"
    :initialHtml="htmlCode"
    :initialCss="cssCode"
    :initialJs="jsCode"
    scrollHeight="500px"
  />
</template>

<script setup>
const htmlCode = `<div class="container-demo">
  <div class="explanation">
    <h3>容器滚动触发器</h3>
    <p>在固定高度的容器中触发动画，不依赖页面滚动</p>
  </div>
  <div class="scroll-container">
    <div class="scroll-content">
      <div class="panel">
        <div class="panel-content">
          <div class="panel-title">面板1</div>
          <div class="animation-box" id="box1"></div>
        </div>
      </div>
      <div class="panel">
        <div class="panel-content">
          <div class="panel-title">面板2</div>
          <div class="animation-box" id="box2"></div>
        </div>
      </div>
      <div class="panel">
        <div class="panel-content">
          <div class="panel-title">面板3</div>
          <div class="animation-box" id="box3"></div>
        </div>
      </div>
    </div>
  </div>
</div>`;

const cssCode = `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: Arial, sans-serif;
  overflow: hidden;
  color: #333;
}
.container-demo {
  width: 100%;
  padding: 10px;
}
.explanation {
  margin-bottom: 15px;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 6px;
}
.explanation h3 {
  margin-bottom: 5px;
  color: #2c3e50;
}
.explanation p {
  color: #7f8c8d;
  font-size: 14px;
}
.scroll-container {
  width: 100%;
  height: 300px;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  position: relative;
}
.scroll-content {
  padding: 10px;
}
.panel {
  height: 250px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  border-radius: 8px;
}
.panel-content {
  text-align: center;
  width: 80%;
}
.panel-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #34495e;
}
.animation-box {
  width: 100px;
  height: 100px;
  margin: 0 auto;
  border-radius: 8px;
  background-color: #3498db;
  transform: scale(0);
}
#box1 {
  background-color: #e74c3c;
}
#box2 {
  background-color: #2ecc71;
}
#box3 {
  background-color: #9b59b6;
}`;

const jsCode = `// 注册ScrollTrigger插件
gsap.registerPlugin(ScrollTrigger);

// 清除可能存在的ScrollTrigger实例
ScrollTrigger.getAll().forEach(st => st.kill());

// 全局禁用标记
ScrollTrigger.defaults({ markers: false });

// 为每个面板设置动画
gsap.utils.toArray('.panel').forEach((panel, i) => {
  // 获取当前面板中的动画盒子
  const box = panel.querySelector('.animation-box');
  const panelIndex = i + 1;
  
  // 创建动画
  gsap.to(box, {
    scale: 1,
    rotation: 360,
    duration: 1,
    ease: "back.out(1.7)",
    scrollTrigger: {
      // 关键设置：指定滚动容器为我们的自定义容器，而不是整个页面
      scroller: ".scroll-container",
      
      // 以当前面板为触发器
      trigger: panel,
      
      // 当面板顶部达到容器70%位置时开始
      start: "top 70%",
      
      // 当面板顶部达到容器30%位置时结束
      end: "top 30%",
      
      // 动画行为：当进入时播放，离开时重置
      toggleActions: "play none none reset",
      
      // 为每个触发器指定唯一ID
      id: "panel-" + panelIndex
    }
  });
});`;
</script> 