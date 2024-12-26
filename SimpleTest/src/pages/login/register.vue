<script setup>
import { reactive, ref } from 'vue'
import { formRules } from '@/constants'

const state = reactive({
  loading: false,
})

const form = reactive({
  email: '',
  pwd: '',
  repeatPwd: '',
})

const rules = reactive(formRules)
</script>

<template>
  <el-form 
    v-loading="state.loading" 
    :model="form" 
    :rules="rules"
    label-width="auto"
  >
    <header>
      <text>HIYIO</text>
      <h1>注册</h1>
      <span>
        已经有账户了?
        <router-link to="/login/pwd-login">返回登录</router-link>
      </span>
    </header>
    <el-form-item label="输入邮箱" prop="email">
      <el-input v-model="form.email"></el-input>
    </el-form-item>
    <el-form-item label="输入密码" prop="pwd">
      <el-input v-model="form.pwd" show-password></el-input>
    </el-form-item>
    <el-form-item label="重复密码" prop="pwd">
      <el-input v-model="form.repeatPwd" show-password></el-input>
    </el-form-item>
    <el-form-item>
      <el-button class="submit" type="primary" @click="() => state.loading=true">确定</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>
@import url('@/styles/animation/link.css');

.el-form {
  background-color: var(--card-bg);
  width: 100%;
  height: 100%;

  a {
    text-decoration: none;
    color: var(--primary-color);
  }

  header {
    h1 {
      font-size: 4rem;
    }
    span {
      font-size: 1.5rem;
      font-weight: bolder;
    }
    a {
      font-size: 1.5rem;
    }
    margin-bottom: 40px;
  }
}

.submit {
  width: 100%;
}

.checkbox-container {
  display: flex; /* 使用 flex 布局 */
  align-items: center; /* 垂直居中对齐 */
  justify-content: space-between;

  a {
    font-size: 1.4rem;
    font-weight: bolder;
    color: var(--primary-color);
    line-height: 40px;
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