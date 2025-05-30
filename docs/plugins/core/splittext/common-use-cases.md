---
title: SplitText常见应用场景
editLink: true
outline: deep
---

# SplitText常见应用场景

SplitText插件的强大之处在于它能够实现各种各样的文本动画效果。本章将介绍SplitText插件的常见应用场景，并提供实用的代码示例，帮助您在项目中创建引人注目的文本动画。

## 打字机效果

打字机效果是一种常见的文本动画，通过逐个显示字符来模拟打字的过程。使用SplitText可以轻松实现这种效果。

### 基础打字机效果

```javascript
// 获取文本元素
const textElement = document.querySelector(".typing-text");
// 隐藏原始文本
gsap.set(textElement, { visibility: "visible" });
// 创建SplitText实例
const split = new SplitText(textElement, { type: "chars" });
// 初始设置所有字符为透明
gsap.set(split.chars, { opacity: 0 });

// 创建打字机动画
gsap.to(split.chars, {
  opacity: 1,
  duration: 0.05,
  stagger: 0.05,
  ease: "none"
});
```

### 带有光标的打字机效果

```html
<div class="typing-container">
  <div class="typing-text">欢迎使用GSAP SplitText插件</div>
  <div class="cursor">|</div>
</div>
```

```javascript
// 获取文本元素
const textElement = document.querySelector(".typing-text");
// 创建SplitText实例
const split = new SplitText(textElement, { type: "chars" });
// 获取光标元素
const cursor = document.querySelector(".cursor");

// 初始设置
gsap.set(split.chars, { opacity: 0 });
gsap.set(cursor, { opacity: 1 });

// 创建打字机动画
const tl = gsap.timeline();

// 打字动画
tl.to(split.chars, {
  opacity: 1,
  duration: 0.05,
  stagger: 0.05,
  ease: "none"
});

// 光标闪烁动画
gsap.to(cursor, {
  opacity: 0,
  duration: 0.5,
  repeat: -1,
  yoyo: true,
  ease: "power1.inOut"
});
```

## 文字飞入动画

文字飞入动画是网页设计中常见的入场效果，可以让文本从屏幕外或者特定位置飞入视野。

### 单词依次飞入

```javascript
const headingElement = document.querySelector(".heading");
const split = new SplitText(headingElement, { type: "words" });

// 设置初始状态
gsap.set(split.words, { 
  opacity: 0,
  y: 50,
  rotationX: -90
});

// 创建飞入动画
gsap.to(split.words, {
  opacity: 1,
  y: 0,
  rotationX: 0,
  stagger: 0.1,
  duration: 0.8,
  ease: "back.out(1.7)"
});
```

### 字符从随机位置飞入

```javascript
const titleElement = document.querySelector(".title");
const split = new SplitText(titleElement, { type: "chars" });

// 设置初始随机位置
split.chars.forEach(char => {
  gsap.set(char, {
    opacity: 0,
    x: gsap.utils.random(-300, 300),
    y: gsap.utils.random(-100, 100),
    rotation: gsap.utils.random(-180, 180)
  });
});

// 创建动画
gsap.to(split.chars, {
  opacity: 1,
  x: 0,
  y: 0,
  rotation: 0,
  duration: 1,
  ease: "power3.out",
  stagger: 0.02
});
```

## 文字波浪动画

波浪动画是一种连续的、起伏的动画效果，非常适合用于标题或重点内容的强调。

### 基础波浪效果

```javascript
const textElement = document.querySelector(".wave-text");
const split = new SplitText(textElement, { type: "chars" });

gsap.to(split.chars, {
  y: -20,
  stagger: {
    each: 0.05,
    repeat: -1,
    yoyo: true
  },
  ease: "sine.inOut",
  duration: 0.5
});
```

### 高级波浪效果

```javascript
const textElement = document.querySelector(".fancy-wave");
const split = new SplitText(textElement, { type: "chars" });

// 创建波浪效果
gsap.to(split.chars, {
  y: function(index) {
    // 生成不同振幅的波浪
    return Math.sin(index * 0.5) * 20;
  },
  rotation: function(index) {
    // 添加轻微旋转
    return Math.sin(index * 0.3) * 10;
  },
  scale: function(index) {
    // 大小变化
    return 1 + Math.sin(index * 0.8) * 0.2;
  },
  ease: "sine.inOut",
  duration: 1,
  stagger: {
    each: 0.02,
    repeat: -1,
    yoyo: true
  }
});
```

## 文字强调效果

强调效果用于突出显示文本中的特定部分，引导用户注意力。

### 单词弹出效果

```javascript
const paragraphElement = document.querySelector(".paragraph");
const split = new SplitText(paragraphElement, { type: "words" });

// 为特定单词添加类（假设要突出显示第3、5、7个单词）
const highlightIndices = [2, 4, 6]; // 数组索引从0开始
highlightIndices.forEach(index => {
  if (split.words[index]) {
    split.words[index].classList.add("highlight-word");
  }
});

// 创建动画
gsap.timeline({
  scrollTrigger: {
    trigger: paragraphElement,
    start: "top 70%",
    toggleActions: "play none none reverse"
  }
})
.from(".highlight-word", {
  scale: 1.5,
  color: "#ff0000",
  fontWeight: "bold",
  duration: 0.7,
  stagger: 0.3,
  ease: "elastic.out(1, 0.5)"
});
```

## 文字揭示动画

揭示动画通常用于标题或重要内容的入场，给人一种逐渐展开或揭示的感觉。

### 单词逐个揭示

```javascript
const headingElement = document.querySelector(".reveal-heading");
const split = new SplitText(headingElement, { type: "words" });

// 为每个单词创建遮罩
split.words.forEach(word => {
  const wrapper = document.createElement("div");
  wrapper.classList.add("word-wrapper");
  word.parentNode.insertBefore(wrapper, word);
  wrapper.appendChild(word);
  
  gsap.set(word, { opacity: 0, y: "100%" });
});

// 创建揭示动画
gsap.to(split.words, {
  opacity: 1,
  y: "0%",
  stagger: 0.2,
  duration: 1,
  ease: "power4.out",
  scrollTrigger: {
    trigger: headingElement,
    start: "top 80%"
  }
});
```

### 带遮罩的文字揭示

```html
<style>
.mask-container {
  position: relative;
  overflow: hidden;
}
.mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
}
</style>

<div class="mask-container">
  <h1 class="masked-text">创意文字揭示</h1>
  <div class="mask"></div>
</div>
```

```javascript
const textElement = document.querySelector(".masked-text");
const maskElement = document.querySelector(".mask");
const split = new SplitText(textElement, { type: "chars" });

// 创建动画
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".mask-container",
    start: "top 70%"
  }
});

// 先揭示遮罩
tl.to(maskElement, {
  scaleX: 0,
  transformOrigin: "left",
  duration: 0.8,
  ease: "power4.inOut"
})
// 然后显示字符
.from(split.chars, {
  opacity: 0,
  y: 20,
  rotationX: -40,
  stagger: 0.03,
  duration: 0.6,
  ease: "back.out"
}, "-=0.3");
```

## 滚动触发的文字动画

结合ScrollTrigger插件，可以创建随页面滚动触发的文字动画。

### 基础滚动揭示

```javascript
const sections = document.querySelectorAll(".section-title");

sections.forEach(section => {
  const split = new SplitText(section, { type: "chars, words" });
  
  gsap.from(split.chars, {
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      end: "top 20%",
      toggleActions: "play none none reverse"
    },
    opacity: 0,
    y: 50,
    stagger: 0.02,
    duration: 0.6,
    ease: "back.out"
  });
});
```

### 自定义滚动进度动画

```javascript
const headingElement = document.querySelector(".parallax-heading");
const split = new SplitText(headingElement, { type: "chars" });

// 创建滚动触发动画
ScrollTrigger.create({
  trigger: headingElement,
  start: "top bottom",
  end: "bottom top",
  scrub: 1,
  onUpdate: self => {
    // 基于滚动进度设置每个字符的位置和旋转
    const progress = self.progress;
    split.chars.forEach((char, index) => {
      const offset = (index - split.chars.length / 2) * 20;
      
      gsap.set(char, {
        x: offset * (1 - progress),
        y: -100 * progress,
        opacity: 0.2 + progress * 0.8,
        rotation: (1 - progress) * (index % 2 ? 90 : -90),
        scale: 0.5 + progress * 0.5
      });
    });
  }
});
```

## 响应式文字动画

创建适应不同屏幕尺寸的文字动画是现代网页设计的重要部分。

### 屏幕尺寸适配动画

```javascript
let splitInstance;

// 创建分割实例的函数
function createSplit() {
  // 如果已存在实例，先恢复原始状态
  if (splitInstance) splitInstance.revert();
  
  const textElement = document.querySelector(".responsive-text");
  
  // 根据屏幕宽度选择不同的分割方式
  if (window.innerWidth > 768) {
    // 大屏幕 - 分割为字符
    splitInstance = new SplitText(textElement, { type: "chars" });
    
    gsap.from(splitInstance.chars, {
      opacity: 0,
      y: 20,
      stagger: 0.03,
      duration: 0.8
    });
  } else {
    // 小屏幕 - 分割为单词
    splitInstance = new SplitText(textElement, { type: "words" });
    
    gsap.from(splitInstance.words, {
      opacity: 0,
      x: -30,
      stagger: 0.1,
      duration: 0.6
    });
  }
}

// 初始创建
createSplit();

// 窗口大小变化时重新创建
window.addEventListener("resize", gsap.debounce(createSplit, 300));
```

## 总结

SplitText插件为创建各种文本动画提供了强大的功能。本章介绍了多种常见应用场景，从基础的打字机效果到复杂的滚动触发动画。通过灵活组合这些技术，您可以创建出独特而引人注目的文字动画效果。

在下一章中，我们将深入探讨SplitText的[高级功能与技巧](/plugins/core/splittext/advanced-features)，帮助您进一步掌握这一强大工具。 