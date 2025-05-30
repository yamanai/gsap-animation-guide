<template>
  <GsapEditor 
    title="ScrollTrigger 固定元素示例"
    :initialHtml="htmlCode"
    :initialCss="cssCode"
    :initialJs="jsCode"
  />
</template>

<script setup>
const htmlCode = `<div class="pin-demo">
  <header class="pin-header">ScrollTrigger 固定元素演示</header>
  
  <section class="intro">
    <h2>固定元素 (Pin) 效果</h2>
    <p>向下滚动体验固定元素的神奇效果</p>
    <div class="scroll-icon">↓</div>
  </section>
  
  <section class="pin-container">
    <div class="pin-element">
      <div class="pin-content">
        <h3>我将被固定在屏幕上</h3>
        <p>继续滚动查看内容变化</p>
        <div class="progress-bar">
          <div class="progress-fill"></div>
        </div>
        <div class="step-indicator">步骤 <span class="current-step">1</span>/4</div>
      </div>
    </div>
  </section>
  
  <section class="steps-info">
    <div class="step" data-step="1">
      <h3>第一步：开始固定</h3>
      <p>当元素到达视口特定位置时，ScrollTrigger 将其固定在屏幕上，保持在相同位置。</p>
    </div>
    <div class="step" data-step="2">
      <h3>第二步：内容转换</h3>
      <p>固定期间，你可以创建多个动画步骤，例如更改内容、颜色或添加新元素。</p>
    </div>
    <div class="step" data-step="3">
      <h3>第三步：动画效果</h3>
      <p>利用 GSAP 的动画能力，你可以创建任何过渡效果，包括淡入、移动、旋转等。</p>
    </div>
    <div class="step" data-step="4">
      <h3>第四步：结束固定</h3>
      <p>当达到结束点时，元素将取消固定并继续随页面滚动，平滑过渡到正常状态。</p>
    </div>
  </section>
  
  <footer class="pin-footer">
    <p>ScrollTrigger Pin 功能让你可以轻松创建引人入胜的滚动体验</p>
  </footer>
</div>`;

const cssCode = `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  line-height: 1.6;
  overflow-x: hidden;
  background-color: #f8f9fa;
}

.pin-demo {
  width: 100%;
  position: relative;
}

.pin-header, .pin-footer {
  padding: 15px 20px;
  background-color: #4158D0;
  color: white;
  text-align: center;
  font-weight: 600;
  position: relative;
  z-index: 10;
}

.pin-footer {
  background-color: #3a3f51;
  padding: 25px;
  margin-top: 20px;
}

.intro {
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
  background: linear-gradient(45deg, #4158D0, #C850C0, #FFCC70);
  color: white;
}

.intro h2 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  text-shadow: 0 2px 10px rgba(0,0,0,0.2);
}

.intro p {
  font-size: 1.2rem;
  max-width: 600px;
  margin-bottom: 30px;
}

.scroll-icon {
  font-size: 2rem;
  animation: bounce 2s infinite;
  opacity: 0.8;
}

.pin-container {
  padding: 50px 0;
  background-color: #f1f1f1;
}

.pin-element {
  width: 90%;
  max-width: 600px;
  margin: 0 auto;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: all 0.5s ease;
}

.pin-content {
  padding: 40px;
  text-align: center;
}

.pin-content h3 {
  font-size: 1.8rem;
  margin-bottom: 15px;
  color: #4158D0;
}

.pin-content p {
  font-size: 1.1rem;
  margin-bottom: 25px;
  color: #555;
}

.progress-bar {
  height: 6px;
  background-color: #eee;
  border-radius: 3px;
  margin: 30px 0;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, #4158D0, #C850C0);
  transition: width 0.3s ease;
}

.step-indicator {
  font-size: 0.9rem;
  color: #888;
  font-weight: 600;
}

.current-step {
  color: #4158D0;
  font-size: 1.2rem;
}

.steps-info {
  padding: 40px 20px;
}

.step {
  max-width: 800px;
  margin: 100px auto;
  padding: 30px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  opacity: 0.5;
  transform: translateY(20px);
  transition: all 0.5s ease;
}

.step.active {
  opacity: 1;
  transform: translateY(0);
}

.step h3 {
  color: #4158D0;
  margin-bottom: 15px;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-20px); }
  60% { transform: translateY(-10px); }
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(65, 88, 208, 0.4); }
  70% { box-shadow: 0 0 0 20px rgba(65, 88, 208, 0); }
  100% { box-shadow: 0 0 0 0 rgba(65, 88, 208, 0); }
}`;

const jsCode = `// 注册ScrollTrigger插件
gsap.registerPlugin(ScrollTrigger);

// 清除可能存在的ScrollTrigger实例
ScrollTrigger.getAll().forEach(st => st.kill());

// 设置默认滚动容器
ScrollTrigger.defaults({
  scroller: document.body,
  markers: false // 全局禁用标记
});

// 创建固定元素动画
ScrollTrigger.create({
  trigger: ".pin-container",
  start: "top 20%", // 当元素顶部到达视口20%位置时
  end: "bottom top-=200", // 直到步骤部分基本滚动完
  pin: true, // 固定元素
  pinSpacing: true,
  id: "pin-demo",
  onUpdate: self => {
    // 更新进度条
    const progress = self.progress;
    const progressBar = document.querySelector(".progress-fill");
    if (progressBar) {
      progressBar.style.width = \`\${progress * 100}%\`;
    }
    
    // 计算当前步骤（1-4之间）
    const currentStep = Math.min(4, Math.max(1, Math.ceil(progress * 4)));
    const stepIndicator = document.querySelector(".current-step");
    if (stepIndicator) {
      stepIndicator.textContent = currentStep;
    }
    
    // 高亮当前步骤信息
    document.querySelectorAll('.step').forEach(step => {
      const stepNum = parseInt(step.getAttribute('data-step'));
      if (stepNum === currentStep) {
        step.classList.add('active');
        
        // 给固定元素添加相应的样式变化
        const pinElement = document.querySelector('.pin-element');
        if (pinElement) {
          // 根据不同步骤添加视觉变化
          switch(currentStep) {
            case 1:
              pinElement.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
              pinElement.style.transform = 'scale(1)';
              break;
            case 2:
              pinElement.style.boxShadow = '0 15px 35px rgba(65, 88, 208, 0.2)';
              pinElement.style.transform = 'scale(1.03)';
              break;
            case 3:
              pinElement.style.boxShadow = '0 20px 40px rgba(65, 88, 208, 0.3)';
              pinElement.style.transform = 'scale(1.06)';
              break;
            case 4:
              pinElement.style.boxShadow = '0 25px 45px rgba(65, 88, 208, 0.4)';
              pinElement.style.transform = 'scale(1.08)';
              pinElement.style.animation = 'pulse 2s infinite';
              break;
          }
        }
      } else {
        step.classList.remove('active');
      }
    });
  }
});

// 添加漂亮的入场动画
gsap.from(".pin-element", {
  scrollTrigger: {
    trigger: ".pin-container",
    start: "top bottom", 
    end: "top center",
    scrub: true
  },
  y: 100,
  opacity: 0,
  duration: 1
});

// 为步骤信息添加滚动动画
gsap.utils.toArray(".step").forEach(step => {
  gsap.from(step, {
    scrollTrigger: {
      trigger: step,
      start: "top 80%",
      toggleActions: "play none none none"
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    ease: "power2.out"
  });
});`;
</script> 