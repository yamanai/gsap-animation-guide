# 选择器与DOM操作

GSAP提供了强大而灵活的选择器系统，让你能够轻松地选择多个元素并为它们添加动画效果。本章将介绍GSAP中的选择器使用方法以及如何操作DOM元素。

## GSAP选择器概述

GSAP支持多种方式来选择目标元素：

```javascript
// 1. CSS选择器字符串
gsap.to(".myClass", { x: 100 });
gsap.to("#myID", { rotation: 360 });

// 2. 直接传递DOM元素
const element = document.querySelector(".box");
gsap.to(element, { scale: 1.5 });

// 3. 元素数组
const elements = document.querySelectorAll(".item");
gsap.to(elements, { opacity: 0.5 });

// 4. 使用复杂选择器
gsap.to("div:not(.exclude)", { y: 50 });
```

## 选择器功能和注意事项

### 1. 快速选择器和慢速选择器

GSAP中的选择器分为两种类型：

- **快速选择器**：简单的标签名、类名和ID选择器（如 `".box"`、`"#header"`、`"div"`）
- **慢速选择器**：复杂的选择器，如 `"div.box > span:nth-child(2)"`

```javascript
// 快速选择器 - 性能更好
gsap.to(".box", { x: 100 });  

// 慢速选择器 - 更强大但性能略低
gsap.to(".container > .box:not(.disabled)", { x: 100 });
```

### 2. 选择器范围限制

你可以通过指定父容器来限制选择器的作用范围：

```javascript
// 只选择 #container 内的 .box 元素
gsap.to("#container .box", { x: 100 });

// 使用对象语法指定容器范围
gsap.to(".box", { 
  x: 100,
  ease: "power2.out",
  // 这里限定了只在 #container 内查找 .box 元素
  scope: "#container" 
});
```

### 3. 伪选择器支持

GSAP支持大多数CSS伪选择器：

```javascript
// 选择第一个子元素
gsap.to(".item:first-child", { scale: 1.2 });

// 选择奇数索引的元素
gsap.to(".item:nth-child(odd)", { backgroundColor: "#f0f0f0" });

// 选择悬停状态的元素（注意：这会在动画开始时捕获悬停状态的元素，不会实时响应）
gsap.to(".button:hover", { scale: 1.1 });
```

## DOM元素的高级操作

### 1. 使用函数选择器

你可以使用函数来动态选择或过滤元素：

```javascript
// 使用函数动态选择或过滤元素
gsap.to(".box", {
  x: 100,
  // 只动画高度大于100px的元素
  onStart: function() {
    // this.targets() 返回当前补间动画的所有目标元素
    return Array.from(this.targets()).filter(el => el.offsetHeight > 100);
  }
});
```

### 2. 多组元素的不同动画属性

当你需要对不同组的元素应用不同的动画属性时，可以使用数组语法：

```javascript
// 对不同组元素设置不同属性
gsap.to([".red", ".blue", ".green"], {
  x: function(index) {
    // 根据索引返回不同值
    return index * 100; // 第一组移动0，第二组移动100，第三组移动200
  },
  duration: 1,
  stagger: 0.2 // 错开动画开始时间
});
```

### 3. 在动画执行期间访问和修改元素

通过各种回调函数，你可以在动画不同阶段访问和修改元素：

```javascript
gsap.to(".box", {
  x: 200,
  onStart: function() {
    // 动画开始时执行
    console.log("动画开始", this.targets());
    
    // 给所有目标元素添加一个类
    gsap.utils.toArray(this.targets()).forEach(el => {
      el.classList.add("animating");
    });
  },
  onComplete: function() {
    // 动画完成时执行
    console.log("动画完成", this.targets());
    
    // 移除之前添加的类
    gsap.utils.toArray(this.targets()).forEach(el => {
      el.classList.remove("animating");
    });
  }
});
```

## 实用工具函数

GSAP提供了几个实用的DOM选择和操作工具：

### 1. gsap.utils.toArray()

将各种输入转换为标准数组：

```javascript
// 将选择器、DOM元素或NodeList转换为数组
const boxes = gsap.utils.toArray(".box"); 
const mixedItems = gsap.utils.toArray([".item", document.querySelector("#special"), document.querySelectorAll(".others")]);

// 现在可以使用数组方法了
boxes.forEach(box => {
  // 对每个元素做一些操作
});
```

### 2. gsap.utils.selector()

创建一个作用于特定父元素的选择器函数：

```javascript
// 创建限定在容器内的选择器函数
const container = document.querySelector("#container");
const selectInContainer = gsap.utils.selector(container);

// 现在可以使用这个函数在容器内选择元素
gsap.to(selectInContainer(".box"), { x: 100 });
gsap.to(selectInContainer(".circle"), { scale: 1.5 });

// 这比重复使用 "#container .box" 更高效
```

## 选择器性能优化

当处理大量元素或复杂动画时，选择器性能变得尤为重要：

### 1. 预选择元素

如果多次使用同一组元素，提前选择并存储它们：

```javascript
// 不推荐 - 重复选择相同元素
gsap.to(".box", { x: 100 });
gsap.to(".box", { y: 50, delay: 1 });
gsap.to(".box", { scale: 1.2, delay: 2 });

// 推荐 - 提前选择并重用
const boxes = gsap.utils.toArray(".box");
gsap.to(boxes, { x: 100 });
gsap.to(boxes, { y: 50, delay: 1 });
gsap.to(boxes, { scale: 1.2, delay: 2 });
```

### 2. 使用ID选择器

当只选择单个元素时，ID选择器比类选择器更高效：

```javascript
// 更高效
gsap.to("#hero", { x: 100 });

// 不太高效
gsap.to(".hero-element", { x: 100 });
```

### 3. 避免复杂的CSS选择器

尽量使用简单的选择器，特别是当目标元素很多时：

```javascript
// 不推荐 - 复杂选择器
gsap.to("section > div.container > ul > li.item:not(.disabled)", { x: 100 });

// 推荐 - 使用更简单的选择器或预选择
const items = document.querySelectorAll("section > div.container > ul > li.item:not(.disabled)");
gsap.to(items, { x: 100 });

// 或者添加一个特定的类，然后使用简单选择器
// HTML中: <li class="item animation-target">...</li>
gsap.to(".animation-target", { x: 100 });
```

## 实际应用示例

### 示例1：创建序列动画

```javascript
// 对导航菜单项创建序列动画
const menuItems = gsap.utils.toArray(".nav-item");
gsap.from(menuItems, {
  opacity: 0,
  y: 20,
  duration: 0.8,
  ease: "power3.out",
  stagger: 0.1, // 每个元素延迟0.1秒开始
  scrollTrigger: {
    trigger: ".nav-container",
    start: "top 80%"
  }
});
```

### 示例2：根据数据属性过滤和动画

```javascript
// 选择并根据自定义数据属性过滤元素
const allBoxes = gsap.utils.toArray(".box");
const filteredBoxes = allBoxes.filter(box => {
  return box.getAttribute("data-animate") === "true";
});

gsap.to(filteredBoxes, {
  scale: 1.2,
  boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
  duration: 1
});
```

### 示例3：创建交互式选择器

```javascript
// 创建一个互动过滤器
document.querySelectorAll(".filter-button").forEach(button => {
  button.addEventListener("click", () => {
    // 获取过滤类别
    const category = button.getAttribute("data-category");
    
    // 为所有项目设置初始状态
    gsap.set(".portfolio-item", {
      opacity: 0.3,
      scale: 0.9,
      overwrite: true
    });
    
    // 为匹配的项目动画到高亮状态
    if (category === "all") {
      gsap.to(".portfolio-item", { opacity: 1, scale: 1, duration: 0.5 });
    } else {
      gsap.to(`.portfolio-item[data-category="${category}"]`, { 
        opacity: 1, 
        scale: 1, 
        duration: 0.5 
      });
    }
  });
});
```

通过掌握这些选择器和DOM操作技巧，你将能够更灵活、更高效地创建复杂的动画效果，同时保持良好的性能和可维护性。在下一章中，我们将学习如何控制动画的时间和持续时间。 