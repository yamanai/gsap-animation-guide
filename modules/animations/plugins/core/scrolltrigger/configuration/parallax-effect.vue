<template>
  <GsapEditor 
    title="ScrollTrigger 视差效果"
    :initialHtml="htmlCode"
    :initialCss="cssCode"
    :initialJs="jsCode"
    scrollHeight="700px"
  />
</template>

<script setup>
const htmlCode = `<div class="demo-container">
  <div class="scroll-instruction">向下滚动体验视差效果</div>
  <div class="parallax-container">
  <div class="parallax-layer parallax-layer-1">背景层</div>
  <div class="parallax-layer parallax-layer-2">中间层</div>
  <div class="parallax-layer parallax-layer-3">前景层</div>
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
.parallax-container {
  width: 100%;
  height: 600px;
  position: relative;
  overflow: hidden;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.parallax-layer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px 40px;
  border-radius: 8px;
  color: white;
  font-size: 24px;
  text-align: center;
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
}
.parallax-layer-1 {
  width: 100%;
  background-color: #0a3d62;
  z-index: 1;
}
.parallax-layer-2 {
  width: 70%;
  background-color: #6a0572;
  z-index: 2;
}
.parallax-layer-3 {
  width: 40%;
  background-color: #b71540;
  z-index: 3;
}`;

const jsCode = `// 注册 ScrollTrigger 插件
gsap.registerPlugin(ScrollTrigger);

// 清除可能存在的ScrollTrigger实例
ScrollTrigger.getAll().forEach(st => st.kill());

// 全局禁用标记
ScrollTrigger.defaults({ markers: false });

  // 视差层配置
  const layers = [
  { selector: '.parallax-layer-1', speed: 0.3 },
  { selector: '.parallax-layer-2', speed: 0.5 },
  { selector: '.parallax-layer-3', speed: 0.8 }
  ];
  
  // 为每一层创建动画
  layers.forEach((layer) => {
  gsap.fromTo(layer.selector, 
    { y: () => window.innerHeight * 0.1, opacity: 0 },
      { 
      y: () => window.innerHeight * -0.1 * layer.speed,
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.parallax-container',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        id: \`parallax-\${layer.selector}\`,
          onUpdate: self => {
            // 根据不同速度移动每层
          const yPos = -100 * self.progress * layer.speed;
          gsap.set(layer.selector, { 
            y: \`calc(-50% + \${yPos}px)\` 
          });
          }
        }
      }
    );
});`;
</script> 