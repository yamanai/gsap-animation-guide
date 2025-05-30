/**
 * ScrollSmoother 插件示例
 * 
 * 这些示例展示了如何使用GSAP的ScrollSmoother插件来创建平滑滚动效果。
 * ScrollSmoother是一个付费插件，需要GSAP商业授权。
 */

// 导入组件
import BasicExample from './basic-example.vue'
import ScrollTriggerIntegration from './scrolltrigger-integration.vue'
import AdvancedFeatures from './advanced-features.vue'
import PerformanceTips from './performance-tips.vue'

// 导出组件供使用
export {
  BasicExample,
  ScrollTriggerIntegration,
  AdvancedFeatures,
  PerformanceTips
}

// 导出组件元数据，用于文档生成
export const componentsMeta = [
  {
    name: '基础滚动平滑',
    component: BasicExample,
    description: '展示ScrollSmoother的基本用法，实现平滑滚动效果'
  },
  {
    name: 'ScrollTrigger集成',
    component: ScrollTriggerIntegration,
    description: '展示如何将ScrollSmoother与ScrollTrigger结合使用'
  },
  {
    name: '高级功能',
    component: AdvancedFeatures,
    description: '展示ScrollSmoother的高级功能和API'
  },
  {
    name: '性能优化',
    component: PerformanceTips,
    description: '展示如何优化ScrollSmoother的性能'
  }
]

// 默认导出所有组件
export default {
  BasicExample,
  ScrollTriggerIntegration,
  AdvancedFeatures,
  PerformanceTips
} 