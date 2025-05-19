# 选择器与DOM操作

GSAP提供了强大而灵活的选择器系统，让你能够轻松地选择多个元素并为它们添加动画效果。本章将介绍GSAP中的选择器使用方法以及如何操作DOM元素。

## 选择器类型与特点一览表

下面的表格概述了GSAP中不同选择器类型的特点和使用场景：

| 选择器类型 | 语法示例 | 性能 | 适用场景 | 优势 |
|-----------|---------|-----|---------|------|
| **ID选择器** | `"#header"` | 最佳 | 单一元素动画 | 查找速度最快，直接定位唯一元素 |
| **类选择器** | `".box"` | 良好 | 同类元素批量动画 | 灵活，可重用，适合分组元素 |
| **标签选择器** | `"div"` | 一般 | 同类标签批量动画 | 简洁，不需要额外类名 |
| **复合选择器** | `".container .box"` | 较低 | 层级结构中的定位 | 精确定位特定上下文中的元素 |
| **属性选择器** | `"[data-animation='fade']"` | 较低 | 基于属性的动态选择 | 可根据数据属性灵活选择 |
| **DOM元素/数组** | `document.querySelector()` | 最佳 | 预选元素复用 | 避免重复查询，性能优化 |
| **函数选择器** | `() => [元素1, 元素2]` | 视情况 | 动态条件选择 | 最灵活，可根据条件动态筛选 |

## GSAP选择器基础用法

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

<div class="demo-container">
  <div class="demo-box">
    <div class="selector-demo-element box1">元素1 (.box1)</div>
    <div class="selector-demo-element box2">元素2 (.box2)</div>
    <div class="selector-demo-element box3">元素3 (.box3)</div>
  </div>
  <div class="demo-controls">
    <button class="demo-button" id="select-id-button">ID选择器</button>
    <button class="demo-button" id="select-class-button">类选择器</button>
    <button class="demo-button" id="select-complex-button">复合选择器</button>
  </div>
  <div class="demo-description">
    点击不同的按钮，观察不同选择器类型的效果
  </div>
</div>

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

::: tip 性能优化提示
当需要重复使用复杂选择器时，最好先用`document.querySelectorAll()`或`gsap.utils.toArray()`获取元素，然后将结果传递给GSAP。这样只需要执行一次DOM查询，大幅提升性能。
:::

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

::: warning 注意
使用数组语法时，每个选择器将作为单独的组处理。如果你想要对每个单独的元素应用不同效果，应该使用`gsap.utils.toArray()`或函数属性值。
:::

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

## 选择器性能优化最佳实践

当处理大量元素或复杂动画时，选择器性能变得尤为重要：

| 最佳实践 | 不推荐写法 | 推荐写法 | 性能提升原因 |
|---------|-----------|---------|------------|
| **预选择并重用** | `gsap.to(".complex > .selector", {});`<br>`gsap.to(".complex > .selector", {});` | `const elements = gsap.utils.toArray(".complex > .selector");`<br>`gsap.to(elements, {});`<br>`gsap.to(elements, {});` | 避免重复DOM查询，减少浏览器工作量 |
| **使用ID替代类** | `gsap.to(".unique-element", {});` | `gsap.to("#unique-element", {});` | ID选择器查找速度远快于类选择器 |
| **避免嵌套过深** | `gsap.to("section div.container ul li.item", {});` | `gsap.to(".animation-item", {});` | 减少选择器解析复杂度，提高查找速度 |
| **使用选择器函数** | `gsap.to("#container .item", {});`<br>`gsap.to("#container .box", {});` | `const select = gsap.utils.selector("#container");`<br>`gsap.to(select(".item"), {});`<br>`gsap.to(select(".box"), {});` | 限定查找范围，提高查询效率 |
| **使用数据属性** | 复杂的类组合查询 | `gsap.to("[data-animate='true']", {});` | 语义化选择，简化选择器复杂度 |

### 可维护性与组织技巧

为了提高代码的可维护性和组织性，可以考虑以下技巧：

```javascript
// 1. 集中管理选择器
const selectors = {
  header: "#site-header",
  nav: {
    container: ".nav-container", 
    items: ".nav-item",
    toggleButton: ".nav-toggle"
  },
  animations: {
    fadeElements: "[data-animation='fade']",
    slideElements: "[data-animation='slide']"
  }
};

// 使用时
gsap.to(selectors.nav.items, { x: 100 });
gsap.from(selectors.animations.fadeElements, { opacity: 0 });

// 2. 为可复用动画创建函数
function animateNavItems(action = "show") {
  const items = gsap.utils.toArray(selectors.nav.items);
  
  if (action === "show") {
    return gsap.from(items, {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.5
    });
  } else {
    return gsap.to(items, {
      opacity: 0,
      y: -20,
      stagger: 0.05,
      duration: 0.3
    });
  }
}

// 在需要时调用
animateNavItems("show");
```

<GsapEditor 
  title="选择器实战演练"
  :initialHtml="`<div class='container'>
  <div id='box1' class='demo-box'>ID选择器</div>
  <div class='demo-box' style='width: 130px;'>类选择器1</div>
  <div class='demo-box' style='width: 110px;'>类选择器2</div>
  <div data-animation='bounce' class='bounce-element'>属性选择器</div>
</div>`"
  :initialCss="`.container {
  max-width: 350px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
}
.demo-box {
  width: 140px;
  height: 60px;
  background-color: #3498db;
  border-radius: 6px;
  color: white;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}
#box1 {
  background-color: #9b59b6;
}
.bounce-element {
  width: 100px;
  height: 100px;
  background-color: #e74c3c;
  border-radius: 50%;
  font-size: 14px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}`"
  :initialJs="`// 目标元素已添加在编辑器中
// 尝试不同类型的选择器
// 1. 使用ID选择器
gsap.to('#box1', {
  x: 100,
  duration: 1,
  backgroundColor: '#ff6b6b'
});
// 2. 使用类选择器
gsap.to('.demo-box', {
  y: 20,
  duration: 1,
  delay: 1.5
});
// 3. 使用属性选择器
gsap.to('[data-animation=bounce]', {
  scale: 1.2,
  duration: 0.5,
  delay: 3,
  yoyo: true,
  repeat: 3
});
// 4. 使用函数筛选多个元素
const elements = gsap.utils.toArray('.demo-box');
gsap.to(elements.filter(el => parseFloat(getComputedStyle(el).width) > 120), {
  rotation: 360,
  delay: 4.5,
  duration: 2
});`"
/>

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

## 调试与常见问题解决

调试选择器相关的动画问题可能具有挑战性，以下是一些常见问题与解决方案：

### 问题1：选择器匹配不到元素

- 使用 `console.log(document.querySelectorAll("你的选择器"))` 验证选择器是否正确
- 检查元素是否在动画开始时已存在于DOM中
- 验证元素ID或类名拼写是否正确

### 问题2：动画影响了意外元素

- 使用更精确的选择器或添加排除选择器 `:not(.exclude)`
- 使用 `scope` 参数限制选择范围
- 考虑使用数据属性替代通用类名

### 问题3：动态添加的元素没有动画效果

- 在元素添加到DOM后再创建动画
- 使用 `gsap.utils.toArray()` 重新获取最新的元素集合
- 考虑使用 `gsap.context()` 管理动画上下文

<style>
.demo-container {
  margin: 30px 0;
  text-align: center;
}

.demo-box {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  height: 200px;
  position: relative;
  overflow: hidden;
  margin-bottom: 10px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.selector-demo-element {
  padding: 10px;
  background: #4a7aff;
  border-radius: 4px;
  color: white;
  text-align: center;
}

.box2 {
  background: #ff6b6b;
}

.box3 {
  background: #42b883;
}

.demo-controls {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin: 10px 0;
}

.demo-button {
  padding: 8px 15px;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.demo-button:hover {
  background: var(--vp-c-brand-dark);
}

.demo-description {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin-top: 8px;
  font-style: italic;
}
</style>

<script>
import { onMounted } from 'vue'

export default {
  setup() {
    onMounted(() => {
      if (typeof gsap !== 'undefined') {
        // 选择器演示
        const selectIdButton = document.getElementById('select-id-button')
        const selectClassButton = document.getElementById('select-class-button')
        const selectComplexButton = document.getElementById('select-complex-button')
        
        if (selectIdButton) {
          selectIdButton.addEventListener('click', () => {
            // 重置
            gsap.set('.selector-demo-element', { x: 0, opacity: 1, scale: 1 })
            
            // ID选择器动画
            gsap.to('.box1', { 
              x: 50, 
              scale: 1.2,
              duration: 0.5
            })
          })
        }
        
        if (selectClassButton) {
          selectClassButton.addEventListener('click', () => {
            // 重置
            gsap.set('.selector-demo-element', { x: 0, opacity: 1, scale: 1 })
            
            // 类选择器动画
            gsap.to('.selector-demo-element', { 
              opacity: 0.7, 
              y: 10,
              duration: 0.5,
              stagger: 0.1
            })
          })
        }
        
        if (selectComplexButton) {
          selectComplexButton.addEventListener('click', () => {
            // 重置
            gsap.set('.selector-demo-element', { x: 0, opacity: 1, scale: 1, y: 0 })
            
            // 复合选择器动画
            gsap.to('.selector-demo-element:not(.box2)', { 
              rotation: 180, 
              duration: 1
            })
          })
        }
      }
    })
  }
}
</script>

通过掌握这些选择器和DOM操作技巧，你将能够更灵活、更高效地创建复杂的动画效果，同时保持良好的性能和可维护性。在下一章中，我们将学习如何控制动画的时间和持续时间。 