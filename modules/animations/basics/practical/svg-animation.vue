<!--
注意：本示例使用了GSAP的付费插件MorphSVG，在商业项目中使用需要购买Club GreenSock会员资格
本项目为非商业性质的教学项目，可以使用GSAP的所有付费插件进行演示
-->
<template>
  <GsapEditor 
    title="SVG动画效果"
    :initialHtml="htmlTemplate"
    :initialCss="cssStyles"
    :initialJs="jsScript"
  />
</template>

<script setup>
// HTML模板
const htmlTemplate = `<div class="svg-animation-container">
  <div class="section">
    <h2 class="section-title">描边动画</h2>
    <div class="svg-wrapper">
      <svg viewBox="0 0 240 120" width="240" height="120" class="svg-stroke">
        <path d="M10,60 C30,10 90,10 110,60 C130,110 190,110 210,60" fill="none" stroke="#3498db" stroke-width="4"/>
      </svg>
      <button class="replay-btn stroke-replay">重播动画</button>
    </div>
  </div>

  <div class="section morph-section">
    <h2 class="section-title">高级形状变换</h2>
    <div class="svg-wrapper">
      <svg viewBox="0 0 300 200" width="300" height="200" class="svg-morph">
        <!-- 背景网格 -->
        <defs>
          <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#f0f0f0" stroke-width="0.5"/>
          </pattern>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <rect width="50" height="50" fill="url(#smallGrid)"/>
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#e0e0e0" stroke-width="1"/>
          </pattern>
        </defs>
        
        <!-- 背景 -->
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        <!-- 变形图形 -->
        <g class="morph-group" transform="translate(150, 100)">
          <path class="morph-path" d="M-50,-50 L50,-50 L50,50 L-50,50 Z" fill="#e74c3c" stroke="#333" stroke-width="2"/>
        </g>
        
        <!-- 中心点标记 -->
        <circle class="center-point" cx="150" cy="100" r="3" fill="#333"/>
      </svg>
      
      <div class="morph-controls">
        <div class="shape-buttons">
          <button class="shape-btn" data-shape="square">正方形</button>
          <button class="shape-btn" data-shape="circle">圆形</button>
          <button class="shape-btn" data-shape="star">星形</button>
          <button class="shape-btn" data-shape="logo">GSAP标志</button>
        </div>
        <div class="effect-controls">
          <label>
            <input type="checkbox" class="rotate-toggle" checked>
            旋转
          </label>
          <label>
            <input type="checkbox" class="pulse-toggle">
            脉动
          </label>
          <button class="random-btn">随机形状</button>
        </div>
      </div>
    </div>
  </div>

  <div class="section">
    <h2 class="section-title">播放控制按钮</h2>
    <div class="svg-wrapper svg-icons">
      <svg viewBox="0 0 60 60" width="60" height="60" class="svg-icon media-icon">
        <!-- 播放按钮 - 默认状态 -->
        <circle cx="30" cy="30" r="28" fill="none" stroke="#2c3e50" stroke-width="2"/>
        <polygon class="play-icon" points="23,20 23,40 43,30" fill="#2c3e50"/>
        
        <!-- 暂停按钮 - 初始隐藏 -->
        <g class="pause-icon" opacity="0">
          <rect x="20" y="20" width="8" height="20" fill="#2c3e50"/>
          <rect x="32" y="20" width="8" height="20" fill="#2c3e50"/>
        </g>
      </svg>
      <button class="replay-btn icon-replay">切换状态</button>
    </div>
  </div>
</div>`;

// CSS样式
const cssStyles = `.svg-animation-container {
  max-width: 100%;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  color: #333;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.section {
  margin-bottom: 30px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
}

.section-title {
  margin: 0 0 15px;
  font-size: 18px;
  color: #2c3e50;
  border-bottom: 2px solid #3498db;
  padding-bottom: 8px;
}

.svg-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.svg-icons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 30px;
  align-items: center;
}

.svg-stroke path {
  stroke-dasharray: 300;
  stroke-dashoffset: 300;
}

.replay-btn, .shape-btn, .random-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  margin: 5px;
  cursor: pointer;
  font-size: 13px;
  transition: background-color 0.2s;
}

.replay-btn:hover, .shape-btn:hover, .random-btn:hover {
  background-color: #2980b9;
}

.shape-btn.active {
  background-color: #16a085;
}

.morph-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
  width: 100%;
}

.shape-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 10px;
}

.effect-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-top: 5px;
  flex-wrap: wrap;
}

.effect-controls label {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  font-size: 14px;
}

.effect-controls input[type="checkbox"] {
  margin-right: 5px;
}

.morph-section {
  overflow: hidden;
}

.center-point {
  opacity: 0.5;
}
`;

// JavaScript代码
const jsScript = `// 注册 MorphSVG 插件（如果是付费插件，确保在项目中已正确授权）
if (window.gsap) {
  // 检查是否已经有 MorphSVG 插件
  if (window.MorphSVGPlugin && gsap.registerPlugin) {
    try {
      gsap.registerPlugin(MorphSVGPlugin);
      console.log("MorphSVG 插件已注册");
    } catch (e) {
      console.error("注册 MorphSVG 插件时出错:", e);
    }
  } else if (!window.MorphSVGPlugin) {
    console.warn("MorphSVGPlugin 未找到，形状变换动画将使用普通变换替代");
    
    // 如果 MorphSVGPlugin 不可用，创建一个简单的 fallback
    gsap.registerPlugin({
      name: "morphSVG",
      init: function(target, value) {
        let endShape = value.shape || value;
        if (typeof endShape === "string") {
          this._target = target;
          this._endPath = endShape;
          // 只存储初始值和目标值
          return true;
        }
        return false;
      },
      render: function(ratio, data) {
        // 简单过渡，实际上不做形状变形
        // 仅用于防止代码出错
      }
    });
  }
}

// 初始化SVG动画
function initSvgAnimations() {
  // 1. 描边动画
  const strokeAnimation = gsap.timeline()
    .to('.svg-stroke path', {
      strokeDashoffset: 0,
      duration: 2,
      ease: 'power1.inOut'
    });
  
  // 2. 高级形状变换动画
  // 定义复杂的SVG路径形状
  const shapes = {
    square: "M-50,-50 L50,-50 L50,50 L-50,50 Z",
    circle: "M0,-50 C27.6,-50 50,-27.6 50,0 C50,27.6 27.6,50 0,50 C-27.6,50 -50,27.6 -50,0 C-50,-27.6 -27.6,-50 0,-50 Z",
    star: "M0,-50 L10,-20 L45,-15 L20,10 L25,45 L0,25 L-25,45 L-20,10 L-45,-15 L-10,-20 Z",
    logo: "M-30,0 C-30,-30 30,-30 30,0 C30,30 -30,30 -30,0 Z M-15,-15 L-15,15 L15,0 Z",
    wave: "M-50,0 C-30,-25 -10,25 10,0 C30,-25 50,25 70,0",
    heart: "M0,-15 C30,-50 70,0 0,35 C-70,0 -30,-50 0,-15 Z",
    triangle: "M0,-45 L40,40 L-40,40 Z",
    cross: "M-40,0 L40,0 M0,-40 L0,40",
    spiral: "M0,0 C5,-5 10,-10 0,-30 C-20,-40 -40,0 0,20 C30,30 40,-10 10,-20 C-5,-25 -10,0 0,0"
  };
  
  // 颜色对应表
  const shapeColors = {
    square: "#3498db",
    circle: "#e74c3c",
    star: "#f39c12", 
    logo: "#9b59b6",
    wave: "#1abc9c",
    heart: "#e84393",
    triangle: "#2ecc71",
    cross: "#34495e",
    spiral: "#fd79a8"
  };
  
  // 形状缩放配置
  const shapeScales = {
    square: 1,
    circle: 1,
    star: 1.1, 
    logo: 1.2,
    wave: 1.5,
    heart: 1.4,
    triangle: 1.1,
    cross: 1.2,
    spiral: 1.3
  };
  
  // 获取元素
  const morphPath = document.querySelector('.morph-path');
  
  // 创建形状变换时间轴
  let morphTimeline = gsap.timeline({paused: true});
  
  // 创建额外的动画时间轴
  let rotationTimeline = gsap.timeline({paused: true, repeat: -1});
  let pulseTimeline = gsap.timeline({paused: true, repeat: -1});
  
  // 初始化旋转动画
  rotationTimeline.to('.morph-group', {
    rotation: 360,
    duration: 8,
    ease: 'none',
    transformOrigin: "center center",
    repeat: -1
  });
  
  // 初始化脉动动画
  pulseTimeline.to('.morph-path', {
    scale: 1.1, 
    duration: 0.5,
    ease: 'power1.inOut',
    yoyo: true,
    repeat: -1
  });
  
  // 启动旋转动画（默认开启）
  rotationTimeline.play();
  
  // 设置当前形状
  let currentShape = 'square';
  
  // 生成随机形状
  function getRandomShape() {
    const shapes = ['square', 'circle', 'star', 'logo', 'wave', 'heart', 'triangle', 'cross', 'spiral'];
    const randomIndex = Math.floor(Math.random() * shapes.length);
    return shapes[randomIndex];
  }
  
  // 形状变换处理函数
  function morphToShape(shapeName) {
    // 高亮当前形状按钮
    document.querySelectorAll('.shape-btn').forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.shape === shapeName) {
        btn.classList.add('active');
      }
    });
    
    // 如果形状不存在，使用随机形状
    if (!shapes[shapeName]) {
      shapeName = getRandomShape();
    }
    
    // 记录当前形状
    currentShape = shapeName;
    
    // 清除旧的时间轴
    if (morphTimeline) {
      morphTimeline.kill();
    }
    
    // 创建新的变换动画
    morphTimeline = gsap.timeline();
    
    // 设置形状变换动画
    morphTimeline.to('.morph-path', {
      duration: 1,
      morphSVG: {
        shape: shapes[shapeName],
        type: "rotational" // 使用旋转模式获得更好的变形效果
      },
      fill: shapeColors[shapeName],
      ease: "elastic.out(0.8, 0.6)"
    });
    
    // 调整缩放比例
    gsap.to('.morph-group', {
      scale: shapeScales[shapeName],
      duration: 0.7,
      ease: "back.out(1.7)"
    });
    
    // 添加特效
    if (shapeName === 'star') {
      // 星星闪烁效果
      gsap.fromTo('.morph-path', 
        {stroke: "#fff", strokeWidth: 0},
        {stroke: "#ff0", strokeWidth: 3, duration: 0.3, yoyo: true, repeat: 3}
      );
    } else if (shapeName === 'logo') {
      // GSAP标志效果
      gsap.fromTo('.morph-path', 
        {strokeWidth: 0},
        {strokeWidth: 3, stroke: "#fff", duration: 0.5, delay: 0.3}
      );
    }
  }
  
  // 绑定形状按钮事件
  document.querySelectorAll('.shape-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const shapeName = btn.dataset.shape;
      morphToShape(shapeName);
    });
  });
  
  // 绑定随机形状按钮
  document.querySelector('.random-btn').addEventListener('click', () => {
    // 获取随机形状（不同于当前形状）
    let newShape;
    do {
      newShape = getRandomShape();
    } while (newShape === currentShape);
    
    morphToShape(newShape);
  });
  
  // 绑定旋转控制
  document.querySelector('.rotate-toggle').addEventListener('change', function() {
    if (this.checked) {
      rotationTimeline.play();
    } else {
      rotationTimeline.pause();
    }
  });
  
  // 绑定脉动控制
  document.querySelector('.pulse-toggle').addEventListener('change', function() {
    if (this.checked) {
      pulseTimeline.play();
    } else {
      pulseTimeline.pause();
    }
  });
  
  // 3. 播放/暂停按钮切换动画
  const playPauseTimeline = gsap.timeline({paused: true});
  
  // 准备动画序列 - 从播放变为暂停
  playPauseTimeline
    .to('.play-icon', {
      opacity: 0,
      scale: 0.5,
      transformOrigin: "center center",
      duration: 0.3
    })
    .to('.pause-icon', {
      opacity: 1,
      scale: 1,
      transformOrigin: "center center",
      duration: 0.3
    }, "-=0.1");
  
  let isPlaying = false;
  
  // 添加点击事件 - 切换播放/暂停状态
  function togglePlayPause() {
    if (isPlaying) {
      playPauseTimeline.reverse();
      gsap.to('.media-icon circle', {
        stroke: "#2c3e50",
        duration: 0.5
      });
    } else {
      playPauseTimeline.play();
      gsap.to('.media-icon circle', {
        stroke: "#e74c3c",
        duration: 0.5
      });
    }
    isPlaying = !isPlaying;
  }
  
  // 事件监听：重播按钮
  document.querySelector('.stroke-replay').addEventListener('click', () => {
    // 重置描边动画
    gsap.set('.svg-stroke path', { strokeDashoffset: 300 });
    strokeAnimation.restart();
  });
  
  document.querySelector('.icon-replay').addEventListener('click', togglePlayPause);
  
  // 初始化 - 默认显示为正方形
  morphToShape('square');
  
  // 初始化动画
  return {
    strokeAnimation,
    morphToShape,
    togglePlayPause
  };
}

// 等待DOM准备就绪后运行初始化
window.addEventListener('DOMContentLoaded', initSvgAnimations);

// 即时运行一次初始化
setTimeout(() => {
  const animations = initSvgAnimations();
  // 执行描边动画
  gsap.set('.svg-stroke path', { strokeDashoffset: 300 });
  animations.strokeAnimation.play();
}, 300);`;
</script>

<style>
/* 组件本身的样式 */
</style> 