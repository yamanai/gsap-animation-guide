<template>
  <div class="gsap-editor-wrapper" :class="{ 'edit-mode': isEditMode }">
    <!-- 添加标题区域 -->
    <div v-if="title" class="editor-title">
      {{ title }}
      <span
        class="gsap-editor-hint-inline"
        :class="{ 'is-hidden': isAnimationActive }"
      >
        请先点击"运行"按钮以激活动画和交互
      </span>
    </div>
    
    <!-- 标签控制区 -->
    <div class="editor-controls">
      <div class="editor-tabs">
        <button 
          v-for="tab in ['HTML', 'CSS', 'JS']" 
          :key="tab"
          :class="['tab-btn', { active: currentTab === tab && isEditMode }]"
          @click="toggleEditMode(tab)"
        >
          {{ tab }}
        </button>
      </div>
      <div class="editor-actions">
        <button class="run-btn" @click="runCode">运行</button>
        <button class="reset-btn" @click="resetEditor">重置</button>
      </div>
    </div>
    
    <!-- 主体内容区 -->
    <div class="editor-content">
      <!-- 编辑区域 - 只在编辑模式显示 -->
      <div v-show="isEditMode" class="editors-container">
        <div v-show="currentTab === 'HTML'" class="editor-area">
          <div ref="htmlEditor" class="cm-editor-container"></div>
        </div>
        
        <div v-show="currentTab === 'CSS'" class="editor-area">
          <div ref="cssEditor" class="cm-editor-container"></div>
        </div>
        
        <div v-show="currentTab === 'JS'" class="editor-area">
          <div ref="jsEditor" class="cm-editor-container"></div>
        </div>
      </div>
      
      <!-- 预览区域 - 始终显示 -->
      <div class="preview-area">
        <iframe ref="previewFrame" class="preview-frame"></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    initialHtml: { 
      type: String, 
      default: '<div class="animation-target"></div>' 
    },
    initialCss: { 
      type: String, 
      default: '.animation-target {\n  width: 100px;\n  height: 100px;\n  background-color: #ff6b6b;\n  margin: 100px auto;\n}' 
    },
    initialJs: { 
      type: String, 
      default: '// 尝试编辑这段代码\ngsap.to(".animation-target", {\n  duration: 1,\n  x: 100, // 减小水平移动距离，避免超出视口\n  rotation: 360,\n  backgroundColor: "#42b883"\n});' 
    }
  },
  
  setup(props) {
    // 状态控制
    const isEditMode = ref(false)
    const currentTab = ref('JS')
    const isAnimationActive = ref(false)
    
    // 内容状态
    const htmlContent = ref(props.initialHtml)
    const cssContent = ref(props.initialCss)
    const jsContent = ref(props.initialJs)
    
    // DOM引用
    const htmlEditor = ref(null)
    const cssEditor = ref(null)
    const jsEditor = ref(null)
    const previewFrame = ref(null)
    
    // 编辑器实例引用
    let htmlEditorView = null
    let cssEditorView = null
    let jsEditorView = null
    
    // 切换编辑模式
    const toggleEditMode = (tab) => {
      if (currentTab.value === tab && isEditMode.value) {
        // 如果点击的是当前激活的标签，则退出编辑模式
        isEditMode.value = false
      } else {
        // 否则进入编辑模式并切换到对应标签
        isEditMode.value = true
        currentTab.value = tab
        
        // 确保编辑器已创建
        if (!htmlEditorView && !cssEditorView && !jsEditorView) {
          // 延迟创建编辑器，确保DOM已渲染
          setTimeout(() => {
            createEditors()
          }, 0)
        }
      }
    }
    
    // 创建编辑器实例
    const createEditors = async () => {
      try {
        // 动态导入CodeMirror
        const { EditorState } = await import('@codemirror/state')
        const { EditorView } = await import('@codemirror/view')
        const { basicSetup } = await import('codemirror')
        // 导入语言支持
        const { html } = await import('@codemirror/lang-html')
        const { css } = await import('@codemirror/lang-css')
        const { javascript } = await import('@codemirror/lang-javascript')
        
        // 创建HTML编辑器
        if (htmlEditor.value && !htmlEditorView) {
          const startState = EditorState.create({
            doc: htmlContent.value,
            extensions: [
              basicSetup, 
              html(),
              // 确保编辑器有最小行数和支持换行
              EditorView.contentAttributes.of({
                style: 'min-height: 150px;'
              }),
              EditorView.lineWrapping,
              EditorView.theme({
                "&": { maxHeight: "400px" },
                ".cm-scroller": { overflow: "auto" }
              })
            ]
          })
          
          htmlEditorView = new EditorView({
            state: startState,
            parent: htmlEditor.value,
            dispatch: (tr) => {
              htmlEditorView.update([tr])
              if (tr.docChanged) {
                htmlContent.value = tr.state.doc.toString()
              }
              return true
            }
          })
        }
        
        // 创建CSS编辑器
        if (cssEditor.value && !cssEditorView) {
          const startState = EditorState.create({
            doc: cssContent.value,
            extensions: [
              basicSetup, 
              css(),
              // 确保编辑器有最小行数和支持换行
              EditorView.contentAttributes.of({
                style: 'min-height: 150px;'
              }),
              EditorView.lineWrapping,
              EditorView.theme({
                "&": { maxHeight: "400px" },
                ".cm-scroller": { overflow: "auto" }
              })
            ]
          })
          
          cssEditorView = new EditorView({
            state: startState,
            parent: cssEditor.value,
            dispatch: (tr) => {
              cssEditorView.update([tr])
              if (tr.docChanged) {
                cssContent.value = tr.state.doc.toString()
              }
              return true
            }
          })
        }
        
        // 创建JS编辑器
        if (jsEditor.value && !jsEditorView) {
          const startState = EditorState.create({
            doc: jsContent.value,
            extensions: [
              basicSetup, 
              javascript(),
              // 确保编辑器有最小行数和支持换行
              EditorView.contentAttributes.of({
                style: 'min-height: 150px;'
              }),
              EditorView.lineWrapping,
              EditorView.theme({
                "&": { maxHeight: "400px" },
                ".cm-scroller": { overflow: "auto" }
              })
            ]
          })
          
          jsEditorView = new EditorView({
            state: startState,
            parent: jsEditor.value,
            dispatch: (tr) => {
              jsEditorView.update([tr])
              if (tr.docChanged) {
                jsContent.value = tr.state.doc.toString()
              }
              return true
            }
          })
        }
      } catch (error) {
        console.error('创建编辑器失败:', error)
      }
    }
    
    // 运行代码
    const runCode = () => {
      if (!previewFrame.value) return
      isAnimationActive.value = true
      
      const frameDoc = previewFrame.value.contentDocument
      frameDoc.open()
      frameDoc.write(`
        <!DOCTYPE html>
        <html style="height:100%;margin:0;padding:0;">
        <head>
          <style>
            /* 基础样式确保内容填充整个预览区域 */
            html, body {
              height: 100%;
              margin: 0;
              padding: 0;
              overflow: auto;
            }
            body {
              display: flex;
              flex-direction: column;
              /* 增加预览容器高度，避免动画元素与内容重叠 */
              min-height: 400px;
              padding: 20px;
              position: relative;
            }
            /* 确保动画元素有足够的空间且不会与文本重叠 */
            .animation-target {
              position: relative;
              z-index: 2;
              /* 添加背景色以提高可见性 */
              background-color: rgba(255, 107, 107, 0.8);
            }
            /* 自定义样式 */
            ${cssContent.value}
          </style>
          <!-- 使用最新的GSAP CDN，包括核心库和所有免费插件 -->
          <script src="https://unpkg.com/gsap@3.12.5/dist/gsap.min.js"><\/script>
          <script src="https://unpkg.com/gsap@3.12.5/dist/ScrollTrigger.min.js"><\/script>
          <script src="https://unpkg.com/gsap@3.12.5/dist/Flip.min.js"><\/script>
          <script src="https://unpkg.com/gsap@3.12.5/dist/ScrollToPlugin.min.js"><\/script>
          <script src="https://unpkg.com/gsap@3.12.5/dist/Observer.min.js"><\/script>
          <script src="https://unpkg.com/gsap@3.12.5/dist/MotionPathPlugin.min.js"><\/script>
          <script src="https://unpkg.com/gsap@3.12.5/dist/EaselPlugin.min.js"><\/script>
          <script src="https://unpkg.com/gsap@3.12.5/dist/PixiPlugin.min.js"><\/script>
          <script src="https://unpkg.com/gsap@3.12.5/dist/TextPlugin.min.js"><\/script>
          <script src="https://unpkg.com/gsap@3.12.5/dist/DrawSVGPlugin.min.js"><\/script>
          <script src="https://unpkg.com/gsap@3.12.5/dist/MorphSVGPlugin.min.js"><\/script>
          <script src="https://unpkg.com/gsap@3.12.5/dist/SplitText.min.js"><\/script>
        </head>
        <body>
          ${htmlContent.value}
          <script>
            // 设置全局变量控制动画运行
            window.shouldRunAnimation = ${isAnimationActive.value};
            
            // GSAP插件加载检测
            function checkGSAPPluginsLoaded() {
              try {
                // 检查所有需要的插件是否可用
                return typeof gsap !== "undefined" && 
                  typeof ScrollTrigger !== "undefined" &&
                  typeof Flip !== "undefined" &&
                  typeof ScrollToPlugin !== "undefined" &&
                  typeof Observer !== "undefined" &&
                  typeof MotionPathPlugin !== "undefined" &&
                  typeof TextPlugin !== "undefined" &&
                  typeof DrawSVGPlugin !== "undefined" &&
                  typeof MorphSVGPlugin !== "undefined" &&
                  typeof SplitText !== "undefined";
                } catch (e) {
                console.warn("GSAP插件检测失败:", e);
                return false;
              }
            }

            // 重试加载GSAP
            let retryCount = 0;
            const maxRetries = 3;
            
            function retryLoadGSAP() {
              if (retryCount >= maxRetries) {
                console.error("GSAP加载失败，已达到最大重试次数");
                return;
              }
              
              retryCount++;
              console.log("尝试重新加载GSAP (" + retryCount + "/" + maxRetries + ")...");
              
              // 重新加载核心库和插件
              const script = document.createElement("script");
              script.src = "https://unpkg.com/gsap@3.12.5/dist/gsap.min.js";
              script.onload = loadPlugins;
              script.onerror = function() { setTimeout(retryLoadGSAP, 1000); };
              document.head.appendChild(script);
            }
            
            function loadPlugins() {
              const plugins = [
                "ScrollTrigger", "Flip", "ScrollToPlugin", "Observer", 
                "MotionPathPlugin", "EaselPlugin", "PixiPlugin", 
                "TextPlugin", "DrawSVGPlugin", "MorphSVGPlugin", "SplitText"
              ];
              
              let loaded = 0;
              
              plugins.forEach(function(plugin) {
                const script = document.createElement("script");
                script.src = "https://unpkg.com/gsap@3.12.5/dist/" + plugin + ".min.js";
                script.onload = function() {
                  loaded++;
                  if (loaded === plugins.length) {
                    initGSAP();
                  }
                };
                script.onerror = retryLoadGSAP;
                document.head.appendChild(script);
              });
            }
            
            function initGSAP() {
              // 确保GSAP已加载
              if (typeof gsap === "undefined") {
                console.error("GSAP核心库未加载");
                retryLoadGSAP();
                return;
              }
              
              try {
                // 关闭试用警告
                gsap.config({trialWarn: false});
                
                // 注册所有已加载的插件
                if (typeof ScrollTrigger !== "undefined") gsap.registerPlugin(ScrollTrigger);
                if (typeof Flip !== "undefined") gsap.registerPlugin(Flip);
                if (typeof ScrollToPlugin !== "undefined") gsap.registerPlugin(ScrollToPlugin);
                if (typeof Observer !== "undefined") gsap.registerPlugin(Observer);
                if (typeof MotionPathPlugin !== "undefined") gsap.registerPlugin(MotionPathPlugin);
                if (typeof EaselPlugin !== "undefined") gsap.registerPlugin(EaselPlugin);
                if (typeof PixiPlugin !== "undefined") gsap.registerPlugin(PixiPlugin);
                if (typeof TextPlugin !== "undefined") gsap.registerPlugin(TextPlugin);
                if (typeof DrawSVGPlugin !== "undefined") gsap.registerPlugin(DrawSVGPlugin);
                if (typeof MorphSVGPlugin !== "undefined") gsap.registerPlugin(MorphSVGPlugin);
                if (typeof SplitText !== "undefined") gsap.registerPlugin(SplitText);
                
                console.log("GSAP和插件初始化完成");
                
                // 如果应该运行动画，执行用户代码
                if (window.shouldRunAnimation) {
                  setTimeout(executeAnimation, 100);
                }
              } catch (e) {
                console.error("GSAP初始化失败:", e);
              }
            }
            
            function executeAnimation() {
              try {
                // 执行用户动画代码
                ${jsContent.value}
                console.log("动画代码执行完成");
              } catch (e) {
                console.error("动画代码执行错误:", e);
                }
            }
            
            // 使用MutationObserver监听DOM变化
            const observer = new MutationObserver(function(mutations) {
              if (checkGSAPPluginsLoaded()) {
                console.log("检测到GSAP已加载");
                observer.disconnect();
                initGSAP();
              }
            });
            
            // 开始监听DOM变化
            observer.observe(document, { childList: true, subtree: true });
            
            // DOM内容加载完成后检查GSAP是否已加载
            document.addEventListener("DOMContentLoaded", function() {
              if (checkGSAPPluginsLoaded()) {
                console.log("DOM加载完成，GSAP已就绪");
                observer.disconnect();
                initGSAP();
              } else {
                console.log("DOM加载完成，GSAP未就绪，将自动加载");
                retryLoadGSAP();
              }
            });
          <\/script>
        </body>
        </html>
      `)
      frameDoc.close()
    }
    
    // 添加一个新方法用于初始加载时显示预览但不执行动画
    const initPreview = () => {
      if (!previewFrame.value) return
      isAnimationActive.value = false;
      
      const frameDoc = previewFrame.value.contentDocument
      frameDoc.open()
      frameDoc.write(`
        <!DOCTYPE html>
        <html style="height:100%;margin:0;padding:0;">
        <head>
          <style>
            /* 基础样式确保内容填充整个预览区域 */
            html, body {
              height: 100%;
              margin: 0;
              padding: 0;
              overflow: auto;
            }
            body {
              display: flex;
              flex-direction: column;
              /* 增加预览容器高度，避免动画元素与内容重叠 */
              min-height: 400px;
              padding: 20px;
            }
            /* 自定义样式 */
            ${cssContent.value}
          </style>
          <!-- 使用最新的GSAP CDN，包括核心库和所有免费插件 -->
          <script src="https://unpkg.com/gsap@3.12.5/dist/gsap.min.js"><\/script>
        </head>
        <body>
          ${htmlContent.value}
          <script>
            // 设置全局变量控制动画运行
            window.shouldRunAnimation = false;
            
            // GSAP插件加载检测
            function checkGSAPPluginsLoaded() {
              try {
                return typeof gsap !== "undefined";
              } catch (e) {
                return false;
              }
            }

            // DOM内容加载完成后检查GSAP是否已加载
            document.addEventListener("DOMContentLoaded", function() {
              if (!checkGSAPPluginsLoaded()) {
                console.log("预览模式: GSAP未加载，尝试加载基本库");
                const script = document.createElement("script");
                script.src = "https://unpkg.com/gsap@3.12.5/dist/gsap.min.js";
                document.head.appendChild(script);
              }
            });
          <\/script>
        </body>
        </html>
      `)
      frameDoc.close()
    }
    
    // 重置编辑器
    const resetEditor = () => {
      htmlContent.value = props.initialHtml
      cssContent.value = props.initialCss
      jsContent.value = props.initialJs
      
      // 重置编辑器内容
      if (htmlEditorView) {
        const transaction = htmlEditorView.state.update({
          changes: {
            from: 0,
            to: htmlEditorView.state.doc.length,
            insert: props.initialHtml
          }
        })
        htmlEditorView.dispatch(transaction)
      }
      
      if (cssEditorView) {
        const transaction = cssEditorView.state.update({
          changes: {
            from: 0,
            to: cssEditorView.state.doc.length,
            insert: props.initialCss
          }
        })
        cssEditorView.dispatch(transaction)
      }
      
      if (jsEditorView) {
        const transaction = jsEditorView.state.update({
          changes: {
            from: 0,
            to: jsEditorView.state.doc.length,
            insert: props.initialJs
          }
        })
        jsEditorView.dispatch(transaction)
      }
      
      // 加载预览但不执行动画
      initPreview()
      isAnimationActive.value = false
    }
    
    // 监听内容变化自动运行代码（可选，取消注释启用）
    /* 
    watch([htmlContent, cssContent, jsContent], () => {
      runCode()
    }, { deep: true })
    */
    
    // 组件挂载后初始化
    onMounted(() => {
      // 初始加载时只显示预览，不执行动画
      initPreview()
    })
    
    return {
      isEditMode,
      currentTab,
      htmlContent,
      cssContent,
      jsContent,
      htmlEditor,
      cssEditor,
      jsEditor,
      previewFrame,
      toggleEditMode,
      runCode,
      resetEditor,
      isAnimationActive
    }
  }
}
</script>

<style>
.gsap-editor-wrapper {
  margin: 2.5rem 0;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-soft);
  transition: box-shadow 0.3s, transform 0.3s;
  width: 100%; /* 使组件占据全宽 */
  max-width: 100%;
}

.editor-title {
  padding: 10px 16px;
  font-weight: 600;
  font-size: 1.1em;
  color: var(--vp-c-text-1);
  border-bottom: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-soft);
}

.gsap-editor-wrapper:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.editor-controls {
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.editor-tabs {
  display: flex;
  gap: 10px;
}

.tab-btn {
  background: none;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  color: var(--vp-c-text-2);
  transition: all 0.25s;
}

.tab-btn:hover {
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-mute);
}

.tab-btn.active {
  background-color: var(--vp-c-brand-dimm);
  color: var(--vp-c-brand);
}

.editor-actions {
  display: flex;
  gap: 8px;
}

.run-btn, .reset-btn {
  padding: 6px 12px;
  border-radius: 6px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s;
}

.run-btn {
  background-color: var(--vp-c-brand);
  color: var(--vp-c-white);
}

.run-btn:hover {
  background-color: var(--vp-c-brand-dark);
}

.reset-btn {
  background-color: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
}

.reset-btn:hover {
  background-color: var(--vp-c-gray-light-4);
}

.editor-content {
  display: flex;
  flex-direction: column;
}

.edit-mode .editor-content {
  flex-direction: column;
  height: auto;
}

.editors-container {
  height: 250px;
  border-bottom: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-alt);
  overflow-y: auto; /* 添加垂直滚动 */
}

.cm-editor-container {
  height: 100%;
  font-family: 'Fira Code', monospace;
  font-size: 14px;
  overflow: auto; /* 添加滚动功能 */
  max-height: 400px; /* 限制最大高度，与预览区域一致 */
}

.preview-area {
  min-height: 400px; /* 恢复为原来的高度 */
  height: auto; /* 取消固定高度 */
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden; /* 防止溢出 */
}

.preview-frame {
  width: 100%;
  height: 100%; /* 使iframe填充预览区 */
  min-height: 400px; /* 最小高度 */
  border: none;
  background-color: white;
}

/* 暗色模式适配 */
.dark .preview-frame {
  background-color: #1a1a1a;
}

.dark .preview-area {
  background-color: #1a1a1a;
}

/* CSS编辑器暗色模式样式 */
.dark .cm-editor {
  background-color: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
}

/* 编辑器样式与主题适配 */
.cm-editor .cm-content {
  font-family: 'Fira Code', monospace, Menlo, Monaco, Consolas, 'Courier New';
  font-size: 14px;
  line-height: 1.5;
}

/* 更宽屏幕下的优化布局 */
@media (min-width: 960px) {
  .edit-mode .editor-content {
    flex-direction: row;
    height: auto; /* 恢复为自适应高度 */
  }
  
  .edit-mode .editors-container {
    width: 50%;
    height: 400px; /* 恢复为原来的高度 */
    border-bottom: none;
    border-right: 1px solid var(--vp-c-divider);
    overflow-y: auto; /* 确保可以滚动 */
  }
  
  .edit-mode .preview-area {
    width: 50%;
    height: 400px; /* 恢复为原来的高度 */
  }
}

.gsap-editor-hint-inline {
  display: inline-block;
  margin-left: 18px;
  padding: 2px 12px;
  background: #fffbe6;
  color: #ad8b00;
  border: 1px solid #ffe58f;
  border-radius: 12px;
  font-size: 13px;
  vertical-align: middle;
  line-height: 1.6;
  box-shadow: 0 1px 4px rgba(255, 215, 0, 0.06);
  white-space: nowrap;
  max-width: 60%;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: opacity 0.2s, visibility 0.2s;
}
.gsap-editor-hint-inline.is-hidden {
  visibility: hidden;
  opacity: 0;
}
@media (max-width: 600px) {
  .gsap-editor-hint-inline {
    display: block;
    margin: 8px 0 0 0;
    max-width: 100%;
    white-space: normal;
    text-align: left;
  }
}
</style> 