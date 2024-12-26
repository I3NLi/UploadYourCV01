import Mock from 'mockjs'

const baseURL = import.meta.env.VITE_API_BASE_URL || '/api'

Mock.setup({
  timeout: 1500
})

Mock.mock(`${baseURL}login/`, 'post', (options) => {
  const { body } = options
  const { email, pwd } = JSON.parse(body)

  if (email === 'test@example.com' && pwd === 'password123') {
    return {
      code: 200,
      message: '登录成功',
      data: {
        token: 'fake-jwt-token',
        userInfo: {
          id: 1,
          name: 'Test User',
          email: 'test@example.com',
        },
      },
    }
  } else {
    return {
      code: 401,
      message: '用户名或密码错误',
    }
  }
})
