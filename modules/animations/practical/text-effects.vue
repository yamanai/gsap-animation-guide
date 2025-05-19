<template>
  <GsapEditor 
    title="文本动画效果"
    :initialHtml="htmlTemplate"
    :initialCss="cssStyles"
    :initialJs="jsScript"
  />
</template>

<script setup>
// HTML模板
const htmlTemplate = `<div class="text-effects-container">
  <div class="section fade-section">
    <h2 class="section-title">文字渐入动画</h2>
    <div class="text-wrapper">
      <p class="fade-text">GSAP让文本动画<span class="highlight">简单而强大</span>。这个示例展示了如何创建优雅的文本渐入效果。</p>
      <button class="replay-btn fade-replay">重播动画</button>
    </div>
  </div>
  
  <div class="section split-section">
    <h2 class="section-title">文字分裂效果</h2>
    <div class="text-wrapper">
      <div class="split-text">创造引人注目的交互体验</div>
      <button class="replay-btn split-replay">重播动画</button>
    </div>
  </div>
  
  <div class="section typing-section">
    <h2 class="section-title">打字机效果</h2>
    <div class="text-wrapper">
      <div class="typing-text">GSAP可以轻松实现打字机效果</div>
      <button class="replay-btn typing-replay">重播动画</button>
    </div>
  </div>
</div>`;

// CSS样式
const cssStyles = `.text-effects-container {
  max-width: 100%;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  color: #333;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.section {
  margin-bottom: 30px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
}

.section-title {
  margin: 0 0 15px;
  font-size: 18px;
  color: #2c3e50;
  border-bottom: 2px solid #3498db;
  padding-bottom: 8px;
}

.text-wrapper {
  position: relative;
}

.replay-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  margin-top: 10px;
  cursor: pointer;
  font-size: 13px;
  transition: background-color 0.2s;
}

.replay-btn:hover {
  background-color: #2980b9;
}

.highlight {
  font-weight: bold;
  /* 删除颜色设置，完全由JS控制 */
}

/* 渐入文本样式 - 不在CSS中设置透明度，由JS控制 */
.fade-text {
  font-size: 16px;
  line-height: 1.6;
}

/* 分裂文本样式 */
.split-text {
  font-size: 20px;
  font-weight: bold;
  overflow: hidden;
  display: inline-block;
  color: #2c3e50;
}

/* 打字机文本样式 */
.typing-text {
  font-size: 18px;
  font-family: 'Courier New', monospace;
  border-right: 2px solid #333;
  padding-right: 5px;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  width: 0;
}`;

// JavaScript代码
const jsScript = `// 初始化动画
function initAnimations() {
  // 1. 渐入动画 - 改用to方法，确保元素从透明到可见
  const fadeAnimation = gsap.timeline()
    .fromTo('.fade-text', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    )
    .fromTo('.fade-text .highlight', 
      { color: '#333', background: 'rgba(0,0,0,0)', padding: 0 },
      { color: '#e74c3c', background: 'rgba(231, 76, 60, 0.1)', padding: '0 3px', duration: 0.8, ease: 'power2.inOut' },
      '-=0.5'
    );
  
  // 2. 文字分裂动画
  const splitText = document.querySelector('.split-text');
  const text = splitText.textContent;
  splitText.innerHTML = ''; // 清空原有文本
  
  // 为每个字符创建单独的span
  for (let i = 0; i < text.length; i++) {
    const char = text.charAt(i);
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\\u00A0' : char; // 用不间断空格替换空格
    span.style.display = 'inline-block';
    span.style.opacity = '0';
    splitText.appendChild(span);
  }
  
  // 创建分裂文字动画
  const splitAnimation = gsap.timeline()
    .to('.split-section .split-text span', {
      opacity: 1,
      y: 0,
      rotationX: 0,
      stagger: 0.05,
      duration: 0.1,
      ease: 'back.out(3)'
    });
  
  // 初始化分裂文字的初始状态
  gsap.set('.split-section .split-text span', {
    opacity: 0,
    y: -20,
    rotationX: -90
  });
  
  // 3. 打字机效果
  const typingAnimation = gsap.timeline()
    .to('.typing-text', {
      width: '100%',
      duration: 2,
      ease: 'steps(28)' // 根据文字长度调整步数
    });
  
  // 事件监听：重播按钮
  document.querySelector('.fade-replay').addEventListener('click', () => {
    // 重置文本状态，然后重新播放动画
    gsap.set('.fade-text', { opacity: 0, y: 30 });
    gsap.set('.fade-text .highlight', { color: '#333', background: 'rgba(0,0,0,0)', padding: 0 });
    fadeAnimation.restart();
  });
  
  document.querySelector('.split-replay').addEventListener('click', () => {
    gsap.to('.split-section .split-text span', {
      opacity: 0,
      y: -20,
      rotationX: -90,
      stagger: 0.02,
      duration: 0.3,
      onComplete: () => splitAnimation.restart()
    });
  });
  
  document.querySelector('.typing-replay').addEventListener('click', () => {
    gsap.to('.typing-text', {
      width: 0,
      duration: 0.5,
      onComplete: () => typingAnimation.restart()
    });
  });
}

// 等待DOM准备就绪后运行初始化
window.addEventListener('DOMContentLoaded', initAnimations);

// 即时运行一次初始化，确保在编辑器中正确加载
// 使用setTimeout确保DOM已经渲染完成
setTimeout(initAnimations, 100);`;
</script>

<style>
/* 组件本身的样式 */
</style> 