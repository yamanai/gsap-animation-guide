# GSAP学习项目模块系统

本目录包含项目中所有可复用的模块，使用模块化的方式组织代码，便于维护和扩展。

## 目录结构

- `animations/` - 动画相关组件
  - `timing/` - 时间控制相关动画组件
  - (未来可以添加其他分类)
- `index.js` - 模块总索引文件

## 使用方法

这些模块可以通过多种方式导入使用：

### 1. 直接导入特定模块（推荐用于单一用途）

```javascript
// 导入特定动画组件
import { BasicParameters, AnimationControl } from '../modules/animations/timing';
```

### 2. 通过命名空间导入（推荐用于需要多种类型时）

```javascript
// 导入所有动画模块
import { animations } from '../modules';

// 使用timing命名空间下的组件
const { BasicParameters } = animations.timing;
```

## 添加新模块

项目使用模块化的组织方式，便于扩展：

1. 在对应目录下创建新的组件或功能模块
2. 在目录的index.js文件中导出这些模块
3. 确保上层的index.js文件也正确导出这些模块

## 推荐的模块组织方式

- `animations/` - 动画相关组件
- `components/` - 通用UI组件（如表单、按钮等）
- `hooks/` - Vue组合式API钩子函数
- `utils/` - 工具函数和辅助方法 