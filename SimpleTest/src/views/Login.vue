<script setup lang="ts">
import logo from "../assets/logo.png";
import fireLoading from "../assets/fire-loading.gif";
import { ref } from "vue";
import Form from "../components/Login.Register.Form.vue";
import { toast } from 'vue3-toastify';
import { router } from "../Router";
const isLoginRef = ref(true)
const loginErrRef = ref(false)
const registerErrRef = ref(false)
const loadingRef = ref(false)
const loginFormRef = ref({
  userName: '',
  password: ''
})
const registerFormRef = ref({
  userName: '',
  email: "",
  password: ''
})
const onSubmit = (formData: typeof loginFormRef.value | typeof registerFormRef.value) => {
  if (isLoginRef.value) {
    loadingRef.value = true
    fetch("/api/login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "text/plain",
      },
      body: JSON.stringify(formData)
    })
      .then((response) => response.json())
      .then((res) => {
        const isDark = Array.from(document.documentElement.classList.values()).includes('dark')
        if (res.status == 200) {
          router.replace('/')
          toast('登陆成功', {
            theme: isDark ? 'dark' : 'light',
            autoClose: 1000,
          });
        } else {
          loginErrRef.value = true
          toast(res.errmsg, {
            theme: isDark ? 'dark' : 'light',
            type: "error",
            autoClose: 1000,
          });
        }
      })
      .catch((err) => {
      })
      .finally(() => {
        loadingRef.value = false
      })
      ;
  } else {
    // fetch()
  }

}

</script>

<template>
  <section class="login-page">
    <div :class="{ wrapper: true, active: !isLoginRef }" class="dark:bg-black">
      <Form is-login :form-data="loginFormRef" @submit="onSubmit" :is-err="loginErrRef"
        @err-change="val => loginErrRef = val" />
      <Form :form-data="registerFormRef" @submit="onSubmit" :is-err="registerErrRef"
        @err-change="val => registerErrRef = val" />
      <div class="toggle-box">
        <div class="toggle-panel toggle-left">
          <img :src="logo" alt="google" class="w-[6.25rem] mobile:w-[12.5rem] object-contain">
          <h1 class="dark:text-black">Hello, Welcome!</h1>
          <p class="dark:text-black">Don't have an account?</p>
          <button aria-label="switch register" class="btn register-btn dark:text-black"
            @click="isLoginRef = false">Register</button>
        </div>

        <div class="toggle-panel toggle-right">
          <img :src="logo" alt="google" class="w-[6.25rem] mobile:w-[12.5rem] object-contain">
          <h1 class="dark:text-black">Welcome Back!</h1>
          <p class="dark:text-black">Already have an account?</p>
          <button aria-label="switch login" class="btn login-btn dark:text-black"
            @click="isLoginRef = true">Login</button>
        </div>
      </div>
    </div>
    <div v-show="loadingRef" class="flex fixed w-screen h-screen bg-[#151515] items-center justify-center z-10">
      <img :src="fireLoading" alt="loading" class="object-contain w-[1200px]">
    </div>
  </Section>
</template>
