<template>
  <GsapEditor 
    title="回调函数的作用域"
    :initialHtml="htmlCode"
    :initialCss="cssCode"
    :initialJs="jsCode"
  />
</template>

<script setup>
const htmlCode = `<div class='container'>
  <div class='animation-area'>
    <div class='box'></div>
  </div>
  <div class='log-area'>
    <div class='log-header'>作用域演示:</div>
    <div id='log-output' class='log-output'></div>
  </div>
  <div class='controls'>
    <button id='demo1-btn'>默认作用域</button>
    <button id='demo2-btn'>自定义作用域</button>
    <button id='reset-btn'>重置</button>
  </div>
</div>`;

const cssCode = `.container {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}
.animation-area {
  height: 150px;
  position: relative;
  background-color: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 15px;
}
.box {
  width: 80px;
  height: 80px;
  background-color: #3498db;
  border-radius: 6px;
  position: absolute;
  top: 35px;
  left: 20px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.2);
}
.log-area {
  background-color: #f0f0f0;
  border-radius: 6px;
  padding: 10px;
  height: 150px;
  margin-bottom: 15px;
  overflow-y: auto;
}
.log-header {
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
}
.log-output {
  font-family: monospace;
  font-size: 13px;
  line-height: 1.5;
}
.log-entry {
  padding: 3px 0;
  border-bottom: 1px solid #e0e0e0;
}
.controls {
  display: flex;
  gap: 10px;
}
button {
  padding: 8px 15px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}
button:hover {
  background-color: #e0e0e0;
}`;

const jsCode = `// 获取日志输出区域
const logOutput = document.getElementById('log-output');

// 添加日志函数
function addLog(message) {
  const entry = document.createElement('div');
  entry.className = 'log-entry';
  entry.textContent = message;
  logOutput.appendChild(entry);
  logOutput.scrollTop = logOutput.scrollHeight;
}

// 清空日志
function clearLog() {
  logOutput.innerHTML = '';
}

// 重置动画
function resetAnimation() {
  gsap.killTweensOf('.box');
  gsap.set('.box', { 
    x: 0,
    y: 0,
    scale: 1,
    rotation: 0,
    backgroundColor: '#3498db'
  });
  clearLog();
}

// 自定义对象，用作回调的作用域
const myCustomContext = {
  name: "自定义对象",
  message: "我是通过callbackScope设置的自定义作用域",
  showInfo: function() {
    addLog(\`来自[\${this.name}]的消息: \${this.message}\`);
  },
  animateElement: function(element) {
    // 在自定义作用域中可以进行额外操作
    gsap.to(element, {
      backgroundColor: '#e74c3c',
      scale: 1.2,
      duration: 0.5
    });
  }
};

// 默认作用域演示
document.getElementById('demo1-btn').onclick = function() {
  resetAnimation();
  addLog("📌 默认作用域演示 - this指向动画实例");
  
  gsap.to('.box', {
    x: 380,
    rotation: 360,
    duration: 2,
    ease: 'power2.inOut',
    onStart: function() {
      // 在默认情况下，回调中的this指向动画实例(tween)
      addLog("onStart中的this是: " + (this.isActive ? "动画实例" : "未知对象"));
      
      // 可以通过this获取动画的属性和方法
      addLog(\`动画持续时间: \${this.duration()}秒\`);
      addLog(\`动画目标: \${this.targets()[0].className}\`);
    },
    onComplete: function() {
      addLog("✅ 动画完成");
      
      // 可以通过this调用动画实例的方法
      addLog(\`可以通过this.progress()获取进度: \${this.progress()}\`);
    }
  });
};

// 自定义作用域演示
document.getElementById('demo2-btn').onclick = function() {
  resetAnimation();
  addLog("📌 自定义作用域演示 - this指向自定义对象");
  
  gsap.to('.box', {
    y: 50,
    rotation: 360,
    duration: 2,
    ease: 'power2.inOut',
    
    // 设置回调的作用域对象
    callbackScope: myCustomContext,
    
    onStart: function() {
      // 现在this指向myCustomContext
      addLog("onStart中的this是: " + (this.name ? this.name : "未知对象"));
      
      // 调用自定义对象的方法
      this.showInfo();
    },
    onComplete: function() {
      addLog("✅ 动画完成");
      
      // 在自定义作用域中调用方法操作元素
      this.animateElement(document.querySelector('.box'));
      
      addLog("注意：在自定义作用域中无法直接访问动画实例属性");
    }
  });
};

// 重置按钮
document.getElementById('reset-btn').onclick = resetAnimation;`;
</script> 