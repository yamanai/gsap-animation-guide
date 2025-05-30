---
title: Flip插件 - 常见应用场景
editLink: true
outline: deep
---

<!-- 
<script setup>
import { CommonUseCases } from '@modules/animations/plugins/core/flip';
</script>
-->

<!--
<div style="background-color: #f0f0f0; padding: 20px; border-radius: 8px; margin: 20px 0;">
  <h3>暂时替代的内容</h3>
  <p>由于模块加载问题，我们暂时使用静态HTML内容代替Vue组件。</p>
  <p>当前错误: MIME type错误，可能是由于Vue组件导入路径或者配置问题导致。</p>
</div>
-->

# 常见应用场景

FLIP插件可以应用于多种动画场景，特别适合处理布局和状态切换。本页面展示FLIP的常见应用场景和示例代码。

## 交互式示例

下面是一个展示FLIP常见应用场景的交互式组件：

<FlipCommonUseCases />

## 列表排序动画

::: tip 实用场景
列表排序动画在数据可视化、电子商务网站和用户管理界面中特别常见，它能让用户直观地看到排序变化。
:::

当列表项需要重新排序时，Flip可以创建平滑的过渡动画，让用户清晰地了解每个项目的移动轨迹。

```html
<div class="controls">
  <button id="sort-name">按名称排序</button>
  <button id="sort-date">按日期排序</button>
</div>

<ul id="list">
  <li data-date="2023-01-15">苹果</li>
  <li data-date="2023-03-22">香蕉</li>
  <li data-date="2023-02-10">橙子</li>
  <li data-date="2023-01-05">葡萄</li>
  <li data-date="2023-04-30">西瓜</li>
</ul>

<script>
  gsap.registerPlugin(Flip);
  
  const list = document.getElementById('list');
  const items = gsap.utils.toArray('#list li');
  
  // 按名称排序
  document.getElementById('sort-name').addEventListener('click', () => {
    // 记录当前状态
    const state = Flip.getState(items);
    
    // 排序DOM元素
    items.sort((a, b) => a.textContent.localeCompare(b.textContent));
    items.forEach(item => list.appendChild(item));
    
    // 创建动画
    Flip.from(state, {
      duration: 0.7,
      ease: "power1.inOut",
      stagger: 0.05,
      absolute: true,
      onComplete: () => console.log("排序完成")
    });
  });
  
  // 按日期排序
  document.getElementById('sort-date').addEventListener('click', () => {
    const state = Flip.getState(items);
    
    items.sort((a, b) => {
      return new Date(a.dataset.date) - new Date(b.dataset.date);
    });
    items.forEach(item => list.appendChild(item));
    
    Flip.from(state, {
      duration: 0.7,
      ease: "power1.inOut",
      stagger: 0.05,
      absolute: true
    });
  });
</script>
```

## 网格/列表布局切换

::: info 用户体验提升
当用户在不同布局视图间切换时，平滑的过渡能够减少认知负担，让用户不会因为突然的布局更改而感到困惑。
:::

在许多界面中，用户可以在网格视图和列表视图之间切换。Flip插件可以让这种布局转换变得平滑自然。

```html
<div class="controls">
  <button id="grid-view">网格视图</button>
  <button id="list-view">列表视图</button>
</div>

<div class="container" id="container">
  <div class="item">
    <img src="image1.jpg" alt="项目1">
    <h3>项目1标题</h3>
    <p>项目描述内容...</p>
  </div>
  <!-- 更多项目... -->
</div>

<style>
  .container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .item {
    width: calc(33.33% - 20px);
    padding: 15px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }
  
  .list-mode {
    flex-direction: column;
  }
  
  .list-mode .item {
    width: 100%;
    display: flex;
    align-items: center;
  }
  
  .list-mode img {
    width: 100px;
    margin-right: 20px;
  }
</style>

<script>
  gsap.registerPlugin(Flip);
  
  const container = document.getElementById('container');
  const items = gsap.utils.toArray('.item');
  
  document.getElementById('list-view').addEventListener('click', () => {
    // 记录状态
    const state = Flip.getState(items);
    
    // 更改DOM
    container.classList.add('list-mode');
    
    // 动画
    Flip.from(state, {
      duration: 0.5,
      ease: "power1.out",
      absolute: true,
      nested: true,
      onEnter: (elements) => {
        gsap.fromTo(elements, {opacity: 0}, {opacity: 1, duration: 0.5});
      }
    });
  });
  
  document.getElementById('grid-view').addEventListener('click', () => {
    const state = Flip.getState(items);
    container.classList.remove('list-mode');
    
    Flip.from(state, {
      duration: 0.5,
      ease: "power1.out",
      absolute: true,
      nested: true
    });
  });
</script>
```

## 卡片展开/收起效果

::: warning 嵌套内容处理
卡片展开效果通常涉及嵌套内容，确保使用 `nested: true` 选项以正确处理这些内容的动画过渡。
:::

创建卡片从缩略图展开到全屏详情视图的平滑过渡，类似于许多现代应用中的卡片展开效果。

```html
<div class="cards-container">
  <div class="card" data-id="1">
    <div class="card-preview">
      <img src="image1.jpg" alt="卡片1">
      <h3>卡片1标题</h3>
    </div>
    <div class="card-details">
      <h2>卡片1详细标题</h2>
      <p>这里是卡片1的详细描述内容，通常在卡片展开时才会显示...</p>
      <button class="close-btn">关闭</button>
    </div>
  </div>
  <!-- 更多卡片... -->
</div>

<style>
  .cards-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    padding: 20px;
  }
  
  .card {
    cursor: pointer;
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    position: relative;
  }
  
  .card-details {
    display: none;
    padding: 20px;
  }
  
  .expanded {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80vw;
    height: 80vh;
    max-width: 800px;
    z-index: 100;
    cursor: default;
  }
  
  .expanded .card-preview h3 {
    font-size: 24px;
  }
  
  .expanded .card-details {
    display: block;
  }
  
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.7);
    z-index: 90;
    opacity: 0;
    pointer-events: none;
  }
  
  .overlay.active {
    opacity: 1;
    pointer-events: all;
  }
</style>

<script>
  gsap.registerPlugin(Flip);
  
  // 创建遮罩层
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  document.body.appendChild(overlay);
  
  // 获取所有卡片
  const cards = gsap.utils.toArray('.card');
  
  cards.forEach(card => {
    card.addEventListener('click', function() {
      // 如果当前卡片已经展开，则忽略点击
      if (this.classList.contains('expanded')) return;
      
      // 记录状态
      const state = Flip.getState(this, {
        props: "borderRadius,boxShadow", // 跟踪这些属性的变化
        nested: true // 处理嵌套元素
      });
      
      // 添加展开类
      this.classList.add('expanded');
      
      // 显示遮罩
      overlay.classList.add('active');
      
      // 创建动画
      Flip.from(state, {
        duration: 0.5,
        ease: "power2.inOut",
        nested: true,
        absolute: true,
        onComplete: function() {
          // 动画完成后的操作
        }
      });
    });
  });
  
  // 关闭按钮点击事件
  document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation(); // 阻止事件冒泡
      
      // 获取当前展开的卡片
      const expandedCard = document.querySelector('.card.expanded');
      
      if (expandedCard) {
        // 记录状态
        const state = Flip.getState(expandedCard, {
          props: "borderRadius,boxShadow",
          nested: true
        });
        
        // 移除展开类
        expandedCard.classList.remove('expanded');
        
        // 隐藏遮罩
        overlay.classList.remove('active');
        
        // 创建动画
        Flip.from(state, {
          duration: 0.5,
          ease: "power2.inOut",
          nested: true,
          absolute: true
        });
      }
    });
  });
</script>
```

## 共享元素过渡

::: tip Material Design
这种过渡效果是Material Design中常见的一种模式，让用户感觉两个不同页面或视图中的元素是同一个元素的不同状态。
:::

在页面导航或视图切换时，创建元素从一个位置到另一个位置的连续过渡，提高用户体验。

```html
<div class="gallery">
  <div class="thumbnail" data-id="1">
    <img src="image1.jpg" alt="图片1">
    <div class="caption">图片1</div>
  </div>
  <!-- 更多缩略图... -->
</div>

<div class="detail-view" style="display: none;">
  <button class="back-btn">返回</button>
  <div class="detail-content">
    <!-- 详情内容将动态填充 -->
  </div>
</div>

<script>
  gsap.registerPlugin(Flip);
  
  const gallery = document.querySelector('.gallery');
  const detailView = document.querySelector('.detail-view');
  const thumbnails = document.querySelectorAll('.thumbnail');
  
  // 点击缩略图，展示详情
  thumbnails.forEach(thumb => {
    thumb.addEventListener('click', function() {
      const id = this.dataset.id;
      const img = this.querySelector('img');
      const caption = this.querySelector('.caption').textContent;
      
      // 记录图片状态
      const state = Flip.getState(img, {
        props: "borderRadius",
        absolute: true
      });
      
      // 填充详情内容
      detailView.querySelector('.detail-content').innerHTML = `
        <img src="${img.src}" class="detail-image" id="detail-image-${id}">
        <h2>${caption}</h2>
        <p>这是图片${id}的详细描述内容...</p>
      `;
      
      // 隐藏图库，显示详情
      gallery.style.display = 'none';
      detailView.style.display = 'block';
      
      // 创建FLIP动画
      Flip.from(state, {
        targets: `#detail-image-${id}`,
        duration: 0.7,
        ease: "power2.inOut",
        absolute: true
      });
    });
  });
  
  // 返回按钮
  document.querySelector('.back-btn').addEventListener('click', function() {
    // 获取当前详情图片
    const detailImage = document.querySelector('.detail-image');
    const id = detailImage.id.split('-')[2];
    const originalThumb = document.querySelector(`.thumbnail[data-id="${id}"] img`);
    
    // 记录状态
    const state = Flip.getState(detailImage, {
      props: "borderRadius",
      absolute: true
    });
    
    // 切换显示
    detailView.style.display = 'none';
    gallery.style.display = 'grid';
    
    // 创建FLIP动画
    Flip.from(state, {
      targets: originalThumb,
      duration: 0.7,
      ease: "power2.inOut",
      absolute: true
    });
  });
</script>
```

## 过滤与分组动画

::: info 交互式过滤
在过滤操作中使用FLIP动画可以使界面更加连贯，帮助用户理解元素如何根据过滤条件重新排列。
:::

创建平滑的过滤和分组动画，例如在标签切换时元素的重新排列。

```html
<div class="filter-controls">
  <button class="filter-btn active" data-filter="all">全部</button>
  <button class="filter-btn" data-filter="fruit">水果</button>
  <button class="filter-btn" data-filter="vegetable">蔬菜</button>
</div>

<div class="grid-container">
  <div class="item" data-category="fruit">苹果</div>
  <div class="item" data-category="vegetable">胡萝卜</div>
  <div class="item" data-category="fruit">香蕉</div>
  <div class="item" data-category="vegetable">花椰菜</div>
  <div class="item" data-category="fruit">葡萄</div>
  <div class="item" data-category="vegetable">西红柿</div>
</div>

<script>
  gsap.registerPlugin(Flip);
  
  const container = document.querySelector('.grid-container');
  const items = gsap.utils.toArray('.item');
  const filterBtns = document.querySelectorAll('.filter-btn');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // 更新按钮状态
      filterBtns.forEach(el => el.classList.remove('active'));
      this.classList.add('active');
      
      const filterValue = this.dataset.filter;
      
      // 记录状态
      const state = Flip.getState(items);
      
      // 应用过滤
      items.forEach(item => {
        if (filterValue === 'all' || item.dataset.category === filterValue) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
      
      // 创建动画
      Flip.from(state, {
        duration: 0.6,
        scale: true,
        fade: true,
        absolute: true,
        ease: "power1.inOut",
        stagger: 0.05,
        onEnter: elements => {
          gsap.fromTo(elements, 
            { opacity: 0, scale: 0 }, 
            { opacity: 1, scale: 1, duration: 0.6 }
          );
        },
        onLeave: elements => {
          gsap.to(elements, { 
            opacity: 0, 
            scale: 0, 
            duration: 0.3 
          });
        }
      });
    });
  });
</script>
```

::: tip 尝试示例
尝试使用[交互式演示](#交互式演示)中的示例，了解这些常见用例的实际效果。
::: 