# ScrollTrigger 配置详解

ScrollTrigger 是 GSAP 中功能最强大的插件之一，它允许你基于页面滚动位置来控制动画。本文将详细介绍 ScrollTrigger 的所有配置选项，帮助你充分利用这个强大的工具。

<script setup>
import { 
  BasicConfig, 
  CallbackFunctions, 
  SnapEffect, 
  CustomScroller, 
  ParallaxEffect, 
  AnimationSequence, 
  InteractiveChart, 
  PinExample 
} from '../../../../modules/animations/plugins/core/scrolltrigger';
</script>

## 基础配置项

以下是 ScrollTrigger 最常用的基础配置选项，掌握这些选项就能创建大部分滚动触发动画。

### trigger

`trigger` 定义了触发 ScrollTrigger 的元素。当这个元素进入视口时，ScrollTrigger 会被激活。

```js
scrollTrigger: {
  trigger: ".box", // 选择器字符串或DOM元素
}
```

### start 和 end

这两个属性决定了 ScrollTrigger 的触发区间：

- `start`: 定义 ScrollTrigger 开始的位置
- `end`: 定义 ScrollTrigger 结束的位置

这两个属性接受以下几种值格式：

1. **数字或带单位的字符串**：表示相对于视口顶部的垂直位置
2. **百分比字符串**：表示相对于视口高度的百分比位置
3. **"top/center/bottom"**: 表示触发元素的相对位置
4. **组合格式**："位置 位置"（如 "top center"）

```js
scrollTrigger: {
  trigger: ".box",
  start: "top center", // 当元素顶部到达视口中心时
  end: "bottom 80%"    // 当元素底部到达视口80%位置时
}
```

### scrub

`scrub` 属性可以让动画进度与滚动位置同步，产生"跟随滚动"的效果。

```js
scrollTrigger: {
  trigger: ".box",
  start: "top center",
  end: "bottom center",
  scrub: true, // 动画进度与滚动位置同步
}
```

你也可以传入数值，表示动画追随滚动的平滑程度（单位为秒）：

```js
scrollTrigger: {
  scrub: 0.5 // 0.5秒的平滑追随效果
}
```

### toggleActions

`toggleActions` 定义了 ScrollTrigger 在四个关键事件上应该执行的动作：

1. 进入（onEnter）：从上方滚动使触发器进入视野
2. 离开（onLeave）：从下方滚动使触发器离开视野
3. 重新进入（onEnterBack）：从下方滚动使触发器重新进入视野
4. 重新离开（onLeaveBack）：从上方滚动使触发器重新离开视野

可用的动作有：
- `play`: 播放动画
- `pause`: 暂停动画
- `resume`: 继续播放
- `reset`: 重置动画到初始状态
- `restart`: 重新开始动画
- `complete`: 完成动画
- `reverse`: 反向播放
- `none`: 不执行任何动作

```js
scrollTrigger: {
  trigger: ".box",
  start: "top 80%",
  end: "bottom 20%",
  toggleActions: "play pause reverse reset" // 分别对应 onEnter, onLeave, onEnterBack, onLeaveBack
}
```

### markers

`markers` 属性可以显示 ScrollTrigger 的开始和结束位置，这在开发和调试时非常有用。

```js
scrollTrigger: {
  trigger: ".box",
  start: "top center",
  end: "bottom center",
  markers: true // 显示标记
}
```

也可以自定义标记的样式：

```js
scrollTrigger: {
  markers: {
    startColor: "green", // 开始标记颜色
    endColor: "red",     // 结束标记颜色
    fontSize: "16px",    // 字体大小
    fontWeight: "bold"   // 字体粗细
  }
}
```

## 交互式演示

下面是一个结合了上述基础配置的演示例子：

<BasicConfig />

### pin

`pin` 属性可以在滚动过程中固定某个元素。当 ScrollTrigger 被激活时，所选元素将被固定在屏幕上，直到触发结束。

```js
scrollTrigger: {
  trigger: ".box",
  start: "top center",
  end: "+=300", // 相对于开始位置再滚动300px
  pin: true // 固定触发元素
}
```

你也可以指定要固定的元素：

```js
scrollTrigger: {
  trigger: ".section",
  pin: ".box" // 固定指定的元素
}
```

### pinSpacing

`pinSpacing` 控制是否在固定元素后创建空白间隔来填充被固定元素的原始空间。

```js
scrollTrigger: {
  trigger: ".box",
  pin: true,
  pinSpacing: false // 不创建空白间隔
}
```

固定元素示例：

<PinExample />

## 高级配置选项

接下来我们将探讨一些更高级的配置选项，这些选项可以让你更精细地控制 ScrollTrigger 的行为。

### 回调函数

ScrollTrigger 提供了多种回调函数，让你可以在特定事件发生时执行自定义代码。

#### onEnter、onLeave、onEnterBack、onLeaveBack

这四个回调函数分别对应 ScrollTrigger 的四个关键事件：

```js
scrollTrigger: {
  trigger: ".box",
  start: "top center",
  end: "bottom center",
  onEnter: () => console.log("进入了"),
  onLeave: () => console.log("离开了"),
  onEnterBack: () => console.log("重新进入了"),
  onLeaveBack: () => console.log("重新离开了")
}
```

每个回调函数都会接收到一个参数，包含有关 ScrollTrigger 实例的信息：

```js
onEnter: (self) => {
  console.log("触发元素:", self.trigger);
  console.log("当前进度:", self.progress);
  console.log("方向:", self.direction > 0 ? "向下滚动" : "向上滚动");
}
```

#### onUpdate、onToggle、onRefresh、onRefreshInit

这些回调可以让你监控 ScrollTrigger 的状态变化：

```js
scrollTrigger: {
  trigger: ".box",
  start: "top center", 
  end: "bottom center",
  onUpdate: (self) => {
    // 滚动位置更新时调用
    console.log("进度:", self.progress.toFixed(3));
    updateProgressBar(self.progress);
  },
  onToggle: (self) => {
    // 激活状态切换时调用
    console.log("激活状态:", self.isActive);
    toggleActiveClass(self.isActive);
  },
  onRefresh: (self) => {
    // 当 ScrollTrigger 自动刷新尺寸和位置时调用
    console.log("刷新了大小和位置");
  },
  onRefreshInit: (self) => {
    // 刷新前调用，可以记录初始值
    console.log("准备刷新");
  }
}
```

<CallbackFunctions />

### 位置计算与速度控制

#### 相对位置表示法

除了基本的位置表示法，ScrollTrigger 还支持相对位置：

```js
scrollTrigger: {
  trigger: ".box",
  start: "top center", // 元素顶部对齐视口中心
  end: "+=300" // 从起始位置再向下滚动300px
}
```

你也可以混合使用绝对值、相对值和函数：

```js
scrollTrigger: {
  trigger: ".box",
  start: "top-=100 center", // 元素顶部向上偏移100px，与视口中心对齐
  end: () => `+=${document.querySelector('.box').offsetHeight * 2}` // 动态计算结束位置
}
```

#### snap

`snap` 属性可以让滚动在特定位置自动停止（"吸附"）：

```js
scrollTrigger: {
  trigger: ".section",
  start: "top top",
  end: "bottom bottom",
  snap: {
    snapTo: 1 / 3, // 吸附到三等分点(0, 1/3, 2/3, 1)
    duration: 0.5, // 吸附动画持续时间
    delay: 0.1, // 延迟吸附的时间
    ease: "power1.inOut" // 吸附动画的缓动函数
  }
}
```

`snap` 也可以接受直接定义的吸附点数组或函数：

```js
scrollTrigger: {
  snap: {
    snapTo: [0, 0.25, 0.5, 0.75, 1] // 吸附到这些特定进度点
  }
}
```

```js
scrollTrigger: {
  snap: {
    snapTo: (progress, self) => {
      // 自定义吸附逻辑
      return Math.round(progress * 4) / 4; // 吸附到 0, 0.25, 0.5, 0.75, 1
    }
  }
}
```

<SnapEffect />

### scroller 与滚动容器

默认情况下，ScrollTrigger 使用视口作为滚动容器。但你可以指定其他元素作为滚动容器：

```js
scrollTrigger: {
  trigger: ".box",
  start: "top center",
  end: "bottom center",
  scroller: ".scroll-container" // 自定义滚动容器
}
```

<CustomScroller />

### 水平滚动

ScrollTrigger 默认监听垂直滚动，但你也可以配置它监听水平滚动：

```js
scrollTrigger: {
  trigger: ".horizontal-box",
  start: "left center",
  end: "right center",
  horizontal: true // 监听水平滚动
}
```

这在横向滚动布局中特别有用。

### invalidateOnRefresh 与动态内容

当页面内容可能动态变化时，你可以使用 `invalidateOnRefresh` 属性让 ScrollTrigger 在页面大小变化时重新计算位置：

```js
scrollTrigger: {
  trigger: ".dynamic-content",
  start: "top center",
  end: "bottom center",
  invalidateOnRefresh: true // 在刷新/调整大小时重新计算
}
```

结合函数来动态计算开始和结束位置：

```js
scrollTrigger: {
  trigger: ".dynamic-content",
  start: () => "top center",
  end: () => `+=${document.querySelector('.dynamic-content').offsetHeight}`,
  invalidateOnRefresh: true
}
```

### fastScrollEnd

用于控制快速滚动结束时的行为：

```js
scrollTrigger: {
  trigger: ".box",
  start: "top center",
  end: "bottom center",
  fastScrollEnd: true // 在快速滚动时立即触发onLeave回调
}
```

### anticipatePin

在固定元素之前提前准备，可以使固定过程更加平滑：

```js
scrollTrigger: {
  trigger: ".section",
  start: "top top",
  end: "+=500",
  pin: true,
  anticipatePin: 1 // 提前1秒准备固定
}
```

### id 与 containerAnimation

给 ScrollTrigger 实例设置一个标识符，便于后续引用：

```js
scrollTrigger: {
  trigger: ".box",
  id: "my-trigger", // 给这个ScrollTrigger实例设置ID
  start: "top center",
  end: "bottom center"
}

// 稍后可以通过ID引用
ScrollTrigger.getById("my-trigger").kill(); // 销毁该实例
```

与其他动画同步：

```js
const tl = gsap.timeline();
tl.to(".container", { x: 100 });

gsap.to(".box", {
  y: 100,
  scrollTrigger: {
    trigger: ".section",
    containerAnimation: tl // 与上面的时间轴同步
  }
});
```

## 实用技巧与常见问题

### 技巧1：使用 toggleClass 添加类名控制

结合 `toggleClass` 可以轻松实现基于滚动位置切换元素的类名：

```js
ScrollTrigger.create({
  trigger: ".section",
  start: "top center",
  end: "bottom center",
  toggleClass: {
    targets: ".section", // 可以是元素或选择器
    className: "active" // 类名
  }
});
```

也可以为不同元素添加不同类名：

```js
ScrollTrigger.create({
  trigger: ".section",
  start: "top center",
  end: "bottom center",
  toggleClass: [
    { targets: ".section", className: "active" },
    { targets: "body", className: "section-in-view" }
  ]
});
```

### 技巧2：使用 createScrollTrigger 批量创建实例

当需要为多个元素设置类似的 ScrollTrigger 时，可以创建一个工具函数：

```js
function createScrollTrigger(items, config) {
  items.forEach(item => {
    gsap.to(item.target, {
      ...item.vars,
      scrollTrigger: {
        trigger: item.trigger || item.target,
        start: "top bottom",
        end: "bottom top",
        ...config
      }
    });
  });
}

// 使用方式
createScrollTrigger([
  { target: ".box1", vars: { x: 100 } },
  { target: ".box2", vars: { y: 100 } },
  { target: ".box3", vars: { rotation: 180 } }
], {
  scrub: true,
  markers: true
});
```

### 技巧3：动态创建固定区域（Pin Spacer）

当使用 `pin` 后，ScrollTrigger 会自动创建一个"pin-spacer"元素来保持正确的文档流。了解这一点有助于调试问题：

```js
ScrollTrigger.create({
  trigger: ".section",
  pin: true,
  // ScrollTrigger 会自动创建一个与被固定元素大小相同的间隔元素
});
```

如果遇到布局问题，检查生成的 pin-spacer 元素的样式和行为。

### 常见问题1：滚动位置抖动或跳跃

**问题**：当使用 `pin: true` 时，页面滚动会出现抖动或跳跃。

**解决方案**：
- 确保没有其他代码或插件也在尝试操作滚动位置
- 尝试设置 `pinReparent: true`，让固定元素重新附加到 body：

```js
ScrollTrigger.create({
  trigger: ".section",
  pin: true,
  pinReparent: true // 将固定元素移动到文档的根级别
});
```

### 常见问题2：固定元素的宽度问题

**问题**：使用 `pin: true` 后，被固定的元素宽度发生变化。

**解决方案**：这通常是因为元素从其父容器中脱离，尝试以下方法：

```js
ScrollTrigger.create({
  trigger: ".section",
  pin: true,
  pinSpacing: true,
  onEnter: self => {
    // 确保固定元素宽度与原始宽度相同
    const width = self.trigger.getBoundingClientRect().width;
    self.pin.style.width = `${width}px`;
  }
});
```

### 常见问题3：移动设备的性能问题

**问题**：在移动设备上，ScrollTrigger 动画性能不佳。

**解决方案**：
- 减少同时运行的 ScrollTrigger 实例数量
- 对移动设备使用简化版本的动画：

```js
const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

ScrollTrigger.create({
  trigger: ".section",
  start: "top center",
  end: "bottom center",
  scrub: isMobile ? false : true, // 在移动设备上禁用 scrub
  animation: gsap.to(".element", {
    x: isMobile ? 50 : 200, // 在移动设备上使用较小的位移
    duration: 1
  })
});
```

## 高级案例演示

### 案例1：滚动驱动的视差效果

创建多层视差滚动效果，每层以不同速度移动，产生深度感：

<ParallaxEffect />

### 案例2：滚动驱动的连续动画序列

创建连贯的动画序列，随着用户滚动逐步展示：

<AnimationSequence />

### 案例3：滚动触发的交互式组件

创建随着滚动变化的交互式图表：

<InteractiveChart />

## 性能优化建议

使用 ScrollTrigger 时，应注意以下性能优化建议：

1. **减少实例数量**：合并相似的 ScrollTrigger 实例，尤其是在页面中有大量动画时
2. **避免频繁更新**：在 `onUpdate` 回调中避免执行耗费资源的操作
3. **使用 `invalidateOnRefresh`**：仅在必要时启用，因为它会增加计算量
4. **延迟初始化**：考虑在页面完全加载后再初始化 ScrollTrigger
5. **条件性创建**：
   ```js
   // 只在非移动设备上创建复杂效果
   if (window.innerWidth > 768) {
     // 创建复杂的 ScrollTrigger 效果
   } else {
     // 创建简化版本或完全跳过
   }
   ```
6. **使用 `matchMedia`**：根据媒体查询条件有选择地应用效果
   ```js
   ScrollTrigger.matchMedia({
     "(min-width: 768px)": function() {
       // 桌面版动画
       createDesktopAnimations();
     },
     "(max-width: 767px)": function() {
       // 移动版动画
       createMobileAnimations();
     }
   });
   ```
7. **监控内存使用**：及时销毁不再需要的实例
   ```js
   const trigger = ScrollTrigger.create({...});
   
   // 当不再需要时
   trigger.kill();
   ```

## 结语与参考资源

以上就是 ScrollTrigger 插件的主要配置选项和使用技巧。掌握这些选项将使你能够创建各种复杂的、随滚动触发的动画效果。

对于更深入的学习，可以参考以下资源：

- GSAP ScrollTrigger 官方文档
- GSAP 论坛的相关讨论
- 官方示例和案例研究

记住，良好的滚动动画应该提升用户体验，而不是干扰它。使用 ScrollTrigger 时，要确保动画流畅、直观且对页面加载性能影响最小。
