<template>
  <GsapEditor 
    title="多重滚动器效果"
    :initialHtml="htmlCode"
    :initialCss="cssCode"
    :initialJs="jsCode"
    scrollHeight="650px"
  />
</template>

<script setup>
const htmlCode = `<div class="dual-scroll-container">
  <div class="intro">
    <h2>多重滚动器示例</h2>
    <p>ScrollTrigger可以监控多个独立的滚动区域</p>
    <div class="instruction">👉 分别滚动左右两个面板查看效果</div>
  </div>
  
  <div class="panels-container">
    <!-- 左侧面板 -->
    <div class="scroll-panel left-panel">
      <h3 class="panel-title">左侧滚动区域</h3>
      <div class="scroll-content">
        <div class="scroll-item box1">项目 1</div>
        <div class="scroll-item box2">项目 2</div>
        <div class="scroll-item box3">项目 3</div>
        <div class="scroll-item box4">项目 4</div>
        <div class="scroll-item box5">项目 5</div>
        <div class="scroll-item box6">项目 6</div>
        <div class="scroll-item box7">项目 7</div>
      </div>
      <div class="progress-bar left-progress"></div>
    </div>
    
    <!-- 右侧面板 -->
    <div class="scroll-panel right-panel">
      <h3 class="panel-title">右侧滚动区域</h3>
      <div class="scroll-content">
        <div class="scroll-item box5">项目 A</div>
        <div class="scroll-item box4">项目 B</div>
        <div class="scroll-item box3">项目 C</div>
        <div class="scroll-item box2">项目 D</div>
        <div class="scroll-item box1">项目 E</div>
        <div class="scroll-item box6">项目 F</div>
        <div class="scroll-item box7">项目 G</div>
      </div>
      <div class="progress-bar right-progress"></div>
    </div>
  </div>
</div>`;

const cssCode = `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Arial', sans-serif;
  background-color: #f8f9fa;
  color: #333;
}

.dual-scroll-container {
  max-width: 100%;
  margin: 0 auto;
  padding: 15px;
}

.intro {
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  text-align: center;
}

.intro h2 {
  margin-bottom: 10px;
  color: #333;
  font-size: 20px;
}

.intro p {
  color: #666;
  margin-bottom: 10px;
}

.instruction {
  display: inline-block;
  background-color: #fff3cd;
  color: #856404;
  padding: 8px 12px;
  border-radius: 4px;
  margin-top: 10px;
  font-size: 14px;
  animation: pulse 2s infinite;
}

.panels-container {
  display: flex;
  gap: 20px;
  height: 450px;
}

.scroll-panel {
  flex: 1;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.1);
  position: relative;
  overflow: hidden;
}

.panel-title {
  padding: 12px;
  background-color: #f8f8f8;
  border-bottom: 1px solid #eee;
  text-align: center;
  font-size: 16px;
  position: sticky;
  top: 0;
  z-index: 10;
  transition: background-color 0.3s ease;
}

.scroll-content {
  height: calc(100% - 44px);
  overflow-y: auto;
  padding: 15px;
  position: relative;
  -webkit-overflow-scrolling: touch; /* 提高iOS滚动性能 */
}

.scroll-item {
  margin-bottom: 20px;
  padding: 30px 20px;
  border-radius: 6px;
  color: white;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  will-change: transform, opacity;
  position: relative;
  box-shadow: 0 3px 10px rgba(0,0,0,0.1);
}

.scroll-item.active {
  box-shadow: 0 8px 25px rgba(0,0,0,0.2);
}

.scroll-item.active:after {
  content: '✓';
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255,255,255,0.3);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

.box1 { background: linear-gradient(135deg, #667eea, #764ba2); }
.box2 { background: linear-gradient(135deg, #2af598, #009efd); }
.box3 { background: linear-gradient(135deg, #f6d365, #fda085); }
.box4 { background: linear-gradient(135deg, #ff9a9e, #fad0c4); }
.box5 { background: linear-gradient(135deg, #a18cd1, #fbc2eb); }
.box6 { background: linear-gradient(135deg, #4facfe, #00f2fe); }
.box7 { background: linear-gradient(135deg, #43e97b, #38f9d7); }

.progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  width: 0;
  background: linear-gradient(to right, #0984e3, #6c5ce7);
  z-index: 20;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}`;

const jsCode = `// 注册ScrollTrigger插件
gsap.registerPlugin(ScrollTrigger);

// 清除可能存在的ScrollTrigger实例
ScrollTrigger.getAll().forEach(st => st.kill());

// 设置全局默认值
ScrollTrigger.defaults({
  markers: false // 确保所有实例默认不显示标记
});

// 初始化函数
function initScrollPanels() {
  // 创建入场动画
  const tl = gsap.timeline();
  tl.from('.intro', { y: -20, opacity: 0, duration: 0.6 })
    .from('.scroll-panel', { x: function(i) { return i ? 20 : -20 }, opacity: 0, stagger: 0.2, duration: 0.5 });

  // 初始化左侧面板
  initPanel('.left-panel', '.left-progress');
  
  // 初始化右侧面板
  initPanel('.right-panel', '.right-progress');
}

// 初始化滚动面板
function initPanel(panelSelector, progressSelector) {
  const panel = document.querySelector(panelSelector);
  if (!panel) return;
  
  const scrollContent = panel.querySelector('.scroll-content');
  const progressBar = panel.querySelector(progressSelector);
  const items = panel.querySelectorAll('.scroll-item');
  
  // 预设动画状态
  gsap.set(items, { 
    opacity: 0.5, 
    y: 20, 
    scale: 0.95,
    transformOrigin: 'center'
  });
  
  // 为每个项目创建ScrollTrigger
  items.forEach((item, index) => {
    // 创建更明显的动画效果
    const itemAnim = gsap.timeline({ paused: true })
      .to(item, { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 0.4,
        ease: "back.out(1.3)"
      });
    
    // 创建ScrollTrigger以控制动画
    ScrollTrigger.create({
      trigger: item,
      scroller: scrollContent,
      start: "top 75%", // 当项目顶部到达视口75%位置时触发
      end: "bottom 25%", // 当项目底部到达视口25%位置时结束
      onToggle: (self) => {
        if(self.isActive) {
          itemAnim.play();
          item.classList.add('active');
        } else {
          itemAnim.reverse();
          item.classList.remove('active');
        }
      },
      id: \`item-\${index}\`,
      markers: false
    });
  });
  
  // 创建进度条滚动动画
  ScrollTrigger.create({
    scroller: scrollContent,
    start: "top top",
    end: "bottom bottom",
    onUpdate: self => {
      gsap.to(progressBar, {
        width: \`\${self.progress * 100}%\`,
        duration: 0.1
      });
    },
    markers: false
  });
  
  // 监听滚动内容，更新状态文本
  scrollContent.addEventListener('scroll', function() {
    // 获取panel中的所有活动元素
    const activeItems = panel.querySelectorAll('.scroll-item.active');
    panel.querySelector('.panel-title').innerText = 
      \`\${panelSelector.includes('left') ? '左侧' : '右侧'}区域 - 活动项: \${activeItems.length}\`;
  });
}

// 确保DOM加载完毕后初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollPanels);
} else {
  initScrollPanels();
}
`;
</script>