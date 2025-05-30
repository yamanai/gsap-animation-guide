<template>
  <GsapEditor 
    title="ScrollTrigger基础示例"
    :initialHtml="htmlCode"
    :initialCss="cssCode"
    :initialJs="jsCode"
  />
</template>

<script setup>
const htmlCode = `<div class="scroll-demo">
  <header class="demo-header">向下滚动体验动画效果</header>
  
  <section class="intro-section">
    <h2>ScrollTrigger 基础演示</h2>
    <p>这个示例展示了如何使用ScrollTrigger创建随滚动触发的动画。</p>
    <div class="arrow-down">↓</div>
  </section>
  
  <section class="trigger-section">
    <div class="trigger-element">
      <div class="element-content">
        <h3>基础滚动触发</h3>
        <p>当我进入视口时，我会随着滚动位置变化而动画</p>
      </div>
    </div>
  </section>
  
  <section class="info-section">
    <div class="info-card">
      <h3>工作原理</h3>
      <p>ScrollTrigger会监听页面滚动，当触发元素进入指定的视口位置时，动画将开始播放。</p>
      <p>在这个例子中，当元素顶部到达视口80%位置时开始动画，到达20%位置时动画完成。</p>
    </div>
  </section>
  
  <footer class="demo-footer">ScrollTrigger示例结束</footer>
</div>`;

const cssCode = `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f8f9fa;
  color: #212529;
  overflow-x: hidden;
  line-height: 1.5;
}

.scroll-demo {
  width: 100%;
  position: relative;
}

.demo-header, .demo-footer {
  padding: 15px;
  background-color: #4361ee;
  color: white;
  text-align: center;
  font-weight: 600;
  position: sticky;
  z-index: 10;
}

.demo-header {
  top: 0;
  box-shadow: 0 2px 10px rgba(67, 97, 238, 0.3);
}

.demo-footer {
  background-color: #3a0ca3;
  padding: 20px;
}

.intro-section {
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
  background: linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%);
  color: white;
}

.intro-section h2 {
  font-size: 2rem;
  margin-bottom: 15px;
}

.arrow-down {
  font-size: 2rem;
  margin-top: 30px;
  animation: bounce 2s infinite;
}

.trigger-section {
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
}

.trigger-element {
  width: 80%;
  max-width: 500px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transform: translateY(100px);
  overflow: hidden;
}

.element-content {
  padding: 30px;
  text-align: center;
}

.element-content h3 {
  color: #4361ee;
  margin-bottom: 15px;
}

.info-section {
  padding: 50px 20px;
  background-color: #f1f3f9;
}

.info-card {
  max-width: 600px;
  margin: 0 auto;
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.info-card h3 {
  color: #3a0ca3;
  margin-bottom: 15px;
  text-align: center;
}

.info-card p {
  margin-bottom: 15px;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
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

// 创建基本的滚动触发动画
gsap.to(".trigger-element", {
  scrollTrigger: {
    trigger: ".trigger-section", // 触发区域
    start: "top 80%", // 当触发区域顶部到达视口80%位置时开始
    end: "top 20%", // 当触发区域顶部到达视口20%位置时结束
    scrub: 1, // 平滑跟随滚动，数值越大越平滑
    toggleActions: "play none none reverse", // 进入时播放，离开时反转
    id: "basic-trigger" // 为ScrollTrigger添加ID，便于调试
  },
  y: 0, // 垂直位置归零
  opacity: 1, // 透明度变为1
  duration: 1, // 动画持续时间
  ease: "power2.out" // 缓动函数
});

// 添加入场动画
gsap.from(".info-card", {
  scrollTrigger: {
    trigger: ".info-section",
    start: "top 70%", // 当触发区域顶部到达视口70%位置时开始
    toggleActions: "play none none none", // 只触发一次
  },
  y: 50,
  opacity: 0,
  duration: 0.8,
  ease: "back.out(1.7)"
});

// 为页面添加滚动指示器（纯视觉效果）
const progressBar = document.createElement("div");
progressBar.className = "scroll-progress";
progressBar.style.cssText = "position: fixed; top: 0; left: 0; height: 5px; background: linear-gradient(90deg, #4361ee, #3a0ca3); width: 0%; z-index: 1000; transition: width 0.1s;";
document.body.appendChild(progressBar);

// 更新滚动进度条
window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercentage = (scrollTop / scrollHeight) * 100;
  progressBar.style.width = scrollPercentage + "%";
});`;
</script> 