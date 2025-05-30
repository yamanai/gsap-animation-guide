<template>
  <GsapEditor 
    title="缓动函数家族对比"
    :initialHtml="htmlCode"
    :initialCss="cssCode"
    :initialJs="jsCode"
  />
</template>

<script setup>
const htmlCode = `<div class='container'>
  <div class='easing-family'>
    <h3>Power 家族 (缓入缓出)</h3>
    <div class='easing-row'>
      <div class='label'>power1.inOut</div>
      <div class='box power1'></div>
    </div>
    <div class='easing-row'>
      <div class='label'>power2.inOut</div>
      <div class='box power2'></div>
    </div>
    <div class='easing-row'>
      <div class='label'>power3.inOut</div>
      <div class='box power3'></div>
    </div>
    <div class='easing-row'>
      <div class='label'>power4.inOut</div>
      <div class='box power4'></div>
    </div>
  </div>
  
  <div class='easing-family'>
    <h3>Elastic 家族 (弹性)</h3>
    <div class='easing-row'>
      <div class='label'>elastic.out(0.5)</div>
      <div class='box elastic1'></div>
    </div>
    <div class='easing-row'>
      <div class='label'>elastic.out(1)</div>
      <div class='box elastic2'></div>
    </div>
    <div class='easing-row'>
      <div class='label'>elastic.out(2)</div>
      <div class='box elastic3'></div>
    </div>
  </div>
  
  <div class='easing-family'>
    <h3>Back 家族 (回弹)</h3>
    <div class='easing-row'>
      <div class='label'>back.out(1)</div>
      <div class='box back1'></div>
    </div>
    <div class='easing-row'>
      <div class='label'>back.out(2)</div>
      <div class='box back2'></div>
    </div>
    <div class='easing-row'>
      <div class='label'>back.out(3)</div>
      <div class='box back3'></div>
    </div>
  </div>
  
  <div class='easing-family'>
    <h3>其他缓动函数</h3>
    <div class='easing-row'>
      <div class='label'>bounce.out</div>
      <div class='box bounce'></div>
    </div>
    <div class='easing-row'>
      <div class='label'>circ.out</div>
      <div class='box circ'></div>
    </div>
    <div class='easing-row'>
      <div class='label'>expo.out</div>
      <div class='box expo'></div>
    </div>
    <div class='easing-row'>
      <div class='label'>sine.out</div>
      <div class='box sine'></div>
    </div>
  </div>
  
  <div class='controls'>
    <button id='play-btn'>播放所有动画</button>
    <button id='reset-btn'>重置</button>
  </div>
</div>`;

const cssCode = `.container {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}
.easing-family {
  margin-bottom: 30px;
}
h3 {
  font-size: 16px;
  margin: 0 0 10px 0;
  padding-bottom: 5px;
  border-bottom: 1px solid #eee;
}
.easing-row {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  height: 30px;
}
.label {
  width: 150px;
  font-size: 13px;
}
.box {
  width: 40px;
  height: 25px;
  background-color: #3498db;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
.controls {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}
button {
  padding: 8px 15px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #e0e0e0;
}`;

const jsCode = `// 创建动画
let animation;
function createAnimation() {
  // 重置所有方块位置
  gsap.set('.box', { x: 0, clearProps: "backgroundColor" });
  
  // 创建主时间轴
  animation = gsap.timeline();
  
  // Power 家族
  animation.to('.power1', { x: 250, duration: 2, ease: "power1.inOut", backgroundColor: '#2ecc71' }, 0)
         .to('.power2', { x: 250, duration: 2, ease: "power2.inOut", backgroundColor: '#2ecc71' }, 0)
         .to('.power3', { x: 250, duration: 2, ease: "power3.inOut", backgroundColor: '#2ecc71' }, 0)
         .to('.power4', { x: 250, duration: 2, ease: "power4.inOut", backgroundColor: '#2ecc71' }, 0)
         
         // Elastic 家族
         .to('.elastic1', { x: 250, duration: 2, ease: "elastic.out(0.5)", backgroundColor: '#e74c3c' }, 0)
         .to('.elastic2', { x: 250, duration: 2, ease: "elastic.out(1)", backgroundColor: '#e74c3c' }, 0)
         .to('.elastic3', { x: 250, duration: 2, ease: "elastic.out(2)", backgroundColor: '#e74c3c' }, 0)
         
         // Back 家族
         .to('.back1', { x: 250, duration: 2, ease: "back.out(1)", backgroundColor: '#f39c12' }, 0)
         .to('.back2', { x: 250, duration: 2, ease: "back.out(2)", backgroundColor: '#f39c12' }, 0)
         .to('.back3', { x: 250, duration: 2, ease: "back.out(3)", backgroundColor: '#f39c12' }, 0)
         
         // 其他缓动函数
         .to('.bounce', { x: 250, duration: 2, ease: "bounce.out", backgroundColor: '#9b59b6' }, 0)
         .to('.circ', { x: 250, duration: 2, ease: "circ.out", backgroundColor: '#9b59b6' }, 0)
         .to('.expo', { x: 250, duration: 2, ease: "expo.out", backgroundColor: '#9b59b6' }, 0)
         .to('.sine', { x: 250, duration: 2, ease: "sine.out", backgroundColor: '#9b59b6' }, 0);
  
  return animation;
}
// 初始化动画
createAnimation();
// 添加控制按钮事件
document.getElementById('play-btn').onclick = () => createAnimation().play(0);
document.getElementById('reset-btn').onclick = () => {
  if (animation) animation.kill();
  gsap.set('.box', { x: 0, clearProps: "backgroundColor" });
};`;
</script> 