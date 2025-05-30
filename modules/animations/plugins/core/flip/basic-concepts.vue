<template>
  <div class="flip-basic-concepts-demo">
    <h3>FLIP基本概念演示</h3>
    
    <GsapEditor 
      title="FLIP基本原理" 
      :initialHtml="initialHtml"
      :initialCss="initialCss"
      :initialJs="initialJs"
    />

    <!-- 说明区域 -->
    <div class="explanation">
      <div class="concept">
        <strong>FLIP技术原理：</strong> First(初始状态), Last(最终状态), Invert(反转), Play(播放)
      </div>
      
      <div class="info">
        <strong>核心优势：</strong> 通过计算初始和最终状态的差异来创建高性能动画，避免了手动设置中间状态
      </div>
      
      <h4>FLIP工作流程</h4>
      <div class="flip-workflow">
        <div class="step">
          <div class="step-title">1. First</div>
          <div class="step-desc">记录元素的初始状态（位置、大小等）</div>
          <div class="code">const state = Flip.getState(".box");</div>
        </div>
        <div class="step">
          <div class="step-title">2. Last</div>
          <div class="step-desc">将元素立即移动到最终位置/状态</div>
          <div class="code">element.classList.toggle("active");</div>
        </div>
        <div class="step">
          <div class="step-title">3. Invert</div>
          <div class="step-desc">计算变化并应用反向变换</div>
          <div class="code">Flip.from(state, {...});</div>
        </div>
        <div class="step">
          <div class="step-title">4. Play</div>
          <div class="step-desc">动画播放到最终状态</div>
          <div class="code">// 自动执行</div>
        </div>
      </div>
      
      <h4>技术优势</h4>
      <ul class="benefits-list">
        <li>使用CSS transform高性能动画，减少重排重绘</li>
        <li>自动计算转换，无需手动设置中间状态</li>
        <li>简洁的API，减少样板代码</li>
        <li>处理复杂布局变化的能力（位置、大小、绝对/相对定位）</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// 定义初始HTML，包含基础元素结构
const initialHtml = `<div class="container">
  <h2>FLIP基本演示</h2>
  <p>点击元素或按钮来触发变换</p>
  
  <div class="demo-section">
    <h3>基础FLIP演示</h3>
    <div class="simple-container">
      <div class="box box1">Box 1</div>
      <div class="box box2">Box 2</div>
      <div class="box box3">Box 3</div>
    </div>
    <button id="simple-flip-btn">交换位置</button>
  </div>
  
  <div class="demo-section">
    <h3>自动布局FLIP</h3>
    <div class="auto-container">
      <div class="item" data-id="1">项目 1</div>
      <div class="item" data-id="2">项目 2</div>
      <div class="item" data-id="3">项目 3</div>
      <div class="item" data-id="4">项目 4</div>
    </div>
    <div class="controls">
      <button id="shuffle-btn">打乱顺序</button>
      <button id="sort-btn">恢复顺序</button>
    </div>
  </div>
  
  <div class="demo-section">
    <h3>大小和位置变化</h3>
    <div class="resize-container">
      <div class="resize-box">
        <div class="content">
          <h4>可扩展框</h4>
          <p class="hidden-content">这是一段只在展开时可见的内容。FLIP技术让这种扩展动画非常流畅。</p>
        </div>
      </div>
    </div>
    <button id="resize-btn">扩展/收缩</button>
  </div>
</div>`;

// 定义初始CSS
const initialCss = `/* 基础样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: #333;
  padding: 20px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #2c3e50;
}

p {
  text-align: center;
  margin-bottom: 30px;
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

.demo-section {
  margin-bottom: 40px;
  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 15px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}

h3 {
  margin-bottom: 15px;
  color: #2c3e50;
}

/* 基础FLIP演示样式 */
.simple-container {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
  height: 100px;
  position: relative;
}

.box {
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.box1 {
  background-color: #3498db;
}

.box2 {
  background-color: #e74c3c;
}

.box3 {
  background-color: #2ecc71;
}

/* 自动布局FLIP样式 */
.auto-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 20px 0;
}

.item {
  background-color: #9b59b6;
  color: white;
  padding: 15px;
  border-radius: 5px;
  width: calc(50% - 5px);
  text-align: center;
  cursor: move;
}

.controls {
  display: flex;
  gap: 10px;
  justify-content: center;
}

/* 大小和位置变化样式 */
.resize-container {
  margin: 20px 0;
  display: flex;
  justify-content: center;
}

.resize-box {
  background-color: #3498db;
  border-radius: 8px;
  padding: 15px;
  color: white;
  cursor: pointer;
  width: 200px;
  height: 60px;
  overflow: hidden;
  transition: background-color 0.3s;
}

.resize-box.expanded {
  background-color: #2980b9;
  width: 100%;
  height: auto;
  min-height: 150px;
}

.hidden-content {
  opacity: 0;
  max-height: 0;
  transition: opacity 0.3s;
}

.expanded .hidden-content {
  opacity: 1;
  max-height: 200px;
  margin-top: 10px;
}`;

// 定义初始JS，实现FLIP动画效果
const initialJs = `// 注册GSAP FLIP插件
gsap.registerPlugin(Flip);

// 基础FLIP演示 - 交换两个元素位置
document.getElementById("simple-flip-btn").addEventListener("click", () => {
  // 1. First - 记录元素当前状态
  const state = Flip.getState(".box");
  
  // 2. Last - 改变DOM结构（交换第一个和最后一个盒子）
  const container = document.querySelector(".simple-container");
  const firstBox = container.querySelector(".box1");
  const lastBox = container.querySelector(".box3");
  
  // 交换DOM位置
  container.insertBefore(lastBox, firstBox);
  
  // 3 & 4. Invert & Play - 从记录的状态创建动画
  Flip.from(state, {
    duration: 0.8,          // 动画持续时间
    ease: "power1.inOut",   // 缓动函数
    absolute: true,         // 在动画期间使用绝对定位
    stagger: 0.1,           // 错开动画开始时间
    onComplete: () => {
      console.log("交换完成!");
    }
  });
});

// 自动布局FLIP - 列表项重排序
document.getElementById("shuffle-btn").addEventListener("click", () => {
  // 1. First - 记录状态
  const state = Flip.getState(".item");
  
  // 2. Last - 随机排序元素
  const container = document.querySelector(".auto-container");
  const items = [...container.children];
  
  // 打乱顺序
  items.sort(() => Math.random() - 0.5);
  
  // 重新添加到容器
  items.forEach(item => container.appendChild(item));
  
  // 3 & 4. Invert & Play
  Flip.from(state, {
    duration: 0.7,
    ease: "power1.inOut", 
    absolute: true,  
    stagger: 0.05    // 错开每个元素的开始时间
  });
});

// 恢复原始顺序
document.getElementById("sort-btn").addEventListener("click", () => {
  // 1. First - 记录状态
  const state = Flip.getState(".item");
  
  // 2. Last - 按照data-id排序
  const container = document.querySelector(".auto-container");
  const items = [...container.children];
  
  // 按id排序
  items.sort((a, b) => {
    return parseInt(a.dataset.id) - parseInt(b.dataset.id);
  });
  
  // 重新添加到容器
  items.forEach(item => container.appendChild(item));
  
  // 3 & 4. Invert & Play
  Flip.from(state, {
    duration: 0.7,
    ease: "power1.inOut",
    absolute: true
  });
});

// 大小和位置变化演示
document.getElementById("resize-btn").addEventListener("click", toggleExpand);

function toggleExpand() {
  // 1. First - 记录状态
  const state = Flip.getState(".resize-box");
  
  // 2. Last - 切换expanded类来改变尺寸
  const box = document.querySelector(".resize-box");
  box.classList.toggle("expanded");
  
  // 3 & 4. Invert & Play
  Flip.from(state, {
    duration: 0.5,
    ease: "power2.inOut",
    absolute: false,  // 这里使用false，因为我们不需要绝对定位
    onComplete: () => {
      // 动画完成后可以执行其他操作
    }
  });
}

// 允许点击调整大小
document.querySelector(".resize-box").addEventListener("click", toggleExpand);

// 箱子点击事件 - 让用户可以通过点击交换相邻盒子
document.querySelectorAll(".box").forEach(box => {
  box.addEventListener("click", function() {
    // 1. First - 记录状态
    const state = Flip.getState(".box");
    
    // 获取相邻元素
    const parent = this.parentElement;
    const isFirstChild = this === parent.firstElementChild;
    const isLastChild = this === parent.lastElementChild;
    
    // 2. Last - 移动元素
    if (isFirstChild) {
      // 如果是第一个，就移到第二个后面
      parent.insertBefore(this, parent.children[2]);
    } else if (isLastChild) {
      // 如果是最后一个，就移到第一个前面
      parent.insertBefore(this, parent.firstElementChild);
    } else {
      // 如果是中间的，就移到最后
      parent.appendChild(this);
    }
    
    // 3 & 4. Invert & Play
    Flip.from(state, {
      duration: 0.5,
      ease: "back.out(1.7)",
      absolute: true
    });
  });
});`;
</script>

<style scoped>
.flip-basic-concepts-demo {
  margin: 2rem 0;
  border-radius: 8px;
  overflow: hidden;
  max-width: 100%; /* 确保不超出父容器宽度 */
}

.explanation {
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  overflow-x: hidden; /* 防止水平溢出 */
}

.concept, .info {
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 6px;
}

.concept {
  background-color: #e3f2fd;
  border-left: 4px solid #2196f3;
}

.info {
  background-color: #e8f5e9;
  border-left: 4px solid #4caf50;
}

h4 {
  margin: 1.5rem 0 1rem 0;
  font-size: 1.2rem;
}

.flip-workflow {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1.5rem 0;
  overflow-x: auto;
}

@media (min-width: 768px) {
  .flip-workflow {
    flex-direction: row;
    flex-wrap: wrap;
  }
  
  .step {
    min-width: 200px;
    max-width: calc(25% - 0.75rem);
  }
}

.step {
  flex: 1;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 6px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  word-break: break-word;
}

.step-title {
  font-weight: bold;
  color: #2196f3;
  margin-bottom: 0.5rem;
}

.step-desc {
  font-size: 0.9rem;
  margin-bottom: 0.8rem;
}

.code {
  background-color: #f1f1f1;
  padding: 0.5rem;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.85rem;
  color: #0d47a1;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.benefits-list {
  padding-left: 1.5rem;
  margin: 1rem 0;
}

.benefits-list li {
  margin-bottom: 0.5rem;
}
</style> 