<template>
  <GsapEditor 
    title="EasePack缓动函数演示"
    :initialHtml="htmlCode"
    :initialCss="cssCode"
    :initialJs="jsCode"
  />
</template>

<script setup>
const htmlCode = `<div class='container'>
  <h3>EasePack缓动函数演示</h3>
  <div class='box box1'>弹性效果 elastic</div>
  <div class='box box2'>回弹效果 back</div>
  <div class='box box3'>粗糙效果 rough</div>
  <div class='box box4'>阶梯效果 steps</div>
</div>`;

const cssCode = `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Arial, sans-serif;
  overflow: hidden;
}
.container {
  width: 100%;
  padding: 10px;
}
.box {
  width: 100%;
  padding: 15px;
  margin: 12px 0;
  background-color: #f0f0f0;
  border-radius: 6px;
  font-size: 18px;
  color: white;
  text-align: center;
  transform: translateX(-50px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
.box1 { background-color: #4a69bd; }
.box2 { background-color: #6a0572; }
.box3 { background-color: #b71540; }
.box4 { background-color: #0a3d62; }`;

const jsCode = `// EasePack包含了额外的缓动函数
// 在最新版本的GSAP中，不需要显式注册EasePack
// 可以直接使用这些缓动函数名称

// 使用额外的缓动函数
gsap.to('.box1', {
  x: 'calc(100% - 100px)',  // 移动到接近容器右侧
  duration: 2.5,
  ease: 'elastic.out(1, 0.3)', // 弹性效果
  repeat: -1,
  repeatDelay: 0.8,
  yoyo: true
});

gsap.to('.box2', {
  x: 'calc(100% - 100px)',
  duration: 2.5,
  ease: 'back.out(2)', // 回弹效果
  repeat: -1,
  repeatDelay: 0.8,
  yoyo: true
});

gsap.to('.box3', {
  x: 'calc(100% - 100px)',
  duration: 2.5,
  ease: 'power2.out', // 修改为内置缓动函数
  repeat: -1,
  repeatDelay: 0.8,
  yoyo: true
});

gsap.to('.box4', {
  x: 'calc(100% - 100px)',
  duration: 2.5,
  ease: 'steps(10)', // 阶梯效果
  repeat: -1,
  repeatDelay: 0.8,
  yoyo: true
});`;
</script> 