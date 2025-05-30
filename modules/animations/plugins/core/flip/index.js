/**
 * FLIP 插件示例
 * 
 * 这些示例展示了如何使用GSAP的FLIP插件来创建平滑的布局转换和状态变化动画。
 * FLIP代表First, Last, Invert, Play技术。
 */

// 导入组件
import BasicConcepts from './basic-concepts.vue'
import ConfigurationOptions from './configuration-options.vue'
import CommonUseCases from './common-use-cases.vue'
import AdvancedFeatures from './advanced-features.vue'
import PerformanceTips from './performance-tips.vue'

// 导出组件供使用
export {
  BasicConcepts,
  ConfigurationOptions,
  CommonUseCases,
  AdvancedFeatures,
  PerformanceTips
}

// 导出组件元数据，用于文档生成
export const componentsMeta = [
  {
    name: 'FLIP基本概念',
    component: BasicConcepts,
    description: '展示FLIP技术的核心原理和基本用法'
  },
  {
    name: '配置选项',
    component: ConfigurationOptions,
    description: '展示FLIP插件的各种配置选项和参数'
  },
  {
    name: '常见用例',
    component: CommonUseCases,
    description: '展示FLIP插件的典型应用场景，如列表排序、网格布局切换等'
  },
  {
    name: '高级功能',
    component: AdvancedFeatures,
    description: '展示FLIP插件的高级功能，如绝对/相对定位切换、父级变更等'
  },
  {
    name: '性能优化',
    component: PerformanceTips,
    description: '展示FLIP插件的性能优化技巧和最佳实践'
  }
]

// 默认导出所有组件
export default {
  BasicConcepts,
  ConfigurationOptions,
  CommonUseCases,
  AdvancedFeatures,
  PerformanceTips
} 