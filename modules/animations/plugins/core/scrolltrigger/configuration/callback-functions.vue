<template>
  <GsapEditor 
    title="ScrollTrigger 回调函数演示"
    :initialHtml="htmlCode"
    :initialCss="cssCode"
    :initialJs="jsCode"
    scrollHeight="1000px"
  />
</template>

<script setup>
const htmlCode = `<div class="start-message">↓ 请向下滚动开始</div>

<!-- 故意添加大量空间，确保触发元素一开始在视口外 -->
<div class="invisible-spacer"></div>

<div class="demo-container">
  <div class="status-display">
    <div class="status-item" id="status-enter">onEnter: 未触发</div>
    <div class="status-item" id="status-leave">onLeave: 未触发</div>
    <div class="status-item" id="status-enterBack">onEnterBack: 未触发</div>
    <div class="status-item" id="status-leaveBack">onLeaveBack: 未触发</div>
    <div class="status-item" id="status-toggle">isActive: false</div>
    <div class="status-item" id="status-progress">进度: 0%</div>
  </div>
  
  <!-- 触发元素容器 -->
  <div class="container">
    <div class="animated-box">滚动位置回调函数</div>
  </div>
  
  <!-- 可视化组件 -->
  <div class="progress-bar">进度指示器</div>
  <div class="direction-indicator">
    <div class="arrow"></div>
  </div>
  
  <!-- 底部空间 -->
  <div class="bottom-spacer"></div>
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

/* 起始信息 */
.start-message {
  position: fixed;
  top: 20px;
  left: 0;
  width: 100%;
  text-align: center;
  padding: 10px;
  background: #f9f0ff;
  color: #6a0572;
  font-weight: bold;
  font-size: 16px;
  z-index: 100;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

/* 顶部空白，确保触发元素在视口外 */
.invisible-spacer {
  height: 300px;
  width: 100%;
}

.demo-container {
  width: 100%;
  position: relative;
}

/* 状态显示面板 */
.status-display {
  position: fixed;
  top: 70px;
  right: 15px;
  background: rgba(255,255,255,0.95);
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 10px;
  width: 180px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  z-index: 95;
}

.status-item {
  padding: 5px;
  margin: 3px 0;
  font-size: 12px;
  border-radius: 3px;
  transition: background-color 0.3s, color 0.3s;
}

.status-item.active {
  background-color: #4caf50;
  color: white;
}

.status-item.triggered {
  background-color: #2196f3;
  color: white;
}

/* 动画容器 */
.container {
  width: 100%;
  padding: 40px;
  height: 500px; /* 增加容器高度，提供更多滚动空间 */
  margin: 0 auto;
  background-color: #f5f5f5;
  text-align: center;
}

.animated-box {
  display: inline-block;
  padding: 20px 40px;
  background-color: #6a0572;
  color: white;
  border-radius: 8px;
  font-size: 18px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

/* 进度条 */
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 5px;
  background: linear-gradient(90deg, #6a0572, #b71540);
  width: 0%;
  z-index: 100;
  opacity: 0;
}

/* 方向指示器 */
.direction-indicator {
  position: fixed;
  top: 50%;
  right: 15px;
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  z-index: 95;
  opacity: 0;
}

.arrow {
  width: 20px;
  height: 20px;
  border: 3px solid #6a0572;
  border-top: none;
  border-right: none;
  transform: rotate(-45deg);
  transition: transform 0.3s;
}

.arrow.up {
  transform: rotate(135deg);
}

.bottom-spacer {
  height: 500px; /* 增加底部空间，确保有足够滚动空间触发onLeave */
}
`;

const jsCode = `// 注册 ScrollTrigger 插件
gsap.registerPlugin(ScrollTrigger);

// 清除可能存在的ScrollTrigger实例
ScrollTrigger.getAll().forEach(st => st.kill());

// 全局禁用标记
ScrollTrigger.defaults({ markers: false });

// 强制滚动到顶部
try {
  window.scrollTo({
    top: 0,
    behavior: "auto"
  });
} catch (e) {
  window.scrollTo(0, 0);
}

// 重要：在首次运行时，手动设置初始状态
gsap.set('.animated-box', { x: 0, opacity: 1, rotation: 0 });
gsap.set('.progress-bar', { width: '0%', opacity: 0 });
gsap.set('.direction-indicator', { opacity: 0 });

// 用于更新状态面板的函数
function updateStatus(id, text, isActive) {
  const element = document.getElementById(id);
  if (!element) return;
  
  element.textContent = text;
  if (isActive) {
    element.classList.add('triggered');
    // 短暂突显，然后变为活动状态
    setTimeout(() => {
      element.classList.remove('triggered');
      element.classList.add('active');
    }, 500);
  } else {
    element.classList.remove('active');
    element.classList.remove('triggered');
  }
}

// 更新箭头方向
function updateDirection(isDown) {
  const arrow = document.querySelector('.arrow');
  if (!arrow) return;
  
  if (isDown) {
    arrow.classList.remove('up');
  } else {
    arrow.classList.add('up');
  }
}

// 一旦用户开始滚动，隐藏开始消息
window.addEventListener('scroll', function hideStartMessage() {
  const startMessage = document.querySelector('.start-message');
  if (startMessage) {
    startMessage.style.opacity = '0';
    setTimeout(() => {
      startMessage.style.display = 'none';
    }, 500);
    window.removeEventListener('scroll', hideStartMessage);
  }
}, { once: true });
  
  // 创建动画
  gsap.to('.animated-box', {
  x: 150,
  rotation: 360,
    scrollTrigger: {
      trigger: '.container',
    // 修改触发点，使回调更容易被触发
    start: 'top 70%',  // 容器顶部到达视口70%位置时开始
    end: 'bottom 30%', // 容器底部到达视口30%位置时结束
    scrub: 1,
    toggleActions: "play pause reverse reset", // 添加默认的toggleActions
    id: "callback-functions",
    
    // 回调函数展示
    onEnter: function(self) {
      console.log("onEnter 触发 - 元素进入视图");
      updateStatus('status-enter', 'onEnter: 已触发 ✓', true);
      gsap.to('.progress-bar', { opacity: 1, duration: 0.3 });
      gsap.to('.direction-indicator', { opacity: 1, duration: 0.3 });
    },
    
    onLeave: function(self) {
      console.log("onLeave 触发 - 元素离开视图");
      updateStatus('status-leave', 'onLeave: 已触发 ✓', true);
    },
    
    onEnterBack: function(self) {
      console.log("onEnterBack 触发 - 元素再次进入视图");
      updateStatus('status-enterBack', 'onEnterBack: 已触发 ✓', true);
    },
    
    onLeaveBack: function(self) {
      console.log("onLeaveBack 触发 - 元素再次离开视图");
      updateStatus('status-leaveBack', 'onLeaveBack: 已触发 ✓', true);
    },
    
    onToggle: function(self) {
      console.log("onToggle 触发 - 活动状态切换:", self.isActive);
      updateStatus('status-toggle', 'isActive: ' + self.isActive, self.isActive);
    },
    
    onUpdate: function(self) {
        // 更新进度条
      const progress = Math.round(self.progress * 100);
      gsap.to('.progress-bar', { 
        width: progress + '%', 
        duration: 0.1,
        overwrite: true 
      });
      
      // 更新进度文本
      updateStatus('status-progress', '进度: ' + progress + '%', false);
      
      // 检测滚动方向
      updateDirection(self.direction < 0);
      }
    }
});`;
</script> 