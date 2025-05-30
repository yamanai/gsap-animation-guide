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
    ['link', { rel: 'icon', href: '/gsap-animation-guide/logo.svg' }]
  ],
  // Markdown 配置
  markdown: {
    // 禁用自动API链接功能
    linkify: false,
    // 代码块配置
    // theme: {
    //   light: 'github-light',
    //   dark: 'github-dark'
    // }
  },
  // Vite配置
  vite: {
    server: {
      port: 5173,
      strictPort: true, // 如果端口已被占用，则会直接失败而不是尝试下一个可用端口
      fs: {
        // 允许访问项目根目录之外的文件
        allow: ['..', '../../node_modules']
      }
    },
    // 静态资源处理
    assetsInclude: ['**/*.min.js'],
    // 解析配置
    resolve: {
      // 仅保留文件扩展名配置，移除别名
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    // 优化依赖
    optimizeDeps: {
      // 不要优化gsap，保持它为独立文件
      exclude: ['gsap'],
      include: ['vue']
    },
    // 构建配置
    build: {
      // 将gsap作为外部依赖处理
      rollupOptions: {
        external: ['gsap'],
        output: {
          // 为外部依赖提供全局变量
          globals: {
            gsap: 'gsap'
          }
        }
      }
    }
  },
  // 主题配置
  themeConfig: {
    // 导航栏配置
    nav: [
      { text: '首页', link: '/' },
      { text: '基础篇', link: '/basics/', activeMatch: '^/basics/' },
      { text: '高级篇', link: '/advanced/', activeMatch: '^/advanced/' },
      { text: '插件篇', link: '/plugins/', activeMatch: '^/plugins/' },
      // { text: '实战应用', link: '/practical/', activeMatch: '^/practical/' },
      // { text: 'Vue3集成', link: '/vue-integration/', activeMatch: '^/vue-integration/' },
      // { text: 'React集成', link: '/react-integration/', activeMatch: '^/react-integration/' },
      // { text: '性能优化', link: '/performance/', activeMatch: '^/performance/' },
      // { text: '练习场', link: '/playground/', activeMatch: '^/playground/' },
    ],
    // 侧边栏配置
    sidebar: {
      '/basics/': [
        {
          text: 'GSAP基础篇',
          items: [
            { text: '概述', link: '/basics/' },
            { text: '前端动画基础概念', link: '/basics/animation-fundamentals' },
            { text: 'GSAP入门指南', link: '/basics/introduction' },
            { text: '动画基础要素', link: '/basics/animation-basics' },
            { text: '核心动画方法', link: '/basics/core-methods' },
            { text: '动画属性详解', link: '/basics/properties' },
            { text: '选择器与DOM操作', link: '/basics/selectors' },
            { text: '时间控制', link: '/basics/timing' },
            { text: '缓动函数', link: '/basics/easing' },
            { text: '回调函数与事件', link: '/basics/callbacks' },
            { text: '时间轴', link: '/basics/timeline' },
            { text: '综合案例实战', link: '/basics/practical-examples' },
          ]
        }
      ],
      '/advanced/': [
        {
          text: '高级篇',
          items: [
            { text: '概述', link: '/advanced/' },
            { 
              text: '深入理解GSAP核心概念', 
              items: [
                { text: '核心概念概述', link: '/advanced/core-concepts/' },
                { text: 'Position参数详解', link: '/advanced/core-concepts/position-parameter' },
                { text: '关键帧动画设计', link: '/advanced/core-concepts/keyframes' },
                { text: 'immediateRender属性解析', link: '/advanced/core-concepts/immediaterender' },
                { text: '处理冲突补间动画', link: '/advanced/core-concepts/conflicts' },
                { text: '避免FOUC现象', link: '/advanced/core-concepts/fouc' },
                { text: '动画无障碍设计', link: '/advanced/core-concepts/accessibility' },
                { text: '常见GSAP错误与解决方案', link: '/advanced/core-concepts/common-mistakes' },
              ]
            },
            { text: '高级动画控制', link: '/advanced/advanced-control' },
            { text: '3D动画效果', link: '/advanced/3d-animation' },
            { text: '复杂交互动画开发', link: '/advanced/complex-interactions' },
            { text: 'GSAP与现代框架深度集成', link: '/advanced/framework-integration' },
            { text: '动画调试与优化实战', link: '/advanced/debugging' },
          ]
        }
      ],
      '/plugins/': [
        {
          text: 'GSAP插件篇',
          items: [
            { text: '概述', link: '/plugins/' },
            { text: '插件系统基础', link: '/plugins/basics' },
            { 
              text: '核心重点插件', 
              link: '/plugins/core/',
              items: [
                { 
                  text: 'ScrollTrigger', 
                  link: '/plugins/core/scrolltrigger/',
                  items: [
                    { text: '基础配置详解', link: '/plugins/core/scrolltrigger/configuration' },
                    { text: '滚动动画类型', link: '/plugins/core/scrolltrigger/scroll-types' },
                    { text: '常见问题解决', link: '/plugins/core/scrolltrigger/troubleshooting' },
                  ]
                },
                { 
                  text: 'ScrollSmoother', 
                  link: '/plugins/core/scrollsmoother/',
                  items: [
                    { text: '基本概念与工作原理', link: '/plugins/core/scrollsmoother/basic-concepts' },
                    { text: '安装与设置', link: '/plugins/core/scrollsmoother/installation' },
                    { text: '基础配置选项', link: '/plugins/core/scrollsmoother/configuration' },
                    { text: '常见应用场景', link: '/plugins/core/scrollsmoother/common-use-cases' },
                    { text: '与ScrollTrigger结合', link: '/plugins/core/scrollsmoother/scrolltrigger-integration' },
                    { text: '高级功能与技巧', link: '/plugins/core/scrollsmoother/advanced-features' },
                    { text: '性能优化', link: '/plugins/core/scrollsmoother/performance' },
                    { text: '常见问题解决', link: '/plugins/core/scrollsmoother/troubleshooting' },
                    { text: '最佳实践', link: '/plugins/core/scrollsmoother/best-practices' },
                  ]
                },
                { 
                  text: 'Flip', 
                  link: '/plugins/core/flip/',
                  items: [
                    { text: '基本概念与工作原理', link: '/plugins/core/flip/basic-concepts' },
                    { text: '安装与设置', link: '/plugins/core/flip/installation' },
                    { text: '基础API和配置选项', link: '/plugins/core/flip/configuration' },
                    { text: '常见应用场景', link: '/plugins/core/flip/common-use-cases' },
                    { text: '高级功能与技巧', link: '/plugins/core/flip/advanced-features' },
                    { text: '性能优化', link: '/plugins/core/flip/performance' },
                    { text: '常见问题解决', link: '/plugins/core/flip/troubleshooting' },
                    { text: '最佳实践', link: '/plugins/core/flip/best-practices' },
                  ]
                },
                { 
                  text: 'SplitText', 
                  link: '/plugins/core/splittext/',
                  items: [
                    { text: '基本概念与工作原理', link: '/plugins/core/splittext/basic-concepts' },
                    { text: '安装与设置', link: '/plugins/core/splittext/installation' },
                    { text: '基础API和配置选项', link: '/plugins/core/splittext/configuration' },
                    { text: '常见应用场景', link: '/plugins/core/splittext/common-use-cases' },
                    { text: '高级功能与技巧', link: '/plugins/core/splittext/advanced-features' },
                    { text: '与其他GSAP功能结合', link: '/plugins/core/splittext/gsap-integration' },
                    { text: '性能优化', link: '/plugins/core/splittext/performance' },
                    { text: '常见问题解决', link: '/plugins/core/splittext/troubleshooting' },
                    { text: '最佳实践', link: '/plugins/core/splittext/best-practices' },
                  ]
                },
              ]
            },
            // { 
            //   text: '常用辅助插件', 
            //   link: '/plugins/common/',
            //   items: [
            //     { text: 'DrawSVG', link: '/plugins/common/drawsvg' },
            //     { text: 'MotionPath', link: '/plugins/common/motionpath' },
            //     { text: 'Draggable', link: '/plugins/common/draggable' },
            //     { text: 'CustomEase', link: '/plugins/common/customease' },
            //   ]
            // },
            // { 
            //   text: '其他实用插件', 
            //   link: '/plugins/others/',
            //   items: [
            //     { text: '文字相关插件', link: '/plugins/others/text-plugins' },
            //     { text: 'SVG相关插件', link: '/plugins/others/svg-plugins' },
            //     { text: '交互增强插件', link: '/plugins/others/interaction' },
            //     { text: '开发工具类插件', link: '/plugins/others/devtools' },
            //     { text: '特殊效果插件', link: '/plugins/others/special-effects' },
            //   ]
            // },
            // { text: 'React集成专题', link: '/plugins/react' },
            // { text: '插件组合应用', link: '/plugins/combinations' },
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
            { text: '指令与GSAP', link: '/vue-integration/directives' },
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
            { text: '过渡组库结合', link: '/react-integration/transitions' },
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
      { icon: 'github', link: 'https://github.com/yamanai/gsap-animation-guide' }
    ],
    // 页脚
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present'
    }
  }
})
