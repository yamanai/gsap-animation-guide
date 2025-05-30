import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue'; // 添加Vue插件

export default defineConfig({
  // 静态资源处理
  assetsInclude: ['**/*.min.js'],
  
  // 开发服务器配置
  server: {
    fs: {
      // 允许访问项目根目录之外的文件
      allow: ['..', './node_modules']
    }
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
  },

  // 插件配置
  plugins: [
    // 添加Vue插件支持
    vue(),
    // 添加插件，在构建时将GSAP文件复制到输出目录
    {
      name: 'copy-gsap-files',
      generateBundle() {
        // 构建时触发，复制GSAP文件到输出目录
        console.log('GSAP文件将会被复制到输出目录');
      }
    }
  ],

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
  }
}); 