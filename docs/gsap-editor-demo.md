# GSAP 编辑器演示

这个页面展示了一个类似GSAP官方文档的代码编辑器，可以同时编辑HTML、CSS和JavaScript代码，并实时预览GSAP动画效果。

## 基础示例

下面是一个简单的GSAP动画示例，您可以点击HTML、CSS或JS标签进行编辑，再次点击同一标签可返回全屏预览模式。

<GsapEditor />

## 使用方法

1. 点击任意标签（HTML、CSS或JS）进入编辑模式
2. 修改代码
3. 点击"运行"按钮执行动画
4. 再次点击相同标签返回全屏预览模式
5. 点击"重置"按钮恢复默认代码

## 自定义示例

您也可以自定义初始代码内容：

<GsapEditor 
  initialHtml="<div class='box'></div>"
  initialCss=".box { width: 100px; height: 100px; background-color: #3498db; border-radius: 8px; margin: 100px auto; }"
  initialJs="gsap.to('.box', { duration: 2, rotation: 360, x: 100, backgroundColor: '#e74c3c', ease: 'elastic.out(1, 0.3)' });"
/>

## 高级示例

结合ScrollTrigger的复杂动画示例：

<GsapEditor 
  initialHtml="<div class='panel'><h2>滚动触发动画</h2><div class='box'></div></div>"
  initialCss=".panel { height: 200px; display: flex; flex-direction: column; align-items: center; justify-content: center; } .box { width: 100px; height: 100px; background-color: #9b59b6; border-radius: 8px; }"
  initialJs="// 需要先注册ScrollTrigger插件\ngsap.registerPlugin(ScrollTrigger);\n\ngsap.to('.box', {\n  scrollTrigger: {\n    trigger: '.panel',\n    start: 'top center',\n    end: 'bottom center',\n    scrub: true,\n    markers: true\n  },\n  rotation: 360,\n  scale: 2,\n  duration: 1\n});"
/>

## 功能特点

- 支持HTML、CSS和JavaScript的实时编辑
- 默认全屏预览模式，点击标签切换到分屏编辑模式
- 再次点击相同标签返回全屏预览
- 支持自定义初始代码
- 响应式设计，在移动设备上自动调整布局 