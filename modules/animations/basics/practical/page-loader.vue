<template>
  <GsapEditor 
    title="页面加载动画"
    :initialHtml="htmlCode"
    :initialCss="cssCode"
    :initialJs="jsCode"
  />
</template>

<script setup>
const htmlCode = `<div class="page-demo">
  <!-- 加载动画覆盖层 -->
  <div class="loader-overlay">
    <div class="loader-content">
      <div class="loader-icon">
        <svg viewBox="0 0 24 24" width="60" height="60">
          <circle cx="12" cy="12" r="10" fill="none" stroke="#ffffff" stroke-width="2" class="loader-circle"></circle>
        </svg>
      </div>
      <div class="loader-text">加载中</div>
      <div class="loader-progress">
        <div class="loader-bar"></div>
      </div>
    </div>
  </div>

  <!-- 页面内容 -->
  <div class="page-content">
    <header class="page-header">
      <h1>欢迎访问</h1>
      <p>GSAP动画实战案例</p>
    </header>
    
    <div class="content-section">
      <div class="content-box box1">
        <h2>创意设计</h2>
        <p>创造引人入胜的用户体验</p>
      </div>
      <div class="content-box box2">
        <h2>流畅动画</h2>
        <p>打造顺滑的页面转场效果</p>
      </div>
      <div class="content-box box3">
        <h2>交互体验</h2>
        <p>提升网站互动性能</p>
      </div>
    </div>
    
    <div class="reload-button">重新加载</div>
  </div>
</div>`;

const cssCode = `.page-demo {
  position: relative;
  width: 100%;
  height: 300px;
  background-color: #f8f9fa;
  overflow: hidden;
  border-radius: 8px;
  font-family: 'Arial', sans-serif;
}
.loader-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #2c3e50;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}
.loader-content {
  text-align: center;
  color: white;
}
.loader-circle {
  stroke-dasharray: 65;
  stroke-dashoffset: 65;
  transform-origin: center;
}
.loader-text {
  margin: 15px 0;
  font-size: 16px;
  opacity: 0;
}
.loader-progress {
  width: 200px;
  height: 6px;
  background-color: rgba(255,255,255,0.2);
  border-radius: 3px;
  overflow: hidden;
  margin: 10px auto;
}
.loader-bar {
  height: 100%;
  width: 0%;
  background-color: #3498db;
}
.page-content {
  padding: 20px;
  opacity: 0;
}
.page-header {
  text-align: center;
  margin-bottom: 20px;
}
.page-header h1 {
  margin: 0;
  font-size: 24px;
  color: #2c3e50;
}
.page-header p {
  margin: 5px 0 0;
  font-size: 14px;
  color: #7f8c8d;
}
.content-section {
  display: flex;
  justify-content: space-between;
  margin: 30px 0;
  gap: 15px;
}
.content-box {
  flex: 1;
  background-color: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.1);
  text-align: center;
  opacity: 0;
  transform: translateY(20px);
}
.content-box h2 {
  margin: 0 0 10px;
  font-size: 16px;
  color: #2c3e50;
}
.content-box p {
  margin: 0;
  font-size: 13px;
  color: #7f8c8d;
}
.box1 {
  border-top: 3px solid #3498db;
}
.box2 {
  border-top: 3px solid #e74c3c;
}
.box3 {
  border-top: 3px solid #2ecc71;
}
.reload-button {
  background-color: #3498db;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  text-align: center;
  width: 100px;
  margin: 20px auto 0;
  cursor: pointer;
  font-size: 14px;
  opacity: 0;
}
.reload-button:hover {
  background-color: #2980b9;
}`;

const jsCode = `// 创建主时间轴
const mainTimeline = gsap.timeline();

// 执行加载动画序列
function playLoaderAnimation() {
  // 重置页面状态
  gsap.set(".page-content", { opacity: 0 });
  gsap.set(".content-box", { opacity: 0, y: 20 });
  gsap.set(".reload-button", { opacity: 0 });
  gsap.set(".loader-overlay", { autoAlpha: 1 });
  gsap.set(".loader-text", { opacity: 0 });
  gsap.set(".loader-bar", { width: "0%" });
  gsap.set(".loader-circle", { strokeDashoffset: 65 });
  
  // 创建加载动画
  mainTimeline.clear();
  
  mainTimeline
    // STEP 1: 圆形加载指示器动画
    .to(".loader-circle", {
      strokeDashoffset: 0,
      duration: 1,
      ease: "power2.inOut"
    })
    // STEP 2: 显示"加载中"文字
    .to(".loader-text", {
      opacity: 1,
      duration: 0.5
    }, "-=0.5")
    // STEP 3: 进度条动画
    .to(".loader-bar", {
      width: "100%",
      duration: 2,
      ease: "power1.inOut"
    })
    // STEP 4: 延迟一小段时间，表示加载完成
    .to({}, { duration: 0.5 })
    // STEP 5: 隐藏加载界面
    .to(".loader-overlay", {
      autoAlpha: 0,
      duration: 0.8,
      ease: "power2.inOut"
    })
    // STEP 6: 显示页面内容
    .to(".page-content", {
      opacity: 1,
      duration: 0.8
    }, "-=0.4")
    // STEP 7: 内容块逐个显示
    .to(".content-box", {
      opacity: 1,
      y: 0,
      stagger: 0.2,
      duration: 0.6,
      ease: "back.out(1.7)"
    })
    // STEP 8: 显示重新加载按钮
    .to(".reload-button", {
      opacity: 1,
      duration: 0.5
    });
  
  // 添加实时加载旋转动画
  gsap.to(".loader-icon", {
    rotation: 360,
    duration: 2,
    repeat: -1,
    ease: "linear"
  });
}

// 初始化页面加载动画
playLoaderAnimation();

// 添加"重新加载"按钮点击事件
document.querySelector(".reload-button").addEventListener("click", function() {
  // 按钮动画效果
  gsap.to(this, {
    scale: 0.95,
    backgroundColor: "#2980b9",
    duration: 0.1,
    onComplete: function() {
      gsap.to(".reload-button", {
        scale: 1,
        duration: 0.2
      });
      
      // 重新播放加载动画
      playLoaderAnimation();
    }
  });
});`;
</script> 