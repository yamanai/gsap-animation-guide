<template>
  <GsapEditor 
    title="ScrollTrigger批量元素动画"
    :initialHtml="htmlCode"
    :initialCss="cssCode"
    :initialJs="jsCode"
  />
</template>

<script setup>
const htmlCode = `<div class="batch-demo-container">
  <div class="header">向下滚动查看批量动画效果</div>
  <div class="spacer-small"></div>
  <div class="items-container">
    <div class="item">项目 1</div>
    <div class="item">项目 2</div>
    <div class="item">项目 3</div>
    <div class="item">项目 4</div>
    <div class="item">项目 5</div>
    <div class="item">项目 6</div>
    <div class="item">项目 7</div>
    <div class="item">项目 8</div>
  </div>
  <div class="spacer-small"></div>
  <div class="footer">滚动区域结束</div>
</div>`;

const cssCode = `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: Arial, sans-serif;
  background-color: #f5f5f7;
  overflow-x: hidden;
}
.batch-demo-container {
  width: 100%;
  position: relative;
}
.header, .footer {
  padding: 15px;
  background-color: #2ecc71;
  color: white;
  text-align: center;
  font-weight: bold;
  position: sticky;
  z-index: 5;
}
.header {
  top: 0;
}
.footer {
  background-color: #27ae60;
  bottom: 0;
}
.spacer-small {
  height: 10vh;
}
.items-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}
.item {
  background-color: #3498db;
  color: white;
  padding: 25px;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  opacity: 0;
  transform: translateY(50px);
}
.item:nth-child(odd) {
  background-color: #e74c3c;
}`;

const jsCode = `// 注册ScrollTrigger插件
gsap.registerPlugin(ScrollTrigger);

// 清除可能存在的ScrollTrigger实例
ScrollTrigger.getAll().forEach(st => st.kill());

// 全局禁用标记
ScrollTrigger.defaults({ 
  scroller: document.body,
  markers: false 
});

// 使用gsap.utils.toArray获取所有元素
const items = gsap.utils.toArray('.item');

// 批量创建滚动动画
gsap.to(items, {
  opacity: 1,
  y: 0,
  stagger: 0.2, // 每个元素之间的延迟
  duration: 0.8,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".items-container",
    start: "top 70%", // 当容器顶部到达视口70%位置时开始
    end: "bottom 20%", // 当容器底部到达视口20%位置时结束
    toggleActions: "play none none reverse" // 进入时播放，离开时反转
  }
});

// 单独设置每个元素的滚动触发器
items.forEach((item, i) => {
  // 为每个元素创建特有的动画效果
  ScrollTrigger.create({
    trigger: item,
    start: "top 85%",
    onEnter: () => {
      gsap.to(item, {
        backgroundColor: "#9b59b6", // 滚动到视图中时改变背景色
        scale: 1.05, // 轻微放大
        duration: 0.4,
        overwrite: "auto"
      });
    },
    onLeaveBack: () => {
      // 滚动回到触发点前时恢复原始颜色
      gsap.to(item, {
        backgroundColor: i % 2 === 0 ? "#3498db" : "#e74c3c",
        scale: 1,
        duration: 0.4,
        overwrite: "auto"
      });
    }
  });
});`;
</script> 