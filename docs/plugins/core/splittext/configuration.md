---
title: SplitText基础API和配置选项
editLink: true
outline: deep
---

# SplitText基础API和配置选项

本章将详细介绍SplitText插件的API和配置选项，帮助您全面了解如何配置和使用这一强大的文本分割工具。

## SplitText构造函数

创建SplitText实例的基本语法如下：

```javascript
const splitText = new SplitText(element, options);
```

### 参数说明

- `element`: 要分割的目标元素，可以是CSS选择器字符串、DOM元素或元素数组
- `options`: 配置选项对象，控制分割的行为和结果

## 核心配置选项

以下是SplitText插件的主要配置选项：

| 配置项 | 类型 | 默认值 | 说明 |
| ----- | ---- | ----- | ---- |
| `type` | String | 无 | 分割类型，可选值："chars"、"words"、"lines"，可使用逗号组合（如"chars,words"） |
| `charsClass` | String | 无 | 应用于每个字符元素的CSS类名 |
| `wordsClass` | String | 无 | 应用于每个单词元素的CSS类名 |
| `linesClass` | String | 无 | 应用于每行元素的CSS类名 |
| `position` | String | "relative" | 生成元素的CSS position属性 |
| `absolute` | Boolean | false | 设置为true时将position设为"absolute" |
| `linesClass` | String | 无 | 应用于每行元素的CSS类名 |
| `wordDelimiter` | String | 空格 | 单词之间的分隔符 |
| `splitClass` | String | 无 | 应用于所有分割元素的CSS类 |
| `specialChars` | Array | [] | 需要作为单独字符处理的特殊字符数组 |
| `reduceWhiteSpace` | Boolean | true | 是否减少多余的空白字符 |

### type选项详解

`type`是最重要的配置参数，决定了文本如何被分割：

- `"chars"`: 将文本分割为单个字符
- `"words"`: 将文本分割为单词
- `"lines"`: 将文本分割为行
- 多种类型可组合使用：`"chars,words,lines"`

```javascript
// 只分割为字符
const splitChars = new SplitText(".my-text", { type: "chars" });

// 同时分割为字符和单词
const splitBoth = new SplitText(".my-text", { type: "chars,words" });

// 分割为所有类型
const splitAll = new SplitText(".my-text", { type: "chars,words,lines" });
```

### CSS类配置选项

您可以为不同的分割元素指定CSS类名，便于样式设置：

```javascript
const split = new SplitText(".my-text", {
  type: "chars,words,lines",
  charsClass: "my-char",
  wordsClass: "my-word",
  linesClass: "my-line",
  splitClass: "split-element" // 应用于所有分割元素
});
```

这将生成如下DOM结构：

```html
<div class="my-line split-element">
  <div class="my-word split-element">
    <div class="my-char split-element">H</div>
    <div class="my-char split-element">e</div>
    <!-- 其他字符... -->
  </div>
  <!-- 其他单词... -->
</div>
```

## SplitText实例属性

创建SplitText实例后，可以访问以下属性：

| 属性 | 类型 | 说明 |
| ---- | ---- | ---- |
| `chars` | Array | 所有字符元素的数组（如果type包含"chars"） |
| `words` | Array | 所有单词元素的数组（如果type包含"words"） |
| `lines` | Array | 所有行元素的数组（如果type包含"lines"） |
| `elements` | Array | 所有原始元素的数组 |
| `originals` | Array | 原始元素的原始HTML内容 |

```javascript
const split = new SplitText("p", { type: "chars,words,lines" });

// 使用实例属性创建动画
gsap.from(split.chars, { opacity: 0, stagger: 0.05 });
gsap.from(split.words, { y: 50, stagger: 0.1 });
gsap.from(split.lines, { x: -100, stagger: 0.2 });
```

## SplitText实例方法

### revert()

`revert()`方法用于将分割后的元素恢复为原始状态：

```javascript
const split = new SplitText(".my-text", { type: "chars" });

// 创建动画...

// 动画完成后恢复原始状态
split.revert();
```

建议在不再需要分割元素时调用此方法，特别是在组件卸载或页面切换时，以避免可能的DOM内存泄漏。

### split()

`split()`方法用于重新分割文本，通常在文本内容更改后使用：

```javascript
const split = new SplitText(".my-text", { type: "chars" });

// 更改文本内容
document.querySelector(".my-text").textContent = "New Content";

// 重新分割
split.split();

// 现在split.chars包含新的字符元素
```

## 高级配置选项

### specialChars

`specialChars`选项允许您指定需要特殊处理的字符，这些字符将作为单独的字符处理而不是与其他字符组合：

```javascript
const split = new SplitText(".my-text", {
  type: "chars",
  specialChars: [",", ".", "!", "?", "&"] // 这些字符将单独处理
});
```

### reduceWhiteSpace

`reduceWhiteSpace`选项控制是否移除多余的空白字符：

```javascript
const split = new SplitText(".my-text", {
  type: "words",
  reduceWhiteSpace: false // 保留所有空白字符
});
```

### wordDelimiter

`wordDelimiter`选项允许您自定义单词分隔符：

```javascript
const split = new SplitText(".my-text", {
  type: "words",
  wordDelimiter: "-" // 使用短横线作为单词分隔符而非默认空格
});
```

## 实用配置示例

### 1. 基础分割配置

```javascript
// 最简单的配置 - 仅分割为字符
const basicSplit = new SplitText(".heading", { type: "chars" });
```

### 2. 带样式类的完整分割

```javascript
// 完整分割并设置样式类
const fullSplit = new SplitText(".paragraph", {
  type: "chars,words,lines",
  charsClass: "char",
  wordsClass: "word",
  linesClass: "line"
});
```

### 3. 绝对定位配置

```javascript
// 使用绝对定位（适用于特定动画效果）
const absoluteSplit = new SplitText(".quote", {
  type: "chars",
  position: "absolute" // 或设置 absolute: true
});
```

### 4. 特殊字符处理

```javascript
// 处理代码片段中的特殊字符
const codeSplit = new SplitText(".code-block", {
  type: "chars",
  specialChars: ["(", ")", "{", "}", "[", "]", "<", ">", "/", "\\"]
});
```

## 与GSAP动画结合

SplitText的主要用途是与GSAP动画结合。以下是几个基本示例：

```javascript
// 创建SplitText实例
const split = new SplitText(".my-text", { type: "chars,words,lines" });

// 字符级动画
gsap.from(split.chars, {
  opacity: 0,
  y: 100,
  stagger: 0.02,
  duration: 0.5
});

// 单词级动画
gsap.from(split.words, {
  opacity: 0,
  scale: 0,
  stagger: 0.1,
  duration: 0.7
});

// 行级动画
gsap.from(split.lines, {
  opacity: 0,
  x: -100,
  stagger: 0.2,
  duration: 1
});
```

通过掌握SplitText的API和配置选项，您可以创建更精细、更具创意的文本动画效果，充分发挥这一强大插件的潜力。 