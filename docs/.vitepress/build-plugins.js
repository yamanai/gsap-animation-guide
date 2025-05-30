import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// GSAP文件源目录
const sourceDir = path.resolve(__dirname, '../../node_modules/gsap/dist');
// 目标目录 - VitePress构建输出的静态资源目录
const targetDir = path.resolve(__dirname, './dist/assets/gsap');

// 要复制的GSAP文件列表
const gsapFiles = [
  'gsap.min.js',
  'TextPlugin.min.js',
  'MotionPathPlugin.min.js',
  'ScrollTrigger.min.js',
  'Flip.min.js',
  'ScrollToPlugin.min.js',
  'Observer.min.js',
  'EaselPlugin.min.js',
  'PixiPlugin.min.js',
  'DrawSVGPlugin.min.js',
  'MorphSVGPlugin.min.js',
  'SplitText.min.js'
];

/**
 * 确保目录存在，如果不存在则创建
 */
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`创建目录: ${dirPath}`);
  }
}

/**
 * 复制文件
 */
function copyFile(source, target) {
  try {
    const data = fs.readFileSync(source);
    fs.writeFileSync(target, data);
    console.log(`成功复制: ${path.basename(source)}`);
  } catch (err) {
    console.error(`复制文件失败 ${source}: ${err.message}`);
  }
}

/**
 * 复制GSAP文件到构建目录
 */
function copyGsapFiles() {
  console.log('开始复制GSAP文件到构建目录...');
  
  // 确保目标目录存在
  ensureDirectoryExists(targetDir);
  
  // 复制文件
  gsapFiles.forEach(file => {
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, file);
    
    if (fs.existsSync(sourcePath)) {
      copyFile(sourcePath, targetPath);
    } else {
      console.warn(`文件不存在: ${sourcePath}`);
    }
  });
  
  console.log('GSAP文件复制完成!');
}

// 执行复制
copyGsapFiles(); 