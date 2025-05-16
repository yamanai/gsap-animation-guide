import { defineConfig } from 'vitepress'

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  base: '/gsap-animation-guide/',
  // 网站标题
  title: 'GSAP 动画开发指南',
  // 网站描述
  description: '学习如何在纯JavaScript、Vue3和React中使用GSAP创建专业级动画效果',
  // 语言
  lang: 'zh-CN',
  // 网站图标
  head: [
    ['link', { rel: 'icon', href: '/logo.svg' }]
  ],
  // Markdown 配置
  markdown: {
    // 禁用自动API链接功能
    linkify: false
  },
  // 端口配置，固定为5173
  vite: {
    server: {
      port: 5173,
      strictPort: true // 如果端口已被占用，则会直接失败而不是尝试下一个可用端口
    }
  },
  // 主题配置
  themeConfig: {
    // 导航栏配置
    nav: [
      { text: '首页', link: '/' },
      { text: '基础篇', link: '/basics/', activeMatch: '^/basics/' },
      { text: 'Vue3集成', link: '/vue-integration/', activeMatch: '^/vue-integration/' },
      { text: 'React集成', link: '/react-integration/', activeMatch: '^/react-integration/' },
      { text: '高级篇', link: '/advanced/', activeMatch: '^/advanced/' },
      { text: '实战应用', link: '/practical/', activeMatch: '^/practical/' },
      { text: '性能优化', link: '/performance/', activeMatch: '^/performance/' },
      { text: 'GSAP编辑器演示', link: '/gsap-editor-demo' },
      { text: '练习场', link: '/playground/', activeMatch: '^/playground/' },
    ],
    // 侧边栏配置
    sidebar: {
      '/basics/': [
        {
          text: 'GSAP基础篇',
          items: [
            { text: '概述', link: '/basics/' },
            { text: 'GSAP简介与环境搭建', link: '/basics/introduction' },
            { text: '核心动画方法', link: '/basics/core-methods' },
            { text: '选择器与DOM操作', link: '/basics/selectors' },
            { text: '时间控制', link: '/basics/timing' },
            { text: '缓动函数', link: '/basics/easing' },
            { text: '回调函数与事件', link: '/basics/callbacks' },
            { text: '时间轴', link: '/basics/timeline' },
          ]
        }
      ],
      '/vue-integration/': [
        {
          text: 'Vue3集成篇',
          items: [
            { text: '概述', link: '/vue-integration/' },
            { text: '环境搭建', link: '/vue-integration/setup' },
            { text: '组合式API集成', link: '/vue-integration/composition-api' },
            { text: '选项式API集成', link: '/vue-integration/options-api' },
            { text: '动画组件设计', link: '/vue-integration/components' },
            { text: 'Vue指令与GSAP', link: '/vue-integration/directives' },
            { text: 'Vue过渡与GSAP结合', link: '/vue-integration/transitions' },
          ]
        }
      ],
      '/react-integration/': [
        {
          text: 'React集成篇',
          items: [
            { text: '概述', link: '/react-integration/' },
            { text: '环境搭建', link: '/react-integration/setup' },
            { text: 'Hook方式集成', link: '/react-integration/hooks' },
            { text: '类组件集成', link: '/react-integration/class-components' },
            { text: 'React动画组件设计', link: '/react-integration/components' },
            { text: '状态管理与动画', link: '/react-integration/state-management' },
            { text: 'React过渡组库结合', link: '/react-integration/transitions' },
          ]
        }
      ],
      '/advanced/': [
        {
          text: '高级篇',
          items: [
            { text: '概述', link: '/advanced/' },
            { text: 'ScrollTrigger插件', link: '/advanced/scrolltrigger' },
            { text: 'MotionPath插件', link: '/advanced/motionpath' },
            { text: 'Draggable插件', link: '/advanced/draggable' },
            { text: 'MorphSVG插件', link: '/advanced/morphsvg' },
            { text: 'DrawSVG插件', link: '/advanced/drawsvg' },
            { text: '3D动画效果', link: '/advanced/3d-animation' },
            { text: '高级文字动画', link: '/advanced/text-animation' },
          ]
        }
      ],
      '/practical/': [
        {
          text: '实战应用篇',
          items: [
            { text: '概述', link: '/practical/' },
            { text: 'UI交互动画', link: '/practical/ui-interactions' },
            { text: '页面过渡效果', link: '/practical/page-transitions' },
            { text: '数据可视化动画', link: '/practical/data-viz' },
            { text: '游戏元素动画', link: '/practical/game-elements' },
            { text: '电子商务动画', link: '/practical/ecommerce' },
            { text: '创意网站动效', link: '/practical/creative-sites' },
          ]
        }
      ],
      '/performance/': [
        {
          text: '性能与优化篇',
          items: [
            { text: '概述', link: '/performance/' },
            { text: '动画性能分析', link: '/performance/analysis' },
            { text: '优化技巧', link: '/performance/optimization' },
            { text: '大型应用动画管理', link: '/performance/management' },
            { text: '移动端优化', link: '/performance/mobile' },
          ]
        }
      ],
      '/playground/': [
        {
          text: '在线练习平台',
          items: [
            { text: '练习平台介绍', link: '/playground/' },
            { text: '基础练习沙箱', link: '/playground/basic-sandbox' },
            { text: 'Vue练习环境', link: '/playground/vue-sandbox' },
            { text: 'React练习环境', link: '/playground/react-sandbox' },
            { 
              text: '挑战任务', 
              items: [
                { text: '基础挑战', link: '/playground/challenges/challenge-1' },
                { text: '中级挑战', link: '/playground/challenges/challenge-2' },
                { text: '高级挑战', link: '/playground/challenges/challenge-3' },
              ]
            },
          ]
        }
      ]
    },
    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/yourusername/gsap-guide' }
    ],
    // 页脚
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present'
    }
  }
})
