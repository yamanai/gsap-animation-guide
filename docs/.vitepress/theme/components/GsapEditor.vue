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
      default: '// 尝试编辑这段代码\ngsap.to(".animation-target", {\n  duration: 1,\n  x: 150,\n  rotation: 360,\n  backgroundColor: "#42b883"\n});' 
    }
  },
  
  setup(props) {
    // 状态控制
    const isEditMode = ref(false)
    const currentTab = ref('JS')
    
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
            // 创建一个全局变量来控制是否执行动画
            window.shouldRunAnimation = true;
            
            document.addEventListener('DOMContentLoaded', function() {
              if (window.shouldRunAnimation) {
                try {
                  ${jsContent.value}
                } catch (e) {
                  console.error('执行错误:', e)
                }
              }
            })
          <\/script>
        </body>
        </html>
      `)
      frameDoc.close()
    }
    
    // 添加一个新方法用于初始加载时显示预览但不执行动画
    const initPreview = () => {
      if (!previewFrame.value) return
      
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
            // 设置为不执行动画
            window.shouldRunAnimation = false;
            
            document.addEventListener('DOMContentLoaded', function() {
              // 这里不会执行动画代码
            })
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
      resetEditor
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
}

.cm-editor-container {
  height: 100%;
  font-family: 'Fira Code', monospace;
  font-size: 14px;
}

.preview-area {
  min-height: 400px; /* 更大的预览区域高度 */
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-frame {
  width: 100%;
  height: 400px; /* 更大的预览区域高度 */
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
  }
  
  .edit-mode .editors-container {
    width: 50%;
    height: 400px;
    border-bottom: none;
    border-right: 1px solid var(--vp-c-divider);
  }
  
  .edit-mode .preview-area {
    width: 50%;
  }
}
</style> 