<template>
  <GsapEditor 
    title="ScrollTrigger 交互式图表"
    :initialHtml="htmlCode"
    :initialCss="cssCode"
    :initialJs="jsCode"
    scrollHeight="600px"
  />
</template>

<script setup>
const htmlCode = `<div class="demo-container">
  <div class="scroll-instruction">向下滚动查看图表动画</div>
  <div class="chart">
    <div class="chart-title">滚动触发的交互图表</div>
    <div class="chart-container">
      <div class="chart-bar" data-value="10" style="height: 0%"></div>
      <div class="chart-bar" data-value="25" style="height: 0%"></div>
      <div class="chart-bar" data-value="15" style="height: 0%"></div>
      <div class="chart-bar" data-value="30" style="height: 0%"></div>
      <div class="chart-bar" data-value="45" style="height: 0%"></div>
      <div class="chart-bar" data-value="20" style="height: 0%"></div>
      <div class="chart-bar" data-value="35" style="height: 0%"></div>
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
  overflow-x: hidden;
  height: 100%;
}
.demo-container {
  width: 100%;
  height: 500px;
  position: relative;
}
.scroll-instruction {
  position: sticky;
  top: 10px;
  width: 100%;
  text-align: center;
  padding: 8px;
  background-color: rgba(0,0,0,0.05);
  color: #666;
  font-size: 14px;
  z-index: 100;
}
.chart {
  width: 100%;
  padding: 40px;
  margin-top: 60px;
  background-color: #f5f5f5;
  border-radius: 8px;
}
.chart-title {
  font-size: 20px;
  margin-bottom: 20px;
  text-align: center;
}
.chart-container {
  height: 200px;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  padding: 10px;
}
.chart-bar {
  width: 40px;
  background-color: #4a69bd;
  border-radius: 4px 4px 0 0;
  position: relative;
  opacity: 0;
  transform-origin: bottom;
}
.chart-bar::after {
  content: attr(data-value);
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
}`;

const jsCode = `// 注册 ScrollTrigger 插件
gsap.registerPlugin(ScrollTrigger);

// 清除可能存在的ScrollTrigger实例
ScrollTrigger.getAll().forEach(st => st.kill());

// 全局禁用标记
ScrollTrigger.defaults({ markers: false });

// 为图表创建动画序列
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.chart',
    start: 'top 70%', // 当图表顶部到达视口70%位置时开始
    end: 'bottom 30%', // 当图表底部到达视口30%位置时结束
    scrub: 1,
    id: "interactive-chart",
    onEnter: () => {
      gsap.to('.scroll-instruction', { opacity: 0, duration: 0.3 });
    },
    onLeaveBack: () => {
      gsap.to('.scroll-instruction', { opacity: 1, duration: 0.3 });
    }
  }
});

// 获取图表条元素
const chartBarSelector = '.chart-bar';

// 计算每个条形图的最终高度
gsap.utils.toArray(chartBarSelector).forEach((bar, index) => {
  const value = parseInt(bar.getAttribute('data-value'), 10);
  const maxValue = 45; // 从DOM中获取的最大值
  const height = (value / maxValue) * 100;
  
  // 为每个条形图创建动画，一个接一个地显示
  tl.to(bar, { 
    height: height + '%', 
    opacity: 1,
    duration: 0.2,
    ease: 'power1.out'
  }, index * 0.1); // 时间轴偏移，创建连续效果
});`;
</script> 