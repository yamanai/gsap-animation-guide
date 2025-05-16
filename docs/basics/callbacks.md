# 回调函数与事件

GSAP提供了强大的回调函数系统，让你能够在动画的不同阶段执行代码。通过这些回调，你可以创建复杂的交互和连锁动画效果。本章将详细介绍如何使用GSAP的回调函数和事件系统。

## 常用回调函数

GSAP支持多种回调函数，可以在动画的不同阶段触发：

```javascript
gsap.to(".box", {
  x: 200,
  duration: 1,
  onStart: function() {
    console.log("动画开始了！");
  },
  onUpdate: function() {
    console.log("动画正在进行中...");
  },
  onComplete: function() {
    console.log("动画完成了！");
  }
});
```

## 回调函数参数与上下文

更多内容即将推出... 