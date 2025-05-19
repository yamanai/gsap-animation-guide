# GSAP动画组件模块

本目录包含所有GSAP动画相关的可复用组件，按照功能进行分类。

## 目录结构

- `timing/` - 时间控制相关动画组件
  - 基础时间参数演示
  - 动画状态控制
  - 交错动画
  - 相对位置时间轴
  - 时间轴标签系统
  - 回调函数
- `index.js` - 导出所有动画组件的索引文件

## 使用方法

```javascript
// 直接导入特定类别的组件
import { BasicParameters } from '../modules/animations/timing';

// 或者通过命名空间导入
import { animations } from '../modules';
const { BasicParameters } = animations.timing;
```

## 添加新的动画类别

为了保持项目的可扩展性，当添加新的动画类别时：

1. 在`animations`目录下创建新的子目录（如`easing/`、`effects/`等）
2. 在新目录中创建相关组件和`index.js`文件
3. 在`animations/index.js`中导出新的类别

## 设计原则

- 每个动画组件应该是独立的，不依赖其他组件
- 使用统一的接口和命名规范
- 提供详细的文档和使用示例
- 尽可能使用GsapEditor组件展示动画效果 