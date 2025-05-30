<template>
  <div class="disable-code-links">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'DisableCodeLinks',
  mounted() {
    // 在组件挂载后，查找所有代码元素并添加样式
    this.$nextTick(() => {
      const codeElements = this.$el.querySelectorAll('code, pre code, .language-javascript .token');
      
      codeElements.forEach(element => {
        // 移除可能的事件监听器
        element.style.pointerEvents = 'none';
        element.style.cursor = 'text';
        element.style.textDecoration = 'none';
        
        // 遍历子元素，确保它们也不可点击
        const children = element.querySelectorAll('*');
        children.forEach(child => {
          child.style.pointerEvents = 'none';
          child.style.cursor = 'text';
          child.style.textDecoration = 'none';
        });
      });
    });
  }
}
</script>

<style>
.disable-code-links {
  /* 在容器中应用样式 */
}
.disable-code-links code,
.disable-code-links pre,
.disable-code-links .token,
.disable-code-links [class*="language-"] {
  pointer-events: none !important;
  cursor: text !important;
  text-decoration: none !important;
  background-image: none !important;
}
/* 重写shiki语法高亮器中可能的链接样式 */
.disable-code-links .shiki a {
  pointer-events: none !important;
  cursor: text !important;
  color: inherit !important;
  text-decoration: none !important;
  background-image: none !important;
}
</style> 