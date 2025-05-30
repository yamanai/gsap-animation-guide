/**
 * GSAP动画组件模块索引
 * 
 * 这个文件导出所有动画模块，方便在应用中统一导入
 */

// 基础动画模块
export * as basics from './basics';

// 也可以直接导出各个子模块，便于使用
export * as timing from './basics/timing';
export * as timeline from './basics/timeline';
export * as easing from './basics/easing';
export * as callbacks from './basics/callbacks';
export * as practical from './basics/practical';

// 插件模块
export * as plugins from './plugins';

// 未来可以添加中级和高级模块
// export * as intermediate from './intermediate';
// export * as advanced from './advanced';

// 未来可以添加其他类型的动画组件
// export * as effects from './effects';
// export * as transforms from './transforms'; 