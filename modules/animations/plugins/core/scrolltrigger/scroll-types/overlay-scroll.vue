<template>
  <GsapEditor 
    title="叠加滚动效果"
    :initialHtml="htmlCode"
    :initialCss="cssCode"
    :initialJs="jsCode"
    scrollHeight="600px"
  />
</template>

<script setup>
const htmlCode = `<div class="overlay-demo">
  <div class="explanation">
    <h3>叠加滚动效果</h3>
    <p>内容元素在固定背景上滚动，产生视差效果</p>
  </div>
  <div class="scroll-section">
    <div class="bg-container">
      <div class="background"></div>
      <div class="floating-elements">
        <div class="float-circle float-1"></div>
        <div class="float-circle float-2"></div>
        <div class="float-circle float-3"></div>
      </div>
      <div class="overlay-text">视差效果</div>
    </div>
    <div class="content">
      <div class="content-block">
        <h3>第一个内容区</h3>
        <p>向下滚动查看层叠滚动效果，背景和文字将以不同的速率移动。</p>
        <div class="box box1"></div>
      </div>
      <div class="content-block">
        <h3>第二个内容区</h3>
        <p>随着滚动继续，注意背景如何缓慢移动，而内容正常滚动。</p>
        <div class="box box2"></div>
      </div>
      <div class="content-block">
        <h3>第三个内容区</h3>
        <p>这种效果非常适合创造沉浸式的滚动体验，增强视觉层次感。</p>
        <div class="box box3"></div>
      </div>
      <div class="scroll-indicator">
        <span>继续滚动</span>
        <div class="arrow">↓</div>
      </div>
    </div>
  </div>
</div>`;

const cssCode = `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: 'Segoe UI', Tahoma, Arial, sans-serif;
  color: #333;
  overflow-x: hidden;
  background-color: #f9f9f9;
}
.overlay-demo {
  width: 100%;
  padding: 15px;
}
.explanation {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}
.explanation h3 {
  margin-bottom: 8px;
  color: #2c3e50;
  font-size: 18px;
}
.explanation p {
  color: #7f8c8d;
  font-size: 14px;
}
.scroll-section {
  position: relative;
  height: 520px;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.15);
}
.bg-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
}
.background {
  width: 100%;
  height: 150%;
  position: absolute;
  top: 0;
  left: 0;
  background-image: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d);
  background-size: 300% 300%;
  animation: gradientMove 15s ease infinite;
}

@keyframes gradientMove {
  0% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0% 50% }
}

.floating-elements {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.float-circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.5;
  filter: blur(5px);
}

.float-1 {
  width: 150px;
  height: 150px;
  background: rgba(255, 255, 255, 0.1);
  top: 10%;
  left: 15%;
}

.float-2 {
  width: 100px;
  height: 100px;
  background: rgba(255, 255, 255, 0.15);
  bottom: 20%;
  right: 10%;
}

.float-3 {
  width: 180px;
  height: 180px;
  background: rgba(255, 255, 255, 0.08);
  top: 40%;
  right: 25%;
}

.overlay-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: rgba(255, 255, 255, 0.15);
  font-size: 7rem;
  font-weight: 900;
  white-space: nowrap;
  text-transform: uppercase;
  letter-spacing: 5px;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
}
.content {
  position: relative;
  height: 100%;
  overflow-y: auto;
  z-index: 2;
  padding: 15px 0;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.5) transparent;
}

/* 美化滚动条 */
.content::-webkit-scrollbar {
  width: 6px;
}

.content::-webkit-scrollbar-track {
  background: transparent;
}

.content::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 3px;
}

.content-block {
  min-height: 250px;
  padding: 40px 25px;
  backdrop-filter: blur(8px);
  background-color: rgba(255, 255, 255, 0.8);
  margin: 40px 30px;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateY(20px);
  opacity: 0;
  transition: all 0.4s ease;
}

.content-block h3 {
  margin-bottom: 20px;
  color: #2c3e50;
  font-size: 22px;
  position: relative;
}

.content-block h3:after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 3px;
  background: linear-gradient(90deg, #1a2a6c, #b21f1f);
  border-radius: 2px;
}

.content-block p {
  margin-bottom: 25px;
  color: #34495e;
  max-width: 85%;
  text-align: center;
  line-height: 1.7;
  font-size: 15px;
}

.box {
  width: 100px;
  height: 100px;
  border-radius: 12px;
  margin: 10px;
  opacity: 0;
  transform: scale(0.5) rotate(-5deg);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.box:hover {
  transform: scale(1.1) rotate(0deg) !important;
}

.box1 { background: linear-gradient(135deg, #f6d365, #fda085); }
.box2 { background: linear-gradient(135deg, #84fab0, #8fd3f4); }
.box3 { background: linear-gradient(135deg, #a6c0fe, #f68084); }

.scroll-indicator {
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  padding: 15px;
  margin-top: 15px;
  margin-bottom: 30px;
}

.scroll-indicator span {
  display: block;
  font-size: 14px;
  margin-bottom: 5px;
}

.scroll-indicator .arrow {
  font-size: 20px;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
}`;

const jsCode = `// 注册 ScrollTrigger 插件
gsap.registerPlugin(ScrollTrigger);

// 清除可能存在的ScrollTrigger实例
ScrollTrigger.getAll().forEach(st => st.kill());

// 全局禁用标记
ScrollTrigger.defaults({ markers: false });

// 确保DOM准备好后执行
function initScrollEffects() {
  // 创建背景视差效果
  gsap.to('.background', {
    y: '-30%', // 增加移动幅度，使视差效果更加明显
    ease: 'none',
    scrollTrigger: {
      trigger: '.scroll-section',
      start: 'top top',
      end: 'bottom top',
      scrub: 0.8, // 使动画与滚动同步，平滑过渡
      invalidateOnRefresh: true, // 窗口大小改变时重新计算
      id: 'background-parallax'
    }
  });

  // 创建浮动元素的视差效果，每个元素速度不同
  gsap.utils.toArray('.float-circle').forEach((circle, i) => {
    const direction = i % 2 === 0 ? 1 : -1; // 交替方向
    const speed = 0.5 + (i * 0.2); // 每个元素速度不同
    
    gsap.to(circle, {
      y: \`\${direction * (40 + i * 15)}%\`, // 不同移动距离
      x: \`\${direction * (i * 5)}%\`,
      ease: 'none',
      scrollTrigger: {
        trigger: '.scroll-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: speed,
        invalidateOnRefresh: true
      }
    });
  });

  // 创建大文字视差效果
  gsap.to('.overlay-text', {
    y: '80%', // 增加移动幅度
    scale: 1.2,
    ease: 'none',
    scrollTrigger: {
      trigger: '.scroll-section',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5, // 更平滑的过渡
      invalidateOnRefresh: true,
      id: 'text-parallax'
    }
  });

  // 为内容块添加滚动进入动画
  gsap.utils.toArray('.content-block').forEach((block, i) => {
    // 获取当前块中的盒子元素
    const box = block.querySelector('.box');
    const blockIndex = i + 1;
    
    // 创建内容块进入动画
    ScrollTrigger.create({
      trigger: block,
      scroller: '.content', 
      start: 'top 80%',
      onEnter: () => {
        gsap.to(block, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out'
        });
      }
    });
    
    // 创建盒子动画
    gsap.to(box, {
      scale: 1,
      rotation: 0,
      opacity: 1,
      duration: 1,
      ease: 'elastic.out(1, 0.5)',
      scrollTrigger: {
        trigger: block,
        scroller: '.content', 
        start: 'top 65%',
        toggleActions: 'play none none reverse',
        id: 'content-block-' + blockIndex
      }
    });
  });

  // 设置内容容器的ScrollTrigger
  ScrollTrigger.scrollerProxy('.content', {
    scrollTop(value) {
      if (arguments.length) {
        document.querySelector('.content').scrollTop = value;
      }
      return document.querySelector('.content').scrollTop;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight
      };
    }
  });

  // 更新ScrollTrigger
  ScrollTrigger.refresh();
}

// 初始化
initScrollEffects();

// 监听内容滚动事件
document.querySelector('.content').addEventListener('scroll', ScrollTrigger.update);

// 添加额外的动画效果
gsap.set('.float-circle', { scale: 1 });
gsap.to('.float-1', { scale: 1.2, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
gsap.to('.float-2', { scale: 0.8, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1 });
gsap.to('.float-3', { scale: 1.1, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2 });`;
</script> 