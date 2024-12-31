<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from "vue-router";
const router = useRouter();
const isDarkRef = ref(false)
// 根据具体情况判断是否重定向到login还是dashboard页面
router.replace("/login");

const onToggleTheme = () => {
  isDarkRef.value = !isDarkRef.value
  if (isDarkRef.value) {
    document.documentElement.classList.add("dark")
    return
  }
  document.documentElement.classList.remove("dark")
}
</script>

<template>
  <toggle-button @click="onToggleTheme"
    class="absolute scale-[30%] laptop:scale-50 top-4 laptop:top-10 right-8 laptop:right-16"></toggle-button>
  <RouterView />
</template>
