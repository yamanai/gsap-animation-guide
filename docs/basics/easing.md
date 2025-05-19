# 缓动函数

缓动函数决定了动画在不同时间点的速度变化，是创建自然、有吸引力动画的关键。GSAP提供了丰富的缓动函数选项，本章将详细介绍它们的用法和效果。

<script setup>
import { BasicEasing, EasingFamilies, CustomEasing } from '../../modules/animations/easing';
</script>

## 什么是缓动函数？

在现实世界中，物体很少以恒定速度移动 - 它们会加速、减速，有时还会反弹或弹跳。缓动函数就是模拟这些自然运动规律的数学公式，帮助我们创建更加自然、生动的动画效果。

从技术角度看，缓动函数接收一个0到1之间的输入值（代表动画的进度），然后返回一个计算后的输出值（代表动画属性的进度）。不同的缓动函数会产生不同的"加速度曲线"，从而呈现不同的动画效果。

### 基本缓动类型

- **线性运动**（无缓动，ease: "none"）- 整个动画过程保持恒定速度
- **缓入**（ease-in，ease: "power1.in"）- 动画开始时速度较慢，然后加速
- **缓出**（ease-out，ease: "power1.out"）- 动画开始时速度较快，然后减速
- **缓入缓出**（ease-in-out，ease: "power1.inOut"）- 动画开始和结束时速度较慢，中间加速

<BasicEasing />

::: tip 心智模型
想象一下不同物体的运动特性：
- 线性（none）：机器人精确匀速移动
- 缓入（in）：汽车起步，从慢到快
- 缓出（out）：汽车停车，从快到慢
- 缓入缓出（inOut）：电梯启动和停止的过程
:::

## GSAP内置缓动函数

GSAP提供了多种内置缓动函数，分为几个主要家族。每种缓动函数都有其独特的运动特性，可以用于不同的场景需求。

### Power 家族

Power家族是最基础、最常用的缓动函数，它们基于幂函数（power function）计算动画进度。Power家族按强度分为四级，数字越大，缓动效果越强：

- `power1` = 二次方（Quad）- 较轻微的加速/减速
- `power2` = 三次方（Cubic）- 中等的加速/减速
- `power3` = 四次方（Quart）- 较强的加速/减速
- `power4` = 五次方（Quint）- 很强的加速/减速

每种强度都有三种模式，控制加速/减速发生的时间：
- `.in` - 开始慢，逐渐加速（缓入）
- `.out` - 开始快，逐渐减速（缓出）
- `.inOut` - 开始和结束都慢，中间快（缓入缓出）

```javascript
// power家族示例 - 同一元素四种不同强度的缓出效果
gsap.to(".box1", { x: 200, duration: 1, ease: "power1.out" }); // 轻微减速
gsap.to(".box2", { x: 200, duration: 1, ease: "power2.out" }); // 中等减速
gsap.to(".box3", { x: 200, duration: 1, ease: "power3.out" }); // 较强减速
gsap.to(".box4", { x: 200, duration: 1, ease: "power4.out" }); // 很强减速
```

### 特效缓动函数

除了基本的Power家族，GSAP还提供了多种特效缓动函数，用于创建更富表现力的动画效果：

- **Back** - 稍微回弹再前进，像橡皮筋被拉伸后的反弹
- **Elastic** - 弹性效果，模拟弹簧或橡皮筋的震荡
- **Bounce** - 模拟物体多次弹跳，如皮球落地反弹
- **Circ** - 基于圆函数的缓动，开始或结束时有较大的速度变化
- **Expo** - 指数式变化，提供更戏剧性的加速或减速
- **Sine** - 基于正弦函数的平滑缓动，变化相对温和

<EasingFamilies />

### 缓动函数参数化

某些缓动函数支持参数调整，让你能更精确地控制动画效果。参数通常控制缓动的强度或特性：

```javascript
// 调整弹性回弹的强度和震荡频率
// 第一个参数控制振幅(默认1)，第二个参数控制震荡频率(默认0.3)
gsap.to(".element1", { x: 200, ease: "elastic.out(1, 0.3)" }); // 默认设置
gsap.to(".element2", { x: 200, ease: "elastic.out(0.5, 0.2)" }); // 较弱的弹性，较低频率
gsap.to(".element3", { x: 200, ease: "elastic.out(2, 0.4)" }); // 较强的弹性，较高频率

// 调整回弹的幅度 - 参数控制超过目标多远再回弹(默认1.70158)
gsap.to(".element4", { x: 200, ease: "back.out(1.7)" }); // 默认回弹
gsap.to(".element5", { x: 200, ease: "back.out(3)" }); // 更大的回弹
```

### GSAP缓动函数的使用方式

GSAP提供了多种方式来指定缓动函数：

1. **字符串名称**（最常用）：
```javascript
gsap.to(".element", { x: 100, ease: "power2.out" });
```

2. **函数引用**：
```javascript
import { Power2 } from "gsap";
gsap.to(".element", { x: 100, ease: Power2.easeOut });
```

3. **缓动函数字符串速记**：

GSAP还提供了简短的字符串格式用于常用缓动，如果省略.in/.out/.inOut，则默认使用.inOut模式：

| 简写字符串 | 等效完整表达 |
|-------|------------|
| "none" | 无缓动（线性） |
| "power1" | power1.inOut |
| "power2" | power2.inOut |
| "back" | back.inOut |
| "elastic" | elastic.inOut |
| "bounce" | bounce.inOut |

## 创建自定义缓动函数

有时内置的缓动函数无法满足特定需求，GSAP允许你创建完全自定义的缓动函数。自定义缓动函数本质上是一个接收0-1之间进度值并返回计算后值的JavaScript函数。

### 基本自定义缓动

```javascript
// 自定义缓动函数 - 一个简单的"暂停中间"效果
gsap.registerEase("pauseInMiddle", function(progress) {
  // progress从0增长到1
  // 在进度0.4到0.6之间，动画几乎停止
  if (progress < 0.4) {
    return progress * 0.4 / 0.4; // 前40%的时间内完成40%的动画
  } else if (progress < 0.6) {
    return 0.4; // 中间20%的时间保持不变
  } else {
    // 剩余40%的时间内完成剩余60%的动画
    return 0.4 + (progress - 0.6) * 0.6 / 0.4;
  }
});

// 使用自定义缓动
gsap.to(".element", { x: 200, duration: 2, ease: "pauseInMiddle" });
```

### 组合现有缓动函数

你也可以组合或修改现有的缓动函数创建新效果：

<CustomEasing />

### 使用CustomEase插件（高级）

对于需要更精确控制的情况，GSAP提供了CustomEase插件，让你可以使用贝塞尔曲线或特定点创建完全自定义的缓动曲线：

```javascript
// 需要引入CustomEase插件
gsap.registerPlugin(CustomEase);

// 创建自定义缓动曲线
CustomEase.create("myCustomEase", "M0,0 C0.126,0.382 0.282,0.674 0.44,0.822 0.632,1.002 0.818,1.001 1,1");

// 使用自定义缓动
gsap.to(".element", { x: 100, ease: "myCustomEase" });
```

::: tip 提示
GSAP提供了在线工具[GreenSock Ease Visualizer](https://greensock.com/ease-visualizer)，可以可视化地创建和测试自定义缓动曲线。
:::

## 缓动函数选择指南

选择合适的缓动函数是创建专业动画的关键。以下是不同场景的缓动函数建议：

### UI元素动画

- **按钮悬停**: `power1.out` - 轻微减速，感觉流畅自然
- **模态框显示**: `power2.out` - 中等减速，有一定的视觉重量
- **抽屉菜单**: `power2.inOut` - 平滑的开始和结束
- **元素退出**: `power1.in` - 轻微加速，感觉轻盈

### 特效动画

- **弹出元素**: `back.out(1.7)` - 提供轻微的过冲效果，引起注意
- **掉落物体**: `bounce.out` - 模拟物理弹跳，增加真实感
- **抖动提示**: `elastic.out(1, 0.3)` - 提供弹性反弹效果，吸引注意力
- **脉冲效果**: `sine.inOut` - 平滑的循环动画

### 角色动画

- **起步行走**: `power2.in` - 逐渐加速，模拟起步
- **停止行走**: `power3.out` - 明显减速，模拟停下
- **跳跃起始**: `power2.in` - 蓄力后加速
- **跳跃落地**: `bounce.out` - 落地反弹

### 实际应用示例

```javascript
// 模态框弹出 - 组合使用多种缓动函数
function showModal() {
  const tl = gsap.timeline();
  
  // 背景遮罩淡入 - 平滑过渡
  tl.to(".modal-overlay", { 
    opacity: 1, 
    duration: 0.3, 
    ease: "power1.out" 
  });
  
  // 模态框显示 - 使用back缓动添加轻微过冲效果
  tl.to(".modal", { 
    y: 0, 
    opacity: 1, 
    duration: 0.5, 
    ease: "back.out(1.4)" 
  }, "-=0.1");
  
  // 模态框内容元素依次显示 - 使用弹性效果
  tl.to(".modal-header", { 
    opacity: 1, 
    y: 0, 
    duration: 0.4, 
    ease: "power2.out" 
  }, "-=0.2")
    .to(".modal-body", { 
      opacity: 1, 
      y: 0, 
      duration: 0.4, 
      ease: "power2.out" 
    }, "-=0.3")
    .to(".modal-footer", { 
      opacity: 1, 
      y: 0, 
      duration: 0.4, 
      ease: "power2.out" 
    }, "-=0.3");
    
  return tl;
}
```

## 性能考虑

缓动函数的复杂度会对动画性能产生影响，特别是在低性能设备上：

- **高性能**（适合任何设备）：`none`(线性), `power1`, `power2`, `sine`
- **中等性能**（大多数设备表现良好）：`power3`, `power4`, `circ`, `expo`
- **较低性能**（可能在低端设备上卡顿）：`elastic`, `bounce`, `back`

对于高性能要求的场景，建议：
1. 使用较简单的缓动函数
2. 结合GPU加速属性（transform, opacity）使用任意缓动函数
3. 为低端设备提供降级的缓动选项

```javascript
// 性能友好的方式 - 检测设备性能并使用适当的缓动函数
const isLowPerfDevice = window.navigator.hardwareConcurrency < 4;

gsap.to(".element", {
  x: 200,
  // 低性能设备使用简单缓动，高性能设备使用复杂效果
  ease: isLowPerfDevice ? "power2.out" : "elastic.out(1, 0.3)"
});
```

## 练习：缓动函数实验

尝试以下练习，加深对缓动函数的理解：

1. **基础练习**：创建四个相同的元素，分别应用`none`, `power2.in`, `power2.out`和`power2.inOut`缓动，观察区别

2. **进阶练习**：为一个模态框创建显示和隐藏动画，尝试不同的缓动函数，观察哪种效果最自然

3. **创意挑战**：
   - 使用`elastic`缓动创建一个"弹跳按钮"效果
   - 组合使用`bounce`和自定义缓动实现一个"掉落后停顿"的动画
   - 尝试创建一个自定义缓动，实现"加速-停顿-减速"的效果

## 总结

缓动函数是动画的灵魂，合适的缓动能让动画感觉更加自然和专业。GSAP提供了丰富的内置选项，从简单的Power家族到特效缓动，甚至支持自定义缓动函数，满足各种需求。

缓动函数选择的核心原则是：让动画符合物理世界的运动规律，并根据元素的"性格"和动画目的选择合适的缓动类型。熟练掌握缓动函数的使用，是从初级动画师晋升为专业动画师的关键一步。

在下一章中，我们将学习GSAP的时间轴（Timeline）功能，它能让你轻松创建和控制复杂的动画序列。 