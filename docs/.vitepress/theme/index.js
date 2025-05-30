import DefaultTheme from 'vitepress/theme'
import GsapDemo from './components/GsapDemo.vue'
import GsapAdvancedDemo from './components/GsapAdvancedDemo.vue'
import GsapEditor from './components/GsapEditor.vue'
import './custom.css'
import './feature-cards.css'

// 导入Flip插件组件 - 只导入实际存在的文件
import BasicConcepts from '../../../modules/animations/plugins/core/flip/basic-concepts.vue'
import ConfigurationOptions from '../../../modules/animations/plugins/core/flip/configuration-options.vue'
import CommonUseCases from '../../../modules/animations/plugins/core/flip/common-use-cases.vue'
import PerformanceTips from '../../../modules/animations/plugins/core/flip/performance-tips.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // 注册全局组件
    app.component('GsapDemo', GsapDemo)
    app.component('GsapAdvancedDemo', GsapAdvancedDemo)
    app.component('GsapEditor', GsapEditor)
    
    // 注册Flip组件 - 只注册实际存在的组件
    app.component('FlipBasicConcepts', BasicConcepts)
    app.component('FlipConfigurationOptions', ConfigurationOptions)
    app.component('FlipCommonUseCases', CommonUseCases)
    app.component('FlipPerformanceTips', PerformanceTips)
    
    // 在客户端挂载时引入GSAP
    if (typeof window !== 'undefined') {
      // 创建一个全局状态来跟踪GSAP加载情况
      window.gsapLoaded = false
      
      // 立即加载GSAP
      // window.addEventListener('DOMContentLoaded', () => {
      //   // 添加一个函数来禁用gsap.to链接
      //   function disableGsapToLinks() {
      //     // 获取所有包含gsap.to的代码元素
      //     const codeElements = document.querySelectorAll('.vp-doc code, .vp-doc code span');
          
      //     codeElements.forEach(element => {
      //       // 检查元素内容是否包含gsap.to
      //       if (element.textContent && element.textContent.includes('gsap.to')) {
      //         element.style.pointerEvents = 'none';
      //         element.style.cursor = 'text';
      //         element.style.textDecoration = 'none';
              
      //         // 如果元素是链接或链接的子元素，禁用链接
      //         const parent = element.closest('a');
      //         if (parent) {
      //           parent.style.pointerEvents = 'none';
      //           parent.style.cursor = 'text';
      //           parent.style.textDecoration = 'none';
      //           parent.onclick = (e) => e.preventDefault();
      //         }
      //       }
      //     });

      //     // 特别处理内联代码中的gsap.to
      //     const inlineCodeElements = document.querySelectorAll('.vp-doc p code, .vp-doc li code');
      //     inlineCodeElements.forEach(code => {
      //       if (code.textContent && code.textContent.includes('gsap.to')) {
      //         code.style.pointerEvents = 'none';
      //         code.style.cursor = 'text';
              
      //         // 检查是否被链接包含
      //         const parent = code.parentElement;
      //         if (parent && parent.tagName.toLowerCase() === 'a') {
      //           parent.style.pointerEvents = 'none';
      //           parent.style.cursor = 'text';
      //           parent.onclick = (e) => e.preventDefault();
      //         }
      //       }
      //     });
      //   }

      //   // 立即执行一次
      //   disableGsapToLinks();
        
      //   // 监听文档变化，每变化一次就执行一次
      //   const observer = new MutationObserver(() => {
      //     setTimeout(disableGsapToLinks, 200);
      //   });
        
      //   observer.observe(document.body, {
      //     childList: true,
      //     subtree: true
      //   });
      // });
      
      // 立即加载GSAP
      import('gsap').then(gsap => {
        window.gsap = gsap.default
        window.gsapLoaded = true
        console.log('GSAP加载完成')
        
        // 可选：导入GSAP插件
        import('gsap/ScrollTrigger').then(ScrollTrigger => {
          gsap.default.registerPlugin(ScrollTrigger.default)
          window.ScrollTrigger = ScrollTrigger.default
          
          // 加载ScrollSmoother插件
          import('gsap/ScrollSmoother').then(ScrollSmoother => {
            gsap.default.registerPlugin(ScrollSmoother.default)
            window.ScrollSmoother = ScrollSmoother.default
            console.log('ScrollSmoother加载完成')
          }).catch(err => {
            console.error('ScrollSmoother加载失败:', err)
          })
        })
      }).catch(err => {
        console.error('GSAP加载失败:', err)
      })
    }
  }
} 