<template>
  <div class="modal-overlay" @click="$emit('close')">
    <div class="modal-content" @click.stop>
      <h3>用户登录</h3>
      <form @submit.prevent="login">
        <div class="form-group">
          <label>用户名:</label>
          <input v-model="username" type="text" required>
        </div>
        <div class="form-group">
          <label>密码:</label>
          <input v-model="password" type="password" required>
        </div>
        <button type="submit">登录</button>
      </form>
      <button class="close-btn" @click="$emit('close')">关闭</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'LoginForm',
  emits: ['login', 'close'],
  setup(props, { emit }) {
    const username = ref('')
    const password = ref('')
    
    const login = () => {
      // 模拟登录
      emit('login', { id: 1, name: username.value })
      username.value = ''
      password.value = ''
    }
    
    return {
      username,
      password,
      login
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #2c2c2c;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  position: relative;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #f5c518;
}

.form-group input {
  width: 100%;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #555;
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

button {
  padding: 0.5rem 1rem;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  margin-right: 0.5rem;
}

.close-btn {
  background: #e50914;
  color: white;
}

.modal-content button[type="submit"] {
  background: #f5c518;
  color: #000;
}
</style>