<template>
  <GsapEditor 
    title="卡片展开/收起效果"
    :initialHtml="htmlTemplate"
    :initialCss="cssStyles"
    :initialJs="jsScript"
  />
</template>

<script setup>
// HTML模板
const htmlTemplate = `<div class="cards-container">
  <div class="card" data-index="0">
    <div class="card-header">
      <h3>GSAP动画基础</h3>
      <div class="toggle-btn">+</div>
    </div>
    <div class="card-content">
      <p>GSAP是一个强大的JavaScript动画库，提供了丰富的API和灵活的控制能力。本文将介绍GSAP的基本用法、核心概念以及实际应用案例，帮助你快速掌握这个工具。</p>
      <div class="card-actions">
        <button class="action-btn">阅读更多</button>
      </div>
    </div>
  </div>
  
  <div class="card" data-index="1">
    <div class="card-header">
      <h3>高级时间轴控制</h3>
      <div class="toggle-btn">+</div>
    </div>
    <div class="card-content">
      <p>GSAP的Timeline是一个强大的功能，让你能够精确控制复杂的动画序列。本文深入探讨Timeline的高级用法，包括嵌套时间轴、相对位置、标签系统等高级技巧。</p>
      <div class="card-actions">
        <button class="action-btn">阅读更多</button>
      </div>
    </div>
  </div>
  
  <div class="card" data-index="2">
    <div class="card-header">
      <h3>插件与特效</h3>
      <div class="toggle-btn">+</div>
    </div>
    <div class="card-content">
      <p>GSAP提供了多种强大的插件，如ScrollTrigger、MotionPath、Draggable等，可以实现丰富的交互效果。本文将介绍这些插件的用法和最佳实践，帮助你创建更加生动的用户体验。</p>
      <div class="card-actions">
        <button class="action-btn">阅读更多</button>
      </div>
    </div>
  </div>
</div>`;

// CSS样式
const cssStyles = `.cards-container {
  max-width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
}
.card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  overflow: hidden;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: #3498db;
  color: white;
  cursor: pointer;
}
.card-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}
.toggle-btn {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  border-radius: 50%;
  transition: transform 0.3s ease;
}
.card-content {
  padding: 0 20px;
  max-height: 0;
  overflow: hidden;
}
.card-content p {
  margin: 15px 0;
  font-size: 14px;
  color: #333;
  line-height: 1.5;
}
.card-actions {
  padding-bottom: 15px;
}
.action-btn {
  background-color: #2c3e50;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  transition: background-color 0.2s;
}
.action-btn:hover {
  background-color: #34495e;
}`;

// JavaScript代码
const jsScript = `// 存储每个卡片的展开状态
const cardStates = [false, false, false];

// 为每个卡片创建一个时间轴
const cardTimelines = Array.from(document.querySelectorAll('.card')).map((card, index) => {
  const tl = gsap.timeline({paused: true});
  
  tl.to(card.querySelector('.card-content'), {
    maxHeight: 200,
    duration: 0.5,
    ease: 'power2.out'
  })
  .to(card.querySelector('.toggle-btn'), {
    rotation: 135,
    duration: 0.3,
    ease: 'power1.out'
  }, 0)
  .fromTo(card.querySelector('.card-content p'), {
    opacity: 0,
    y: 20
  }, {
    opacity: 1,
    y: 0,
    duration: 0.4
  }, "-=0.3")
  .fromTo(card.querySelector('.card-actions'), {
    opacity: 0,
    y: 10
  }, {
    opacity: 1,
    y: 0,
    duration: 0.3
  }, "-=0.2");
  
  return tl;
});

// 添加点击事件处理
document.querySelectorAll('.card-header').forEach((header, index) => {
  header.addEventListener('click', () => toggleCard(index));
});

// 添加按钮点击反馈动画
document.querySelectorAll('.action-btn').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation(); // 阻止冒泡以避免触发卡片切换
    
    gsap.to(btn, {
      scale: 0.95,
      duration: 0.1,
      onComplete: () => {
        gsap.to(btn, {
          scale: 1,
          duration: 0.2,
          ease: 'bounce.out'
        });
      }
    });
  });
});

// 切换卡片展开/收起的函数
function toggleCard(index) {
  // 如果卡片当前是关闭状态，则展开它
  if (!cardStates[index]) {
    // 先关闭所有其他展开的卡片
    cardStates.forEach((state, i) => {
      if (state && i !== index) {
        cardTimelines[i].reverse();
        cardStates[i] = false;
      }
    });
    
    // 展开当前卡片
    cardTimelines[index].play();
    cardStates[index] = true;
  } else {
    // 如果卡片当前是展开状态，则收起它
    cardTimelines[index].reverse();
    cardStates[index] = false;
  }
  
  // 添加卡片背景色变化动画
  const card = document.querySelectorAll('.card')[index];
  gsap.to(card.querySelector('.card-header'), {
    backgroundColor: cardStates[index] ? '#2980b9' : '#3498db',
    duration: 0.3
  });
}

// 默认展开第一个卡片
toggleCard(0);`;
</script>

<style>
/* 组件本身的样式 */
</style> 