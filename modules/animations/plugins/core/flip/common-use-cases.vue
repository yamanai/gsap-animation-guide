<template>
  <div class="flip-common-use-cases-demo">
    <h3>FLIP常见用例演示</h3>
    
    <GsapEditor 
      title="FLIP实用场景" 
      :initialHtml="initialHtml"
      :initialCss="initialCss"
      :initialJs="initialJs"
    />

    <!-- 典型用例说明区域 -->
    <div class="explanation">
      <div class="use-case-intro">
        <strong>常见用例：</strong> FLIP技术广泛应用于现代UI交互设计中的布局转换动画
      </div>
      
      <h4>典型应用场景</h4>
      <div class="use-cases-grid">
        <div class="use-case">
          <div class="use-case-title">列表排序动画</div>
          <div class="use-case-desc">当列表项重新排序时，使用FLIP创建平滑的位置过渡</div>
          <div class="tag">电商网站</div>
          <div class="tag">数据仪表板</div>
        </div>
        
        <div class="use-case">
          <div class="use-case-title">网格/列表视图切换</div>
          <div class="use-case-desc">在不同的布局模式之间切换，保持元素之间的视觉连续性</div>
          <div class="tag">照片库</div>
          <div class="tag">内容管理系统</div>
        </div>
        
        <div class="use-case">
          <div class="use-case-title">卡片展开与收起</div>
          <div class="use-case-desc">卡片从缩略图展开到详情视图，或从详情视图收回</div>
          <div class="tag">产品详情</div>
          <div class="tag">移动应用</div>
        </div>
        
        <div class="use-case">
          <div class="use-case-title">共享元素过渡</div>
          <div class="use-case-desc">在页面导航时，元素从一个位置平滑过渡到另一个位置</div>
          <div class="tag">图片查看器</div>
          <div class="tag">SPA应用</div>
        </div>
      </div>
      
      <h4>实现难点与解决方案</h4>
      <div class="solutions">
        <div class="solution">
          <strong>父容器变更：</strong> 当元素在不同容器间移动时，使用<code>absolute: true</code>确保正确动画。
        </div>
        <div class="solution">
          <strong>新增/删除元素：</strong> 结合<code>onEnter</code>和<code>onLeave</code>回调处理元素的添加与移除。
        </div>
        <div class="solution">
          <strong>CSS属性过渡：</strong> 使用<code>props</code>选项跟踪除位置和大小外的其他属性变化。
        </div>
        <div class="solution">
          <strong>性能优化：</strong> 对于大量元素，可使用<code>simple: true</code>提高性能。
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 定义初始HTML
const initialHtml = `<div class="container">
  <h2>FLIP常见用例演示</h2>
  <p>点击下面的按钮探索不同的FLIP用例</p>
  
  <!-- 菜单 -->
  <div class="menu">
    <button id="grid-list-btn" class="active">网格/列表切换</button>
    <button id="sort-btn">排序动画</button>
    <button id="card-expand-btn">卡片展开</button>
    <button id="shared-element-btn">共享元素</button>
  </div>
  
  <!-- 演示区域 -->
  <div class="demo-area">
    <!-- 1. 网格/列表视图切换 -->
    <div id="grid-list-demo" class="demo-section active">
      <div class="view-controls">
        <button id="grid-view-btn" class="active">网格视图</button>
        <button id="list-view-btn">列表视图</button>
      </div>
      
      <div class="items-container grid-view">
        <div class="item" data-id="1">
          <img src="https://picsum.photos/id/10/80/80" alt="Item 1">
          <div class="item-content">
            <h3>项目标题 1</h3>
            <p class="description">这是项目1的详细描述，在列表视图中可见。</p>
          </div>
        </div>
        <div class="item" data-id="2">
          <img src="https://picsum.photos/id/20/80/80" alt="Item 2">
          <div class="item-content">
            <h3>项目标题 2</h3>
            <p class="description">这是项目2的详细描述，在列表视图中可见。</p>
          </div>
        </div>
        <div class="item" data-id="3">
          <img src="https://picsum.photos/id/30/80/80" alt="Item 3">
          <div class="item-content">
            <h3>项目标题 3</h3>
            <p class="description">这是项目3的详细描述，在列表视图中可见。</p>
          </div>
        </div>
        <div class="item" data-id="4">
          <img src="https://picsum.photos/id/40/80/80" alt="Item 4">
          <div class="item-content">
            <h3>项目标题 4</h3>
            <p class="description">这是项目4的详细描述，在列表视图中可见。</p>
          </div>
        </div>
        <div class="item" data-id="5">
          <img src="https://picsum.photos/id/50/80/80" alt="Item 5">
          <div class="item-content">
            <h3>项目标题 5</h3>
            <p class="description">这是项目5的详细描述，在列表视图中可见。</p>
          </div>
        </div>
        <div class="item" data-id="6">
          <img src="https://picsum.photos/id/60/80/80" alt="Item 6">
          <div class="item-content">
            <h3>项目标题 6</h3>
            <p class="description">这是项目6的详细描述，在列表视图中可见。</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 2. 排序动画 -->
    <div id="sort-demo" class="demo-section">
      <div class="sort-controls">
        <button id="sort-name-asc">按名称升序</button>
        <button id="sort-name-desc">按名称降序</button>
        <button id="shuffle-items">随机排序</button>
      </div>
      
      <div class="sortable-container">
        <div class="sort-item" data-name="苹果" data-value="8">
          <div class="sort-item-name">苹果</div>
          <div class="sort-item-value">8</div>
        </div>
        <div class="sort-item" data-name="香蕉" data-value="5">
          <div class="sort-item-name">香蕉</div>
          <div class="sort-item-value">5</div>
        </div>
        <div class="sort-item" data-name="橙子" data-value="12">
          <div class="sort-item-name">橙子</div>
          <div class="sort-item-value">12</div>
        </div>
        <div class="sort-item" data-name="葡萄" data-value="3">
          <div class="sort-item-name">葡萄</div>
          <div class="sort-item-value">3</div>
        </div>
        <div class="sort-item" data-name="西瓜" data-value="15">
          <div class="sort-item-name">西瓜</div>
          <div class="sort-item-value">15</div>
        </div>
      </div>
    </div>
    
    <!-- 3. 卡片展开 -->
    <div id="card-expand-demo" class="demo-section">
      <div class="cards-container">
        <div class="card" data-id="1">
          <div class="card-thumbnail">
            <img src="https://picsum.photos/id/100/200/200" alt="Card 1">
            <h3>卡片标题 1</h3>
          </div>
          <div class="card-details">
            <h3>卡片标题 1</h3>
            <p>这是卡片1的详细内容。当卡片展开时，用户可以看到更多信息。</p>
            <p>点击卡片任意位置可以收起。</p>
          </div>
        </div>
        <div class="card" data-id="2">
          <div class="card-thumbnail">
            <img src="https://picsum.photos/id/200/200/200" alt="Card 2">
            <h3>卡片标题 2</h3>
          </div>
          <div class="card-details">
            <h3>卡片标题 2</h3>
            <p>这是卡片2的详细内容。当卡片展开时，用户可以看到更多信息。</p>
            <p>点击卡片任意位置可以收起。</p>
          </div>
        </div>
        <div class="card" data-id="3">
          <div class="card-thumbnail">
            <img src="https://picsum.photos/id/300/200/200" alt="Card 3">
            <h3>卡片标题 3</h3>
          </div>
          <div class="card-details">
            <h3>卡片标题 3</h3>
            <p>这是卡片3的详细内容。当卡片展开时，用户可以看到更多信息。</p>
            <p>点击卡片任意位置可以收起。</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 4. 共享元素过渡 -->
    <div id="shared-element-demo" class="demo-section">
      <div class="page-container">
        <div id="page1" class="page active">
          <h3>页面 1 - 图库</h3>
          <div class="gallery">
            <div class="gallery-item" data-id="1">
              <img src="https://picsum.photos/id/1001/120/120" alt="Image 1">
              <div class="caption">图片 1</div>
            </div>
            <div class="gallery-item" data-id="2">
              <img src="https://picsum.photos/id/1002/120/120" alt="Image 2">
              <div class="caption">图片 2</div>
            </div>
            <div class="gallery-item" data-id="3">
              <img src="https://picsum.photos/id/1003/120/120" alt="Image 3">
              <div class="caption">图片 3</div>
            </div>
            <div class="gallery-item" data-id="4">
              <img src="https://picsum.photos/id/1004/120/120" alt="Image 4">
              <div class="caption">图片 4</div>
            </div>
          </div>
        </div>
        
        <div id="page2" class="page">
          <button id="back-btn">&larr; 返回</button>
          <div class="detail-view">
            <!-- 详情内容将在JS中动态填充 -->
          </div>
        </div>
      </div>
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

.container {
  max-width: 900px;
  margin: 0 auto;
  overflow: hidden;
}

h2 {
  text-align: center;
  margin-bottom: 15px;
  color: #2c3e50;
}

p {
  text-align: center;
  margin-bottom: 25px;
}

/* 菜单样式 */
.menu {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

button {
  background-color: #e0e0e0;
  color: #333;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

button:hover {
  background-color: #d0d0d0;
}

button.active {
  background-color: #3498db;
  color: white;
}

/* 演示区域样式 */
.demo-area {
  position: relative;
  min-height: 400px;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  padding: 20px;
  background: #fafafa;
}

.demo-section {
  display: none;
  opacity: 0;
}

.demo-section.active {
  display: block;
  opacity: 1;
}

/* 1. 网格/列表视图切换 */
.view-controls {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

.items-container {
  display: grid;
  gap: 15px;
  transition: all 0.3s;
}

.items-container.grid-view {
  grid-template-columns: repeat(3, 1fr);
}

.items-container.list-view {
  grid-template-columns: 1fr;
}

.item {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  overflow: hidden;
  display: flex;
  transition: all 0.3s;
}

.items-container.grid-view .item {
  flex-direction: column;
}

.items-container.list-view .item {
  flex-direction: row;
}

.item img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.items-container.list-view .item img {
  width: 80px;
  height: 80px;
}

.item-content {
  padding: 15px;
  flex: 1;
}

.items-container.grid-view .description {
  display: none;
}

/* 2. 排序动画 */
.sort-controls {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.sortable-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sort-item {
  display: flex;
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  justify-content: space-between;
  align-items: center;
}

.sort-item-name {
  font-weight: bold;
}

.sort-item-value {
  background: #e3f2fd;
  padding: 5px 12px;
  border-radius: 20px;
}

/* 3. 卡片展开 */
.cards-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.card {
  position: relative;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: all 0.3s;
}

.card.expanded {
  grid-column: span 3;
  height: 300px;
}

.card-thumbnail {
  height: 100%;
}

.card-thumbnail img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.card-thumbnail h3 {
  padding: 15px;
}

.card-details {
  display: none;
  padding: 20px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
}

.card.expanded .card-thumbnail {
  display: none;
}

.card.expanded .card-details {
  display: block;
}

/* 4. 共享元素过渡 */
.page-container {
  position: relative;
  min-height: 300px;
}

.page {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
}

.page.active {
  opacity: 1;
  pointer-events: auto;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 15px;
  margin-top: 20px;
}

.gallery-item {
  cursor: pointer;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.gallery-item img {
  width: 100%;
  height: 120px;
  object-fit: cover;
}

.caption {
  padding: 10px;
  text-align: center;
}

.detail-view {
  margin-top: 20px;
}

.detail-image {
  width: 100%;
  max-height: 300px;
  object-fit: contain;
  margin-bottom: 15px;
}

#back-btn {
  margin-bottom: 15px;
}`;

// 定义初始JS，实现各种FLIP常见用例
const initialJs = `// 注册GSAP FLIP插件
gsap.registerPlugin(Flip);

// 主菜单控制
document.querySelectorAll('.menu button').forEach(button => {
  button.addEventListener('click', function() {
    // 更新活动按钮状态
    document.querySelectorAll('.menu button').forEach(btn => {
      btn.classList.remove('active');
    });
    this.classList.add('active');
    
    // 显示对应的演示区域
    const demoId = this.id.replace('-btn', '-demo');
    
    // 记录当前活动演示的状态，用于平滑切换
    const state = Flip.getState('.demo-section.active');
    
    // 更新活动演示区域
    document.querySelectorAll('.demo-section').forEach(section => {
      section.classList.remove('active');
    });
    document.getElementById(demoId).classList.add('active');
    
    // 从之前的状态创建平滑过渡
    Flip.from(state, {
      duration: 0.5,
      fade: true,
      absolute: true,
      ease: "power1.inOut"
    });
  });
});

// 1. 网格/列表视图切换功能
document.getElementById('grid-view-btn').addEventListener('click', function() {
  // 更新按钮状态
  document.getElementById('list-view-btn').classList.remove('active');
  this.classList.add('active');
  
  // 记录当前状态
  const state = Flip.getState('.item', {
    props: "background,box-shadow" // 也跟踪这些属性
  });
  
  // 更改布局类
  document.querySelector('.items-container').className = 'items-container grid-view';
  
  // 创建FLIP动画
  Flip.from(state, {
    duration: 0.7,
    ease: "power1.inOut",
    absolute: true,
    stagger: 0.05,
    onEnter: elements => {
      // 处理新元素进入
      gsap.fromTo(elements, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 }
      );
    }
  });
});

document.getElementById('list-view-btn').addEventListener('click', function() {
  // 更新按钮状态
  document.getElementById('grid-view-btn').classList.remove('active');
  this.classList.add('active');
  
  // 记录当前状态
  const state = Flip.getState('.item', {
    props: "background,box-shadow" // 也跟踪这些属性
  });
  
  // 更改布局类
  document.querySelector('.items-container').className = 'items-container list-view';
  
  // 创建FLIP动画
  Flip.from(state, {
    duration: 0.7,
    ease: "power1.inOut",
    absolute: true,
    stagger: 0.05,
    onEnter: elements => {
      // 处理新元素进入
      gsap.fromTo(elements, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 }
      );
    }
  });
});

// 2. 排序动画功能
function sortItems(selector, compare) {
  // 记录当前状态
  const state = Flip.getState(selector);
  
  // 获取元素和容器
  const container = document.querySelector('.sortable-container');
  const items = [...container.querySelectorAll(selector)];
  
  // 排序元素
  items.sort(compare);
  
  // 重新添加到容器
  items.forEach(item => container.appendChild(item));
  
  // 创建FLIP动画
  Flip.from(state, {
    duration: 0.6,
    ease: "power1.inOut",
    absolute: true,
    stagger: 0.03
  });
}

// 按名称升序排序
document.getElementById('sort-name-asc').addEventListener('click', function() {
  sortItems('.sort-item', (a, b) => {
    return a.dataset.name.localeCompare(b.dataset.name);
  });
});

// 按名称降序排序
document.getElementById('sort-name-desc').addEventListener('click', function() {
  sortItems('.sort-item', (a, b) => {
    return b.dataset.name.localeCompare(a.dataset.name);
  });
});

// 随机排序
document.getElementById('shuffle-items').addEventListener('click', function() {
  sortItems('.sort-item', () => {
    return Math.random() - 0.5;
  });
});

// 3. 卡片展开功能
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', function() {
    // 获取所有卡片
    const cards = document.querySelectorAll('.card');
    const isExpanded = this.classList.contains('expanded');
    
    // 记录当前状态
    const state = Flip.getState(cards, {
      props: "box-shadow,border-radius",
      simple: false
    });
    
    // 折叠所有卡片
    cards.forEach(c => c.classList.remove('expanded'));
    
    // 如果卡片之前没展开，则展开它
    if (!isExpanded) {
      this.classList.add('expanded');
    }
    
    // 创建FLIP动画
    Flip.from(state, {
      duration: 0.5,
      ease: "power2.inOut",
      absolute: true,
      nested: true, // 处理嵌套内容
      onComplete: () => {
        // 动画完成后可以执行其他操作
      }
    });
  });
});

// 4. 共享元素过渡功能
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', function() {
    // 获取图片数据
    const id = this.dataset.id;
    const imgSrc = this.querySelector('img').src;
    const caption = this.querySelector('.caption').textContent;
    
    // 记录当前状态 - 主要是图片元素
    const state = Flip.getState(this.querySelector('img'), {
      props: "border-radius,box-shadow",
      absolute: true
    });
    
    // 填充详情页内容
    const detailView = document.querySelector('.detail-view');
    detailView.innerHTML = \`
      <img src="\${imgSrc}" class="detail-image shared-element" data-id="\${id}">
      <h3>\${caption}</h3>
      <p>这是图片 \${id} 的详细信息。在实际应用中，这里可以展示更多相关内容。</p>
      <p>点击"返回"按钮回到图库视图。</p>
    \`;
    
    // 切换到详情页
    document.getElementById('page1').classList.remove('active');
    document.getElementById('page2').classList.add('active');
    
    // 创建FLIP动画
    Flip.from(state, {
      targets: ".shared-element",
      duration: 0.6,
      absolute: true,
      ease: "power2.inOut",
      scale: true,
      fade: true,
      nested: true
    });
  });
});

// 返回按钮功能
document.getElementById('back-btn').addEventListener('click', function() {
  // 获取当前详情图片id
  const detailImage = document.querySelector('.detail-image');
  const id = detailImage.dataset.id;
  
  // 找到对应的画廊项目
  const galleryItem = document.querySelector(\`.gallery-item[data-id="\${id}"] img\`);
  
  // 记录当前详情图片状态
  const state = Flip.getState(detailImage, {
    props: "border-radius,box-shadow",
    absolute: true
  });
  
  // 切换回图库页
  document.getElementById('page2').classList.remove('active');
  document.getElementById('page1').classList.add('active');
  
  // 创建FLIP动画，从详情图片回到缩略图
  Flip.from(state, {
    targets: galleryItem,
    duration: 0.6,
    absolute: true,
    ease: "power2.inOut",
    scale: true,
    fade: true,
    nested: true
  });
});
`;
</script>

<style scoped>
.flip-common-use-cases-demo {
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

.use-case-intro {
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 6px;
  background-color: #e3f2fd;
  border-left: 4px solid #2196f3;
}

h4 {
  margin: 1.5rem 0 1rem 0;
  font-size: 1.2rem;
  color: #1976d2;
}

.use-cases-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
  margin: 1.5rem 0;
}

@media (min-width: 768px) {
  .use-cases-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.use-case {
  padding: 1.2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.use-case-title {
  font-weight: bold;
  color: #1976d2;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.use-case-desc {
  margin-bottom: 1rem;
  color: #555;
  font-size: 0.95rem;
}

.tag {
  display: inline-block;
  background-color: #e8eaf6;
  color: #3f51b5;
  padding: 0.2rem 0.8rem;
  border-radius: 16px;
  font-size: 0.8rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
}

.solutions {
  margin: 1.5rem 0;
}

.solution {
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

code {
  font-family: 'Courier New', monospace;
  background-color: #f1f1f1;
  padding: 2px 4px;
  border-radius: 3px;
  font-size: 0.9rem;
  color: #e53935;
}
</style> 