# 时间轴基础

时间轴（Timeline）是 GSAP 最强大的功能之一，它让你能够轻松编排和控制复杂的动画序列。本章将介绍时间轴的基本概念和使用方法，帮助你迈出创建精彩动画序列的第一步。

## 什么是时间轴？

想象一下电影时间轴，它按时间顺序排列各个场景。GSAP 的时间轴类似，允许你将多个动画按特定顺序和时间安排组织在一起，形成连贯的动画序列。

<div class="concept-card">
  <div class="concept-icon">⏱️</div>
  <div class="concept-content">
    <h3>时间轴的优势</h3>
    <ul>
      <li>轻松控制动画序列的<strong>播放顺序</strong></li>
      <li>精确指定动画之间的<strong>时间关系</strong>（依次播放、重叠或间隔）</li>
      <li>将多个相关动画作为<strong>整体控制</strong>（播放、暂停、反转等）</li>
      <li>避免复杂动画中的<strong>回调地狱</strong></li>
    </ul>
  </div>
</div>

## 创建基本时间轴

使用 `gsap.timeline()` 方法创建时间轴：

```javascript
// 创建一个基本的时间轴
const tl = gsap.timeline();

// 向时间轴添加动画
tl.to(".box1", { x: 100, duration: 1 })
  .to(".box2", { y: 50, duration: 0.5 })
  .to(".box3", { rotation: 360, duration: 0.8 });
```

上面的代码会依次执行三个动画：先移动 `.box1`，再移动 `.box2`，最后旋转 `.box3`。

## 时间轴动画示例

下面是一个简单的时间轴动画示例：

<div class="demo-container">
  <div class="timeline-demo">
    <div class="timeline-box box1" id="tlBox1"></div>
    <div class="timeline-box box2" id="tlBox2"></div>
    <div class="timeline-box box3" id="tlBox3"></div>
  </div>
  <div class="timeline-controls">
    <button id="playTimeline">播放</button>
    <button id="pauseTimeline">暂停</button>
    <button id="reverseTimeline">反向</button>
    <button id="resetTimeline">重置</button>
  </div>
</div>

## 控制动画的顺序和时间

时间轴最强大的功能是控制动画之间的时间关系。你可以在添加动画时指定一个位置参数，决定新动画何时开始：

```javascript
const tl = gsap.timeline();

// 顺序播放（默认）
tl.to(".box1", { x: 100, duration: 1 })
  
  // 与前一个动画同时开始
  .to(".box2", { y: 50, duration: 2 }, "<") 
  
  // 在前一个动画开始后 0.5 秒开始
  .to(".box3", { rotation: 360, duration: 1 }, "<0.5") 
  
  // 在时间轴的特定绝对位置开始（从开始算起的秒数）
  .to(".box4", { scale: 1.5, duration: 1 }, 2)
  
  // 在前一个动画结束前 0.5 秒开始
  .to(".box5", { opacity: 0, duration: 0.5 }, ">-0.5");
```

### 常用位置参数

| 位置参数 | 描述 |
|---------|------|
| `"+=0.5"` | 在前一个动画结束后延迟 0.5 秒开始 |
| `"-=0.5"` | 在前一个动画结束前 0.5 秒开始（重叠） |
| `"<"` | 与前一个动画同时开始 |
| `"<0.5"` | 在前一个动画开始后 0.5 秒开始 |
| `">"` | 在前一个动画结束时开始（默认） |
| `">0.5"` | 在前一个动画结束后 0.5 秒开始 |
| `3` | 在时间轴的第 3 秒开始（绝对位置） |
| `"myLabel"` | 在名为 "myLabel" 的标签位置开始 |
| `"myLabel+=0.5"` | 在 "myLabel" 标签后 0.5 秒开始 |

## 时间轴的配置选项

创建时间轴时，你可以设置多种配置选项：

```javascript
const tl = gsap.timeline({
  defaults: { duration: 1, ease: "power2.out" }, // 所有动画的默认值
  repeat: 2,          // 整个时间轴重复 2 次（总共播放 3 次）
  repeatDelay: 0.5,   // 每次重复之间延迟 0.5 秒
  yoyo: true,         // 反向播放动画（需与 repeat 配合使用）
  paused: true,       // 创建后不自动播放
  onComplete: () => console.log("动画完成！") // 完成时回调
});
```

## 标签和时间控制

你可以在时间轴上添加标签，便于在复杂动画中导航：

```javascript
const tl = gsap.timeline();

tl.to(".box1", { x: 100, duration: 1 })
  .addLabel("middle", "+=0.5") // 添加一个名为 "middle" 的标签
  .to(".box2", { y: 50, duration: 1 })
  .to(".box3", { rotation: 360, duration: 1 }, "middle"); // 在 "middle" 标签处开始
```

## 嵌套时间轴

你可以将一个时间轴嵌套在另一个时间轴中，创建模块化的复杂动画：

```javascript
// 创建主时间轴
const mainTl = gsap.timeline();

// 创建子时间轴
const childTl = gsap.timeline();
childTl.to(".child1", { x: 100, duration: 1 })
       .to(".child2", { y: 50, duration: 0.5 });

// 将子时间轴添加到主时间轴
mainTl.to(".main1", { opacity: 1, duration: 0.5 })
      .add(childTl) // 添加整个子时间轴
      .to(".main2", { scale: 1.5, duration: 0.5 });
```

## 时间轴控制方法

时间轴提供了丰富的控制方法：

```javascript
const tl = gsap.timeline({ paused: true });

// 添加一些动画...
tl.to(".element", { x: 100, duration: 1 })
  .to(".element", { y: 100, duration: 1 });

// 控制方法
tl.play();       // 播放
tl.pause();      // 暂停
tl.resume();     // 从暂停处继续
tl.reverse();    // 反向播放
tl.restart();    // 重新开始
tl.timeScale(2); // 2倍速播放
tl.seek(1.5);    // 跳到 1.5 秒位置
tl.progress(0.5); // 跳到 50% 进度处
```

## 实例：创建一个序列动画

让我们创建一个完整的序列动画，展示时间轴的威力：

<GsapEditor 
  title="时间轴序列动画"
  :initialJs="`// 创建一个时间轴
const tl = gsap.timeline({
  defaults: { duration: 0.7, ease: 'power2.out' }
});

// 添加一系列动画到时间轴
tl.from('.animation-target', { 
    opacity: 0, 
    y: 30,
    scale: 0.8
  })
  .to('.animation-target', { 
    backgroundColor: '#ff6b6b',
    borderRadius: '50%'
  })
  .to('.animation-target', { 
    x: 120,
    rotation: 360,
    ease: 'elastic.out(1, 0.3)'
  })
  .to('.animation-target', { 
    x: 0,
    backgroundColor: '#4a7aff'
  }, '+=0.2')
  .to('.animation-target', { 
    scale: 1.3,
    borderRadius: '8px'
  }, '-=0.3')
  .to('.animation-target', { 
    scale: 1,
    opacity: 0.7
  });

// 添加控制按钮
document.querySelectorAll('.gsap-editor-button').forEach(button => {
  button.addEventListener('click', function() {
    const action = this.getAttribute('data-action');
    if (action === 'play') tl.play();
    if (action === 'pause') tl.pause();
    if (action === 'reverse') tl.reverse();
    if (action === 'restart') tl.restart();
  });
});`"
/>

## 练习：创建你的第一个时间轴

尝试修改下面的代码，创建你自己的时间轴动画序列：

<GsapEditor 
  title="时间轴练习"
  :initialJs="`// 创建一个时间轴
const tl = gsap.timeline();

// 添加动画到时间轴
// 提示：尝试使用不同的位置参数控制动画顺序
tl.to('.animation-target', {
  // 第一个动画
});
// 添加更多动画...`"
/>

## 下一步

恭喜！你已经掌握了 GSAP 时间轴的基本知识。时间轴是 GSAP 最强大的功能之一，随着你对它的深入了解，你将能够创建越来越复杂和精彩的动画序列。

现在你已经熟悉了 GSAP 的基础，是时候将所学知识应用到[实际案例](./practical-examples.html)中了！

<style>
.concept-card {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 20px;
  margin: 25px 0;
  display: flex;
  align-items: flex-start;
}

.concept-icon {
  font-size: 2.5rem;
  margin-right: 20px;
  color: var(--vp-c-brand);
}

.concept-content {
  flex: 1;
}

.concept-content h3 {
  margin-top: 0;
  margin-bottom: 12px;
}

.concept-content ul {
  margin: 0;
  padding-left: 20px;
}

.demo-container {
  margin: 30px 0;
}

.timeline-demo {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 20px;
  height: 220px;
  position: relative;
  margin-bottom: 15px;
}

.timeline-box {
  width: 60px;
  height: 60px;
  position: absolute;
  border-radius: 8px;
}

.box1 {
  background-color: #ff6b6b;
  top: 40px;
  left: 40px;
}

.box2 {
  background-color: #4a7aff;
  top: 120px;
  left: 40px;
}

.box3 {
  background-color: #42b883;
  top: 40px;
  left: 140px;
}

.timeline-controls {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.timeline-controls button {
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;
}

.timeline-controls button:hover {
  background: var(--vp-c-brand-dark);
}
</style>

<script>
import { onMounted } from 'vue'

export default {
  setup() {
    onMounted(() => {
      if (typeof gsap !== 'undefined') {
        // 获取元素引用
        const tlBox1 = document.getElementById('tlBox1')
        const tlBox2 = document.getElementById('tlBox2')
        const tlBox3 = document.getElementById('tlBox3')
        const playBtn = document.getElementById('playTimeline')
        const pauseBtn = document.getElementById('pauseTimeline')
        const reverseBtn = document.getElementById('reverseTimeline')
        const resetBtn = document.getElementById('resetTimeline')
        
        if (tlBox1 && tlBox2 && tlBox3 && playBtn && pauseBtn && reverseBtn && resetBtn) {
          // 重置所有盒子
          const resetBoxes = () => {
            gsap.set([tlBox1, tlBox2, tlBox3], { clearProps: "all" })
          }
          
          // 初始重置
          resetBoxes()
          
          // 创建时间轴
          const tl = gsap.timeline({ paused: true });
          
          // 添加动画到时间轴
          tl.to(tlBox1, { x: 200, duration: 1, ease: "power1.out" })
            .to(tlBox2, { x: 150, y: -50, duration: 0.8 }, "+=0.2")
            .to(tlBox3, { x: 60, rotation: 360, duration: 1 }, "-=0.5");
          
          // 添加控制按钮事件
          playBtn.addEventListener('click', () => tl.play());
          pauseBtn.addEventListener('click', () => tl.pause());
          reverseBtn.addEventListener('click', () => tl.reverse());
          resetBtn.addEventListener('click', () => {
            tl.pause(0);
            resetBoxes();
          });
        }
      }
    })
  }
}
</script> 