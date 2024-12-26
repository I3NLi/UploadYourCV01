<script setup>
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)

function toggleBtnOnclick() {
  toggleDark()
}
</script>

<template>
  <div class="container background">
    <main>
      <header>
        <text class="text-logo">HIYIO</text>
      </header>
      <section>
        <router-view v-slot="{ Component, route }">
          <transition name="fade">
            <component :is="Component" :key="route.path"/>
          </transition>
        </router-view>
      </section>
    </main>
    <el-button class="toggle-btn" circle size="large" @click="toggleBtnOnclick">
      <el-icon v-show="!isDark" size="large"><Sunny /></el-icon>
      <el-icon v-show="isDark" size="large"><Moon /></el-icon>
    </el-button>
  </div>
</template>

<style scoped>
@import url('@/styles/background.css');
@import url('@/styles/animation/text-logo.css');

.container {
  width: 100vw;
  height: 100vh;
}

.toggle-btn {
  position: fixed;
  bottom: 50px;
  right: 50px;
  border: 1px solid var(--el-color-primary-light-5);
}

main {
  display: grid;
  height: 100%;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(12, 1fr);
  gap: 32px;
  margin: 0 auto;
  align-items: center;

  header {
    grid-column: 3 / 6;
    
    text {
      font-size: 4rem;
    }
  }

  section {
    grid-column: 8 / 12;
    background-color: var(--card-bg);
    border-radius: 5px;
    padding: 40px 56px;
    height: 320px;
    width: 330px;
  }
}

@media screen and (max-width: 1200px) {
  header {
    display: none;
  }

  main {
    width: 90%;
    display: flex;
    justify-content: center;
  }
}

@media screen and (max-width: 510px) {
  main {
    width: 100%;
    display: flex;
    justify-content: center;

    section {
      box-sizing: border-box;
      width: 100vw;
      height: 100vh;
    }
  }
}

.fade-enter-active {
  transition: opacity 0.8s ease;
}

.fade-leave-active {
  transition: opacity 0.02s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
