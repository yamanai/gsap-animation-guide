---
title: SplitText插件 - GSAP文本分割动画工具
editLink: true
outline: deep
---

# SplitText插件概述

SplitText 是 GSAP 的专业级文本处理插件，能够轻松地将文本内容分割为单词、字符或行，从而实现精细控制的文字动画效果。它为创建复杂的文字动画提供了基础，是文本动画开发中的强大工具。

::: warning 付费插件
SplitText 是 GSAP 的付费插件，需要购买 [Club GreenSock](https://greensock.com/club/) 会员才能在商业项目中使用。
:::

## 功能特性

- **灵活的分割选项**：可将文本分割为字符、单词、行或它们的任意组合
- **精确的控制**：对分割后的每个元素进行独立的动画控制
- **DOM友好**：创建干净的DOM结构，便于样式设置
- **可逆操作**：可轻松恢复到原始DOM结构
- **嵌套支持**：支持创建多层次的文本分割
- **跨浏览器兼容**：确保在所有现代浏览器中表现一致

## SplitText能做什么？

SplitText插件可以帮助开发者轻松创建以下效果：

- 字符逐个显示的打字机效果
- 单词或字母的飞入动画
- 文字波浪效果
- 字符散开重组的动画
- 基于文本的交互效果
- 文字扭曲和形变效果
- 与滚动触发结合的文本动画

## 内容导航

- [基本概念与工作原理](/plugins/core/splittext/basic-concepts)：了解SplitText的核心概念和工作方式
- [安装与设置](/plugins/core/splittext/installation)：如何在项目中添加和初始化SplitText
- [基础API和配置选项](/plugins/core/splittext/configuration)：详细了解SplitText的配置参数
- [常见应用场景](/plugins/core/splittext/common-use-cases)：探索SplitText的典型用例
- [高级功能与技巧](/plugins/core/splittext/advanced-features)：掌握SplitText的高级特性
- [与其他GSAP功能结合](/plugins/core/splittext/gsap-integration)：与GSAP核心功能和其他插件的集成
- [性能优化](/plugins/core/splittext/performance)：优化SplitText动画的性能表现
- [常见问题解决](/plugins/core/splittext/troubleshooting)：解决使用SplitText时常见的问题
- [最佳实践](/plugins/core/splittext/best-practices)：SplitText使用的推荐做法和技巧

## 示例预览

```javascript
// 基础使用示例
const mySplitText = new SplitText(".my-text", {type: "chars, words, lines"});
const chars = mySplitText.chars;
const words = mySplitText.words;
const lines = mySplitText.lines;

// 创建动画
gsap.from(chars, {
  opacity: 0,
  y: 50,
  stagger: 0.05,
  duration: 0.5,
  ease: "back.out"
});
```

了解SplitText插件可以帮助您创建更加精细和专业的文字动画效果，提升网站和应用程序的用户体验。 