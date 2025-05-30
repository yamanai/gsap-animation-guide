<template>
  <GsapEditor 
    title="TextPlugin打字机效果演示"
    :initialHtml="htmlCode"
    :initialCss="cssCode"
    :initialJs="jsCode"
  />
</template>

<script setup>
const htmlCode = `<div class='container'>
  <h3>TextPlugin示例</h3>
  <div class='typing-text'>等待文字输入...</div>
  <div class='changing-text'>这是初始文本</div>
  <div class='sequence-text'>我将先被清除再显示新内容</div>
</div>`;

const cssCode = `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Arial, sans-serif;
  background-color: #f5f5f7;
  overflow: hidden;
}
.container {
  width: 100%;
  padding: 20px;
  border-radius: 12px;
  background-color: #f8f9fa;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}
h3 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
  font-size: 22px;
}
.typing-text, .changing-text, .sequence-text {
  margin: 15px 0;
  padding: 15px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  min-height: 30px;
  font-size: 16px;
  transition: transform 0.3s ease;
}
.typing-text {
  color: #2c5282;
  border-left: 4px solid #4299e1;
}
.changing-text {
  color: #38a169;
  border-left: 4px solid #48bb78;
}
.sequence-text {
  color: #e53e3e;
  border-left: 4px solid #f56565;
}`;

const jsCode = `// 首先确保注册了TextPlugin
gsap.registerPlugin(TextPlugin);

// 创建主时间轴控制所有动画
const masterTimeline = gsap.timeline({repeat: -1, repeatDelay: 1});

// 第一个文本 - 打字机效果
masterTimeline.to('.typing-text', {
  duration: 0.2,
  text: '',
  ease: 'none'
}).to('.typing-text', {
  duration: 2.5,
  text: '这是通过GSAP TextPlugin实现的逐字显示效果，模拟真实打字体验！',
  ease: 'none'
}, "+=0.3");

// 第二个文本 - 文字替换效果
masterTimeline.to('.changing-text', {
  duration: 1.2,
  text: {
    value: '文字已经改变！这是新的内容展示。',
    delimiter: '' // 无分隔符，整体替换
  },
  ease: 'power1.inOut',
  scale: 1.03,
}, "-=1.5");

// 第三个文本 - 序列动画
masterTimeline.to('.sequence-text', {
  text: '',
  duration: 0.7,
  ease: 'power2.in'
}, "-=0.5")
.to('.sequence-text', {
  text: '文字完全清除后显示新内容，更加生动流畅！',
  duration: 1.8,
  ease: 'power2.out'
});`;
</script> 