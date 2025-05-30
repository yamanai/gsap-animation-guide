<template>
  <GsapEditor 
    title="横向滚动触发器"
    :initialHtml="htmlCode"
    :initialCss="cssCode"
    :initialJs="jsCode"
    scrollHeight="500px"
  />
</template>

<script setup>
const htmlCode = `<div class="horizontal-demo">
  <div class="intro">
    <h3>横向滚动动画</h3>
    <p>垂直滚动控制横向移动的内容</p>
  </div>
  <div class="horizontal-container">
    <div class="horizontal-content">
      <div class="section">
        <h3>第1部分</h3>
        <div class="image-placeholder image1"></div>
      </div>
      <div class="section">
        <h3>第2部分</h3>
        <div class="image-placeholder image2"></div>
      </div>
      <div class="section">
        <h3>第3部分</h3>
        <div class="image-placeholder image3"></div>
      </div>
      <div class="section">
        <h3>第4部分</h3>
        <div class="image-placeholder image4"></div>
      </div>
    </div>
  </div>
  <div class="instructions">向下滚动以体验横向滚动效果</div>
</div>`;

const cssCode = `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: Arial, sans-serif;
  overflow-x: hidden;
  color: #333;
}
.horizontal-demo {
  width: 100%;
  padding: 10px;
}
.intro {
  margin-bottom: 15px;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 6px;
}
.intro h3 {
  margin-bottom: 5px;
  color: #2c3e50;
}
.intro p {
  color: #7f8c8d;
  font-size: 14px;
}
.horizontal-container {
  width: 100%;
  height: 300px;
  overflow: hidden;
  position: relative;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.horizontal-content {
  display: flex;
  flex-direction: row;
  width: 400%; /* 四倍容器宽度 */
  height: 100%;
}
.section {
  width: 25%; /* 每个部分占总宽度的1/4 */
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
}
.section h3 {
  margin-bottom: 15px;
  color: #2c3e50;
}
.image-placeholder {
  width: 80%;
  height: 180px;
  border-radius: 8px;
}
.image1 {
  background: linear-gradient(135deg, #fd746c, #ff9068);
}
.image2 {
  background: linear-gradient(135deg, #56ab2f, #a8e063);
}
.image3 {
  background: linear-gradient(135deg, #614385, #516395);
}
.image4 {
  background: linear-gradient(135deg, #36d1dc, #5b86e5);
}
.instructions {
  margin-top: 15px;
  text-align: center;
  padding: 10px;
  background-color: #eff3f6;
  border-radius: 6px;
  font-style: italic;
  color: #666;
}`;

const jsCode = `// 注册ScrollTrigger插件
gsap.registerPlugin(ScrollTrigger);

// 清除可能存在的ScrollTrigger实例
ScrollTrigger.getAll().forEach(st => st.kill());

// 配置ScrollTrigger全局设置 - 禁用所有标记
ScrollTrigger.defaults({ markers: false });

// 设置初始透明度
gsap.utils.toArray('.section').forEach((section, i) => {
  gsap.set(section, { opacity: i === 0 ? 1 : 0.4 });
});

// 使用媒体查询管理所有动画
ScrollTrigger.matchMedia({
  "(min-width: 0px)": function() {
    // 主滚动动画
    gsap.to('.horizontal-content', {
      x: () => {
        const contentWidth = document.querySelector('.horizontal-content').offsetWidth;
        const containerWidth = document.querySelector('.horizontal-container').offsetWidth;
        return -(contentWidth - containerWidth);
      },
      ease: 'none',
      scrollTrigger: {
        trigger: '.horizontal-container',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        pin: true,
        anticipatePin: 1
      }
    });
    
    // 处理部分高亮
    let sections = gsap.utils.toArray('.section');
    let totalSections = sections.length;
    
    if (totalSections > 0) {
      // 主控制动画
      gsap.to('.horizontal-container', {
        scrollTrigger: {
          trigger: '.horizontal-container',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          onUpdate: self => {
            // 根据滚动进度更新部分透明度
            let progress = self.progress;
            let sectionSize = 1 / totalSections;
            let activeIndex = Math.floor(progress / sectionSize);
            activeIndex = Math.max(0, Math.min(activeIndex, totalSections - 1));
            
            sections.forEach((section, i) => {
              if (i === activeIndex) {
                gsap.to(section, { opacity: 1, duration: 0.3 });
              } else {
                gsap.to(section, { opacity: 0.4, duration: 0.3 });
              }
            });
          }
        }
      });
    }
  }
});`;
</script> 