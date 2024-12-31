<script setup lang="ts">
import validator from 'validator';
import { computed, ref } from "vue";
interface Props {
  isLogin?: boolean,
  isErr?: boolean,
  formData: {
    userName: string,
    email?: string,
    password: string
  }
}
const { isLogin = false, formData, isErr = false } = defineProps<Props>()
const emit = defineEmits(['submit','errChange'])
const errRef = computed({get:() => isErr,set(val){
  emit('errChange',val)
}})
const onSubmit = () => {
  emit('submit', formData)
}

const isEmail = computed(() => {
  if (isLogin || !formData.email) return true
  return validator.isEmail(formData.email ?? '')
})

const isStrongPass = computed(() => {
  if (!formData.password) return true
  return validator.isStrongPassword(formData.password ?? '')
})

const onInput = () => {
  console.log("🚀 ~ onInput ~  errRef.value:",  errRef.value)

  errRef.value && (errRef.value = false)
}

</script>

<template>
  <div :class="{ 'form-box': true, login: isLogin, register: !isLogin }" class="dark:bg-black">
    <form>
      <h1 class="dark:text-white">{{ isLogin ? 'Login' : 'Registration' }}</h1>
      <div class="input-box">
        <input aria-placeholder="username input" :class="{ 'border-[1px] border-red-500': errRef }"
          class="focus:border-x-0 focus:border-t-0 focus:border-b-[1px] focus:border-b-[#333]" type="text"
          placeholder="Username" v-model="formData.userName" @input="onInput">
        <box-icon :class="{'animate__swing': errRef  }"   type='solid' name='user' color="#888"></box-icon>
      </div>
      <div class="input-box" v-if="!isLogin">
        <input aria-placeholder="email input" :class="{ 'border-[1px] border-red-500': errRef }"
          class="focus:border-x-0 focus:border-t-0 focus:border-b-[1px] focus:border-b-[#333]" type="email"
          placeholder="Email" v-model="formData.email">
        <box-icon :class="{ 'animate__swing': errRef }" type='solid' name='envelope' color="#888"></box-icon>
        <div class="absolute text-sm text-red-400" v-show="!isEmail">不是一个标准的email</div>
      </div>
      <div class="input-box">
        <input aria-placeholder="password input" :class="{ 'border-[1px] border-red-500': errRef }"
          class="focus:border-x-0 focus:border-t-0 focus:border-b-[1px] focus:border-b-[#333]" type="password"
          placeholder="Password" v-model="formData.password">
        <box-icon :class="{ 'animate__swing': errRef }" type='solid' name='lock-alt' color="#888"></box-icon>
        <div class="absolute text-sm text-red-400" v-show="!isStrongPass">密码强度弱</div>
      </div>
      <div class="forgot-link">
        <a href="#">Forgot Password?</a>
      </div>
      <button :aria-label="isLogin ? 'Login' : 'Register'" type="button" @click="onSubmit" class="btn">{{ isLogin ?
        'Login' : 'Register' }}</button>
      <p class="dark:text-white">or {{ isLogin ? 'login' : 'register' }} with social platforms</p>
      <div class="social-icons">
        <a href="#"> <box-icon type='logo' name='google'  color="#888"></box-icon> </a>
        <a href="#"><box-icon type='logo' name='facebook'  color="#888"></box-icon></a>
        <a href="#"><box-icon type='logo' name='github'  color="#888"></box-icon></a>
        <a href="#"><box-icon type='logo' name='linkedin'  color="#888"></box-icon></a>
      </div>
    </form>
  </div>
</template>
