<template>
  <div class="flip-configuration-demo">
    <h3>FLIP配置选项演示</h3>
    
    <GsapEditor 
      title="FLIP配置参数" 
      :initialHtml="initialHtml"
      :initialCss="initialCss"
      :initialJs="initialJs"
    />

    <!-- 配置选项说明区域 -->
    <div class="explanation">
      <div class="config-intro">
        <strong>FLIP配置选项：</strong> Flip.from()方法接受多种参数来自定义动画行为
      </div>
      
      <div class="option-table">
        <h4>核心配置参数</h4>
        <table>
          <thead>
            <tr>
              <th>选项</th>
              <th>类型</th>
              <th>默认值</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>duration</code></td>
              <td>Number</td>
              <td>0.5</td>
              <td>动画持续时间（秒）</td>
            </tr>
            <tr>
              <td><code>ease</code></td>
              <td>String/Function</td>
              <td>"power1.inOut"</td>
              <td>缓动函数，控制动画的速度曲线</td>
            </tr>
            <tr>
              <td><code>absolute</code></td>
              <td>Boolean</td>
              <td>false</td>
              <td>动画期间是否使用绝对定位</td>
            </tr>
            <tr>
              <td><code>scale</code></td>
              <td>Boolean</td>
              <td>true</td>
              <td>是否动画尺寸变化</td>
            </tr>
            <tr>
              <td><code>simple</code></td>
              <td>Boolean</td>
              <td>false</td>
              <td>使用简化计算（更高性能）</td>
            </tr>
            <tr>
              <td><code>stagger</code></td>
              <td>Number/Object</td>
              <td>0</td>
              <td>多个元素的动画错开时间</td>
            </tr>
          </tbody>
        </table>

        <h4>回调函数</h4>
        <table>
          <thead>
            <tr>
              <th>回调</th>
              <th>触发时机</th>
              <th>参数</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>onEnter</code></td>
              <td>元素进入时</td>
              <td>elements, animation</td>
            </tr>
            <tr>
              <td><code>onLeave</code></td>
              <td>元素移除时</td>
              <td>elements, animation</td>
            </tr>
            <tr>
              <td><code>onStart</code></td>
              <td>动画开始时</td>
              <td>elements</td>
            </tr>
            <tr>
              <td><code>onComplete</code></td>
              <td>动画完成时</td>
              <td>elements</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <h4>使用建议</h4>
      <ul class="tips-list">
        <li>对于<strong>列表重排序</strong>，始终使用<code>absolute: true</code>以避免布局跳动</li>
        <li>使用<code>simple: true</code>可以在有大量元素时提高性能</li>
        <li>大多数情况下保持<code>scale: true</code>以获得自然的缩放过渡</li>
        <li>使用<code>stagger</code>参数为多元素动画增加视觉层次</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// 定义初始HTML
const initialHtml = `<div class="container">
  <h2>FLIP配置选项演示</h2>
  <p>使用下面的控制面板来探索不同的配置选项</p>
  
  <div class="config-panel">
    <h3>动画控制面板</h3>
    
    <div class="config-section">
      <label>持续时间 (duration): <span id="duration-value">0.5</span>秒</label>
      <input type="range" id="duration" min="0.1" max="2" step="0.1" value="0.5">
      
      <label>缓动函数 (ease):</label>
      <select id="ease">
        <option value="power1.inOut">power1.inOut (默认)</option>
        <option value="power2.out">power2.out</option>
        <option value="back.out(1.7)">back.out</option>
        <option value="elastic.out(1, 0.3)">elastic.out</option>
        <option value="none">none (线性)</option>
      </select>
      
      <div class="option-row">
        <div class="option">
          <input type="checkbox" id="absolute" checked>
          <label for="absolute">使用绝对定位 (absolute)</label>
        </div>
        
        <div class="option">
          <input type="checkbox" id="scale" checked>
          <label for="scale">缩放动画 (scale)</label>
        </div>
      </div>
      
      <div class="option-row">
        <div class="option">
          <input type="checkbox" id="simple">
          <label for="simple">简化计算 (simple)</label>
        </div>
      </div>
      
      <label>交错时间 (stagger): <span id="stagger-value">0</span>秒</label>
      <input type="range" id="stagger" min="0" max="0.5" step="0.05" value="0">
    </div>
  </div>
  
  <!-- 演示区域 -->
  <div class="demo-container">
    <h3>配置效果演示</h3>
    
    <div class="grid-demo">
      <div class="grid grid-3">
        <div class="card" data-id="1">1</div>
        <div class="card" data-id="2">2</div>
        <div class="card" data-id="3">3</div>
        <div class="card" data-id="4">4</div>
        <div class="card" data-id="5">5</div>
        <div class="card" data-id="6">6</div>
      </div>
    </div>
    
    <div class="controls">
      <button id="shuffle-btn">打乱顺序</button>
      <button id="change-layout-btn">切换布局</button>
      <button id="reset-btn">重置</button>
    </div>
    
    <!-- 动画日志 -->
    <div class="animation-log">
      <h4>动画日志</h4>
      <div id="log-container"></div>
    </div>
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

h2, h3, h4 {
  color: #2c3e50;
}

.container {
  max-width: 900px;
  margin: 0 auto;
}

h2 {
  text-align: center;
  margin-bottom: 15px;
}

p {
  text-align: center;
  margin-bottom: 25px;
}

/* 配置面板样式 */
.config-panel {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.config-section {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

label {
  font-weight: 500;
  display: block;
  margin-bottom: 5px;
}

input[type="range"] {
  width: 100%;
}

select {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.option-row {
  display: flex;
  gap: 20px;
  margin: 5px 0;
}

.option {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* 演示区域样式 */
.demo-container {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.grid-demo {
  position: relative;
  min-height: 300px;
  margin: 20px 0;
  background-color: #f1f1f1;
  border-radius: 4px;
  padding: 15px;
}

/* 网格布局 */
.grid {
  display: grid;
  gap: 15px;
  transition: grid-template-columns 0.3s ease;
}

.grid-3 {
  grid-template-columns: repeat(3, 1fr);
}

.grid-2 {
  grid-template-columns: repeat(2, 1fr);
}

.grid-1 {
  grid-template-columns: 1fr;
}

.card {
  background-color: #3498db;
  color: white;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  min-height: 100px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

/* 控制按钮 */
.controls {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin: 20px 0;
}

button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}

#shuffle-btn {
  background-color: #9b59b6;
}

#shuffle-btn:hover {
  background-color: #8e44ad;
}

#change-layout-btn {
  background-color: #3498db;
}

#change-layout-btn:hover {
  background-color: #2980b9;
}

#reset-btn {
  background-color: #e74c3c;
}

#reset-btn:hover {
  background-color: #c0392b;
}

/* 动画日志样式 */
.animation-log {
  margin-top: 30px;
  border-top: 1px solid #eee;
  padding-top: 15px;
}

#log-container {
  background-color: #f8f9fa;
  border-radius: 4px;
  padding: 10px;
  max-height: 150px;
  overflow-y: auto;
  font-family: monospace;
  font-size: 14px;
  margin-top: 10px;
  color: #555;
}

.log-entry {
  margin-bottom: 5px;
  padding: 3px 0;
  border-bottom: 1px dashed #ddd;
}`;

// 定义初始JS，实现FLIP配置演示
const initialJs = `// 注册GSAP FLIP插件
gsap.registerPlugin(Flip);

// 缓存DOM元素
const grid = document.querySelector(".grid");
const cards = document.querySelectorAll(".card");
const logContainer = document.getElementById("log-container");

// 获取控制元素
const durationInput = document.getElementById("duration");
const durationValue = document.getElementById("duration-value");
const easeSelect = document.getElementById("ease");
const absoluteCheckbox = document.getElementById("absolute");
const scaleCheckbox = document.getElementById("scale");
const simpleCheckbox = document.getElementById("simple");
const staggerInput = document.getElementById("stagger");
const staggerValue = document.getElementById("stagger-value");

// 当前网格布局类型
let currentLayout = 3;

// 记录动画日志
function logAnimation(message) {
  const entry = document.createElement("div");
  entry.className = "log-entry";
  entry.textContent = \`\${new Date().toLocaleTimeString()} - \${message}\`;
  logContainer.prepend(entry);
  
  // 限制日志条目数量
  if (logContainer.children.length > 10) {
    logContainer.removeChild(logContainer.lastChild);
  }
}

// 更新控制面板显示
function updateControlDisplay() {
  durationValue.textContent = durationInput.value;
  staggerValue.textContent = staggerInput.value;
}

// 获取当前配置
function getCurrentConfig() {
  return {
    duration: parseFloat(durationInput.value),
    ease: easeSelect.value,
    absolute: absoluteCheckbox.checked,
    scale: scaleCheckbox.checked,
    simple: simpleCheckbox.checked,
    stagger: parseFloat(staggerInput.value),
    onStart: elements => {
      logAnimation("动画开始，影响的元素: " + elements.length);
    },
    onComplete: elements => {
      logAnimation("动画完成!");
    }
  };
}

// 打乱卡片顺序
document.getElementById("shuffle-btn").addEventListener("click", () => {
  // 记录当前状态
  const state = Flip.getState(".card");
  
  // 获取配置选项
  const config = getCurrentConfig();
  
  // 打乱顺序
  const cardArray = [...cards];
  cardArray.sort(() => Math.random() - 0.5);
  
  // 重新添加到容器
  cardArray.forEach(card => {
    grid.appendChild(card);
  });
  
  // 应用FLIP动画
  Flip.from(state, config);
  
  // 记录日志
  logAnimation(\`打乱卡片: duration=\${config.duration}s, ease=\${config.ease}, absolute=\${config.absolute}, scale=\${config.scale}, stagger=\${config.stagger}\`);
});

// 切换布局
document.getElementById("change-layout-btn").addEventListener("click", () => {
  // 记录当前状态
  const state = Flip.getState(".card", {
    props: "color,backgroundColor",  // 额外跟踪这些属性
  });
  
  // 获取配置选项
  const config = getCurrentConfig();
  
  // 循环切换布局
  currentLayout = currentLayout === 1 ? 3 : currentLayout - 1;
  
  // 更改网格布局
  grid.className = \`grid grid-\${currentLayout}\`;
  
  // 为卡片添加新的随机背景色
  const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c'];
  cards.forEach(card => {
    card.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  });
  
  // 应用FLIP动画
  Flip.from(state, config);
  
  // 记录日志
  logAnimation(\`切换布局至 \${currentLayout} 列布局\`);
});

// 重置布局
document.getElementById("reset-btn").addEventListener("click", () => {
  // 记录当前状态
  const state = Flip.getState(".card");
  
  // 获取配置选项
  const config = getCurrentConfig();
  
  // 重置为初始布局
  grid.className = "grid grid-3";
  currentLayout = 3;
  
  // 按照data-id属性重新排序
  const sortedCards = [...cards].sort((a, b) => {
    return parseInt(a.dataset.id) - parseInt(b.dataset.id);
  });
  
  // 重新添加到容器
  sortedCards.forEach(card => {
    card.style.backgroundColor = "#3498db"; // 重置颜色
    grid.appendChild(card);
  });
  
  // 应用FLIP动画
  Flip.from(state, config);
  
  // 记录日志
  logAnimation("重置布局到初始状态");
});

// 设置控制面板事件
durationInput.addEventListener("input", updateControlDisplay);
staggerInput.addEventListener("input", updateControlDisplay);

// 初始化显示
updateControlDisplay();
logAnimation("FLIP配置演示已加载");

// 功能提示
logAnimation("提示: 尝试不同的配置组合，观察动画效果变化");`;
</script>

<style scoped>
.flip-configuration-demo {
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

.config-intro {
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 6px;
  background-color: #e3f2fd;
  border-left: 4px solid #2196f3;
}

.option-table {
  margin: 1.5rem 0;
}

h4 {
  margin: 1.5rem 0 1rem 0;
  font-size: 1.2rem;
  color: #1976d2;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
}

th, td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #e1e1e1;
}

th {
  background-color: #f5f5f5;
  font-weight: 600;
}

tr:nth-child(even) {
  background-color: #fafafa;
}

tr:hover {
  background-color: #f0f0f0;
}

code {
  font-family: 'Courier New', monospace;
  background-color: #f1f1f1;
  padding: 2px 4px;
  border-radius: 3px;
  font-size: 0.9rem;
  color: #e53935;
}

.tips-list {
  padding-left: 1.5rem;
  margin: 1rem 0;
}

.tips-list li {
  margin-bottom: 0.8rem;
}
</style> 