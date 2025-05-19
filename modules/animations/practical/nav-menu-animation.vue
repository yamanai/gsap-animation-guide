<template>
  <GsapEditor 
    title="响应式导航菜单动画"
    :initialHtml="htmlCode"
    :initialCss="cssCode"
    :initialJs="jsCode"
  />
</template>

<script setup>
const htmlCode = `<div class="nav-demo">
  <header class="site-header">
    <div class="logo">GSAP菜单</div>
    <div class="burger-menu">
      <div class="line line1"></div>
      <div class="line line2"></div>
      <div class="line line3"></div>
    </div>
  </header>
  
  <nav class="nav-menu">
    <ul>
      <li class="nav-item"><a href="#home">首页</a></li>
      <li class="nav-item"><a href="#about">关于</a></li>
      <li class="nav-item"><a href="#services">服务</a></li>
      <li class="nav-item"><a href="#portfolio">作品</a></li>
      <li class="nav-item"><a href="#contact">联系我们</a></li>
    </ul>
  </nav>
</div>`;

const cssCode = `.nav-demo {
  font-family: 'Arial', sans-serif;
  position: relative;
  width: 100%;
  height: 280px;
  overflow: hidden;
  background-color: #f8f9fa;
  border-radius: 8px;
}
.site-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: #2c3e50;
  color: white;
  position: relative;
  z-index: 2;
}
.logo {
  font-size: 18px;
  font-weight: bold;
}
.burger-menu {
  width: 30px;
  height: 25px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.line {
  width: 100%;
  height: 3px;
  background-color: white;
  border-radius: 3px;
  transition: 0.3s;
}
.nav-menu {
  position: absolute;
  top: -100%;
  left: 0;
  width: 100%;
  background-color: #34495e;
  z-index: 1;
  padding: 70px 0 20px;
  visibility: hidden;
}
.nav-menu ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.nav-item {
  opacity: 0;
  transform: translateX(-20px);
}
.nav-item a {
  display: block;
  padding: 10px 20px;
  color: white;
  text-decoration: none;
  font-size: 16px;
  transition: 0.2s;
}
.nav-item a:hover {
  background-color: rgba(255,255,255,0.1);
}`;

const jsCode = `// 创建导航菜单的时间轴动画
const menuTimeline = gsap.timeline({ paused: true });

// 添加菜单展开动画
menuTimeline
  // 菜单背景滑入
  .to(".nav-menu", {
    top: 0,
    visibility: "visible",
    duration: 0.5,
    ease: "power2.out"
  })
  // 汉堡图标变成X形状
  .to(".line1", {
    rotation: 45,
    transformOrigin: "center",
    y: 9,
    duration: 0.2
  }, "-=0.3")
  .to(".line2", {
    opacity: 0,
    duration: 0.1
  }, "-=0.3")
  .to(".line3", {
    rotation: -45,
    transformOrigin: "center",
    y: -9,
    duration: 0.2
  }, "-=0.3")
  // 菜单项依次渐入
  .to(".nav-item", {
    opacity: 1,
    x: 0,
    stagger: 0.1,
    ease: "power2.out"
  }, "-=0.2");

// 监听汉堡菜单点击
document.querySelector(".burger-menu").addEventListener("click", function() {
  // 如果菜单已打开，则反向播放动画关闭菜单
  if (menuTimeline.progress() > 0 && !menuTimeline.reversed()) {
    menuTimeline.reverse();
  } else {
    // 否则正向播放动画打开菜单
    menuTimeline.play();
  }
});

// 为每个菜单项添加点击事件
document.querySelectorAll(".nav-item a").forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    
    // 创建点击反馈动画
    gsap.to(this, {
      backgroundColor: "rgba(255,255,255,0.3)",
      scale: 0.95,
      duration: 0.1,
      onComplete: function() {
        gsap.to(link, {
          backgroundColor: "rgba(255,255,255,0.1)",
          scale: 1,
          duration: 0.3
        });
        // 关闭菜单
        menuTimeline.reverse();
      }
    });
  });
});`;
</script> 