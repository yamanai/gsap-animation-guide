---
title: 安装与设置
---

# 安装与设置

要使用ScrollSmoother，您需要首先安装GSAP库及其ScrollTrigger插件，因为ScrollSmoother依赖于ScrollTrigger。

## 安装GSAP和插件

### 方法一：使用NPM（推荐）

```bash
# 安装GSAP
npm install gsap
```

### 方法二：使用CDN

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollSmoother.min.js"></script>
```

## 基础HTML结构

创建必要的HTML结构，包括wrapper和content元素：

```html
<!-- 包装器：固定视口，创建滚动条 -->
<div id="smooth-wrapper">
  <!-- 内容容器：包含实际内容，会被平滑滚动 -->
  <div id="smooth-content">
    <!-- 您的页面内容放在这里 -->
    <section>第一部分内容</section>
    <section>第二部分内容</section>
    <!-- 更多内容... -->
  </div>
</div>
```

## CSS设置

为了确保ScrollSmoother正常工作，需要添加一些基本的CSS样式：

```css
/* 基本设置，防止出现双滚动条 */
html, body {
  margin: 0;
  padding: 0;
  overflow: hidden; /* 防止body出现滚动条 */
}

/* wrapper应为全屏固定高度，允许滚动 */
#smooth-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto; /* 这里会出现滚动条 */
}

/* 内容容器，不需要特殊样式 */
#smooth-content {
  /* 您的内容样式 */
}
```

## JavaScript初始化

### 基本初始化

```javascript
// 导入所需的GSAP及插件
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollSmoother from 'gsap/ScrollSmoother';

// 注册插件
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// 初始化ScrollSmoother
let smoother = ScrollSmoother.create({
  wrapper: '#smooth-wrapper',
  content: '#smooth-content',
  smooth: 1, // 平滑程度，数值越大越平滑
  effects: true // 启用视差效果
});
```

### 使用CDN方式初始化

```html
<script>
  // 注册插件
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
  
  // 等待DOM加载完成
  window.addEventListener('DOMContentLoaded', () => {
    // 初始化ScrollSmoother
    let smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1,
      effects: true
    });
  });
</script>
```

## 检查初始化是否成功

您可以通过以下方式验证ScrollSmoother是否成功初始化：

```javascript
// 检查是否成功初始化
if (smoother) {
  console.log('ScrollSmoother初始化成功!');
  console.log('当前滚动位置:', smoother.scrollTop());
} else {
  console.error('ScrollSmoother初始化失败!');
}
``` 