
# 3D动画效果

GSAP结合CSS 3D变换能力，可以创建令人惊艳的3D动画效果。本章将深入探讨如何使用GSAP实现各种复杂的3D动画效果，从基本的3D变换到高级的3D场景构建。

## CSS 3D基本概念与GSAP结合

3D动画是通过CSS的3D变换属性实现的，而GSAP可以控制这些属性变化的过程，创建流畅的动画效果。

::: tip 概念解析
**3D变换**: 允许元素在三维空间中移动、旋转和缩放  
**透视(perspective)**: 决定观察者与3D物体之间的距离  
**变换原点(transform-origin)**: 决定变换操作的中心点  
:::

### 基础3D变换示例

```html
<div class="container">
  <div class="box"></div>
</div>
```

```css
.container {
  perspective: 1000px; /* 设置容器透视效果 */
}
.box {
  width: 100px;
  height: 100px;
  background-color: #3498db;
}
```

```javascript
// 基础3D旋转
gsap.to(".box", {
  rotationY: 360,
  duration: 2,
  ease: "power2.inOut"
});
```

::: warning 注意事项
3D变换必须在设置了`perspective`的容器内才能产生真正的3D效果，否则只会看到平面投影。
:::

## 3D变换属性详解

GSAP提供了一套简便的语法来控制CSS 3D变换属性，下面是主要的3D属性及其用法：

| 属性 | 说明 | GSAP语法示例 |
|------|------|-------------|
| rotationX | 绕X轴旋转(俯仰) | `gsap.to(".element", {rotationX: 45})` |
| rotationY | 绕Y轴旋转(偏航) | `gsap.to(".element", {rotationY: 45})` |
| rotationZ | 绕Z轴旋转(翻滚) | `gsap.to(".element", {rotationZ: 45})` |
| z | Z轴移动(深度) | `gsap.to(".element", {z: 100})` |
| perspective | 透视距离 | `gsap.to(".container", {perspective: 500})` |
| transformOrigin | 变换原点 | `gsap.to(".element", {transformOrigin: "left center"})` |

### 组合3D变换示例

```javascript
// 组合多种3D变换
gsap.to(".cube", {
  rotationX: 45,
  rotationY: 60,
  z: 50,
  duration: 1.5,
  ease: "back.out"
});
```

::: tip 变换顺序
在CSS和GSAP中，变换的应用顺序是固定的：先平移(translate)，再旋转(rotate)，最后缩放(scale)。GSAP内部会按照这个顺序应用变换，与属性声明顺序无关。
:::

## 透视效果与深度控制

透视效果是创建逼真3D动画的关键，透视距离决定了3D效果的强弱。

### 透视设置方法

有两种方式设置透视效果：

1. **在父容器上设置perspective属性**：适用于多个子元素共享同一个透视点
   ```css
   .container {
     perspective: 1000px;
   }
   ```

2. **在元素上设置transform: perspective()**：每个元素有自己的透视点
   ```javascript
   gsap.to(".element", {
     transformPerspective: 1000, // GSAP语法
     rotationY: 45
   });
   ```

::: warning 透视距离影响
- **小值**(如300px)：产生强烈的3D效果，适合近距离、戏剧化效果
- **大值**(如1500px)：产生温和的3D效果，适合展示更"真实"的比例
:::

### 深度变化动画

```javascript
// 元素在Z轴上前后移动
const timeline = gsap.timeline({repeat: -1, yoyo: true});
timeline.to(".card", {
  z: 200,
  scale: 1.2, // 同时缩放以增强效果
  duration: 1.5,
  ease: "power1.inOut"
});
```

::: tip 提升效果真实感
结合`z`值变化与`scale`可以创造更自然的远近效果，模拟真实物体靠近时变大，远离时变小的视觉效果。
:::

## 3D旋转与空间定位

3D旋转可以让元素围绕任意轴进行旋转，创造丰富的空间效果。

### 基本轴旋转

```javascript
// X轴旋转(俯仰)
gsap.to(".panel-1", {rotationX: 45, duration: 1});

// Y轴旋转(偏航)
gsap.to(".panel-2", {rotationY: 45, duration: 1});

// Z轴旋转(翻滚)
gsap.to(".panel-3", {rotationZ: 45, duration: 1});
```

### 任意轴旋转

```javascript
// 使用transform属性实现多轴复合旋转
gsap.to(".element", {
  transform: "rotate3d(1, 0.5, 0.2, 60deg)",
  duration: 2
});
```

### 空间定位技巧

```javascript
// 创建绕点旋转效果
gsap.to(".satellite", {
  rotationY: 360,
  transformOrigin: "left 50% -100px", // 左侧偏移100px的点
  duration: 4,
  repeat: -1,
  ease: "none"
});
```

::: note 变换原点说明
`transformOrigin`格式为`"x y z"`，可以使用像素值或百分比。例如：
- `"center center"` - 元素中心(默认值)
- `"left top"` - 元素左上角
- `"50% 50% -100px"` - 元素中心，向后偏移100px
:::

## 3D层叠与z-index管理

在复杂的3D场景中，元素可能会相互遮挡，需要合理管理层叠顺序。

### 常见层叠问题与解决方案

| 问题 | 解决方案 |
|------|----------|
| 元素层叠顺序错乱 | 使用`z-index`控制渲染顺序 |
| 3D空间中的遮挡 | 通过`z`值控制元素在3D空间中的前后位置 |
| 层叠上下文混乱 | 确保父元素正确创建了层叠上下文(`z-index`不为`auto`) |

```javascript
// 动态调整z-index以管理层叠
gsap.to(".front-card", {
  z: 100,
  zIndex: 2, // 在Z轴前移的同时提高z-index
  duration: 0.5
});

gsap.to(".back-card", {
  z: -50,
  zIndex: 1, // 在Z轴后移的同时降低z-index
  duration: 0.5
});
```

::: warning 重要提示
当使用`z`值移动元素时，浏览器会根据透视效果和空间位置自动处理元素的视觉重叠。但在某些复杂情况下，可能还需要手动设置`z-index`来确保正确的层叠顺序。
:::

## 3D场景构建方法

构建复杂的3D场景需要合理组织HTML结构和设置样式。

### 基础3D场景结构

```html
<div class="scene">
  <div class="cube">
    <div class="face front"></div>
    <div class="face back"></div>
    <div class="face right"></div>
    <div class="face left"></div>
    <div class="face top"></div>
    <div class="face bottom"></div>
  </div>
</div>
```

```css
.scene {
  width: 200px;
  height: 200px;
  perspective: 1000px;
  margin: 50px auto;
}

.cube {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d; /* 关键属性：保留子元素的3D效果 */
}

.face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: visible; /* 可以看到元素的背面 */
}

/* 定位各个面 */
.front  { transform: translateZ(100px); background: rgba(255, 0, 0, 0.7); }
.back   { transform: rotateY(180deg) translateZ(100px); background: rgba(0, 255, 0, 0.7); }
.right  { transform: rotateY(90deg) translateZ(100px); background: rgba(0, 0, 255, 0.7); }
.left   { transform: rotateY(-90deg) translateZ(100px); background: rgba(255, 255, 0, 0.7); }
.top    { transform: rotateX(90deg) translateZ(100px); background: rgba(255, 0, 255, 0.7); }
.bottom { transform: rotateX(-90deg) translateZ(100px); background: rgba(0, 255, 255, 0.7); }
```

::: tip 核心属性
`transform-style: preserve-3d` 是创建真实3D场景的关键，它确保子元素保持在3D空间中，而不是被扁平化。
:::

### 动画立方体

```javascript
// 旋转立方体
gsap.to(".cube", {
  rotationY: 360,
  rotationX: 360,
  duration: 5,
  repeat: -1,
  ease: "none"
});
```

## 相机视角模拟

通过改变容器的透视属性和位置，可以模拟相机的移动和视角变化。

### 基本相机移动

```javascript
// 模拟相机在Z轴上前后移动
gsap.to(".scene", {
  perspective: 400, // 开始是1000px
  duration: 2
});

// 模拟相机环绕场景
gsap.to(".scene", {
  rotationY: 45, 
  rotationX: 15,
  duration: 2
});
```

### 复杂相机路径

```javascript
// 使用时间轴创建更复杂的相机运动
const cameraTimeline = gsap.timeline();

cameraTimeline
  .to(".scene", {perspective: 500, duration: 1})
  .to(".scene", {rotationY: 30, rotationX: -15, duration: 1.5})
  .to(".scene", {perspective: 1200, rotationY: -20, duration: 2})
  .to(".scene", {rotationX: 10, rotationY: 0, perspective: 1000, duration: 1.5});
```

::: note 镜头效果解析
- 减小`perspective`值相当于镜头拉近
- 增大`perspective`值相当于镜头拉远
- 改变容器的旋转角度相当于调整相机角度
:::

## 3D动画性能优化

3D动画可能对性能产生较大影响，以下是一些优化技巧。

### 性能优化策略

| 优化策略 | 实现方法 |
|---------|----------|
| 使用硬件加速 | 添加`will-change: transform`或`backface-visibility` |
| 减少重绘(repaints) | 避免同时动画过多元素 |
| 简化3D模型 | 减少不必要的面和详细程度 |
| 使用帧率控制 | 监控性能，必要时降低复杂度 |
| 优化渲染时机 | 使用`requestAnimationFrame`而非CSS过渡 |

```javascript
// 性能优化示例
const elements = document.querySelectorAll(".heavy-3d");

// 预先添加硬件加速标记
elements.forEach(el => {
  gsap.set(el, {
    willChange: "transform",
    backfaceVisibility: "hidden"
  });
});

// 分批动画而不是同时
const tl = gsap.timeline();
elements.forEach((el, index) => {
  tl.to(el, {
    rotationY: 180,
    duration: 1,
    ease: "power1.inOut"
  }, index * 0.1); // 错开0.1秒启动
});
```

::: warning 移动设备注意事项
在移动设备上，3D效果会消耗更多资源。考虑为移动设备提供简化版的动画，或使用媒体查询动态调整复杂度。
:::

## 响应式3D效果设计

3D效果需要根据不同屏幕尺寸做出适当调整。

### 响应式3D设计原则

1. **使用相对单位**：使用vw、vh或%单位而不是固定像素
2. **根据屏幕尺寸调整复杂度**：小屏幕使用简化版效果
3. **调整透视距离**：在小屏幕上可能需要减小透视距离

```javascript
// 响应式透视调整
function updatePerspective() {
  const width = window.innerWidth;
  let perspective;
  
  if (width < 600) {
    perspective = 500; // 移动设备使用更强的透视效果
  } else if (width < 1024) {
    perspective = 800; // 平板
  } else {
    perspective = 1200; // 桌面
  }
  
  gsap.to(".scene", {perspective: perspective, duration: 0.3});
}

window.addEventListener("resize", updatePerspective);
updatePerspective(); // 初始化
```

::: tip 适应性设计
考虑为触摸设备提供不同的交互方式，例如使用触摸手势而不是鼠标悬停来触发3D效果。
:::

## 沉浸式3D界面案例

以下是一个创建卡片翻转画廊的示例，展示如何应用前面学到的所有知识。

### 3D卡片画廊示例

```html
<div class="gallery">
  <div class="card-container" data-depth="0">
    <div class="card">
      <div class="front">卡片1正面</div>
      <div class="back">卡片1背面</div>
    </div>
  </div>
  <!-- 更多卡片容器 -->
</div>
```

```css
.gallery {
  perspective: 1000px;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
}

.card-container {
  width: 200px;
  height: 300px;
  margin: 20px;
  transform-style: preserve-3d;
}

.card {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.5s ease;
}

.front, .back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}

.front {
  background-color: #3498db;
  color: white;
}

.back {
  background-color: #e74c3c;
  color: white;
  transform: rotateY(180deg);
}
```

```javascript
// 初始化卡片位置
gsap.set(".card-container", {
  rotationY: gsap.utils.wrap([-15, 0, 15]), // 交错的初始角度
  z: gsap.utils.wrap([-50, 0, 50]) // 交错的深度
});

// 鼠标悬停效果
document.querySelectorAll(".card-container").forEach(container => {
  container.addEventListener("mouseenter", () => {
    gsap.to(container.querySelector(".card"), {
      rotationY: 180,
      duration: 1,
      ease: "back.out(1.7)"
    });
  });
  
  container.addEventListener("mouseleave", () => {
    gsap.to(container.querySelector(".card"), {
      rotationY: 0,
      duration: 1,
      ease: "back.out(1.7)"
    });
  });
});

// 添加视差效果
document.addEventListener("mousemove", e => {
  const xPos = (e.clientX / window.innerWidth) - 0.5;
  const yPos = (e.clientY / window.innerHeight) - 0.5;
  
  gsap.to(".gallery", {
    rotationY: xPos * 10, // 横向移动引起Y轴旋转
    rotationX: -yPos * 10, // 纵向移动引起X轴旋转
    duration: 0.5
  });
  
  // 深度层次感
  document.querySelectorAll(".card-container").forEach(container => {
    const depth = parseFloat(container.getAttribute("data-depth") || 0);
    gsap.to(container, {
      x: xPos * 50 * (depth + 1),
      y: yPos * 50 * (depth + 1),
      duration: 0.5
    });
  });
});
```

::: note 示例说明
这个示例结合了多个3D技术：
- 卡片翻转效果(rotationY)
- 视差移动(mousemove事件)
- 深度分层(data-depth属性)
- 沉浸式用户体验(整个场景随鼠标移动)
:::

## 实战练习

尝试创建一个3D旋转相册，应用本章学到的技巧。

### 练习要求

1. 创建一个由至少5张照片组成的3D相册
2. 实现照片的3D旋转动画
3. 添加用户交互(点击或悬停)
4. 确保响应式设计
5. 添加适当的性能优化

::: tip 提示
- 使用`transform-style: preserve-3d`保持3D空间
- 考虑使用GSAP时间轴组织复杂动画序列
- 记得为移动设备提供备选交互方式
:::

通过本章的学习，你已经掌握了使用GSAP创建高级3D动画效果的核心技巧。将这些知识应用到你的项目中，可以大大提升用户体验和界面吸引力。
