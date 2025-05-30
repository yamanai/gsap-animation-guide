<template>
  <GsapEditor 
    title="默认页面滚动触发器"
    :initialHtml="htmlCode"
    :initialCss="cssCode"
    :initialJs="jsCode"
    scrollHeight="600px"
  />
</template>

<script setup>
const htmlCode = `<div class="scroll-demo">
  <div class="intro">默认页面滚动示例</div>
  <div class="content">
    <div class="box" id="box1">盒子 1</div>
    <div class="box" id="box2">盒子 2</div>
    <div class="box" id="box3">盒子 3</div>
  </div>
  <div class="instructions">继续往下滚动以触发动画</div>
</div>`;

const cssCode = `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: Arial, sans-serif;
  color: #333;
  overflow-x: hidden;
}
.scroll-demo {
  width: 100%;
  padding: 20px;
}
.intro {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 8px;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 150px;
  padding: 40px 0;
}
.box {
  width: 200px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  font-weight: bold;
  font-size: 20px;
  box-shadow: 0 6px 12px rgba(0,0,0,0.1);
  opacity: 0;
  transform: translateY(50px);
}
#box1 {
  background-color: #4a69bd;
  color: white;
}
#box2 {
  background-color: #6a89cc;
  color: white;
}
#box3 {
  background-color: #82ccdd;
  color: #333;
}
.instructions {
  text-align: center;
  color: #666;
  padding: 15px;
  margin-top: 20px;
  font-style: italic;
}`;

const jsCode = `// 注册 ScrollTrigger 插件
gsap.registerPlugin(ScrollTrigger);

// 清除可能存在的ScrollTrigger实例
ScrollTrigger.getAll().forEach(st => st.kill());

// 全局禁用标记
ScrollTrigger.defaults({ markers: false });

// 为每个盒子创建单独的动画
gsap.utils.toArray('.box').forEach((box, i) => {
  const boxIndex = i + 1;
  gsap.to(box, {
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: box,
      start: "top 80%", // 当元素顶部达到视口的80%位置时触发
      end: "top 20%", // 当元素顶部达到视口的20%位置时结束
      toggleActions: "play none none reverse", // 播放, 无动作, 无动作, 返回初始状态
      id: "box-" + boxIndex
    }
  });
});

// 添加解释标记
ScrollTrigger.create({
  trigger: ".intro",
  start: "top top",
  endTrigger: ".instructions",
  end: "bottom bottom",
  id: "full-page-range"
});`;
</script> 