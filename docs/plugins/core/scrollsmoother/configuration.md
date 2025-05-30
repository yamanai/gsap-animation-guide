---
title: 基础配置选项
---

# 基础配置选项

ScrollSmoother提供了多种配置选项，可以根据项目需求进行调整。下面详细介绍每个配置项的作用和用法。

## 核心配置选项

| 配置项 | 类型 | 默认值 | 说明 |
|-------|------|------|------|
| `wrapper` | String/Element | undefined | 包装元素的选择器或DOM元素引用（必需） |
| `content` | String/Element | undefined | 内容元素的选择器或DOM元素引用（必需） |
| `smooth` | Number/Boolean | 1 | 平滑程度，数值越大越平滑，设为false关闭平滑滚动 |
| `effects` | Boolean/String | true | 是否启用视差效果，或字符串选择器指定范围 |
| `smoothTouch` | Number/Boolean | false | 触摸设备上的平滑度，默认关闭 |

## 详细配置项说明

### 基础配置

```javascript
ScrollSmoother.create({
  // 必需的核心配置
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  
  // 平滑滚动设置
  smooth: 1.5, // 更高的值 = 更平滑/更慢的滚动
  
  // 触摸设备上的平滑度（通常移动设备上滚动平滑效果不太好）
  smoothTouch: 0.1, // 移动设备上使用较小的值，或false禁用
  
  // 标准化滚动速度
  normalizeScroll: true, // 使不同设备的滚动速度更一致
  
  // 速度参数
  speed: 1, // 滚动速度因子，增加此值加快滚动速度
  
  // 锁定功能
  ignoreMobileResize: true, // 移动设备调整大小时不刷新
})
```

### 高级动画控制

```javascript
ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  
  // 自定义缓动函数
  ease: "power4.out", // 滚动的缓动类型
  
  // 预防内容跳跃
  preventDefault: true, // 防止原生滚动行为导致的跳动
  
  // 滚动限制
  limitVelocity: 10, // 限制最大滚动速度
  
  // 自定义刷新逻辑
  onUpdate: (self) => {
    // 每次滚动更新时执行的回调
    console.log('滚动位置更新:', self.scrollTop());
  },
  
  // 平滑启动
  smoothStart: true, // 平滑处理初始滚动位置
})
```

## 视差效果配置

ScrollSmoother内置支持视差效果，可通过HTML属性轻松配置：

```html
<!-- 基本视差效果：元素相对于滚动速度慢一点 -->
<div data-speed="0.8">这个元素滚动速度是标准速度的0.8倍</div>

<!-- 负值会使元素向相反方向移动 -->
<div data-speed="-0.2">这个元素会向相反方向缓慢移动</div>

<!-- 控制视差的缓动效果 -->
<div data-lag="0.5">这个元素会有0.5秒的滞后效果</div>
```

在JavaScript中配置视差范围：

```javascript
ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  
  // 仅对特定元素启用视差效果
  effects: ".parallax-section, .parallax-image",
  
  // 或完全禁用视差
  effects: false
})
```

## 配置优先级

如果在HTML和JavaScript中都指定了配置，优先级如下：

1. JavaScript中的直接配置项
2. HTML元素上的`data-*`属性
3. 默认值

## 配置建议

1. **平滑度建议值**：
   - 桌面端: 0.8 - 2.0
   - 移动端: 0.1 - 0.5 (如果启用)

2. **性能与体验平衡**：
   - 平滑度越高，动画效果越明显，但性能开销也越大
   - 在低端设备上建议使用较低的平滑值或完全禁用

3. **移动设备考量**：
   ```javascript
   // 根据设备调整平滑度
   ScrollSmoother.create({
     wrapper: "#smooth-wrapper",
     content: "#smooth-content",
     smooth: 1.5,
     // 移动设备检测
     smoothTouch: window.innerWidth < 768 ? 0.1 : false, 
     ignoreMobileResize: true
   });
   ``` 