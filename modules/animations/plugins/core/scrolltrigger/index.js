// ScrollTrigger 组件导出文件 - 为 index.md 文档提供组件
import BasicExample from './basic-example.vue';
import PinExample from './pin-example.vue';
import BatchAnimation from './batch-animation.vue';

// 导入和重新导出 configuration 目录中的组件
import {
  BasicConfig,
  CallbackFunctions,
  SnapEffect,
  CustomScroller,
  ParallaxEffect,
  AnimationSequence,
  InteractiveChart
} from './configuration';

// 导出 index.md 引用的组件
export {
  BasicExample,
  PinExample,
  BatchAnimation
};

// 导出 configuration.md 引用的组件
export {
  BasicConfig,
  CallbackFunctions,
  SnapEffect,
  CustomScroller,
  ParallaxEffect,
  AnimationSequence,
  InteractiveChart
}; 