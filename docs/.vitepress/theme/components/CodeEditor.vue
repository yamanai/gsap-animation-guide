<template>
  <div class="gsap-editor-wrapper" :class="{ 'edit-mode': isEditMode }">
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
        <span v-if="title" class="editor-title">{{ title }}</span>
        <button class="run-btn" @click="runCode">运行</button>
        <button class="reset-btn" @click="resetEditor">重置</button>
      </div>
    </div>
    
    <!-- 主体内容区 -->
    <div class="editor-content" :style="{ height }">
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
        <div v-if="hasError" class="error-message">{{ errorMessage }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { useData } from 'vitepress'

export default {
  props: {
    title: {
      type: String,
      default: 'GSAP动画代码'
    },
    initialCode: {
      type: String,
      default: `// 尝试编辑这段代码
gsap.to(".animation-target", {
  duration: 1,
  x: 150,
  rotation: 360,
  backgroundColor: "#42b883",
  ease: "power2.inOut"
});`
    },
    initialHtml: { 
      type: String, 
      default: '<div class="animation-target"></div>' 
    },
    initialCss: { 
      type: String, 
      default: '.animation-target {\n  width: 100px;\n  height: 100px;\n  background-color: #ff6b6b;\n  margin: 100px auto;\n}' 
    },
    height: {
      type: String,
      default: '400px'
    }
  },
  
  setup(props) {
    // 获取VitePress主题数据
    const { isDark } = useData()
    
    // 状态控制
    const isEditMode = ref(false)
    const currentTab = ref('JS')
    const hasError = ref(false)
    const errorMessage = ref('')
    
    // 内容状态 - 向后兼容
    const htmlContent = ref(props.initialHtml)
    const cssContent = ref(props.initialCss)
    const jsContent = ref(props.initialCode) // 注意这里使用initialCode兼容旧接口
    
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
        const { EditorView, lineNumbers, highlightActiveLineGutter, highlightSpecialChars, drawSelection, keymap } = await import('@codemirror/view')
        const { defaultKeymap, history, historyKeymap } = await import('@codemirror/commands')
        const { syntaxHighlighting, HighlightStyle } = await import('@codemirror/language')
        const { tags } = await import('@lezer/highlight')
        const { oneDark } = await import('@codemirror/theme-one-dark')
        
        // 导入语言支持
        const { html } = await import('@codemirror/lang-html')
        const { css } = await import('@codemirror/lang-css')
        const { javascript } = await import('@codemirror/lang-javascript')
        
        // 创建暗色主题的高亮样式
        const darkHighlightStyle = HighlightStyle.define([
          { tag: tags.keyword, color: "#c678dd", fontWeight: "bold" },
          { tag: tags.comment, color: "#5c6370", fontStyle: "italic" },
          { tag: tags.string, color: "#98c379" },
          { tag: tags.number, color: "#d19a66" },
          { tag: tags.operator, color: "#56b6c2" },
          { tag: tags.typeName, color: "#e06c75" },
          { tag: tags.propertyName, color: "#61afef" },
          { tag: tags.variableName, color: "#e6c07b" },
          { tag: tags.function(tags.variableName), color: "#61afef" },
          { tag: tags.definition(tags.propertyName), color: "#e06c75" },
        ])
        
        // 创建亮色主题的高亮样式
        const lightHighlightStyle = HighlightStyle.define([
          { tag: tags.keyword, color: "#0000ff", fontWeight: "bold" },
          { tag: tags.comment, color: "#008000", fontStyle: "italic" },
          { tag: tags.string, color: "#a31515" },
          { tag: tags.number, color: "#098658" },
          { tag: tags.operator, color: "#000000" },
          { tag: tags.typeName, color: "#267f99" },
          { tag: tags.propertyName, color: "#795e26" },
          { tag: tags.variableName, color: "#001080" },
          { tag: tags.function(tags.variableName), color: "#795e26" },
          { tag: tags.definition(tags.propertyName), color: "#267f99" },
        ])
        
        // 自定义暗色主题
        const darkTheme = EditorView.theme({
          "&": {
            backgroundColor: "#282c34",
            color: "#abb2bf"
          },
          ".cm-content": {
            caretColor: "#528bff",
          },
          ".cm-cursor": {
            borderLeftColor: "#528bff",
            borderLeftWidth: "2px",
          },
          ".cm-activeLine": {
            backgroundColor: "rgba(90, 90, 90, 0.3)",
          },
          ".cm-activeLineGutter": {
            backgroundColor: "rgba(80, 80, 80, 0.4)",
          },
          ".cm-gutters": {
            backgroundColor: "#282c34",
            color: "#5c6370",
            border: "none",
            borderRight: "1px solid #3a3f4b",
          },
          ".cm-lineNumbers": {
            minWidth: "3em",
            color: "#5c6370",
          },
          ".cm-selectionBackground": {
            backgroundColor: "#3e4451",
          },
          ".cm-matchingBracket": {
            backgroundColor: "rgba(99, 123, 156, 0.2)",
            outline: "1px solid #c678dd",
          },
        }, { dark: true })
        
        // 自定义亮色主题
        const lightTheme = EditorView.theme({
          "&": {
            backgroundColor: "#ffffff",
            color: "#000000"
          },
          ".cm-content": {
            caretColor: "#000000",
          },
          ".cm-cursor": {
            borderLeftColor: "#000000",
            borderLeftWidth: "2px",
          },
          ".cm-activeLine": {
            backgroundColor: "#f5f5f5",
          },
          ".cm-activeLineGutter": {
            backgroundColor: "#f0f0f0",
          },
          ".cm-gutters": {
            backgroundColor: "#f8f8f8",
            color: "#999999",
            border: "none",
            borderRight: "1px solid #ddd",
          },
          ".cm-lineNumbers": {
            minWidth: "3em",
            color: "#999999",
          },
          ".cm-selectionBackground": {
            backgroundColor: "#bcd6fd",
          },
          ".cm-matchingBracket": {
            backgroundColor: "#bbf1bb",
            outline: "1px solid #7bd37b",
          },
        }, { dark: false })
        
        // 根据当前主题选择样式
        const theme = isDark.value ? darkTheme : lightTheme
        const highlightStyle = isDark.value ? darkHighlightStyle : lightHighlightStyle
        
        // 公共编辑器扩展
        const commonExtensions = [
          lineNumbers(),
          highlightActiveLineGutter(),
          highlightSpecialChars(),
          history(),
          drawSelection(),
          syntaxHighlighting(highlightStyle),
          theme,
          keymap.of([
            ...defaultKeymap,
            ...historyKeymap
          ])
        ]
        
        // 创建HTML编辑器
        if (htmlEditor.value && !htmlEditorView) {
          const startState = EditorState.create({
            doc: htmlContent.value,
            extensions: [...commonExtensions, html(),
              // 确保编辑器有最小行数
              EditorView.contentAttributes.of({
                style: 'min-height: 150px;'
              }),
              EditorView.lineWrapping
            ]
          })
          
          htmlEditorView = new EditorView({
            state: startState,
            parent: htmlEditor.value,
            dispatch: (tr) => {
              htmlEditorView.update([tr])
              if (tr.docChanged) {
                htmlContent.value = tr.state.doc.toString()
                hasError.value = false
                errorMessage.value = ''
              }
              return true
            }
          })
        }
        
        // 创建CSS编辑器
        if (cssEditor.value && !cssEditorView) {
          const startState = EditorState.create({
            doc: cssContent.value,
            extensions: [...commonExtensions, css(),
              // 确保编辑器有最小行数
              EditorView.contentAttributes.of({
                style: 'min-height: 150px;'
              }),
              EditorView.lineWrapping
            ]
          })
          
          cssEditorView = new EditorView({
            state: startState,
            parent: cssEditor.value,
            dispatch: (tr) => {
              cssEditorView.update([tr])
              if (tr.docChanged) {
                cssContent.value = tr.state.doc.toString()
                hasError.value = false
                errorMessage.value = ''
              }
              return true
            }
          })
        }
        
        // 创建JS编辑器
        if (jsEditor.value && !jsEditorView) {
          const startState = EditorState.create({
            doc: jsContent.value,
            extensions: [...commonExtensions, javascript(),
              // 确保编辑器有最小行数
              EditorView.contentAttributes.of({
                style: 'min-height: 150px;'
              }),
              EditorView.lineWrapping
            ]
          })
          
          jsEditorView = new EditorView({
            state: startState,
            parent: jsEditor.value,
            dispatch: (tr) => {
              jsEditorView.update([tr])
              if (tr.docChanged) {
                jsContent.value = tr.state.doc.toString()
                hasError.value = false
                errorMessage.value = ''
              }
              return true
            }
          })
        }
      } catch (error) {
        console.error('创建编辑器失败:', error)
        errorMessage.value = `编辑器加载失败: ${error.message}`
        hasError.value = true
      }
    }
    
    // 运行代码
    const runCode = () => {
      if (!previewFrame.value) return
      
      try {
        const frameDoc = previewFrame.value.contentDocument
        frameDoc.open()
        frameDoc.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <style>${cssContent.value}</style>
            <script src="https://unpkg.com/gsap@3.12.5/dist/gsap.min.js"><\/script>
          </head>
          <body>
            ${htmlContent.value}
            <script>
              document.addEventListener('DOMContentLoaded', function() {
                try {
                  ${jsContent.value}
                } catch (e) {
                  console.error('执行错误:', e)
                  parent.postMessage({ type: 'error', message: e.message }, '*')
                }
              })
            <\/script>
          </body>
          </html>
        `)
        frameDoc.close()
        hasError.value = false
        errorMessage.value = ''
      } catch (error) {
        console.error('运行代码出错:', error)
        hasError.value = true
        errorMessage.value = error.message
      }
    }
    
    // 重置编辑器
    const resetEditor = () => {
      htmlContent.value = props.initialHtml
      cssContent.value = props.initialCss
      jsContent.value = props.initialCode // 使用initialCode以兼容
      
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
            insert: props.initialCode // 使用initialCode以兼容
          }
        })
        jsEditorView.dispatch(transaction)
      }
      
      hasError.value = false
      errorMessage.value = ''
      
      // 运行重置后的代码
      runCode()
    }
    
    // 复制代码到剪贴板 (为了兼容旧接口)
    const copyCode = async () => {
      try {
        await navigator.clipboard.writeText(jsContent.value)
        alert('代码已复制到剪贴板')
      } catch (err) {
        console.error('复制代码失败:', err)
        alert('复制代码失败，请手动复制')
      }
    }
    
    // 旧接口兼容 - 重置目标元素
    const resetTarget = () => {
      resetEditor()
    }
    
    // 监听错误消息
    const setupErrorListener = () => {
      const handleMessage = (event) => {
        if (event.data && event.data.type === 'error') {
          hasError.value = true
          errorMessage.value = event.data.message
        }
      }
      
      window.addEventListener('message', handleMessage)
      return () => {
        window.removeEventListener('message', handleMessage)
      }
    }
    
    // 监听主题变化
    watch(() => isDark.value, (newVal) => {
      // 如果编辑器已创建，则需要重新创建以应用新主题
      if (htmlEditorView || cssEditorView || jsEditorView) {
        htmlEditorView = null
        cssEditorView = null
        jsEditorView = null
        if (isEditMode.value) {
          setTimeout(() => createEditors(), 0)
        }
      }
    })
    
    // 组件挂载后初始化
    onMounted(() => {
      // 设置错误监听
      const cleanupListener = setupErrorListener()
      
      // 第一次运行代码
      runCode()
      
      // 组件卸载时清理
      return () => {
        cleanupListener()
        if (htmlEditorView) htmlEditorView.destroy()
        if (cssEditorView) cssEditorView.destroy()
        if (jsEditorView) jsEditorView.destroy()
      }
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
      hasError,
      errorMessage,
      toggleEditMode,
      runCode,
      resetEditor,
      copyCode,
      resetTarget // 兼容旧接口
    }
  }
}
</script>

<style>
/* 基础容器样式 */
.gsap-editor-wrapper {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  margin: 24px 0;
  display: flex;
  flex-direction: column;
  height: 500px; /* 固定高度，可以调整 */
  --editor-header-bg: var(--vp-c-bg-soft, #f6f6f7);
  --editor-border: var(--vp-c-divider, #e2e2e3);
  --editor-radius: 12px;
  --tab-active-color: var(--vp-c-brand, #42b883);
  --tab-hover-bg: rgba(0, 0, 0, 0.04);
  position: relative;
  backdrop-filter: blur(10px);
  border: 1px solid var(--editor-border);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.gsap-editor-wrapper:hover {
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.14);
}

/* 控制区样式优化 */
.editor-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--editor-header-bg);
  border-bottom: 1px solid var(--editor-border);
  padding: 0 4px 0 0;
  z-index: 10;
  height: 48px;
}

.editor-tabs {
  display: flex;
  height: 100%;
}

.editor-title {
  font-weight: 500;
  margin-right: 10px;
  display: flex;
  align-items: center;
  color: var(--vp-c-text-1);
}

.tab-btn {
  padding: 0 24px;
  height: 100%;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  transition: all 0.25s ease;
  position: relative;
  overflow: hidden;
}

.tab-btn::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 3px;
  background: var(--tab-active-color);
  transform: translateX(-50%);
  transition: width 0.25s ease;
  border-radius: 3px 3px 0 0;
}

.tab-btn:hover {
  background: var(--tab-hover-bg);
  color: var(--vp-c-text-1);
}

.tab-btn.active {
  color: var(--tab-active-color);
  font-weight: bold;
}

.tab-btn.active::after {
  width: 70%;
}

.editor-actions {
  display: flex;
  align-items: center;
  padding-right: 12px;
  gap: 10px;
}

.run-btn, .reset-btn {
  padding: 6px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.run-btn {
  background: var(--tab-active-color);
  color: white;
  box-shadow: 0 2px 6px rgba(66, 184, 131, 0.2);
}

.reset-btn {
  background: transparent;
  color: var(--vp-c-text-2);
  border: 1px solid var(--editor-border);
}

.run-btn:hover {
  background: var(--vp-c-brand-dark, #33a06f);
  box-shadow: 0 4px 8px rgba(66, 184, 131, 0.3);
}

.reset-btn:hover {
  color: var(--vp-c-text-1);
  background: var(--tab-hover-bg);
}

/* 内容区样式 */
.editor-content {
  display: flex;
  flex: 1;
  overflow: hidden;
  position: relative;
  height: 400px;
}

/* 编辑器容器 */
.editors-container {
  width: 50%;
  height: 100%;
  border-right: 1px solid var(--editor-border);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
}

.editor-area {
  height: 100%;
  overflow: auto;
}

.cm-editor-container {
  height: 100%;
  width: 100%;
  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.05);
  min-height: 200px; /* 确保编辑器有最小高度 */
}

/* 确保CodeMirror编辑器内容区域有最小高度 */
:deep(.cm-content) {
  min-height: 150px; /* 最小高度，相当于约8-10行代码 */
  padding: 10px 0;
}

:deep(.cm-scroller) {
  font-family: 'JetBrains Mono', Menlo, Monaco, Consolas, 'Courier New', monospace;
  line-height: 1.6;
  font-size: 14px;
  min-height: 150px; /* 最小高度 */
}

/* 当内容少于最小高度时，确保光标等元素仍然显示正确 */
:deep(.cm-line) {
  padding: 0 8px;
  min-height: 1.6em;
}

/* 当没有足够内容时，添加一些底部填充 */
:deep(.cm-content:has(.cm-line:last-child)) {
  padding-bottom: 100px;
}

/* 确保编辑器至少显示一些空行 */
:deep(.cm-editor) {
  height: 100%;
}

/* 预览区域 */
.preview-area {
  flex: 1;
  height: 100%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: white;
  position: relative;
}

.preview-frame {
  width: 100%;
  height: 100%;
  border: none;
  background: white;
}

.error-message {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px 16px;
  background: rgba(255, 50, 50, 0.9);
  color: white;
  font-size: 14px;
  font-weight: 500;
  z-index: 10;
  backdrop-filter: blur(4px);
  border-top: 1px solid rgba(255, 100, 100, 0.2);
  box-shadow: 0 -2px 10px rgba(255, 50, 50, 0.1);
  animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* 编辑模式与预览模式的样式切换 */
.edit-mode .editors-container {
  width: 50%;
  display: block;
}

.edit-mode .preview-area {
  width: 50%;
}

/* 默认预览模式下的样式 */
.editors-container {
  width: 0;
}

.preview-area {
  width: 100%;
}

/* 编辑器切换动画 */
.editors-container, .preview-area {
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* CodeMirror 样式优化 */
:deep(.cm-editor) {
  height: 100%;
}

:deep(.cm-scroller) {
  font-family: 'JetBrains Mono', Menlo, Monaco, Consolas, 'Courier New', monospace;
  line-height: 1.6;
  font-size: 14px;
}

:deep(.cm-gutters) {
  border-right: 1px solid var(--editor-border);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .edit-mode .editor-content {
    flex-direction: column;
}

  .edit-mode .editors-container,
  .edit-mode .preview-area {
    width: 100%;
    height: 50%;
  }
  
  .editors-container {
    border-right: none;
    border-bottom: 1px solid var(--editor-border);
}

  .tab-btn {
    padding: 0 15px;
    font-size: 13px;
}

  .run-btn, .reset-btn {
    padding: 5px 12px;
    font-size: 13px;
}

  .gsap-editor-wrapper {
    border-radius: 8px;
    height: 600px;
  }
}

/* 暗黑模式优化 */
@media (prefers-color-scheme: dark) {
  .preview-area, .preview-frame {
    background: #1a1a1a;
  }
}
</style> 