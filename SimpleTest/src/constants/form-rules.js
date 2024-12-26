export default {
  email: [
    {
      required: true,
      message: '邮箱不能为空',
      trigger: 'blur',
    },
    {
      type: 'email',
      message: '请输入有效的邮箱地址',
      trigger: ['blur', 'change'],
    },
  ],
  pwd: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur',
    },
    {
      min: 6,
      message: '密码至少6位',
      trigger: 'blur',
    },
    {
      pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
      message: '密码必须包含英文和数字',
      trigger: 'blur',
    },
  ],
  loginPwd: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur',
    },
  ],
}