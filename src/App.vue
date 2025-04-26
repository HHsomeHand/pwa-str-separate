<script setup>
const input = ref("");

const result = ref("");

// 输入"hzx", 输出 "['h', 'z', 'x']"
function splitStringToText(str) {
  let content = str.split('') // "hzx" -> ["h", "z", "x"]
      .map(ch => `'${ch}'`) // ["h", "z", "x"] -> ["'h'", "'z'", "'x'"]
      .join(', ') // ["'h'", "'z'", "'x'"] -> "'h', 'z', 'x'"
  return '{' + content + '}';
}

watch(input, (newValue) => {
  result.value = splitStringToText(newValue);
}, {immediate: true});

function onCopyBtnClick() {
  copyText(result.value);
}

/**
 * 复制字符串到剪贴板，并显示提示
 * @param {string} text - 要复制的字符串
 * @returns {Promise<void>}
 */
async function copyText(text) {
  try {
    // 检查输入是否为字符串且不为空
    if (typeof text !== 'string' || text.trim() === '') {
      throw new Error('输入的文本无效');
    }

    // 使用 Clipboard API 复制文本
    await navigator.clipboard.writeText(text);

    // 复制成功，显示成功提示
    ElMessage({
      message: '复制成功！',
      type: 'success',
      duration: 2000, // 提示显示2秒
    });
  } catch (error) {
    // 复制失败，显示错误提示
    ElMessage({
      message: '复制失败：' + error.message,
      type: 'error',
      duration: 3000, // 错误提示显示3秒
    });
  }
}
</script>

<template>
  <div class="app">
    <div class="app__container">
      <el-input
          v-model="input"
          class="app__input"
          type="textarea"
          autosize
          placeholder="Please input"
      />

      <el-input
          v-model="result"
          class="app__input"
          type="textarea"
          readonly
          autosize
      />

      <el-button type="primary" @click="onCopyBtnClick">复制!</el-button>
    </div>
  </div>
</template>

<style scoped>
@import "tailwindcss";

.app {
  @apply w-screen h-screen flex justify-center items-center;
}

.app__container {
  @apply flex flex-col gap-3 w-50;
}
</style>
