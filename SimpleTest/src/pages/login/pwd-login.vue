<script setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { router } from '@/router'
import { formRules } from '@/constants'
import UserRequest from '@/api/user'

const request = new UserRequest()

const state = reactive({
  rememberPwd: false,
  loading: false,
})

const form = reactive({
  email: '',
  loginPwd: '',
})

const formRef = ref()

const rules = reactive(formRules)

async function validate(formEl) {
  let result = false
  if (!formEl) {
    return result
  }
  await formEl.validate((valid, fields) => {
    result = valid
  })
  return result
}

async function submit(formEl) {
  let flag = await validate(formEl)
  if (!flag) {
    return
  }
  state.loading=true
  await request.login({
    email: form.email,
    pwd: form.loginPwd,
  }).then(res => {
    if (res.code === 200) {
      ElMessage({
        message: '登录成功',
        type: 'success',
      })
      localStorage.setItem('userLoginToken', res.data.token)
      if (state.rememberPwd) {
        localStorage.setItem('userEmail', form.email)
        localStorage.setItem('userPwd', 'fake password')
      }
      router.push('/')
    } else {
      ElMessage.error('登录失败，用户名或密码错误')
    }
  })
  state.loading = false
}
</script>

<template>
  <el-form 
    ref="formRef"
    v-loading="state.loading" 
    :model="form" 
    :rules="rules"
    label-width="auto"
    aria-label="login"
  >
    <header>
      <text>HIYIO</text>
      <h1>登录</h1>
      <div class="actions">
      </div>
      <span>
        您是新用戶吗?
        <router-link 
          to="/login/register" 
          aria-label="注册新账户"
        >建立账户</router-link>
      </span>
    </header>

    <el-form-item label="邮箱" prop="email">
      <el-input 
        v-model="form.email" 
        aria-required="true"
        placeholder="test@example.com"
      ></el-input>
    </el-form-item>

    <el-form-item label="密码" prop="loginPwd">
      <el-input 
        v-model="form.loginPwd" 
        show-password 
        aria-required="true"
        placeholder="password123"
      ></el-input>
    </el-form-item>

    <div class="checkbox-container">
      <el-checkbox 
        v-model="state.rememberPwd" 
        label="记住密码" 
        size="large" 
        aria-describedby="remember-password"
      />
      <router-link to="/login/reset-pwd">忘记密码?</router-link>
    </div>

    <el-form-item>
      <el-button 
        class="submit" 
        type="primary" 
        @click="submit(formRef)"
      >确定</el-button>
    </el-form-item>

  </el-form>
</template>

<style scoped>
@import url('@/styles/animation/link.css');

.el-form {
  background-color: var(--card-bg);
  width: 100%;
  height: 100%;

  header {
    margin-bottom: 40px;

    h1 {
      font-size: 4rem;
    }

    span {
      font-weight: bolder;
      font-size: 1.5rem;
    }
  }
}

.submit {
  width: 100%;
}

.checkbox-container {
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    font-size: 1.4rem;
  }
}

text {
  display: none;
  font-weight: bolder;
  font-size: 2rem;
}

@media screen and (max-width: 1200px) {
  text {
    display: block;
  }
}
</style>
