# 动画属性详解：让元素动起来

GSAP的魅力在于能让网页元素以各种方式"动起来"。这些"动"的效果，都是通过**动画属性**实现的。就像画家通过不同的颜色和笔触创作画作，你可以通过GSAP的各种属性创造出丰富多彩的动画效果。

## 属性心智模型：想象动画属性的四个维度

要理解GSAP的各类属性，可以将它们想象为改变元素的四个维度：

1. **空间维度** - 位置、大小、旋转等物理属性
   * 如同现实世界中物体的移动和变形
   * 主要属性：`x`, `y`, `scale`, `rotation`, `width`, `height`

2. **视觉维度** - 颜色、透明度、边框等外观属性
   * 相当于为元素"上色"或改变其外表
   * 主要属性：`backgroundColor`, `opacity`, `borderRadius`, `boxShadow`

3. **时间维度** - 动画的持续、延迟、重复等时间属性
   * 控制"何时"和"多久"的参数
   * 主要属性：`duration`, `delay`, `repeat`, `yoyo`
   
4. **行为维度** - 缓动函数、回调函数等控制动作方式的属性
   * 决定动画的"性格"和"反应"
   * 主要属性：`ease`, `onComplete`, `onUpdate`

:::tip 初学者提示
刚开始学习时，可以先专注于空间维度和视觉维度的属性，它们最直观且用途最广。掌握这些后，再探索时间维度和行为维度，逐步构建更复杂的动画。
:::

## 什么是动画属性？

**动画属性**是GSAP动画中要改变的具体特性。想象一下：

- 当你说"向右移动方块"，这里的"位置"就是一个属性
- 当你说"让按钮淡入显示"，这里的"透明度"就是一个属性
- 当你说"使标题文字变大"，这里的"字体大小"就是一个属性

## 属性类型一览表

GSAP让几乎所有数值型属性都能产生动画效果。以下是主要的属性分类：

| 类型 | 作用 | 常见属性 | 适用场景 |
|------|------|----------|---------|
| **位置变换** | 移动和旋转元素 | x, y, rotation, scale | 元素入场、强调、过渡 |
| **视觉样式** | 改变元素外观 | backgroundColor, opacity | 状态变化、主题切换 |
| **尺寸调整** | 改变元素大小 | width, height | 展开/折叠、聚焦 |
| **文本效果** | 改变文字特性 | fontSize, letterSpacing | 强调文本、提升易读性 |
| **SVG专属** | 操作SVG图形 | fill, stroke, cx, cy | 图表动画、图标交互 |

## 位置变换属性：让元素"跑"起来

位置变换是最直观、使用最广泛的动画类型。当你想让一个元素从A点移动到B点，或者进行旋转、缩放，都可以使用这些属性。

### 基础变换属性详解

```javascript
gsap.to(".element", {
  x: 100,           // 水平移动100px（正值向右，负值向左）
  y: -50,           // 垂直移动-50px（负值向上，正值向下）
  rotation: 45,     // 顺时针旋转45度（负值为逆时针）
  scale: 1.5,       // 整体放大到原来的1.5倍（小于1则缩小）
  scaleX: 2,        // 仅水平方向放大到2倍
  scaleY: 0.5,      // 仅垂直方向缩小到0.5倍
  skewX: 15,        // X轴倾斜15度（使元素看起来像平行四边形）
  skewY: 10,        // Y轴倾斜10度
});
```

::: tip 小提示：x和y与CSS中的transform
当GSAP中使用`x: 100`时，背后实际用的是`transform: translateX(100px)`，但GSAP简化了这一语法，并提供了更好的浏览器兼容性和性能优化。
:::

### 为什么用GSAP的x/y而不是CSS的left/top？

对比一下：

```javascript
// GSAP方式（推荐）
gsap.to(".element", { x: 100, y: 100 });

// 传统CSS方式（不推荐）
gsap.to(".element", { left: "100px", top: "100px" });
```

优势对比：
- **性能**：x/y使用CSS transform，浏览器能硬件加速，性能更好
- **兼容性**：自动处理浏览器兼容问题，无需加前缀
- **精确性**：避免布局重排(reflow)，动画更流畅
- **组合性**：可以和旋转、缩放等其他变换轻松组合

### 3D变换：让平面元素有深度感

想让你的网页有3D效果？GSAP也能轻松实现：

```javascript
gsap.to(".element-3d", {
  rotationX: 45,       // 围绕X轴旋转（让元素前倾或后仰）
  rotationY: 30,       // 围绕Y轴旋转（让元素左右翻转）
  rotationZ: 15,       // 围绕Z轴旋转（等同于rotation，传统的平面旋转）
  z: 200,              // Z轴位移（让元素在垂直于屏幕的方向移动）
  perspective: 500,    // 添加透视效果（值越小，3D效果越强烈）
  transformOrigin: "center bottom", // 变换原点（例如从底部旋转而不是中心）
  transformStyle: "preserve-3d",    // 保持3D效果，使子元素也具有3D空间
});
```

::: warning 注意事项
使用3D变换时，父元素通常需要设置`perspective`属性，子元素需要在3D空间中，效果才能正常显示。
:::

<div class="demo-container">
  <div class="demo-box">
    <div class="demo-element" id="transform-demo"></div>
  </div>
  <button class="demo-button" id="transform-button">运行变换动画</button>
  <div class="demo-description">
    ⬆️ 点击按钮，观察上面的蓝色方块如何移动、旋转并变色
  </div>
</div>

## 视觉样式属性：改变元素的外观

除了位置和形状，元素的颜色、透明度等视觉特性也是动画的重要方面。

### 尺寸与间距：控制元素的大小与边距

```javascript
gsap.to(".element", {
  width: "80%",        // 宽度变为父容器的80%
  height: 300,         // 高度变为300px
  maxWidth: 500,       // 最大宽度限制为500px
  padding: 20,         // 所有内边距变为20px
  paddingTop: 30,      // 只调整顶部内边距为30px
  margin: "15px 10px", // 上下外边距15px，左右外边距10px
  borderWidth: 5,      // 边框宽度变为5px
  borderRadius: "50%", // 边框圆角变为圆形（50%是圆形，值越小越方）
});
```

::: tip 理解百分比和像素
- 使用百分比（如`width: "80%"`）时，尺寸会相对于父容器变化
- 使用像素（如`height: 300`）时，尺寸是固定的绝对值
- 混合使用可以创建响应式但有限制的布局
:::

### 颜色与透明度：让元素有情绪变化

```javascript
gsap.to(".element", {
  backgroundColor: "#42b883",     // 背景色变为绿色（十六进制颜色代码）
  color: "rgb(50, 50, 50)",       // 文字颜色变为深灰色（RGB格式）
  borderColor: "rgba(0,0,0,0.2)", // 边框颜色带20%透明度（RGBA格式）
  opacity: 0.8,                   // 整体元素透明度变为80%（0是完全透明，1是完全不透明）
});
```

**颜色动画的神奇之处**：GSAP会智能地计算颜色之间的过渡，即使格式不同也能平滑过渡。例如从`#ff0000`(红色)到`rgb(0,0,255)`(蓝色)，GSAP会正确地计算中间的紫色调过渡。

### 文本与阴影：让文字有表现力

```javascript
gsap.to(".element", {
  fontSize: "2rem",      // 字体大小变为2rem（相对单位，适合响应式设计）
  fontWeight: 700,       // 字体粗细变为700（普通是400，粗体是700）
  letterSpacing: 2,      // 字母间距增加2px（可以是负值，让字母更紧凑）
  lineHeight: 1.5,       // 行高变为字体大小的1.5倍（影响文本段落的疏密）
  textIndent: 20,        // 首行缩进20px
  boxShadow: "0 10px 20px rgba(0,0,0,0.2)",  // 盒阴影：水平0，垂直10px，模糊20px，半透明黑色
  textShadow: "1px 1px 2px #000",           // 文字阴影：水平1px，垂直1px，模糊2px，黑色
});
```

::: tip boxShadow值的含义
`boxShadow: "0 10px 20px rgba(0,0,0,0.2)"` 各部分解析：
- 第一个值`0`：阴影的水平偏移，0表示正下方
- 第二个值`10px`：阴影的垂直偏移，正值表示向下
- 第三个值`20px`：阴影的模糊半径，值越大阴影越模糊
- 第四个值`rgba(0,0,0,0.2)`：阴影颜色，这里是20%透明度的黑色
:::

<div class="demo-container">
  <div class="demo-box style-demo-box">
    <p class="style-text" id="style-demo">GSAP 动画</p>
  </div>
  <button class="demo-button" id="style-button">运行样式动画</button>
  <div class="demo-description">
    ⬆️ 点击按钮，观察文本的字体、大小、颜色和阴影如何变化
  </div>
</div>

## SVG 专属属性：让矢量图形活起来

SVG（可缩放矢量图形）是现代网页中常用的图形格式，GSAP对SVG的动画支持非常强大。

### 什么是SVG？
SVG是一种基于XML的矢量图形格式，不同于像素图（如JPG、PNG），它由数学公式定义，因此可以无损放大缩小。网页中的图标、简单插图和交互图形通常使用SVG。

### 基础 SVG 属性详解

```javascript
gsap.to("svg circle", {
  cx: 150,              // 圆心x坐标变为150（水平位置）
  cy: 100,              // 圆心y坐标变为100（垂直位置）
  r: 50,                // 半径变为50（控制圆的大小）
  fill: "#ff6b6b",      // 填充颜色变为红色（内部颜色）
  stroke: "#333",       // 描边颜色变为深灰色（边框颜色）
  strokeWidth: 3,       // 描边宽度变为3px（边框粗细）
  strokeDasharray: 10,  // 虚线样式，实线10px，空白10px（类似于CSS中的dashed）
  strokeDashoffset: 20, // 虚线偏移20px（可用于创建描边动画效果）
});
```

### 路径变形动画：形状变化的魔法

SVG路径（path）是最灵活的SVG元素，可以创建任意形状。GSAP能让一个形状平滑变形为另一个形状：

```javascript
// 让一个正方形变成圆形（通过改变路径数据）
gsap.to("svg path", {
  attr: { 
    d: "M50,50 a25,25 0 1,1 50,0 a25,25 0 1,1 -50,0" // 圆形路径
  },
  duration: 2
});
```

::: tip 小技巧
路径动画需要确保起始路径和目标路径的点数相同，否则变形可能不正确。
:::

<div class="demo-container">
  <div class="demo-box">
    <svg width="100%" height="100%" viewBox="0 0 200 100" id="svg-demo">
      <circle cx="50" cy="50" r="20" fill="#4a7aff" stroke="none"/>
      <rect x="110" y="30" width="40" height="40" fill="#ff6b6b" stroke="none"/>
    </svg>
  </div>
  <button class="demo-button" id="svg-button">运行 SVG 动画</button>
  <div class="demo-description">
    ⬆️ 点击按钮，观察左侧的圆形和右侧的方形如何变化
  </div>
</div>

## GSAP 特殊属性：动画的增强功能

GSAP提供了一些特殊属性和语法，让动画制作更加灵活和强大。

### 相对值：基于当前值的变化

不确定元素当前的值是多少？使用相对值语法就能基于当前值进行增减：

```javascript
gsap.to(".element", {
  x: "+=100",      // 在当前水平位置上再向右移动100px
  rotation: "-=45" // 在当前旋转角度上逆时针旋转45度
});
```

这在**交互式动画**中特别有用，例如每次点击按钮让元素再移动一段距离。

### 随机值：为动画增加变化和活力

想让多个元素有不同的动画效果？随机值功能可以帮助你：

```javascript
// 方法1：使用数组，GSAP会从中随机选择一个值
gsap.to(".element", {
  x: [100, 200, 300],  // 将随机选择这三个值之一
  ease: "power1.out",
  duration: 1
});

// 方法2：使用函数，每次调用返回不同的值
gsap.to(".boxes", {
  y: () => Math.random() * 100 - 50, // -50到+50之间的随机值
  rotation: () => Math.random() * 360, // 0到360之间的随机旋转
  duration: 1
});

// 方法3：使用GSAP的random()函数，设定范围
gsap.to(".circles", {
  scale: "random(0.8, 1.2)", // 在0.8到1.2之间的随机缩放
  duration: 1
});
```

::: tip 使用场景
随机值适合创建：
- 粒子效果（如雪花、星星）
- 错落有致的图片墙
- 自然的群体运动（如鱼群、飞鸟）
:::

### 函数属性值：动态和条件动画

当不同元素需要不同动画效果，但有一定规律时，函数属性值非常有用：

```javascript
// 让一排元素形成扇形排列
gsap.to(".elements", {
  rotation: (index) => index * 10, // 第1个元素旋转0度，第2个旋转10度，以此类推
  x: (index) => index * 50,        // 水平间隔50px
  scale: (index, target) => {      // 根据元素的类决定缩放值
    return target.classList.contains("important") ? 1.5 : 1;
  },
  duration: 1
});
```

在函数中，你可以获取两个参数：
- `index`：当前元素的索引（从0开始）
- `target`：当前元素的DOM对象

这让你能根据元素的顺序、特性或内容创建有逻辑的变化。

## 组合动画示例：属性的协同效果

当多个属性一起变化时，可以创造出丰富而生动的动画效果。以下示例展示了如何结合多种属性：

<GsapEditor 
  title="组合多种动画属性"
  :initialHtml="`<div class='animation-target'></div>`"
  :initialCss="`.animation-target {
  width: 120px;
  height: 120px;
  background-color: #ff6b6b;
  margin: 100px auto;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}`"
  :initialJs="`// 目标元素
const box = document.querySelector('.animation-target');
// 综合使用多种动画属性
gsap.fromTo(box, 
  {
    x: -100,            // 起始位置在左侧
    y: -50,             // 起始位置在上方
    scale: 0.5,         // 初始缩小一半
    backgroundColor: '#ff6b6b',  // 开始是红色
    borderRadius: '5px',  // 开始是略微圆角的方形
    opacity: 0.3        // 开始接近透明
  },
  {
    x: 100,             // 移动到右侧
    y: 50,              // 移动到下方
    scale: 1.2,         // 放大到1.2倍
    backgroundColor: '#42b883',  // 变成绿色
    borderRadius: '50%', // 变成圆形
    opacity: 1,         // 变为完全不透明
    rotation: 180,      // 旋转半圈
    boxShadow: '0 15px 30px rgba(0,0,0,0.3)',  // 添加阴影
    duration: 2,        // 动画持续2秒
    ease: 'elastic.out(1, 0.5)'  // 使用弹性缓动
  }
);`"
/>

### fromTo方法的优势

在上面的例子中，我们使用了`gsap.fromTo()`方法，它同时指定了动画的起始状态和结束状态。这在以下情况特别有用：

1. **确保一致的起点**：无论元素当前状态如何，动画都从指定的状态开始
2. **从不可见到可见**：创建元素入场动画，从透明到显示
3. **复杂的状态转换**：当需要改变多个属性，且起始值和结束值差异很大

## 练习：创建渐变色动画

动手练习时间！尝试修改下面的代码，创建一个元素从红色渐变到蓝色，同时改变其形状、位置和阴影的动画：

<GsapEditor 
  title="渐变色与多属性动画练习"
  :initialHtml="`<div class='animation-target'></div>`"
  :initialCss="`.animation-target {
  width: 120px;
  height: 120px;
  background-color: #e74c3c;
  margin: 100px auto;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}`"
  :initialJs="`// 修改此代码，创建渐变色动画
gsap.to('.animation-target', {
  // 提示：尝试添加以下属性
  // - backgroundColor (从红色到蓝色)
  // - borderRadius (从方形到圆形)
  // - x 或 y (添加位置移动)
  // - boxShadow (添加阴影效果)
  // - scale 或 rotation (添加变形效果)
  duration: 2
});`"
/>

::: tip 练习提示
可以尝试添加这些属性：
- `backgroundColor: '#4a7aff'` 蓝色
- `borderRadius: '50%'` 圆形
- `x: 100` 向右移动
- `boxShadow: '0 10px 25px rgba(0,0,255,0.4)'` 蓝色阴影
- `scale: 1.2` 放大
:::

## 属性动画应用场景

了解了这么多属性，你可能会问：什么时候用哪种属性？以下是一些常见场景：

| 场景 | 推荐属性 | 示例 |
|------|---------|------|
| **元素入场** | opacity, y, scale | 从透明渐显，同时从下方向上移动 |
| **强调重点** | scale, brightness, boxShadow | 短暂放大并增加亮度和阴影 |
| **按钮反馈** | scale, backgroundColor | 点击时缩小并变色 |
| **内容切换** | opacity, x | 旧内容淡出向左，新内容从右淡入 |
| **加载指示** | rotation, opacity | 旋转的加载图标，周期性改变透明度 |
| **数据可视化** | height, width, fill | 根据数值调整柱状图高度或饼图大小 |

## 下一步

恭喜！你现在对GSAP动画属性有了全面的了解。这些是创建任何复杂动画的基础构件。掌握了这些属性后，让我们继续学习如何 [选择和操作多个元素](./selectors.html) ，这将帮助你创建更加复杂和丰富的动画序列。

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
}

.demo-element {
  width: 50px;
  height: 50px;
  background: #4a7aff;
  border-radius: 4px;
  position: absolute;
  top: 75px;
  left: 75px;
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

.style-demo-box {
  display: flex;
  justify-content: center;
  align-items: center;
}

.style-text {
  font-size: 1.5rem;
  color: #333;
}
</style>

<script>
import { onMounted } from 'vue'

export default {
  setup() {
    onMounted(() => {
      if (typeof gsap !== 'undefined') {
        // 变换动画示例
        const transformButton = document.getElementById('transform-button')
        const transformElement = document.getElementById('transform-demo')
        
        if (transformButton && transformElement) {
          transformButton.addEventListener('click', () => {
            // 重置元素状态
            gsap.set(transformElement, { 
              x: 0, y: 0, rotation: 0, scale: 1, 
              clearProps: "all" 
            })
            
            // 运行动画
            gsap.to(transformElement, {
              duration: 2,
              x: 100,
              y: 30,
              rotation: 360,
              scale: 1.5,
              backgroundColor: "#42b883",
              ease: "power2.inOut"
            })
          })
        }
        
        // 样式动画示例
        const styleButton = document.getElementById('style-button')
        const styleElement = document.getElementById('style-demo')
        
        if (styleButton && styleElement) {
          styleButton.addEventListener('click', () => {
            // 重置元素状态
            gsap.set(styleElement, { clearProps: "all" })
            
            // 运行动画
            gsap.to(styleElement, {
              duration: 1.5,
              fontSize: "2.5rem",
              fontWeight: 700,
              color: "#ff6b6b",
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
              letterSpacing: "5px",
              ease: "back.out(1.7)"
            })
          })
        }
        
        // SVG 动画示例
        const svgButton = document.getElementById('svg-button')
        const circleElement = document.querySelector('#svg-demo circle')
        const rectElement = document.querySelector('#svg-demo rect')
        
        if (svgButton && circleElement && rectElement) {
          svgButton.addEventListener('click', () => {
            // 重置元素状态
            gsap.set([circleElement, rectElement], { clearProps: "all" })
            
            // 圆形动画
            gsap.to(circleElement, {
              duration: 1.5,
              cx: 150,
              cy: 70,
              r: 30,
              fill: "#ff6b6b",
              ease: "elastic.out(1, 0.5)"
            })
            
            // 矩形动画
            gsap.to(rectElement, {
              duration: 1.5,
              x: 20,
              y: 20,
              width: 60,
              height: 60,
              fill: "#4a7aff",
              ease: "bounce.out"
            })
          })
        }
      }
    })
  }
}
</script> 