---
title: SplitText插件安装与设置
editLink: true
outline: deep
---

# SplitText插件安装与设置

本章将详细介绍如何在您的项目中安装和设置GSAP SplitText插件，包括不同方式的安装方法以及初始化设置。

## 安装前的准备工作

在安装SplitText插件之前，请确保：

1. 您已经安装了GSAP核心库（这是使用任何GSAP插件的前提）
2. 您了解SplitText是付费插件，需要[Club GreenSock](https://greensock.com/club/)会员资格才能在商业项目中使用

::: warning 许可说明
SplitText是GSAP的付费插件，仅Club GreenSock会员可在商业项目中使用。您可以在非商业项目中免费使用CodePen或其他类似平台进行测试和学习。
:::

## 安装方式

### 方式1：通过NPM安装（推荐）

如果您的项目使用npm或yarn等包管理工具，可以通过以下命令安装GSAP及其插件：

```bash
# 使用npm
npm install gsap

# 或使用yarn
yarn add gsap
```

安装完成后，在您的项目中引入SplitText插件：

```javascript
// 导入GSAP核心库和SplitText插件
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

// 注册插件
gsap.registerPlugin(SplitText);
```

### 方式2：通过CDN引入

如果您更喜欢直接在HTML中通过CDN引入，可以使用以下方式：

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/SplitText.min.js"></script>
<script>
  // 注册插件
  gsap.registerPlugin(SplitText);
</script>
```

### 方式3：下载文件本地引入

您也可以从[GSAP官方网站](https://greensock.com/get-started/)下载GSAP文件包，然后在项目中本地引入：

```html
<script src="path/to/gsap.min.js"></script>
<script src="path/to/SplitText.min.js"></script>
<script>
  // 注册插件
  gsap.registerPlugin(SplitText);
</script>
```

## 在不同框架中的安装与设置

### 在Vue项目中安装

#### Vue 3 + Vite示例

```javascript
// main.js 或 main.ts
import { createApp } from 'vue'
import App from './App.vue'
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

// 注册插件
gsap.registerPlugin(SplitText);

createApp(App).mount('#app')
```

在组件中使用：

```vue
<script setup>
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'

const textElement = ref(null)

onMounted(() => {
  const split = new SplitText(textElement.value, { type: "chars" })
  gsap.from(split.chars, {
    opacity: 0,
    y: 50,
    stagger: 0.05,
    duration: 0.5
  })
})
</script>

<template>
  <h1 ref="textElement">Hello GSAP</h1>
</template>
```

### 在React项目中安装

```jsx
// 在入口文件中注册插件
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

// 注册插件
gsap.registerPlugin(SplitText);

// 在组件中使用
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

function AnimatedText() {
  const textRef = useRef(null);
  
  useEffect(() => {
    const split = new SplitText(textRef.current, { type: "chars" });
    gsap.from(split.chars, {
      opacity: 0,
      y: 50,
      stagger: 0.05,
      duration: 0.5
    });
    
    // 清理函数
    return () => split.revert();
  }, []);
  
  return <h1 ref={textRef}>Hello GSAP</h1>;
}

export default AnimatedText;
```

## 验证安装

安装完成后，您可以通过以下代码验证SplitText插件是否已正确安装并可用：

```javascript
// 如果成功安装，以下代码不会报错
const element = document.querySelector(".my-text");
const split = new SplitText(element, { type: "chars" });
console.log("SplitText实例创建成功:", split.chars.length);
```

## 常见安装问题

### 问题1：插件未正确注册

如果遇到 "SplitText is not a constructor" 或类似错误，通常是因为插件未正确注册。确保在使用插件前已调用：

```javascript
gsap.registerPlugin(SplitText);
```

### 问题2：无法访问付费插件

如果您遇到 "SplitText is undefined" 错误，可能是因为您无法访问此付费插件。解决方案：

1. 确认您已成为Club GreenSock会员
2. 登录您的GreenSock账户并下载所需插件
3. 按照会员说明正确引入插件

### 问题3：模块加载错误

如果遇到模块相关错误，尝试以下解决方案：

```javascript
// 确保导入语法正确
import { gsap } from "gsap";
import { SplitText } from "gsap/dist/SplitText";

// 注意：某些环境可能需要使用此路径
```

## 下一步

成功安装SplitText插件后，您可以继续阅读[基础API和配置选项](/plugins/core/splittext/configuration)了解如何配置和使用该插件。 