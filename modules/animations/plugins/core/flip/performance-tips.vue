<template>
  <div class="flip-performance-tips-demo">
    <h3>FLIP性能优化技巧</h3>
    
    <GsapEditor 
      title="FLIP性能优化" 
      :initialHtml="initialHtml"
      :initialCss="initialCss"
      :initialJs="initialJs"
    />

    <!-- 性能优化说明区域 -->
    <div class="explanation">
      <div class="performance-intro">
        <strong>性能考量：</strong> FLIP技术虽然高效，但在处理大量元素或复杂场景时仍需注意性能优化
      </div>
      
      <h4>核心性能优化技巧</h4>
      <div class="tips-grid">
        <div class="tip">
          <div class="tip-title"><code>simple: true</code> 优化</div>
          <div class="tip-desc">启用简化模式，仅跟踪位置和缩放信息，减少计算量</div>
          <div class="performance-impact">高性能提升 ⚡⚡⚡</div>
        </div>
        
        <div class="tip">
          <div class="tip-title">精确选择器</div>
          <div class="tip-desc">使用精确的选择器而非通用选择器，减少需要处理的元素</div>
          <div class="performance-impact">中等性能提升 ⚡⚡</div>
        </div>
        
        <div class="tip">
          <div class="tip-title">避免不必要的属性跟踪</div>
          <div class="tip-desc">只在props参数中指定必要的属性，不要跟踪不需要动画的属性</div>
          <div class="performance-impact">中等性能提升 ⚡⚡</div>
        </div>
        
        <div class="tip">
          <div class="tip-title">分批处理大量元素</div>
          <div class="tip-desc">对于大列表，考虑分批次或使用虚拟列表技术</div>
          <div class="performance-impact">高性能提升 ⚡⚡⚡</div>
        </div>
      </div>
      
      <h4>避免的常见性能陷阱</h4>
      <div class="common-mistakes">
        <div class="mistake">
          <strong>嵌套FLIP：</strong> 尽量避免在一个FLIP动画内部再触发另一个FLIP动画。
        </div>
        <div class="mistake">
          <strong>过度使用绝对定位：</strong> absolute:true会创建额外的DOM元素，在不必要时避免使用。
        </div>
        <div class="mistake">
          <strong>频繁的DOM读写：</strong> 尽量减少在动画过程中对DOM的频繁读写操作。
        </div>
        <div class="mistake">
          <strong>复杂CSS属性动画：</strong> 优先使用transform和opacity进行动画，避免触发布局重排。
        </div>
      </div>
      
      <div class="code-comparison">
        <div class="bad-code">
          <h5>❌ 低性能代码</h5>
<pre><code>// 不推荐 - 处理所有元素
const state = Flip.getState("*");

// 不推荐 - 跟踪过多属性
const state = Flip.getState(".item", {
  props: "width,height,padding,margin,color,backgroundColor,fontSize,opacity"
});

// 不推荐 - 过度使用absolute
Flip.from(state, {
  absolute: true,  // 不必要时使用绝对定位
  nested: true     // 当不需要时
});</code></pre>
        </div>
        
        <div class="good-code">
          <h5>✅ 优化代码</h5>
<pre><code>// 推荐 - 使用精确选择器
const state = Flip.getState(".specific-items-to-animate");

// 推荐 - 只跟踪需要的属性
const state = Flip.getState(".item", {
  props: "backgroundColor",  // 只跟踪需要的属性
  simple: true               // 简化计算
});

// 推荐 - 根据需要配置
Flip.from(state, {
  duration: 0.5,
  absolute: isReorderingList, // 只在需要时使用
  simple: hasLotsOfElements   // 对大量元素使用
});</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 定义初始HTML
const initialHtml = `<div class="container">
  <h2>FLIP性能优化演示</h2>
  <p>探索不同的性能优化策略</p>
  
  <div class="controls">
    <button id="generate-btn">生成100个元素</button>
    <button id="toggle-simple-btn">切换Simple模式</button>
    <button id="toggle-props-btn">切换属性跟踪</button>
    <button id="shuffle-btn">随机排序</button>
  </div>
  
  <!-- 性能指标 -->
  <div class="metrics">
    <div class="metric">
      <span>动画持续时间:</span>
      <span id="animation-time">0ms</span>
    </div>
    <div class="metric">
      <span>元素计算时间:</span>
      <span id="calculation-time">0ms</span>
    </div>
    <div class="metric">
      <span>当前模式:</span>
      <span id="current-mode">标准模式</span>
    </div>
    <div class="metric">
      <span>属性跟踪:</span>
      <span id="tracking-props">关闭</span>
    </div>
    <div class="metric">
      <span>元素数量:</span>
      <span id="element-count">0</span>
    </div>
  </div>
  
  <div class="settings-panel">
    <h3>优化设置</h3>
    <div class="setting">
      <input type="checkbox" id="use-batch" checked>
      <label for="use-batch">使用批处理</label>
      <span class="tip">将大量元素分成多个批次处理</span>
    </div>
    <div class="setting">
      <input type="checkbox" id="use-will-change">
      <label for="use-will-change">启用will-change</label>
      <span class="tip">告知浏览器提前准备元素变换</span>
    </div>
    <div class="setting">
      <label for="batch-size">批处理大小: <span id="batch-size-value">20</span></label>
      <input type="range" id="batch-size" min="10" max="50" value="20">
    </div>
  </div>
  
  <!-- 性能图表 -->
  <div class="performance-chart">
    <canvas id="performanceChart" width="600" height="200"></canvas>
  </div>
  
  <!-- 元素容器 -->
  <div id="elements-container"></div>
  
  <!-- 日志输出 -->
  <div class="log-container">
    <div class="log-header">性能日志</div>
    <div id="log-output"></div>
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

.container {
  max-width: 900px;
  margin: 0 auto;
}

h2, h3 {
  color: #2c3e50;
  margin-bottom: 15px;
}

p {
  margin-bottom: 25px;
}

/* 控制区域样式 */
.controls {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #2980b9;
}

/* 指标显示样式 */
.metrics {
  background-color: #f8f9fa;
  border-radius: 6px;
  padding: 15px;
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.metric {
  background-color: white;
  padding: 10px 15px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  flex: 1;
  min-width: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#animation-time, #calculation-time {
  font-weight: bold;
  color: #e74c3c;
}

/* 设置面板样式 */
.settings-panel {
  background-color: #f1f1f1;
  border-radius: 6px;
  padding: 15px;
  margin-bottom: 20px;
}

.setting {
  margin: 10px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.tip {
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-left: 5px;
}

input[type="range"] {
  width: 100%;
  margin: 10px 0;
}

/* 性能图表样式 */
.performance-chart {
  background-color: white;
  border: 1px solid #e1e1e1;
  border-radius: 6px;
  padding: 10px;
  margin-bottom: 20px;
}

/* 元素容器样式 */
#elements-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 10px;
  padding: 20px;
  border: 1px solid #e1e1e1;
  border-radius: 6px;
  min-height: 200px;
  margin-bottom: 20px;
}

.element {
  background-color: #3498db;
  color: white;
  border-radius: 4px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  transition: background-color 0.2s;
}

.element:hover {
  background-color: #2980b9;
}

.red-element {
  background-color: #e74c3c;
}

.green-element {
  background-color: #2ecc71;
}

.purple-element {
  background-color: #9b59b6;
}

.element.optimized {
  will-change: transform;
}

/* 日志区域样式 */
.log-container {
  border: 1px solid #e1e1e1;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 20px;
}

.log-header {
  background-color: #34495e;
  color: white;
  padding: 8px 12px;
  font-weight: bold;
}

#log-output {
  height: 150px;
  overflow-y: auto;
  padding: 10px;
  background-color: #f8f9fa;
  font-family: monospace;
  font-size: 12px;
  line-height: 1.4;
}

.log-entry {
  margin-bottom: 5px;
  padding-bottom: 5px;
  border-bottom: 1px solid #f0f0f0;
}

.log-time {
  color: #7f8c8d;
  margin-right: 5px;
}

.log-info {
  color: #2980b9;
}

.log-warning {
  color: #e67e22;
}

.log-error {
  color: #c0392b;
}`;

// 定义初始JS，实现FLIP性能优化演示
const initialJs = `// 注册GSAP FLIP插件
gsap.registerPlugin(Flip);

// 全局变量
let useSimpleMode = false;
let trackProps = false;
let elementCount = 0;
const performanceData = {
  standard: [],
  simple: [],
  propsTracking: [],
  batchProcessing: []
};

// 性能计时器
const timer = {
  start: 0,
  end: 0,
  
  startMeasure() {
    this.start = performance.now();
    return this.start;
  },
  
  endMeasure() {
    this.end = performance.now();
    return this.end - this.start;
  }
};

// 日志函数
function log(message, type = 'info') {
  const logOutput = document.getElementById('log-output');
  const entry = document.createElement('div');
  entry.className = \`log-entry log-\${type}\`;
  
  const time = new Date().toLocaleTimeString();
  entry.innerHTML = \`<span class="log-time">\${time}</span> \${message}\`;
  
  logOutput.insertBefore(entry, logOutput.firstChild);
  
  // 限制日志条目数量
  if (logOutput.children.length > 50) {
    logOutput.removeChild(logOutput.lastChild);
  }
}

// 更新性能指标显示
function updateMetrics(animationTime, calculationTime) {
  document.getElementById('animation-time').textContent = \`\${animationTime.toFixed(2)}ms\`;
  document.getElementById('calculation-time').textContent = \`\${calculationTime.toFixed(2)}ms\`;
  document.getElementById('current-mode').textContent = useSimpleMode ? '简化模式' : '标准模式';
  document.getElementById('tracking-props').textContent = trackProps ? '开启' : '关闭';
  document.getElementById('element-count').textContent = elementCount;
}

// 元素生成函数
function generateElements(count) {
  const container = document.getElementById('elements-container');
  
  // 清空容器
  container.innerHTML = '';
  elementCount = count;
  
  // 是否使用will-change优化
  const useWillChange = document.getElementById('use-will-change').checked;
  
  // 生成指定数量的元素
  for (let i = 1; i <= count; i++) {
    const element = document.createElement('div');
    element.className = \`element \${getRandomColorClass()}\`;
    element.textContent = i;
    element.dataset.id = i;
    
    if (useWillChange) {
      element.classList.add('optimized');
    }
    
    container.appendChild(element);
  }
  
  log(\`生成了 \${count} 个元素\${useWillChange ? '（启用will-change优化）' : ''}\`);
  updateMetrics(0, 0);
  
  return document.querySelectorAll('.element');
}

// 随机获取颜色类名
function getRandomColorClass() {
  const colors = ['', 'red-element', 'green-element', 'purple-element'];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

// 批量处理元素
function processBatchedFlip(elements) {
  const useBatch = document.getElementById('use-batch').checked;
  const batchSize = parseInt(document.getElementById('batch-size').value);
  
  if (!useBatch) {
    // 不使用批处理，一次性处理所有元素
    return performFlip(elements);
  }
  
  // 使用批处理
  const batches = [];
  for (let i = 0; i < elements.length; i += batchSize) {
    batches.push([...elements].slice(i, i + batchSize));
  }
  
  log(\`将 \${elements.length} 个元素分成 \${batches.length} 个批次处理，每批 \${batchSize} 个元素\`, 'info');
  
  // 处理每个批次
  let calculationTime = 0;
  let animationTime = 0;
  
  batches.forEach((batch, index) => {
    const { calcTime, animTime } = performFlip(batch, index * 0.05);
    calculationTime += calcTime;
    animationTime += animTime;
  });
  
  return { calculationTime, animationTime: animationTime / batches.length };
}

// 执行FLIP动画
function performFlip(elements, delay = 0) {
  // 计算状态获取时间
  timer.startMeasure();
  
  // 获取当前状态，应用优化选项
  const state = Flip.getState(elements, {
    simple: useSimpleMode,
    props: trackProps ? "backgroundColor" : ""
  });
  
  const calculationTime = timer.endMeasure();
  
  // 重新排序元素
  const container = document.getElementById('elements-container');
  const elementArray = [...elements];
  
  elementArray.sort(() => Math.random() - 0.5);
  elementArray.forEach(el => container.appendChild(el));
  
  // 计算动画执行时间
  timer.startMeasure();
  
  // 从之前状态创建动画
  Flip.from(state, {
    duration: 0.8,
    ease: "power1.inOut",
    absolute: true,
    delay: delay,
    stagger: 0.01,
    onComplete: () => {
      const animationTime = timer.endMeasure();
      
      if (delay === 0) {
        updateMetrics(animationTime, calculationTime);
        
        // 记录性能数据
        if (useSimpleMode) {
          performanceData.simple.push(animationTime);
        } else if (trackProps) {
          performanceData.propsTracking.push(animationTime);
        } else if (document.getElementById('use-batch').checked) {
          performanceData.batchProcessing.push(animationTime);
        } else {
          performanceData.standard.push(animationTime);
        }
        
        // 更新图表
        updatePerformanceChart();
      }
    }
  });
  
  return { calcTime: calculationTime, animTime: 0 }; // 动画时间会在onComplete中计算
}

// 初始化性能图表
function initPerformanceChart() {
  const ctx = document.getElementById('performanceChart').getContext('2d');
  window.perfChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [
        {
          label: '标准模式',
          data: [],
          borderColor: '#3498db',
          backgroundColor: 'rgba(52, 152, 219, 0.1)',
          tension: 0.4
        },
        {
          label: '简化模式',
          data: [],
          borderColor: '#2ecc71',
          backgroundColor: 'rgba(46, 204, 113, 0.1)',
          tension: 0.4
        },
        {
          label: '属性跟踪',
          data: [],
          borderColor: '#e74c3c',
          backgroundColor: 'rgba(231, 76, 60, 0.1)',
          tension: 0.4
        },
        {
          label: '批量处理',
          data: [],
          borderColor: '#9b59b6',
          backgroundColor: 'rgba(155, 89, 182, 0.1)',
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: '动画时间 (ms)'
          }
        },
        x: {
          title: {
            display: true,
            text: '测试次数'
          }
        }
      }
    }
  });
}

// 更新性能图表
function updatePerformanceChart() {
  const chart = window.perfChart;
  
  // 更新标签
  const maxLength = Math.max(
    performanceData.standard.length,
    performanceData.simple.length,
    performanceData.propsTracking.length,
    performanceData.batchProcessing.length
  );
  
  chart.data.labels = Array.from({ length: maxLength }, (_, i) => i + 1);
  
  // 更新数据集
  chart.data.datasets[0].data = performanceData.standard;
  chart.data.datasets[1].data = performanceData.simple;
  chart.data.datasets[2].data = performanceData.propsTracking;
  chart.data.datasets[3].data = performanceData.batchProcessing;
  
  chart.update();
}

// 事件监听设置
document.addEventListener('DOMContentLoaded', () => {
  // 初始化图表
  initPerformanceChart();
  
  // 生成元素按钮
  document.getElementById('generate-btn').addEventListener('click', () => {
    generateElements(100);
  });
  
  // 切换简化模式按钮
  document.getElementById('toggle-simple-btn').addEventListener('click', () => {
    useSimpleMode = !useSimpleMode;
    log(\`\${useSimpleMode ? '启用' : '禁用'}简化模式 (simple: \${useSimpleMode})\`, useSimpleMode ? 'info' : 'warning');
    document.getElementById('current-mode').textContent = useSimpleMode ? '简化模式' : '标准模式';
  });
  
  // 切换属性跟踪按钮
  document.getElementById('toggle-props-btn').addEventListener('click', () => {
    trackProps = !trackProps;
    log(\`\${trackProps ? '启用' : '禁用'}属性跟踪\`, trackProps ? 'info' : 'warning');
    document.getElementById('tracking-props').textContent = trackProps ? '开启' : '关闭';
  });
  
  // 随机排序按钮
  document.getElementById('shuffle-btn').addEventListener('click', () => {
    const elements = document.querySelectorAll('.element');
    if (elements.length === 0) {
      log('没有元素可以排序！请先生成元素', 'error');
      return;
    }
    
    log(\`开始对 \${elements.length} 个元素进行排序动画\`, 'info');
    processBatchedFlip(elements);
  });
  
  // 批处理大小滑块
  document.getElementById('batch-size').addEventListener('input', function() {
    document.getElementById('batch-size-value').textContent = this.value;
  });
  
  // 初始生成20个元素
  generateElements(20);
});`;
</script>

<style scoped>
.flip-performance-tips-demo {
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

.performance-intro {
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 6px;
  background-color: #f1f8e9;
  border-left: 4px solid #8bc34a;
}

h4 {
  margin: 1.5rem 0 1rem 0;
  font-size: 1.2rem;
  color: #2e7d32;
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
  margin: 1.5rem 0;
}

@media (min-width: 768px) {
  .tips-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.tip {
  padding: 1.2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.tip-title {
  font-weight: bold;
  color: #2e7d32;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.tip-desc {
  margin-bottom: 1rem;
  color: #555;
  font-size: 0.95rem;
}

.performance-impact {
  font-size: 0.9rem;
  color: #ff6d00;
  font-weight: bold;
}

.common-mistakes {
  margin: 1.5rem 0;
}

.mistake {
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: #fff;
  border-radius: 6px;
  border-left: 3px solid #f44336;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.code-comparison {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1.5rem 0;
}

@media (min-width: 768px) {
  .code-comparison {
    flex-direction: row;
  }
}

.bad-code, .good-code {
  flex: 1;
  padding: 1.5rem;
  border-radius: 6px;
}

.bad-code {
  background-color: #ffebee;
}

.good-code {
  background-color: #e8f5e9;
}

.bad-code h5, .good-code h5 {
  margin-top: 0;
  margin-bottom: 1rem;
  text-align: center;
}

code {
  font-family: 'Courier New', monospace;
  background-color: rgba(0,0,0,0.05);
  padding: 2px 4px;
  border-radius: 3px;
  font-size: 0.9rem;
}

pre {
  margin: 0;
  padding: 1rem;
  background-color: rgba(0,0,0,0.05);
  border-radius: 4px;
  overflow-x: auto;
}

pre code {
  background-color: transparent;
  padding: 0;
  font-size: 0.85rem;
  line-height: 1.6;
}
</style> 