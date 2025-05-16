# 选择器与DOM操作

GSAP提供了强大而灵活的选择器系统，让你能够轻松地选择和动画多个元素。本章将介绍GSAP中的选择器使用方法以及如何操作DOM元素。

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

更多内容即将推出... 