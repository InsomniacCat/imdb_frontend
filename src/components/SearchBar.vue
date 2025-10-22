<template>
  <div class="search-bar">
    <input 
      type="text" 
      v-model="localQuery" 
      placeholder="搜索电影..."
      @keyup.enter="search"
    >
    <button @click="search">搜索</button>
  </div>
</template>

<script>
import { ref, defineEmits } from 'vue'

export default {
  name: 'SearchBar',
  setup(props, { emit }) {
    const localQuery = ref('')
    
    const search = () => {
      emit('search', localQuery.value)
    }
    
    return {
      localQuery,
      search
    }
  }
}
</script>

<style scoped>
.search-bar {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.search-bar input {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  width: 200px;
}

.search-bar input::placeholder {
  color: #aaa;
}

.search-bar button {
  padding: 0.5rem 1rem;
  background: #f5c518;
  color: #000;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
}
</style>