<template>
  <GsapEditor 
    title="ScrollTrigger snap 吸附效果演示"
    :initialHtml="htmlCode"
    :initialCss="cssCode"
    :initialJs="jsCode"
    scrollHeight="700px"
  />
</template>

<script setup>
const htmlCode = `<div class="demo-container">
  <div class="instruction">
    <h3>ScrollTrigger Snap 效果</h3>
    <p>向下滚动观察元素如何吸附到指定位置</p>
  </div>
  
  <!-- 滚动引导区 -->
  <div class="scroll-area">
    <div class="scroll-text">开始滚动</div>
    <div class="scroll-arrow">↓</div>
  </div>
  
  <!-- 主要内容区 -->
  <div class="snap-track">
    <!-- 可视化指示 -->
    <div class="snap-markers">
      <div class="snap-point" data-snap="0">0%</div>
      <div class="snap-point" data-snap="25">25%</div>
      <div class="snap-point" data-snap="50">50%</div>
      <div class="snap-point" data-snap="75">75%</div>
      <div class="snap-point" data-snap="100">100%</div>
    </div>
    
    <!-- 滑动元素 -->
    <div class="box">
      <div class="box-content">Snap效果展示</div>
      <div class="progress-display">0%</div>
    </div>
  </div>
  
  <!-- 结束说明 -->
  <div class="explanation">
    <p>ScrollTrigger的snap特性允许滚动动画"吸附"到指定的进度点，使动画更流畅有序。</p>
    <p>在这个例子中，无论你滚动到哪里，滚动停止时元素都会自动吸附到最近的标记点。</p>
  </div>
</div>`;

const cssCode = `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f8f9fa;
  color: #333;
}

.demo-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.instruction {
  text-align: center;
  margin-bottom: 30px;
  padding: 15px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.instruction h3 {
  margin-bottom: 10px;
  color: #2c3e50;
}

.instruction p {
  color: #666;
}

.scroll-area {
  text-align: center;
  margin: 20px 0;
  padding: 15px;
  color: #666;
}

.scroll-arrow {
  font-size: 24px;
  animation: bounce 1.5s infinite;
  margin-top: 5px;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
}

.snap-track {
  height: 350px;
  background-color: #f0f0f0;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  box-shadow: inset 0 0 10px rgba(0,0,0,0.1);
}

.snap-markers {
  position: absolute;
  right: 20px;
  top: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 0;
}

.snap-point {
  padding: 6px 10px;
  background-color: rgba(0,0,0,0.1);
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  transition: all 0.3s;
}

.snap-point.active {
  background-color: #3498db;
  color: white;
  transform: scale(1.1);
}

.box {
  width: 200px;
  height: 100px;
  background: linear-gradient(135deg, #3498db, #9b59b6);
  border-radius: 8px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  transition: box-shadow 0.3s;
}

.box:hover {
  box-shadow: 0 8px 25px rgba(0,0,0,0.3);
}

.box-content {
  font-weight: bold;
}

.progress-display {
  margin-top: 8px;
  font-size: 14px;
  opacity: 0.8;
}

.explanation {
  margin-top: 30px;
  padding: 15px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.explanation p {
  margin-bottom: 10px;
  line-height: 1.5;
  color: #555;
}`;

const jsCode = `// 注册 ScrollTrigger 插件
gsap.registerPlugin(ScrollTrigger);

// 清除可能存在的ScrollTrigger实例
ScrollTrigger.getAll().forEach(st => st.kill());

// 全局禁用标记
ScrollTrigger.defaults({ markers: false });

// 重置页面位置确保动画从头开始
window.scrollTo(0, 0);

// 设置初始状态
gsap.set('.box', { top: '20px' });

// 更新活动指示点和进度显示
function updateUI(progress) {
  // 更新进度显示
  const progressPercent = Math.round(progress * 100);
  document.querySelector('.progress-display').textContent = \`\${progressPercent}%\`;
  
  // 更新指示点状态
  document.querySelectorAll('.snap-point').forEach(point => {
    point.classList.remove('active');
    
    // 获取点的进度值
    const pointValue = parseInt(point.getAttribute('data-snap'));
    
    // 如果当前进度接近这个点，激活它
    if (Math.abs(progressPercent - pointValue) < 12) {
      point.classList.add('active');
    }
  });
  
  // 根据进度更改盒子的颜色
  const hue = 210 + (progress * 150); // 从蓝色到紫色
  gsap.set('.box', {
    background: \`linear-gradient(135deg, hsl(\${hue}, 70%, 50%), hsl(\${hue + 40}, 70%, 50%))\`
  });
}

// 创建动画
const animation = gsap.to('.box', {
  top: 'calc(100% - 120px)', // 底部位置，留出一点空间
  ease: 'none',
    scrollTrigger: {
    trigger: '.snap-track',
      start: 'top center',
      end: 'bottom center',
    scrub: 1, // 平滑滚动效果
      snap: {
      snapTo: [0, 0.25, 0.5, 0.75, 1], // 吸附到这些点
      duration: 0.3, // 吸附动画持续时间
      delay: 0.1, // 延迟，让用户感觉更自然
      ease: 'power2.inOut', // 缓动效果
      inertia: true // 带有惯性效果
      },
    id: 'snap-effect',
    onUpdate: (self) => {
      updateUI(self.progress);
    }
    }
  });

// 确保初始UI状态正确
updateUI(0);`;
</script> 