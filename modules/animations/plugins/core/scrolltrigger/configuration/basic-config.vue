<template>
  <GsapEditor 
    title="ScrollTrigger 基础配置演示"
    :initialHtml="htmlCode"
    :initialCss="cssCode"
    :initialJs="jsCode"
    scrollHeight="500px"
  />
</template>

<script setup>
const htmlCode = `<div class="demo-container">
  <div class="scroll-instruction">请滚动查看效果</div>
  <div class="box-container">
    <div class="box">基础滚动触发动画</div>
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
}
.demo-container {
  width: 100%;
  position: relative;
  height: 400px; /* 控制总高度 */
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.scroll-instruction {
  position: absolute;
  top: 10px;
  left: 0;
  width: 100%;
  text-align: center;
  color: #666;
  font-size: 14px;
  padding: 5px;
  background-color: rgba(0, 0, 0, 0.05);
}
.box-container {
  width: 100%;
  padding: 40px;
  text-align: center;
  margin-top: 60px;
}
.box {
  display: inline-block;
  padding: 20px 40px;
  background-color: #4a69bd;
  color: white;
  border-radius: 8px;
  font-size: 18px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transform: translateX(-200px);
  opacity: 0;
}`;

const jsCode = `// 注册 ScrollTrigger 插件
gsap.registerPlugin(ScrollTrigger);

// 清除可能存在的ScrollTrigger实例
ScrollTrigger.getAll().forEach(st => st.kill());

// 全局禁用标记
ScrollTrigger.defaults({ markers: false });

// 创建随滚动而移动的方块
gsap.to('.box', {
  x: 0,
  opacity: 1,
  duration: 1,
    scrollTrigger: {
      trigger: '.box-container',
    start: 'top 70%', // 当盒子顶部到达视口70%位置时开始
    end: 'bottom 30%', // 当盒子底部到达视口30%位置时结束
      toggleActions: 'play pause reverse reset',
    scrub: 1, // 使动画平滑跟随滚动，值为1表示有轻微的延迟
    id: "basic-config"
    }
});`;
</script> 