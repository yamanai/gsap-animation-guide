<template>
  <div class="scrollsmoother-integration-demo">
    <h3>ScrollSmoother与ScrollTrigger集成示例</h3>
    
    <GsapEditor 
      title="平滑滚动与滚动触发结合" 
      :initialHtml="initialHtml"
      :initialCss="initialCss"
      :initialJs="initialJs"
      scrollHeight="2500px"
    />

    <!-- 提示说明区 -->
    <div class="explanation">
      <div class="tip">
        <strong>核心要点：</strong> 使用ScrollSmoother时，必须为所有ScrollTrigger动画设置<code>scroller: "#smooth-wrapper"</code>
      </div>
      
      <div class="warning">
        <strong>常见错误：</strong> 忘记设置scroller参数是使用ScrollSmoother时最常见的错误
      </div>
      
      <h4>推荐用法</h4>
      <pre><code>// ✅ 正确的ScrollTrigger配置
gsap.to(".element", {
  scrollTrigger: {
    trigger: ".element",
    start: "top center",
    scroller: "#smooth-wrapper" // 指定wrapper元素
  }
});</code></pre>
      
      <h4>不推荐用法</h4>
      <pre><code>// ❌ 错误的ScrollTrigger配置
gsap.to(".element", {
  scrollTrigger: {
    trigger: ".element",
    start: "top center"
    // 缺少scroller参数，将导致动画不正确触发
  }
});</code></pre>
    </div>
  </div>
</template>

<script setup>
// 定义初始HTML，包含ScrollSmoother和ScrollTrigger所需的结构
const initialHtml = `<!-- ScrollSmoother需要特定的DOM结构来工作 -->
<!-- 整个页面内容需要包装在两个嵌套的div中 -->
<div id="smooth-wrapper">
  <div id="smooth-content">
    <!-- 页头部分 -->
    <header>
      <h1>ScrollSmoother + ScrollTrigger</h1>
      <p>平滑滚动与滚动触发动画的完美结合</p>
    </header>
    
    <!-- 第一个动画区块 -->
    <section class="panel fade">
      <h2>滚动渐入效果</h2>
      <p>向下滚动时，元素会从透明到不透明渐入。此示例使用了ScrollTrigger的<code>scrub</code>特性</p>
      <div class="box"></div>
    </section>
    
    <!-- 第二个动画区块 -->
    <section class="panel pin">
      <h2>固定效果</h2>
      <p>这个区块在滚动到顶部时会固定，直到滚动一段距离后释放</p>
      <div class="progress-bar"><div class="progress"></div></div>
    </section>
    
    <!-- 第三个动画区块 -->
    <section class="panel batch">
      <h2>批量动画效果</h2>
      <p>这些元素会依次触发动画</p>
      <div class="items">
        <div class="item">项目 1</div>
        <div class="item">项目 2</div>
        <div class="item">项目 3</div>
        <div class="item">项目 4</div>
      </div>
    </section>
    
    <!-- 第四个动画区块 -->
    <section class="panel parallax">
      <h2>视差效果</h2>
      <p>这个区块展示了视差滚动效果</p>
      <div class="parallax-bg"></div>
      <div class="parallax-content">视差内容</div>
    </section>
    
    <!-- 页脚 -->
    <footer>
      <p>示例结束 - 滚动到底部</p>
      <button id="scrollTop">回到顶部</button>
    </footer>
  </div>
</div>`;

// 定义初始CSS，设置基本样式
const initialCss = `/* 基础样式设置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  color: #333;
  line-height: 1.6;
}

/* ScrollSmoother必要样式 */
#smooth-wrapper {
  overflow: hidden;
}

/* 页面组件样式 */
header {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: linear-gradient(135deg, #42B883, #35495E);
  color: white;
  padding: 20px;
}

.panel {
  min-height: 100vh;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
}

/* 各个区块的样式 */
.panel.fade {
  background-color: #f5f5f5;
}

.panel.pin {
  background-color: #e0f7fa;
}

.panel.batch {
  background-color: #f3e5f5;
}

.panel.parallax {
  background-color: #fafafa;
  overflow: hidden;
}

/* 元素样式 */
.box {
  width: 150px;
  height: 150px;
  background-color: #42B883;
  margin: 40px 0;
  opacity: 0; /* 初始透明，由动画控制 */
  transform: translateY(50px); /* 初始位置偏下，由动画控制 */
}

.progress-bar {
  width: 80%;
  height: 20px;
  background-color: #ddd;
  border-radius: 10px;
  margin: 30px 0;
  position: relative;
  overflow: hidden;
}

.progress {
  height: 100%;
  background-color: #42B883;
  width: 0; /* 由动画控制 */
  border-radius: 10px;
}

.items {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  max-width: 600px;
  margin: 30px auto;
}

.item {
  width: 120px;
  height: 120px;
  background-color: #b388ff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  opacity: 0; /* 初始透明，由动画控制 */
  transform: scale(0.5); /* 初始缩小，由动画控制 */
}

.parallax-bg {
  position: absolute;
  top: -50px;
  left: -50px;
  right: -50px;
  bottom: -50px;
  background: url('https://picsum.photos/id/1018/1000/600') center/cover;
  z-index: -1;
  opacity: 0.6;
}

.parallax-content {
  font-size: 48px;
  font-weight: bold;
  color: white;
  text-shadow: 0 2px 10px rgba(0,0,0,0.8);
  padding: 30px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  backdrop-filter: blur(3px);
  transform-origin: center center;
}

footer {
  padding: 60px 20px;
  text-align: center;
  background-color: #263238;
  color: white;
}

button {
  padding: 10px 20px;
  background-color: #42B883;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  margin-top: 20px;
  cursor: pointer;
}

button:hover {
  background-color: #3DA476;
}`;

// 定义初始JS，同时实现ScrollSmoother和ScrollTrigger效果
const initialJs = `// 注册所需插件
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// 创建ScrollSmoother实例 - 第一步
const smoother = ScrollSmoother.create({
  // 必需：指定wrapper和content元素
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  
  // 平滑程度，值越高越平滑
  smooth: 1.5,
  
  // 启用视差效果
  effects: true
});

// 示例1：创建渐入动画与滚动同步
gsap.to(".box", {
  opacity: 1, 
  y: 0,
  duration: 1,
  scrollTrigger: {
    trigger: ".fade",
    start: "top 80%", // 当元素顶部达到视窗80%位置时
    end: "top 30%",   // 当元素顶部达到视窗30%位置时
    scrub: 1,         // 平滑跟随滚动，值越大越平滑
    
    // 关键设置：指定正确的滚动容器
    scroller: "#smooth-wrapper" // 必须是wrapper元素
  }
});

// 示例2：创建固定元素效果
ScrollTrigger.create({
  trigger: ".pin",
  start: "top top",    // 当元素顶部到达视窗顶部时
  end: "+=300",        // 滚动300px后结束
  pin: true,           // 启用固定效果
  pinSpacing: true,    // 添加空间以避免内容重叠
  scroller: "#smooth-wrapper", // 必须的scroller参数
  
  // 创建进度条动画
  onUpdate: (self) => {
    gsap.to(".progress", {
      width: self.progress * 100 + "%",
      duration: 0.1
    });
  }
});

// 示例3：批量创建动画
// 为每个item创建单独的动画
gsap.utils.toArray(".item").forEach((item, i) => {
  gsap.fromTo(item, 
    { opacity: 0, scale: 0.5 }, // 起始状态
    {
      opacity: 1, 
      scale: 1,
      duration: 0.8, 
      delay: i * 0.2, // 每个元素依次延迟
      scrollTrigger: {
        trigger: ".batch",
        start: "top 70%",
        end: "top 30%",
        toggleActions: "play none none reverse", // 播放、无操作、无操作、反向播放
        scroller: "#smooth-wrapper" // 必须参数
      }
    }
  );
});

// 示例4：视差效果
// 增强视差效果 - 背景移动更慢
smoother.effects(".parallax-bg", { speed: 0.3 }); // 背景滚动速度更慢

// 为视差内容添加相反方向的运动，制造深度感
smoother.effects(".parallax-content", { speed: -0.5 }); // 负值表示向相反方向移动

// 为整个视差区块添加缩放效果
gsap.fromTo(".parallax", 
  { backgroundPosition: "0% 0%" },
  { 
    backgroundPosition: "100% 0%", 
    ease: "none",
    scrollTrigger: {
      trigger: ".parallax",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      scroller: "#smooth-wrapper"
    }
  }
);

// 为视差内容添加额外的动画效果，使视差内容更突出
gsap.fromTo(".parallax-content", 
  { scale: 0.6, opacity: 0 },
  {
    scale: 1, 
    opacity: 1,
    duration: 1.2,
    scrollTrigger: {
      trigger: ".parallax",
      start: "top 70%",
      end: "top 30%",
      scrub: 1,
      scroller: "#smooth-wrapper"
    }
  }
);

// 添加按钮事件监听
document.getElementById("scrollTop").addEventListener("click", () => {
  // 使用smoother的scrollTo方法而非window.scrollTo
  smoother.scrollTo(0, true); // true表示使用动画
});

// 示例：动态获取当前滚动位置
gsap.ticker.add(() => {
  console.log("当前滚动位置:", smoother.scrollTop().toFixed(0));
});`;
</script>

<style scoped>
.scrollsmoother-integration-demo {
  margin: 2rem 0;
  border-radius: 8px;
  overflow: hidden;
}

.explanation {
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.tip, .warning {
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 6px;
}

.tip {
  background-color: #e3f2fd;
  border-left: 4px solid #2196f3;
}

.warning {
  background-color: #fff8e1;
  border-left: 4px solid #ffc107;
}

pre {
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
  margin: 1rem 0;
}

code {
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
}

h4 {
  margin: 1.5rem 0 0.5rem 0;
}
</style> 